"use client";

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Send, Search, ChevronRight, MessageSquare } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { BookingService, Booking } from '@/services/bookingService';
import { ChatService } from '@/services/chatService';
import BookingDetailsModal from '@/components/booking/BookingDetailsModal';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'chef' | 'system';
  time: string;
  conversation_id: string;
  sender_name?: string;
}

interface Conversation {
  id: string;
  created_date: string;
}

type BookingWithConversation = Booking & {
  conversation?: Conversation;
};

export default function ChatsPage() {
  const { user } = useAuthStore();
  const [bookings, setBookings] = useState<BookingWithConversation[]>([]);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sending, setSending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedBooking = bookings.find(b => b.id === selectedBookingId) as BookingWithConversation | undefined;
  const conversationId = selectedBooking?.conversation?.id || '';

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await BookingService.getBookings();
        setBookings(response.results as BookingWithConversation[]);
        if (response.results.length > 0) {
          setSelectedBookingId(response.results[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch bookings', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  // Determine if message is from current user
  const isMessageFromCurrentUser = useCallback((msg: any): boolean => {
    if (!user) return false;

    // Check if sender ID matches current user ID
    if (msg.sender === user.id) {
      return true;
    }

    // For client role, check if it's a client message from current user
    if (user.role === 'client' && msg.sender_role === 'client') {
      // Additional check: compare with current user's client ID
      return msg.sender === user.id;
    }

    // For service provider, check if it's from this service provider
    if (user.role === 'service_provider' && !msg.is_admin_message && msg.sender_role !== 'client') {
      // Assuming service provider messages don't have is_admin_message
      return msg.sender === user.id;
    }

    return false;
  }, [user]);

  // Transform API message to ChatMessage
  const transformMessage = useCallback((msg: any): ChatMessage => {
    const isFromCurrentUser = isMessageFromCurrentUser(msg);

    // Determine sender type more accurately
    let sender: 'user' | 'chef' | 'system' = 'system';
    let sender_name = 'System';

    if (isFromCurrentUser) {
      sender = 'user';
      sender_name = 'You';
    } else if (msg.is_admin_message) {
      sender = 'chef';
      sender_name = 'Admin';
    } else if (msg.sender_role === 'client') {
      sender = 'chef'; // Another client's message shows as chef
      sender_name = 'Client';
    } else {
      sender = 'chef';
      sender_name = 'Chef';
    }

    return {
      id: msg.id,
      text: msg.message || msg.text || '',
      sender: sender,
      time: msg.created_at || new Date().toISOString(),
      conversation_id: msg.conversation,
      sender_name: sender_name
    };
  }, [isMessageFromCurrentUser]);

  // Load initial messages
  const loadInitialMessages = useCallback(async (convId: string) => {
    try {
      const data = await ChatService.syncMessages(convId, '');
      console.log('Loaded messages data:', data);

      if (data) {
        const transformedMessages = data.map(transformMessage);
        console.log("sssssss111111", transformedMessages)
        setMessages(transformedMessages);
      }
    } catch (error) {
      console.error('Failed to load messages', error);
    }
  }, [transformMessage]);

  // Sync new messages
  const syncMessages = useCallback(async (convId: string) => {
    if (!convId) return;

    try {
      const lastMessageId = messages.length > 0 ? messages[messages.length - 1]?.id : '';
      const data = await ChatService.syncMessages(convId, lastMessageId);

      if (data && Array.isArray(data) && data.length > 0) {
        const transformedMessages = data.map(msg => {
          // Correct the sender info for messages from current user
          if (msg.sender === user?.id) {
            return {
              id: msg.id,
              text: msg.message || '',
              sender: 'user' as const,
              time: msg.created_at,
              conversation_id: msg.conversation,
              sender_name: 'You'
            };
          } else {
            return transformMessage(msg);
          }
        });

        setMessages(prev => {
          // Filter out any temporary messages that might have been replaced
          const newMessages = transformedMessages.filter(newMsg =>
            !prev.some(prevMsg => prevMsg.id === newMsg.id)
          );
          return [...prev, ...newMessages];
        });
      }
    } catch (error) {
      console.error('Failed to sync messages', error);
    }
  }, [messages, transformMessage, user?.id]);

  // Load initial messages when booking is selected
  useEffect(() => {
    if (conversationId) {
      loadInitialMessages(conversationId);
    } else {
      setMessages([]);
    }
  }, [conversationId, loadInitialMessages]);

  // Set up auto-sync interval
  useEffect(() => {
    if (conversationId) {
      const interval = setInterval(() => {
        syncMessages(conversationId);
      }, 3000);

      // Clean up interval on unmount or when conversation changes
      return () => {
        clearInterval(interval);
      };
    }
  }, [conversationId, syncMessages]);

  // Send message
  const handleSendMessage = async () => {
    if (!message.trim() || !conversationId || !user) return;

    const tempId = `temp-${Date.now()}`;
    const newMessage: ChatMessage = {
      id: tempId,
      text: message,
      sender: 'user',
      time: new Date().toISOString(),
      conversation_id: conversationId,
      sender_name: 'You'
    };

    // Optimistic update
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setSending(true);

    try {
      // Send to server
      const response = await ChatService.sendMessage({
        conversation_id: conversationId,
        message: message,
      });

      console.log('Send message response:', response);

      // If server returns the created message, update with server data
      if (response && response.message) {
        // Ensure the message has the correct sender info
        const serverMessage = {
          ...response.message,
          // Make sure the sender info matches current user
          sender: user.id,
          sender_role: user.role === 'client' ? 'client' : null,
          is_admin_message: user.role !== 'client'
        };

        setMessages(prev =>
          prev.map(msg =>
            msg.id === tempId
              ? transformMessage(serverMessage)
              : msg
          )
        );
      } else {
        // If response doesn't have message, we need to sync
        setTimeout(() => {
          syncMessages(conversationId);
        }, 500);
      }
    } catch (error) {
      console.error('Failed to send message', error);
      // Mark the message as failed
      setMessages(prev =>
        prev.map(msg =>
          msg.id === tempId
            ? { ...msg, sender: 'system', text: 'Failed to send message' }
            : msg
        )
      );
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format message time
  const formatMessageTime = (time: string) => {
    try {
      const date = new Date(time);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return time;
    }
  };

  // Get unread message count for a booking
  const getUnreadCount = (booking: any) => {
    return booking.unread_message_count || 0;
  };

  console.log("Current messages:", messages);

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
          <p className="text-gray-600 text-sm">Chat about your bookings</p>
        </div>

        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex">
          {/* Left Panel: Booking List */}
          <div className="w-full md:w-80 border-r border-gray-100 flex flex-col bg-gray-50/50">
            <div className="p-4 border-b border-gray-100 bg-white">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  className="w-full pl-9 pr-4 py-2 bg-gray-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
              {loading ? (
                <div className="p-4 text-center text-gray-500 text-sm">Loading bookings...</div>
              ) : bookings.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-sm">No bookings found</div>
              ) : (
                bookings.map((booking) => {
                  const unreadCount = getUnreadCount(booking);
                  const firstDate = Object.keys(booking.dates || {})[0] || '';
                  const formattedDate = firstDate ? new Date(firstDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  }) : 'No Date';

                  return (
                    <div
                      key={booking.id}
                      onClick={() => setSelectedBookingId(booking.id)}
                      className={`p-3 rounded-xl cursor-pointer transition-all border relative ${selectedBookingId === booking.id
                        ? 'bg-white border-primary-100 shadow-sm ring-1 ring-primary-50'
                        : 'border-transparent hover:bg-white hover:border-gray-200'
                        }`}
                    >
                      {unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                          {unreadCount}
                        </div>
                      )}

                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-gray-800 text-sm truncate pr-2">
                          {booking.event_type || 'Event'}
                        </span>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap bg-gray-100 px-1.5 py-0.5 rounded">
                          {formattedDate}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div
                            className={`w-2 h-2 rounded-full ${booking.request_status === 'approved' ? 'bg-green-500' :
                              booking.request_status === 'rejected' ? 'bg-red-500' :
                                'bg-orange-500'
                              }`}
                          />
                          <span className="text-xs text-gray-500 capitalize">
                            {booking.request_status?.replace('_', ' ') || 'Pending'}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300" />
                      </div>

                      {/* Show conversation status */}
                      {(booking as any).conversation && (
                        <div className="mt-2 text-xs text-gray-400">
                          Chat available
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Panel: Chat Interface */}
          <div className="flex-1 flex flex-col bg-white">
            {selectedBooking ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-warm-100 flex items-center justify-center text-primary-600 font-bold border border-primary-50">
                      {selectedBooking.event_type?.[0] || 'B'}
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-800 flex items-center gap-2">
                        {selectedBooking.event_type}
                        <span className="text-xs font-normal text-gray-400 px-2 py-0.5 bg-gray-50 rounded-full border border-gray-100">
                          #{selectedBooking.id.slice(0, 8)}
                        </span>
                      </h2>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          Active • Auto-syncing
                        </p>
                        {selectedBooking.conversation && (
                          <p className="text-xs text-gray-400">
                            ID: {selectedBooking.conversation.id.slice(0, 8)}...
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsDetailsModalOpen(true)}
                    className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-medium shadow-sm"
                  >
                    View Details
                  </button>
                </div>

                {/* Chat Messages */}
                {console.log("11111111111111233333333331", messages)}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
                  {messages.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p className="font-medium">No messages yet</p>
                      <p className="text-sm mt-1">Start the conversation</p>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >

                        <div
                          className={`max-w-[80%] md:max-w-md px-5 py-3 rounded-2xl shadow-sm ${msg.sender === 'user'
                            ? 'bg-gradient-to-br from-primary-500 to-warm-500 text-white rounded-tr-sm'
                            : msg.sender === 'chef'
                              ? 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm'
                              : 'bg-gray-100 border border-gray-200 text-gray-600 rounded-tl-sm'
                            }`}
                        >
                          {msg.sender_name && (
                            <p className="text-xs font-semibold mb-1 text-gray-500">
                              {msg.sender_name}
                            </p>
                          )}
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                          <p className={`text-[10px] mt-1.5 ${msg.sender === 'user' ? 'text-white/70' : 'text-gray-400'
                            }`}>
                            {formatMessageTime(msg.time)}

                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-100">
                  <div className="flex items-center gap-2 max-w-4xl mx-auto">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        disabled={sending}
                        className="w-full pl-5 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all disabled:opacity-50"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!message.trim() || sending}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 disabled:opacity-50 disabled:hover:bg-primary-500 transition-all shadow-sm"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {/* <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-400">
                      Messages sync automatically every 3 seconds
                    </p>
                    {conversationId && (
                      <p className="text-xs text-gray-400">
                        Conversation ID: {conversationId.slice(0, 12)}...
                      </p>
                    )}
                  </div> */}
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="w-8 h-8 text-gray-300" />
                </div>
                <p className="text-lg font-medium text-gray-500">Select a booking to start chatting</p>
                <p className="text-sm mt-1">Choose from the list on the left</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedBooking && (
        <BookingDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          booking={selectedBooking}
        />
      )}
    </DashboardLayout>
  );
}
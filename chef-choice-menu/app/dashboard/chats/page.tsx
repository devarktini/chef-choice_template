"use client";

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Send, Search, ChevronRight, MessageSquare, User, Calendar, Clock, ChefHat } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const selectedBooking = bookings.find(b => b.id === selectedBookingId);
  const conversationId = selectedBooking?.conversation?.id || '';

  // Filter bookings based on search
  const filteredBookings = bookings.filter(booking =>
    booking.event_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.request_status?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

    if (msg.sender === user.id) {
      return true;
    }

    if (user.role === 'client' && msg.sender_role === 'client') {
      return msg.sender === user.id;
    }

    return false;
  }, [user]);

  // Transform API message to ChatMessage
  const transformMessage = useCallback((msg: any): ChatMessage => {
    const isFromCurrentUser = isMessageFromCurrentUser(msg);

    let sender: 'user' | 'chef' | 'system' = 'system';
    let sender_name = 'System';

    if (isFromCurrentUser) {
      sender = 'user';
      sender_name = 'You';
    } else if (msg.is_admin_message) {
      sender = 'chef';
      sender_name = 'Support';
    } else if (msg.sender_role === 'client') {
      sender = 'chef';
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
      
      if (data && Array.isArray(data)) {
        const transformedMessages = data.map(transformMessage);
        setMessages(transformedMessages);
      }
    } catch (error) {
      console.error('Failed to load messages', error);
    }
  }, [transformMessage]);

  // Sync new messages - FIXED VERSION
  const syncMessages = useCallback(async (convId: string) => {
    if (!convId) return;

    try {
      // Get the last message ID from current messages
      const lastMessageId = messages.length > 0 ? messages[messages.length - 1]?.id : '';
      console.log('Syncing messages with lastMessageId:', lastMessageId);
      
      const data = await ChatService.syncMessages(convId, lastMessageId);
      console.log('Sync response data:', data);
      
      if (data && Array.isArray(data) && data.length > 0) {
        console.log('Found', data.length, 'new messages');
        
        // Transform and add new messages
        const newMessages = data.map(transformMessage);
        
        setMessages(prev => {
          // Create a set of existing message IDs for quick lookup
          const existingIds = new Set(prev.map(msg => msg.id));
          
          // Filter out messages that already exist
          const uniqueNewMessages = newMessages.filter(msg => !existingIds.has(msg.id));
          
          if (uniqueNewMessages.length === 0) {
            console.log('No new unique messages to add');
            return prev;
          }
          
          console.log('Adding', uniqueNewMessages.length, 'new unique messages');
          return [...prev, ...uniqueNewMessages];
        });
      }
    } catch (error) {
      console.error('Failed to sync messages', error);
    }
  }, [messages, transformMessage]);

  // Load initial messages when booking is selected
  useEffect(() => {
    if (conversationId) {
      console.log('Loading initial messages for conversation:', conversationId);
      loadInitialMessages(conversationId);
    } else {
      setMessages([]);
    }
  }, [conversationId, loadInitialMessages]);

  // Set up auto-sync interval
  useEffect(() => {
    if (conversationId) {
      console.log('Setting up auto-sync for conversation:', conversationId);
      
      const interval = setInterval(() => {
        console.log('Auto-sync triggered');
        syncMessages(conversationId);
      }, 3000);

      // Clean up interval on unmount or when conversation changes
      return () => {
        console.log('Clearing auto-sync interval');
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
      console.log('Sending message:', message);
      const response = await ChatService.sendMessage({
        conversation_id: conversationId,
        message: message,
      });

      console.log('Send message response:', response);

      // If server returns the created message, update with server data
      if (response && response.message) {
        const serverMessage = {
          ...response.message,
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
        // If response doesn't have message, sync to get the latest
        console.log('No message in response, syncing...');
        setTimeout(() => {
          syncMessages(conversationId);
        }, 1000);
      }
    } catch (error) {
      console.error('Failed to send message', error);
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

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get event icon
  const getEventIcon = (eventType: string) => {
    switch (eventType?.toLowerCase()) {
      case 'wedding': return '👰';
      case 'birthday': return '🎂';
      case 'anniversary': return '💝';
      case 'corporate': return '💼';
      default: return '🎉';
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] flex flex-col bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Messages</h1>
              <p className="text-gray-600 text-sm">Chat with chefs and support</p>
            </div>
            {selectedBookingId && (
              <button
                onClick={() => setSelectedBookingId(null)}
                className="lg:hidden p-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
            )}
            <div className="hidden lg:block">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Auto-sync enabled</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left Panel: Booking List - Hidden on mobile when chat is open */}
          <div className={`lg:w-80 border-r border-gray-200 bg-white flex flex-col ${selectedBookingId ? 'hidden lg:flex' : 'flex'}`}>
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search bookings..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Booking List */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="text-gray-500 text-sm mt-2">Loading bookings...</p>
                </div>
              ) : filteredBookings.length === 0 ? (
                <div className="p-8 text-center">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No bookings found</p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-sm text-blue-600 hover:text-blue-800 mt-2"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              ) : (
                <div className="p-2 space-y-2">
                  {filteredBookings.map((booking) => {
                    const firstDate = Object.keys(booking.dates || {})[0] || '';
                    const eventIcon = getEventIcon(booking.event_type);
                    
                    return (
                      <div
                        key={booking.id}
                        onClick={() => setSelectedBookingId(booking.id)}
                        className={`group p-3 rounded-xl cursor-pointer transition-all ${selectedBookingId === booking.id
                          ? 'bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200'
                          : 'bg-white border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50'
                          }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${selectedBookingId === booking.id ? 'bg-blue-100' : 'bg-gray-100 group-hover:bg-blue-100'}`}>
                            <span className="text-lg">{eventIcon}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <h3 className="font-semibold text-gray-900 text-sm truncate">
                                {booking.event_type || 'Event'}
                              </h3>
                              <span className="text-xs text-gray-500 whitespace-nowrap">
                                {firstDate ? formatDate(firstDate) : 'No date'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(booking.request_status || 'pending')}`}>
                                  {booking.request_status?.replace('_', ' ') || 'Pending'}
                                </span>
                                {booking.conversation && (
                                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                                    Chat
                                  </span>
                                )}
                              </div>
                              <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${selectedBookingId === booking.id ? 'text-blue-600' : 'text-gray-300'}`} />
                            </div>
                            {booking.guests && (
                              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                                <User className="w-3 h-3" />
                                <span>{booking.guests.adults + (booking.guests.children || 0) + (booking.guests.babies || 0)} guests</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Chat Interface */}
          <div className={`flex-1 flex flex-col bg-white ${!selectedBookingId ? 'hidden lg:flex' : 'flex'}`}>
            {selectedBooking ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedBookingId(null)}
                      className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 rotate-180 text-gray-600" />
                    </button>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                      <span className="text-2xl">
                        {getEventIcon(selectedBooking.event_type)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h2 className="font-bold text-gray-900">{selectedBooking.event_type}</h2>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {(() => {
                              const dates = Object.keys(selectedBooking.dates || {});
                              return dates.length > 0 ? formatDate(dates[0]) : 'No date';
                            })()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          <span>Live • Auto-sync enabled</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsDetailsModalOpen(true)}
                      className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-medium"
                    >
                      Details
                    </button>
                  </div>
                </div>

                {/* Chat Messages */}
                <div 
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50/50 to-white p-4"
                >
                  {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center p-8">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center mb-4">
                        <MessageSquare className="w-10 h-10 text-blue-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">No messages yet</h3>
                      <p className="text-gray-500 text-center max-w-md">
                        Start the conversation by sending a message. You can ask about menu details, timing, or any special requests.
                      </p>
                    </div>
                  ) : (
                    <div className="max-w-4xl mx-auto space-y-4 pb-4">
                      {messages.map((msg, index) => {
                        const showSender = index === 0 || 
                          messages[index - 1].sender !== msg.sender ||
                          new Date(msg.time).getTime() - new Date(messages[index - 1].time).getTime() > 300000;

                        return (
                          <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className="flex max-w-[85%] lg:max-w-[75%]">
                              {msg.sender !== 'user' && (
                                <div className="mr-2 mt-1 flex-shrink-0">
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                                    <ChefHat className="w-4 h-4 text-amber-600" />
                                  </div>
                                </div>
                              )}
                              <div>
                                {showSender && msg.sender !== 'user' && (
                                  <p className="text-xs font-medium text-gray-600 mb-1 ml-1">
                                    {msg.sender_name}
                                  </p>
                                )}
                                <div
                                  className={`px-4 py-3 rounded-2xl ${msg.sender === 'user'
                                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-br-md'
                                    : msg.sender === 'chef'
                                    ? 'bg-white border border-gray-200 shadow-sm rounded-bl-md'
                                    : 'bg-gray-100 border border-gray-200 text-gray-700'
                                    }`}
                                >
                                  <p className="text-sm leading-relaxed">{msg.text}</p>
                                  <p className={`text-xs mt-1.5 ${msg.sender === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                                    {formatMessageTime(msg.time)}
                                    {msg.id.startsWith('temp-') && ' • Sending...'}
                                  </p>
                                </div>
                              </div>
                              {msg.sender === 'user' && (
                                <div className="ml-2 mt-1 flex-shrink-0">
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                                    <User className="w-4 h-4 text-blue-600" />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Type your message here..."
                          disabled={sending}
                          className="w-full pl-5 pr-12 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:opacity-50 placeholder:text-gray-400"
                        />
                        <button
                          onClick={handleSendMessage}
                          disabled={!message.trim() || sending}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:hover:from-blue-600 disabled:hover:to-indigo-600 transition-all shadow-sm"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 text-center mt-2">
                      Press Enter to send • Auto-sync every 3 seconds
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center mb-6">
                  <MessageSquare className="w-12 h-12 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Select a conversation</h3>
                <p className="text-gray-600 text-center max-w-md mb-6">
                  Choose a booking from the list to start chatting with chefs or support team.
                </p>
                <div className="grid grid-cols-2 gap-4 max-w-sm">
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <ChefHat className="w-8 h-8 text-blue-600 mb-2" />
                    <p className="font-medium text-blue-800">Chat with chefs</p>
                    <p className="text-sm text-blue-600">Discuss menu details</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                    <MessageSquare className="w-8 h-8 text-green-600 mb-2" />
                    <p className="font-medium text-green-800">Get support</p>
                    <p className="text-sm text-green-600">Ask questions</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {selectedBooking && (
          <BookingDetailsModal
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            booking={selectedBooking}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
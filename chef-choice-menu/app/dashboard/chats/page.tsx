"use client";

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Send, Search, ChevronRight, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { BookingService, Booking } from '@/services/bookingService';
import BookingDetailsModal from '@/components/booking/BookingDetailsModal';

export default function ChatsPage() {
    const { user } = useAuthStore();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    // Dummy messages for now
    const [messages, setMessages] = useState([
        { id: 1, sender: 'chef', text: 'Hello! Thank you for booking with me.', time: '10:00 AM' },
        { id: 2, sender: 'user', text: 'Hi! I\'m excited about the dinner.', time: '10:05 AM' },
    ]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const response = await BookingService.getBookings();
                setBookings(response.results);
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

    const selectedBooking = bookings.find(b => b.id === selectedBookingId);

    const handleSendMessage = () => {
        if (!message.trim()) return;
        setMessages([...messages, {
            id: messages.length + 1,
            sender: 'user',
            text: message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setMessage('');
    };

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
                                bookings.map((booking) => (
                                    <div
                                        key={booking.id}
                                        onClick={() => setSelectedBookingId(booking.id)}
                                        className={`p-3 rounded-xl cursor-pointer transition-all border ${selectedBookingId === booking.id
                                            ? 'bg-white border-primary-100 shadow-sm ring-1 ring-primary-50'
                                            : 'border-transparent hover:bg-white hover:border-gray-200'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-semibold text-gray-800 text-sm truncate pr-2">
                                                {booking.event_type || 'Event'}
                                            </span>
                                            <span className="text-[10px] text-gray-400 whitespace-nowrap bg-gray-100 px-1.5 py-0.5 rounded">
                                                {Object.keys(booking.dates || {})[0] || 'No Date'}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1.5">
                                                <div className={`w-2 h-2 rounded-full ${booking.request_status === 'approved' ? 'bg-green-500' : 'bg-orange-500'
                                                    }`} />
                                                <span className="text-xs text-gray-500 capitalize">
                                                    {booking.request_status?.replace('_', ' ') || 'Pending'}
                                                </span>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-gray-300" />
                                        </div>
                                    </div>
                                ))
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
                                            <p className="text-xs text-green-600 flex items-center gap-1 mt-0.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                                Active Session
                                            </p>
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
                                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[80%] md:max-w-md px-5 py-3 rounded-2xl shadow-sm ${msg.sender === 'user'
                                                    ? 'bg-gradient-to-br from-primary-500 to-warm-500 text-white rounded-tr-sm'
                                                    : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm'
                                                    }`}
                                            >
                                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                                <p className={`text-[10px] mt-1.5 ${msg.sender === 'user' ? 'text-white/70' : 'text-gray-400'
                                                    }`}>
                                                    {msg.time}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Input Area */}
                                <div className="p-4 bg-white border-t border-gray-100">
                                    <div className="flex items-center gap-2 max-w-4xl mx-auto">
                                        <div className="flex-1 relative">
                                            <input
                                                type="text"
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                                placeholder="Type your message..."
                                                className="w-full pl-5 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                            />
                                            <button
                                                onClick={handleSendMessage}
                                                disabled={!message.trim()}
                                                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 disabled:opacity-50 disabled:hover:bg-primary-500 transition-all shadow-sm"
                                            >
                                                <Send className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
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

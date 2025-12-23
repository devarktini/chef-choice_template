"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { BookingService, Booking } from '@/services/bookingService';
import { useAuthStore } from '@/stores/authStore';
import { useProgressStore } from '@/stores/progressStore';
import { Calendar, Clock, MapPin, Eye, Loader2, User, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import BookingDetailsModal from '@/components/booking/BookingDetailsModal';

export default function OrdersPage() {
    const router = useRouter();
    const { user } = useAuthStore();
    const { startLoading, stopLoading } = useProgressStore();
    const [orders, setOrders] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal State
    const [selectedOrder, setSelectedOrder] = useState<Booking | undefined>(undefined);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const fetchOrders = useCallback(async () => {
        try {
            startLoading();
            const response = await BookingService.getBookings();
            setOrders(response.results);
        } catch (error) {
            console.error('Failed to fetch orders', error);
            // toast.error('Failed to load orders');
        } finally {
            setLoading(false);
            stopLoading();
        }
    }, [startLoading, stopLoading]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handleViewDetails = (order: Booking) => {
        setSelectedOrder(order);
        setIsDetailsOpen(true);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'approved': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
            case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
            case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <Loader2 className="w-10 h-10 animate-spin text-primary-500 mx-auto mb-4" />
                        <p className="text-gray-500">Loading orders...</p>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="space-y-4">
                {/* Page Header */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 p-8 md:p-8 text-white shadow-lg">
                    {/* Decorative Blur Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -mr-48 -mt-48"></div>
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl -ml-36 -mb-36"></div>

                    <div className="relative z-10">
                        <h1 className="text-xl md:text-3xl font-bold mb-2 flex items-center">📋 Orders</h1>
                        <p className="text-purple-100 text-lg">Manage and view all incoming service requests</p>
                        <p className="text-purple-50 text-sm mt-2 flex items-center">
                            <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span>
                            Total orders: <span className="font-bold ml-2">{orders.length}</span>
                        </p>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 text-center border border-blue-200 shadow-sm">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-md">
                                <Calendar className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No Orders Yet</h3>
                        <p className="text-gray-600 max-w-md mx-auto text-sm leading-relaxed">
                            No service requests yet. Complete your profile to attract more clients.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                        {orders.map((order, index) => {
                            // Logic to determine payment status
                            let payments: any[] = [];
                            if (Array.isArray(order.payment_details)) {
                                payments = order.payment_details;
                            } else if (Array.isArray(order.payments)) {
                                payments = order.payments;
                            }

                            const successPayments = payments.filter(p => ['paid', 'captured'].includes(p.status?.toLowerCase() || ''));

                            const tokenPayment = successPayments.find(p => p.payment_type === 'token');
                            const finalPayment = successPayments.find(p => p.payment_type === 'final');

                            const isTokenPaid = !!tokenPayment;
                            const isFinalPaid = !!finalPayment;

                            return (
                                <div
                                    key={order.id}
                                    className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-blue-400 p-5 group flex flex-col h-full overflow-hidden relative"
                                    style={{
                                        animation: `fadeInUp 0.5s ease-out ${index * 0.08}s backwards`
                                    }}
                                >
                                    <style jsx>{`
                                        @keyframes fadeInUp {
                                            from {
                                                opacity: 0;
                                                transform: translateY(12px);
                                            }
                                            to {
                                                opacity: 1;
                                                transform: translateY(0);
                                            }
                                        }
                                    `}</style>
                                    
                                    {/* Status Badge - Absolute Top Right */}
                                    <div className="absolute top-3 right-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border-2 ${getStatusColor(order.request_status)}`}>
                                            {order.request_status}
                                        </span>
                                    </div>

                                    {/* Client Info Section */}
                                    <div className="mb-4 flex items-start gap-3 pt-6">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
                                            {order.client?.first_name?.charAt(0)}{order.client?.last_name?.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-900 text-sm truncate">
                                                {order.client?.first_name} {order.client?.last_name}
                                            </h3>
                                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                                <span className="text-gray-400">ID:</span>
                                                <span className="font-mono text-gray-600">#{order.id.slice(0, 6)}</span>
                                            </p>
                                            <p className="text-xs text-blue-600 font-semibold capitalize mt-0.5">
                                                {order.event_type} Event
                                            </p>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="h-px bg-gradient-to-r from-gray-200 to-transparent mb-4"></div>

                                    {/* Payment Status Section */}
                                    <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-100">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-blue-700">💳 Payment</span>
                                            <div className="flex gap-2 text-xs">
                                                <span className={`px-2 py-1 rounded-full font-bold transition-all ${isTokenPaid ? 'bg-green-200 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                                    {isTokenPaid ? '✓ Token' : '○ Token'}
                                                </span>
                                                <span className={`px-2 py-1 rounded-full font-bold transition-all ${isFinalPaid ? 'bg-green-200 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                                    {isFinalPaid ? '✓ Final' : '○ Final'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Event Details Grid */}
                                    <div className="grid grid-cols-2 gap-2 mb-4 flex-1">
                                        <div className="bg-blue-50 rounded-xl p-3 border-2 border-blue-100 flex flex-col justify-between">
                                            <p className="text-gray-500 font-bold text-xs mb-2">📅 Date</p>
                                            <p className="font-bold text-gray-800 text-xs line-clamp-2">
                                                {Object.values(order.dates || {}).map(d => new Date(d).toLocaleDateString()).join(", ").substring(0, 25)}
                                            </p>
                                        </div>
                                        <div className="bg-amber-50 rounded-xl p-3 border-2 border-amber-100 flex flex-col justify-between">
                                            <p className="text-gray-500 font-bold text-xs mb-2">🕐 Time</p>
                                            <p className="font-bold text-gray-800 text-xs line-clamp-2">
                                                {Object.values(order.meal_timings || {}).map(t => t.time).join(", ").substring(0, 25)}
                                            </p>
                                        </div>
                                        <div className="bg-purple-50 rounded-xl p-3 border-2 border-purple-100 col-span-2 flex flex-col justify-between">
                                            <p className="text-gray-500 font-bold text-xs mb-2">📍 Location</p>
                                            <p className="font-bold text-gray-800 text-xs truncate">
                                                {order.event_address ? `${order.event_address.city}, ${order.event_address.state}` : 'TBD'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        onClick={() => handleViewDetails(order)}
                                        className="w-full px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-xl hover:shadow-lg transition-all text-sm font-bold flex items-center justify-center gap-2 group/btn"
                                    >
                                        <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                        <span>View Full Details</span>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Details Popup */}
                <BookingDetailsModal
                    isOpen={isDetailsOpen}
                    onClose={() => {
                        setIsDetailsOpen(false);
                        setSelectedOrder(undefined);
                    }}
                    booking={selectedOrder}
                />
            </div>
        </DashboardLayout>
    );
}

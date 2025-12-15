"use client";

import { useEffect, useState } from 'react';
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

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
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
    };

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
            <div className="space-y-8 pb-20">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
                        <p className="text-gray-600 mt-1">Manage and view your incoming service requests</p>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">No Orders Yet</h3>
                        <p className="text-gray-500 max-w-sm mx-auto">
                            You haven't received any service requests yet. Complete your profile to improve visibility.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {orders.map((order) => {
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
                                <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
                                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                                        {/* Header Info */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border ${getStatusColor(order.request_status)}`}>
                                                    {order.request_status}
                                                </span>
                                                <span className="text-xs text-gray-500 font-mono">#{order.id.slice(0, 8)}</span>
                                                <span className="text-xs text-gray-400">•</span>
                                                <span className="text-xs text-gray-500 capitalize">{order.event_type} Event</span>
                                            </div>

                                            {/* Client Info (Instead of Provider Info) */}
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-lg font-bold text-gray-800">
                                                    {order.client?.first_name} {order.client?.last_name}
                                                </h3>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span className="flex items-center">
                                                    <User className="w-4 h-4 mr-1 text-gray-400" />
                                                    Client
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleViewDetails(order)}
                                                className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors text-sm font-medium flex items-center"
                                            >
                                                <Eye className="w-4 h-4 mr-2" />
                                                View Details
                                            </button>
                                        </div>
                                    </div>

                                    {/* Payment Status Steps */}
                                    <div className="mb-6 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Payment Status</h4>
                                        <div className="flex items-center w-full">
                                            {/* Step 1: Token */}
                                            <div className="flex-1 relative">
                                                <div className="flex items-center">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 ${isTokenPaid
                                                        ? 'bg-green-100 border-green-500 text-green-600'
                                                        : 'bg-white border-gray-300 text-gray-400'}`}>
                                                        {isTokenPaid ? '✓' : '1'}
                                                    </div>
                                                    <div className={`flex-1 h-1 mx-2 rounded ${isTokenPaid ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                                                </div>
                                                <div className="mt-2 text-xs">
                                                    <p className={`font-semibold ${isTokenPaid ? 'text-green-700' : 'text-gray-500'}`}>Token Amount</p>
                                                    {isTokenPaid ? (
                                                        <p className="text-green-600 font-mono">₹{tokenPayment?.amount?.toLocaleString()}</p>
                                                    ) : (
                                                        <p className="text-gray-400 italic">Pending</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Step 2: Final */}
                                            <div className="flex-1 relative">
                                                <div className="flex items-center">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 ${isFinalPaid
                                                        ? 'bg-green-100 border-green-500 text-green-600'
                                                        : 'bg-white border-gray-300 text-gray-400'}`}>
                                                        {isFinalPaid ? '✓' : '2'}
                                                    </div>
                                                    {/* No line after step 2 */}
                                                </div>
                                                <div className="mt-2 text-xs">
                                                    <p className={`font-semibold ${isFinalPaid ? 'text-green-700' : 'text-gray-500'}`}>Final Amount</p>
                                                    {isFinalPaid ? (
                                                        <p className="text-green-600 font-mono">₹{finalPayment?.amount?.toLocaleString()}</p>
                                                    ) : (
                                                        <p className="text-gray-400 italic">Pending</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-50 pt-4 grid md:grid-cols-3 gap-4">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-orange-50 rounded-lg text-orange-600 mt-0.5">
                                                <Calendar className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Event Dates</p>
                                                <div className="text-sm font-medium text-gray-800">
                                                    {Object.values(order.dates || {}).map(d => new Date(d).toLocaleDateString()).join(", ")}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600 mt-0.5">
                                                <Clock className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Timings</p>
                                                <div className="text-sm font-medium text-gray-800">
                                                    {Object.values(order.meal_timings || {}).map(t => t.time).join(", ")}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-green-50 rounded-lg text-green-600 mt-0.5">
                                                <MapPin className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Location</p>
                                                <p className="text-sm font-medium text-gray-800 truncate">
                                                    {order.event_address ? `${order.event_address.city}, ${order.event_address.state}` : 'TBD'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
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

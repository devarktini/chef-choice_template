"use client";

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Calendar, Clock, MapPin, User, ChefHat, AlertCircle, Loader2, ChevronLeft, ChevronRight, Eye, Edit2, CreditCard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { BookingService, Booking } from '@/services/bookingService';
import BookingFlowModal from '@/components/booking/BookingFlowModal';
import BookingDetailsModal from '@/components/booking/BookingDetailsModal';
import { toast } from 'react-hot-toast'; // Kept for existing toasts
import { toast as sonnerToast } from 'sonner'; // Added for PaymentService which uses sonner toast style messages
import { PaymentService } from '@/services/paymentService';
import { loadRazorpayScript } from '@/utils/razorpay';
import { useAuthStore } from '@/stores/authStore';
import ReviewModal from '@/components/booking/ReviewModal';
import PaymentHistoryModal from '@/components/booking/PaymentHistoryModal';

export default function BookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [prevPage, setPrevPage] = useState<string | null>(null);

    // Modals
    const [editingBooking, setEditingBooking] = useState<Booking | undefined>(undefined);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // View Modal
    const [viewingBooking, setViewingBooking] = useState<Booking | undefined>(undefined);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    // Review Modal
    const [reviewingBooking, setReviewingBooking] = useState<Booking | undefined>(undefined);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    // Payment History Modal
    const [viewingPaymentsBooking, setViewingPaymentsBooking] = useState<Booking | undefined>(undefined);
    const [isPaymentHistoryOpen, setIsPaymentHistoryOpen] = useState(false);

    const { user } = useAuthStore();
    const [isProcessingPaymentId, setIsProcessingPaymentId] = useState<string | null>(null);

    const handlePayment = async (booking: Booking, type: 'token' | 'final' = 'token') => {
        setIsProcessingPaymentId(booking.id);
        try {
            const isScriptLoaded = await loadRazorpayScript();
            if (!isScriptLoaded) {
                sonnerToast.error('Razorpay SDK failed to load. Are you online?');
                return;
            }

            // Determine amount based on type
            let amount = 0;
            if (type === 'token') {
                amount = Number(booking.token_amount_required || 0);
            } else {
                // Final payment placeholder logic
                amount = 5000; // Placeholder final amount
            }

            const order = await PaymentService.createOrder(booking.id, amount, type);

            const options = {
                key: order.key || order.key_id,
                amount: order.amount,
                currency: "INR",
                name: "Chef Choice Menu",
                description: `${type === 'token' ? 'Token' : 'Final'} Payment for Booking #${booking.id}`,
                order_id: order.order_id,
                handler: async function (response: any) {
                    try {
                        const verifyData = {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                        };
                        await PaymentService.verifyPayment(booking.id, verifyData);
                        sonnerToast.success('Payment Successful!');
                        fetchBookings(currentPage);
                    } catch (error) {
                        sonnerToast.error('Payment verification failed');
                    }
                },
                prefill: {
                    name: `${user?.first_name} ${user?.last_name}`,
                    email: user?.email,
                    contact: user?.phone_number,
                },
                theme: {
                    color: "#F97316",
                },
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error('Payment Error:', error);
            sonnerToast.error('Failed to initiate payment');
        } finally {
            setIsProcessingPaymentId(null);
        }
    };

    useEffect(() => {
        fetchBookings(currentPage);
    }, [currentPage]);

    const fetchBookings = async (page: number) => {
        try {
            setLoading(true);
            const response = await BookingService.getBookings(page);
            setBookings(response.results);
            setNextPage(response.next);
            setPrevPage(response.previous);
            setTotalPages(Math.ceil(response.count / 10)); // Assuming 10 per page default
        } catch (err: any) {
            setError(err.message || 'Failed to fetch bookings');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (booking: Booking) => {
        setEditingBooking(booking);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setEditingBooking(undefined);
        fetchBookings(currentPage); // Refresh list
    };

    const handleView = (booking: Booking) => {
        setViewingBooking(booking);
        setIsViewModalOpen(true);
    };

    const handleCloseViewModal = () => {
        setIsViewModalOpen(false);
        setViewingBooking(undefined);
    };

    const handleViewPayments = (booking: Booking) => {
        setViewingPaymentsBooking(booking);
        setIsPaymentHistoryOpen(true);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-700';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700';
            case 'cancelled':
                return 'bg-red-100 text-red-700';
            case 'completed':
                return 'bg-blue-100 text-blue-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const handleReview = (booking: Booking) => {
        setReviewingBooking(booking);
        setIsReviewModalOpen(true);
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Page Header with Gradient Background */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-400 via-orange-500 to-red-600 p-8 md:p-12 text-white shadow-lg">
                    {/* Decorative Blur Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -mr-48 -mt-48"></div>
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl -ml-36 -mb-36"></div>

                    <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between">
                        <div className="mb-4 md:mb-0">
                            <h1 className="text-4xl md:text-5xl font-bold mb-3 flex items-center">
                                📅 My Bookings
                            </h1>
                            <p className="text-orange-100 text-lg">Manage and track all your chef bookings in one place</p>
                            <p className="text-orange-50 text-sm mt-2 flex items-center">
                                <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span>
                                Total bookings: <span className="font-bold ml-2">{bookings.length}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bookings List */}
                <div className="space-y-4">
                    {loading ? (
                        <div className="text-center py-20">
                            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary-500 mb-4" />
                            <p className="text-gray-500">Loading your bookings...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20 text-red-500">
                            <AlertCircle className="w-8 h-8 mx-auto mb-4" />
                            {error}
                        </div>
                    ) : (
                        bookings.map((booking) => {
                            // Helper to get formatted date and time
                            const dateKey = Object.keys(booking.dates || {})[0];
                            const time = dateKey && booking.meal_timings?.[dateKey]?.time;

                            // Status and Payment logic
                            const hasPaidToken = booking.payments?.some(p => p.payment_type === 'token' && p.status === 'success');
                            const hasPaidFinal = booking.payments?.some(p => p.payment_type === 'final' && p.status === 'success');
                            const tokenAmount = Number(booking.token_amount_required || 0);

                            const isApproved = booking.request_status?.toLowerCase() === 'approved';
                            const isConfirmed = booking.request_status?.toLowerCase() === 'confirmed';
                            const isCompleted = booking.request_status?.toLowerCase() === 'completed';

                            const showTokenPay = user?.role === 'client' && isApproved && tokenAmount > 0 && !hasPaidToken;
                            const showFinalPay = user?.role === 'client' && isConfirmed && !hasPaidFinal;
                            const showReview = user?.role === 'client' && isCompleted;

                            return (
                                <div
                                    key={booking.id}
                                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between overflow-hidden space-y-4 lg:space-y-0">
                                        {/* Left Section */}
                                        <div className="space-y-3 flex-1">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-warm-500 rounded-full flex items-center justify-center">
                                                    <ChefHat className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-800 capitalize">{booking.event_type}</h3>
                                                    <p className="text-gray-600">
                                                        {booking.services_selections?.providers?.join(', ') || 'Service Providers'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                                <div className="flex items-center space-x-2 text-gray-600">
                                                    <Calendar className="w-4 h-4" />
                                                    <span className="text-sm">
                                                        {dateKey ? new Date(dateKey).toLocaleDateString(undefined, {
                                                            day: 'numeric', month: 'short', year: 'numeric'
                                                        }) : 'Date TBD'}
                                                    </span>
                                                </div>
                                                {time && (
                                                    <div className="flex items-center space-x-2 text-gray-600">
                                                        <Clock className="w-4 h-4" />
                                                        <span className="text-sm">{time}</span>
                                                    </div>
                                                )}
                                                <div className="flex items-center space-x-2 text-gray-600">
                                                    <MapPin className="w-4 h-4" />
                                                    <span className="text-sm truncate max-w-[200px]" title={booking.event_address?.label || 'Location'}>
                                                        {booking.event_address?.label || (booking.event_address ? `${booking.event_address.city}, ${booking.event_address.state}` : 'Location TBD')}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-2 text-gray-600">
                                                    <User className="w-4 h-4" />
                                                    <span className="text-sm">
                                                        {(booking.guests?.adults || 0) + (booking.guests?.children || 0)} guests
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Section */}
                                        <div className="flex flex-col items-start lg:items-end space-y-3">
                                            <span className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${getStatusColor(booking.request_status)}`}>
                                                {booking.request_status}
                                            </span>
                                            <div className="flex flex-row items-center w-full   overflow-x-auto  space-x-2">
                                                {showTokenPay && (
                                                    <button
                                                        onClick={() => handlePayment(booking, 'token')}
                                                        disabled={isProcessingPaymentId === booking.id}
                                                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                                                    >
                                                        {isProcessingPaymentId === booking.id ? (
                                                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                                        ) : (
                                                            <CreditCard className="w-4 h-4 mr-2" />
                                                        )}
                                                        Pay Token (₹{tokenAmount})
                                                    </button>
                                                )}

                                                {showFinalPay && (
                                                    <button
                                                        onClick={() => handlePayment(booking, 'final')}
                                                        disabled={isProcessingPaymentId === booking.id}
                                                        className="px-4 whitespace-nowrap py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                                                    >
                                                        {isProcessingPaymentId === booking.id ? (
                                                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                                        ) : (
                                                            <CreditCard className="w-4 h-4 mr-2" />
                                                        )}
                                                        Final Pay (Complete)
                                                    </button>
                                                )}

                                                {showReview && (
                                                    <button
                                                        onClick={() => handleReview(booking)}
                                                        className="px-4 py-2 bg-yellow-400 text-yellow-900 rounded-lg hover:bg-yellow-500 transition-all text-sm font-bold flex items-center shadow-sm"
                                                    >
                                                        <CreditCard className="w-4 h-4 mr-2" /> {/* Maybe Star icon? */}
                                                        Review
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => handleViewPayments(booking)}
                                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium flex items-center"
                                                    title="View Payment History"
                                                >
                                                    <span className="text-base mr-2">💰</span>
                                                    Wallet
                                                </button>

                                                <button
                                                    onClick={() => handleView(booking)}
                                                    className="px-4 py-2 border border-primary-500 text-primary-600 rounded-lg hover:bg-primary-50 transition-all text-sm font-medium flex items-center"
                                                >
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(booking)}
                                                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all text-sm font-medium flex items-center"
                                                >
                                                    <Edit2 className="w-4 h-4 mr-2" />
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Pagination Controls */}
                {!loading && bookings.length > 0 && (
                    <div className="flex justify-center items-center space-x-4 mt-8">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={!prevPage}
                            className="p-2 border rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="text-gray-600 font-medium">
                            Page {currentPage} of {Math.max(totalPages, 1)}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            disabled={!nextPage}
                            className="p-2 border rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Empty State (if no bookings) */}
                {!loading && bookings.length === 0 && (
                    <div className="bg-white rounded-xl p-12 shadow-md text-center">
                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No bookings yet</h3>
                        <p className="text-gray-600 mb-6">Start by booking your first chef experience!</p>
                        <button onClick={()=> setIsEditModalOpen(true)} className="bg-gradient-to-r from-primary-500 to-warm-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-semibold">
                            Book a Chef
                        </button>
                    </div>
                )}

                {/* Edit Modal */}
                <BookingFlowModal
                    isOpen={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    existingBooking={editingBooking}
                />

                {/* View Details Modal */}
                <BookingDetailsModal
                    isOpen={isViewModalOpen}
                    onClose={handleCloseViewModal}
                    booking={viewingBooking}
                />

                {/* Payment History Modal */}
                <PaymentHistoryModal
                    isOpen={isPaymentHistoryOpen}
                    onClose={() => {
                        setIsPaymentHistoryOpen(false);
                        setViewingPaymentsBooking(undefined);
                    }}
                    booking={viewingPaymentsBooking}
                />

                {/* Review Modal */}
                {reviewingBooking && (
                    <ReviewModal
                        isOpen={isReviewModalOpen}
                        onClose={() => {
                            setIsReviewModalOpen(false);
                            setReviewingBooking(undefined);
                        }}
                        booking={reviewingBooking}
                        onSuccess={() => fetchBookings(currentPage)}
                    />
                )}
            </div>
        </DashboardLayout>
    );
}

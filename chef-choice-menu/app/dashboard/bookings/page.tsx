"use client";

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Calendar, Clock, MapPin, User, ChefHat, AlertCircle, Loader2, ChevronLeft, ChevronRight, Eye, Edit2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { BookingService, Booking } from '@/services/bookingService';
import BookingFlowModal from '@/components/booking/BookingFlowModal';
import BookingDetailsModal from '@/components/booking/BookingDetailsModal';
import { toast } from 'react-hot-toast';

export default function BookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
            // Calculate total pages roughly if count is mostly accurate
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

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-700';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700';
            case 'cancelled':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
                        <p className="text-gray-600 mt-1">View and manage your chef bookings</p>
                    </div>
                    <button className="bg-gradient-to-r from-primary-500 to-warm-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-semibold">
                        New Booking
                    </button>
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

                            return (
                                <div
                                    key={booking.id}
                                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
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
                                            <div className="flex space-x-2">
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
                        <button className="bg-gradient-to-r from-primary-500 to-warm-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-semibold">
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
            </div>
        </DashboardLayout>
    );
}

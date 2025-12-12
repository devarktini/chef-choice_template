"use client";

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Calendar, Clock, MapPin, User, ChefHat } from 'lucide-react';

export default function BookingsPage() {
    // Dummy booking data
    const bookings = [
        {
            id: 1,
            chefName: 'Chef John Doe',
            service: 'Private Dinner',
            date: '2025-12-15',
            time: '7:00 PM',
            location: 'Home',
            status: 'confirmed',
            guests: 6,
        },
        {
            id: 2,
            chefName: 'Chef Jane Smith',
            service: 'Cooking Class',
            date: '2025-12-20',
            time: '2:00 PM',
            location: 'Chef\'s Kitchen',
            status: 'pending',
            guests: 4,
        },
        {
            id: 3,
            chefName: 'Chef Mike Johnson',
            service: 'Event Catering',
            date: '2025-12-25',
            time: '6:00 PM',
            location: 'Event Venue',
            status: 'confirmed',
            guests: 50,
        },
    ];

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
                    {bookings.map((booking) => (
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
                                            <h3 className="text-lg font-bold text-gray-800">{booking.chefName}</h3>
                                            <p className="text-gray-600">{booking.service}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-sm">{booking.date}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <Clock className="w-4 h-4" />
                                            <span className="text-sm">{booking.time}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <MapPin className="w-4 h-4" />
                                            <span className="text-sm">{booking.location}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <User className="w-4 h-4" />
                                            <span className="text-sm">{booking.guests} guests</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Section */}
                                <div className="flex flex-col items-start lg:items-end space-y-3">
                                    <span className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${getStatusColor(booking.status)}`}>
                                        {booking.status}
                                    </span>
                                    <div className="flex space-x-2">
                                        <button className="px-4 py-2 border border-primary-500 text-primary-600 rounded-lg hover:bg-primary-50 transition-all text-sm font-medium">
                                            View Details
                                        </button>
                                        <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all text-sm font-medium">
                                            Message Chef
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State (if no bookings) */}
                {bookings.length === 0 && (
                    <div className="bg-white rounded-xl p-12 shadow-md text-center">
                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No bookings yet</h3>
                        <p className="text-gray-600 mb-6">Start by booking your first chef experience!</p>
                        <button className="bg-gradient-to-r from-primary-500 to-warm-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-semibold">
                            Book a Chef
                        </button>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

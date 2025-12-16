"use client";

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuthStore } from '@/stores/authStore';
import { Calendar, MessageSquare, Heart, TrendingUp, ClipboardList, Landmark, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { DashboardService } from '@/services/dashboardService';
import Link from 'next/link';

export default function DashboardPage() {
    const { user, clientProfile } = useAuthStore();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<any[]>([]);

    // Additional data states
    const [recentBookings, setRecentBookings] = useState<any[]>([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                if (user?.role === 'service_provider') {
                    const data = await DashboardService.getProviderSummary();
                    setStats([
                        { name: 'Total Bookings', value: data.bookings.total.toString(), icon: Calendar, color: 'from-blue-500 to-blue-600' },
                        { name: 'Pending Requests', value: data.bookings.pending.toString(), icon: ClipboardList, color: 'from-orange-500 to-orange-600' },
                        { name: 'Total Earnings', value: `₹${data.earnings.total_earnings || 0}`, icon: Landmark, color: 'from-green-500 to-green-600' },
                        { name: 'Completed Jobs', value: data.bookings.completed.toString(), icon: TrendingUp, color: 'from-purple-500 to-purple-600' },
                    ]);
                } else {
                    const data = await DashboardService.getUserSummary();
                    setStats([
                        { name: 'Total Bookings', value: data.bookings.total.toString(), icon: Calendar, color: 'from-blue-500 to-blue-600' },
                        { name: 'Active/Pending', value: data.bookings.pending.toString(), icon: MessageSquare, color: 'from-green-500 to-green-600' },
                        { name: 'Favorites', value: data.favorites.length.toString(), icon: Heart, color: 'from-red-500 to-red-600' },
                        { name: 'Total Spent', value: `₹${data.payments.total_spent || 0}`, icon: TrendingUp, color: 'from-primary-500 to-warm-500' },
                    ]);
                    // Optional: Fetch recent bookings if needed for activity feed
                    // const bookings = await BookingService.getBookings(1);
                    // setRecentBookings(bookings.results.slice(0, 3));
                }
            } catch (error) {
                console.error('Failed to fetch dashboard data', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-primary-500 to-warm-500 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold mb-2">
                            Welcome back, {user?.first_name}! 👋
                        </h1>
                        <p className="text-white/90">
                            {user?.role === 'service_provider'
                                ? "Here's an overview of your business performance."
                                : "Here's what's happening with your bookings today."}
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {loading ? (
                        // Skeletal Loader
                        Array(4).fill(0).map((_, i) => (
                            <div key={i} className="bg-white rounded-xl p-6 shadow-md animate-pulse h-32"></div>
                        ))
                    ) : (
                        stats.map((stat) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={stat.name}
                                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-500 text-sm font-medium">{stat.name}</p>
                                            <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                                        </div>
                                        <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center shadow-lg shadow-gray-200`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {user?.role === 'service_provider' ? (
                            <>
                                <button className="p-4 border-2 border-primary-100 bg-primary-50 text-primary-700 rounded-xl hover:bg-primary-100 transition-all font-semibold flex items-center justify-center gap-2">
                                    <ClipboardList className="w-5 h-5" />
                                    View Orders
                                </button>
                                <button className="p-4 border-2 border-warm-100 bg-warm-50 text-warm-700 rounded-xl hover:bg-warm-100 transition-all font-semibold flex items-center justify-center gap-2">
                                    <Landmark className="w-5 h-5" />
                                    Manage Finances
                                </button>
                                <button className="p-4 border-2 border-green-100 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-all font-semibold flex items-center justify-center gap-2">
                                    <User className="w-5 h-5" />
                                    Update Profile
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href='/dashboard/bookings' className="p-4 border-2 border-primary-500 text-primary-600 rounded-xl hover:bg-primary-50 transition-all font-semibold">
                                    Book a Chef
                                </Link>
                                <Link href='/dashboard/bookings' className="p-4 border-2 border-warm-500 text-warm-600 rounded-xl hover:bg-warm-50 transition-all font-semibold">
                                    View Bookings
                                </Link>
                                <Link href='/dashboard/chats' className="p-4 border-2 border-accent-500 text-accent-600 rounded-xl hover:bg-accent-50 transition-all font-semibold">
                                    Go to Chat
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

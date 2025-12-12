"use client";

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuthStore } from '@/stores/authStore';
import { Calendar, MessageSquare, Heart, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
    const { user, clientProfile } = useAuthStore();

    const stats = [
        { name: 'Total Bookings', value: '12', icon: Calendar, color: 'from-blue-500 to-blue-600' },
        { name: 'Active Chats', value: '3', icon: MessageSquare, color: 'from-green-500 to-green-600' },
        { name: 'Favorite Chefs', value: clientProfile?.favorite_chefs?.length || '0', icon: Heart, color: 'from-red-500 to-red-600' },
        { name: 'This Month', value: '4', icon: TrendingUp, color: 'from-primary-500 to-warm-500' },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-primary-500 to-warm-500 rounded-2xl p-8 text-white shadow-xl">
                    <h1 className="text-3xl font-bold mb-2">
                        Welcome back, {user?.first_name}! 👋
                    </h1>
                    <p className="text-white/90">
                        Heres whats happening with your bookings today.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.name}
                                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium">{stat.name}</p>
                                        <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                                    </div>
                                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-warm-500 rounded-full flex items-center justify-center text-white font-bold">
                                    {item}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800">Booking #{item} Confirmed</p>
                                    <p className="text-sm text-gray-500">2 days ago</p>
                                </div>
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                    Confirmed
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button className="p-4 border-2 border-primary-500 text-primary-600 rounded-lg hover:bg-primary-50 transition-all font-semibold">
                            Book a Chef
                        </button>
                        <button className="p-4 border-2 border-warm-500 text-warm-600 rounded-lg hover:bg-warm-50 transition-all font-semibold">
                            View Bookings
                        </button>
                        <button className="p-4 border-2 border-accent-500 text-accent-600 rounded-lg hover:bg-accent-50 transition-all font-semibold">
                            Message Chef
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

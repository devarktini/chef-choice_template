"use client";

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuthStore } from '@/stores/authStore';
import { 
    Calendar, MessageSquare, Heart, TrendingUp, ClipboardList, Landmark, User, 
    Star, ArrowRight, CheckCircle2, AlertCircle, Zap, Award, Clock, MapPin,
    ChevronRight, ArrowUpRight, ArrowDownRight, Activity, BarChart3, Flame
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { DashboardService } from '@/services/dashboardService';
import Link from 'next/link';

export default function DashboardPage() {
    const { user, clientProfile, serviceProviderProfile } = useAuthStore();
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
                        { name: 'Total Bookings', value: data.bookings.total.toString(), icon: Calendar, color: 'from-blue-500 to-blue-600', change: '+12%' },
                        { name: 'Pending Requests', value: data.bookings.pending.toString(), icon: ClipboardList, color: 'from-orange-500 to-orange-600', change: '+2' },
                        { name: 'Total Earnings', value: `₹${data.earnings.total_earnings || 0}`, icon: Landmark, color: 'from-green-500 to-green-600', change: '+8%' },
                        { name: 'Completed Jobs', value: data.bookings.completed.toString(), icon: TrendingUp, color: 'from-purple-500 to-purple-600', change: '+15' },
                    ]);
                } else {
                    const data = await DashboardService.getUserSummary();
                    setStats([
                        { name: 'Total Bookings', value: data.bookings.total.toString(), icon: Calendar, color: 'from-blue-500 to-blue-600', change: '+3' },
                        { name: 'Active/Pending', value: data.bookings.pending.toString(), icon: MessageSquare, color: 'from-green-500 to-green-600', change: '+1' },
                        { name: 'Favorites', value: data.favorites.length.toString(), icon: Heart, color: 'from-red-500 to-red-600', change: '+5' },
                        { name: 'Total Spent', value: `₹${data.payments.total_spent || 0}`, icon: TrendingUp, color: 'from-indigo-500 to-indigo-600', change: '-2%' },
                    ]);
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
            <div className="space-y-8 pb-20">
                {/* Welcome Section with Enhanced Design */}
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#e59f4a] via-[#e68125] to-[#d46f1f]"></div>
                    <div className="absolute inset-0 opacity-50">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-40 -mt-40 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
                    </div>
                    
                    <div className="relative z-10 p-8 md:p-12 text-white">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <p className="text-orange-100 text-sm font-semibold uppercase tracking-wide mb-2">
                                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                                </p>
                                <h1 className="text-4xl md:text-5xl font-bold mb-3">
                                    Welcome back, <span className="text-white drop-shadow-lg">{user?.first_name}!</span> 👋
                                </h1>
                                <p className="text-orange-50 text-lg">
                                    {user?.role === 'service_provider'
                                        ? "Here's your business performance at a glance. Keep the momentum going!"
                                        : "Ready to book your next experience? Explore amazing chefs near you."}
                                </p>
                            </div>
                            <div className="hidden lg:block">
                                <div className="bg-white/20 backdrop-blur-md rounded-full p-6 border border-white/30">
                                    <Zap className="w-12 h-12 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid with Enhanced Design */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {loading ? (
                        Array(4).fill(0).map((_, i) => (
                            <div key={i} className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl p-6 shadow-md animate-pulse h-40"></div>
                        ))
                    ) : (
                        stats.map((stat, index) => {
                            const Icon = stat.icon;
                            const isPositive = stat.change?.startsWith('+') || !stat.change?.includes('-');
                            return (
                                <div
                                    key={stat.name}
                                    className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 hover:border-orange-200"
                                    style={{
                                        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                                    }}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                        <div className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                            {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                            {stat.change}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm font-medium mb-2">{stat.name}</p>
                                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Quick Actions with Enhanced Design */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-md border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">⚡ Quick Actions</h2>
                        <div className="text-orange-500">
                            <Zap className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {user?.role === 'service_provider' ? (
                            <>
                                <Link href="/dashboard/orders" className="group p-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-50/50 rounded-xl hover:shadow-lg hover:border-blue-400 transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="p-3 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform">
                                            <ClipboardList className="w-6 h-6 text-white" />
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900">View Orders</h3>
                                    <p className="text-gray-600 text-sm mt-1">Manage pending & completed</p>
                                </Link>

                                <Link href="/dashboard/bank-accounts" className="group p-6 border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-50/50 rounded-xl hover:shadow-lg hover:border-green-400 transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="p-3 bg-green-500 rounded-lg group-hover:scale-110 transition-transform">
                                            <Landmark className="w-6 h-6 text-white" />
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900">Manage Finances</h3>
                                    <p className="text-gray-600 text-sm mt-1">Bank accounts & earnings</p>
                                </Link>

                                <Link href="/dashboard/profile" className="group p-6 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-50/50 rounded-xl hover:shadow-lg hover:border-purple-400 transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="p-3 bg-purple-500 rounded-lg group-hover:scale-110 transition-transform">
                                            <User className="w-6 h-6 text-white" />
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900">Update Profile</h3>
                                    <p className="text-gray-600 text-sm mt-1">Edit details & portfolio</p>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href='/summary' className="group p-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-50/50 rounded-xl hover:shadow-lg hover:border-blue-400 transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="p-3 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform">
                                            <Calendar className="w-6 h-6 text-white" />
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900">Book a Chef</h3>
                                    <p className="text-gray-600 text-sm mt-1">Find & book top chefs</p>
                                </Link>

                                <Link href='/dashboard/bookings' className="group p-6 border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-50/50 rounded-xl hover:shadow-lg hover:border-green-400 transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="p-3 bg-green-500 rounded-lg group-hover:scale-110 transition-transform">
                                            <CheckCircle2 className="w-6 h-6 text-white" />
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900">View Bookings</h3>
                                    <p className="text-gray-600 text-sm mt-1">Check your reservations</p>
                                </Link>

                                <Link href='/dashboard/chats' className="group p-6 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-50/50 rounded-xl hover:shadow-lg hover:border-purple-400 transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="p-3 bg-purple-500 rounded-lg group-hover:scale-110 transition-transform">
                                            <MessageSquare className="w-6 h-6 text-white" />
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900">Messages</h3>
                                    <p className="text-gray-600 text-sm mt-1">Chat with chefs</p>
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Two Column Layout for Additional Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Upcoming Section - Takes 2 columns on large screens */}
                    <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-orange-500" />
                                Upcoming {user?.role === 'service_provider' ? 'Bookings' : 'Events'}
                            </h2>
                            <Link href={user?.role === 'service_provider' ? '/dashboard/bookings' : '/dashboard/bookings'} className="text-orange-600 hover:text-orange-700 text-sm font-semibold flex items-center gap-1">
                                View all <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                        
                        <div className="space-y-4">
                            {[
                                {
                                    title: user?.role === 'service_provider' ? 'Premium Party Catering' : 'Chef: Marco\'s Italian Cuisine',
                                    date: 'Dec 28, 2024',
                                    time: '6:00 PM',
                                    status: 'confirmed',
                                    guests: user?.role === 'service_provider' ? '15 guests' : 'For 4 people',
                                    icon: Flame
                                },
                                {
                                    title: user?.role === 'service_provider' ? 'Corporate Lunch Event' : 'Chef: Rajesh Kumar - Indian',
                                    date: 'Dec 30, 2024',
                                    time: '1:00 PM',
                                    status: 'pending',
                                    guests: user?.role === 'service_provider' ? '20 guests' : 'For 6 people',
                                    icon: Clock
                                },
                                {
                                    title: user?.role === 'service_provider' ? 'Wedding Catering' : 'Chef: Sarah\'s Gourmet Kitchen',
                                    date: 'Jan 5, 2025',
                                    time: '7:00 PM',
                                    status: 'confirmed',
                                    guests: user?.role === 'service_provider' ? '50+ guests' : 'For 8 people',
                                    icon: Star
                                }
                            ].map((booking, idx) => {
                                const BookingIcon = booking.icon;
                                return (
                                    <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50/30 transition-all duration-300 group cursor-pointer">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-4 flex-1">
                                                <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg group-hover:scale-110 transition-transform">
                                                    <BookingIcon className="w-5 h-5 text-orange-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900">{booking.title}</h3>
                                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                                        <span className="flex items-center gap-1">📅 {booking.date}</span>
                                                        <span className="flex items-center gap-1">🕐 {booking.time}</span>
                                                        <span className="flex items-center gap-1">👥 {booking.guests}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                                                booking.status === 'confirmed' 
                                                    ? 'bg-green-100 text-green-700' 
                                                    : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                                {booking.status === 'confirmed' ? '✓ Confirmed' : '⏳ Pending'}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        {/* Performance Card */}
                        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-lg">Your Score</h3>
                                <Award className="w-6 h-6 text-indigo-200" />
                            </div>
                            <p className="text-4xl font-bold mb-2">4.8</p>
                            <p className="text-indigo-100 text-sm mb-4">Based on 48 reviews</p>
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                                ))}
                            </div>
                        </div>

                        {/* Activity Stats */}
                        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-green-500" />
                                Activity
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 text-sm">This Month</span>
                                    <span className="font-bold text-gray-900">24</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{width: '75%'}}></div>
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <span className="text-gray-600 text-sm">This Week</span>
                                    <span className="font-bold text-gray-900">8</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{width: '45%'}}></div>
                                </div>
                            </div>
                        </div>

                        {/* Help Card */}
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-6 border border-orange-200">
                            <AlertCircle className="w-5 h-5 text-orange-600 mb-3" />
                            <h3 className="font-bold text-gray-900 mb-2">Need Help?</h3>
                            <p className="text-gray-700 text-sm mb-4">Check our help center for guides and FAQ</p>
                            <Link href="/dashboard/help" className="inline-block text-orange-600 hover:text-orange-700 font-semibold text-sm">
                                Visit Help Center →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Testimonials / Reviews Section */}
                {/* <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                        <Star className="w-6 h-6 text-yellow-500" />
                        {user?.role === 'service_provider' ? 'Client Testimonials' : 'Top Rated Chefs'}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {user?.role === 'service_provider' ? (
                            // Provider testimonials
                            [
                                {
                                    name: 'Priya Sharma',
                                    role: 'Event Organizer',
                                    text: 'Exceptional service and attention to detail. Highly recommended!',
                                    rating: 5
                                },
                                {
                                    name: 'Rahul Patel',
                                    role: 'Corporate Client',
                                    text: 'Professional catering with delicious food. Will book again!',
                                    rating: 5
                                },
                                {
                                    name: 'Neha Gupta',
                                    role: 'Wedding Planner',
                                    text: 'Outstanding culinary skills and presentation. Perfect execution!',
                                    rating: 5
                                }
                            ]
                        ) : (
                            // Client - top chefs
                            [
                                {
                                    name: 'Marco Rossi',
                                    role: 'Italian Cuisine Expert',
                                    text: 'Authentic Italian dining experience right at your home.',
                                    rating: 4.9
                                },
                                {
                                    name: 'Rajesh Kumar',
                                    role: 'Indian Culinary Master',
                                    text: 'Traditional recipes with modern presentation. Simply amazing!',
                                    rating: 4.8
                                },
                                {
                                    name: 'Sarah Johnson',
                                    role: 'Gourmet Chef',
                                    text: 'Fine dining experience with impeccable service.',
                                    rating: 4.9
                                }
                            ]
                        ).map((item, idx) => (
                            <div key={idx} className="p-6 border border-gray-200 rounded-lg hover:border-orange-300 hover:shadow-lg transition-all duration-300 group">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-4 italic">"{item.text}"</p>
                                <div>
                                    <p className="font-semibold text-gray-900">{item.name}</p>
                                    <p className="text-gray-600 text-sm">{item.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}

                {/* Stats Bar Section */}
                {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'Profile Completeness', value: '95%', icon: CheckCircle2, color: 'text-green-500' },
                        { label: 'Response Rate', value: '98%', icon: MessageSquare, color: 'text-blue-500' },
                        { label: 'Member Since', value: '2 years', icon: Clock, color: 'text-purple-500' },
                        { label: 'Total Transactions', value: '156', icon: TrendingUp, color: 'text-orange-500' }
                    ].map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div key={idx} className="bg-white rounded-lg p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 text-center">
                                <Icon className={`w-6 h-6 mx-auto mb-2 ${item.color}`} />
                                <p className="text-gray-600 text-xs font-medium mb-1">{item.label}</p>
                                <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                            </div>
                        );
                    })}
                </div> */}
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </DashboardLayout>
    );
}

"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import {
    LayoutDashboard,
    User,
    Calendar,
    MessageSquare,
    Briefcase,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuthStore();

    // Define menu items based on user role
    const clientMenuItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Profile', href: '/dashboard/profile', icon: User },
        { name: 'Bookings', href: '/dashboard/bookings', icon: Calendar },
        { name: 'Chats', href: '/dashboard/chats', icon: MessageSquare },
    ];

    const serviceProviderMenuItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Profile', href: '/dashboard/profile', icon: User },
        { name: 'Services', href: '/dashboard/services', icon: Briefcase },
        { name: 'Bookings', href: '/dashboard/bookings', icon: Calendar },
        { name: 'Chats', href: '/dashboard/chats', icon: MessageSquare },
    ];

    const menuItems = user?.role === 'service_provider' ? serviceProviderMenuItems : clientMenuItems;

    const handleLogout = () => {
        logout();
        window.location.href = '/';
    };

    return (
        <>
            {/* Desktop Sidebar (Hidden on Mobile) */}
            <aside className="hidden lg:block fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 bg-white shadow-xl border-r border-gray-100 z-40">
                <div className="flex flex-col h-full">
                    {/* User Profile Section */}
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-warm-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-800 truncate">
                                    {user?.first_name} {user?.last_name}
                                </p>
                                <p className="text-sm text-gray-500 capitalize">{user?.role?.replace('_', ' ')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-gradient-to-r from-primary-500 to-warm-500 text-white shadow-md'
                                        : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-gray-100">
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 w-full"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Bottom Navigation (Visible only on Mobile) */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 pb-safe">
                <div className="flex justify-around items-center h-16">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive
                                    ? 'text-primary-600'
                                    : 'text-gray-500 hover:text-primary-500'
                                    }`}
                            >
                                <Icon className={`w-6 h-6 ${isActive ? 'fill-current opacity-20' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
                                <span className="text-[10px] font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}

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
    X,
    ClipboardList,
    Landmark,
    FileText
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
        { name: 'Order', href: '/dashboard/orders', icon: ClipboardList },
        { name: 'Bank Accounts', href: '/dashboard/bank-accounts', icon: Landmark },
        { name: 'Documents', href: '/dashboard/documents', icon: FileText },
        { name: 'Services', href: '/dashboard/services', icon: Briefcase },
    ];

    const menuItems = user?.role === 'service_provider' ? serviceProviderMenuItems : clientMenuItems;

    const handleLogout = () => {
        logout();
        window.location.href = '/';
    };

    return (
        <>
            {/* Desktop Sidebar (Hidden on Mobile) */}
            <aside className="hidden lg:block fixed left-0 top-20 h-[calc(100vh-5rem)] w-72 bg-gradient-to-b from-primary-50/50 via-white to-warm-50/50 backdrop-blur-xl border-r border-white/20 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] z-40">
                <div className="flex flex-col h-full">
                    {/* User Profile Section */}
                    <div className="p-6">
                        <div className="bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-sm flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-warm-500 rounded-xl rotate-3 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-500/20">
                                {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-gray-800 truncate">
                                    {user?.first_name} {user?.last_name}
                                </p>
                                <div className="flex items-center mt-0.5">
                                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                                    <p className="text-xs text-gray-500 capitalize font-medium">{user?.role?.replace('_', ' ')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                        <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-2">Menu</p>
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`group flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden ${isActive
                                        ? 'text-primary-700 shadow-md transform scale-[1.02]'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                                        }`}
                                >
                                    {isActive && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-warm-50 opacity-100 rounded-xl -z-10" />
                                    )}
                                    <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} strokeWidth={isActive ? 2.5 : 2} />
                                    <span className={`font-semibold tracking-wide ${isActive ? 'bg-gradient-to-r from-primary-700 to-warm-700 bg-clip-text text-transparent' : ''}`}>
                                        {item.name}
                                    </span>
                                    {isActive && (
                                        <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-primary-500" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 pb-8">
                        <button
                            onClick={handleLogout}
                            className="group flex items-center space-x-3 px-4 py-3.5 rounded-xl text-red-600 hover:bg-red-50/80 hover:shadow-sm border border-transparent hover:border-red-100 transition-all duration-200 w-full"
                        >
                            <div className="p-2 bg-red-100/50 rounded-lg group-hover:bg-red-100 transition-colors">
                                <LogOut className="w-5 h-5" />
                            </div>
                            <span className="font-semibold">Logout</span>
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

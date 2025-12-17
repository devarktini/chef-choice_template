"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import {
  LayoutDashboard,
  User,
  Calendar,
  MessageSquare,
  Briefcase,
  LogOut,
  ClipboardList,
  Landmark,
  FileText,
  ChefHat,
  Settings,
  HelpCircle,
  Home,
  DollarSign,
  Package,
  Users,
  Star,
  TrendingUp,
  Menu,
  X,
  Shield,
  ChevronDown,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('.sidebar-mobile') && !target.closest('.mobile-menu-toggle')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  const clientMenuItems = [
    { 
      name: "Dashboard", 
      href: "/dashboard", 
      icon: LayoutDashboard,
    },
    { 
      name: "Profile", 
      href: "/dashboard/profile", 
      icon: User,
      submenu: [
        { name: "Personal Info", href: "/dashboard/profile" },
      ]
    },
    { 
      name: "Bookings", 
      href: "/dashboard/bookings", 
      icon: Calendar,
      submenu: [
        { name: "All Bookings", href: "/dashboard/bookings" },
      ]
    },
    { 
      name: "Messages", 
      href: "/dashboard/chats", 
      icon: MessageSquare,
    },
  ];

  const serviceProviderMenuItems = [
    { 
      name: "Dashboard", 
      href: "/dashboard", 
      icon: LayoutDashboard,
    },
    { 
      name: "Profile", 
      href: "/dashboard/profile", 
      icon: User,
      submenu: [
        { name: "Chef Profile", href: "/dashboard/profile" },
        { name: "Menu & Services", href: "/dashboard/profile/menu" },
        { name: "Gallery", href: "/dashboard/profile/gallery" },
      ]
    },
    { 
      name: "Bookings", 
      href: "/dashboard/bookings", 
      icon: Calendar,
      submenu: [
        { name: "All Bookings", href: "/dashboard/bookings" },
        { name: "Pending", href: "/dashboard/bookings?filter=pending" },
        { name: "Confirmed", href: "/dashboard/bookings?filter=confirmed" },
        { name: "Calendar View", href: "/dashboard/bookings/calendar" },
      ]
    },
    { 
      name: "Orders", 
      href: "/dashboard/orders", 
      icon: Package,
    },
    { 
      name: "Earnings", 
      href: "/dashboard/earnings", 
      icon: Landmark,
      submenu: [
        { name: "Overview", href: "/dashboard/earnings" },
        { name: "Transactions", href: "/dashboard/earnings/transactions" },
        { name: "Withdraw", href: "/dashboard/earnings/withdraw" },
      ]
    },
    { 
      name: "Clients", 
      href: "/dashboard/clients", 
      icon: Users
    },
    { 
      name: "Services", 
      href: "/dashboard/services", 
      icon: Briefcase,
      submenu: [
        { name: "All Services", href: "/dashboard/services" },
        { name: "Add New", href: "/dashboard/services/new" },
        { name: "Packages", href: "/dashboard/services/packages" },
      ]
    },
    { 
      name: "Reviews", 
      href: "/dashboard/reviews", 
      icon: Star,
    },
    { 
      name: "Analytics", 
      href: "/dashboard/analytics", 
      icon: TrendingUp
    },
    { 
      name: "Documents", 
      href: "/dashboard/documents", 
      icon: FileText
    },
  ];

  const menuItems = user?.role === "service_provider" 
    ? [...serviceProviderMenuItems]
    : [...clientMenuItems];

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const toggleSubmenu = (itemName: string) => {
    setActiveSubmenu(activeSubmenu === itemName ? null : itemName);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* User Profile */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {user?.first_name?.[0]}{user?.last_name?.[0]}
            </span>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <p className="font-medium text-gray-900 truncate">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-xs text-gray-500 capitalize mt-0.5">
              {user?.role?.replace("_", " ")}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-3 space-y-1 overflow-y-auto bg-white">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || 
            (item.submenu && item.submenu.some(sub => pathname === sub.href));
          
          const hasSubmenu = item.submenu;

          return (
            <div key={item.name} className="relative">
              {hasSubmenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors text-sm
                      ${isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeSubmenu === item.name ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Submenu */}
                  {activeSubmenu === item.name && (
                    <div className="ml-7 mt-1 mb-2 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`block py-1.5 px-3 rounded text-sm transition-colors ${
                            pathname === subItem.href
                              ? "text-blue-600 bg-blue-50 font-medium"
                              : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm
                    ${isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )}
            </div>
          );
        })}

        {/* Logout */}
        <div className="pt-4  absolute bottom-20 w-full left-0  border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar - Fixed on left */}
      <aside className="hidden lg:flex fixed left-0 top-16 h-screen w-64 border-r border-gray-200 bg-white flex-col z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow"
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5 text-gray-700" />
        ) : (
          <Menu className="w-5 h-5 text-gray-700" />
        )}
      </button>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 z-50 transition-transform
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <ChefHat className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-gray-900">Chef's Choice</h1>
                  <p className="text-xs text-gray-500">Dashboard</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="flex-1 overflow-y-auto">
            <SidebarContent />
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
        <div className="px-2 py-2 flex justify-around">
          {menuItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            );
          })}
          
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center py-2 px-3 rounded-lg text-gray-600 hover:text-gray-900"
          >
            <Menu className="w-5 h-5" />
            <span className="text-xs mt-1">More</span>
          </button>
        </div>
      </nav>
    </>
  );
}
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
  Package,
  Users,
  Star,
  TrendingUp,
  Menu,
  X,
  ChevronDown,
  Home,
  ShoppingBag,
  CreditCard,
  Bell,
  Globe,
  Shield,
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
      badge: "3",
    },
    {
      name: "My Profile",
      href: "/dashboard/profile",
      icon: User,
      submenu: [
        { name: "Personal Info", href: "/dashboard/profile" },
        // { name: "Settings", href: "/dashboard/profile/settings" },
      ]
    },
    {
      name: "Bookings",
      href: "/dashboard/bookings",
      icon: Calendar,
      badge: "5",
      submenu: [
        { name: "All Bookings", href: "/dashboard/bookings" },
        // { name: "Upcoming", href: "/dashboard/bookings?filter=upcoming" },
        // { name: "Completed", href: "/dashboard/bookings?filter=completed" },
      ]
    },
    {
      name: "Messages",
      href: "/dashboard/chats",
      icon: MessageSquare,
      badge: "12",
    },
    // {
    //   name: "Payments",
    //   href: "/dashboard/payments",
    //   icon: CreditCard,
    // },
    // {
    //   name: "Favorites",
    //   href: "/dashboard/favorites",
    //   icon: Star,
    // },
  ];

  //  const serviceProviderMenuItems = [
  //       { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  //       { name: 'Profile', href: '/dashboard/profile', icon: User },
  //       { name: 'Order', href: '/dashboard/orders', icon: ClipboardList },
  //       { name: 'Bank Accounts', href: '/dashboard/bank-accounts', icon: Landmark },
  //       { name: 'Documents', href: '/dashboard/documents', icon: FileText },
  //       { name: 'Services', href: '/dashboard/services', icon: Briefcase },
  //   ];

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
        // { name: "Menu & Services", href: "/dashboard/profile/menu" },
        // { name: "Gallery", href: "/dashboard/profile/gallery" },
      ]
    },
    {
      name: "Orders",
      href: "/dashboard/orders",
      icon: ShoppingBag,
      badge: "12",
    },
    {
      name: "Bank Accounts",
      href: "/dashboard/bank-accounts",
      icon: Landmark,
    },
    {
      name: "Documents",
      href: "/dashboard/documents",
      icon: FileText,
      badge: "45",
    },
    {
      name: "Services",
      href: "/dashboard/services",
      icon: Briefcase,
      badge: "45",
    },
    // {
    //   name: "Bookings",
    //   href: "/dashboard/bookings",
    //   icon: Calendar,
    //   badge: "8",
    //   submenu: [
    //     { name: "Bookings", href: "/dashboard/bookings" },
    //     // { name: "Pending", href: "/dashboard/bookings?filter=pending" },
    //     // { name: "Confirmed", href: "/dashboard/bookings?filter=confirmed" },
    //     // { name: "Calendar", href: "/dashboard/bookings/calendar" },
    //   ]
    // },
    
    // {
    //   name: "Earnings",
    //   href: "/dashboard/earnings",
    //   icon: Landmark,
    //   submenu: [
    //     { name: "Overview", href: "/dashboard/earnings" },
    //     { name: "Transactions", href: "/dashboard/earnings/transactions" },
    //     { name: "Withdraw", href: "/dashboard/earnings/withdraw" },
    //   ]
    // },
    // {
    //   name: "Clients",
    //   href: "/dashboard/clients",
    //   icon: Users,
    // },
    // {
    //   name: "Services",
    //   href: "/dashboard/services",
    //   icon: Briefcase,
    //   submenu: [
    //     { name: "All Services", href: "/dashboard/services" },
    //     { name: "Add New", href: "/dashboard/services/new" },
    //     { name: "Packages", href: "/dashboard/services/packages" },
    //   ]
    // },
    
    // {
    //   name: "Analytics",
    //   href: "/dashboard/analytics",
    //   icon: TrendingUp,
    // },
  ];

  const commonItems = [
    {
      name: "Notifications",
      href: "/dashboard/notifications",
      icon: Bell,
      badge: "3",
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      submenu: [
        { name: "Account", href: "/dashboard/settings/account" },
        { name: "Security", href: "/dashboard/settings/security" },
        { name: "Preferences", href: "/dashboard/settings/preferences" },
      ]
    },
    {
      name: "Help Center",
      href: "/dashboard/help",
      icon: HelpCircle,
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
    <div className="flex flex-col h-full ">
      {/* User Profile Card */}
      <div className="p-3 bg-gradient-to-br from-[#e59f4a] to-[#e68125] text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center">
            <span className="text-xl font-bold">
              {user?.first_name?.[0]}{user?.last_name?.[0]}
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="font-bold text-lg truncate">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-blue-100 text-sm capitalize">
              {user?.role?.replace("_", " ")}
            </p>
          </div>
        </div>
        {/* <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
            <Shield className="w-3 h-3" />
            <span>Verified</span>
          </div>
          <Link 
            href="/dashboard/profile" 
            className="text-white/80 hover:text-white text-sm hover:underline"
          >
            View Profile →
          </Link>
        </div> */}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3">
          Main Menu
        </p>
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href ||
            (item.submenu && item.submenu.some(sub => pathname === sub.href));

          const hasSubmenu = item.submenu;

          return (
            <div key={item.name} className="relative group">
              {hasSubmenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`flex items-center justify-between w-full px-3 py-3 rounded-xl transition-all duration-200
                      ${isActive
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 shadow-sm border border-[#e68125s]"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isActive ? "bg-blue-100" : "bg-gray-100 group-hover:bg-blue-50"}`}>
                        <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-gray-600 group-hover:text-blue-500"}`} />
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* {item.badge && (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                          {item.badge}
                        </span>
                      )} */}
                      <ChevronDown className={`w-4 h-4 transition-transform ${activeSubmenu === item.name ? 'rotate-180 text-blue-500' : 'text-gray-400'}`} />
                    </div>
                  </button>

                  {/* Submenu */}
                  {activeSubmenu === item.name && (
                    <div className="ml-3 mt-1 mb-3 space-y-1 pl-9 border-l-2 border-gray-100">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`block py-2.5 px-3 rounded-lg text-sm transition-all ${pathname === subItem.href
                              ? "text-blue-600 bg-blue-50 font-medium border border-blue-100"
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
                  className={`flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 group
                    ${isActive
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 shadow-sm border border-blue-100"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isActive ? "bg-blue-100" : "bg-gray-100 group-hover:bg-blue-50"}`}>
                      <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-gray-600 group-hover:text-blue-500"}`} />
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  {/* {item.badge && (
                    <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                      {item.badge}
                    </span>
                  )} */}
                </Link>
              )}
            </div>
          );
        })}

        {/* Common Items */}
        {/* <div className="pt-6 mt-6 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3">
            Account
          </p>
          
          {commonItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            const hasSubmenu = item.submenu;

            if (hasSubmenu) {
              return (
                <div key={item.name} className="relative group">
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`flex items-center justify-between w-full px-3 py-3 rounded-xl transition-all duration-200
                      ${isActive
                        ? "bg-gray-50 text-gray-900"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isActive ? "bg-gray-200" : "bg-gray-100"}`}>
                        <Icon className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                          {item.badge}
                        </span>
                      )}
                      <ChevronDown className={`w-4 h-4 transition-transform ${activeSubmenu === item.name ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {activeSubmenu === item.name && (
                    <div className="ml-3 mt-1 mb-3 space-y-1 pl-9 border-l-2 border-gray-100">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`block py-2.5 px-3 rounded-lg text-sm transition-all ${pathname === subItem.href
                              ? "text-blue-600 bg-blue-50 font-medium border border-blue-100"
                              : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                            }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 group
                  ${isActive
                    ? "bg-gray-50 text-gray-900"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isActive ? "bg-gray-200" : "bg-gray-100"}`}>
                    <Icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div> */}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm hover:shadow"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-white flex-col z-30 shadow-xl">
        {/* Logo */}
        {/* <div className="p-6 border-b border-gray-100 ">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Chef's Choice</h1>
              <p className="text-xs text-gray-500">Professional Dashboard</p>
            </div>
          </div>
        </div> */}

        <div className="flex-1 mt-20 overflow-y-auto">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="hidden fixed top-6 left-6 z-50 p-3 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg mobile-menu-toggle"
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed left-0 top-0 h-screen w-80 bg-white border-r border-gray-200 z-50 transition-transform duration-300 shadow-2xl
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-indigo-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Chef's Choice</h1>
                  <p className="text-xs text-blue-100">Mobile Menu</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="flex-1 overflow-y-auto">
            <SidebarContent />
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl">
        <div className="px-4 py-3 flex justify-around">
          {menuItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center py-2 px-4 rounded-xl transition-all relative
                  ${isActive
                    ? "text-blue-600 bg-gradient-to-b from-blue-50 to-white"
                    : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-1.5 font-medium">
                  {item.name}
                </span>
                {isActive && (
                  <div className="absolute -top-1 w-8 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                )}
              </Link>
            );
          })}
          
          {/* More Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center py-2 px-4 rounded-xl text-gray-600 hover:text-gray-900"
          >
            <div className="p-1.5 rounded-lg bg-gray-100">
              <Menu className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-1.5 font-medium">More</span>
          </button>
        </div>
      </nav>
    </>
  );
}
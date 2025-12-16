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
  ChevronLeft,
  ChevronRight,
  ChefHat,
  Settings,
  Bell,
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
} from "lucide-react";

export default function Sidebar({isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
//   const [isCollapsed, setIsCollapsed] = useState(false);
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
      badge: "New"
    },
    { 
      name: "Profile", 
      href: "/dashboard/profile", 
      icon: User,
      submenu: [
        { name: "Personal Info", href: "/dashboard/profile" },
        // { name: "Security", href: "/dashboard/profile/security" },
        // { name: "Preferences", href: "/dashboard/profile/preferences" },
      ]
    },
    { 
      name: "Bookings", 
      href: "/dashboard/bookings", 
      icon: Calendar,
      badge: "3",
      submenu: [
        { name: "All Bookings", href: "/dashboard/bookings" },
        // { name: "Upcoming", href: "/dashboard/bookings?filter=upcoming" },
        // { name: "Past", href: "/dashboard/bookings?filter=past" },
      ]
    },
    { 
      name: "Messages", 
      href: "/dashboard/chats", 
      icon: MessageSquare,
      badge: "5"
    },
    // { 
    //   name: "Favorites", 
    //   href: "/dashboard/favorites", 
    //   icon: Star
    // },
    // { 
    //   name: "Payments", 
    //   href: "/dashboard/payments", 
    //   icon: DollarSign
    // },
  ];

  const serviceProviderMenuItems = [
    { 
      name: "Dashboard", 
      href: "/dashboard", 
      icon: LayoutDashboard,
      badge: "New"
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
      badge: "8",
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
      badge: "12"
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
      badge: "45"
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

  const commonItems = [
    { 
      name: "Settings", 
      href: "/dashboard/settings", 
      icon: Settings
    },
    { 
      name: "Help & Support", 
      href: "/dashboard/support", 
      icon: HelpCircle
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
    <>
      {/* Sidebar Header */}
      <div className={` ${isCollapsed ? 'px-4' : 'px-6'} py-6 border-b border-gray-100`}>
        <div className="flex items-center gap-3">
          <div className={`relative ${isCollapsed ? 'w-10 h-10' : 'w-12 h-12'} rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg`}>
            <ChefHat className={`${isCollapsed ? 'w-5 h-5' : 'w-6 h-6'} text-white`} />
          </div>
          
          {!isCollapsed && (
            <div className="flex-1">
                {!isCollapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="text-lg font-semibold truncate text-gray-900">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-xs opacity-90 capitalize mt-1">
                  {user?.role?.replace("_", " ")}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <Shield className="w-3 h-3" />
                  <span className="text-xs">Verified Profile</span>
                </div>
              </div>
            )}
            </div>
          )}
          
          {!isCollapsed && (
            <button 
              onClick={() => setIsCollapsed(true)}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {/* User Profile Card */}

      {/* Navigation Menu */}
      <nav className="flex-1 px-2 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || 
            (item.submenu && item.submenu.some(sub => pathname === sub.href));
          
          const hasSubmenu = item.submenu && !isCollapsed;

          return (
            <div key={item.name} className="relative">
              {hasSubmenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`group relative flex items-center w-full gap-3 ${isCollapsed ? 'px-3' : 'px-4'} py-3 rounded-xl transition-all
                      ${isActive
                        ? "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700"
                        : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    <div className="relative">
                      <Icon className="w-5 h-5" />
                      {/* {item.badge && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                          {item.badge}
                        </span>
                      )} */}
                    </div>
                    
                    <span className="font-medium tracking-wide flex-1 text-left">
                      {item.name}
                    </span>
                    
                    <ChevronRight className={`w-4 h-4 transition-transform ${activeSubmenu === item.name ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {/* Submenu */}
                  {activeSubmenu === item.name && (
                    <div className="ml-10 mt-1 space-y-1 animate-slide-down">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`block py-2 px-3 rounded-lg text-sm transition-colors ${
                            pathname === subItem.href
                              ? "text-amber-600 bg-amber-50 font-medium"
                              : "text-gray-600 hover:text-amber-600 hover:bg-amber-50/50"
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
                  className={`group relative flex items-center gap-3 ${isCollapsed ? 'px-3 justify-center' : 'px-4'} py-3 rounded-xl transition-all
                    ${isActive
                      ? "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:rounded-r-full before:bg-gradient-to-b before:from-amber-500 before:to-orange-500"
                      : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  <div className="relative">
                    <Icon className="w-5 h-5" />
                    {/* {item.badge && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )} */}
                  </div>
                  
                  {!isCollapsed && (
                    <>
                      <span className="font-medium tracking-wide flex-1">
                        {item.name}
                      </span>
                      
                      {isActive && (
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      )}
                    </>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      {item.name}
                      {item.badge && (
                        <span className="ml-2 px-1.5 py-0.5 bg-red-500 text-xs rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* Logout & Collapse Button */}
      <div className={`p-4 border-t border-gray-100 ${isCollapsed ? 'px-3' : ''}`}>
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition ${isCollapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
        
        {isCollapsed && (
          <button
            onClick={() => setIsCollapsed(false)}
            className="mt-4 flex items-center justify-center w-full p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className={`hidden lg:block fixed left-0 top-0 h-screen z-50 transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-72'} bg-white border-r border-gray-100 shadow-xl`}>
        
        <div className="flex flex-col h-full">
          <SidebarContent />
        </div>
        
        {/* Expand Button (Shows when collapsed) */}
        {isCollapsed && (
          <button
            onClick={() => setIsCollapsed(false)}
            className="absolute -right-3 top-24 bg-white border border-gray-200 rounded-full p-1.5 shadow-lg hover:shadow-xl transition-all"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        )}
      </aside>

      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-lg mobile-menu-toggle"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* ================= MOBILE SIDEBAR ================= */}
      <aside className={`lg:hidden fixed left-0 top-0 h-screen z-50 sidebar-mobile transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} w-72 bg-white border-r border-gray-100 shadow-2xl`}>
        
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Chef's Choice</h1>
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

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl">
        <div className="px-4 py-3 flex justify-between">
          {menuItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center w-full py-2 rounded-xl transition-all relative
                  ${isActive
                    ? "text-amber-600"
                    : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-1 font-medium">
                  {item.name}
                </span>
                {isActive && (
                  <div className="absolute -top-1 w-8 h-0.5 bg-amber-500 rounded-full"></div>
                )}
              </Link>
            );
          })}
          
          {/* More Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center w-full py-2 rounded-xl text-gray-500 hover:text-gray-700"
          >
            <div className="relative">
              <Menu className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-1 font-medium">More</span>
          </button>
        </div>
      </nav>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slideDown 0.2s ease-out;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f59e0b, #f97316);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #d97706, #ea580c);
        }
      `}</style>
    </>
  );
}
"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuthStore } from "@/stores/authStore";
import {
  Calendar,
  MessageSquare,
  Heart,
  TrendingUp,
  ClipboardList,
  Landmark,
  User,
  Star,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Zap,
  Award,
  Clock,
  MapPin,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  BarChart3,
  Flame,
  ChefHat,
  Users,
  DollarSign,
  Home,
  Baby,
  Users2,
  PartyPopper,
  HeartHandshake,
  Cake,
} from "lucide-react";
import { useState, useEffect } from "react";
import { DashboardService } from "@/services/dashboardService";
import { BookingService } from "@/services/bookingService";
import Link from "next/link";

export default function DashboardPage() {
  const { user, clientProfile, serviceProviderProfile } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [stats, setStats] = useState<any[]>([]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);

  // Fetch dashboard stats
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        if (user?.role === "service_provider") {
          const data = await DashboardService.getProviderSummary();
          setStats([
            {
              name: "Total Bookings",
              value: data.bookings.total.toString(),
              icon: Calendar,
              color: "from-blue-500 to-blue-600",
              change: "+12%",
            },
            {
              name: "Pending Requests",
              value: data.bookings.pending.toString(),
              icon: ClipboardList,
              color: "from-orange-500 to-orange-600",
              change: "+2",
            },
            {
              name: "Total Earnings",
              value: `₹${data.earnings.total_earnings || 0}`,
              icon: Landmark,
              color: "from-green-500 to-green-600",
              change: "+8%",
            },
            {
              name: "Completed Jobs",
              value: data.bookings.completed.toString(),
              icon: TrendingUp,
              color: "from-purple-500 to-purple-600",
              change: "+15",
            },
          ]);
        } else {
          const data = await DashboardService.getUserSummary();
          setStats([
            {
              name: "Total Bookings",
              value: data.bookings.total.toString(),
              icon: Calendar,
              color: "from-blue-500 to-blue-600",
              change: "+3",
            },
            {
              name: "Active/Pending",
              value: data.bookings.pending.toString(),
              icon: MessageSquare,
              color: "from-green-500 to-green-600",
              change: "+1",
            },
            {
              name: "Favorites",
              value: data.favorites.length.toString(),
              icon: Heart,
              color: "from-red-500 to-red-600",
              change: "+5",
            },
            {
              name: "Total Spent",
              value: `₹${data.payments.total_spent || 0}`,
              icon: TrendingUp,
              color: "from-indigo-500 to-indigo-600",
              change: "-2%",
            },
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  // Fetch bookings data
  useEffect(() => {
    const fetchBookingsData = async () => {
      try {
        setBookingsLoading(true);
        const data = await BookingService.getBookings();
        console.log("Bookings data:", data);

        let upcomingBookings = [];

        if (user?.role === "service_provider") {
          // For service providers: filter upcoming jobs
          upcomingBookings = data.results || [];

          // Filter upcoming events and sort by date
          upcomingBookings = upcomingBookings
            .filter(booking => {
              // Check if booking is upcoming (any date in the future)
              const dates = booking.dates ? Object.keys(booking.dates) : [];
              if (dates.length === 0) return false;

              const earliestDate = new Date(dates[0]);
              return earliestDate > new Date();
            })
            .sort((a, b) => {
              const aDates = a.dates ? Object.keys(a.dates) : [];
              const bDates = b.dates ? Object.keys(b.dates) : [];
              if (aDates.length === 0 || bDates.length === 0) return 0;

              return new Date(aDates[0]).getTime() - new Date(bDates[0]).getTime();
            })
            .slice(0, 3); // Get only 3 upcoming bookings
        } else {
          // For clients: filter upcoming events
          upcomingBookings = data.results || [];

          // Filter upcoming events and sort by date
          upcomingBookings = upcomingBookings
            .filter(booking => {
              // Check if any booking date is in the future
              const dates = booking.dates ? Object.keys(booking.dates) : [];
              if (dates.length === 0) return false;

              const earliestDate = new Date(dates[0]);
              return earliestDate > new Date();
            })
            .sort((a, b) => {
              const aDates = a.dates ? Object.keys(a.dates) : [];
              const bDates = b.dates ? Object.keys(b.dates) : [];
              if (aDates.length === 0 || bDates.length === 0) return 0;

              return new Date(aDates[0]).getTime() - new Date(bDates[0]).getTime();
            })
            .slice(0, 3);
        }

        console.log("Filtered upcoming bookings:", upcomingBookings);
        setRecentBookings(upcomingBookings);
      } catch (error) {
        console.error("Failed to fetch bookings data", error);
        setRecentBookings([]);
      } finally {
        setBookingsLoading(false);
      }
    };

    if (user) {
      fetchBookingsData();
    }
  }, [user]);

  // Format date for display
  const formatDate = (dateString: any) => {
    if (!dateString) return "Date not set";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  // Format time for display
  const formatTime = (timeString: any) => {
    if (!timeString) return "Time not set";
    return timeString;
  };

  // Get booking status color
  const getStatusColor = (status: any) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
      case "completed":
        return { bg: "bg-green-100", text: "text-green-700", label: "✓ Confirmed" };
      case "pending":
      case "awaiting_confirmation":
        return { bg: "bg-yellow-100", text: "text-yellow-700", label: "⏳ Pending" };
      case "cancelled":
      case "rejected":
        return { bg: "bg-red-100", text: "text-red-700", label: "✗ Cancelled" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-700", label: status || "Pending" };
    }
  };

  // Get event type icon
  const getEventIcon = (eventType: any) => {
    switch (eventType?.toLowerCase()) {
      case "family gathering":
      case "family event":
        return Home;
      case "baby shower":
        return Baby;
      case "festival celebration":
        return PartyPopper;
      case "engagement":
        return HeartHandshake;
      case "anniversary":
        return Cake;
      case "marriage":
      case "wedding":
        return Users2;
      default:
        return Calendar;
    }
  };

  // Get appropriate icon based on booking type
  const getBookingIcon = (booking: any) => {
    if (user?.role === "service_provider") {
      return ChefHat;
    } else {
      return getEventIcon(booking.event_type);
    }
  };

  // Get booking title based on role
  const getBookingTitle = (booking: any) => {
    if (user?.role === "service_provider") {
      return booking.client
        ? `${booking.client.first_name} ${booking.client.last_name}'s Event`
        : booking.event_type || "Service Booking";
    } else {
      return booking.event_type || "Event Booking";
    }
  };

  // Get booking details based on role
  const getBookingDetails = (booking: any) => {
    const totalGuests = (booking.guests?.adults || 0) +
      (booking.guests?.children || 0) +
      (booking.guests?.babies || 0);

    if (user?.role === "service_provider") {
      return {
        guests: `${totalGuests} ${totalGuests === 1 ? 'guest' : 'guests'}`,
        service: booking.event_type || "Catering Service",
        location: booking.event_address ?
          `${booking.event_address.city}, ${booking.event_address.state}` :
          "Location not specified",
        dates: booking.dates ? Object.keys(booking.dates) : [],
      };
    } else {
      return {
        guests: `${totalGuests} ${totalGuests === 1 ? 'person' : 'people'}`,
        service: booking.event_type || "Chef Service",
        location: booking.event_address ?
          `${booking.event_address.city}, ${booking.event_address.state}` :
          "Location not specified",
        dates: booking.dates ? Object.keys(booking.dates) : [],
      };
    }
  };

  // Get first date for display
  const getFirstDate = (booking: any) => {
    if (!booking.dates || Object.keys(booking.dates).length === 0) {
      return null;
    }
    return Object.keys(booking.dates)[0];
  };

  // Get meal timing for a specific date
  const getMealTiming = (booking: any, date: any) => {
    if (!booking.meal_timings || !date || !booking.meal_timings[date]) {
      return "Time not set";
    }
    return booking.meal_timings[date].time || "Time not specified";
  };

  // Count menu items
  const countMenuItems = (booking: any) => {
    if (!booking.menu_items_details) return 0;

    if (Array.isArray(booking.menu_items_details.items)) {
      return booking.menu_items_details.items.length;
    }

    // Handle different menu structures
    if (typeof booking.menu_items_details === 'object') {
      const keys = Object.keys(booking.menu_items_details);
      let total = 0;
      keys.forEach(key => {
        if (Array.isArray(booking.menu_items_details[key])) {
          total += booking.menu_items_details[key].length;
        }
      });
      return total;
    }

    return 0;
  };

  // Get cuisine type
  const getCuisineType = (booking: any) => {
    if (!booking.food_cuisines_preferences) return "Not specified";

    const type = booking.food_cuisines_preferences.type;
    return type === "veg" ? "Vegetarian" :
      type === "non_veg" ? "Non-Vegetarian" :
        type || "Not specified";
  };

  // Get payment amount
  const getPaymentAmount = (booking: any) => {
    if (booking.payment_details && booking.payment_details.length > 0) {
      const totalPaid = booking.payment_details.reduce((sum: any, payment: any) => {
        return sum + (parseFloat(payment.amount) || 0);
      }, 0);
      return totalPaid;
    }
    return booking.estimated_cost || booking.token_amount_required || null;
  };

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
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h1 className="text-4xl md:text-5xl font-bold mb-3">
                  Welcome back,{" "}
                  <span className="text-white drop-shadow-lg">
                    {user?.first_name}!
                  </span>{" "}
                  👋
                </h1>
                <p className="text-orange-50 text-lg">
                  {user?.role === "service_provider"
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
          {loading
            ? Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl p-6 shadow-md animate-pulse h-40"
                ></div>
              ))
            : stats.map((stat, index) => {
              const Icon = stat.icon;
              const isPositive =
                stat.change?.startsWith("+") || !stat.change?.includes("-");
              return (
                <div
                  key={stat.name}
                  className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 hover:border-orange-200"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm font-medium mb-2">
                    {stat.name}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              );
            })}
        </div>

        {/* Quick Actions with Enhanced Design */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              ⚡ Quick Actions
            </h2>
            <div className="text-orange-500">
              <Zap className="w-6 h-6" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {user?.role === "service_provider" ? (
              <>
                <Link
                  href="/dashboard/orders"
                  className="group p-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-50/50 rounded-xl hover:shadow-lg hover:border-blue-400 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform">
                      <ClipboardList className="w-6 h-6 text-white" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="font-semibold text-gray-900">View Orders</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Manage pending & completed
                  </p>
                </Link>

                <Link
                  href="/dashboard/bank-accounts"
                  className="group p-6 border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-50/50 rounded-xl hover:shadow-lg hover:border-green-400 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 bg-green-500 rounded-lg group-hover:scale-110 transition-transform">
                      <Landmark className="w-6 h-6 text-white" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Manage Finances
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Bank accounts & earnings
                  </p>
                </Link>

                <Link
                  href="/dashboard/profile"
                  className="group p-6 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-50/50 rounded-xl hover:shadow-lg hover:border-purple-400 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 bg-purple-500 rounded-lg group-hover:scale-110 transition-transform">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Update Profile
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Edit details & portfolio
                  </p>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/summary"
                  className="group p-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-50/50 rounded-xl hover:shadow-lg hover:border-blue-400 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Book a Chef</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Find & book top chefs
                  </p>
                </Link>

                <Link
                  href="/dashboard/bookings"
                  className="group p-6 border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-50/50 rounded-xl hover:shadow-lg hover:border-green-400 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 bg-green-500 rounded-lg group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="font-semibold text-gray-900">View Bookings</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Check your reservations
                  </p>
                </Link>

                <Link
                  href="/dashboard/chats"
                  className="group p-6 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-50/50 rounded-xl hover:shadow-lg hover:border-purple-400 transition-all duration-300 hover:-translate-y-1"
                >
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
                Upcoming {user?.role === "service_provider" ? "Bookings" : "Events"}
              </h2>
              <Link
                href={
                  user?.role === "service_provider"
                    ? "/dashboard/bookings"
                    : "/dashboard/bookings"
                }
                className="text-orange-600 hover:text-orange-700 text-sm font-semibold flex items-center gap-1"
              >
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {bookingsLoading ? (
                // Loading skeleton for bookings
                Array(3)
                  .fill(0)
                  .map((_, idx) => (
                    <div
                      key={idx}
                      className="p-4 border border-gray-200 rounded-lg animate-pulse"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="p-3 bg-gray-200 rounded-lg"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                        <div className="h-6 bg-gray-200 rounded w-20"></div>
                      </div>
                    </div>
                  ))
              ) : recentBookings.length > 0 ? (
                // Actual bookings data
                recentBookings.map((booking, idx) => {
                  const statusColors = getStatusColor(booking.request_status);
                  const BookingIcon = getBookingIcon(booking);
                  const bookingTitle = getBookingTitle(booking);
                  const bookingDetails = getBookingDetails(booking);
                  const firstDate = getFirstDate(booking);
                  const firstDateFormatted = firstDate ? formatDate(firstDate) : "Date not set";
                  const mealTiming = firstDate ? getMealTiming(booking, firstDate) : "Time not set";
                  const menuItemCount = countMenuItems(booking);
                  const cuisineType = getCuisineType(booking);
                  const paymentAmount = getPaymentAmount(booking);

                  return (
                    <Link
                      key={booking.id || idx}
                      href={`/dashboard/bookings/${booking.id}`}
                      className="block"
                    >
                      <div className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50/30 transition-all duration-300 group cursor-pointer">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg group-hover:scale-110 transition-transform">
                              <BookingIcon className="w-5 h-5 text-orange-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">
                                {bookingTitle}
                              </h3>

                              {/* Event date and time */}
                              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  📅 {firstDateFormatted}
                                </span>
                                <span className="flex items-center gap-1">
                                  🕐 {formatTime(mealTiming)}
                                </span>
                              </div>

                              {/* Booking details */}
                              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Users className="w-4 h-4" /> {bookingDetails.guests}
                                </span>
                                <span className="flex items-center gap-1">
                                  <ChefHat className="w-4 h-4" /> {cuisineType}
                                </span>
                                {menuItemCount > 0 && (
                                  <span className="flex items-center gap-1">
                                    🍽️ {menuItemCount} {menuItemCount === 1 ? 'dish' : 'dishes'}
                                  </span>
                                )}
                                {bookingDetails.dates.length > 1 && (
                                  <span className="flex items-center gap-1">
                                    📆 {bookingDetails.dates.length} days
                                  </span>
                                )}
                              </div>

                              {/* Location if available */}
                              {bookingDetails.location && (
                                <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
                                  <MapPin className="w-4 h-4" /> {bookingDetails.location}
                                </div>
                              )}

                              {/* Payment info if available */}
                              {paymentAmount && (
                                <div className="flex items-center gap-1 mt-2 text-sm font-medium text-green-700">
                                  <DollarSign className="w-4 h-4" /> ₹{paymentAmount}
                                  {booking.request_status === "confirmed" && " - Confirmed"}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${statusColors.bg} ${statusColors.text}`}>
                            {statusColors.label}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                // No bookings message
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No upcoming {user?.role === "service_provider" ? "bookings" : "events"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {user?.role === "service_provider"
                      ? "When you receive booking requests, they'll appear here."
                      : "Your upcoming events will appear here once you book a chef."}
                  </p>
                  <Link
                    href={user?.role === "service_provider" ? "/dashboard" : "/summary"}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    {user?.role === "service_provider" ? "Explore Opportunities" : "Browse Chefs"}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Your Score</h3>
                <Award className="w-6 h-6 text-indigo-200" />
              </div>
              <p className="text-4xl font-bold mb-2">4.8</p>
              <p className="text-indigo-100 text-sm mb-4">
                Based on 48 reviews
              </p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-300 text-yellow-300"
                  />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-500" />
                Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">This Month</span>
                  <span className="font-bold text-gray-900">
                    {recentBookings.length > 0 ? recentBookings.length : "0"}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                    style={{ width: `${Math.min((recentBookings.length / 3) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-gray-600 text-sm">This Week</span>
                  <span className="font-bold text-gray-900">
                    {recentBookings.filter(booking => {
                      const firstDate = getFirstDate(booking);
                      if (!firstDate) return false;
                      const bookingDate = new Date(firstDate);
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return bookingDate > weekAgo;
                    }).length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>
            </div> */}


            <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-6 border border-orange-200">
              <AlertCircle className="w-5 h-5 text-orange-600 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-700 text-sm mb-4">
                Check our help center for guides and FAQ
              </p>
              <Link
                href="/contact"
                className="inline-block text-orange-600 hover:text-orange-700 font-semibold text-sm"
              >
                Visit Help Center →
              </Link>
            </div>
          </div>
        </div>
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
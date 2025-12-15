"use client";

import { Booking } from '@/services/bookingService';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, User, Utensils, ChefHat, FileText, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

interface BookingDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking?: Booking;
}

export default function BookingDetailsModal({ isOpen, onClose, booking }: BookingDetailsModalProps) {
    const { user } = useAuthStore();

    if (!isOpen || !booking) return null;

    return (
        <div className="fixed inset-0 z-[120] h-[100dvh] w-screen flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            {/* Modal Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-xl font-bold text-gray-800 capitalize">
                                {booking.event_type} Event
                            </h2>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${booking.request_status === 'approved' || booking.request_status === 'confirmed'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                {booking.request_status}
                            </span>
                        </div>
                        <p className="text-xs text-gray-500">Booking ID: {booking.id}</p>
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Dates & Times */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                            <h3 className="text-sm font-semibold text-blue-800 mb-3 flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                Dates & Times
                            </h3>
                            <div className="space-y-2">
                                {Object.entries(booking.dates || {}).map(([key, dateStr]) => {
                                    const timing = booking.meal_timings?.[key];
                                    return (
                                        <div key={key} className="text-sm bg-white p-2 rounded border border-blue-50">
                                            <p className="font-medium text-gray-700">{new Date(dateStr).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                                            {timing && (
                                                <div className="text-gray-500 text-xs mt-1 flex gap-2">
                                                    <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {timing.time}</span>
                                                    <span>•</span>
                                                    <span>{timing.meals.join(', ')}</span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Location */}
                        <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100">
                            <h3 className="text-sm font-semibold text-orange-800 mb-3 flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                Location
                            </h3>
                            {booking.event_address ? (
                                <div className="text-sm text-gray-700 space-y-1">
                                    <p className="font-medium">{booking.event_address.label}</p>
                                    <p>{booking.event_address.address_line1}</p>
                                    {booking.event_address.address_line2 && <p>{booking.event_address.address_line2}</p>}
                                    <p>{booking.event_address.city}, {booking.event_address.state} - {booking.event_address.zip_code}</p>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-400 italic">No address selected</p>
                            )}
                        </div>
                    </div>

                    {/* Menu & Food */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center border-b pb-2">
                            <Utensils className="w-4 h-4 mr-2" />
                            Menu & Preferences
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Preferences</p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700 capitalize">
                                        Type: {booking.food_cuisines_preferences?.type?.replace('_', ' ') || 'N/A'}
                                    </span>
                                    {booking.food_cuisines_preferences?.cuisines?.map(c => (
                                        <span key={c} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700 capitalize">
                                            {c.replace('_', ' ')}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Selected Items</p>
                                <div className="flex flex-wrap gap-2">
                                    {booking.menu_items_details?.items?.length > 0 ? (
                                        booking.menu_items_details.items.map(item => (
                                            <span key={item} className="px-2 py-1 border border-gray-200 rounded text-xs text-gray-600 capitalize">
                                                {item.replace(/_/g, ' ')}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-xs text-gray-400 italic">No items selected</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Guests & Services */}
                    <div className="grid grid-cols-2 gap-6 pt-4 border-top border-gray-100">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                                <User className="w-4 h-4 mr-2" />
                                Guests
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-700">
                                <div>
                                    <span className="block font-bold text-lg">{booking.guests?.adults || 0}</span>
                                    <span className="text-xs text-gray-500">Adults</span>
                                </div>
                                <div className="w-px h-8 bg-gray-200"></div>
                                <div>
                                    <span className="block font-bold text-lg">{booking.guests?.children || 0}</span>
                                    <span className="text-xs text-gray-500">Children</span>
                                </div>
                                <div className="w-px h-8 bg-gray-200"></div>
                                <div>
                                    <span className="block font-bold text-lg">{booking.guests?.babies || 0}</span>
                                    <span className="text-xs text-gray-500">Babies</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                                <ChefHat className="w-4 h-4 mr-2" />
                                Requested Services
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {booking.services_selections?.providers?.length > 0 ? (
                                    booking.services_selections.providers.map(p => (
                                        <span key={p} className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs font-medium capitalize">
                                            {p.replace(/_/g, ' ')}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-xs text-gray-400 italic">None selected</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700"
                    >
                        Close
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

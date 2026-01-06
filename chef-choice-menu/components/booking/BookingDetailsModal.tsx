"use client";

import { Booking } from '@/services/bookingService';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Calendar, Clock, MapPin, User, Utensils, ChefHat, FileText, CheckCircle2,
  Home, Flame, Package, Users, Award, Phone, Mail, MessageSquare
} from 'lucide-react';
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
                className="relative w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-2xl font-bold text-gray-800 capitalize">
                                {booking.event_type} Event Booking
                            </h2>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                                booking.request_status === 'approved' || booking.request_status === 'confirmed'
                                    ? 'bg-green-100 text-green-700'
                                    : booking.request_status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-red-100 text-red-700'
                            }`}>
                                {booking.request_status}
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">ID: {booking.id}</p>
                        <p className="text-xs text-gray-500">Created: {new Date(booking.created_date).toLocaleString()}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Client Information */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-100">
                        <h3 className="text-sm font-bold text-purple-800 mb-4 flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Client Information
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <p className="text-xs font-medium text-purple-600 mb-1">Name</p>
                                <p className="text-sm font-semibold text-gray-800">
                                    {booking.client?.first_name} {booking.client?.last_name}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-purple-600 mb-1">Email</p>
                                <p className="text-sm text-gray-700 flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                    {booking.client?.email}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-purple-600 mb-1">Phone</p>
                                <p className="text-sm text-gray-700 flex items-center gap-1">
                                    <Phone className="w-3 h-3" />
                                    {(booking.client as any)?.phone || 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Event Details */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Event Dates & Times */}
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border border-blue-100">
                            <h3 className="text-sm font-bold text-blue-800 mb-4 flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                Event Dates & Meals
                            </h3>
                            <div className="space-y-3">
                                {Object.entries(booking.dates || {}).map(([dateKey, dateStr]) => {
                                    const timing = booking.meal_timings?.[dateKey];
                                    return (
                                        <div key={dateKey} className="bg-white p-3 rounded-lg border border-blue-200">
                                            <p className="font-semibold text-gray-800 flex items-center gap-2">
                                                📅 {new Date(dateStr).toLocaleDateString(undefined, { 
                                                    weekday: 'short', 
                                                    month: 'short', 
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                            {timing && (
                                                <div className="text-xs text-gray-600 mt-2 space-y-1">
                                                    <p className="flex items-center gap-2">
                                                        <Clock className="w-3 h-3" /> 
                                                        <span className="font-medium">Meals:</span> {timing.meals.map(m => m.replace(/_/g, ' ')).join(', ')}
                                                    </p>
                                                    {timing.time && (
                                                        <p><span className="font-medium">Time:</span> {timing.time}</p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Location */}
                        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-5 rounded-xl border border-orange-100">
                            <h3 className="text-sm font-bold text-orange-800 mb-4 flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                Event Location
                            </h3>
                            {booking.event_address ? (
                                <div className="text-sm text-gray-700 space-y-2 bg-white p-3 rounded-lg border border-orange-200">
                                    <div>
                                        <p className="text-xs font-medium text-orange-600">Full Address</p>
                                        <p className="font-semibold text-gray-800">{booking.event_address.address_line1}</p>
                                    </div>
                                    {booking.event_address.address_line2 && (
                                        <p className="text-xs text-gray-600">{booking.event_address.address_line2}</p>
                                    )}
                                    <div className="flex gap-4 text-xs pt-2 border-t border-gray-100">
                                        <span><strong>City:</strong> {booking.event_address.city}</span>
                                        <span><strong>State:</strong> {booking.event_address.state}</span>
                                        <span><strong>ZIP:</strong> {booking.event_address.zip_code}</span>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-400 italic">No address selected</p>
                            )}
                        </div>
                    </div>

                    {/* Food Preferences & Menu */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2 pb-3 border-b-2 border-gray-200">
                            <Utensils className="w-5 h-5 text-amber-600" />
                            Food Preferences & Selected Menu
                        </h3>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            {/* Food Type & Cuisines */}
                            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-lg border border-red-200">
                                <p className="text-xs font-bold text-red-700 mb-3 flex items-center gap-2">
                                    <Flame className="w-4 h-4" />
                                    Food Type & Cuisines
                                </p>
                                <div className="space-y-2">
                                    <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold capitalize">
                                        {booking.food_cuisines_preferences?.type?.replace('_', ' ') || 'N/A'}
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {booking.food_cuisines_preferences?.cuisines?.map(c => (
                                            <span key={c} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold capitalize">
                                                {c.replace('_', ' ')}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Guests */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                                <p className="text-xs font-bold text-blue-700 mb-3 flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    Guest Details
                                </p>
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div>
                                        <p className="text-2xl font-bold text-blue-700">{booking.guests?.adults || 0}</p>
                                        <p className="text-xs text-gray-600">Adults</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-blue-700">{booking.guests?.children || 0}</p>
                                        <p className="text-xs text-gray-600">Children</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-blue-700">{booking.guests?.babies || 0}</p>
                                        <p className="text-xs text-gray-600">Babies</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Selected Menu Items */}
                        {booking.menu_items_details?.items && booking.menu_items_details.items.length > 0 && (
                            <div className="bg-white p-4 rounded-lg border-2 border-amber-200">
                                <p className="text-xs font-bold text-amber-700 mb-3 flex items-center gap-2">
                                    <ChefHat className="w-4 h-4" />
                                    Selected Menu Items ({booking.menu_items_details.items.length})
                                </p>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {booking.menu_items_details.items.map((item: any, idx: number) => (
                                        <div key={idx} className="bg-gradient-to-r from-amber-50 to-yellow-50 p-3 rounded-lg border border-amber-100">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-semibold text-gray-800">{item.name}</p>
                                                    <div className="flex gap-2 mt-1 flex-wrap">
                                                        <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded">
                                                            {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                        </span>
                                                        <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded capitalize">
                                                            {item.mealType?.replace('_', ' ')}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-600 mt-1">
                                                        <span className="font-medium">{item.cuisine}</span> • {item.category}
                                                    </p>
                                                </div>
                                                <span className="text-xs bg-white px-2 py-1 rounded font-semibold text-gray-700">
                                                    ID: {item.dishId}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Service Provider */}
                    {booking.services_selections?.providers && booking.services_selections.providers.length > 0 && (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-xl border border-green-100">
                            <h3 className="text-sm font-bold text-green-800 mb-4 flex items-center gap-2">
                                <Award className="w-5 h-5" />
                                Selected Service Providers
                            </h3>
                            <div className="space-y-2">
                                {booking.services_selections.providers.map((providerId: string) => (
                                    <div key={providerId} className="bg-white p-3 rounded-lg border border-green-200 flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-sm font-semibold text-gray-800">{providerId}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Kitchen & Materials */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-100">
                        <h3 className="text-sm font-bold text-purple-800 mb-4 flex items-center gap-2">
                            <Home className="w-5 h-5" />
                            Kitchen & Materials
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs font-semibold text-purple-700 mb-2">Kitchen Type</p>
                                <p className="px-3 py-2 bg-white rounded-lg border border-purple-200 text-sm font-medium text-gray-800 capitalize">
                                    {booking.client_materials?.kitchen_type?.replace('_', ' ') || 'N/A'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-purple-700 mb-2">Appliances Available</p>
                                {booking.client_materials?.kitchen_appliances && booking.client_materials.kitchen_appliances.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {booking.client_materials.kitchen_appliances.map((app: string) => (
                                            <span key={app} className="text-xs px-2 py-1 bg-white rounded border border-purple-200 capitalize">
                                                {app.replace('_', ' ')}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs text-gray-500 italic">None specified</p>
                                )}
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-purple-700 mb-2">Utensils Provided</p>
                                {booking.client_materials?.utensils && booking.client_materials.utensils.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {booking.client_materials.utensils.map((utensil: string) => (
                                            <span key={utensil} className="text-xs px-2 py-1 bg-white rounded border border-purple-200 capitalize">
                                                {utensil.replace('_', ' ')}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs text-gray-500 italic">None specified</p>
                                )}
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-purple-700 mb-2">Provided Materials</p>
                                {booking.client_materials?.provided_materials && booking.client_materials.provided_materials.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {booking.client_materials.provided_materials.map((material: string) => (
                                            <span key={material} className="text-xs px-2 py-1 bg-white rounded border border-purple-200 capitalize">
                                                {material.replace('_', ' ')}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs text-gray-500 italic">None specified</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Other Requirements */}
                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-5 rounded-xl border border-cyan-100">
                        <h3 className="text-sm font-bold text-cyan-800 mb-4 flex items-center gap-2">
                            <Package className="w-5 h-5" />
                            Additional Requirements
                        </h3>
                        <div className="space-y-3">
                            {booking.other_requirements?.additional_services && booking.other_requirements.additional_services.length > 0 && (
                                <div>
                                    <p className="text-xs font-semibold text-cyan-700 mb-2">Additional Services</p>
                                    <div className="flex flex-wrap gap-2">
                                        {booking.other_requirements.additional_services.map((service: string) => (
                                            <span key={service} className="text-xs px-2 py-1 bg-white rounded border border-cyan-200 capitalize">
                                                {service.replace('_', ' ')}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {booking.other_requirements?.ambience && booking.other_requirements.ambience.length > 0 && (
                                <div>
                                    <p className="text-xs font-semibold text-cyan-700 mb-2">Ambience Preferences</p>
                                    <div className="flex flex-wrap gap-2">
                                        {booking.other_requirements.ambience.map((item: string) => (
                                            <span key={item} className="text-xs px-2 py-1 bg-white rounded border border-cyan-200 capitalize">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {booking.other_requirements?.transportation && booking.other_requirements.transportation.length > 0 && (
                                <div>
                                    <p className="text-xs font-semibold text-cyan-700 mb-2">Transportation Needs</p>
                                    <div className="flex flex-wrap gap-2">
                                        {booking.other_requirements.transportation.map((item: string) => (
                                            <span key={item} className="text-xs px-2 py-1 bg-white rounded border border-cyan-200 capitalize">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {booking.other_requirements?.dietary_restrictions && booking.other_requirements.dietary_restrictions.length > 0 && (
                                <div>
                                    <p className="text-xs font-semibold text-cyan-700 mb-2">Dietary Restrictions</p>
                                    <div className="flex flex-wrap gap-2">
                                        {booking.other_requirements.dietary_restrictions.map((item: string) => (
                                            <span key={item} className="text-xs px-2 py-1 bg-white rounded border border-cyan-200 capitalize">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {booking.other_requirements?.entertainment && booking.other_requirements.entertainment.length > 0 && (
                                <div>
                                    <p className="text-xs font-semibold text-cyan-700 mb-2">Entertainment</p>
                                    <div className="flex flex-wrap gap-2">
                                        {booking.other_requirements.entertainment.map((item: string) => (
                                            <span key={item} className="text-xs px-2 py-1 bg-white rounded border border-cyan-200 capitalize">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {booking.other_requirements?.special_requests && (
                                <div>
                                    <p className="text-xs font-semibold text-cyan-700 mb-2">Special Requests</p>
                                    <p className="text-sm text-gray-700 bg-white p-3 rounded border border-cyan-200">
                                        {booking.other_requirements.special_requests || 'None'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Conversation & Status */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {booking.conversation && (
                            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-200">
                                <p className="text-xs font-bold text-indigo-700 mb-3 flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4" />
                                    Conversation
                                </p>
                                <div className="text-sm text-gray-700 space-y-1">
                                    <p><strong>ID:</strong> {booking.conversation.id}</p>
                                    <p><strong>Started:</strong> {new Date(booking.conversation.created_date).toLocaleString()}</p>
                                    {/* <p><strong>Unread Messages:</strong> {booking.unread_message_count || 0}</p> */}
                                </div>
                            </div>
                        )}
                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-lg border border-gray-300">
                            <p className="text-xs font-bold text-gray-700 mb-3">Booking Timeline</p>
                            <div className="text-xs text-gray-600 space-y-1">
                                <p><strong>Created:</strong> {new Date(booking.created_date).toLocaleString()}</p>
                                <p><strong>Updated:</strong> {new Date(booking.updated_date).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
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


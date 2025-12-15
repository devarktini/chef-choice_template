"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ProviderService } from '@/services/providerService';
import { ServiceProviderProfile } from '@/types/auth'; // Ensure this type is updated or used correctly
import { Star, MapPin, Award, CheckCircle, Shield, Briefcase, User, Calendar, MessageSquare, Heart } from 'lucide-react';
import { toast, Toaster } from 'sonner';

// Define Service Interface locally if not global
interface Service {
    id: string;
    title: string;
    service_type: string;
    description: string;
    price: string | number;
    price_unit: string;
    min_capacity: number;
    max_capacity: number;
    is_active: boolean;
    created_at?: string;
}

export default function ServiceProviderProfilePage() {
    const params = useParams();
    const [provider, setProvider] = useState<ServiceProviderProfile & { user: any; services: Service[] } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.id) {
            fetchProvider(params.id as string);
        }
    }, [params.id]);

    const fetchProvider = async (id: string) => {
        try {
            setLoading(true);
            const data = await ProviderService.getProviderById(id) as any;
            setProvider(data);
        } catch (error) {
            console.error('Failed to fetch provider', error);
            toast.error('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (!provider) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Provider Not Found</h1>
                <p className="text-gray-500">The service provider you are looking for does not exist or has been removed.</p>
                <a href="/" className="mt-6 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">Go Home</a>
            </div>
        );
    }

    // Helper to get service badge color
    const getServiceColor = (type: string) => {
        switch (type) {
            case 'chef': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'catering': return 'bg-green-100 text-green-700 border-green-200';
            case 'hall': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'tent': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'decoration': return 'bg-pink-100 text-pink-700 border-pink-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Toaster position="top-center" />

            {/* Header / Cover */}
            <div className="h-64 md:h-80 bg-gradient-to-r from-primary-600 to-warm-500 relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Basic Info Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-8">
                            <div className="p-8 flex flex-col items-center text-center border-b border-gray-100">
                                <div className="w-32 h-32 bg-white rounded-full p-2 shadow-lg mb-4 -mt-20 relative z-20">
                                    <div className="w-full h-full bg-gradient-to-br from-primary-100 to-warm-100 rounded-full flex items-center justify-center text-4xl font-bold text-primary-600 overflow-hidden">
                                        {provider.company_name ? provider.company_name.charAt(0) : <User className="w-12 h-12" />}
                                    </div>
                                    {provider.verified && (
                                        <div className="absolute bottom-2 right-2 bg-blue-500 text-white p-1 rounded-full shadow-md border-2 border-white">
                                            <CheckCircle className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>

                                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                                    {provider.company_name || 'Individual Provider'}
                                </h1>
                                <p className="text-gray-500 font-medium mb-4 flex items-center justify-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {provider.service_area ? provider.service_area.split(',')[0] : 'Location N/A'}
                                </p>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="bg-yellow-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-yellow-100">
                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                        <span className="font-bold text-gray-900">{provider.avg_rating || 'New'}</span>
                                    </div>
                                    <div className="bg-blue-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-blue-100">
                                        <Shield className="w-4 h-4 text-blue-500" />
                                        <span className="font-bold text-gray-900 line-clamp-1 text-sm">{provider.provider_type}</span>
                                    </div>
                                </div>

                                {/* Buttons hidden as per request */}
                                {/* 
                                <button className="w-full py-3 bg-gradient-to-r from-primary-600 to-warm-600 text-white rounded-xl font-bold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    Book Now
                                </button>
                                <button className="w-full mt-3 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                                    <MessageSquare className="w-5 h-5" />
                                    Message
                                </button> 
                                */}
                            </div>

                            <div className="p-6 bg-gray-50/50 space-y-4">
                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Service Types</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {provider.service_type?.split(',').map((type: string) => (
                                            <span key={type} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600 shadow-sm capitalize">
                                                {type.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Experience</h3>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Award className="w-5 h-5 text-primary-500" />
                                        <span className="font-medium">{provider.experience_years} Years Experience</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details & Services */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* About Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-primary-500" />
                                About
                            </h2>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                {provider.description || "No description provided."}
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-gray-900">{provider.review_count || 0}</div>
                                    <div className="text-sm text-gray-500 font-medium uppercase tracking-wide mt-1">Reviews</div>
                                </div>
                                <div className="text-center border-l border-r border-gray-100">
                                    <div className="text-3xl font-bold text-gray-900">{provider.services?.length || 0}</div>
                                    <div className="text-sm text-gray-500 font-medium uppercase tracking-wide mt-1">Services</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-gray-900">100%</div>
                                    <div className="text-sm text-gray-500 font-medium uppercase tracking-wide mt-1">Response Rate</div>
                                </div>
                            </div>
                        </div>

                        {/* Services List */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-primary-500" />
                                Services Offered ({provider.services?.length || 0})
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {provider.services?.map((service: any) => (
                                    <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
                                        <div className="p-5">
                                            <div className="flex justify-between items-start mb-3">
                                                <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${getServiceColor(service.service_type)}`}>
                                                    {service.service_type}
                                                </span>
                                                <div className="flex items-center gap-1 text-gray-900 font-bold">
                                                    <span>₹{service.price}</span>
                                                    <span className="text-xs text-gray-500 font-normal">/ {service.price_unit.replace('per ', '')}</span>
                                                </div>
                                            </div>

                                            <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                                                {service.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                                                {service.description}
                                            </p>

                                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                                <div className="text-xs text-gray-500 font-medium flex items-center gap-1">
                                                    <User className="w-3 h-3" />
                                                    Capacity: {service.min_capacity} - {service.max_capacity}
                                                </div>
                                                <button className="text-primary-600 text-sm font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {(!provider.services || provider.services.length === 0) && (
                                <div className="bg-white rounded-xl p-12 text-center text-gray-400 border border-gray-100 border-dashed">
                                    <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                    <p>No specific service packages listed yet.</p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

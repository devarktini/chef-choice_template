"use client";

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Plus, Edit, Trash2, DollarSign, Clock, Users } from 'lucide-react';

export default function ServicesPage() {
    // Dummy services data for service providers
    const services = [
        {
            id: 1,
            name: 'Private Dinner Experience',
            description: 'Intimate dining experience with personalized menu',
            price: '$200/person',
            duration: '3 hours',
            maxGuests: 8,
            status: 'active',
        },
        {
            id: 2,
            name: 'Cooking Class',
            description: 'Learn to cook gourmet meals with hands-on instruction',
            price: '$150/person',
            duration: '2 hours',
            maxGuests: 6,
            status: 'active',
        },
        {
            id: 3,
            name: 'Event Catering',
            description: 'Full-service catering for events and parties',
            price: '$50/person',
            duration: 'Varies',
            maxGuests: 100,
            status: 'inactive',
        },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">My Services</h1>
                        <p className="text-gray-600 mt-1">Manage your chef services and offerings</p>
                    </div>
                    <button className="bg-gradient-to-r from-primary-500 to-warm-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-semibold flex items-center space-x-2">
                        <Plus className="w-5 h-5" />
                        <span>Add Service</span>
                    </button>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
                                    <p className="text-gray-600 text-sm">{service.description}</p>
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${service.status === 'active'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-100 text-gray-700'
                                        }`}
                                >
                                    {service.status}
                                </span>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <DollarSign className="w-4 h-4" />
                                    <span className="text-sm font-medium">{service.price}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-sm">{service.duration}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Users className="w-4 h-4" />
                                    <span className="text-sm">Max {service.maxGuests} guests</span>
                                </div>
                            </div>

                            <div className="flex space-x-2 pt-4 border-t border-gray-100">
                                <button className="flex-1 px-4 py-2 border border-primary-500 text-primary-600 rounded-lg hover:bg-primary-50 transition-all font-medium flex items-center justify-center space-x-2">
                                    <Edit className="w-4 h-4" />
                                    <span>Edit</span>
                                </button>
                                <button className="flex-1 px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-all font-medium flex items-center justify-center space-x-2">
                                    <Trash2 className="w-4 h-4" />
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Service Statistics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-primary-50 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Total Services</p>
                            <p className="text-3xl font-bold text-primary-600">{services.length}</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Active Services</p>
                            <p className="text-3xl font-bold text-green-600">
                                {services.filter(s => s.status === 'active').length}
                            </p>
                        </div>
                        <div className="p-4 bg-warm-50 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                            <p className="text-3xl font-bold text-warm-600">24</p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

"use client";

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { ProviderService } from '@/services/providerService';
import { ServiceProviderProfile } from '@/types/auth'; // Ensure this type is available or use any for now if structure is loose
import { Briefcase, Plus, Trash2, Save, X, Edit2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';

// Define the Service interface locally if not available globally yet
interface Service {
    id: string;
    title: string;
    service_type: string;
    description: string;
    price: string;
    price_unit: string;
    min_capacity: number;
    max_capacity: number;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
}

export default function ServicesPage() {
    const [provider, setProvider] = useState<any>(null); // Using any temporarily to avoid strict type issues with 'services' field
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Selected Service for Edit/View (null means adding new)
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Service>>({
        title: '',
        service_type: 'chef',
        description: '',
        price: '',
        price_unit: 'per plate',
        min_capacity: 0,
        max_capacity: 0,
        is_active: true
    });

    // Fetch Provider Profile
    const fetchProvider = async () => {
        try {
            setLoading(true);
            const data = await ProviderService.getProvider();
            if (data) {
                setProvider(data);
                // Parse services if string, or use as is if array
                let parsedServices: Service[] = [];
                if (typeof data.services === 'string') {
                    try {
                        parsedServices = JSON.parse(data.services);
                    } catch (e) {
                        console.error('Error parsing services JSON', e);
                    }
                } else if (Array.isArray(data.services)) {
                    parsedServices = data.services;
                }
                setServices(parsedServices || []);
            }
        } catch (error) {
            console.error('Failed to fetch provider', error);
            toast.error('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProvider();
    }, []);

    // Handle Form Change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }));
    };

    // Initialize Form for New Service
    const handleAddNew = () => {
        setSelectedServiceId(null);
        setFormData({
            title: '',
            service_type: 'chef',
            description: '',
            price: '',
            price_unit: 'per plate',
            min_capacity: 10,
            max_capacity: 100,
            is_active: true
        });
    };

    // Initialize Form for Editing
    const handleEdit = (service: Service) => {
        setSelectedServiceId(service.id);
        setFormData(service);
    };

    // Save Service (Add or Update)
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.price) {
            toast.error('Title and Price are required');
            return;
        }

        try {
            setSaving(true);

            let updatedServices = [...services];

            if (selectedServiceId) {
                // Update existing
                updatedServices = updatedServices.map(s =>
                    s.id === selectedServiceId ? { ...s, ...formData } as Service : s
                );
            } else {
                // Add new
                const newService: Service = {
                    ...formData as Service,
                    id: crypto.randomUUID(),
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };
                updatedServices.push(newService);
            }

            // Call API to update provider profile
            await ProviderService.updateProvider(provider.id, {
                services: updatedServices as any // Casting to satisfy TS if type definition is outdated
            });

            // Update local state
            setServices(updatedServices);
            toast.success(selectedServiceId ? 'Service updated successfully' : 'Service added successfully');

            // If added new, reset form to 'add new' state or keep editing the new one? 
            // Let's reset to add new to confirm completion
            handleAddNew();

        } catch (error: any) {
            console.error('Save error', error);
            toast.error(error.message || 'Failed to save service');
        } finally {
            setSaving(false);
        }
    };

    // Delete Service
    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering selection
        if (!confirm('Are you sure you want to delete this service?')) return;

        try {
            const updatedServices = services.filter(s => s.id !== id);

            await ProviderService.updateProvider(provider.id, {
                services: updatedServices as any
            });

            setServices(updatedServices);
            toast.success('Service deleted successfully');

            // If deleted service was selected, reset form
            if (selectedServiceId === id) {
                handleAddNew();
            }

        } catch (error: any) {
            console.error('Delete error', error);
            toast.error(error.message || 'Failed to delete service');
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">Loading services...</p>
                </div>
            </DashboardLayout>
        );
    }

    if (!provider) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <p className="text-gray-500 font-semibold">Provider profile not found.</p>
                    <p className="text-sm text-gray-400">Please complete your profile setup first.</p>
                    <a href="/dashboard/profile" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">Go to Profile</a>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <Toaster position="top-right" />
            <div className="h-[calc(100vh-8rem)] flex flex-col">
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">My Services</h1>
                        <p className="text-gray-600 mt-1">Manage your service offerings ({services.length})</p>
                    </div>
                    <button
                        onClick={handleAddNew}
                        className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add New</span>
                    </button>
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
                    {/* Left Panel: Service List */}
                    <div className="lg:col-span-5 flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h2 className="font-semibold text-gray-700 flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-primary-500" />
                                Custom Services
                            </h2>
                            <button
                                onClick={handleAddNew}
                                className="hidden lg:flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 text-sm font-medium transition-all shadow-sm"
                            >
                                <Plus className="w-4 h-4" />
                                <span>New</span>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                            {services.length === 0 ? (
                                <div className="text-center py-12 flex flex-col items-center">
                                    <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                                        <Briefcase className="w-10 h-10 text-primary-200" />
                                    </div>
                                    <p className="text-gray-500 font-medium text-lg">No services yet</p>
                                    <p className="text-gray-400 text-sm mt-1 max-w-xs mx-auto">Start adding your services like Catering, Decoration, or Chefs to get booked.</p>
                                    <button
                                        onClick={handleAddNew}
                                        className="mt-6 px-4 py-2 bg-white border border-primary-200 text-primary-600 rounded-lg hover:bg-primary-50 font-medium transition-colors shadow-sm"
                                    >
                                        Create First Service
                                    </button>
                                </div>
                            ) : (
                                services.map(service => {
                                    // Determine colors based on service type
                                    const getServiceColor = (type: string) => {
                                        switch (type) {
                                            case 'chef': return 'bg-orange-100 text-orange-700 border-orange-200';
                                            case 'catering': return 'bg-green-100 text-green-700 border-green-200';
                                            case 'hall': return 'bg-purple-100 text-purple-700 border-purple-200';
                                            case 'tent': return 'bg-blue-100 text-blue-700 border-blue-200';
                                            case 'decoration': return 'bg-pink-100 text-pink-700 border-pink-200';
                                            case 'photographer': return 'bg-cyan-100 text-cyan-700 border-cyan-200';
                                            case 'bartender': return 'bg-amber-100 text-amber-700 border-amber-200';
                                            default: return 'bg-gray-100 text-gray-700 border-gray-200';
                                        }
                                    };

                                    const colorClass = getServiceColor(service.service_type);
                                    const isSelected = selectedServiceId === service.id;

                                    return (
                                        <div
                                            key={service.id}
                                            onClick={() => handleEdit(service)}
                                            className={`p-4 rounded-xl border transition-all cursor-pointer group relative overflow-hidden ${isSelected
                                                    ? 'bg-white border-primary-500 shadow-md ring-1 ring-primary-500/20 z-10'
                                                    : 'bg-white border-gray-100 hover:border-primary-200 hover:shadow-md'
                                                }`}
                                        >
                                            {/* Selection Indicator strip */}
                                            {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary-500"></div>}

                                            <div className="flex justify-between items-start pl-2">
                                                <div className="flex-1 min-w-0 pr-8">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className={`px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider font-bold border ${colorClass}`}>
                                                            {service.service_type}
                                                        </span>
                                                        {service.is_active ? (
                                                            <span className="w-2 h-2 rounded-full bg-green-500" title="Active"></span>
                                                        ) : (
                                                            <span className="w-2 h-2 rounded-full bg-gray-300" title="Inactive"></span>
                                                        )}
                                                    </div>

                                                    <h3 className={`font-bold text-base truncate ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                                                        {service.title}
                                                    </h3>

                                                    <p className="text-sm text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                                                        {service.description || 'No description provided.'}
                                                    </p>

                                                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] text-gray-400 uppercase font-semibold">Price</span>
                                                            <span className="text-sm font-bold text-gray-800">
                                                                ₹{service.price} <span className="text-xs font-normal text-gray-500">/ {service.price_unit.replace('per ', '')}</span>
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-col border-l border-gray-100 pl-4">
                                                            <span className="text-[10px] text-gray-400 uppercase font-semibold">Capacity</span>
                                                            <span className="text-xs font-medium text-gray-600">
                                                                {service.min_capacity} - {service.max_capacity}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={(e) => handleDelete(service.id, e)}
                                                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all absolute top-2 right-2"
                                                    title="Delete Service"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {/* Right Panel: Service Form */}
                    <div className="lg:col-span-7 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="font-semibold text-gray-700 flex items-center gap-2">
                                {selectedServiceId ? <Edit2 className="w-4 h-4 text-primary-500" /> : <Plus className="w-4 h-4 text-primary-500" />}
                                {selectedServiceId ? 'Edit Service' : 'Add New Service'}
                            </h2>
                        </div>

                        <div className="p-6 flex-1 overflow-y-auto">
                            <form onSubmit={handleSave} className="space-y-6 max-w-2xl mx-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Title*</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="e.g. Traditional Wedding Lunch"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                                        <select
                                            name="service_type"
                                            value={formData.service_type}
                                            onChange={(e) => {
                                                const type = e.target.value;
                                                // Auto-select convenient units based on type
                                                let newUnit = formData.price_unit;
                                                if (type === 'hall' || type === 'tent') newUnit = 'per day';
                                                else if (type === 'chef' || type === 'catering') newUnit = 'per plate';

                                                setFormData(prev => ({
                                                    ...prev,
                                                    service_type: type,
                                                    price_unit: newUnit
                                                }));
                                            }}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                        >
                                            <option value="chef">Chef</option>
                                            <option value="catering">Catering</option>
                                            <option value="hall">Marriage/Party Hall</option>
                                            <option value="tent">Tent House & Supplies</option>
                                            <option value="decoration">Decoration</option>
                                            <option value="bartender">Bartender</option>
                                            <option value="waiter">Waiter</option>
                                            <option value="photographer">Photographer</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price Unit</label>
                                        <select
                                            name="price_unit"
                                            value={formData.price_unit}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                        >
                                            <option value="per plate">Per Plate</option>
                                            <option value="per hour">Per Hour</option>
                                            <option value="per day">Per Day/Event</option>
                                            <option value="per sqft">Per Sq. Ft</option>
                                            <option value="fixed">Fixed Price</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price ({formData.price_unit})*</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                            <input
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                placeholder="0.00"
                                                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {formData.service_type === 'hall' ? 'Min Guest Capacity' : 'Min Capacity'}
                                            </label>
                                            <input
                                                type="number"
                                                name="min_capacity"
                                                value={formData.min_capacity}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {formData.service_type === 'hall' ? 'Max Guest Capacity' : 'Max Capacity'}
                                            </label>
                                            <input
                                                type="number"
                                                name="max_capacity"
                                                value={formData.max_capacity}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows={4}
                                            placeholder={
                                                formData.service_type === 'hall'
                                                    ? "Describe amenities (AC, Parking, Rooms)..."
                                                    : formData.service_type === 'tent'
                                                        ? "Describe available tent sizes, colors, chairs, tables..."
                                                        : "Describe what's included in this service..."
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all resize-none"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={handleAddNew}
                                        className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        <Save className="w-4 h-4" />
                                        <span>{saving ? 'Saving...' : 'Save Service'}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

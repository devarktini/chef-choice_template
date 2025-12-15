"use client";

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuthStore } from '@/stores/authStore';
import { AuthService } from '@/services/authService';
import { Address, ServiceProviderProfile } from '@/types/auth';
import { AddressService as AddressApiService } from '@/services/addressService';
import { ProviderService } from '@/services/providerService';
import ConfirmationModal from '@/components/ConfirmationModal';
import { Mail, Phone, MapPin, Calendar, Plus, Edit2, Trash2, X, Upload, Loader2, Search, Briefcase, Award } from 'lucide-react';
import { toast } from 'react-toastify';
import { useProgressStore } from '@/stores/progressStore';

export default function ProfilePage() {
    const { user, clientProfile, tokens, login, updateUser } = useAuthStore();
    const { startLoading, stopLoading } = useProgressStore();
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);

    // Address Modal State
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const [addressFormData, setAddressFormData] = useState({
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        zip_code: '',
        label: 'Home'
    });
    const [addressFormError, setAddressFormError] = useState('');
    const [addressFormLoading, setAddressFormLoading] = useState(false);
    const [pincodeLoading, setPincodeLoading] = useState(false);

    // Delete Modal State
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, addressId: '' });
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Profile Edit Modal State
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [profileFormData, setProfileFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        dietary_restrictions: '',
        culinary_preferences: ''
    });
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [profileFormError, setProfileFormError] = useState('');
    const [profileFormLoading, setProfileFormLoading] = useState(false);

    // Service Provider Modal State
    const [providerData, setProviderData] = useState<ServiceProviderProfile | null>(null);
    const [isProviderModalOpen, setIsProviderModalOpen] = useState(false);
    const [providerFormData, setProviderFormData] = useState({
        provider_type: 'individual' as 'individual' | 'company',
        service_type: '',
        provides: '',
        service_area: '',
        company_name: '',
        experience_years: 0,
        specialization: '',
        description: '',
    });
    const [providerFormError, setProviderFormError] = useState('');
    const [providerFormLoading, setProviderFormLoading] = useState(false);
    const [servicePincodeLoading, setServicePincodeLoading] = useState(false);
    const [serviceLocationData, setServiceLocationData] = useState({ area: '', city: '', state: '', pincode: '' });

    useEffect(() => {
        fetchAddresses();
        fetchUserDetails();
        if (user?.role === 'service_provider') {
            fetchProviderData();
        }
    }, []);

    const fetchUserDetails = async () => {
        if (!user?.id) return;
        try {
            const freshUser = await AuthService.getUser(user.id);
            if (freshUser) {
                updateUser(freshUser);
            }
        } catch (error) {
            console.error('Failed to fetch user details', error);
        }
    };

    // Initialize profile form data when modal opens
    useEffect(() => {
        if (isProfileModalOpen && user) {
            setProfileFormData({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || '',
                dietary_restrictions: clientProfile?.dietary_restrictions?.join(', ') || '',
                culinary_preferences: clientProfile?.culinary_preferences?.join(', ') || ''
            });
            setProfileImage(null);
        }
    }, [isProfileModalOpen, user, clientProfile]);

    const fetchAddresses = async () => {
        try {
            startLoading();
            const data = await AddressApiService.getAddresses();
            setAddresses(data);
        } catch (error) {
            console.error('Failed to fetch addresses', error);
            toast.error('Failed to load addresses');
        } finally {
            setLoading(false);
            stopLoading();
        }
    };

    // --- Address Handlers ---

    const handleOpenAddressModal = (address?: Address) => {
        if (address) {
            setEditingAddress(address);
            setAddressFormData({
                address_line1: address.address_line1,
                address_line2: address.address_line2,
                city: address.city,
                state: address.state,
                zip_code: address.zip_code,
                label: address.label
            });
        } else {
            setEditingAddress(null);
            setAddressFormData({
                address_line1: '',
                address_line2: '',
                city: '',
                state: '',
                zip_code: '',
                label: 'Home'
            });
        }
        setAddressFormError('');
        setIsAddressModalOpen(true);
    };

    const handleCloseAddressModal = () => {
        setIsAddressModalOpen(false);
        setEditingAddress(null);
        setAddressFormError('');
    };

    const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAddressFormData(prev => ({ ...prev, [name]: value }));

        // Pincode lookup logic
        if (name === 'zip_code' && value.length === 6) {
            lookupPincode(value);
        }
    };

    const lookupPincode = async (pincode: string) => {
        setPincodeLoading(true);
        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = await response.json();

            if (data && data[0]?.Status === 'Success' && data[0]?.PostOffice?.length > 0) {
                const office = data[0].PostOffice[0];
                setAddressFormData(prev => ({
                    ...prev,
                    city: office.District,
                    state: office.State
                }));
            }
        } catch (error) {
            console.error('Pincode lookup failed', error);
        } finally {
            setPincodeLoading(false);
        }
    };

    const handleAddressSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setAddressFormLoading(true);
        setAddressFormError('');
        startLoading();

        try {
            const payload = {
                ...addressFormData,
                user: user?.id,
                meta_info: {}
            };

            if (editingAddress) {
                await AddressApiService.updateAddress(editingAddress.id, payload);
                toast.success('Address updated successfully');
            } else {
                await AddressApiService.createAddress(payload);
                toast.success('Address added successfully');
            }

            await fetchAddresses();
            handleCloseAddressModal();
        } catch (error: any) {
            setAddressFormError(error.message || 'Failed to save address');
            toast.error(error.message || 'Failed to save address');
        } finally {
            setAddressFormLoading(false);
            stopLoading();
        }
    };

    const handleDeleteClick = (id: string) => {
        setDeleteModal({ isOpen: true, addressId: id });
    };

    const handleConfirmDelete = async () => {
        if (!deleteModal.addressId) return;

        setDeleteLoading(true);
        startLoading();
        try {
            await AddressApiService.deleteAddress(deleteModal.addressId);
            await fetchAddresses();
            setDeleteModal({ isOpen: false, addressId: '' });
            toast.success('Address deleted successfully');
        } catch (error) {
            console.error('Failed to delete address', error);
            toast.error('Failed to delete address');
        } finally {
            setDeleteLoading(false);
            stopLoading();
        }
    };

    // --- Profile Handlers ---

    const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfileFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(e.target.files[0]);
        }
    };

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProfileFormLoading(true);
        setProfileFormError('');
        startLoading();

        try {
            const formData = new FormData();
            formData.append('first_name', profileFormData.first_name);
            formData.append('last_name', profileFormData.last_name);
            formData.append('email', profileFormData.email);
            formData.append('dietary_restrictions', profileFormData.dietary_restrictions);
            formData.append('culinary_preferences', profileFormData.culinary_preferences);

            if (profileImage) {
                formData.append('profile_picture', profileImage);
            }

            // Update Profile
            await AuthService.updateUserProfile(formData);

            // Fetch latest user data (standard fields)
            let freshUser = user;
            if (user?.id) {
                try {
                    freshUser = await AuthService.getUser(user.id);
                } catch (e) {
                    console.warn("Could not fetch fresh user details", e);
                }
            }

            // Update LocalStorage to ensure changes persist on reload
            const currentData = AuthService.getUserData();
            if (currentData) {
                const updatedData = {
                    ...currentData,
                    // Merge fresh user details
                    user: { ...currentData.user, ...freshUser },
                    // Manually merge client profile preferences (optimistic update)
                    // This ensures dietary restrictions show up immediately even if 
                    // the user endpoint doesn't return the nested profile.
                    client_profile: currentData.client_profile ? {
                        ...currentData.client_profile,
                        dietary_restrictions: profileFormData.dietary_restrictions.split(',').map((s: string) => s.trim()).filter(Boolean),
                        culinary_preferences: profileFormData.culinary_preferences.split(',').map((s: string) => s.trim()).filter(Boolean),
                    } : currentData.client_profile
                };
                AuthService.storeUserData(updatedData);
                // Also update the store if login function supports partial update or re-init
                // Since this uses useAuthStore, we might need to manually trigger a re-hydration or state update
                // The logical existing flow was reload, but now we want SPA feel.
                // Assuming login() call might not be appropriate here as it might require full object.
                // Ideally, AuthService.storeUserData updates localStorage, so a reload would fix it.
                // To avoid reload, we must update the store state.
                // Let's assume useAuthStore syncs with localStorage or we can just force update if possible.
                // For now, removing reload and letting the user see the success message.
                // If the store doesn't auto-update from localStorage, we might need to call login(updatedData.user, updatedData.token).
                if (updatedData.user && updatedData.access_token) {
                    // We need to fetch current tokens because updatedData (from localStorage) might not have them in the right structure
                    // and login() expects (data, tokens)
                    const currentTokens = AuthService.getTokens();
                    if (currentTokens.access) {
                        login(updatedData, {
                            access: currentTokens.access,
                            refresh: currentTokens.refresh || ''
                        });
                    }
                }
            }

            toast.success('Profile updated successfully!');
            setIsProfileModalOpen(false); // Close modal on success
        } catch (error: any) {
            setProfileFormError(error.message || 'Failed to update profile');
            toast.error(error.message || 'Failed to update profile');
        } finally {
            setProfileFormLoading(false);
            stopLoading();
        }
    };

    // --- Service Provider Handlers ---

    const fetchProviderData = async () => {
        try {
            startLoading();
            const data = await ProviderService.getProvider();
            setProviderData(data);
        } catch (error) {
            console.error('Failed to fetch provider data', error);
        } finally {
            stopLoading();
        }
    };

    const handleOpenProviderModal = () => {
        if (providerData) {
            // Parse existing service_area if it exists
            const parts = providerData.service_area.split(', ');
            setServiceLocationData({
                pincode: parts[0] || '',
                area: parts[1] || '',
                city: parts[2] || '',
                state: parts[3] || '',
            });
            setProviderFormData({
                provider_type: providerData.provider_type,
                service_type: providerData.service_type,
                provides: providerData.provides,
                service_area: providerData.service_area,
                company_name: providerData.company_name,
                experience_years: providerData.experience_years,
                specialization: Array.isArray(providerData.specialization)
                    ? providerData.specialization.join(', ')
                    : '',
                description: providerData.description,
            });
        } else {
            setServiceLocationData({ area: '', city: '', state: '', pincode: '' });
            setProviderFormData({
                provider_type: 'individual',
                service_type: '',
                provides: '',
                service_area: '',
                company_name: '',
                experience_years: 0,
                specialization: '',
                description: '',
            });
        }
        setProviderFormError('');
        setIsProviderModalOpen(true);
    };

    const handleProviderInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProviderFormData(prev => ({
            ...prev,
            [name]: name === 'experience_years' ? parseInt(value) || 0 : value
        }));

        // Trigger pincode lookup for service area
        if (name === 'service_pincode' && value.length === 6) {
            lookupServicePincode(value);
        }
    };

    const lookupServicePincode = async (pincode: string) => {
        setServicePincodeLoading(true);
        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = await response.json();

            if (data && data[0]?.Status === 'Success' && data[0]?.PostOffice?.length > 0) {
                const office = data[0].PostOffice[0];
                setServiceLocationData({
                    pincode: pincode,
                    area: office.Name,
                    city: office.District,
                    state: office.State
                });
            }
        } catch (error) {
            console.error('Pincode lookup failed', error);
        } finally {
            setServicePincodeLoading(false);
        }
    };

    const handleProviderSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProviderFormLoading(true);
        setProviderFormError('');
        startLoading();

        try {
            // Format service_area: "pincode, area, city, state"
            const formattedServiceArea = [
                serviceLocationData.pincode,
                serviceLocationData.area,
                serviceLocationData.city,
                serviceLocationData.state
            ].filter(Boolean).join(', ');

            const payload = {
                provider_type: providerFormData.provider_type,
                service_type: providerFormData.service_type,
                provides: providerFormData.provides,
                service_area: formattedServiceArea,
                company_name: providerFormData.company_name,
                experience_years: providerFormData.experience_years,
                specialization: {},
                description: providerFormData.description,
                services: {},
            };

            if (providerData) {
                await ProviderService.updateProvider(providerData.id, payload);
                toast.success('Provider details updated successfully');
            } else {
                await ProviderService.createProvider(payload);
                toast.success('Provider details added successfully');
            }

            await fetchProviderData();
            setIsProviderModalOpen(false);
        } catch (error: any) {
            setProviderFormError(error.message || 'Failed to save provider details');
            toast.error(error.message || 'Failed to save provider details');
        } finally {
            setProviderFormLoading(false);
            stopLoading();
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-8 pb-20">
                {/* Page Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
                        <p className="text-gray-600 mt-1">Manage your personal information</p>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 relative">
                    {/* Edit Button - Top Right */}
                    <button
                        onClick={() => setIsProfileModalOpen(true)}
                        className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg shadow-sm hover:bg-primary-600 transition-colors"
                    >
                        <Edit2 className="w-4 h-4" />
                        <span className="text-sm font-medium">Edit Profile</span>
                    </button>

                    {/* Profile Header */}
                    <div className="p-8 border-b border-gray-100">
                        <div className="flex items-start gap-6">
                            {/* Avatar */}
                            <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-primary-100 shadow-sm">
                                {user?.profile_picture ? (
                                    <img src={user.profile_picture} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-primary-400 to-warm-400 flex items-center justify-center text-white text-3xl font-bold">
                                        {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
                                    </div>
                                )}
                            </div>

                            {/* User Info */}
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                                    {user?.first_name} {user?.last_name}
                                </h2>
                                <p className="text-gray-600 capitalize mb-3">{user?.role?.replace('_', ' ')}</p>
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${user?.is_verified
                                        ? 'bg-green-50 text-green-700 border border-green-200'
                                        : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                                        }`}>
                                        {user?.is_verified ? '✓ Verified' : 'Pending Verification'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info Grid */}
                    <div className="p-8 grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                            <div className="p-2 bg-primary-100 rounded-lg">
                                <Mail className="w-5 h-5 text-primary-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-gray-500 mb-0.5">Email Address</p>
                                <p className="font-semibold text-gray-900 truncate">{user?.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                            <div className="p-2 bg-primary-100 rounded-lg">
                                <Phone className="w-5 h-5 text-primary-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-gray-500 mb-0.5">Phone Number</p>
                                <p className="font-semibold text-gray-900">{user?.phone_number}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Addresses Section */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center">
                            <MapPin className="w-5 h-5 mr-2 text-primary-600" />
                            Addresses
                        </h2>
                        <button
                            onClick={() => handleOpenAddressModal()}
                            className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Address
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-10">Loading addresses...</div>
                    ) : addresses.length === 0 ? (
                        <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500">No addresses found. Add one to get started.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-6">
                            {addresses.map((addr) => (
                                <div key={addr.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow relative group">
                                    <div className="absolute top-4 right-4 flex space-x-2">
                                        <button
                                            onClick={() => handleOpenAddressModal(addr)}
                                            className="p-2 bg-gray-100 rounded-full hover:bg-primary-50 text-gray-600 hover:text-primary-600"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(addr.id)}
                                            className="p-2 bg-gray-100 rounded-full hover:bg-red-50 text-gray-600 hover:text-red-600"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <h3 className="font-semibold text-gray-800 mb-2">{addr.label}</h3>
                                    <p className="text-gray-600">{addr.address_line1}</p>
                                    {addr.address_line2 && <p className="text-gray-600">{addr.address_line2}</p>}
                                    <p className="text-gray-600">
                                        {addr.city}, {addr.state} {addr.zip_code}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Preferences (Client Only) - Read Only View */}
                {clientProfile && (
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex items-center space-x-2 mb-4">
                            <Calendar className="w-6 h-6 text-primary-600" />
                            <h3 className="text-xl font-bold text-gray-800">Preferences</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-2">Dietary Restrictions</p>
                                {clientProfile.dietary_restrictions.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {clientProfile.dietary_restrictions.map((restriction, index) => (
                                            <span key={index} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                                                {restriction}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-400">No dietary restrictions</p>
                                )}
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-2">Culinary Preferences</p>
                                {clientProfile?.culinary_preferences?.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {clientProfile?.culinary_preferences?.map((preference, index) => (
                                            <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                                                {preference}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-400">No culinary preferences set</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Service Provider Details Section */}
                {user?.role === 'service_provider' && (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center">
                                <Briefcase className="w-5 h-5 mr-2 text-primary-600" />
                                Service Provider Details
                            </h2>
                            {providerData && (
                                <button
                                    onClick={handleOpenProviderModal}
                                    className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
                                >
                                    <Edit2 className="w-4 h-4 mr-2" />
                                    Edit Details
                                </button>
                            )}
                        </div>

                        {!providerData ? (
                            <div className="text-center py-12 bg-gradient-to-br from-primary-50 to-warm-50 rounded-xl border-2 border-dashed border-primary-200">
                                <Briefcase className="w-16 h-16 mx-auto mb-4 text-primary-400" />
                                <p className="text-gray-600 mb-4">Add your professional details to get started</p>
                                <button
                                    onClick={handleOpenProviderModal}
                                    className="px-6 py-3 bg-gradient-to-r from-primary-500 to-warm-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                                >
                                    <Plus className="w-4 h-4 inline mr-2" />
                                    Add Provider Details
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-md border border-gray-100">
                                {/* Header */}
                                <div className="border-b border-gray-100 p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="p-2 bg-primary-50 rounded-lg">
                                                    <Briefcase className="w-5 h-5 text-primary-600" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900">
                                                        {providerData.company_name || `${user.first_name} ${user.last_name}`}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 capitalize">
                                                        {providerData.provider_type} • {providerData.service_type}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-lg">
                                            <Award className="w-5 h-5 text-primary-600" />
                                            <div className="text-center">
                                                <div className="text-lg font-bold text-gray-900">{providerData.avg_rating.toFixed(1)}</div>
                                                <div className="text-xs text-gray-500">{providerData.review_count} reviews</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-4">
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="p-4 bg-cream-50 rounded-lg border border-primary-100">
                                            <p className="text-xs font-medium text-primary-700 mb-1">Experience</p>
                                            <p className="text-lg font-bold text-gray-900">{providerData.experience_years} years</p>
                                        </div>
                                        <div className="p-4 bg-cream-50 rounded-lg border border-primary-100">
                                            <p className="text-xs font-medium text-primary-700 mb-1">Service Type</p>
                                            <p className="text-lg font-bold text-gray-900 capitalize">{providerData.provides}</p>
                                        </div>
                                        <div className="p-4 bg-cream-50 rounded-lg border border-primary-100">
                                            <p className="text-xs font-medium text-primary-700 mb-1">Service Area</p>
                                            <p className="text-sm font-semibold text-gray-900">{providerData.service_area}</p>
                                        </div>
                                    </div>

                                    {providerData.description && (
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <p className="text-sm font-semibold text-gray-700 mb-2">About</p>
                                            <p className="text-gray-600 leading-relaxed text-sm">{providerData.description}</p>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                        <span className={`px-4 py-2 rounded-lg text-xs font-semibold ${providerData.verified
                                            ? 'bg-green-50 text-green-700 border border-green-200'
                                            : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                                            }`}>
                                            {providerData.verified ? '✓ Verified Provider' : '⏳ Pending Verification'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Address Modal */}
                {isAddressModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleCloseAddressModal}></div>
                        <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-800">
                                    {editingAddress ? 'Edit Address' : 'Add New Address'}
                                </h3>
                                <button onClick={handleCloseAddressModal} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleAddressSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                                    <input
                                        type="text"
                                        name="label"
                                        value={addressFormData.label}
                                        onChange={handleAddressInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                        placeholder="e.g. Home, Office"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="zip_code"
                                            value={addressFormData.zip_code}
                                            onChange={handleAddressInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                            placeholder="Enter 6-digit Pincode"
                                            required
                                            maxLength={6}
                                        />
                                        {pincodeLoading && (
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                <Loader2 className="w-4 h-4 animate-spin text-primary-500" />
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500">Fetching city and state automatically...</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={addressFormData.city}
                                            onChange={handleAddressInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none bg-gray-50"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={addressFormData.state}
                                            onChange={handleAddressInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none bg-gray-50"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                                    <input
                                        type="text"
                                        name="address_line1"
                                        value={addressFormData.address_line1}
                                        onChange={handleAddressInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2 (Optional)</label>
                                    <input
                                        type="text"
                                        name="address_line2"
                                        value={addressFormData.address_line2}
                                        onChange={handleAddressInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                    />
                                </div>

                                {addressFormError && (
                                    <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                                        {addressFormError}
                                    </div>
                                )}

                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={handleCloseAddressModal}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                                        disabled={addressFormLoading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={addressFormLoading}
                                        className="px-6 py-2 bg-gradient-to-r from-primary-500 to-warm-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                                    >
                                        {addressFormLoading ? 'Saving...' : 'Save Address'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Profile Edit Modal */}
                {isProfileModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsProfileModalOpen(false)}></div>
                        <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-800">
                                    Edit Profile
                                </h3>
                                <button onClick={() => setIsProfileModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleProfileSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            value={profileFormData.first_name}
                                            onChange={handleProfileInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            value={profileFormData.last_name}
                                            onChange={handleProfileInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={profileFormData.email}
                                        onChange={handleProfileInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                                    <div className="flex items-center space-x-2">
                                        <label className="flex items-center space-x-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                                            <Upload className="w-5 h-5 text-gray-500" />
                                            <span className="text-sm text-gray-600">{profileImage ? profileImage.name : 'Upload New Picture'}</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Dietary Restrictions (comma separated)</label>
                                    <input
                                        type="text"
                                        name="dietary_restrictions"
                                        value={profileFormData.dietary_restrictions}
                                        onChange={handleProfileInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                        placeholder="e.g. Vegetarian, Gluten-Free"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Culinary Preferences (comma separated)</label>
                                    <input
                                        type="text"
                                        name="culinary_preferences"
                                        value={profileFormData.culinary_preferences}
                                        onChange={handleProfileInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                        placeholder="e.g. Italian, Mexican, Indian"
                                    />
                                </div>

                                {profileFormError && (
                                    <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                                        {profileFormError}
                                    </div>
                                )}

                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsProfileModalOpen(false)}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                                        disabled={profileFormLoading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={profileFormLoading}
                                        className="px-6 py-2 bg-gradient-to-r from-primary-500 to-warm-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                                    >
                                        {profileFormLoading ? 'Updating...' : 'Update Profile'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Service Provider Modal */}
                {isProviderModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsProviderModalOpen(false)}></div>
                        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-800">
                                    {providerData ? 'Edit Provider Details' : 'Add Provider Details'}
                                </h3>
                                <button onClick={() => setIsProviderModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleProviderSubmit} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Provider Type</label>
                                        <select
                                            name="provider_type"
                                            value={providerFormData.provider_type}
                                            onChange={handleProviderInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                            required
                                        >
                                            <option value="individual">Individual</option>
                                            <option value="company">Company</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                                        <input
                                            type="text"
                                            name="service_type"
                                            value={providerFormData.service_type}
                                            onChange={handleProviderInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                            placeholder="e.g. Chef, Caterer, Hall"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name (if applicable)</label>
                                    <input
                                        type="text"
                                        name="company_name"
                                        value={providerFormData.company_name}
                                        onChange={handleProviderInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                        placeholder="Leave blank for individual providers"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Provides</label>
                                        <input
                                            type="text"
                                            name="provides"
                                            value={providerFormData.provides}
                                            onChange={handleProviderInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                            placeholder="What do you provide?"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
                                        <input
                                            type="number"
                                            name="experience_years"
                                            value={providerFormData.experience_years}
                                            onChange={handleProviderInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                            min="0"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Service Area Pincode</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="service_pincode"
                                            value={serviceLocationData.pincode}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setServiceLocationData(prev => ({ ...prev, pincode: value }));
                                                if (value.length === 6) {
                                                    lookupServicePincode(value);
                                                }
                                            }}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                            placeholder="Enter 6-digit Pincode"
                                            required
                                            maxLength={6}
                                        />
                                        {servicePincodeLoading && (
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                <Loader2 className="w-4 h-4 animate-spin text-primary-500" />
                                            </div>
                                        )}
                                    </div>
                                    {serviceLocationData.area && (
                                        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                            <p><strong>Area:</strong> {serviceLocationData.area}</p>
                                            <p><strong>City:</strong> {serviceLocationData.city}</p>
                                            <p><strong>State:</strong> {serviceLocationData.state}</p>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialization (comma-separated)</label>
                                    <input
                                        type="text"
                                        name="specialization"
                                        value={providerFormData.specialization}
                                        onChange={handleProviderInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                        placeholder="e.g. Italian, Indian, Chinese"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={providerFormData.description}
                                        onChange={handleProviderInputChange}
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                        placeholder="Tell us about your services..."
                                    />
                                </div>

                                {providerFormError && (
                                    <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                                        {providerFormError}
                                    </div>
                                )}

                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsProviderModalOpen(false)}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                                        disabled={providerFormLoading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={providerFormLoading}
                                        className="px-6 py-2 bg-gradient-to-r from-primary-500 to-warm-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                                    >
                                        {providerFormLoading ? 'Saving...' : 'Save Details'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Confirmation Modal */}
                <ConfirmationModal
                    isOpen={deleteModal.isOpen}
                    title="Delete Address"
                    message="Are you sure you want to delete this address? This action cannot be undone."
                    confirmText="Delete"
                    isDanger={true}
                    isLoading={deleteLoading}
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setDeleteModal({ isOpen: false, addressId: '' })}
                />
            </div>
        </DashboardLayout>
    );
}

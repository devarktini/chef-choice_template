"use client";

import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuthStore } from '@/stores/authStore';
import { AuthService } from '@/services/authService';
import { Address, ServiceProviderProfile } from '@/types/auth';
import { AddressService as AddressApiService } from '@/services/addressService';
import { ProviderService } from '@/services/providerService';
import ConfirmationModal from '@/components/ConfirmationModal';
import { Mail, Phone, MapPin, Calendar, Plus, Edit2, Trash2, X, Upload, Loader2, Search, Briefcase, Award, Star } from 'lucide-react';
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

    const fetchUserDetails = useCallback(async () => {
        if (!user?.id) return;
        try {
            const freshUser = await AuthService.getUser1();
            console.log("sssss", freshUser.data)
            if (freshUser) {
                updateUser(freshUser.data.user);
            }
        } catch (error) {
            console.error('Failed to fetch user details', error);
        }
    }, [user?.id, updateUser]);

    const fetchAddresses = useCallback(async () => {
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
    }, [startLoading, stopLoading]);

    const fetchProviderData = useCallback(async () => {
        try {
            startLoading();
            const data = await ProviderService.getProvider();
            setProviderData(data);
        } catch (error) {
            console.error('Failed to fetch provider data', error);
        } finally {
            stopLoading();
        }
    }, [startLoading, stopLoading]);

    useEffect(() => {
        fetchAddresses();
        fetchUserDetails();
        if (user?.role === 'service_provider') {
            fetchProviderData();
        }
    }, [fetchAddresses, fetchUserDetails, fetchProviderData, user?.role]);

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

    // const handleProfileSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setProfileFormLoading(true);
    //     setProfileFormError('');
    //     startLoading();

    //     try {
    //         const formData = new FormData();
    //         formData.append('first_name', profileFormData.first_name);
    //         formData.append('last_name', profileFormData.last_name);
    //         formData.append('email', profileFormData.email);
    //         formData.append('dietary_restrictions', profileFormData.dietary_restrictions);
    //         formData.append('culinary_preferences', profileFormData.culinary_preferences);

    //         if (profileImage) {
    //             formData.append('profile_picture', profileImage);
    //         }

    //         // Update Profile
    //         await AuthService.updateUserProfile(formData);

    //         // Fetch latest user data (standard fields)
    //         let freshUser = user;
    //         if (user?.id) {
    //             try {
    //                 freshUser = await AuthService.getUser(user.id);
    //             } catch (e) {
    //                 console.warn("Could not fetch fresh user details", e);
    //             }
    //         }

    //         // Update LocalStorage to ensure changes persist on reload
    //         const currentData = AuthService.getUserData();
    //         if (currentData) {
    //             const updatedData = {
    //                 ...currentData,
    //                 // Merge fresh user details
    //                 user: { ...currentData.user, ...freshUser },
    //                 // Manually merge client profile preferences (optimistic update)
    //                 // This ensures dietary restrictions show up immediately even if 
    //                 // the user endpoint doesn't return the nested profile.
    //                 client_profile: currentData.client_profile ? {
    //                     ...currentData.client_profile,
    //                     dietary_restrictions: profileFormData.dietary_restrictions.split(',').map((s: string) => s.trim()).filter(Boolean),
    //                     culinary_preferences: profileFormData.culinary_preferences.split(',').map((s: string) => s.trim()).filter(Boolean),
    //                 } : currentData.client_profile
    //             };
    //             AuthService.storeUserData(updatedData);
    //             // Also update the store if login function supports partial update or re-init
    //             // Since this uses useAuthStore, we might need to manually trigger a re-hydration or state update
    //             // The logical existing flow was reload, but now we want SPA feel.
    //             // Assuming login() call might not be appropriate here as it might require full object.
    //             // Ideally, AuthService.storeUserData updates localStorage, so a reload would fix it.
    //             // To avoid reload, we must update the store state.
    //             // Let's assume useAuthStore syncs with localStorage or we can just force update if possible.
    //             // For now, removing reload and letting the user see the success message.
    //             // If the store doesn't auto-update from localStorage, we might need to call login(updatedData.user, updatedData.token).
    //             if (updatedData.user && updatedData.access_token) {
    //                 // We need to fetch current tokens because updatedData (from localStorage) might not have them in the right structure
    //                 // and login() expects (data, tokens)
    //                 const currentTokens = AuthService.getTokens();
    //                 if (currentTokens.access) {
    //                     login(updatedData, {
    //                         access: currentTokens.access,
    //                         refresh: currentTokens.refresh || ''
    //                     });
    //                 }
    //             }
    //         }

    //         toast.success('Profile updated successfully!');
    //         setIsProfileModalOpen(false); // Close modal on success
    //     } catch (error: any) {
    //         setProfileFormError(error.message || 'Failed to update profile');
    //         toast.error(error.message || 'Failed to update profile');
    //     } finally {
    //         setProfileFormLoading(false);
    //         stopLoading();
    //     }
    // };

    // --- Service Provider Handlers ---


    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProfileFormLoading(true);
        setProfileFormError("");
        startLoading();

        try {
            const formData = new FormData();
            formData.append("first_name", profileFormData.first_name);
            formData.append("last_name", profileFormData.last_name);
            formData.append("email", profileFormData.email);
            formData.append("dietary_restrictions", profileFormData.dietary_restrictions);
            formData.append("culinary_preferences", profileFormData.culinary_preferences);

            if (profileImage) {
                formData.append("profile_picture", profileImage);
            }

            // ✅ 1. Update profile
            await AuthService.updateUserProfile(formData);

            // ✅ 2. Fetch fresh user details
            await fetchUserDetails();

            toast.success("Profile updated successfully!");
            setIsProfileModalOpen(false);
        } catch (error: any) {
            setProfileFormError(error.message || "Failed to update profile");
            toast.error(error.message || "Failed to update profile");
        } finally {
            setProfileFormLoading(false);
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
                {/* Page Header with Enhanced Design */}
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#e59f4a] via-[#e68125] to-[#d46f1f]"></div>
                    <div className="absolute inset-0 opacity-50">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-40 -mt-40 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
                    </div>
                    <div className="relative z-10 p-8 md:p-12 text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-2">Profile</h1>
                        <p className="text-orange-50 text-lg">Manage your personal information and preferences</p>
                    </div>
                </div>

                {/* Profile Card with Enhanced Design */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-100/20 to-transparent rounded-full blur-2xl"></div>
                    
                    {/* Edit Button - Top Right */}
                    <button
                        onClick={() => setIsProfileModalOpen(true)}
                        className="absolute top-6 right-6 z-10 flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#e59f4a] to-[#e68125] text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold"
                    >
                        <Edit2 className="w-4 h-4" />
                        <span className="text-sm hidden md:inline">Edit Profile</span>
                    </button>

                    {/* Profile Header */}
                    <div className="p-8 md:p-12 border-b border-gray-200 relative z-5">
                        <div className="flex flex-col md:flex-row items-start gap-8">
                            {/* Avatar - Enhanced */}
                            <div className="relative">
                                <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                                    {user?.profile_picture ? (
                                        <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${user.profile_picture}`} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-[#e59f4a] to-[#e68125] flex items-center justify-center text-white text-5xl font-bold">
                                            {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                {user?.is_verified && (
                                    <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center text-white text-sm font-bold">
                                        ✓
                                    </div>
                                )}
                            </div>

                            {/* User Info - Enhanced */}
                            <div className="flex-1">
                                <div className="mb-4">
                                    <h2 className="text-4xl font-bold text-gray-900 mb-2">
                                        {user?.first_name} {user?.last_name}
                                    </h2>
                                    <p className="text-orange-600 text-lg font-semibold capitalize mb-4">{user?.role?.replace('_', ' ')}</p>
                                </div>
                                
                                <div className="flex flex-wrap gap-3 items-center">
                                    <span className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${user?.is_verified
                                        ? 'bg-green-100 text-green-700 border border-green-300'
                                        : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                                        }`}>
                                        <div className={`w-2 h-2 rounded-full ${user?.is_verified ? 'bg-green-600' : 'bg-yellow-600'}`}></div>
                                        {user?.is_verified ? '✓ Verified Account' : '⏳ Verification Pending'}
                                    </span>
                                    
                                    {user?.role === 'service_provider' && providerData && (
                                        <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 border border-orange-300 flex items-center gap-2">
                                            <Award className="w-4 h-4" />
                                            Rating: {providerData.avg_rating.toFixed(1)} ⭐
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info Grid - Enhanced */}
                    <div className="p-8 md:p-12 grid md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300 group">
                            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                                <Mail className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-blue-700 mb-1 uppercase tracking-wide">Email Address</p>
                                <p className="font-semibold text-gray-900 truncate text-lg">{user?.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300 group">
                            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl group-hover:scale-110 transition-transform">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-green-700 mb-1 uppercase tracking-wide">Phone Number</p>
                                <p className="font-semibold text-gray-900 text-lg">{user?.phone_number}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Addresses Section - Enhanced */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl">
                                <MapPin className="w-6 h-6 text-orange-600" />
                            </div>
                            Saved Addresses
                        </h2>
                        <button
                            onClick={() => handleOpenAddressModal()}
                            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#e59f4a] to-[#e68125] text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold text-sm shadow-md"
                        >
                            <Plus className="w-5 h-5" />
                            Add Address
                        </button>
                    </div>

                    {loading ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="h-48 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl animate-pulse"></div>
                            ))}
                        </div>
                    ) : addresses.length === 0 ? (
                        <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300 hover:border-orange-300 transition-colors">
                            <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                            <p className="text-gray-600 text-lg font-medium mb-2">No addresses found</p>
                            <p className="text-gray-500 mb-6">Add your addresses for faster booking experience</p>
                            <button
                                onClick={() => handleOpenAddressModal()}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#e59f4a] to-[#e68125] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
                            >
                                <Plus className="w-5 h-5" />
                                Add Your First Address
                            </button>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {addresses.map((addr, idx) => (
                                <div key={addr.id} className="group bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                                    style={{
                                        animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both`
                                    }}>
                                    {/* Decorative Element */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100/30 to-transparent rounded-full -mr-16 -mt-16 blur-2xl"></div>
                                    
                                    {/* Action Buttons */}
                                    <div className="absolute top-4 right-4 flex gap-2 z-10">
                                        <button
                                            onClick={() => handleOpenAddressModal(addr)}
                                            className="p-2.5 bg-white border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-300 text-gray-600 hover:text-orange-600 transition-all shadow-sm hover:shadow-md"
                                            title="Edit"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(addr.id)}
                                            className="p-2.5 bg-white border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-300 text-gray-600 hover:text-red-600 transition-all shadow-sm hover:shadow-md"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-5">
                                        <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#e59f4a] to-[#e68125]"></span>
                                            {addr.label}
                                        </h3>
                                        <div className="space-y-2 text-gray-700">
                                            <p className="font-medium">{addr.address_line1}</p>
                                            {addr.address_line2 && <p className="text-gray-600">{addr.address_line2}</p>}
                                            <p className="text-sm text-gray-600">
                                                {addr.city}, {addr.state}
                                            </p>
                                            <p className="text-sm font-semibold text-orange-600">📍 {addr.zip_code}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Preferences (Client Only) - Enhanced */}
                {clientProfile && (
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-200">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl">
                                <Calendar className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">Your Preferences</h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Dietary Restrictions */}
                            <div>
                                <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">🥗 Dietary Restrictions</h4>
                                {clientProfile.dietary_restrictions.length > 0 ? (
                                    <div className="flex flex-wrap gap-3">
                                        {clientProfile.dietary_restrictions.map((restriction, index) => (
                                            <span key={index} className="px-4 py-2.5 bg-gradient-to-r from-red-100 to-red-50 text-red-700 rounded-full text-sm font-semibold border border-red-200">
                                                {restriction}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 bg-gray-100/50 rounded-lg border border-dashed border-gray-300">
                                        <p className="text-gray-500">No dietary restrictions set yet</p>
                                    </div>
                                )}
                            </div>

                            {/* Culinary Preferences */}
                            <div>
                                <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">🍽️ Culinary Preferences</h4>
                                {clientProfile?.culinary_preferences?.length > 0 ? (
                                    <div className="flex flex-wrap gap-3">
                                        {clientProfile?.culinary_preferences?.map((preference, index) => (
                                            <span key={index} className="px-4 py-2.5 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 rounded-full text-sm font-semibold border border-purple-200">
                                                {preference}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 bg-gray-100/50 rounded-lg border border-dashed border-gray-300">
                                        <p className="text-gray-500">No preferences set yet</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* <button
                            onClick={() => setIsProfileModalOpen(true)}
                            className="mt-8 px-6 py-3 bg-gradient-to-r from-[#e59f4a] to-[#e68125] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
                        >
                            Update Preferences
                        </button> */}
                    </div>
                )}

                {/* Service Provider Details Section - Enhanced */}
                {user?.role === 'service_provider' && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl">
                                    <Briefcase className="w-6 h-6 text-blue-600" />
                                </div>
                                Professional Details
                            </h2>
                            {providerData && (
                                <button
                                    onClick={handleOpenProviderModal}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#e59f4a] to-[#e68125] text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold text-sm shadow-md"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Edit Details
                                </button>
                            )}
                        </div>

                        {!providerData ? (
                            <div className="text-center py-20 bg-gradient-to-br from-blue-50 via-white to-orange-50 rounded-2xl border-2 border-dashed border-blue-300 hover:border-orange-300 transition-colors">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full mb-6">
                                    <Briefcase className="w-10 h-10 text-blue-600" />
                                </div>
                                <p className="text-gray-700 text-lg font-semibold mb-3">Complete Your Professional Profile</p>
                                <p className="text-gray-600 mb-8 px-4">Add your professional details to start accepting bookings and build your reputation</p>
                                <button
                                    onClick={handleOpenProviderModal}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#e59f4a] to-[#e68125] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add Professional Details
                                </button>
                            </div>
                        ) : (
                            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                                {/* Header */}
                                <div className="border-b border-gray-200 p-8 md:p-10 bg-gradient-to-r from-blue-50/50 to-orange-50/30 relative">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full -mr-24 -mt-24 blur-3xl"></div>
                                    
                                    <div className="relative z-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                                                <Briefcase className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900">
                                                    {providerData.company_name || `${user.first_name} ${user.last_name}`}
                                                </h3>
                                                <p className="text-gray-700 capitalize font-medium mt-1">
                                                    {providerData.provider_type} • {providerData.service_type}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-6 flex-shrink-0">
                                            <div className="text-center">
                                                <div className="text-3xl font-bold text-yellow-500 mb-1">{providerData.avg_rating.toFixed(1)}</div>
                                                <div className="flex gap-1 justify-center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(providerData.avg_rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                                    ))}
                                                </div>
                                                <p className="text-sm text-gray-600 mt-2 font-medium">{providerData.review_count} reviews</p>
                                            </div>
                                            <div className={`px-4 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 ${providerData.verified
                                                ? 'bg-green-100 text-green-700 border border-green-300'
                                                : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                                                }`}>
                                                {providerData.verified ? '✓ Verified' : '⏳ Pending'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 md:p-10 space-y-8">
                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl border border-orange-200">
                                            <p className="text-xs font-bold text-orange-700 mb-2 uppercase tracking-wide">💼 Experience</p>
                                            <p className="text-3xl font-bold text-gray-900">{providerData.experience_years}</p>
                                            <p className="text-sm text-gray-600 mt-1">Years of experience</p>
                                        </div>
                                        <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200">
                                            <p className="text-xs font-bold text-blue-700 mb-2 uppercase tracking-wide">🎯 Service Type</p>
                                            <p className="text-xl font-bold text-gray-900 capitalize">{providerData.provides}</p>
                                        </div>
                                        <div className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border border-green-200">
                                            <p className="text-xs font-bold text-green-700 mb-2 uppercase tracking-wide">📍 Service Area</p>
                                            <p className="text-sm font-semibold text-gray-900">{providerData.service_area}</p>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    {providerData.description && (
                                        <div className="p-6 bg-gray-100/50 rounded-xl border border-gray-200">
                                            <p className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">📝 About</p>
                                            <p className="text-gray-700 leading-relaxed">{providerData.description}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Address Modal - Enhanced */}
                {isAddressModalOpen && (
                    <div className="fixed inset-0 top-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleCloseAddressModal}></div>
                        <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 animate-scale-in max-h-[90vh] overflow-y-auto border border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        {editingAddress ? '📝 Edit Address' : '➕ Add New Address'}
                                    </h3>
                                    <p className="text-gray-600 text-sm mt-1">Fill in the details below</p>
                                </div>
                                <button onClick={handleCloseAddressModal} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleAddressSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address Label</label>
                                    <input
                                        type="text"
                                        name="label"
                                        value={addressFormData.label}
                                        onChange={handleAddressInputChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                        placeholder="e.g. Home, Office, Apartment"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Zip Code</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="zip_code"
                                            value={addressFormData.zip_code}
                                            onChange={handleAddressInputChange}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                            placeholder="Enter 6-digit Pincode"
                                            required
                                            maxLength={6}
                                        />
                                        {pincodeLoading && (
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Fetching city and state automatically...</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={addressFormData.city}
                                            onChange={handleAddressInputChange}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-gray-50"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={addressFormData.state}
                                            onChange={handleAddressInputChange}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-gray-50"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address Line 1</label>
                                    <input
                                        type="text"
                                        name="address_line1"
                                        value={addressFormData.address_line1}
                                        onChange={handleAddressInputChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address Line 2 <span className="text-gray-400 font-normal">(Optional)</span></label>
                                    <input
                                        type="text"
                                        name="address_line2"
                                        value={addressFormData.address_line2}
                                        onChange={handleAddressInputChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>

                                {addressFormError && (
                                    <div className="text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-200">
                                        {addressFormError}
                                    </div>
                                )}

                                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={handleCloseAddressModal}
                                        className="px-6 py-2.5 text-gray-700 font-semibold hover:bg-gray-100 rounded-xl transition-all"
                                        disabled={addressFormLoading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={addressFormLoading}
                                        className="px-6 py-2.5 bg-gradient-to-r from-[#e59f4a] to-[#e68125] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 hover:scale-105"
                                    >
                                        {addressFormLoading ? 'Saving...' : 'Save Address'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Profile Edit Modal - Enhanced */}
                {isProfileModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsProfileModalOpen(false)}></div>
                        <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 animate-scale-in max-h-[90vh] overflow-y-auto border border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        ✏️ Edit Profile
                                    </h3>
                                    <p className="text-gray-600 text-sm mt-1">Update your personal information</p>
                                </div>
                                <button onClick={() => setIsProfileModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleProfileSubmit} className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            value={profileFormData.first_name}
                                            onChange={handleProfileInputChange}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            value={profileFormData.last_name}
                                            onChange={handleProfileInputChange}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={profileFormData.email}
                                        onChange={handleProfileInputChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Picture</label>
                                    <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-orange-400 hover:bg-orange-50/30 transition-all duration-300">
                                        <div className="text-center">
                                            <Upload className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                                            <span className="text-sm text-gray-600">{profileImage ? profileImage.name : 'Upload New Picture'}</span>
                                            <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                                        </div>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Dietary Restrictions <span className="text-gray-400 font-normal text-xs">(comma separated)</span></label>
                                    <input
                                        type="text"
                                        name="dietary_restrictions"
                                        value={profileFormData.dietary_restrictions}
                                        onChange={handleProfileInputChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                        placeholder="e.g. Vegetarian, Gluten-Free, Vegan"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Culinary Preferences <span className="text-gray-400 font-normal text-xs">(comma separated)</span></label>
                                    <input
                                        type="text"
                                        name="culinary_preferences"
                                        value={profileFormData.culinary_preferences}
                                        onChange={handleProfileInputChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                        placeholder="e.g. Italian, Mexican, Indian, Asian"
                                    />
                                </div>

                                {profileFormError && (
                                    <div className="text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-200">
                                        {profileFormError}
                                    </div>
                                )}

                                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => setIsProfileModalOpen(false)}
                                        className="px-6 py-2.5 text-gray-700 font-semibold hover:bg-gray-100 rounded-xl transition-all"
                                        disabled={profileFormLoading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={profileFormLoading}
                                        className="px-6 py-2.5 bg-gradient-to-r from-[#e59f4a] to-[#e68125] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 hover:scale-105"
                                    >
                                        {profileFormLoading ? 'Updating...' : 'Update Profile'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Service Provider Modal - Enhanced */}
                {isProviderModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsProviderModalOpen(false)}></div>
                        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 animate-scale-in max-h-[90vh] overflow-y-auto border border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        💼 {providerData ? 'Edit Professional Details' : 'Add Professional Details'}
                                    </h3>
                                    <p className="text-gray-600 text-sm mt-1">Fill in your professional information</p>
                                </div>
                                <button onClick={() => setIsProviderModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleProviderSubmit} className="space-y-5">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Provider Type</label>
                                        <select
                                            name="provider_type"
                                            value={providerFormData.provider_type}
                                            onChange={handleProviderInputChange}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                            required
                                        >
                                            <option value="individual">Individual Chef</option>
                                            <option value="company">Company/Catering Service</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Service Type</label>
                                        <input
                                            type="text"
                                            name="service_type"
                                            value={providerFormData.service_type}
                                            onChange={handleProviderInputChange}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                            placeholder="e.g. Chef, Caterer, Event Cook"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name <span className="text-gray-400 font-normal text-xs">(if applicable)</span></label>
                                    <input
                                        type="text"
                                        name="company_name"
                                        value={providerFormData.company_name}
                                        onChange={handleProviderInputChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                        placeholder="Leave blank for individual providers"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Service Provides</label>
                                        <input
                                            type="text"
                                            name="provides"
                                            value={providerFormData.provides}
                                            onChange={handleProviderInputChange}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                            placeholder="What do you provide?"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Experience <span className="text-gray-400 font-normal text-xs">(years)</span></label>
                                        <input
                                            type="number"
                                            name="experience_years"
                                            value={providerFormData.experience_years}
                                            onChange={handleProviderInputChange}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                            min="0"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Service Area Pincode</label>
                                    <div className="relative mb-3">
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
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                            placeholder="Enter 6-digit Pincode"
                                            required
                                            maxLength={6}
                                        />
                                        {servicePincodeLoading && (
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
                                            </div>
                                        )}
                                    </div>
                                    {serviceLocationData.area && (
                                        <div className="text-sm bg-green-50 p-4 rounded-xl border border-green-200 space-y-1">
                                            <p className="text-green-800"><strong>📍 Area:</strong> {serviceLocationData.area}</p>
                                            <p className="text-green-800"><strong>🏙️ City:</strong> {serviceLocationData.city}</p>
                                            <p className="text-green-800"><strong>🌍 State:</strong> {serviceLocationData.state}</p>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Specialization <span className="text-gray-400 font-normal text-xs">(comma-separated)</span></label>
                                    <input
                                        type="text"
                                        name="specialization"
                                        value={providerFormData.specialization}
                                        onChange={handleProviderInputChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                        placeholder="e.g. Italian, Indian, Chinese, Continental"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">About Your Services</label>
                                    <textarea
                                        name="description"
                                        value={providerFormData.description}
                                        onChange={handleProviderInputChange}
                                        rows={5}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                                        placeholder="Tell clients about your experience, specialties, and what makes you unique..."
                                    />
                                </div>

                                {providerFormError && (
                                    <div className="text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-200">
                                        {providerFormError}
                                    </div>
                                )}

                                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => setIsProviderModalOpen(false)}
                                        className="px-6 py-2.5 text-gray-700 font-semibold hover:bg-gray-100 rounded-xl transition-all"
                                        disabled={providerFormLoading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={providerFormLoading}
                                        className="px-6 py-2.5 bg-gradient-to-r from-[#e59f4a] to-[#e68125] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 hover:scale-105"
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

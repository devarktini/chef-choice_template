"use client";

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuthStore } from '@/stores/authStore';
import { AuthService } from '@/services/authService';
import { Address } from '@/types/auth';
import { AddressService as AddressApiService } from '@/services/addressService';
import ConfirmationModal from '@/components/ConfirmationModal';
import { Mail, Phone, MapPin, Calendar, Plus, Edit2, Trash2, X, Upload, Loader2, Search } from 'lucide-react';

export default function ProfilePage() {
    const { user, clientProfile, tokens, login } = useAuthStore();
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

    useEffect(() => {
        fetchAddresses();
    }, []);

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
            const data = await AddressApiService.getAddresses();
            setAddresses(data);
        } catch (error) {
            console.error('Failed to fetch addresses', error);
        } finally {
            setLoading(false);
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

        try {
            const payload = {
                ...addressFormData,
                user: user?.id,
                meta_info: {}
            };

            if (editingAddress) {
                await AddressApiService.updateAddress(editingAddress.id, payload);
            } else {
                await AddressApiService.createAddress(payload);
            }

            await fetchAddresses();
            handleCloseAddressModal();
        } catch (error: any) {
            setAddressFormError(error.message || 'Failed to save address');
        } finally {
            setAddressFormLoading(false);
        }
    };

    const handleDeleteClick = (id: string) => {
        setDeleteModal({ isOpen: true, addressId: id });
    };

    const handleConfirmDelete = async () => {
        if (!deleteModal.addressId) return;

        setDeleteLoading(true);
        try {
            await AddressApiService.deleteAddress(deleteModal.addressId);
            await fetchAddresses();
            setDeleteModal({ isOpen: false, addressId: '' });
        } catch (error) {
            console.error('Failed to delete address', error);
            alert('Failed to delete address');
        } finally {
            setDeleteLoading(false);
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
            }

            alert('Profile updated successfully!');
            window.location.reload();
        } catch (error: any) {
            setProfileFormError(error.message || 'Failed to update profile');
        } finally {
            setProfileFormLoading(false);
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
                <div className="bg-white rounded-xl shadow-md overflow-hidden relative group">
                    {/* Header Banner */}
                    <div className="h-32 bg-gradient-to-r from-primary-500 to-warm-500"></div>

                    {/* Edit Button */}
                    <button
                        onClick={() => setIsProfileModalOpen(true)}
                        className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg backdrop-blur-sm transition-all"
                    >
                        <Edit2 className="w-5 h-5" />
                    </button>

                    {/* Profile Content */}
                    <div className="px-6 pb-6">
                        <div className="flex flex-col md:flex-row md:items-end md:space-x-6 -mt-16">
                            {/* Avatar */}
                            <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
                                {user?.profile_picture ? (
                                    <img src={user.profile_picture} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-r from-primary-500 to-warm-500 flex items-center justify-center text-white text-4xl font-bold">
                                        {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
                                    </div>
                                )}
                            </div>

                            {/* Name and Role */}
                            <div className="mt-4 md:mt-0 md:mb-4">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {user?.first_name} {user?.last_name}
                                </h2>
                                <p className="text-gray-600 capitalize">{user?.role?.replace('_', ' ')}</p>
                                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${user?.is_verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {user?.is_verified ? 'Verified' : 'Not Verified'}
                                </span>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                <Mail className="w-5 h-5 text-primary-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium text-gray-800">{user?.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                <Phone className="w-5 h-5 text-primary-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <p className="font-medium text-gray-800">{user?.phone_number}</p>
                                </div>
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
                                {clientProfile.culinary_preferences.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {clientProfile.culinary_preferences.map((preference, index) => (
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

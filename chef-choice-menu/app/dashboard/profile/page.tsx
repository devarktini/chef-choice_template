"use client";

import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuthStore } from "@/stores/authStore";
import { AuthService } from "@/services/authService";
import { Address, ServiceProviderProfile } from "@/types/auth";
import { AddressService as AddressApiService } from "@/services/addressService";
import { ProviderService } from "@/services/providerService";
import ConfirmationModal from "@/components/ConfirmationModal";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Plus,
  Edit2,
  Trash2,
  X,
  Upload,
  Loader2,
  Search,
  Briefcase,
  Award,
  Star,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { useProgressStore } from "@/stores/progressStore";

// Define service area type
interface ServiceArea {
  id?: string;
  pincode: string;
  area: string;
  city: string;
  state: string;
}

export default function ProfilePage() {
  const { user, clientProfile, tokens, login, updateUser, updateAuthData } = useAuthStore();
  const { startLoading, stopLoading } = useProgressStore();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  // Address Modal State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressFormData, setAddressFormData] = useState({
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    zip_code: "",
    label: "Home",
  });
  const [addressFormError, setAddressFormError] = useState("");
  const [addressFormLoading, setAddressFormLoading] = useState(false);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [addressFormErrors, setAddressFormErrors] = useState<
    Record<string, string>
  >({});

  // Delete Modal State
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    addressId: "",
  });
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Profile Edit Modal State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    dietary_restrictions: "",
    culinary_preferences: "",
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileFormError, setProfileFormError] = useState("");
  const [profileFormLoading, setProfileFormLoading] = useState(false);
  const [profileFormErrors, setProfileFormErrors] = useState<
    Record<string, string>
  >({});

  // Service Provider Modal State - UPDATED FOR MULTIPLE AREAS
  const [providerData, setProviderData] =
    useState<ServiceProviderProfile | null>(null);
  const [isProviderModalOpen, setIsProviderModalOpen] = useState(false);
  const [providerFormData, setProviderFormData] = useState({
    provider_type: "individual" as "individual" | "company",
    service_type: "",
    provides: "",
    company_name: "",
    experience_years: 0,
    specialization: "",
    description: "",
  });
  const [providerFormError, setProviderFormError] = useState<any>("");
  const [providerFormLoading, setProviderFormLoading] = useState(false);

  // NEW: Multiple service areas state
  const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>([
    { pincode: "", area: "", city: "", state: "" },
  ]);
  const [loadingPincodes, setLoadingPincodes] = useState<number[]>([]);
  const [serviceAreaErrors, setServiceAreaErrors] = useState<string[]>([""]);

  const fetchUserDetails = useCallback(async () => {
    if (!user?.id) return;
    try {
      const freshUser = await AuthService.getUser1();
      console.log(freshUser);
      if (freshUser) {
        updateAuthData(freshUser.data);
      }
    } catch (error) {
      console.error("Failed to fetch user details", error);
    }
  }, [user?.id, updateUser]);

  console.log(user);

  const fetchAddresses = useCallback(async () => {
    try {
      startLoading();
      const data = await AddressApiService.getAddresses();
      setAddresses(data);
    } catch (error) {
      console.error("Failed to fetch addresses", error);
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
      console.error("Failed to fetch provider data", error);
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  useEffect(() => {
    fetchAddresses();
    fetchUserDetails();
    if (user?.role === "service_provider") {
      fetchProviderData();
    }
  }, [fetchAddresses, fetchUserDetails, fetchProviderData, user?.role]);

  // --- Address Validation ---
  const validateAddressField = (name: string, value: string): string => {
    if (!value.trim()) return "This field is required";

    switch (name) {
      case "label":
        if (!/^[A-Za-z\s]+$/.test(value))
          return "Label should contain only letters and spaces";
        if (value.length < 2) return "Label should be at least 2 characters";
        break;
      case "zip_code":
        if (!/^\d{6}$/.test(value)) return "Pincode must be exactly 6 digits";
        break;
      case "city":
      case "state":
        if (!/^[A-Za-z\s]+$/.test(value))
          return "Should contain only letters and spaces";
        break;
      case "address_line1":
      case "address_line2":
        if (value.length < 5) return "Address should be at least 5 characters";
        break;
    }
    return "";
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
        label: address.label,
      });
    } else {
      setEditingAddress(null);
      setAddressFormData({
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        zip_code: "",
        label: "Home",
      });
    }
    setAddressFormError("");
    setAddressFormErrors({});
    setIsAddressModalOpen(true);
  };

  const handleCloseAddressModal = () => {
    setIsAddressModalOpen(false);
    setEditingAddress(null);
    setAddressFormError("");
    setAddressFormErrors({});
  };

  const handleAddressInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Apply input restrictions based on field type
    if (name === "zip_code") {
      processedValue = value.replace(/\D/g, "");
    } else if (name === "city" || name === "state" || name === "label") {
      processedValue = value.replace(/[0-9]/g, "");
    }

    // Update form data
    setAddressFormData((prev) => ({ ...prev, [name]: processedValue }));

    // Validate field
    const error = validateAddressField(name, processedValue);
    setAddressFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    // Pincode lookup logic
    if (name === "zip_code" && processedValue.length === 6 && !error) {
      lookupPincode(processedValue);
    }
  };

  const lookupPincode = async (pincode: string) => {
    setPincodeLoading(true);
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = await response.json();

      if (
        data &&
        data[0]?.Status === "Success" &&
        data[0]?.PostOffice?.length > 0
      ) {
        const office = data[0].PostOffice[0];
        setAddressFormData((prev) => ({
          ...prev,
          city: office.District,
          state: office.State,
        }));
        // Clear city and state errors if auto-filled
        setAddressFormErrors((prev) => ({
          ...prev,
          city: "",
          state: "",
        }));
      }
    } catch (error) {
      console.error("Pincode lookup failed", error);
    } finally {
      setPincodeLoading(false);
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.entries(addressFormData).forEach(([key, value]) => {
      const error = validateAddressField(key, value);
      if (error && key !== "address_line2") {
        // address_line2 is optional
        newErrors[key] = error;
      }
    });

    setAddressFormErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setAddressFormLoading(true);
    setAddressFormError("");
    startLoading();

    try {
      const payload = {
        ...addressFormData,
        user: user?.id,
        meta_info: {},
      };

      if (editingAddress) {
        await AddressApiService.updateAddress(editingAddress.id, payload);
        toast.success("Address updated successfully");
      } else {
        await AddressApiService.createAddress(payload);
        toast.success("Address added successfully");
      }

      await fetchAddresses();
      handleCloseAddressModal();
    } catch (error: any) {
      setAddressFormError(error.message || "Failed to save address");
      toast.error(error.message || "Failed to save address");
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
      setDeleteModal({ isOpen: false, addressId: "" });
      toast.success("Address deleted successfully");
    } catch (error) {
      console.error("Failed to delete address", error);
      toast.error("Failed to delete address");
    } finally {
      setDeleteLoading(false);
      stopLoading();
    }
  };

  // --- Profile Validation ---
  const validateProfileField = (name: string, value: string): string => {
    if (
      !value.trim() &&
      name !== "dietary_restrictions" &&
      name !== "culinary_preferences"
    ) {
      return "This field is required";
    }

    switch (name) {
      case "first_name":
      case "last_name":
        if (!/^[A-Za-z\s]+$/.test(value))
          return "Should contain only letters and spaces";
        if (value.length < 2) return "Should be at least 2 characters";
        if (value.length > 50) return "Should not exceed 50 characters";
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address";
        break;
      case "dietary_restrictions":
      case "culinary_preferences":
        if (value.trim()) {
          const items = value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
          for (const item of items) {
            if (!/^[A-Za-z\s\-]+$/.test(item)) {
              return "Items should contain only letters, spaces, and hyphens";
            }
            if (item.length < 2) {
              return "Each item should be at least 2 characters";
            }
          }
        }
        break;
    }
    return "";
  };

  // --- Profile Handlers ---
  const handleOpenProfileModal = () => {
    if (user) {
      // Helper to parse the preferences from potentially nested arrays
      const parsePreferences = (prefs: any) => {
        if (!prefs) return "";
        if (Array.isArray(prefs)) {
          // Handle nested array case: [["item1", "item2"]] or ["item1", "item2"]
          if (prefs.length > 0 && Array.isArray(prefs[0])) {
            return prefs[0].join(", ");
          }
          return prefs.join(", ");
        }
        return String(prefs || "");
      };

      console.log(clientProfile);
      setProfileFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        dietary_restrictions: parsePreferences(clientProfile?.dietary_restrictions),
        culinary_preferences: parsePreferences(clientProfile?.culinary_preferences),
      });
      setProfileFormErrors({});
      setProfileFormError("");
      setIsProfileModalOpen(true);
    }
  };

  const handleProfileInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Apply input restrictions
    if (name === "first_name" || name === "last_name") {
      processedValue = value.replace(/[0-9]/g, "");
    }

    setProfileFormData((prev) => ({ ...prev, [name]: processedValue }));

    // Validate field
    const error = validateProfileField(name, processedValue);
    setProfileFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setProfileImage(file);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.entries(profileFormData).forEach(([key, value]) => {
      const error = validateProfileField(key, value);
      if (error) {
        newErrors[key] = error;
      }
    });

    setProfileFormErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setProfileFormLoading(true);
    setProfileFormError("");
    startLoading();

    try {
      const formData = new FormData();
      formData.append("first_name", profileFormData.first_name);
      formData.append("last_name", profileFormData.last_name);
      formData.append("email", profileFormData.email);
      formData.append(
        "dietary_restrictions",
        profileFormData.dietary_restrictions
      );
      formData.append(
        "culinary_preferences",
        profileFormData.culinary_preferences
      );

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

  // --- Service Provider Validation ---
  const validateProviderField = (name: string, value: any): string => {
    if (
      !value &&
      name !== "company_name" &&
      name !== "specialization" &&
      name !== "description"
    ) {
      return "This field is required";
    }

    switch (name) {
      case "service_type":
      case "provides":
        if (!/^[A-Za-z\s]+$/.test(value))
          return "Should contain only letters and spaces";
        if (value.length < 2) return "Should be at least 2 characters";
        if (value.length > 100) return "Should not exceed 100 characters";
        break;
      case "company_name":
        if (providerFormData.provider_type === "company" && !value.trim()) {
          return "Company name is required for company providers";
        }
        if (value && value.length > 100) {
          return "Should not exceed 100 characters";
        }
        break;
      case "experience_years":
        const years = parseInt(value);
        if (isNaN(years) || years < 0)
          return "Experience should be a positive number";
        if (years > 50) return "Experience should not exceed 50 years";
        break;
      case "specialization":
        if (value.trim()) {
          const items = value
            .split(",")
            .map((item: string) => item.trim())
            .filter(Boolean);
          for (const item of items) {
            if (!/^[A-Za-z\s\-]+$/.test(item)) {
              return "Items should contain only letters, spaces, and hyphens";
            }
            if (item.length < 2) {
              return "Each item should be at least 2 characters";
            }
          }
        }
        break;
      case "description":
        if (value.length > 500)
          return "Description should not exceed 500 characters";
        break;
    }
    return "";
  };

  // NEW: Service Area validation
  const validateServiceArea = (area: ServiceArea, index: number): string => {
    if (!area.pincode.trim()) return "Pincode is required";
    if (!/^\d{6}$/.test(area.pincode))
      return "Pincode must be exactly 6 digits";
    if (!area.area.trim()) return "Area details are required";
    if (!area.city.trim()) return "City is required";
    if (!area.state.trim()) return "State is required";
    return "";
  };

  // --- Service Provider Handlers ---
  const handleOpenProviderModal = () => {
    if (providerData) {
      // Parse existing service_area if it exists (now can have multiple)
      let parsedAreas: ServiceArea[] = [
        { pincode: "", area: "", city: "", state: "" },
      ];

      if (providerData.service_area) {
        // Check if service_area contains multiple areas (separated by semicolon)
        if (providerData.service_area.includes(";")) {
          parsedAreas = providerData.service_area.split(";").map((areaStr) => {
            const [pincode, area, city, state] = areaStr
              .split(",")
              .map((part) => part.trim());
            return {
              pincode: pincode || "",
              area: area || "",
              city: city || "",
              state: state || "",
            };
          });
        } else {
          // Single area format
          const [pincode, area, city, state] = providerData.service_area
            .split(",")
            .map((part) => part.trim());
          parsedAreas = [
            {
              pincode: pincode || "",
              area: area || "",
              city: city || "",
              state: state || "",
            },
          ];
        }
      }

      setServiceAreas(parsedAreas);
      setServiceAreaErrors(parsedAreas.map(() => ""));

      setProviderFormData({
        provider_type: providerData.provider_type,
        service_type: providerData.service_type,
        provides: providerData.provides,
        company_name: providerData.company_name,
        experience_years: providerData.experience_years,
        specialization: Array.isArray(providerData.specialization)
          ? providerData.specialization.join(", ")
          : "",
        description: providerData.description,
      });
    } else {
      setServiceAreas([{ pincode: "", area: "", city: "", state: "" }]);
      setServiceAreaErrors([""]);
      setProviderFormData({
        provider_type: "individual",
        service_type: "",
        provides: "",
        company_name: "",
        experience_years: 0,
        specialization: "",
        description: "",
      });
    }
    setProviderFormError("");
    setIsProviderModalOpen(true);
  };

  const handleProviderInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    let processedValue: any = value;

    if (
      name === "service_type" ||
      name === "provides" ||
      name === "company_name"
    ) {
      processedValue = value.replace(/[0-9]/g, "");
    } else if (name === "experience_years") {
      // allow only digits
      processedValue = value.replace(/\D/g, "");

      // convert to number, fallback to 0 if empty
      processedValue = processedValue === "" ? 0 : Number(processedValue);
    } else if (name === "specialization") {
      processedValue = value.replace(/[^A-Za-z,\s\-]/g, "");
    }

    setProviderFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  // NEW: Service Area handlers
  const handleServiceAreaChange = (
    index: number,
    field: keyof ServiceArea,
    value: string
  ) => {
    const newAreas = [...serviceAreas];

    if (field === "pincode") {
      // Only allow numbers
      value = value.replace(/\D/g, "");
      // Limit to 6 digits
      if (value.length > 6) value = value.substring(0, 6);

      newAreas[index][field] = value;
      setServiceAreas(newAreas);

      // Trigger lookup when pincode is 6 digits
      if (value.length === 6) {
        lookupServicePincode(value, index);
      }
    } else {
      newAreas[index][field] = value;
      setServiceAreas(newAreas);
    }
  };

  const lookupServicePincode = async (pincode: string, index: number) => {
    setLoadingPincodes((prev) => [...prev, index]);
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = await response.json();

      if (
        data &&
        data[0]?.Status === "Success" &&
        data[0]?.PostOffice?.length > 0
      ) {
        const office = data[0].PostOffice[0];
        const newAreas = [...serviceAreas];
        newAreas[index] = {
          ...newAreas[index],
          area: office.Name,
          city: office.District,
          state: office.State,
        };
        setServiceAreas(newAreas);

        // Clear error for this area
        const newErrors = [...serviceAreaErrors];
        newErrors[index] = "";
        setServiceAreaErrors(newErrors);
      } else {
        // Set error if pincode not found
        const newErrors = [...serviceAreaErrors];
        newErrors[index] = "Invalid pincode";
        setServiceAreaErrors(newErrors);
      }
    } catch (error) {
      console.error("Pincode lookup failed", error);
      const newErrors = [...serviceAreaErrors];
      newErrors[index] = "Failed to lookup pincode";
      setServiceAreaErrors(newErrors);
    } finally {
      setLoadingPincodes((prev) => prev.filter((i) => i !== index));
    }
  };

  const addServiceArea = () => {
    setServiceAreas((prev) => [
      ...prev,
      { pincode: "", area: "", city: "", state: "" },
    ]);
    setServiceAreaErrors((prev) => [...prev, ""]);
  };

  const removeServiceArea = (index: number) => {
    if (serviceAreas.length > 1) {
      const newAreas = serviceAreas.filter((_, i) => i !== index);
      const newErrors = serviceAreaErrors.filter((_, i) => i !== index);
      setServiceAreas(newAreas);
      setServiceAreaErrors(newErrors);
    }
  };

  const handleProviderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all provider fields
    const newErrors: Record<string, string> = {};
    Object.entries(providerFormData).forEach(([key, value]) => {
      const error = validateProviderField(key, value);
      if (error) {
        newErrors[key] = error;
      }
    });

    // Validate all service areas
    const areaErrors = serviceAreas.map((area, index) =>
      validateServiceArea(area, index)
    );
    const hasAreaErrors = areaErrors.some((error) => error);

    if (hasAreaErrors || Object.keys(newErrors).length > 0) {
      setServiceAreaErrors(areaErrors);
      toast.error("Please fix the errors in the form");
      return;
    }

    setProviderFormLoading(true);
    setProviderFormError("");
    startLoading();

    try {
      // Format multiple service areas: "pincode1, area1, city1, state1; pincode2, area2, city2, state2"
      const formattedServiceArea = serviceAreas
        .map(
          (area) => `${area.pincode}, ${area.area}, ${area.city}, ${area.state}`
        )
        .join("; ");

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
        toast.success("Provider details updated successfully");
      } else {
        await ProviderService.createProvider(payload);
        toast.success("Provider details added successfully");
      }

      await fetchProviderData();
      setIsProviderModalOpen(false);
    } catch (error: any) {
      setProviderFormError(error.message || "Failed to save provider details");
      toast.error(error.message || "Failed to save provider details");
    } finally {
      setProviderFormLoading(false);
      stopLoading();
    }
  };

  // Check if form has errors
  const hasAddressErrors = Object.values(addressFormErrors).some(
    (error) => error
  );
  const hasProfileErrors = Object.values(profileFormErrors).some(
    (error) => error
  );
  const hasProviderErrors =
    serviceAreaErrors.some((error) => error) ||
    Object.values(providerFormData).some((value) => !value && value !== 0);

  // Render service areas in provider details
  const renderServiceAreas = () => {
    if (!providerData?.service_area) return null;

    const areas = providerData.service_area
      .split(";")
      .map((area) => area.trim());

    return (
      <div className="space-y-3">
        {areas.map((area, index) => {
          const [pincode, areaName, city, state] = area
            .split(",")
            .map((part) => part.trim());
          return (
            <div
              key={index}
              className="flex items-start gap-3 p-4 bg-gray-100/50 rounded-xl border border-gray-200"
            >
              <MapPin className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  {areaName}, {city}, {state}
                </p>
                <p className="text-xs text-gray-600">Pincode: {pincode}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className=" pb-20">
        {/* Page Header with Enhanced Design */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-[#e59f4a] via-[#e68125] to-[#d46f1f]"></div>
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-40 -mt-40 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          </div>
          <div className="relative z-10 p-8 md:p-12 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Profile</h1>
            <p className="text-orange-50 text-lg">
              Manage your personal information and preferences
            </p>
          </div>
        </div>

        {/* Profile Card with Enhanced Design */}
        <div className="bg-gradient-to-br mt-10 from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-100/20 to-transparent rounded-full blur-2xl"></div>

          {/* Edit Button - Top Right */}
          <button
            onClick={handleOpenProfileModal}
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
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${user.profile_picture}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#e59f4a] to-[#e68125] flex items-center justify-center text-white text-5xl font-bold">
                      {user?.first_name?.charAt(0)}
                      {user?.last_name?.charAt(0)}
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
                  <p className="text-orange-600 text-lg font-semibold capitalize mb-4">
                    {user?.role?.replace("_", " ")}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 items-center">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${user?.is_verified
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                      }`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${user?.is_verified ? "bg-green-600" : "bg-yellow-600"
                        }`}
                    ></div>
                    {user?.is_verified
                      ? "✓ Verified Account"
                      : "⏳ Verification Pending"}
                  </span>

                  {user?.role === "service_provider" && providerData && (
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
                <p className="text-xs font-semibold text-blue-700 mb-1 uppercase tracking-wide">
                  Email Address
                </p>
                <p className="font-semibold text-gray-900 truncate text-lg">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300 group">
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-green-700 mb-1 uppercase tracking-wide">
                  Phone Number
                </p>
                <p className="font-semibold text-gray-900 text-lg">
                  {user?.phone_number}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Addresses Section - Enhanced */}
        <div>
          <div className="flex items-center mt-10 justify-between mb-6">
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
                <div
                  key={i}
                  className="h-48 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl animate-pulse"
                ></div>
              ))}
            </div>
          ) : addresses.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300 hover:border-orange-300 transition-colors">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 text-lg font-medium mb-2">
                No addresses found
              </p>
              <p className="text-gray-500 mb-6">
                Add your addresses for faster booking experience
              </p>
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
                <div
                  key={addr.id}
                  className="group bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both`,
                  }}
                >
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
                      {addr.address_line2 && (
                        <p className="text-gray-600">{addr.address_line2}</p>
                      )}
                      <p className="text-sm text-gray-600">
                        {addr.city}, {addr.state}
                      </p>
                      <p className="text-sm font-semibold text-orange-600">
                        📍 {addr.zip_code}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Preferences (Client Only) - Enhanced */}
        {clientProfile && (
          <div className="bg-gradient-to-br mt-10 from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Your Preferences
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Dietary Restrictions */}
              {/* {console.log(clientProfile.dietary_restrictions)} */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
                  🥗 Dietary Restrictions
                </h4>
                {clientProfile.dietary_restrictions.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {clientProfile.dietary_restrictions.map(
                      (restriction, index) => (
                        <span
                          key={index}
                          className="px-4 py-2.5 bg-gradient-to-r from-red-100 to-red-50 text-red-700 rounded-full text-sm font-semibold border border-red-200"
                        >
                          {restriction}
                        </span>
                      )
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-100/50 rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-500">
                      No dietary restrictions set yet
                    </p>
                  </div>
                )}
              </div>

              {/* Culinary Preferences */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
                  🍽️ Culinary Preferences
                </h4>
                {clientProfile?.culinary_preferences?.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {clientProfile?.culinary_preferences?.map(
                      (preference, index) => (
                        <span
                          key={index}
                          className="px-4 py-2.5 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 rounded-full text-sm font-semibold border border-purple-200"
                        >
                          {preference}
                        </span>
                      )
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-100/50 rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-500">No preferences set yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Service Provider Details Section - Enhanced */}
        {user?.role === "service_provider" && (
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
                <p className="text-gray-700 text-lg font-semibold mb-3">
                  Complete Your Professional Profile
                </p>
                <p className="text-gray-600 mb-8 px-4">
                  Add your professional details to start accepting bookings and
                  build your reputation
                </p>
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
                          {providerData.company_name ||
                            `${user.first_name} ${user.last_name}`}
                        </h3>
                        <p className="text-gray-700 capitalize font-medium mt-1">
                          {providerData.provider_type} •{" "}
                          {providerData.service_type}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 flex-shrink-0">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-500 mb-1">
                          {providerData.avg_rating.toFixed(1)}
                        </div>
                        <div className="flex gap-1 justify-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(providerData.avg_rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                                }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 mt-2 font-medium">
                          {providerData.review_count} reviews
                        </p>
                      </div>
                      <div
                        className={`px-4 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 ${providerData.verified
                          ? "bg-green-100 text-green-700 border border-green-300"
                          : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                          }`}
                      >
                        {providerData.verified ? "✓ Verified" : "⏳ Pending"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 space-y-8">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl border border-orange-200">
                      <p className="text-xs font-bold text-orange-700 mb-2 uppercase tracking-wide">
                        💼 Experience
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {providerData.experience_years}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Years of experience
                      </p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200">
                      <p className="text-xs font-bold text-blue-700 mb-2 uppercase tracking-wide">
                        🎯 Service Type
                      </p>
                      <p className="text-xl font-bold text-gray-900 capitalize">
                        {providerData.provides}
                      </p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border border-green-200">
                      <p className="text-xs font-bold text-green-700 mb-2 uppercase tracking-wide">
                        📍 Service Areas
                      </p>
                      <div className="text-sm font-semibold text-gray-900">
                        {providerData.service_area.includes(";")
                          ? `${providerData.service_area.split(";").length
                          } areas covered`
                          : "1 area covered"}
                      </div>
                    </div>
                  </div>

                  {/* Service Areas - NEW SECTION */}
                  <div>
                    <p className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
                      🗺️ Service Areas Covered
                    </p>
                    {renderServiceAreas()}
                  </div>

                  {/* Description */}
                  {providerData.description && (
                    <div className="p-6 bg-gray-100/50 rounded-xl border border-gray-200">
                      <p className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                        📝 About
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        {providerData.description}
                      </p>
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
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleCloseAddressModal}
            ></div>
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 animate-scale-in max-h-[90vh] overflow-y-auto border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {editingAddress ? "📝 Edit Address" : "➕ Add New Address"}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Fill in the details below
                  </p>
                </div>
                <button
                  onClick={handleCloseAddressModal}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAddressSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address Label *
                  </label>

                  <select
                    name="label"
                    value={addressFormData.label}
                    onChange={handleAddressInputChange}
                    className={`w-full px-4 py-2.5 rounded-xl border ${addressFormErrors.label
                      ? "border-red-300"
                      : "border-gray-300"
                      } focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all`}
                  >
                    <option value="">Select address label</option>
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Other">Other</option>
                  </select>

                  {addressFormErrors.label && (
                    <p className="mt-1 text-sm text-red-600">
                      {addressFormErrors.label}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Zip Code *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="zip_code"
                      value={addressFormData.zip_code}
                      onChange={handleAddressInputChange}
                      className={`w-full px-4 py-2.5 rounded-xl border ${addressFormErrors.zip_code
                        ? "border-red-300"
                        : "border-gray-300"
                        } focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all`}
                      placeholder="Enter 6-digit Pincode"
                      maxLength={6}
                    />
                    {pincodeLoading && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
                      </div>
                    )}
                  </div>
                  {addressFormErrors.zip_code ? (
                    <p className="mt-1 text-sm text-red-600">
                      {addressFormErrors.zip_code}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500 mt-1">
                      City and state will be fetched automatically
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={addressFormData.city}
                      onChange={handleAddressInputChange}
                      className={`w-full px-4 py-2.5 rounded-xl border ${addressFormErrors.city
                        ? "border-red-300"
                        : "border-gray-300"
                        } focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all`}
                    />
                    {addressFormErrors.city && (
                      <p className="mt-1 text-sm text-red-600">
                        {addressFormErrors.city}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={addressFormData.state}
                      onChange={handleAddressInputChange}
                      className={`w-full px-4 py-2.5 rounded-xl border ${addressFormErrors.state
                        ? "border-red-300"
                        : "border-gray-300"
                        } focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all`}
                    />
                    {addressFormErrors.state && (
                      <p className="mt-1 text-sm text-red-600">
                        {addressFormErrors.state}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    name="address_line1"
                    value={addressFormData.address_line1}
                    onChange={handleAddressInputChange}
                    className={`w-full px-4 py-2.5 rounded-xl border ${addressFormErrors.address_line1
                      ? "border-red-300"
                      : "border-gray-300"
                      } focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all`}
                    placeholder="Street address, building, floor, etc."
                  />
                  {addressFormErrors.address_line1 && (
                    <p className="mt-1 text-sm text-red-600">
                      {addressFormErrors.address_line1}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address Line 2{" "}
                    <span className="text-gray-400 font-normal">
                      (Optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="address_line2"
                    value={addressFormData.address_line2}
                    onChange={handleAddressInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    placeholder="Apartment, suite, unit, etc."
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
                    disabled={addressFormLoading || hasAddressErrors}
                    className={`px-6 py-2.5 rounded-xl font-semibold shadow-md transition-all ${addressFormLoading || hasAddressErrors
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#e59f4a] to-[#e68125] hover:shadow-lg hover:scale-105"
                      }`}
                  >
                    {addressFormLoading ? "Saving..." : "Save Address"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Profile Edit Modal - Enhanced */}
        {isProfileModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with blur effect */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-md"
              onClick={() => setIsProfileModalOpen(false)}
            ></div>

            {/* Modal Container with subtle animation */}
            <div className="relative w-full max-w-lg animate-fade-in-up bg-white rounded-3xl shadow-2xl p-0 overflow-hidden border border-gray-200/50 max-h-[92vh]">
              {/* Gradient top accent */}
              <div className="h-1.5 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 w-full"></div>

              {/* Header with subtle background */}
              <div className="px-8 pt-8 pb-6 bg-gradient-to-b from-white to-gray-50/30">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-100 to-amber-50 shadow-sm">
                      <div className="text-orange-500">✏️</div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-800 bg-clip-text text-transparent">
                        Edit Profile
                      </h3>
                      <p className="text-gray-500 text-sm mt-1.5">
                        Update your personal information and preferences
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsProfileModalOpen(false)}
                    className="text-gray-400 hover:text-gray-700 p-2 hover:bg-gray-100/80 rounded-xl transition-all duration-200 active:scale-95"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Scrollable Form Area with custom scrollbar */}
              <div className="px-8 py-2 max-h-[calc(92vh-200px)] overflow-y-auto 
        [&::-webkit-scrollbar]:w-2.5
        [&::-webkit-scrollbar-track]:bg-gray-100/50
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gradient-to-b
        [&::-webkit-scrollbar-thumb]:from-orange-300/60
        [&::-webkit-scrollbar-thumb]:to-amber-400/60
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:hover:from-orange-400/80
        [&::-webkit-scrollbar-thumb]:hover:to-amber-500/80
        [&::-webkit-scrollbar-thumb]:transition-all
        [&::-webkit-scrollbar-thumb]:duration-300">

                <form onSubmit={handleProfileSubmit} className="space-y-6 pb-2">
                  {/* Name Fields with card-like appearance */}
                  <div className="grid grid-cols-2 gap-5">
                    <div className="relative group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2.5 ml-0.5">
                        First Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="first_name"
                          value={profileFormData.first_name}
                          onChange={handleProfileInputChange}
                          className={`w-full px-4 py-3 rounded-xl border-2 bg-white/80 transition-all duration-200 
                    ${profileFormErrors.first_name
                              ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-200"
                              : "border-gray-200/80 focus:border-orange-400 focus:ring-3 focus:ring-orange-100"
                            } outline-none placeholder:text-gray-400 group-hover:shadow-sm`}
                          placeholder="John"
                        />
                        <div className="absolute inset-0 rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                      </div>
                      {profileFormErrors.first_name && (
                        <p className="mt-2 ml-1 text-sm text-red-600 flex items-center gap-1.5">
                          <span className="text-red-500">⚠</span> {profileFormErrors.first_name}
                        </p>
                      )}
                    </div>

                    <div className="relative group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2.5 ml-0.5">
                        Last Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="last_name"
                          value={profileFormData.last_name}
                          onChange={handleProfileInputChange}
                          className={`w-full px-4 py-3 rounded-xl border-2 bg-white/80 transition-all duration-200 
                    ${profileFormErrors.last_name
                              ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-200"
                              : "border-gray-200/80 focus:border-orange-400 focus:ring-3 focus:ring-orange-100"
                            } outline-none placeholder:text-gray-400 group-hover:shadow-sm`}
                          placeholder="Doe"
                        />
                        <div className="absolute inset-0 rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                      </div>
                      {profileFormErrors.last_name && (
                        <p className="mt-2 ml-1 text-sm text-red-600 flex items-center gap-1.5">
                          <span className="text-red-500">⚠</span> {profileFormErrors.last_name}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="relative group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2.5 ml-0.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        ✉️
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={profileFormData.email}
                        onChange={handleProfileInputChange}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 bg-white/80 transition-all duration-200 
                  ${profileFormErrors.email
                            ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-200"
                            : "border-gray-200/80 focus:border-orange-400 focus:ring-3 focus:ring-orange-100"
                          } outline-none placeholder:text-gray-400 group-hover:shadow-sm`}
                        placeholder="john@example.com"
                      />
                      <div className="absolute inset-0 rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                    </div>
                    {profileFormErrors.email && (
                      <p className="mt-2 ml-1 text-sm text-red-600 flex items-center gap-1.5">
                        <span className="text-red-500">⚠</span> {profileFormErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Profile Picture Upload with enhanced design */}
                  <div className="relative group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2.5 ml-0.5">
                      Profile Picture
                    </label>
                    <label className="flex flex-col items-center justify-center w-full p-6 border-3 border-dashed border-gray-200/80 rounded-2xl cursor-pointer 
              bg-gradient-to-br from-gray-50/50 to-white/50 
              hover:border-orange-300 hover:bg-gradient-to-br hover:from-orange-50/30 hover:to-amber-50/20 
              active:scale-[0.995] transition-all duration-300 group">
                      <div className="text-center p-3">
                        <div className="relative mb-3">
                          <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-orange-100 to-amber-50 flex items-center justify-center shadow-inner">
                            <Upload className="w-7 h-7 text-orange-400" />
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border-2 border-orange-200 flex items-center justify-center">
                            <Plus className="w-3.5 h-3.5 text-orange-500" />
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-700 block mb-1">
                          {profileImage ? profileImage.name : "Click to upload"}
                        </span>
                        <p className="text-xs text-gray-500">
                          PNG, JPG up to 5MB • Recommended: 400×400px
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>

                  {/* Dietary Restrictions with icon */}
                  <div className="relative group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2.5 ml-0.5 flex items-center gap-2">
                      <span className="text-lg">🥗</span> Dietary Restrictions
                      <span className="text-gray-400 font-normal text-xs">
                        (comma separated)
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="dietary_restrictions"
                        value={profileFormData.dietary_restrictions}
                        onChange={handleProfileInputChange}
                        className={`w-full px-4 py-3 rounded-xl border-2 bg-white/80 transition-all duration-200 
                  ${profileFormErrors.dietary_restrictions
                            ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-200"
                            : "border-gray-200/80 focus:border-orange-400 focus:ring-3 focus:ring-orange-100"
                          } outline-none placeholder:text-gray-400 group-hover:shadow-sm`}
                        placeholder="Vegetarian, Gluten-Free, Vegan, Peanut Allergy"
                      />
                      <div className="absolute inset-0 rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                    </div>
                    {profileFormErrors.dietary_restrictions && (
                      <p className="mt-2 ml-1 text-sm text-red-600 flex items-center gap-1.5">
                        <span className="text-red-500">⚠</span> {profileFormErrors.dietary_restrictions}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-2 ml-1">
                      Add dietary restrictions or allergies. Use commas to separate multiple items.
                    </p>
                  </div>

                  {/* Culinary Preferences */}
                  <div className="relative group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2.5 ml-0.5">
                      Culinary Preferences
                      <span className="text-gray-400 font-normal text-xs ml-2">
                        (comma separated)
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="culinary_preferences"
                        value={profileFormData.culinary_preferences}
                        onChange={handleProfileInputChange}
                        className={`w-full px-4 py-3 rounded-xl border-2 bg-white/80 transition-all duration-200 
                  ${profileFormErrors.culinary_preferences
                            ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-200"
                            : "border-gray-200/80 focus:border-orange-400 focus:ring-3 focus:ring-orange-100"
                          } outline-none placeholder:text-gray-400 group-hover:shadow-sm`}
                        placeholder="Italian, Mexican, Indian, Asian, Mediterranean"
                      />
                      <div className="absolute inset-0 rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                    </div>
                    {profileFormErrors.culinary_preferences && (
                      <p className="mt-2 ml-1 text-sm text-red-600 flex items-center gap-1.5">
                        <span className="text-red-500">⚠</span> {profileFormErrors.culinary_preferences}
                      </p>
                    )}
                  </div>

                  {/* Error Message with better styling */}
                  {profileFormError && (
                    <div className="text-red-600 text-sm bg-gradient-to-r from-red-50/80 to-red-50/40 p-4 rounded-2xl border border-red-200/70 shadow-sm mt-2">
                      <div className="flex items-start gap-3">
                        <div className="p-1.5 rounded-lg bg-red-100 mt-0.5">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        </div>
                        <div>
                          <p className="font-medium text-red-700">Update Failed</p>
                          <p className="text-red-600/90 mt-0.5">{profileFormError}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>

              {/* Fixed Footer with gradient border */}
              <div className="px-8 mb-12 pt-2 mt-2 bg-gradient-to-t from-white via-white to-white/95 border-t border-gray-100/80">
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsProfileModalOpen(false)}
                    className="px-7 py-3 text-gray-600 font-semibold hover:bg-gray-100/80 rounded-xl 
              transition-all duration-200 active:scale-95 border border-gray-200/70 
              hover:border-gray-300 hover:shadow-sm"
                    disabled={profileFormLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={handleProfileSubmit}
                    disabled={profileFormLoading || hasProfileErrors}
                    className={`px-7 py-3 rounded-xl font-semibold transition-all duration-300 active:scale-[0.98]
              ${profileFormLoading || hasProfileErrors
                        ? "bg-gradient-to-r from-gray-300 to-gray-200 cursor-not-allowed text-gray-500"
                        : "bg-gradient-to-r from-[#FF9D43] via-[#FF8A33] to-[#FF7A23] hover:shadow-lg hover:shadow-orange-200/50 text-white hover:scale-[1.02]"
                      } relative overflow-hidden group`}
                  >
                    {/* Shine effect on hover */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent 
              -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>

                    <span className="relative flex items-center justify-center gap-2">
                      {profileFormLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Updating...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Update Profile
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Service Provider Modal - Enhanced with Multiple Service Areas */}
        {isProviderModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsProviderModalOpen(false)}
            ></div>
            <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 animate-scale-in max-h-[90vh] overflow-y-auto border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    💼{" "}
                    {providerData
                      ? "Edit Professional Details"
                      : "Add Professional Details"}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Fill in your professional information
                  </p>
                </div>
                <button
                  onClick={() => setIsProviderModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleProviderSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Provider Type *
                    </label>
                    <select
                      name="provider_type"
                      value={providerFormData.provider_type}
                      onChange={handleProviderInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    >
                      <option value="individual">Individual Chef</option>
                      <option value="company">Company/Catering Service</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Service Type *
                    </label>
                    <input
                      type="text"
                      name="service_type"
                      value={providerFormData.service_type}
                      onChange={handleProviderInputChange}
                      className={`w-full px-4 py-2.5 rounded-xl border ${providerFormError.service_type
                        ? "border-red-300"
                        : "border-gray-300"
                        } focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all`}
                      placeholder="e.g. Chef, Caterer, Event Cook"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name{" "}
                    {providerFormData.provider_type === "company" && " *"}
                    <span className="text-gray-400 font-normal text-xs">
                      (if applicable)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    value={providerFormData.company_name}
                    onChange={handleProviderInputChange}
                    className={`w-full px-4 py-2.5 rounded-xl border ${providerFormError.company_name
                      ? "border-red-300"
                      : "border-gray-300"
                      } focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all`}
                    placeholder="Leave blank for individual providers"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Service Provides *
                    </label>

                    <select
                      name="provides"
                      value={providerFormData.provides}
                      onChange={handleProviderInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Select service</option>
                      <option value="Personal Chef">Personal Chef</option>
                      <option value="Catering Service">Catering Service</option>
                      <option value="Event Cooking">Event Cooking</option>
                      <option value="Meal Prep">Meal Preparation</option>
                      <option value="Bakery">Bakery</option>
                      <option value="Other">Other</option>
                    </select>

                    {providerFormData.provides === "Other" && (
                      <input
                        type="text"
                        name="custom_provides"
                        placeholder="Please specify service"
                        onChange={handleProviderInputChange}
                        className="mt-3 w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500"
                      />
                    )}

                    {providerFormError.provides && (
                      <p className="mt-1 text-sm text-red-600">
                        {providerFormError.provides}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Experience (years) *
                    </label>
                    <input
                      type="text"
                      name="experience_years"
                      value={
                        providerFormData.experience_years === 0
                          ? ""
                          : providerFormData.experience_years
                      }
                      onChange={handleProviderInputChange}
                      className={`w-full px-4 py-2.5 rounded-xl border ${providerFormError.experience_years
                        ? "border-red-300"
                        : "border-gray-300"
                        } focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all`}
                      min="0"
                      max="50"
                    />
                  </div>
                </div>

                {/* Service Areas Section - MULTIPLE */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-semibold text-gray-700">
                      Service Areas *
                    </label>
                    <button
                      type="button"
                      onClick={addServiceArea}
                      className="flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
                    >
                      <Plus className="w-4 h-4" />
                      Add Another Area
                    </button>
                  </div>

                  {serviceAreas.map((area, index) => (
                    <div
                      key={index}
                      className="mb-4 p-4 border border-gray-200 rounded-xl bg-gray-50/50"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-medium text-gray-700">
                          Service Area {index + 1}
                        </label>
                        {serviceAreas.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeServiceArea(index)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="mb-3">
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Pincode *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={area.pincode}
                            onChange={(e) =>
                              handleServiceAreaChange(
                                index,
                                "pincode",
                                e.target.value
                              )
                            }
                            className={`w-full px-4 py-2.5 rounded-xl border ${serviceAreaErrors[index]
                              ? "border-red-300"
                              : "border-gray-300"
                              } focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all`}
                            placeholder="Enter 6-digit Pincode"
                            maxLength={6}
                          />
                          {loadingPincodes.includes(index) && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
                            </div>
                          )}
                        </div>
                        {serviceAreaErrors[index] && (
                          <p className="mt-1 text-sm text-red-600">
                            {serviceAreaErrors[index]}
                          </p>
                        )}
                      </div>

                      {area.area && (
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Area
                            </label>
                            <input
                              type="text"
                              value={area.area}
                              onChange={(e) =>
                                handleServiceAreaChange(
                                  index,
                                  "area",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              City
                            </label>
                            <input
                              type="text"
                              value={area.city}
                              onChange={(e) =>
                                handleServiceAreaChange(
                                  index,
                                  "city",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                              readOnly
                            />
                          </div>
                          <div className="col-span-2">
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              State
                            </label>
                            <input
                              type="text"
                              value={area.state}
                              onChange={(e) =>
                                handleServiceAreaChange(
                                  index,
                                  "state",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                              readOnly
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Specialization{" "}
                    <span className="text-gray-400 font-normal text-xs">
                      (comma-separated)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    value={providerFormData.specialization}
                    onChange={handleProviderInputChange}
                    className={`w-full px-4 py-2.5 rounded-xl border ${providerFormError.specialization
                      ? "border-red-300"
                      : "border-gray-300"
                      } focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all`}
                    placeholder="e.g. Italian, Indian, Chinese, Continental"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    About Your Services
                  </label>
                  <textarea
                    name="description"
                    value={providerFormData.description}
                    onChange={handleProviderInputChange}
                    rows={5}
                    className={`w-full px-4 py-2.5 rounded-xl border ${providerFormError.description
                      ? "border-red-300"
                      : "border-gray-300"
                      } focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none`}
                    placeholder="Tell clients about your experience, specialties, and what makes you unique..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {providerFormData.description.length}/500 characters
                  </p>
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
                    disabled={providerFormLoading || hasProviderErrors}
                    className={`px-6 py-2.5 rounded-xl font-semibold shadow-md transition-all ${providerFormLoading || hasProviderErrors
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#e59f4a] to-[#e68125] hover:shadow-lg hover:scale-105"
                      }`}
                  >
                    {providerFormLoading ? "Saving..." : "Save Details"}
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
          onCancel={() => setDeleteModal({ isOpen: false, addressId: "" })}
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

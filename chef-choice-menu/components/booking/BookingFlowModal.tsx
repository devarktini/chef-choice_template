"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { X, ChevronRight, ChevronLeft, Calendar as CalendarIcon, Utensils, Clock, Users, ChefHat, CheckCircle2, AlertCircle } from 'lucide-react';
import MultiSelect from '@/components/ui/MultiSelect'; // Import the custom MultiSelect
import { BookingService, Booking } from '@/services/bookingService';
import { AddressService } from '@/services/addressService';
import { Address } from '@/types/auth'; // Ensure this type exists or is imported correctly.
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// --- Dummy Data ---
const EVENT_TYPES = [
    { value: 'marriage', label: 'Marriage', icon: '💍' },
    { value: 'birthday', label: 'Birthday', icon: '🎂' },
    { value: 'anniversary', label: 'Anniversary', icon: '💑' },
    { value: 'corporate', label: 'Corporate Event', icon: '🏢' },
    { value: 'gathering', label: 'Family Gathering', icon: '👨‍👩‍👧‍👦' },
    { value: 'other', label: 'Other', icon: '🎉' }
];

const CUISINES = [
    { value: 'north_indian', label: 'North Indian' },
    { value: 'south_indian', label: 'South Indian' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'italian', label: 'Italian' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'thai', label: 'Thai' },
    { value: 'continental', label: 'Continental' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'lebanese', label: 'Lebanese' }
];

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Evening Snacks', 'Dinner'];

const MENU_ITEMS_DUMMY = {
    'north_indian': [
        { value: 'butter_chicken', label: 'Butter Chicken' },
        { value: 'dal_makhani', label: 'Dal Makhani' },
        { value: 'paneer_tikka', label: 'Paneer Tikka' },
        { value: 'naan_basket', label: 'Assorted Naan Basket' }
    ],
    'south_indian': [
        { value: 'dosa_platter', label: 'Dosa Platter' },
        { value: 'idli_sambar', label: 'Idli Sambar' },
        { value: 'hyderabadi_biryani', label: 'Hyderabadi Biryani' }
    ],
    'chinese': [
        { value: 'hakka_noodles', label: 'Hakka Noodles' },
        { value: 'manchurian', label: 'Veg Manchurian' },
        { value: 'spring_rolls', label: 'Spring Rolls' }
    ],
    'italian': [
        { value: 'pasta_alfredo', label: 'Pasta Alfredo' },
        { value: 'margherita_pizza', label: 'Margherita Pizza' },
        { value: 'lasagna', label: 'Veg Lasagna' }
    ]
    // Add more mappings as needed or use generic fallback
};

const SERVICE_PROVIDERS = [
    { value: 'chef_raj', label: 'Chef Raj Kumar (Master Chef)', image: 'https://i.pravatar.cc/150?u=chef_raj' },
    { value: 'chef_anita', label: 'Chef Anita Singh (Pastry Specialist)', image: 'https://i.pravatar.cc/150?u=chef_anita' },
    { value: 'catering_delight', label: 'Delight Catering Services', image: 'https://i.pravatar.cc/150?u=catering' },
    { value: 'royal_venue', label: 'Royal Palace Hall (Venue)', image: 'https://i.pravatar.cc/150?u=venue1' },
    { value: 'event_planners', label: 'Dream Event Planners', image: 'https://i.pravatar.cc/150?u=planner' }
];

// --- Types ---
interface BookingData {
    eventType: string;
    dates: Date[];
    menuType: 'veg' | 'non_veg' | 'both' | '';
    cuisines: string[];
    mealConfig: Record<string, { meals: string[], time: string }>; // Key: date string
    isMealConfigSkipped: boolean;
    selectedMenu: string[];
    guests: { adults: number; children: number; babies: number };
    serviceProviders: string[];
    eventAddressId?: string;
}

const INITIAL_DATA: BookingData = {
    eventType: '',
    dates: [],
    menuType: '',
    cuisines: [],
    mealConfig: {},
    isMealConfigSkipped: false,
    selectedMenu: [],
    guests: { adults: 0, children: 0, babies: 0 },
    serviceProviders: [],
    eventAddressId: ''
};

export default function BookingFlowModal({ isOpen, onClose, existingBooking }: { isOpen: boolean; onClose: () => void; existingBooking?: Booking }) {
    const [step, setStep] = useState(1);

    // Initialize data from existingBooking if provided
    const [data, setData] = useState<BookingData>(() => {
        if (existingBooking) {
            // Map API response to BookingData
            return {
                eventType: existingBooking.event_type || '',
                dates: existingBooking.dates
                    ? Object.values(existingBooking.dates).map(d => new Date(d))
                    : [],
                menuType: (existingBooking.food_cuisines_preferences?.type as any) || '',
                cuisines: existingBooking.food_cuisines_preferences?.cuisines || [],
                mealConfig: existingBooking.meal_timings || {},
                isMealConfigSkipped: false, // Infer?
                selectedMenu: existingBooking.menu_items_details?.items || [],
                guests: existingBooking.guests || { adults: 0, children: 0, babies: 0 },
                serviceProviders: existingBooking.services_selections?.providers || [],
                eventAddressId: existingBooking.event_address?.id || ''
            };
        }
        return INITIAL_DATA;
    });

    // Reset data when existingBooking changes (e.g. opening modal for different booking)
    // This is important if the modal instance is reused
    useMemo(() => {
        if (isOpen && existingBooking) {
            setData({
                eventType: existingBooking.event_type || '',
                dates: existingBooking.dates
                    ? Object.values(existingBooking.dates).map(d => new Date(d))
                    : [],
                menuType: (existingBooking.food_cuisines_preferences?.type as any) || '',
                cuisines: existingBooking.food_cuisines_preferences?.cuisines || [],
                mealConfig: existingBooking.meal_timings || {},
                isMealConfigSkipped: false,
                selectedMenu: existingBooking.menu_items_details?.items || [],
                guests: existingBooking.guests || { adults: 0, children: 0, babies: 0 },
                serviceProviders: existingBooking.services_selections?.providers || [],
                eventAddressId: existingBooking.event_address?.id || ''
            });
        } else if (isOpen && !existingBooking) {
            // If opening fresh, reset to initial? 
            // Better not reset here to avoid clearing if user just closed and reopened. 
            // But if 'existingBooking' prop changes from undefined to defined, we must update.
        }
    }, [existingBooking, isOpen]);

    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loadingAddresses, setLoadingAddresses] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const totalSteps = 7;

    const updateData = (updates: Partial<BookingData>) => {
        setData(prev => ({ ...prev, ...updates }));
    };

    const handleNext = () => {
        if (canProceed()) {
            if (!completedSteps.includes(step)) {
                setCompletedSteps(prev => [...prev, step]);
            }
            // Skip logic handling
            if (step === 3 && data.isMealConfigSkipped) {
                // If skipping meals, we probably skip menu selection too? 
                // "if user has skip prev steps... than we will skip this steps as well" -> User refers to Step 4 Menu Selection
                setStep(5); // Skip Step 4
            } else {
                setStep(prev => Math.min(prev + 1, totalSteps));
            }
        }
    };

    const handleBack = () => {
        if (step === 5 && data.isMealConfigSkipped) {
            setStep(3); // Go back to Step 3 if we skipped 4
        } else {
            setStep(prev => Math.max(prev - 1, 1));
        }
    };

    const handleSubmit = async () => {
        console.log('Booking Submission:', data);
        setIsSubmitting(true);
        try {
            // Map data to API payload
            const payload = {
                event_type: data.eventType,
                event_address: data.eventAddressId,
                dates: data.dates.reduce((acc, date) => {
                    // Format date as YYYY-MM-DD
                    const dateStr = date.toISOString().split('T')[0];
                    return { ...acc, [dateStr]: dateStr };
                }, {}),
                food_cuisines_preferences: {
                    type: data.menuType,
                    cuisines: data.cuisines
                },
                meal_timings: data.mealConfig,
                menu_items_details: {
                    items: data.selectedMenu
                },
                booking_teams: {
                    // Empty as per requirement, or we can map providers here?
                    // The user said "services_selections" for providers in the prompt?
                    // "services_selections": {}, "booking_teams": {}
                    // Logic: "booking_teams" usually refers to staff? 
                    // Let's verify prompt mapping: "services_selections": {} 
                    // I will put providers in services_selections as it seems more appropriate.
                },
                guests: data.guests,
                client_materials: {}, // Empty for now
                services_selections: {
                    providers: data.serviceProviders
                },
                other_requirements: {}
            };

            if (existingBooking) {
                await BookingService.updateBooking(existingBooking.id, payload);
                toast.success('Booking updated successfully!');
            } else {
                await BookingService.createBooking(payload);
                toast.success('Booking request submitted successfully!');
                // Redirect to bookings page for new bookings
                router.push('/dashboard/bookings');
            }

            onClose();
            // Force refresh if needed? The parent likely handles data refresh.
        } catch (error: any) {
            console.error('Booking Error:', error);
            toast.error('Failed to submit booking: ' + (error.message || 'Unknown error'));
        } finally {
            setIsSubmitting(false);
        }
    };

    // Load addresses when reaching Summary step
    useMemo(() => {
        if (step === 7) {
            setLoadingAddresses(true);
            AddressService.getAddresses()
                .then(setAddresses)
                .catch(err => console.error('Failed to load addresses', err))
                .finally(() => setLoadingAddresses(false));
        }
    }, [step]);

    // Validation Logic
    const canProceed = () => {
        switch (step) {
            case 1: return !!data.eventType && data.dates.length > 0;
            case 2: return !!data.menuType && data.cuisines.length > 0;
            case 3:
                if (data.isMealConfigSkipped) return true;
                // Check if for every date, at least one meal is selected?
                // Or just basic validation. Let's enforce at least one configuration if not skipped.
                return data.dates.every(d => {
                    const dateKey = d.toISOString().split('T')[0];
                    const config = data.mealConfig[dateKey];
                    return config && config.meals.length > 0;
                });
            case 4: return data.selectedMenu.length > 0; // Unless logic says skippable? Assume mandatory if not skipped
            case 5: return (data.guests.adults + data.guests.children) > 0;
            case 6: return data.serviceProviders.length > 0; // Mandatory? User said "we can search... and select". Assume yes.
            case 7: return !!data.eventAddressId && !isSubmitting;
            default: return true;
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] h-[100dvh] w-screen flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

            {/* Modal Container */}
            {/* Modal Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
                {/* Sidebar - Progress */}
                <div className="w-full md:w-1/4 bg-gray-50 border-r border-gray-100 p-6 flex flex-col">
                    <div className="flex items-center space-x-2 text-primary-600 mb-8">
                        <ChefHat className="w-8 h-8" />
                        <span className="text-xl font-bold tracking-tight">Chefs Choice</span>
                    </div>

                    <div className="space-y-1 flex-1 overflow-y-auto">
                        {[
                            { id: 1, label: 'Event & Date', icon: CalendarIcon },
                            { id: 2, label: 'Cuisine & Type', icon: Utensils },
                            { id: 3, label: 'Meal Planning', icon: Clock },
                            { id: 4, label: 'Menu Selection', icon: Utensils },
                            { id: 5, label: 'Guests', icon: Users },
                            { id: 6, label: 'Service Provider', icon: ChefHat },
                            { id: 7, label: 'Review', icon: CheckCircle2 },
                        ].map((s) => (
                            <div
                                key={s.id}
                                className={`flex items-center p-3 rounded-xl transition-all ${step === s.id
                                    ? 'bg-primary-50 text-primary-700 font-semibold shadow-sm ring-1 ring-primary-100'
                                    : completedSteps.includes(s.id)
                                        ? 'text-green-600 bg-green-50/50'
                                        : 'text-gray-400'
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm ${step === s.id ? 'bg-primary-500 text-white'
                                    : completedSteps.includes(s.id) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                                    }`}>
                                    {completedSteps.includes(s.id) ? <CheckCircle2 className="w-4 h-4" /> : s.id}
                                </div>
                                <span>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                {step === 1 && "Start Planning Your Event"}
                                {step === 2 && "Cuisine & Preferences"}
                                {step === 3 && "Schedule Your Meals"}
                                {step === 4 && "Select Your Menu"}
                                {step === 5 && "Guest List"}
                                {step === 6 && "Choose Service Provider"}
                                {step === 7 && "Review & Confirm"}
                            </h2>
                            <p className="text-gray-500 text-sm mt-1">Step {step} of {totalSteps}</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Scrollable Step Content */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-white">
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="h-full"
                            >
                                {/* --- STEP 1: Event & Date --- */}
                                {step === 1 && (
                                    <div className="grid md:grid-cols-2 gap-8 h-full">
                                        <div className="flex flex-col h-full">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Whats the occasion?</h3>
                                            <div className="grid grid-cols-2 gap-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                                {EVENT_TYPES.map(type => (
                                                    <button
                                                        key={type.value}
                                                        onClick={() => updateData({ eventType: type.value })}
                                                        className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-3 transition-all h-[120px] ${data.eventType === type.value
                                                            ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-md'
                                                            : 'border-gray-100 hover:border-gray-200 text-gray-600 hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        <span className="text-3xl">{type.icon}</span>
                                                        <span className="font-medium text-center leading-tight">{type.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-col h-full">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">When is it happening?</h3>
                                            <div className="flex-1 bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex flex-col items-center">
                                                <DatePicker
                                                    selected={null}
                                                    onChange={(date: Date | null) => {
                                                        if (!date) return;
                                                        const exists = data.dates.find(d => d.toDateString() === date.toDateString());
                                                        let newDates;
                                                        if (exists) {
                                                            newDates = data.dates.filter(d => d.toDateString() !== date.toDateString());
                                                        } else {
                                                            newDates = [...data.dates, date].sort((a, b) => a.getTime() - b.getTime());
                                                        }
                                                        updateData({ dates: newDates });
                                                    }}
                                                    highlightDates={data.dates}
                                                    placeholderText="Select dates"
                                                    inline
                                                    calendarClassName="!border-none !shadow-none !w-full !font-sans"
                                                    dayClassName={(date) =>
                                                        data.dates.find(d => d.toDateString() === date.toDateString())
                                                            ? "bg-primary-500 text-white hover:bg-primary-600 rounded-full"
                                                            : "hover:bg-gray-100 rounded-full"
                                                    }
                                                />

                                                <div className="w-full mt-4 pt-4 border-t border-gray-100">
                                                    <p className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-wide">Selected Dates</p>
                                                    <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto">
                                                        {data.dates.length > 0 ? data.dates.map((d, i) => (
                                                            <span key={i} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium border border-primary-100 flex items-center">
                                                                {d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                                                                <X
                                                                    className="w-3 h-3 ml-2 cursor-pointer hover:text-red-500"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        updateData({ dates: data.dates.filter((_, idx) => idx !== i) });
                                                                    }}
                                                                />
                                                            </span>
                                                        )) : (
                                                            <p className="text-gray-400 italic text-sm">No dates selected yet</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* --- STEP 2: Menu Type & Cuisine --- */}
                                {step === 2 && (
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Preferred Food Type</h3>
                                            <div className="flex gap-4">
                                                {['veg', 'non_veg', 'both'].map((type) => (
                                                    <button
                                                        key={type}
                                                        onClick={() => updateData({ menuType: type as any })}
                                                        className={`flex-1 p-6 rounded-xl border-2 transition-all font-medium text-lg ${data.menuType === type
                                                            ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-md'
                                                            : 'border-gray-100 hover:border-gray-200 text-gray-500'
                                                            }`}
                                                    >
                                                        {type === 'veg' && '🥬 Vegetarian'}
                                                        {type === 'non_veg' && '🍗 Non-Vegetarian'}
                                                        {type === 'both' && '🥘 Both'}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="h-[300px] flex flex-col">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Cuisines</h3>
                                            <div className="flex-1">
                                                <MultiSelect
                                                    options={CUISINES}
                                                    value={data.cuisines}
                                                    onChange={(vals) => updateData({ cuisines: vals })}
                                                    placeholder="Search and add cuisines (e.g., North Indian, Italian)"
                                                />
                                            </div>
                                            <p className="text-sm text-gray-500 mt-2">You can select multiple cuisines to create a diverse menu.</p>
                                        </div>
                                    </div>
                                )}

                                {/* --- STEP 3: Meal Planning --- */}
                                {step === 3 && (
                                    <div className="space-y-6 h-full flex flex-col">
                                        <div className="flex items-center justify-between p-4 bg-blue-50 text-blue-800 rounded-lg border border-blue-100 shrink-0">
                                            <div className="flex items-center gap-2">
                                                <AlertCircle className="w-5 h-5" />
                                                <p className="text-sm font-medium">Want to decide the detailed menu later?</p>
                                            </div>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={data.isMealConfigSkipped}
                                                    onChange={(e) => updateData({ isMealConfigSkipped: e.target.checked })}
                                                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                                                />
                                                <span className="font-semibold text-sm">Skip for now</span>
                                            </label>
                                        </div>

                                        {!data.isMealConfigSkipped && (
                                            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
                                                {data.dates.map((date) => {
                                                    const dateKey = date.toISOString().split('T')[0];
                                                    const config = data.mealConfig[dateKey] || { meals: [], time: '' };

                                                    return (
                                                        <div key={dateKey} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                                            <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                                                                <CalendarIcon className="w-5 h-5 mr-2 text-primary-500" />
                                                                {date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                                                            </h4>

                                                            <div className="grid md:grid-cols-2 gap-6">
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Meals</label>
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {MEAL_TYPES.map(meal => (
                                                                            <button
                                                                                key={meal}
                                                                                onClick={() => {
                                                                                    const current = config.meals;
                                                                                    const newMeals = current.includes(meal)
                                                                                        ? current.filter(m => m !== meal)
                                                                                        : [...current, meal];
                                                                                    updateData({
                                                                                        mealConfig: {
                                                                                            ...data.mealConfig,
                                                                                            [dateKey]: { ...config, meals: newMeals }
                                                                                        }
                                                                                    });
                                                                                }}
                                                                                className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${config.meals.includes(meal)
                                                                                    ? 'bg-primary-500 text-white border-primary-500'
                                                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300'
                                                                                    }`}
                                                                            >
                                                                                {meal}
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Serving Time</label>
                                                                    <input
                                                                        type="time"
                                                                        value={config.time}
                                                                        onChange={(e) => updateData({
                                                                            mealConfig: {
                                                                                ...data.mealConfig,
                                                                                [dateKey]: { ...config, time: e.target.value }
                                                                            }
                                                                        })}
                                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* --- STEP 4: Menu Selection --- */}
                                {step === 4 && (
                                    <div className="space-y-6 h-full flex flex-col">
                                        <div className="bg-primary-50 p-4 rounded-xl border border-primary-100 shrink-0">
                                            <p className="text-primary-800 text-sm">
                                                Based on your selected cuisines ({data.cuisines.map(c => CUISINES.find(opt => opt.value === c)?.label).join(', ')}), select the dishes youd like.
                                            </p>
                                        </div>

                                        <div className="flex-1">
                                            <MultiSelect
                                                options={data.cuisines.flatMap(cuisineKey =>
                                                    // @ts-ignore
                                                    MENU_ITEMS_DUMMY[cuisineKey] || []
                                                )}
                                                value={data.selectedMenu}
                                                onChange={(vals) => updateData({ selectedMenu: vals })}
                                                placeholder="Search and select dishes..."
                                                label="Select Dishes"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* --- STEP 5: Guest Count --- */}
                                {step === 5 && (
                                    <div className="space-y-6 max-w-xl mx-auto mt-4">
                                        {[
                                            { key: 'adults', label: 'Adults', desc: 'Ages 13+' },
                                            { key: 'children', label: 'Children', desc: 'Ages 2-12' },
                                            { key: 'babies', label: 'Babies', desc: 'Infants' }
                                        ].map((item) => (
                                            <div key={item.key} className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                                                <div>
                                                    <h4 className="font-bold text-gray-800 text-lg">{item.label}</h4>
                                                    <p className="text-gray-500 text-sm">{item.desc}</p>
                                                </div>
                                                <div className="flex items-center space-x-3 bg-white p-2 rounded-lg shadow-sm border border-gray-200">
                                                    <button
                                                        // @ts-ignore
                                                        onClick={() => updateData({ guests: { ...data.guests, [item.key]: Math.max(0, parseInt(data.guests[item.key]) - 1) } })}
                                                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xl transition-colors"
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        // @ts-ignore
                                                        value={data.guests[item.key]}
                                                        // @ts-ignore
                                                        onChange={(e) => updateData({ guests: { ...data.guests, [item.key]: Math.max(0, parseInt(e.target.value) || 0) } })}
                                                        className="w-16 text-center font-bold text-gray-800 text-xl border-none focus:ring-0 outline-none p-0"
                                                    />
                                                    <button
                                                        // @ts-ignore
                                                        onClick={() => updateData({ guests: { ...data.guests, [item.key]: parseInt(data.guests[item.key]) + 1 } })}
                                                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-50 hover:bg-primary-100 text-primary-600 font-bold text-xl transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* --- STEP 6: Service Provider --- */}
                                {step === 6 && (
                                    <div className="space-y-6 h-full flex flex-col">
                                        <h3 className="text-lg font-semibold text-gray-800 shrink-0">Select Service Providers (Chefs, Halls, Caterers)</h3>
                                        <div className="flex-1">
                                            <MultiSelect
                                                options={SERVICE_PROVIDERS}
                                                value={data.serviceProviders}
                                                onChange={(vals) => updateData({ serviceProviders: vals })}
                                                placeholder="Search for chefs, catering services, or venues..."
                                                label="Service Providers"
                                            />

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                                                {SERVICE_PROVIDERS.filter(p => data.serviceProviders.includes(p.value)).map(provider => (
                                                    <div key={provider.value} className="flex items-center p-4 bg-white border border-primary-100 rounded-xl shadow-sm">
                                                        <img src={provider.image} alt="" className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-primary-50" />
                                                        <div>
                                                            <h4 className="font-bold text-gray-800">{provider.label}</h4>
                                                            <p className="text-xs text-green-600 font-medium flex items-center">
                                                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                                                Selected
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* --- STEP 7: Summary --- */}
                                {step === 7 && (
                                    <div className="space-y-6">
                                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                                            <div className="flex justify-between border-b border-gray-200 pb-4">
                                                <span className="text-gray-600">Event</span>
                                                <span className="font-bold text-gray-800 capitalize">{data.eventType}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-gray-200 pb-4">
                                                <span className="text-gray-600">Dates</span>
                                                <span className="font-bold text-gray-800">
                                                    {data.dates.map(d => d.toLocaleDateString()).join(', ')}
                                                </span>
                                            </div>
                                            <div className="flex justify-between border-b border-gray-200 pb-4">
                                                <span className="text-gray-600">Food Type</span>
                                                <span className="font-bold text-gray-800 capitalize">{data.menuType.replace('_', ' ')}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-gray-200 pb-4">
                                                <span className="text-gray-600">Total Guests</span>
                                                <span className="font-bold text-gray-800">
                                                    {data.guests.adults + data.guests.children + data.guests.babies}
                                                </span>
                                            </div>
                                            <div className="flex justify-between pb-2">
                                                <span className="text-gray-600">Service Providers</span>
                                                <span className="font-bold text-gray-800 text-right">
                                                    {data.serviceProviders.map(p => SERVICE_PROVIDERS.find(sp => sp.value === p)?.label).join(', ')}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="bg-primary-50 p-4 rounded-xl flex items-start gap-3">
                                            <CheckCircle2 className="w-6 h-6 text-primary-600 mt-1 shrink-0" />
                                            <div>
                                                <p className="font-bold text-primary-800">Ready to Book?</p>
                                                <p className="text-primary-700 text-sm">Please select the address for the event and confirm.</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-gray-800">Select Event Address</h3>
                                            {loadingAddresses ? (
                                                <div className="text-center py-4 text-gray-500">Loading addresses...</div>
                                            ) : addresses.length === 0 ? (
                                                <div className="p-4 border border-dashed border-red-300 bg-red-50 rounded-lg text-red-600">
                                                    No addresses found. Please add an address in your profile first.
                                                </div>
                                            ) : (
                                                <div className="grid gap-3">
                                                    {addresses.map(addr => (
                                                        <div
                                                            key={addr.id}
                                                            onClick={() => updateData({ eventAddressId: addr.id })}
                                                            className={`p-4 border rounded-xl cursor-pointer transition-all ${data.eventAddressId === addr.id
                                                                ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500'
                                                                : 'border-gray-200 hover:border-primary-200'
                                                                }`}
                                                        >
                                                            <div className="flex items-start justify-between">
                                                                <div>
                                                                    <p className="font-semibold text-gray-800">{addr.label}</p>
                                                                    <p className="text-sm text-gray-600">
                                                                        {addr.address_line1}, {addr.address_line2 ? addr.address_line2 + ', ' : ''}
                                                                        {addr.city}, {addr.state} - {addr.zip_code}
                                                                    </p>
                                                                </div>
                                                                {data.eventAddressId === addr.id && <CheckCircle2 className="w-5 h-5 text-primary-500" />}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Footer Controls */}
                    <div className="p-6 border-t border-gray-100 bg-white flex justify-between items-center z-10">
                        <button
                            onClick={handleBack}
                            disabled={step === 1}
                            className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${step === 1
                                ? 'opacity-0 pointer-events-none'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <ChevronLeft className="w-5 h-5 mr-2" />
                            Back
                        </button>

                        <button
                            onClick={step === totalSteps ? handleSubmit : handleNext}
                            disabled={!canProceed()}
                            className="flex items-center px-8 py-3 bg-gradient-to-r from-primary-500 to-warm-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:transform-none"
                        >
                            {step === totalSteps ? (isSubmitting ? 'Submitting...' : 'Confirm Selection') : 'Next Step'}
                            {step !== totalSteps && <ChevronRight className="w-5 h-5 ml-2" />}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

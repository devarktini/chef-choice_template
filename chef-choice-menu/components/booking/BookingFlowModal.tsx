"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  X,
  ChevronRight,
  ChevronLeft,
  Calendar as CalendarIcon,
  Utensils,
  Clock,
  Users,
  ChefHat,
  CheckCircle2,
  AlertCircle,
  FileText,
  Sparkles,
  Star,
  MapPin,
  Home,
  Briefcase,
  PartyPopper,
  Heart,
  Zap,
  Package,
  Shield,
  Truck,
  Coffee,
  Wine,
  Music,
  Microwave,
  Refrigerator,
  Trash2,
  Wifi,
  ParkingCircle,
  Sun,
  Moon,
  Coffee as CoffeeIcon,
  Droplets,
  Thermometer,
  Wind,
  Check,
  Plus,
  Minus,
  UserPlus,
  Gift,
  Crown,
  Target,
  Award,
  Radio,
  Tv,
  Volume2,
  Lightbulb,
  Bell,
  Camera,
  GamepadIcon,
  Flower2,
  Palette,
  Music2,
  Globe,
  Cloud,
  TreePine,
  Tent,
  Car,
  Bike,
  Bus,
  Train,
  Plane,
  Ship,
  Compass,
  Navigation,
  User,
} from "lucide-react";
import MultiSelect from "@/components/ui/MultiSelect";
import { BookingService, Booking } from "@/services/bookingService";
import { AddressService } from "@/services/addressService";
import { Address } from "@/types/auth";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

// Enhanced Dummy Data
const EVENT_TYPES = [
  {
    value: "marriage",
    label: "Wedding",
    icon: "💍",
    color: "from-purple-500 to-pink-500",
    description: "Grand celebrations with royal feasts",
  },
  {
    value: "birthday",
    label: "Birthday",
    icon: "🎂",
    color: "from-amber-500 to-orange-500",
    description: "Fun parties with special treats",
  },
  {
    value: "anniversary",
    label: "Anniversary",
    icon: "💑",
    color: "from-rose-500 to-red-500",
    description: "Romantic dinners & celebrations",
  },
  {
    value: "corporate",
    label: "Corporate",
    icon: "🏢",
    color: "from-blue-500 to-cyan-500",
    description: "Business meetings & conferences",
  },
  {
    value: "gathering",
    label: "Family Gathering",
    icon: "👨‍👩‍👧‍👦",
    color: "from-green-500 to-emerald-500",
    description: "Family reunions & get-togethers",
  },
  {
    value: "festival",
    label: "Festival",
    icon: "🎉",
    color: "from-yellow-500 to-amber-500",
    description: "Cultural & religious celebrations",
  },
  {
    value: "baby_shower",
    label: "Baby Shower",
    icon: "👶",
    color: "from-pink-500 to-rose-500",
    description: "Welcome the little one",
  },
  {
    value: "engagement",
    label: "Engagement",
    icon: "💎",
    color: "from-indigo-500 to-purple-500",
    description: "Prewedding celebrations",
  },
];

const CUISINES = [
  {
    value: "north_indian",
    label: "North Indian",
    icon: "🍛",
    popularity: "98%",
  },
  {
    value: "south_indian",
    label: "South Indian",
    icon: "🥘",
    popularity: "95%",
  },
  { value: "chinese", label: "Chinese", icon: "🥡", popularity: "92%" },
  { value: "italian", label: "Italian", icon: "🍝", popularity: "90%" },
  { value: "mexican", label: "Mexican", icon: "🌮", popularity: "85%" },
  { value: "thai", label: "Thai", icon: "🍜", popularity: "88%" },
  { value: "continental", label: "Continental", icon: "🥩", popularity: "82%" },
  {
    value: "mediterranean",
    label: "Mediterranean",
    icon: "🥗",
    popularity: "86%",
  },
  { value: "japanese", label: "Japanese", icon: "🍣", popularity: "89%" },
  { value: "lebanese", label: "Lebanese", icon: "🥙", popularity: "84%" },
  { value: "american", label: "American", icon: "🍔", popularity: "87%" },
  { value: "french", label: "French", icon: "🥐", popularity: "80%" },
];

const MEAL_TYPES = [
  {
    value: "breakfast",
    label: "Breakfast",
    icon: "☕",
    time: "7:00 AM - 10:00 AM",
  },
  { value: "lunch", label: "Lunch", icon: "🍽️", time: "12:00 PM - 3:00 PM" },
  {
    value: "evening_snacks",
    label: "Evening Snacks",
    icon: "🍵",
    time: "4:00 PM - 6:00 PM",
  },
  { value: "dinner", label: "Dinner", icon: "🍷", time: "7:00 PM - 10:00 PM" },
];

const KITCHEN_APPLIANCES = [
  { value: "oven", label: "Oven", icon: Microwave },
  { value: "refrigerator", label: "Refrigerator", icon: Refrigerator },
  { value: "microwave", label: "Microwave", icon: Microwave },
  { value: "gas_stove", label: "Gas Stove", icon: Thermometer },
  { value: "induction_cooktop", label: "Induction Cooktop", icon: Thermometer },
  { value: "dishwasher", label: "Dishwasher", icon: Droplets },
  { value: "chimney", label: "Chimney", icon: Wind },
  { value: "mixer_grinder", label: "Mixer Grinder", icon: Zap },
];

const UTENSIL_TYPES = [
  { value: "cutlery", label: "Cutlery Set", icon: Utensils },
  { value: "cookware", label: "Cookware", icon: Utensils },
  { value: "serving_plates", label: "Serving Plates", icon: Utensils },
  { value: "glassware", label: "Glassware", icon: Wine },
  { value: "cleaning_supplies", label: "Cleaning Supplies", icon: Trash2 },
];

const ADDITIONAL_SERVICES = [
  {
    value: "bartender",
    label: "Professional Bartender",
    icon: Wine,
    price: "₹2,500",
    description: "Cocktail mixing & beverage service",
  },
  {
    value: "waiters",
    label: "Wait Staff",
    icon: Users,
    price: "₹1,500/person",
    description: "Serving & guest assistance",
  },
  {
    value: "cleaners",
    label: "Cleanup Crew",
    icon: Trash2,
    price: "₹3,000",
    description: "Post-event cleanup",
  },
  {
    value: "decorations",
    label: "Decorations",
    icon: Flower2,
    price: "₹5,000+",
    description: "Theme-based decorations",
  },
  {
    value: "photography",
    label: "Photography",
    icon: Camera,
    price: "₹10,000+",
    description: "Professional photography",
  },
  {
    value: "entertainment",
    label: "Entertainment",
    icon: Music2,
    price: "₹7,500+",
    description: "Music & performances",
  },
  {
    value: "valet_parking",
    label: "Valet Parking",
    icon: ParkingCircle,
    price: "₹2,000",
    description: "Parking management",
  },
  {
    value: "security",
    label: "Security",
    icon: Shield,
    price: "₹4,000",
    description: "Event security staff",
  },
];

const AMBIENCE_OPTIONS = [
  { value: "indoor", label: "Indoor", icon: Home },
  { value: "outdoor", label: "Outdoor/Garden", icon: TreePine },
  { value: "poolside", label: "Poolside", icon: Droplets },
  { value: "rooftop", label: "Rooftop", icon: Sun },
  { value: "banquet_hall", label: "Banquet Hall", icon: Crown },
  { value: "tent", label: "Tented Area", icon: Tent },
];

const TRANSPORTATION_OPTIONS = [
  { value: "car_parking", label: "Car Parking", icon: Car },
  { value: "valet", label: "Valet Service", icon: Car },
  { value: "shuttle", label: "Shuttle Service", icon: Bus },
  { value: "taxi_arrangements", label: "Taxi Arrangements", icon: Bus },
];

// Enhanced service providers
const SERVICE_PROVIDERS = [
  {
    value: "chef_raj",
    label: "Chef Raj Kumar",
    title: "Master Chef (20+ years)",
    image: "https://i.pravatar.cc/150?u=chef_raj",
    rating: 4.9,
    reviews: 245,
    specialties: ["North Indian", "Mughlai", "Tandoor"],
    price: "₹8,500/day",
    badge: "Top Rated",
    verified: true,
  },
  {
    value: "chef_anita",
    label: "Chef Anita Singh",
    title: "Pastry Specialist",
    image: "https://i.pravatar.cc/150?u=chef_anita",
    rating: 4.8,
    reviews: 189,
    specialties: ["Desserts", "Baking", "Continental"],
    price: "₹6,500/day",
    badge: "Popular",
    verified: true,
  },
  {
    value: "catering_delight",
    label: "Delight Catering",
    title: "Premium Catering Service",
    image: "https://i.pravatar.cc/150?u=catering",
    rating: 4.7,
    reviews: 356,
    specialties: ["Bulk Orders", "Weddings", "Corporate"],
    price: "₹350/person",
    badge: "Budget Friendly",
    verified: true,
  },
  {
    value: "royal_venue",
    label: "Royal Palace Hall",
    title: "Luxury Venue",
    image: "https://i.pravatar.cc/150?u=venue1",
    rating: 4.6,
    reviews: 123,
    specialties: ["Weddings", "Grand Events"],
    price: "₹50,000/day",
    badge: "Luxury",
    verified: true,
  },
  {
    value: "event_planners",
    label: "Dream Event Planners",
    title: "Full Event Management",
    image: "https://i.pravatar.cc/150?u=planner",
    rating: 4.9,
    reviews: 289,
    specialties: ["Complete Planning", "Decoration", "Coordination"],
    price: "₹25,000+",
    badge: "All-in-One",
    verified: true,
  },
];

// Types
interface BookingData {
  eventType: string;
  dates: Date[];
  menuType: "veg" | "non_veg" | "both" | "";
  cuisines: string[];
  mealConfig: Record<string, { meals: string[]; time: string }>;
  isMealConfigSkipped: boolean;
  selectedMenu: string[];
  guests: { adults: number; children: number; babies: number };
  serviceProviders: string[];
  eventAddressId?: string;
  clientMaterials: {
    providedMaterials: string[];
    kitchenType: "own_kitchen" | "provided_kitchen" | "";
    kitchenAppliances: string[];
    utensils: string[];
  };
  otherRequirements: {
    additionalServices: string[];
    ambience: string[];
    transportation: string[];
    specialRequests: string;
    dietaryRestrictions: string[];
    entertainment: string[];
  };
}

const INITIAL_DATA: BookingData = {
  eventType: "",
  dates: [],
  menuType: "",
  cuisines: [],
  mealConfig: {},
  isMealConfigSkipped: false,
  selectedMenu: [],
  guests: { adults: 0, children: 0, babies: 0 },
  serviceProviders: [],
  eventAddressId: "",
  clientMaterials: {
    providedMaterials: [],
    kitchenType: "",
    kitchenAppliances: [],
    utensils: [],
  },
  otherRequirements: {
    additionalServices: [],
    ambience: [],
    transportation: [],
    specialRequests: "",
    dietaryRestrictions: [],
    entertainment: [],
  },
};

export default function BookingFlowModal({
  isOpen,
  onClose,
  existingBooking,
}: {
  isOpen: boolean;
  onClose: () => void;
  existingBooking?: Booking;
}) {
  const isRestricted =
    existingBooking?.request_status?.toLowerCase() === "confirmed";
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BookingData>(INITIAL_DATA);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const router = useRouter();

  const totalSteps = 8;

  // Initialize with existing booking
  useEffect(() => {
    if (existingBooking) {
      setData({
        eventType: existingBooking.event_type || "",
        dates: existingBooking.dates
          ? Object.values(existingBooking.dates).map((d) => new Date(d))
          : [],
        menuType:
          (existingBooking.food_cuisines_preferences?.type as any) || "",
        cuisines: existingBooking.food_cuisines_preferences?.cuisines || [],
        mealConfig: existingBooking.meal_timings || {},
        isMealConfigSkipped: false,
        selectedMenu: existingBooking.menu_items_details?.items || [],
        guests: existingBooking.guests || { adults: 0, children: 0, babies: 0 },
        serviceProviders: existingBooking.services_selections?.providers || [],
        eventAddressId: existingBooking.event_address?.id || "",
        clientMaterials: {
          providedMaterials: [],
          kitchenType: "",
          kitchenAppliances: [],
          utensils: [],
        },
        otherRequirements: {
          additionalServices: [],
          ambience: [],
          transportation: [],
          specialRequests: "",
          dietaryRestrictions: [],
          entertainment: [],
        },
      });
    }
  }, [existingBooking]);

  const updateData = (updates: Partial<BookingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (canProceed()) {
      if (!completedSteps.includes(step)) {
        setCompletedSteps((prev) => [...prev, step]);
      }

      if (step === 3 && data.isMealConfigSkipped) {
        setStep(5);
      } else {
        setStep((prev) => Math.min(prev + 1, totalSteps));
      }

      // Add subtle animation feedback
      if (step === totalSteps) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }
    }
  };

  const handleBack = () => {
    if (step === 5 && data.isMealConfigSkipped) {
      setStep(3);
    } else {
      setStep((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        event_type: data.eventType,
        event_address: data.eventAddressId,
        dates: data.dates.reduce((acc, date) => {
          const dateStr = date.toISOString().split("T")[0];
          return { ...acc, [dateStr]: dateStr };
        }, {}),
        food_cuisines_preferences: {
          type: data.menuType,
          cuisines: data.cuisines,
        },
        meal_timings: data.mealConfig,
        menu_items_details: {
          items: data.selectedMenu,
        },
        booking_teams: {},
        guests: data.guests,
        client_materials: {
          provided_materials: data.clientMaterials.providedMaterials,
          kitchen_type: data.clientMaterials.kitchenType,
          kitchen_appliances: data.clientMaterials.kitchenAppliances,
          utensils: data.clientMaterials.utensils,
        },
        services_selections: {
          providers: data.serviceProviders,
        },
        other_requirements: {
          additional_services: data.otherRequirements.additionalServices,
          ambience: data.otherRequirements.ambience,
          transportation: data.otherRequirements.transportation,
          special_requests: data.otherRequirements.specialRequests,
          dietary_restrictions: data.otherRequirements.dietaryRestrictions,
          entertainment: data.otherRequirements.entertainment,
        },
      };

      if (existingBooking) {
        await BookingService.updateBooking(existingBooking.id, payload);
        toast.success("Booking updated successfully!");
      } else {
        await BookingService.createBooking(payload);
        toast.success("Booking request submitted successfully!");
        router.push("/dashboard/bookings");
      }

      onClose();
    } catch (error: any) {
      console.error("Booking Error:", error);
      toast.error(
        "Failed to submit booking: " + (error.message || "Unknown error")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load addresses
  useEffect(() => {
    if (step === 8) {
      setLoadingAddresses(true);
      AddressService.getAddresses()
        .then(setAddresses)
        .catch((err) => console.error("Failed to load addresses", err))
        .finally(() => setLoadingAddresses(false));
    }
  }, [step]);

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!data.eventType && data.dates.length > 0;
      case 2:
        return !!data.menuType && data.cuisines.length > 0;
      case 3:
        if (data.isMealConfigSkipped) return true;
        return data.dates.every((d) => {
          const dateKey = d.toISOString().split("T")[0];
          const config = data.mealConfig[dateKey];
          return config && config.meals.length > 0;
        });
      case 4:
        return data.selectedMenu.length > 0;
      case 5:
        return data.guests.adults + data.guests.children > 0;
      case 6:
        return data.serviceProviders.length > 0;
      case 7:
        return !!data.clientMaterials.kitchenType;
      case 8:
        return !!data.eventAddressId && !isSubmitting;
      default:
        return true;
    }
  };

  const totalGuests =
    data.guests.adults + data.guests.children + data.guests.babies;
  const selectedEvent = EVENT_TYPES.find((e) => e.value === data.eventType);

  if (!isOpen) return null;

  return (
    <>
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 z-[120] pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full"
              initial={{
                y: -100,
                x: Math.random() * window.innerWidth,
                opacity: 1,
              }}
              animate={{
                y: window.innerHeight + 100,
                x: Math.random() * window.innerWidth - window.innerWidth / 2,
                rotate: 360,
                opacity: 0,
              }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          ))}
        </div>
      )}

      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] h-screen w-screen"
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/50 to-amber-900/30 backdrop-blur-lg"
          onClick={onClose}
        />

        {/* Floating Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Main Modal */}
      <div className="fixed inset-0 z-[115] h-screen w-screen flex items-center justify-center p-2 md:p-4 lg:p-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full h-full max-w-8xl bg-gray-300 rounded-3xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto border border-white/30 backdrop-blur-sm"
          style={{
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 100px rgba(245, 158, 11, 0.1)",
          }}
        >
          {/* Header Bar */}
          <div className="relative p-2 md:p-2 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-b border-amber-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl shadow-lg"
              >
                <ChefHat className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                  {existingBooking ? "Update Booking" : "Create New Booking"}
                </h1>
                <p className="text-gray-600 text-sm flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  {step === 8
                    ? "Final Step!"
                    : `Step ${step} of ${totalSteps} - ${selectedEvent?.label || "Plan Your Event"
                    }`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 hover:bg-white/50 rounded-xl transition-colors text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </motion.button>
            </div>
          </div>

          {/* Progress Bar */}
          {/* <div className="px-4 md:px-6 py-3 bg-gradient-to-r from-amber-50/50 to-orange-50/50 border-b border-amber-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {[...Array(totalSteps)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-center ${i < totalSteps - 1 ? 'flex-1' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      step > i + 1 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                        : step === i + 1
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg ring-2 ring-amber-200'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step > i + 1 ? <Check className="w-4 h-4" /> : i + 1}
                    </div>
                    {i < totalSteps - 1 && (
                      <div className={`flex-1 h-1 mx-2 rounded-full transition-all duration-300 ${
                        step > i + 1 
                          ? 'bg-gradient-to-r from-green-400 to-emerald-400'
                          : 'bg-gray-200'
                      }`} />
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="text-sm font-semibold text-gray-700 hidden md:block">
                {Math.round((step / totalSteps) * 100)}% Complete
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 px-2">
              {['Event', 'Menu', 'Schedule', 'Dishes', 'Guests', 'Chef', 'Setup', 'Review'].map((label, i) => (
                <span key={i} className={`${step === i + 1 ? 'font-bold text-amber-600' : ''}`}>
                  {label}
                </span>
              ))}
            </div>
          </div> */}

          {/* Main Content */}
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* Sidebar - Progress Steps (Desktop) */}
            <div className=" overflow-y-auto md:flex md:w-1/4 lg:w-1/5 bg-white border-r border-gray-200 p-4 flex-col">
              {/* Steps Section - Simplified */}
              <div className="space-y-2 mb-6">
                {[
                  {
                    id: 1,
                    label: "Event & Date",
                    icon: CalendarIcon,
                    desc: "Choose occasion and dates",
                  },
                  {
                    id: 2,
                    label: "Cuisine & Type",
                    icon: Utensils,
                    desc: "Select food preferences",
                  },
                  {
                    id: 3,
                    label: "Meal Planning",
                    icon: Clock,
                    desc: "Schedule meals",
                  },
                  {
                    id: 4,
                    label: "Menu Selection",
                    icon: Package,
                    desc: "Pick dishes",
                  },
                  {
                    id: 5,
                    label: "Guests",
                    icon: Users,
                    desc: "Number of attendees",
                  },
                  {
                    id: 6,
                    label: "Service Provider",
                    icon: ChefHat,
                    desc: "Choose chef/venue",
                  },
                  {
                    id: 7,
                    label: "Materials & Regs",
                    icon: FileText,
                    desc: "Setup requirements",
                  },
                  {
                    id: 8,
                    label: "Review",
                    icon: CheckCircle2,
                    desc: "Finalize booking",
                  },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStep(s.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${step === s.id
                        ? "bg-amber-50 border border-amber-200"
                        : completedSteps.includes(s.id)
                          ? "bg-green-50 border border-green-200"
                          : "border border-gray-100 hover:bg-gray-50"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-md flex items-center justify-center ${step === s.id
                            ? "bg-amber-500 text-white"
                            : completedSteps.includes(s.id)
                              ? "bg-green-500 text-white"
                              : "bg-gray-100 text-gray-500"
                          }`}
                      >
                        {completedSteps.includes(s.id) ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <s.icon className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-medium text-sm ${step === s.id ? "text-amber-700" : "text-gray-800"
                            }`}
                        >
                          {s.label}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Quick Stats - Compact */}
              <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-2 bg-blue-50 rounded-lg">
                    <p className="text-xs text-gray-600">Guests</p>
                    <p className="font-bold text-gray-800 text-lg">
                      {totalGuests}
                    </p>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded-lg">
                    <p className="text-xs text-gray-600">Dates</p>
                    <p className="font-bold text-gray-800 text-lg">
                      {data.dates.length}
                    </p>
                  </div>
                  <div className="text-center p-2 bg-purple-50 rounded-lg">
                    <p className="text-xs text-gray-600">Menu Items</p>
                    <p className="font-bold text-gray-800 text-lg">
                      {data.selectedMenu.length}
                    </p>
                  </div>
                  {/* <div className="text-center p-2 bg-amber-50 rounded-lg">
        <p className="text-xs text-gray-600">Step</p>
        <p className="font-bold text-gray-800 text-lg">{step}/8</p>
      </div> */}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Step Content */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-gradient-to-b from-white via-amber-50/20 to-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    {/* Step 1: Event & Date */}
                    {step === 1 && (
                      <div className="max-w-6xl mx-auto">
                        <div className="mb-8 text-center">
                          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                            Let&apos;s Plan Your Special Day! 🎉
                          </h2>
                          <p className="text-gray-600">
                            Choose your event type and select dates for a
                            memorable culinary experience
                          </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                          {/* Event Types */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <PartyPopper className="w-5 h-5 text-amber-500" />
                                What&apos;s the Occasion?
                              </h3>
                              <span className="text-sm text-gray-500">
                                {data.eventType ? "Selected ✓" : "Pick one"}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                              {EVENT_TYPES.map((type, index) => (
                                <motion.button
                                  key={type.value}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.05 }}
                                  whileHover={{ scale: 1.05, y: -5 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() =>
                                    !isRestricted &&
                                    updateData({ eventType: type.value })
                                  }
                                  disabled={isRestricted}
                                  className={`relative group aspect-square p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all duration-300 overflow-hidden ${data.eventType === type.value
                                      ? `${type.color.split(" ")[0]} ${type.color.split(" ")[1]
                                      } border-orange-500 text-white shadow-2xl`
                                      : "border-gray-200 hover:border-amber-300 bg-white hover:bg-amber-50 text-gray-700"
                                    } ${isRestricted
                                      ? "opacity-70 cursor-not-allowed"
                                      : "cursor-pointer"
                                    }`}
                                >
                                  {/* Background Gradient */}
                                  <div
                                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${type.color.includes("from")
                                        ? type.color
                                        : "from-amber-500 to-orange-500"
                                      }`}
                                  />

                                  <span className="text-3xl md:text-4xl relative z-10">
                                    {type.icon}
                                  </span>
                                  <span className="font-semibold text-sm md:text-base relative z-10 text-center leading-tight">
                                    {type.label}
                                  </span>
                                  {data.eventType === type.value && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg"
                                    >
                                      <Check className="w-3 h-3 text-green-600" />
                                    </motion.div>
                                  )}
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>

                          {/* Date Selection */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-4"
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <CalendarIcon className="w-5 h-5 text-amber-500" />
                                Select Your Dates
                              </h3>
                              {data.dates.length > 0 && (
                                <span className="text-sm font-semibold text-amber-600">
                                  {data.dates.length} date
                                  {data.dates.length > 1 ? "s" : ""} selected
                                </span>
                              )}
                            </div>

                            <div
                              className={`bg-white w-1/2 border-2 ${data.dates.length > 0
                                  ? "border-amber-200"
                                  : "border-gray-200"
                                } rounded-2xl p-4 shadow-lg`}
                            >
                              <DatePicker
                                selected={data.dates[selectedDateIndex] || null}
                                onChange={(date: Date | null) => {
                                  if (!date) return;
                                  const exists = data.dates.find(
                                    (d) =>
                                      d.toDateString() === date.toDateString()
                                  );
                                  let newDates;
                                  if (exists) {
                                    newDates = data.dates.filter(
                                      (d) =>
                                        d.toDateString() !== date.toDateString()
                                    );
                                  } else {
                                    newDates = [...data.dates, date].sort(
                                      (a, b) => a.getTime() - b.getTime()
                                    );
                                  }
                                  updateData({ dates: newDates });
                                }}
                                highlightDates={data.dates}
                                inline
                                calendarClassName="!border-none !shadow-none "
                                dayClassName={(date) => {
                                  const isSelected = data.dates.find(
                                    (d) =>
                                      d.toDateString() === date.toDateString()
                                  );
                                  const isToday =
                                    date.toDateString() ===
                                    new Date().toDateString();
                                  return `!rounded-xl !transition-all ${isSelected
                                      ? "!bg-gradient-to-r from-amber-500 to-orange-500 !text-white !font-bold"
                                      : isToday
                                        ? "!bg-amber-100 !text-amber-700"
                                        : "hover:!bg-amber-50"
                                    }`;
                                }}
                              />

                              {data.dates.length > 0 && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  className="mt-4 pt-4 border-t border-gray-100"
                                >
                                  <p className="text-sm font-semibold text-gray-700 mb-2">
                                    Selected Dates:
                                  </p>
                                  <div className="flex flex-row overflow-x-auto gap-2">
                                    {data.dates.map((d, i) => (
                                      <motion.div
                                        key={i}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="relative group"
                                      >
                                        <div className="px-3 py-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl flex items-center gap-2">
                                          <CalendarIcon className="w-4 h-4 text-amber-600" />
                                          <span className="text-sm whitespace-nowrap font-semibold text-gray-800">
                                            {d.toLocaleDateString("en-US", {
                                              weekday: "short",
                                              month: "short",
                                              day: "numeric",
                                            })}
                                          </span>
                                          <motion.button
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              updateData({
                                                dates: data.dates.filter(
                                                  (_, idx) => idx !== i
                                                ),
                                              });
                                            }}
                                            className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                                          >
                                            <X className="w-3 h-3" />
                                          </motion.button>
                                        </div>
                                      </motion.div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </div>

                            {/* Quick Tips */}
                            {/* <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                              <div className="flex items-start gap-3">
                                <Sparkles className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="font-semibold text-blue-800 text-sm">Pro Tip</p>
                                  <p className="text-blue-600 text-sm">
                                    Select multiple dates for multi-day events like weddings. Most chefs offer discounts for longer bookings!
                                  </p>
                                </div>
                              </div>
                            </div> */}
                          </motion.div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Menu Type & Cuisine */}
                    {step === 2 && (
                      <div className="max-w-4xl mx-auto">
                        <div className="mb-8 text-center">
                          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                            Let&apos;s Talk Food! 🍽️
                          </h2>
                          <p className="text-gray-600">
                            Choose your menu type and favorite cuisines
                          </p>
                        </div>

                        <div className="space-y-8">
                          {/* Menu Type */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                          >
                            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                              <Utensils className="w-5 h-5 text-amber-500" />
                              Preferred Food Type
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              {[
                                {
                                  value: "veg",
                                  label: "Vegetarian",
                                  icon: "🥬",
                                  color: "from-green-500 to-emerald-500",
                                },
                                {
                                  value: "non_veg",
                                  label: "Non-Vegetarian",
                                  icon: "🍗",
                                  color: "from-red-500 to-orange-500",
                                },
                                {
                                  value: "both",
                                  label: "Mixed",
                                  icon: "🥘",
                                  color: "from-purple-500 to-pink-500",
                                },
                              ].map((type) => (
                                <motion.button
                                  key={type.value}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() =>
                                    updateData({ menuType: type.value as any })
                                  }
                                  className={`relative group p-6 rounded-2xl border-2 transition-all duration-300 overflow-hidden ${data.menuType === type.value
                                      ? `${type.color} border-orange-500 text-white shadow-xl`
                                      : "border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                                    }`}
                                >
                                  <div className="flex flex-col items-center gap-3">
                                    <span className="text-4xl">
                                      {type.icon}
                                    </span>
                                    <span className="font-bold text-lg">
                                      {type.label}
                                    </span>
                                    {data.menuType === type.value && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg"
                                      >
                                        <Check className="w-3 h-3 text-green-600" />
                                      </motion.div>
                                    )}
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>

                          {/* Cuisine Selection */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-4"
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <Globe className="w-5 h-5 text-amber-500" />
                                Select Cuisines
                              </h3>
                              {data.cuisines.length > 0 && (
                                <span className="text-sm font-semibold text-amber-600">
                                  {data.cuisines.length} selected
                                </span>
                              )}
                            </div>

                            <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-lg">
                              <MultiSelect
                                options={CUISINES}
                                value={data.cuisines}
                                onChange={(vals) =>
                                  updateData({ cuisines: vals })
                                }
                                placeholder="Search and select cuisines..."
                              // className="min-h-[200px]"
                              />
                            </div>

                            {/* Popular Combinations */}
                            {/* <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100">
                              <p className="font-semibold text-amber-800 text-sm mb-2">Popular Combinations:</p>
                              <div className="flex flex-wrap gap-2">
                                {['North Indian + Chinese', 'Italian + Continental', 'South Indian + Chinese', 'Mexican + American'].map((combo) => (
                                  <button
                                    key={combo}
                                    onClick={() => {
                                      const cuisines = combo.split(' + ').map(c => 
                                        CUISINES.find(cuisine => cuisine.label === c)?.value
                                      ).filter(Boolean) as string[];
                                      updateData({ cuisines });
                                    }}
                                    className="px-3 py-1.5 bg-white border border-amber-200 text-amber-700 rounded-lg text-sm hover:bg-amber-50 transition-colors"
                                  >
                                    {combo}
                                  </button>
                                ))}
                              </div>
                            </div> */}
                          </motion.div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Meal Planning */}
                    {step === 3 && (
                      <div className="max-w-6xl mx-auto">
                        <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-2">
                          <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">
                              Plan Your Meal Schedule
                            </h2>
                            <p className="text-gray-600">
                              Select meals for each day of your event
                            </p>
                          </div>

                          {/* Skip Option */}
                          <div className="bg-blue-50 w-full rounded-xl p-4 border border-blue-200 mb-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-blue-800">
                                  Plan meals later?
                                </p>
                                <p className="text-blue-600 text-sm">
                                  Skip and discuss with chef
                                </p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={data.isMealConfigSkipped}
                                  onChange={(e) =>
                                    updateData({
                                      isMealConfigSkipped: e.target.checked,
                                    })
                                  }
                                  className="sr-only peer"
                                />
                                <div className="relative w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-colors">
                                  <div
                                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${data.isMealConfigSkipped
                                        ? "left-7"
                                        : "left-1"
                                      }`}
                                  ></div>
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>

                        {!data.isMealConfigSkipped && data.dates.length > 0 && (
                          <div className=" grid grid-cols-1  lg:grid-cols-2 gap-6">
                            {data.dates.map((date, index) => {
                              const dateKey = date.toISOString().split("T")[0];
                              const config = data.mealConfig[dateKey] || {
                                meals: [],
                                time: "",
                              };

                              return (
                                <div
                                  key={index}
                                  className="bg-white border border-gray-200 rounded-xl p-5"
                                >
                                  {/* Date Header */}
                                  <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                      <CalendarIcon className="w-5 h-5 text-gray-500" />
                                      <div className=" flex flex-wrap xl:flex-row items-center justify-between space-x-4">
                                        <h3 className="font-bold text-gray-800">
                                          {date.toLocaleDateString("en-US", {
                                            weekday: "short",
                                            month: "short",
                                            day: "numeric",
                                          })}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                          Day {index + 1}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Meal Selection */}
                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {MEAL_TYPES.map((meal) => {
                                      const isSelected = config.meals.includes(
                                        meal.value
                                      );

                                      return (
                                        <label
                                          key={meal.value}
                                          className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${isSelected
                                              ? "border-amber-500 bg-amber-50"
                                              : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                          <div className="flex items-center justify-center w-8 h-8 mb-2">
                                            <span className="text-lg">
                                              {meal.icon}
                                            </span>
                                          </div>
                                          <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => {
                                              const dateKey = date
                                                .toISOString()
                                                .split("T")[0];
                                              const config = data.mealConfig[
                                                dateKey
                                              ] || { meals: [], time: "" };
                                              const newMeals = isSelected
                                                ? config.meals.filter(
                                                  (m) => m !== meal.value
                                                )
                                                : [...config.meals, meal.value];
                                              updateData({
                                                mealConfig: {
                                                  ...data.mealConfig,
                                                  [dateKey]: {
                                                    ...config,
                                                    meals: newMeals,
                                                  },
                                                },
                                              });
                                            }}
                                            className="hidden"
                                          />
                                          <span className="font-medium whitespace-nowrap text-sm text-gray-800">
                                            {meal.label}
                                          </span>
                                          <span className="text-xs  truncate whitespace-nowrap text-gray-500">
                                            {meal.time}
                                          </span>
                                        </label>
                                      );
                                    })}
                                  </div>

                                  {/* Selected Meals Summary */}
                                  {config.meals.length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                      <p className="text-sm font-medium text-gray-700 mb-2">
                                        Selected for this day:
                                      </p>
                                      <div className="flex flex-wrap gap-2">
                                        {config.meals.map((mealValue) => {
                                          const meal = MEAL_TYPES.find(
                                            (m) => m.value === mealValue
                                          );
                                          return meal ? (
                                            <span
                                              key={meal.value}
                                              className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm"
                                            >
                                              {meal.icon} {meal.label}
                                            </span>
                                          ) : null;
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Empty State */}
                        {!data.isMealConfigSkipped &&
                          data.dates.length === 0 && (
                            <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                              <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-600 mb-2">
                                No dates selected yet
                              </p>
                              <p className="text-sm text-gray-500">
                                Go back to step 1 to select event dates
                              </p>
                            </div>
                          )}
                      </div>
                    )}

                    {/* Step 4: Menu Selection */}
                    {step === 4 && (
                      <div className="max-w-6xl mx-auto">
                        <div className="mb-8 text-center">
                          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                            Curate Your Menu 🍴
                          </h2>
                          <p className="text-gray-600">
                            Select dishes from your chosen cuisines
                          </p>
                        </div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-6"
                        >
                          {/* Selection Stats */}
                          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                              <div>
                                <p className="font-semibold text-amber-800">
                                  Your Selection
                                </p>
                                <p className="text-amber-600 text-sm">
                                  {data.cuisines.length} cuisines selected •{" "}
                                  {data.selectedMenu.length} dishes chosen
                                </p>
                              </div>
                              {data.selectedMenu.length > 0 && (
                                <button
                                  onClick={() =>
                                    updateData({ selectedMenu: [] })
                                  }
                                  className="px-3 py-1.5 bg-white border border-amber-200 text-amber-700 rounded-lg text-sm hover:bg-amber-50 transition-colors"
                                >
                                  Clear Selection
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Menu Selection */}
                          <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-lg">
                            <MultiSelect
                              options={data.cuisines.flatMap((cuisineKey) => {
                                const cuisine = CUISINES.find(
                                  (c) => c.value === cuisineKey
                                );
                                return Array.from({ length: 8 }, (_, i) => ({
                                  value: `${cuisineKey}_dish_${i}`,
                                  label: `${cuisine?.label} Dish ${i + 1}`,
                                  description: `Delicious ${cuisine?.label.toLowerCase()} specialty`,
                                  icon: cuisine?.icon,
                                }));
                              })}
                              value={data.selectedMenu}
                              onChange={(vals) =>
                                updateData({ selectedMenu: vals })
                              }
                              placeholder="Search and select dishes..."
                            //   className="min-h-[300px]"
                            />
                          </div>

                          {/* Popular Dishes */}
                          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {[
                              { name: 'Butter Chicken', cuisine: 'North Indian', icon: '🍛', popular: true },
                              { name: 'Paneer Tikka', cuisine: 'North Indian', icon: '🧀', popular: true },
                              { name: 'Hyderabadi Biryani', cuisine: 'South Indian', icon: '🍚', popular: true },
                              { name: 'Margherita Pizza', cuisine: 'Italian', icon: '🍕', popular: true },
                            ].map((dish) => (
                              <button
                                key={dish.name}
                                onClick={() => {
                                  const dishValue = `${dish.cuisine.toLowerCase().replace(' ', '_')}_${dish.name.toLowerCase().replace(' ', '_')}`;
                                  if (!data.selectedMenu.includes(dishValue)) {
                                    updateData({ selectedMenu: [...data.selectedMenu, dishValue] });
                                  }
                                }}
                                className="p-3 bg-white border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition-colors text-left"
                              >
                                <div className="flex items-start gap-3">
                                  <span className="text-2xl">{dish.icon}</span>
                                  <div>
                                    <p className="font-semibold text-gray-800">{dish.name}</p>
                                    <p className="text-xs text-gray-500">{dish.cuisine}</p>
                                  </div>
                                  {dish.popular && (
                                    <span className="ml-auto text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
                                      Popular
                                    </span>
                                  )}
                                </div>
                              </button>
                            ))}
                          </div> */}
                        </motion.div>
                      </div>
                    )}

                    {/* Step 5: Guest Count */}
                    {step === 5 && (
                      <div className="max-w-6xl mx-auto">
                        <div className="mb-8">
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Guest Count 👥
                          </h2>
                          <p className="text-gray-600">
                            Specify number of guests for accurate meal planning
                          </p>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-6">
                          {/* Guest Inputs - Left Side */}
                          <div className="lg:w-2/3 space-y-4">
                            {[
                              {
                                key: "adults",
                                label: "Adults (13+ years)",
                                description: "Standard portions",
                                color: "blue",
                              },
                              {
                                key: "children",
                                label: "Children (2-12 years)",
                                description: "Smaller portions",
                                color: "green",
                              },
                              {
                                key: "babies",
                                label: "Babies (Under 2)",
                                description: "No meal required",
                                color: "amber",
                              },
                            ].map((item) => (
                              <div
                                key={item.key}
                                className="bg-white border border-gray-200 rounded-xl p-5"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800 mb-1">
                                      {item.label}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                      {item.description}
                                    </p>
                                  </div>

                                  <div className="flex items-center space-x-4">
                                    <button
                                      onClick={() =>
                                        updateData({
                                          guests: {
                                            ...data.guests,
                                            [item.key]: Math.max(
                                              0,
                                              data.guests[
                                              item.key as keyof typeof data.guests
                                              ] - 1
                                            ),
                                          },
                                        })
                                      }
                                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700"
                                    >
                                      <Minus className="w-4 h-4" />
                                    </button>

                                    <div className="w-16 text-center">
                                      <input
                                        type="number"
                                        min="0"
                                        value={
                                          data.guests[
                                          item.key as keyof typeof data.guests
                                          ]
                                        }
                                        onChange={(e) =>
                                          updateData({
                                            guests: {
                                              ...data.guests,
                                              [item.key]: Math.max(
                                                0,
                                                parseInt(e.target.value) || 0
                                              ),
                                            },
                                          })
                                        }
                                        className="w-full text-center font-semibold text-gray-800 text-lg bg-transparent border-none focus:outline-none"
                                      />
                                    </div>

                                    <button
                                      onClick={() =>
                                        updateData({
                                          guests: {
                                            ...data.guests,
                                            [item.key]:
                                              data.guests[
                                              item.key as keyof typeof data.guests
                                              ] + 1,
                                          },
                                        })
                                      }
                                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-900 text-white"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Guest Summary - Right Side */}
                          <div className="lg:w-1/3">
                            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-6">
                              <h3 className="font-bold text-gray-800 text-lg mb-6">
                                Guest Summary
                              </h3>

                              {/* Total Guests */}
                              <div className="text-center mb-6 p-4 bg-gray-50 rounded-lg">
                                <p className="text-4xl font-bold text-gray-900 mb-1">
                                  {totalGuests}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Total Guests
                                </p>
                              </div>

                              {/* Breakdown */}
                              <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                  <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                    <span className="text-gray-700">
                                      Adults
                                    </span>
                                  </div>
                                  <span className="font-semibold text-gray-800">
                                    {data.guests.adults}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                  <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <span className="text-gray-700">
                                      Children
                                    </span>
                                  </div>
                                  <span className="font-semibold text-gray-800">
                                    {data.guests.children}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                  <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                    <span className="text-gray-700">
                                      Babies
                                    </span>
                                  </div>
                                  <span className="font-semibold text-gray-800">
                                    {data.guests.babies}
                                  </span>
                                </div>
                              </div>

                              {/* Tips */}
                              {/* <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <p className="font-medium text-blue-800 text-sm mb-2">
                                  Recommendations
                                </p>
                                <ul className="text-xs text-blue-700 space-y-1">
                                  <li>
                                    • Add 10% buffer for unexpected guests
                                  </li>
                                  <li>• Children: 60-70% of adult portions</li>
                                  <li>• Consider dietary restrictions</li>
                                </ul>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 6: Service Provider */}
                    {step === 6 && (
                      <div className="max-w-6xl mx-auto">
                        <div className="mb-6">
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Choose Service Providerggg
                          </h2>
                          <p className="text-gray-600">
                            Select from verified chefs and catering services
                          </p>
                        </div>

                        {/* Search Filter */}
                        <div className="mb-6">
                          <div className="bg-white border border-gray-200 rounded-xl p-3">
                            <MultiSelect
                              options={SERVICE_PROVIDERS.map((p) => ({
                                value: p.value,
                                label: p.label,
                                description: p.title,
                                image: p.image,
                              }))}
                              value={data.serviceProviders}
                              onChange={(vals) => updateData({ serviceProviders: vals })}
                              placeholder="Search chefs or catering services..."
                              disabled={isRestricted}
                            />
                          </div>
                        </div>

                        {/* Selected Providers Summary */}
                        {data.serviceProviders.length > 0 && (
                          <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="font-semibold text-gray-800">
                                Selected ({data.serviceProviders.length})
                              </h3>
                              <span className="text-sm text-gray-500">
                                {data.serviceProviders.length} of {SERVICE_PROVIDERS.length} selected
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                              {SERVICE_PROVIDERS.filter((p) =>
                                data.serviceProviders.includes(p.value)
                              ).map((provider) => (
                                <div key={provider.value} className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                  <div className="flex items-start gap-3">
                                    <img
                                      src={provider.image}
                                      alt={provider.label}
                                      className="w-12 h-12 rounded-lg object-cover"
                                    />
                                    <div className="flex-1">
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <h4 className="font-semibold text-gray-900">
                                            {provider.label}
                                          </h4>
                                          <p className="text-sm text-gray-600">{provider.title}</p>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full ${provider.badge === "Top Rated" ? "bg-amber-100 text-amber-800" :
                                            provider.badge === "Popular" ? "bg-pink-100 text-pink-800" :
                                              provider.badge === "Budget Friendly" ? "bg-green-100 text-green-800" :
                                                "bg-purple-100 text-purple-800"
                                          }`}>
                                          {provider.badge}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-1">
                                          <Star className="w-4 h-4 text-amber-500 fill-current" />
                                          <span className="font-medium text-gray-900">
                                            {provider.rating}
                                          </span>
                                          <span className="text-xs text-gray-500 ml-1">
                                            ({provider.reviews})
                                          </span>
                                        </div>
                                        <span className="font-semibold text-gray-900">
                                          {provider.price}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Available Providers */}
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-4">
                            Available Providers
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {SERVICE_PROVIDERS.filter(
                              (p) => !data.serviceProviders.includes(p.value)
                            ).map((provider) => (
                              <button
                                key={provider.value}
                                onClick={() => {
                                  if (!isRestricted) {
                                    updateData({
                                      serviceProviders: [
                                        ...data.serviceProviders,
                                        provider.value,
                                      ],
                                    });
                                  }
                                }}
                                className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-gray-300 hover:shadow-sm transition-all group"
                                disabled={isRestricted}
                              >
                                <div className="space-y-3">
                                  {/* Provider Header */}
                                  <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                      <img
                                        src={provider.image}
                                        alt={provider.label}
                                        className="w-10 h-10 rounded-lg object-cover"
                                      />
                                      <div>
                                        <h4 className="font-semibold text-gray-900">
                                          {provider.label}
                                        </h4>
                                        <p className="text-sm text-gray-500">{provider.title}</p>
                                      </div>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900">
                                      {provider.price}
                                    </span>
                                  </div>

                                  {/* Rating and Badge */}
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                      <Star className="w-4 h-4 text-amber-500 fill-current" />
                                      <span className="font-medium text-gray-900">
                                        {provider.rating}
                                      </span>
                                      <span className="text-sm text-gray-500 ml-1">
                                        ({provider.reviews})
                                      </span>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded ${provider.badge === "Top Rated" ? "bg-amber-100 text-amber-800" :
                                        provider.badge === "Popular" ? "bg-pink-100 text-pink-800" :
                                          "bg-gray-100 text-gray-800"
                                      }`}>
                                      {provider.badge}
                                    </span>
                                  </div>

                                  {/* Specialties */}
                                  <div className="flex flex-wrap gap-2">
                                    {provider.specialties.slice(0, 3).map((spec, i) => (
                                      <span
                                        key={i}
                                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                                      >
                                        {spec}
                                      </span>
                                    ))}
                                  </div>

                                  {/* Verification */}
                                  {provider.verified && (
                                    <div className="flex items-center gap-2 text-sm text-green-600">
                                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                      Verified chef
                                    </div>
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Selection Status */}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-600">
                                {data.serviceProviders.length} provider(s) selected
                              </p>
                            </div>
                            <button
                              onClick={() => updateData({ serviceProviders: [] })}
                              className="text-sm text-gray-500 hover:text-gray-700"
                              disabled={data.serviceProviders.length === 0 || isRestricted}
                            >
                              Clear selection
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Step 7: Setup & Requirements */}
                    {step === 7 && (
                      <div className="max-w-6xl mx-auto">
                        <div className="mb-8 text-center">
                          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                            Setup & Requirements 🛠️
                          </h2>
                          <p className="text-gray-600">
                            Tell us about your venue and additional needs
                          </p>
                        </div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-8"
                        >
                          {/* Kitchen Setup */}
                          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                              <Home className="w-5 h-5 text-amber-500" />
                              Kitchen Setup
                            </h3>

                            <div className="grid md:grid-cols-2 gap-6">
                              {/* Kitchen Type */}
                              <div className="space-y-4">
                                <label className="block text-sm font-semibold text-gray-700">
                                  Kitchen Arrangement
                                </label>
                                <div className="space-y-3">
                                  {[
                                    {
                                      value: "own_kitchen",
                                      label: "Chef Provides Kitchen",
                                      description: "Chef brings portable setup",
                                      icon: Truck,
                                      color: "blue",
                                    },
                                    {
                                      value: "provided_kitchen",
                                      label: "I Provide Kitchen",
                                      description: "Kitchen facility available",
                                      icon: Home,
                                      color: "green",
                                    },
                                  ].map((option) => (
                                    <label
                                      key={option.value}
                                      className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${data.clientMaterials.kitchenType ===
                                          option.value
                                          ? `border-${option.color}-500 bg-gradient-to-r from-${option.color}-50 to-${option.color}-100 ring-2 ring-${option.color}-200`
                                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                        }`}
                                    >
                                      <div className="flex items-center gap-3">
                                        <div
                                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${data.clientMaterials.kitchenType ===
                                              option.value
                                              ? `border-${option.color}-500 bg-${option.color}-500`
                                              : "border-gray-300"
                                            }`}
                                        >
                                          {data.clientMaterials.kitchenType ===
                                            option.value && (
                                              <Check className="w-3 h-3 text-white" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2">
                                            {/* <option.icon className={`w-5 h-5 text-${option.color}-500`} /> */}
                                            <span className="font-semibold text-gray-800">
                                              {option.label}
                                            </span>
                                          </div>
                                          <p className="text-sm text-gray-600 mt-1">
                                            {option.description}
                                          </p>
                                        </div>
                                      </div>
                                      <input
                                        type="radio"
                                        name="kitchenType"
                                        value={option.value}
                                        checked={
                                          data.clientMaterials.kitchenType ===
                                          option.value
                                        }
                                        onChange={() =>
                                          updateData({
                                            clientMaterials: {
                                              ...data.clientMaterials,
                                              kitchenType: option.value as any,
                                            },
                                          })
                                        }
                                        className="hidden"
                                        disabled={isRestricted}
                                      />
                                    </label>
                                  ))}
                                </div>
                              </div>

                              {/* Kitchen Appliances */}
                              <div className="space-y-4">
                                <label className="block text-sm font-semibold text-gray-700">
                                  Available Appliances
                                  <span className="text-gray-500 text-sm font-normal ml-2">
                                    (
                                    {
                                      data.clientMaterials.kitchenAppliances
                                        .length
                                    }{" "}
                                    selected)
                                  </span>
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                  {KITCHEN_APPLIANCES.map((appliance) => {
                                    const Icon = appliance.icon;
                                    const isSelected =
                                      data.clientMaterials.kitchenAppliances.includes(
                                        appliance.value
                                      );
                                    return (
                                      <label
                                        key={appliance.value}
                                        className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${isSelected
                                            ? "border-green-500 bg-green-50 text-green-700"
                                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                                          }`}
                                      >
                                        <input
                                          type="checkbox"
                                          checked={isSelected}
                                          onChange={(e) => {
                                            const current =
                                              data.clientMaterials
                                                .kitchenAppliances;
                                            const updated = e.target.checked
                                              ? [...current, appliance.value]
                                              : current.filter(
                                                (a) => a !== appliance.value
                                              );
                                            updateData({
                                              clientMaterials: {
                                                ...data.clientMaterials,
                                                kitchenAppliances: updated,
                                              },
                                            });
                                          }}
                                          className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                                          disabled={isRestricted}
                                        />
                                        <Icon className="w-4 h-4" />
                                        <span className="text-sm font-medium">
                                          {appliance.label}
                                        </span>
                                      </label>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Materials & Utensils */}
                          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                              <Package className="w-5 h-5 text-amber-500" />
                              Materials & Utensils
                            </h3>

                            <div className="space-y-6">
                              <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                  Utensils You Can Provide
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                  {UTENSIL_TYPES.map((item) => {
                                    const Icon = item.icon;
                                    const isSelected =
                                      data.clientMaterials.utensils.includes(
                                        item.value
                                      );
                                    return (
                                      <label
                                        key={item.value}
                                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all  ${isSelected
                                            ? "border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50"
                                            : "border-gray-200 hover:border-amber-300 hover:bg-amber-50/50"
                                          }`}
                                      >
                                        <Icon
                                          className={`w-6 h-6 mb-2 ${isSelected
                                              ? "text-amber-600"
                                              : "text-gray-500"
                                            }`}
                                        />
                                        <span className="text-sm font-medium text-center">
                                          {item.label}
                                        </span>
                                        <input
                                          type="checkbox"
                                          checked={isSelected}
                                          onChange={(e) => {
                                            const current =
                                              data.clientMaterials.utensils;
                                            const updated = e.target.checked
                                              ? [...current, item.value]
                                              : current.filter(
                                                (i) => i !== item.value
                                              );
                                            updateData({
                                              clientMaterials: {
                                                ...data.clientMaterials,
                                                utensils: updated,
                                              },
                                            });
                                          }}
                                          className="hidden"
                                          disabled={isRestricted}
                                        />
                                        {isSelected && (
                                          <div className="absolute top-2 right-2 text-amber-500">
                                            <Check className="w-4 h-4" />
                                          </div>
                                        )}
                                      </label>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Additional Services */}
                          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                              <Wine className="w-5 h-5 text-amber-500" />
                              Additional Services
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {ADDITIONAL_SERVICES.map((service) => {
                                const Icon = service.icon;
                                const isSelected =
                                  data.otherRequirements.additionalServices.includes(
                                    service.value
                                  );
                                return (
                                  <label
                                    key={service.value}
                                    className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${isSelected
                                        ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50"
                                        : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50"
                                      }`}
                                  >
                                    <div className="flex items-start justify-between">
                                      <div className="flex items-center gap-3">
                                        <div
                                          className={`p-2 rounded-lg ${isSelected
                                              ? "bg-purple-100 text-purple-600"
                                              : "bg-gray-100 text-gray-500"
                                            }`}
                                        >
                                          <Icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                          <p className="font-semibold text-gray-800">
                                            {service.label}
                                          </p>
                                          <p className="text-sm text-gray-600">
                                            {service.description}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <p className="font-bold text-gray-900">
                                          {service.price}
                                        </p>
                                        <input
                                          type="checkbox"
                                          checked={isSelected}
                                          onChange={(e) => {
                                            const current =
                                              data.otherRequirements
                                                .additionalServices;
                                            const updated = e.target.checked
                                              ? [...current, service.value]
                                              : current.filter(
                                                (s) => s !== service.value
                                              );
                                            updateData({
                                              otherRequirements: {
                                                ...data.otherRequirements,
                                                additionalServices: updated,
                                              },
                                            });
                                          }}
                                          className="hidden"
                                          disabled={isRestricted}
                                        />
                                      </div>
                                    </div>
                                  </label>
                                );
                              })}
                            </div>
                          </div>

                          {/* Special Requests */}
                          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                              <FileText className="w-5 h-5 text-amber-500" />
                              Special Requests & Notes
                            </h3>

                            <textarea
                              value={data.otherRequirements.specialRequests}
                              onChange={(e) =>
                                updateData({
                                  otherRequirements: {
                                    ...data.otherRequirements,
                                    specialRequests: e.target.value,
                                  },
                                })
                              }
                              placeholder="Any specific instructions, dietary restrictions, theme requirements, or special requests..."
                              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm min-h-[120px] resize-none"
                              rows={4}
                            />
                          </div>
                        </motion.div>
                      </div>
                    )}

                    {/* Step 8: Review & Confirm */}
                    {step === 8 && (
                      <div className="max-w-4xl mx-auto">
                        <div className="mb-8 text-center">
                          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                            Review & Confirm ✅
                          </h2>
                          <p className="text-gray-600">
                            Final check before submitting your booking request
                          </p>
                        </div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-6"
                        >
                          {/* Booking Summary */}
                          <div className="bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-6">
                              <h3 className="text-xl font-bold text-gray-800">
                                Booking Summary
                              </h3>
                              <div className="flex items-center gap-2 text-amber-600">
                                <Shield className="w-5 h-5" />
                                <span className="text-sm font-semibold">
                                  Secure Booking
                                </span>
                              </div>
                            </div>

                            <div className="space-y-4">
                              {/* Event Details */}
                              <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-xl border border-gray-100">
                                  <p className="text-sm text-gray-500 mb-1">
                                    Event Type
                                  </p>
                                  <p className="font-bold text-gray-900 capitalize">
                                    {data.eventType.replace("_", " ")}
                                  </p>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-gray-100">
                                  <p className="text-sm text-gray-500 mb-1">
                                    Total Guests
                                  </p>
                                  <p className="font-bold text-gray-900">
                                    {totalGuests} people
                                  </p>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-gray-100">
                                  <p className="text-sm text-gray-500 mb-1">
                                    Dates
                                  </p>
                                  <p className="font-bold text-gray-900">
                                    {data.dates.length} day
                                    {data.dates.length > 1 ? "s" : ""}
                                  </p>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-gray-100">
                                  <p className="text-sm text-gray-500 mb-1">
                                    Food Type
                                  </p>
                                  <p className="font-bold text-gray-900 capitalize">
                                    {data.menuType.replace("_", " ")}
                                  </p>
                                </div>
                              </div>

                              {/* Detailed Sections */}
                              {[
                                {
                                  title: "Cuisines",
                                  items: data.cuisines.map(
                                    (c) =>
                                      CUISINES.find((cui) => cui.value === c)
                                        ?.label
                                  ),
                                },
                                {
                                  title: "Selected Dishes",
                                  items: data.selectedMenu
                                    .slice(0, 5)
                                    .map((_, i) => `Dish ${i + 1}`),
                                },
                                {
                                  title: "Service Providers",
                                  items: data.serviceProviders.map(
                                    (p) =>
                                      SERVICE_PROVIDERS.find(
                                        (sp) => sp.value === p
                                      )?.label
                                  ),
                                },
                              ].map((section, idx) => (
                                <div
                                  key={idx}
                                  className="bg-white p-4 rounded-xl border border-gray-100"
                                >
                                  <p className="text-sm text-gray-500 mb-2">
                                    {section.title}
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {section.items
                                      .filter(Boolean)
                                      .map((item, i) => (
                                        <span
                                          key={i}
                                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
                                        >
                                          {item}
                                        </span>
                                      ))}
                                  </div>
                                </div>
                              ))}

                              {/* Requirements Summary */}
                              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100">
                                <p className="font-semibold text-amber-800 mb-2">
                                  Requirements Summary
                                </p>
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-gray-600">
                                      Kitchen:
                                    </span>
                                    <span className="font-medium text-gray-800 ml-2">
                                      {data.clientMaterials.kitchenType ===
                                        "own_kitchen"
                                        ? "Chef Provides"
                                        : "Client Provides"}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">
                                      Additional Services:
                                    </span>
                                    <span className="font-medium text-gray-800 ml-2">
                                      {data.otherRequirements.additionalServices
                                        .length || "None"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Address Selection */}
                          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                              <MapPin className="w-5 h-5 text-amber-500" />
                              Select Event Address
                            </h3>

                            {loadingAddresses ? (
                              <div className="text-center py-8">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
                                <p className="text-gray-500 mt-2">
                                  Loading addresses...
                                </p>
                              </div>
                            ) : addresses.length === 0 ? (
                              <div className="text-center py-8">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-500 mb-3">
                                  <AlertCircle className="w-6 h-6" />
                                </div>
                                <p className="text-gray-700 font-medium">
                                  No addresses found
                                </p>
                                <p className="text-gray-500 text-sm mt-1">
                                  Please add an address in your profile first
                                </p>
                                <button
                                  onClick={() =>
                                    router.push("/dashboard/profile")
                                  }
                                  className="mt-4 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                                >
                                  Add Address
                                </button>
                              </div>
                            ) : (
                              <div className="grid gap-3">
                                {addresses.map((addr) => (
                                  <motion.div
                                    key={addr.id}
                                    whileHover={{ scale: 1.01 }}
                                    onClick={() =>
                                      updateData({ eventAddressId: addr.id })
                                    }
                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${data.eventAddressId === addr.id
                                        ? "border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 ring-2 ring-amber-200"
                                        : "border-gray-200 hover:border-amber-300 hover:bg-amber-50/50"
                                      }`}
                                  >
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="font-bold text-gray-900">
                                            {addr.label}
                                          </span>
                                          {data.eventAddressId === addr.id && (
                                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                                              Selected
                                            </span>
                                          )}
                                        </div>
                                        <p className="text-sm text-gray-600">
                                          {addr.address_line1},{" "}
                                          {addr.address_line2
                                            ? `${addr.address_line2}, `
                                            : ""}
                                          {addr.city}, {addr.state} -{" "}
                                          {addr.zip_code}
                                        </p>
                                      </div>
                                      {data.eventAddressId === addr.id && (
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                                          <Check className="w-3 h-3 text-white" />
                                        </div>
                                      )}
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Final Confirmation */}
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex items-start gap-3">
                                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                                  <CheckCircle2 className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <p className="font-bold text-green-800 text-lg">
                                    Ready to Book!
                                  </p>
                                  <p className="text-green-600">
                                    Review all details and confirm your booking
                                    request
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-600">
                                  Estimated Response Time
                                </p>
                                <p className="text-xl font-bold text-gray-900">
                                  Within 24 Hours
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Mobile Progress Steps */}
              <div className="md:hidden p-4 border-t border-gray-100 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">
                    Step {step} of {totalSteps}
                  </span>
                  <span className="text-sm text-gray-500">
                    {Math.round((step / totalSteps) * 100)}% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(step / totalSteps) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full"
                  />
                </div>
              </div>

              {/* Footer Navigation */}
              <div className="p-4 md:p-2 border-t border-gray-100 bg-white/95 backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4" />
                    <span>
                      Secure booking • 24/7 support • Free cancellation
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleBack}
                      disabled={step === 1}
                      className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${step === 1
                          ? "opacity-0 pointer-events-none"
                          : "text-gray-600 hover:bg-gray-100 border border-gray-200"
                        }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: canProceed() ? 1.05 : 1 }}
                      whileTap={{ scale: canProceed() ? 0.95 : 1 }}
                      onClick={step === totalSteps ? handleSubmit : handleNext}
                      disabled={!canProceed()}
                      className={`px-8 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2 ${step === totalSteps
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                          : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                        } ${!canProceed() ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Processing...
                        </>
                      ) : step === totalSteps ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          Confirm Booking
                        </>
                      ) : (
                        <>
                          Next Step
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

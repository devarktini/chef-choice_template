'use client';
import { useEffect, useState } from "react";
import { MapPin, Navigation, Calendar, ArrowLeft, ArrowRight, Search } from "lucide-react";
import Container from "@/components/Container";
import FormNavigate from "@/components/FormNavigate";
import { useStore } from "../../useStore";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

function Location() {
  const { addUserInputData, userInputData } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState({
    lat: null,
    long: null,
    addr: "",
  });

  const locationSelectData = {
    title: "Where is the event?",
    text: "Please ensure the accurate location is shared for the perfect chef match!",
  };

  useEffect(() => {
    const savedLocation = userInputData.find((item: any) => item.id === "location");
    if (savedLocation) {
      setUserLocation((prev) => ({ ...prev, addr: savedLocation.data }));
    }
  }, [userInputData]);

  function getUserLocation(e: React.ChangeEvent<HTMLInputElement>) {
    setUserLocation((prev) => ({
      ...prev,
      addr: e.target.value,
    }));
  }

  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${userLocation.lat}&lon=${userLocation.long}`;

  useEffect(() => {
    async function fetchData() {
      if (userLocation.lat !== null && userLocation.long !== null) {
        try {
          setIsLoading(true);
          const response = await fetch(url);
          const data = await response.json();
          setUserLocation((prev) => {
            const updated = { ...prev, addr: data.display_name || prev.addr };
            addUserInputData({ id: "location", data: updated.addr });
            return updated;
          });
        } catch (err) {
          console.error("Error fetching location:", err);
          toast.error("Failed to fetch location details");
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchData();
  }, [userLocation.lat, userLocation.long, url, addUserInputData]);

  function getUserCurrentLocation() {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation((prev: any) => ({
          ...prev,
          lat: position.coords.latitude,
          long: position.coords.longitude,
        }));
        toast.success("Location detected successfully!");
      },
      (error) => {
        console.error("Error getting location:", error);
        toast.error("Failed to get your current location");
        setIsLoading(false);
      }
    );
  }

  function onNextBtnClick() {
    if (userLocation.addr.length > 3) {
      addUserInputData({
        id: "location",
        data: userLocation.addr,
      });
      return true;
    } else {
      if (userLocation.addr.length >= 1 && userLocation.addr.length < 3) {
        toast.error("Please enter a valid location address (min. 4 characters)");
      } else {
        toast.error("Please enter or detect your location");
      }
      return false;
    }
  }

  return (
    <Container>
      {/* Header Section */}
      <div className="text-center mt-20 mb-12">
        <div className="w-20 h-20 mx-auto mb-6 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
          <MapPin className="w-10 h-10 text-gray-800" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-slide-down">
          {locationSelectData.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          {locationSelectData.text}
        </p>
      </div>

      {/* Location Input Section */}
      <div className="max-w-2xl mx-auto mb-8 animate-fade-in">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800/60 w-5 h-5" />
          <input
            onChange={getUserLocation}
            className="w-full pl-12 pr-4 py-4 text-gray-800 placeholder:text-slate-600 bg-white/10 backdrop-blur-sm border-2 border-gray-300 rounded-2xl placeholder-white/60 focus:outline-none focus:border-orange-500 focus:bg-white/15 transition-all duration-300 text-lg"
            type="text"
            placeholder="Enter event location or address..."
            value={userLocation.addr}
          />
        </div>

        {userLocation.addr && (
          <div className="mt-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 animate-fade-in">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-800 font-medium">Selected Location:</p>
                <p className="text-gray-700 text-sm mt-1">{userLocation.addr}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Current Location Button */}
      <div className="flex justify-center mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <button
          onClick={getUserCurrentLocation}
          disabled={isLoading}
          className={`
            group relative overflow-hidden px-8 py-4 rounded-2xl font-semibold
            transition-all duration-300 transform hover:scale-105
            ${isLoading
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 cursor-pointer'
            }
          `}
        >
          {isLoading ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span className="text-gray-800">Detecting Location...</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Navigation className="w-5 h-5 text-gray-800 group-hover:animate-pulse" />
              <span className="text-white">Use My Current Location</span>
            </div>
          )}

          {/* Shine effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 md:gap-6 mt-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <FormNavigate
          bgColor="bg-gradient-to-r from-red-500 to-red-600"
          hoverColor="bg-gradient-to-r from-gray-300 to-gray-500 text-white px-6 py-2.5 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
          navigateTo="/occasion"
          handleBtnClick={() => true}
          navigationDisabled={false}
        >
          <div className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Previous
          </div>
        </FormNavigate>
        <FormNavigate
          bgColor="bg-gradient-to-r from-green-500 to-green-600"
          hoverColor="bg-gradient-to-r from-primary-500 to-warm-500 text-white px-6 py-2.5 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
          navigateTo="/date"
          handleBtnClick={onNextBtnClick}
          navigationDisabled={false}
        >
          <div className="flex items-center justify-center gap-2">
            Next
            {/* <ArrowRight className="w-4 h-4" /> */}
          </div>
        </FormNavigate>
      </div>

      {/* Alternative Option */}
      <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
        <p className="text-gray-800/60 mb-4">or</p>
        <Link
          href="/place"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-gray-800 hover:bg-white/15 hover:border-white/30 transition-all duration-300 group"
        >
          <Calendar className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Need help finding a venue?</span>
        </Link>
        <p className="text-gray-800/40 text-sm mt-2">
          Let us help you find the perfect location for your event!
        </p>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Container>
  );
}

export default Location;
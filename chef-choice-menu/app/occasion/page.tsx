'use client';
import Container from '@/components/Container';
import FormNavigate from '@/components/FormNavigate';
import { useState, useEffect } from "react";
import { useStore } from "../../useStore";
import { ToastContainer, toast } from "react-toastify";
import { PartyPopper, Cake, Users, Heart, Briefcase, Star, Utensils, Calendar } from "lucide-react";

function Occasion() {
  const { addUserInputData, userInputData } = useStore();
  const [ServiceType, setServiceType] = useState("");
  const [OccasionState, setOccasionState] = useState([
    {
      service_type: "Single Services",
      options: [
        { id: 1, text: "Family Reunion", isActiv: false, icon: <Users className="w-6 h-6" /> },
        { id: 2, text: "Birthday", isActiv: false, icon: <Cake className="w-6 h-6" /> },
        { id: 3, text: "Gathering", isActiv: false, icon: <Users className="w-6 h-6" /> },
        { id: 4, text: "Bachelor/Bachelorette", isActiv: false, icon: <PartyPopper className="w-6 h-6" /> },
        { id: 5, text: "Romantic Night", isActiv: false, icon: <Heart className="w-6 h-6" /> },
        { id: 6, text: "Corporate", isActiv: false, icon: <Briefcase className="w-6 h-6" /> },
        { id: 7, text: "Foodie Adventure", isActiv: false, icon: <Utensils className="w-6 h-6" /> },
        { id: 8, text: "Others", isActiv: false, icon: <Star className="w-6 h-6" /> },
      ],
    },
    {
      service_type: "Multiple Services",
      options: [
        { id: 1, text: "Family Reunion", isActiv: false, icon: <Users className="w-6 h-6" /> },
        { id: 2, text: "Birthday", isActiv: false, icon: <Cake className="w-6 h-6" /> },
        { id: 3, text: "Wedding", isActiv: false, icon: <Heart className="w-6 h-6" /> },
        { id: 4, text: "Corporate", isActiv: false, icon: <Briefcase className="w-6 h-6" /> },
        { id: 5, text: "Gathering", isActiv: false, icon: <Users className="w-6 h-6" /> },
        { id: 6, text: "Others", isActiv: false, icon: <Star className="w-6 h-6" /> },
      ],
    },
  ]);

  const occasionSelectData = {
    title: "What's the occasion?",
    text: "Define your event clearly so that we can set the perfect tone and vibe for the event!",
  };

  useEffect(() => {
    const serviceData = userInputData.find(
      (item: any) => item.id === "service-select"
    );
    if (serviceData) setServiceType(serviceData.data);

    const occasionData = userInputData.find((item: any) => item.id === "occasion");
    if (occasionData) {
      setOccasionState((prev) =>
        prev.map((service) => ({
          ...service,
          options: service.options.map((opt) => ({
            ...opt,
            isActiv:
              opt.text === occasionData.data || opt.text === occasionData.text,
          })),
        }))
      );
    }
  }, [userInputData]);

  function handleOccasionClick(id: number, occasionIndex: number) {
    setOccasionState((prev) =>
      prev.map((service, sIndex) => {
        if (sIndex !== occasionIndex) return service;
        return {
          ...service,
          options: service.options.map((opt) =>
            opt.id === id
              ? { ...opt, isActiv: true }
              : { ...opt, isActiv: false }
          ),
        };
      })
    );
  }

  function handleOccasionBtnClick() {
    const selectedServiceIndex = ServiceType === "Single Services" ? 0 : 1;
    const userSelectedData = OccasionState[selectedServiceIndex].options.find(
      (opt) => opt.isActiv
    );

    if (userSelectedData) {
      addUserInputData({ id: "occasion", data: userSelectedData.text });
      return true;
    } else {
      toast("Please select an occasion!");
      return false;
    }
  }

  // Get current service options based on selected service type
  const currentService = OccasionState.find(service => service.service_type === ServiceType);

  return (
    <Container>
      {/* Header Section */}
      <div className="text-center mt-20 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-slide-down">
          {occasionSelectData.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          {occasionSelectData.text}
        </p>
      </div>

      {/* Service Type Indicator */}
      {ServiceType && (
        <div className="flex justify-center mb-8 animate-fade-in">
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <span className="text-gray-800 font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {ServiceType}
            </span>
          </div>
        </div>
      )}

      {/* Occasion Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
        {currentService?.options.map((item, index) => (
          <div
            key={item.id}
            onClick={() => handleOccasionClick(item.id, ServiceType === "Single Services" ? 0 : 1)}
            className={`
              relative cursor-pointer p-6 rounded-2xl transition-all duration-300 transform hover:scale-105
              border-2 backdrop-blur-sm group
              ${item.isActiv
                ? 'bg-gradient-to-br from-orange-500 to-red-500 border-orange-300 shadow-2xl scale-105'
                : 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/30 shadow-lg'
              }
            `}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Radio Indicator */}
            <div className="absolute top-4 right-4">
              <div className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                ${item.isActiv
                  ? 'border-white bg-white/20'
                  : 'border-white/50 group-hover:border-white'
                }
              `}>
                {item.isActiv && (
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                )}
              </div>
            </div>

            {/* Icon */}
            <div className={`
              w-14 h-14 rounded-xl mb-4 flex items-center justify-center transition-all
              ${item.isActiv
                ? 'bg-white/20 text-gray-800'
                : 'bg-white/10 text-gray-800/80 group-hover:bg-white/15 group-hover:text-gray-800'
              }
            `}>
              {item.icon}
            </div>

            {/* Text Content */}
            <h3 className={`
              text-lg font-semibold mb-2 transition-colors
              ${item.isActiv ? 'text-gray-800' : 'text-gray-800 group-hover:text-gray-800'}
            `}>
              {item.text}
            </h3>

            {/* Hover Effect */}
            <div className={`
              absolute inset-0 rounded-2xl transition-opacity
              ${item.isActiv
                ? 'bg-gradient-to-br from-orange-400/20 to-red-400/20'
                : 'bg-gradient-to-br from-white/5 to-white/0 opacity-0 group-hover:opacity-100'
              }
            `}></div>
          </div>
        ))}
      </div>

      {/* No Service Selected Message */}
      {!ServiceType && (
        <div className="text-center py-12 animate-fade-in">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto border border-white/20">
            <Calendar className="w-16 h-16 text-gray-800/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Select a Service First</h3>
            <p className="text-gray-200">Please go back and select a service type to see available occasions.</p>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 md:gap-6 mt-12">
        <FormNavigate
          bgColor="bg-gradient-to-r from-red-500 to-red-600"
          hoverColor="hover:from-red-600 hover:to-red-700"
          navigateTo="/book-chef"
          handleBtnClick={() => true}
          navigationDisabled={false}
        >
          <span className="text-gray-800 font-semibold">← Previous</span>
        </FormNavigate>
        <FormNavigate
          bgColor="bg-gradient-to-r from-green-500 to-green-600"
          hoverColor="hover:from-green-600 hover:to-green-700"
          navigateTo="/location"
          handleBtnClick={handleOccasionBtnClick}
          navigationDisabled={false}
        >
          <span className="text-gray-800 font-semibold">Next →</span>
        </FormNavigate>
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

export default Occasion;
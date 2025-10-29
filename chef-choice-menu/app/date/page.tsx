'use client';
import DatePicker from "react-datepicker";
import { useState, useEffect, forwardRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Container from '@/components/Container';
import FormNavigate from '@/components/FormNavigate';
import { ToastContainer, toast } from "react-toastify";
import { useStore } from "../../useStore";
import { Calendar, ArrowLeft, ArrowRight, Clock, MapPin } from "lucide-react";

function DateSelector() {
  const { addUserInputData, userInputData } = useStore();
  
  const dateSelectorData = { 
    title: "When is your event?",
    subtitle: "Select the date range for your culinary experience"
  };

  interface DateState {
    startDate: Date | null;
    endDate: Date | null;
    formattedStartDate: string;
    formattedEndDate: string;
  }

  const [InputDate, setInputDate] = useState<DateState>({
    startDate: null,
    endDate: null,
    formattedStartDate: "",
    formattedEndDate: "",
  });

  useEffect(() => {
    const savedDate = userInputData.find((item: any) => item.id === "date-select");
    if (savedDate) {
      const { startDate, endDate } = savedDate.data;
      setInputDate({
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        formattedStartDate: startDate ? formatDate(new Date(startDate)) : "",
        formattedEndDate: endDate ? formatDate(new Date(endDate)) : "",
      });
    }
  }, [userInputData]);

  interface CustomInputProps {
    value?: string;
    onClick?: () => void;
  }

  const CustomInput = forwardRef<HTMLDivElement, CustomInputProps>(function CustomInput(
    { value, onClick },
    ref
  ) {
    return (
      <div
        className={`
          relative cursor-pointer w-full max-w-md px-6 py-4 rounded-2xl 
           border border-gray-300 backdrop-blur-sm transition-all duration-300
          group hover:scale-105
          ${value 
            ? 'bg-white/10 border-orange-500 text-gray-800 shadow-lg' 
            : 'bg-white/10 border-white/20 text-gray-800/60 border border-gray-300 hover:bg-gray-200'
          }
        `}
        onClick={onClick}
        ref={ref}
      >
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-3">
            <Calendar className={`w-5 h-5 ${value ? 'text-orange-400' : 'text-gray-800/60'}`} />
            <span className={`font-medium ${value ? 'text-gray-800' : 'text-gray-800/60'}`}>
              {value || "Select date range"}
            </span>
          </div>
          <div className={`w-2 h-2 rounded-full ${value ? 'bg-green-400' : 'bg-white/30'}`}></div>
        </div>
        
        {/* Hover effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/0 to-orange-400/0 group-hover:from-orange-400/5 group-hover:to-orange-400/10 transition-all duration-300"></div>
      </div>
    );
  });

  function formatDate(date: Date | null) {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }

  function handleChange(dates : [Date | null, Date | null]) {
    const [newStartDate, newEndDate] = dates;
    setInputDate({
      startDate: newStartDate,
      endDate: newEndDate,
      formattedStartDate: formatDate(newStartDate),
      formattedEndDate: formatDate(newEndDate),
    });
  }

  function onNextBtnClick() {
    if (InputDate.startDate && InputDate.endDate) {
      addUserInputData({
        id: "date-select",
        data: {
          startDate: InputDate.startDate,
          endDate: InputDate.endDate,
        },
      });
      return true;
    } else {
      toast.error("Please select a date range for your event!");
      return false;
    }
  }

  // Get event context from previous selections
  const getEventContext = () => {
    const occasionData = userInputData.find((item: any) => item.id === "occasion");
    const locationData = userInputData.find((item: any) => item.id === "location");

    return {
      occasion: occasionData?.data || "Your Event",
      location: locationData?.data || "Selected Location",
    };
  };

  const eventContext = getEventContext();

  return (
    <Container>
      {/* Header Section */}
      <div className="text-center mt-20 mb-12">
        <div className="w-20 h-20 mx-auto mb-6 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
          <Clock className="w-10 h-10 text-gray-800" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-slide-down">
          {dateSelectorData.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          {dateSelectorData.subtitle}
        </p>
      </div>

      {/* Event Context Card */}
      <div className="max-w-md mx-auto mb-8 animate-fade-in">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-gray-300 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-gray-800 font-semibold">{eventContext.occasion}</p>
              <p className="text-gray-700 text-sm">{eventContext.location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Date Picker Section */}
      <div className="flex flex-col items-center gap-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <DatePicker
          selectsRange
          startDate={InputDate.startDate}
          endDate={InputDate.endDate}
          dateFormat="MMM d, yyyy"
          onChange={handleChange}
          minDate={new Date()}
          isClearable
          customInput={<CustomInput />}
          calendarClassName="bg-white/10 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 text-gray-800"
          dayClassName={(date) => 
            `rounded-lg hover:bg-orange-500 hover:text-gray-800 transition-colors ${
              date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() 
                ? 'bg-blue-500 text-gray-800' 
                : 'text-gray-800'
            }`
          }
        />

        {/* Selected Date Display */}
        {(InputDate.formattedStartDate || InputDate.formattedEndDate) && (
          <div className="max-w-md w-full animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-800 font-semibold text-sm mb-1">Selected Dates</p>
                  <div className="flex items-center gap-4 text-gray-800">
                    <div className="text-center">
                      <p className="text-xs text-gray-300">From</p>
                      <p className="font-bold">{InputDate.formattedStartDate}</p>
                    </div>
                    <div className="w-4 h-0.5 bg-orange-400"></div>
                    <div className="text-center">
                      <p className="text-xs text-gray-300">To</p>
                      <p className="font-bold">{InputDate.formattedEndDate}</p>
                    </div>
                  </div>
                </div>
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-orange-400" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 md:gap-6 mt-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
        <FormNavigate
          bgColor="bg-gradient-to-r from-red-500 to-red-600"
          hoverColor="bg-gradient-to-r from-gray-300 to-gray-500 text-white px-6 py-2.5 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
          navigateTo="/location"
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
          navigateTo="/services"
          handleBtnClick={onNextBtnClick}
          navigationDisabled={false}
        >
          <div className="flex items-center justify-center gap-2">
            Next
            {/* <ArrowRight className="w-4 h-4" /> */}
          </div>
        </FormNavigate>
      </div>

      {/* Help Text */}
      <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: "0.8s" }}>
        <p className="text-gray-800/60 text-sm">
          Select a date range that works best for your event. You can choose single or multiple days.
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

export default DateSelector;
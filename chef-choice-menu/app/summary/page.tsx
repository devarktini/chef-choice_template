"use client";
import { useState } from "react";
import Container from "@/components/Container";
import FormNavigate from "@/components/FormNavigate";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { toast, ToastContainer } from "react-toastify";
import { useStore } from "../../useStore.js";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaUtensils, 
  FaBullhorn, 
  FaCheckCircle,
  FaPaperPlane,
  FaArrowLeft
} from "react-icons/fa";

function ServicesSummary() {
  const { userInputData, addUserInputData } = useStore();

  const [summaryData, setSummaryData] = useState({
    name: "",
    email: "",
    phno: "",
    appliances: [] as string[],
    how_you_hear_us: "",
  });

  const servicesummaryData = {
    title: "That's it! 🎉",
    text: "Now, just add your contact info, and we'll send you personalized menu proposals for free in less than 20 minutes.",
  };

  const appliancesList = [
    { value: "Oven", icon: "🔥" },
    { value: "Microwave", icon: "⚡" },
    { value: "OTG", icon: "🍞" },
    { value: "Gas Burner / stove", icon: "👨‍🍳" },
    { value: "Toaster / Sandwich Maker", icon: "🥪" },
    { value: "Grinder / Blender", icon: "🥤" },
  ];

  const referralSources = [
    "Someone Recommended",
    "Google",
    "Facebook",
    "LinkedIn",
    "Bing",
    "Instagram",
    "I was at a dinner party",
    "Other"
  ];

  function handlesummaryData(e: React.ChangeEvent<HTMLInputElement>, field: string) {
    setSummaryData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  }

  function formatSchedule(schedule: any[]) {
    return schedule
      .map(
        (item) =>
          `${item.date} - Breakfast: ${item.breakfast ? "Yes" : "No"}, Lunch: ${
            item.lunch ? "Yes" : "No"
          }, Dinner: ${item.dinner ? "Yes" : "No"}, Evening Snacks: ${
            item.eveningSnacks ? "Yes" : "No"
          }, Notes: ${item.additionalNote || ""}`
      )
      .join("\n");
  }

  function formatPeople(people: any[]) {
    return people.map((p) => `${p.category}: ${p.count}`).join("\n");
  }

  function formatRestricted(restricted: any[]) {
    if (!restricted || !restricted.length) return "None";
    return restricted.map((r) => `${r.label}: ${r.value}`).join("\n");
  }

  async function onNextBtnClick() {
    if (
      summaryData.name &&
      summaryData.email &&
      summaryData.phno &&
      summaryData.appliances.length > 0 &&
      summaryData.how_you_hear_us
    ) {
      if (!userInputData.find((item: any) => item.id === "service-summary")) {
        addUserInputData({
          id: "service-summary",
          data: { ...summaryData },
        });
      }

      const formatSectionName = (id: string) =>
        id
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

      const plainTextData = userInputData
        .map((item: any) => {
          let value = "";
          if (item.id === "services-schedule") {
            value = formatSchedule(item.data);
          } else if (item.id === "service-people") {
            value = formatPeople(item.data);
          } else if (item.id === "services-restricted") {
            value = formatRestricted(item.data);
          } else if (typeof item.data === "object") {
            value = Object.entries(item.data)
              .map(([k, v]) => `${k}: ${v}`)
              .join("\n");
          } else {
            value = item.data;
          }
          return `${formatSectionName(item.id)}:\n${value}`;
        })
        .join("\n\n");

      const messageBody = `
New Booking Request

${plainTextData}

Submitted: ${new Date().toLocaleString("en-GB", { hour12: true })}
      `;

      try {
        await fetch("https://formspree.io/f/xldlywdl", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: summaryData.name,
            email: summaryData.email,
            _replyto: summaryData.email,
            message: messageBody,
            _subject: `New Booking Request from ${summaryData.name}`,
          }),
        });

        toast.success("🎉 Form submitted successfully! Check your email for menu proposals.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setSummaryData({
          name: "",
          email: "",
          phno: "",
          appliances: [],
          how_you_hear_us: "",
        });
      } catch (err) {
        toast.error("❌ Error submitting form. Please try again later.", {
          position: "top-center",
        });
        console.error(err);
      }

      return true;
    } else {
      toast.warning("⚠️ Please fill all the required fields!", {
        position: "top-center",
      });
      return false;
    }
  }

  return (
    <Container>
      <div className="min-h-screen flex flex-col justify-center py-8">
        {/* Header Section */}
        <div className="text-center mb-8 px-4">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-2xl">
              <FaCheckCircle className="text-gray-800 text-4xl" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {servicesummaryData.title}
          </h1>
          
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            {servicesummaryData.text}
          </p>
        </div>

        {/* Form Section */}
        <div className="max-w-4xl mx-auto px-4 w-full">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Name Field */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 text-gray-800 font-semibold text-lg">
                    <FaUser className="text-orange-400" />
                    <span>Full Name</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    onChange={(e) => handlesummaryData(e, "name")}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    value={summaryData.name}
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 text-gray-800 font-semibold text-lg">
                    <FaEnvelope className="text-orange-400" />
                    <span>Email Address</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    onChange={(e) => handlesummaryData(e, "email")}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    value={summaryData.email}
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Phone Field */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 text-gray-800 font-semibold text-lg">
                    <FaPhone className="text-orange-400" />
                    <span>Phone Number</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <div className="[&_.react-international-phone-input]:w-full [&_.react-international-phone-input]:px-4 [&_.react-international-phone-input]:py-3 [&_.react-international-phone-input]:bg-white/5 [&_.react-international-phone-input]:border [&_.react-international-phone-input]:border-white/20 [&_.react-international-phone-input]:rounded-xl [&_.react-international-phone-input]:text-gray-800 [&_.react-international-phone-input-container]:bg-transparent [&_.react-international-phone-country-selector]:bg-white/10 [&_.react-international-phone-country-selector]:text-gray-800">
                    <PhoneInput
                      defaultCountry="in"
                      value={summaryData.phno}
                      onChange={(value) =>
                        setSummaryData((prev) => ({ ...prev, phno: value }))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Appliances Available */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 text-gray-800 font-semibold text-lg">
                    <FaUtensils className="text-orange-400" />
                    <span>Available Appliances</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {appliancesList.map((appliance) => (
                      <label
                        key={appliance.value}
                        className={`flex items-center space-x-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          summaryData.appliances.includes(appliance.value)
                            ? "bg-orange-500/20 border-orange-500 text-gray-800"
                            : "bg-white/5 border-white/20 text-gray-300 hover:bg-white/10"
                        }`}
                      >
                        <input
                          type="checkbox"
                          value={appliance.value}
                          checked={summaryData.appliances.includes(appliance.value)}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            setSummaryData((prev: any) => {
                              const updated = isChecked
                                ? [...prev.appliances, appliance.value]
                                : prev.appliances.filter((a: string) => a !== appliance.value);
                              return { ...prev, appliances: updated };
                            });
                          }}
                          className="hidden"
                        />
                        <span className="text-lg">{appliance.icon}</span>
                        <span className="text-sm font-medium">{appliance.value}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* How did you hear about us */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 text-gray-800 font-semibold text-lg">
                    <FaBullhorn className="text-orange-400" />
                    <span>How did you hear about us?</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-3 bg-white/5 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                    value={summaryData.how_you_hear_us}
                    onChange={(e) =>
                      setSummaryData((prev) => ({
                        ...prev,
                        how_you_hear_us: e.target.value,
                      }))
                    }
                  >
                    <option value="" className="bg-white text-gray-800">
                      Select an option
                    </option>
                    {referralSources.map((source) => (
                      <option key={source} value={source} className="bg-white text-gray-800">
                        {source}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Required Fields Note */}
            <div className="mt-6 p-4 bg-blue-500/20 rounded-xl border border-blue-400/30">
              <p className="text-blue-600 text-sm text-center">
                <span className="text-red-400">*</span> All fields are required to get your personalized menu proposals
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center mt-8 space-x-4 px-4">
          <FormNavigate
            bgColor="bg-gray-600"
            hoverColor="hover:bg-gray-700"
            navigateTo="/restriction"
            handleBtnClick={() => true}
            navigationDisabled={false}
          >
            <span className="text-white flex items-center space-x-2">
              <FaArrowLeft />
              <span>Previous</span>
            </span>
          </FormNavigate>
          
          <FormNavigate
            bgColor="bg-gradient-to-r from-green-600 to-emerald-700"
            hoverColor="hover:from-green-700 hover:to-emerald-800"
            handleBtnClick={onNextBtnClick}
            navigationDisabled={false}
          >
            <span className="text-white w-full flex items-center space-x-2">
              <FaPaperPlane />
              <span>Submit Request</span>
            </span>
          </FormNavigate>
        </div>
      </div>

      <ToastContainer 
        position="top-center"
        autoClose={5000}
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

export default ServicesSummary;
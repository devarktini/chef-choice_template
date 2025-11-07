'use client';
import { useState, useEffect } from "react";
import { IoMdRadioButtonOn, IoMdRadioButtonOff } from "react-icons/io";
import { FaStar, FaMoneyBillWave, FaAward, FaCrown, FaArrowLeft } from "react-icons/fa";
import Container from "@/components/Container";
import FormNavigate from "@/components/FormNavigate";
import { useStore } from "../../useStore";
import { ToastContainer, toast } from "react-toastify";

function ServicesBudget() {
  const { addUserInputData, userInputData } = useStore();
  const [budgetSelect, setBudgetSelect] = useState([
    {
      title: "Casual",
      text: "Build connections around great food",
      isActiv: false,
      subText: "You will receive the quotation on your email",
      icon: FaMoneyBillWave,
      color: "from-green-500 to-emerald-600",
      borderColor: "border-green-200",
      priceRange: "₹800 - ₹1,200 per person",
    },
    {
      title: "Gourmet",
      text: "Brilliant menus to impress your guests",
      isActiv: false,
      subText: "You will receive the quotation on your email",
      icon: FaAward,
      color: "from-blue-500 to-purple-600",
      borderColor: "border-blue-200",
      priceRange: "₹1,500 - ₹2,500 per person",
    },
    {
      title: "Chef's Table",
      text: "The best of the best for your event",
      isActiv: false,
      subText: "You will receive the quotation on your email",
      icon: FaCrown,
      color: "from-orange-500 to-red-600",
      borderColor: "border-orange-200",
      priceRange: "₹3,000+ per person",
    },
  ]);

  const servicesbudgetdata = {
    title: "What's your budget for this experience?",
    ImpPoints: [
      "Chef's fee covers the preparation and service of your selected meals.",
      "The cost of groceries is separate and should be paid directly to the chef on-site. Receipts will be provided daily for clarity.",
      "Chefs available at best price (final pricing depends on menu, event type, and guest count).",
    ],
  };

  // Restore previous selection from userInputData
  useEffect(() => {
    const prevBudget = userInputData.find(
      (item: any) => item.id === "service-budget"
    );
    if (prevBudget) {
      setBudgetSelect((prev) =>
        prev.map((budget) => ({
          ...budget,
          isActiv: budget.title === prevBudget.data.title,
        }))
      );
    }
  }, [userInputData]);

  function handleBudgetClick(title: string) {
    setBudgetSelect((prev) =>
      prev.map((budget) =>
        budget.title === title
          ? { ...budget, isActiv: true }
          : { ...budget, isActiv: false }
      )
    );
  }

  function onNextBtnClick() {
    const selectedBudgetPackage = budgetSelect.find((budget) => budget.isActiv);
    if (!selectedBudgetPackage) {
      toast.error("Please select a package to continue!");
      return false;
    }

    // Send only essential data instead of entire object
    const essentialData = {
      title: selectedBudgetPackage.title,
      priceRange: selectedBudgetPackage.priceRange,
      description: selectedBudgetPackage.text,
    };

    console.log("Sending budget data to store:", essentialData);

    addUserInputData({ 
      id: "service-budget", 
      data: essentialData 
    });
    
    return true;
  }

  return (
    <Container>
      <div className="mt-8 md:mt-16 mb-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-full shadow-lg">
              <FaMoneyBillWave className="text-gray-800 text-2xl" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            {servicesbudgetdata.title}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Choose the package that best fits your culinary vision and budget
          </p>
        </div>

        {/* Budget Cards */}
        <div className="max-w-6xl mx-auto px-4 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {budgetSelect.map((budget, index) => {
              const IconComponent = budget.icon;
              return (
                <div
                  key={index}
                  onClick={() => handleBudgetClick(budget.title)}
                  className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    budget.isActiv ? 'scale-105' : 'hover:scale-102'
                  }`}
                >
                  {/* Selected Indicator */}
                  {budget.isActiv && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-gray-800 px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                        Selected
                      </div>
                    </div>
                  )}

                  <div
                    className={`rounded-2xl p-6 h-full border-2 transition-all duration-300 ${
                      budget.isActiv
                        ? `bg-gradient-to-br ${budget.color} border-transparent shadow-2xl`
                        : `bg-white/10 backdrop-blur-sm ${budget.borderColor} border-gray-300/30 shadow-lg hover:shadow-xl`
                    }`}
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-3 rounded-xl ${
                            budget.isActiv
                              ? 'bg-white/20'
                              : 'bg-gradient-to-br ' + budget.color
                          }`}
                        >
                          <IconComponent
                            className={`text-2xl ${
                              budget.isActiv ? 'text-white' : 'text-gray-800'
                            }`}
                          />
                        </div>
                        <div>
                          <h3
                            className={`text-xl font-bold ${
                              budget.isActiv ? 'text-white' : 'text-gray-800'
                            }`}
                          >
                            {budget.title}
                          </h3>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {budget.isActiv ? (
                          <IoMdRadioButtonOn className="text-2xl text-white" />
                        ) : (
                          <IoMdRadioButtonOff className="text-2xl text-gray-400" />
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p
                      className={`mb-4 leading-relaxed ${
                        budget.isActiv ? 'text-white' : 'text-gray-600'
                      }`}
                    >
                      {budget.text}
                    </p>

                    {/* Price Range */}
                    <div className="mb-4">
                      <p
                        className={`text-lg font-semibold ${
                          budget.isActiv ? 'text-white' : 'text-gray-800'
                        }`}
                      >
                        {budget.priceRange}
                      </p>
                    </div>

                    {/* Subtext */}
                    <div
                      className={`mt-4 p-3 rounded-lg ${
                        budget.isActiv
                          ? 'bg-white'
                          : 'bg-gray-800'
                      }`}
                    >
                      <p
                        className={`text-sm font-semibold text-center ${
                          budget.isActiv ? 'text-gray-800' : 'text-gray-300'
                        }`}
                      >
                        {budget.subText}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Important Points */}
        <div className="max-w-4xl mx-auto px-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-gray-300/30 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Important Information
            </h3>
            <div className="space-y-3">
              {servicesbudgetdata?.ImpPoints?.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <FaStar className="text-yellow-400 text-sm" />
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center mt-8 space-x-4 px-4">
          <FormNavigate
            bgColor="bg-gray-600"
            hoverColor="bg-gradient-to-r from-gray-300 to-gray-500 text-gray-800 px-6 py-2.5 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
            navigateTo="/people"
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
            hoverColor="bg-gradient-to-r from-primary-500 to-warm-500 text-white px-6 py-2.5 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
            navigateTo="/restriction"
            handleBtnClick={onNextBtnClick}
            navigationDisabled={false}
          >
            <span className="text-white">Next</span>
          </FormNavigate>
        </div>
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

export default ServicesBudget;
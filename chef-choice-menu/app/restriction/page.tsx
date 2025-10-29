'use client';
import { useState, useEffect } from "react";
import Container from "@/components/Container";
import FormNavigate from "@/components/FormNavigate";
import { IoMdRadioButtonOn, IoMdRadioButtonOff } from "react-icons/io";
import { FaUtensils, FaQuestionCircle, FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import { useStore } from "../../useStore";

function ServicesRestriction() {
  const { addUserInputData, userInputData } = useStore();

  const [foodRestrictionOpt, setFoodRestrictionOpt] = useState([
    { 
      id: 1, 
      setActiv: false, 
      text: "None", 
      description: "No dietary restrictions",
      icon: FaCheckCircle,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50"
    },
    { 
      id: 2, 
      setActiv: false, 
      text: "Yes", 
      description: "We have dietary needs",
      icon: FaUtensils,
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50"
    },
  ]);

  const servicesrestrictiondata = {
    title: "Any food restrictions?",
    text: "If you need to check it with your guests, no problem. You can inform your chef later.",
    subText: "Not sure? You can change it later! 😉",
  };

  // Restore previous selection
  useEffect(() => {
    const prevData = userInputData.find(
      (item: any) => item.id === "service-restriction"
    );
    if (prevData) {
      setFoodRestrictionOpt((prev) =>
        prev.map((opt) =>
          opt.text === prevData.data.text
            ? { ...opt, setActiv: true }
            : { ...opt, setActiv: false }
        )
      );
    }
  }, [userInputData]);

  function handleRestrictionOptClick(id: any) {
    const selectedOption = foodRestrictionOpt.find((opt) => opt.id === id);
    setFoodRestrictionOpt((prev) =>
      prev.map((opt) =>
        opt.id === id ? { ...opt, setActiv: true } : { ...opt, setActiv: false }
      )
    );
    addUserInputData({ id: "service-restriction", data: selectedOption });
  }

  function getRestrictionOptVal() {
    return foodRestrictionOpt.find((opt) => opt.setActiv === true);
  }

  return (
    <Container>
      <div className="min-h-screen flex flex-col justify-center">
        {/* Header Section */}
        <div className="text-center mb-12 px-4">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full shadow-lg">
              <FaQuestionCircle className="text-gray-800 text-3xl" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {servicesrestrictiondata.title}
          </h1>
          
          <p className="text-xl text-gray-800 mb-4 max-w-2xl mx-auto leading-relaxed">
            {servicesrestrictiondata.text}
          </p>
          
          <div className="inline-flex items-center space-x-2 bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-6 py-3">
            <span className="text-gray-800 text-lg">✨</span>
            <p className="text-gray-800 font-medium">
              {servicesrestrictiondata.subText}
            </p>
          </div>
        </div>

        {/* Options Section */}
        <div className="max-w-4xl mx-auto px-4 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {foodRestrictionOpt.map((opt) => {
              const IconComponent = opt.icon;
              return (
                <div
                  key={opt.id}
                  onClick={() => handleRestrictionOptClick(opt.id)}
                  className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    opt.setActiv ? 'scale-105 ring-4 ring-white/30' : 'hover:scale-102'
                  }`}
                >
                  {/* Selection Indicator */}
                  {opt.setActiv && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-gray-800 px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                        Selected
                      </div>
                    </div>
                  )}

                  <div
                    className={`rounded-2xl p-8 border-3 transition-all duration-300 ${
                      opt.setActiv
                        ? `bg-gradient-to-br ${opt.color} border-transparent shadow-2xl`
                        : 'bg-white/10 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-4 rounded-xl ${
                            opt.setActiv
                              ? 'bg-white/20'
                              : `bg-gradient-to-br ${opt.color}`
                          }`}
                        >
                          <IconComponent
                            className={`text-2xl ${
                              opt.setActiv ? 'text-white' : 'text-gray-800'
                            }`}
                          />
                        </div>
                        <div className="text-left">
                          <h3
                            className={`text-2xl font-bold ${
                              opt.setActiv ? 'text-white' : 'text-gray-800'
                            }`}
                          >
                            {opt.text}
                          </h3>
                          <p
                            className={`mt-1 ${
                              opt.setActiv ? 'text-white' : 'text-gray-800'
                            }`}
                          >
                            {opt.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0">
                        {opt.setActiv ? (
                          <IoMdRadioButtonOn className="text-3xl text-white" />
                        ) : (
                          <IoMdRadioButtonOff className="text-3xl text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Info */}
        {/* <div className="max-w-2xl mx-auto px-4 mb-8">
          <div className="bg-blue-500/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-400/30">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <FaUtensils className="text-gray-800 text-lg" />
                </div>
              </div>
              <div>
                <h4 className="text-gray-800 font-semibold text-lg mb-2">
                  Common Dietary Restrictions
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut Allergies', 'Halal', 'Kosher'].map((item) => (
                    <span 
                      key={item}
                      className="px-3 py-1 bg-white/10 rounded-full text-gray-800 text-sm border border-white/20"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Navigation Buttons */}
        <div className="flex justify-center mt-8 space-x-4 px-4">
          <FormNavigate
            bgColor="bg-gray-600"
            hoverColor="bg-gradient-to-r from-gray-300 to-gray-500 text-white px-6 py-2.5 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
            navigateTo="/budget"
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
            navigateTo={
              getRestrictionOptVal()?.text === "None"
                ? "/summary"
                : "/ServicesSelectRestriction"
            }
            handleBtnClick={() => true}
            navigationDisabled={false}
          >
            <span className="text-white flex items-center justify-center space-x-2">
              <span>Next</span>
              {getRestrictionOptVal()?.text === "None" && (
                <FaCheckCircle className="text-sm" />
              )}
            </span>
          </FormNavigate>
        </div>
      </div>
    </Container>
  );
}

export default ServicesRestriction;
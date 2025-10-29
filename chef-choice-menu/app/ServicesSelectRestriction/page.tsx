'use client';
import { useState } from "react";
import Container from "@/components/Container";
import FormNavigate from "@/components/FormNavigate";
import { ToastContainer, toast } from "react-toastify";
import { useStore } from "../../useStore";
import { 
  FaLeaf, 
  FaBreadSlice, 
  FaFish, 
  FaCheese, 
  FaPepperHot, 
  FaArrowLeft,
  FaArrowRight,
  FaClipboardList,
  FaStickyNote
} from "react-icons/fa";

// Define types for better TypeScript support
interface RestrictionOption {
  id: number;
  text: string;
  checked: boolean;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
}

function ServicesSelectRestriction() {
  const { addUserInputData, userInputData } = useStore();
  const [restrictionOpt, setRestricionOpt] = useState<RestrictionOption[]>([
    { 
      id: 1, 
      text: "Vegetarian", 
      checked: false, 
      icon: FaLeaf,
      color: "from-green-500 to-emerald-600",
      description: "No meat or fish products"
    },
    { 
      id: 2, 
      text: "Gluten", 
      checked: false, 
      icon: FaBreadSlice,
      color: "from-amber-500 to-orange-600",
      description: "Avoid wheat, barley, rye"
    },
    { 
      id: 3, 
      text: "ShellFish", 
      checked: false, 
      icon: FaFish,
      color: "from-blue-500 to-cyan-600",
      description: "No shrimp, crab, lobster"
    },
    { 
      id: 4, 
      text: "Dairy Products", 
      checked: false, 
      icon: FaCheese,
      color: "from-purple-500 to-pink-600",
      description: "No milk, cheese, butter"
    },
    { 
      id: 5, 
      text: "Nuts", 
      checked: false, 
      icon: FaPepperHot,
      color: "from-red-500 to-rose-600",
      description: "No peanuts, tree nuts"
    },
  ]);

  const [additionalNotes, setAdditionalNotes] = useState<string>("");

  const servicesselectrestriction = {
    title: "Select all that apply",
    text: "With this info, our chefs will craft customized menus tailored to your needs.",
  };

  const updateRestrictionOpt = (id: any) => {
    setRestricionOpt((prev) =>
      prev.map((opt) =>
        opt.id === id ? { ...opt, checked: !opt.checked } : opt
      )
    );
  };

  function onNextBtnClick() {
    const selectedData = userInputData.find(
      (item: any) => item.id === "services-restricted"
    );
    const dataArr = restrictionOpt.filter((data) => data.checked);

    // Combine restrictions with additional notes
    const submissionData = {
      restrictions: dataArr,
      additionalNotes: additionalNotes
    };

    if (!selectedData) {
      addUserInputData({ id: "services-restricted", data: submissionData });
    } else {
      addUserInputData({ id: "services-restricted", data: submissionData });
    }

    if (dataArr.length > 0 || additionalNotes.trim().length > 0) {
      return true;
    } else {
      toast.error("Please select at least one restriction or add notes!", {
        position: "top-center",
        autoClose: 3000,
      });
      return false;
    }
  }

  const selectedCount = restrictionOpt.filter(opt => opt.checked).length;

  return (
    <Container>
      <div className="min-h-screen  mt-20 flex flex-col justify-center py-8">
        {/* Header Section */}
        <div className="text-center mb-8 px-4">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full shadow-2xl">
              <FaClipboardList className="text-gray-700 text-4xl" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {servicesselectrestriction.title}
          </h1>
          
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            {servicesselectrestriction.text}
          </p>

          {/* Selection Counter */}
          <div className="mt-4 inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 border border-white/20">
            <span className="text-green-400 font-semibold">
              {selectedCount} selected
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-300 text-sm">
              Select all that apply
            </span>
          </div>
        </div>

        {/* Restrictions Grid */}
        <div className="max-w-6xl mx-auto px-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {restrictionOpt.map((opt) => {
              const IconComponent = opt.icon;
              return (
                <div
                  key={opt.id}
                  onClick={() => updateRestrictionOpt(opt.id)}
                  className={`relative cursor-pointer transition-all  duration-300 transform hover:scale-105 ${
                    opt.checked ? 'scale-105 ring-4 ring-white/30' : 'hover:scale-102'
                  }`}
                >
                  <div
                    className={`rounded-2xl p-6 border-2 transition-all duration-300 ${
                      opt.checked
                        ? `bg-gradient-to-br ${opt.color} border-transparent shadow-2xl`
                        : 'bg-white/10 backdrop-blur-sm border-gray-300 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {/* Checkbox Indicator */}
                    <div className="flex justify-between items-start mb-4">
                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                          opt.checked
                            ? 'bg-white border-white'
                            : 'bg-transparent border-gray-200'
                        }`}
                      >
                        {opt.checked && (
                          <div className="w-2 h-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-full"></div>
                        )}
                      </div>
                      <IconComponent
                        className={`text-2xl ${
                          opt.checked ? 'text-white' : 'text-gray-700'
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3
                        className={`text-lg font-bold mb-2 ${
                          opt.checked ? 'text-white' : 'text-gray-700'
                        }`}
                      >
                        {opt.text}
                      </h3>
                      <p
                        className={`text-sm ${
                          opt.checked ? 'text-white/90' : 'text-gray-600'
                        }`}
                      >
                        {opt.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Notes Section */}
        <div className="max-w-4xl mx-auto px-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                <FaStickyNote className="text-white text-lg" />
              </div>
              <div>
                <h3 className="text-gray-800 font-bold text-lg">
                  Additional Dietary Notes
                </h3>
                <p className="text-gray-600 text-sm">
                  Any other allergies, preferences, or special requests?
                </p>
              </div>
            </div>
            
            <textarea
              className="w-full h-32 px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 resize-none"
              placeholder="E.g., 'Please avoid spicy foods' or 'Include vegan dessert options.'"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              maxLength={500}
            />
            
            <div className="flex justify-between items-center mt-3">
              <span className="text-gray-400 text-sm">
                {additionalNotes.length}/500 characters
              </span>
              <span className={`text-sm ${
                selectedCount > 0 || additionalNotes.length > 0 ? 'text-green-400' : 'text-gray-400'
              }`}>
                {selectedCount > 0 || additionalNotes.length > 0 ? '✓ Ready to continue' : 'Add restrictions or notes'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center mt-8 space-x-4 px-4">
          <FormNavigate
            bgColor="bg-gray-600"
            hoverColor="bg-gradient-to-r from-gray-300 to-gray-500 text-white px-6 py-2.5 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
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
            hoverColor="bg-gradient-to-r from-primary-500 to-warm-500 text-white px-6 py-2.5 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
            navigateTo="/summary"
            navigationDisabled={false}
            handleBtnClick={onNextBtnClick}
          >
            <span className="text-white flex items-center space-x-2">
              <span>Continue</span>
              <FaArrowRight />
            </span>
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

export default ServicesSelectRestriction;
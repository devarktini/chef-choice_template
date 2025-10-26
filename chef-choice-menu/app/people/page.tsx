'use client';
import { useState, useEffect } from "react";
import Container from "@/components/Container";
import FormNavigate from "@/components/FormNavigate";
import { FaMinus, FaPlus, FaUsers } from "react-icons/fa";
import { useStore } from "../../useStore";
import { toast, ToastContainer } from "react-toastify";

function ServicesPeople() {
  const { addUserInputData, userInputData } = useStore();
  const [servicePeople, setServicePeople] = useState([
    { category: "Adult", text: "Over 16 years of age", count: 0, color: "bg-blue-500" },
    { category: "Teens", text: "12-15 years of age", count: 0, color: "bg-purple-500" },
    { category: "Children", text: "2-11 years of age", count: 0, color: "bg-pink-500" },
  ]);

  const servicespeopledata = { title: "We are..." };

  // Restore previous selection on mount
  useEffect(() => {
    const saved = userInputData.find((item: any) => item.id === "service-people");
    if (saved && saved.data) {
      setServicePeople(saved.data);
    }
  }, [userInputData]);

  function handleCountBtnClick(operation: string, category: string) {
    setServicePeople((prev) =>
      prev.map((people) => {
        if (people.category !== category) return people;
        if (operation === "minus")
          return { ...people, count: Math.max(people.count - 1, 0) };
        return { ...people, count: people.count + 1 };
      })
    );
  }

  function onNextBtnClick() {
    const total = servicePeople.reduce((sum, person) => sum + person.count, 0);
    if (total < 2) {
      toast.error("At least 2 people must be selected!");
      return false;
    }
    addUserInputData({ id: "service-people", data: servicePeople });
    return true;
  }

  const totalPeople = servicePeople.reduce((sum, person) => sum + person.count, 0);

  return (
    <Container>
      <div className="mt-8 md:mt-16 mb-8">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg">
              <FaUsers className="text-white text-2xl" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            {servicespeopledata.title}
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Select the number of people in each age group
          </p>
        </div>

        {/* Total Counter */}
        <div className="max-w-md mx-auto mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">Total People</span>
              <span className={`text-2xl font-bold ${totalPeople >= 2 ? 'text-green-600' : 'text-gray-600'}`}>
                {totalPeople}
              </span>
            </div>
            {totalPeople < 2 && (
              <p className="text-sm text-red-500 mt-2 text-center">
                Minimum 2 people required
              </p>
            )}
          </div>
        </div>

        {/* People Cards */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {servicePeople.map((people, index) => (
              <div
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
                key={index}
              >
                <div className="text-center mb-4">
                  <div className={`w-12 h-12 ${people.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <span className="text-white font-bold text-sm">
                      {people.category.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {people.category}
                  </h3>
                  <p className="text-gray-600 text-sm">{people.text}</p>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={() => handleCountBtnClick("minus", people.category)}
                    disabled={people.count === 0}
                    className={`p-3 rounded-xl transition-all duration-200 ${
                      people.count === 0 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-red-50 text-red-600 hover:bg-red-100 active:scale-95'
                    }`}
                  >
                    <FaMinus className="text-sm" />
                  </button>

                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold text-gray-800">
                      {people.count}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">people</span>
                  </div>

                  <button
                    onClick={() => handleCountBtnClick("plus", people.category)}
                    className="p-3 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 active:scale-95 transition-all duration-200"
                  >
                    <FaPlus className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center mt-12 space-x-4 px-4">
        <FormNavigate
          bgColor="bg-gray-600"
          hoverColor="hover:bg-gray-700"
          navigateTo="/schedule/service"
          handleBtnClick={() => true}
          navigationDisabled={false}
        >
          <span className="text-white">Previous</span>
        </FormNavigate>
        <FormNavigate
          bgColor={`${totalPeople >= 2 ? 'bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
          hoverColor={`${totalPeople >= 2 ? 'hover:bg-green-700' : 'hover:bg-gray-400'}`}
          navigateTo="/budget"
          handleBtnClick={onNextBtnClick}
          navigationDisabled={totalPeople < 2}
        >
          <span className="text-white">Next</span>
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
      />
    </Container>
  );
}

export default ServicesPeople;
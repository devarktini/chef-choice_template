'use client';
import Container from '@/components/Container';
import FormNavigate from '@/components/FormNavigate';
import { useStore } from "../../useStore";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

function ServicesSchedule() {
  const { addUserInputData, userInputData } = useStore();

  const serviceScheduledata = {
    title: "We want to schedule my services for...",
    hintText:
      "Uncheck the meals you don't need. Swipe down the calendar to see all the dates. 😉",
  };

  interface ScheduleItem {
    date: string;
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
    eveningSnacks: boolean;
    additionalNote: string;
  }

  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);

  function formatDate(date: Date | null) {
    if (!date) return "";
    return Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  }

  useEffect(() => {
    const startDate = userInputData.find((item: any) => item.id === "date-select")
      ?.data.startDate;
    const endDate = userInputData.find((item: any) => item.id === "date-select")
      ?.data.endDate;

    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const datesArray = [];
    let current = new Date(start);
    while (current <= end) {
      datesArray.push(formatDate(current));
      current.setDate(current.getDate() + 1);
    }

    const savedSchedule = userInputData.find(
      (item: any) => item.id === "services-schedule"
    )?.data;

    if (savedSchedule && savedSchedule.length === datesArray.length) {
      setSchedule(savedSchedule);
    } else {
      const newSchedule = datesArray.map((date) => ({
        date,
        breakfast: true,
        lunch: true,
        dinner: true,
        eveningSnacks: true,
        additionalNote: "",
      }));
      setSchedule(newSchedule);
    }
  }, [userInputData]);

  const handleCheckboxChange = (index: number, meal: string) => {
    setSchedule((prev: any) =>
      prev.map((item: any, idx: number) =>
        idx === index ? { ...item, [meal]: !item[meal] } : item
      )
    );
  };

  const handleNoteChange = (index: number, value: string) => {
    setSchedule((prev: any) =>
      prev.map((item: any, idx: number) =>
        idx === index ? { ...item, additionalNote: value } : item
      )
    );
  };

  const onNextBtnClick = () => {
    if (!schedule || schedule.length === 0) {
      toast("No schedule selected!");
      return false;
    }
    addUserInputData({ id: "services-schedule", data: schedule });
    return true;
  };

  return (
    <Container>
      <div>
        <p className="text-xl mt-20 font-bold text-center text-gray-800">
          {serviceScheduledata.title}
        </p>
      </div>

      <div className="overflow-x-auto my-5">
        <table className="w-full border border-gray-300 text-center text-gray-800">
          <thead>
            <tr>
              <th className="p-2 border">DATE</th>
              <th className="p-2 border">BREAKFAST</th>
              <th className="p-2 border">LUNCH</th>
              <th className="p-2 border">DINNER</th>
              <th className="p-2 border">EVENING SNACKS</th>
              <th className="p-2 border">ADDITIONAL INPUT</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item: any, index: number) => (
              <tr key={index}>
                <td className="p-2 border">{item.date}</td>
                <td className="p-2 border">
                  <input
                    type="checkbox"
                    checked={item.breakfast}
                    onChange={() => handleCheckboxChange(index, "breakfast")}
                    className="w-6 h-6 accent-orange-500 cursor-pointer"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="checkbox"
                    checked={item.lunch}
                    onChange={() => handleCheckboxChange(index, "lunch")}
                    className="w-6 h-6 accent-orange-500 cursor-pointer"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="checkbox"
                    checked={item.dinner}
                    onChange={() => handleCheckboxChange(index, "dinner")}
                    className="w-6 h-6 accent-orange-500 cursor-pointer"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="checkbox"
                    checked={item.eveningSnacks}
                    onChange={() =>
                      handleCheckboxChange(index, "eveningSnacks")
                    }
                    className="w-6 h-6 accent-orange-500 cursor-pointer"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="text"
                    placeholder="Add notes..."
                    value={item.additionalNote}
                    onChange={(e) => handleNoteChange(index, e.target.value)}
                    className="border rounded p-1 w-full text-gray-800 bg-transparent placeholder-white"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3 my-2 bg-orange-300 text-gray-800 w-4/5 font-semibold text-center mx-auto">
        {serviceScheduledata.hintText}
      </div>

      <div className="flex justify-center mt-7 space-x-5">
        <FormNavigate
          bgColor="bg-red-500"
          hoverColor="bg-gradient-to-r from-gray-300 to-gray-500 text-white px-6 py-2.5 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
          navigateTo="/date"
            handleBtnClick={() => true}
            navigationDisabled={false}
        >
          <span className="text-white">Previous</span>
        </FormNavigate>
        <FormNavigate
          bgColor="bg-green-500"
          hoverColor="bg-gradient-to-r from-primary-500 to-warm-500 text-white px-6 py-2.5 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
          navigateTo="/people"
          handleBtnClick={onNextBtnClick}
          navigationDisabled={false}
        >
          <span className="text-white justify-center">Next</span>
        </FormNavigate>
      </div>
      <ToastContainer />
    </Container>
  );
}

export default ServicesSchedule;

"use client";
import { useState, useEffect } from 'react';
import { Calendar, Utensils } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Container from '@/components/Container';
import FormNavigate from '@/components/FormNavigate';
import { useStore } from '../../useStore.js';
import { ToastContainer, toast } from 'react-toastify';

export default function BookChefPage() {
  const { addUserInputData, userInputData, clearUserInputData } = useStore();

  useEffect(() => {
    clearUserInputData();
  }, []);

  const [cardActiv, setCardActiv] = useState([
    { id: 'service-opt-1', state: false },
    { id: 'service-opt-2', state: false },
  ]);

  useEffect(() => {
    const serviceData = userInputData.find(
      (item: any) => item.id === 'service-select'
    );
    if (serviceData) {
      setCardActiv((prev) =>
        prev.map((card) => ({
          ...card,
          state:
            serviceData.data === 'Single Services' && card.id === 'service-opt-1'
              ? true
              : serviceData.data === 'Multiple Services' && card.id === 'service-opt-2'
              ? true
              : false,
        }))
      );
    }
  }, [userInputData]);

  const serviceSelectData = {
    title: 'Please specify the type of service you need',
    text: 'Define your event to see availability of chefs, menus and prices accordingly. This will take less than 2 minutes to complete!',
    options: [
      {
        id: 'service-opt-1',
        title: 'Single Services',
        text: 'A single experience to always remember',
        icon: <Utensils className="w-8 h-8" />,
      },
      {
        id: 'service-opt-2',
        title: 'Multiple Services',
        text: 'Ideal for holidays, Multiple gathering and meals',
        icon: <Calendar className="w-8 h-8" />,
      },
    ],
  };

  function handleOptionClicked(cardId: string) {
    setCardActiv((prev) =>
      prev.map((card) =>
        card.id === cardId
          ? { ...card, state: true }
          : { ...card, state: false }
      )
    );
  }

  function isActive(id: string) {
    return cardActiv.find((item) => item.id === id)?.state;
  }

  function handleCheckUserInput() {
    const selectedCard = cardActiv.find((card) => card.state);
    if (!selectedCard) {
      toast('Select a service!');
      return false;
    }
    addUserInputData({
      id: 'service-select',
      data:
        selectedCard.id === 'service-opt-1'
          ? 'Single Services'
          : 'Multiple Services',
    });
    return true;
  }

  return (
    <>
      <AnimatedBackground />
      <main className="min-h-screen pt-20 relative z-10">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-cream-100 via-primary-50 to-warm-50 py-20">
          <div className="container mx-auto px-4 text-center animate-slide-down">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Book a Chef</h1>
            <p className="text-xl text-gray-600">Choose your service in 2 minutes!</p>
          </div>
        </section>

        {/* Service Selection Section */}
        <section className="py-20 bg-white">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {serviceSelectData.title}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {serviceSelectData.text}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {serviceSelectData.options.map((item, i) => (
                <div
                  key={item.id}
                  onClick={() => handleOptionClicked(item.id)}
                  className={`cursor-pointer p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 ${
                    isActive(item.id)
                      ? 'bg-gradient-to-r from-primary-500 to-warm-500 text-white scale-105'
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className={isActive(item.id) ? 'text-white' : 'text-gray-600'}>
                      {item.text}
                    </p>
                    <div className="mt-4 flex justify-center">
                      <input
                        className="accent-white"
                        name="service"
                        type="radio"
                        readOnly
                        checked={isActive(item.id)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center space-x-5 mt-12">
              <FormNavigate
                bgColor="hover:bg-red-600"
                hoverColor="bg-red-500"
                navigationDisabled={true}
                navigateTo=""
                handleBtnClick={() => true}
              >
                <span className="text-white">Previous</span>
              </FormNavigate>
              <FormNavigate
                bgColor="hover:bg-green-600"
                hoverColor="bg-green-500"
                navigateTo="/occasion"
                handleBtnClick={handleCheckUserInput}
                navigationDisabled={false}
              >
                <span className="text-white">Next</span>
              </FormNavigate>
            </div>
            
            <ToastContainer />
          </Container>
        </section>
      </main>
    </>
  );
}
"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I book a chef?",
      answer: "Simply follow our 5-step booking process: select your service type, enter location and schedule, specify guest details and budget, choose food preferences, and confirm your contact details to receive chef proposals."
    },
    {
      question: "What types of cuisines do you offer?",
      answer: "We offer a wide range of cuisines including traditional North Indian, South Indian, Continental, Chinese, Italian, and many more. Our chefs can customize menus based on your preferences."
    },
    {
      question: "Can I request dietary restrictions?",
      answer: "Absolutely! We accommodate all dietary restrictions including vegetarian, vegan, gluten-free, dairy-free, and any allergies. Just specify your requirements during the booking process."
    },
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking at least 3-5 days in advance for regular events. For large events like weddings, booking 2-3 weeks ahead is ideal to ensure availability."
    },
    {
      question: "What's included in the service?",
      answer: "Our service includes menu planning, ingredient shopping, cooking at your venue, serving (if requested), and basic cleanup. Additional services like bartenders, waiters, and cleaners can be added."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-cream-50 to-primary-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-grid opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-down">
          <HelpCircle className="w-16 h-16 text-primary-500 mx-auto mb-4 animate-bounce-slow" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-gray-600 text-lg">Find answers to common questions</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 animate-slide-up ${
                openIndex === index ? 'shadow-2xl' : ''
              }`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex justify-between items-center hover:bg-cream-50 transition-colors group"
              >
                <span className="text-left font-semibold text-gray-900 group-hover:text-primary-500 transition-colors pr-4">
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 transform transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}>
                  <div className="bg-primary-100 rounded-full p-2">
                    <ChevronDown className="w-5 h-5 text-primary-600" />
                  </div>
                </div>
              </button>

              <div className={`transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              } overflow-hidden`}>
                <div className="px-6 pb-5 text-gray-600 leading-relaxed bg-gradient-to-br from-cream-50 to-white">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

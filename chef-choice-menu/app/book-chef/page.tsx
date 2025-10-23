"use client";
import { useState } from 'react';
import { Calendar, Utensils } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function BookChefPage() {
  const [serviceType, setServiceType] = useState('');

  return (
    <>
      <AnimatedBackground />
      <main className="min-h-screen pt-20 relative z-10">
        <section className="bg-gradient-to-br from-cream-100 via-primary-50 to-warm-50 py-20">
          <div className="container mx-auto px-4 text-center animate-slide-down">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Book a Chef</h1>
            <p className="text-xl text-gray-600">Choose your service in 2 minutes!</p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Select Service Type</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                { type: 'single', icon: <Utensils />, title: "Single Services", desc: "One special experience" },
                { type: 'multiple', icon: <Calendar />, title: "Multiple Services", desc: "Multiple gatherings" }
              ].map((service, i) => (
                <div key={i} onClick={() => setServiceType(service.type)} className={`cursor-pointer p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all animate-scale-in ${serviceType === service.type ? 'bg-gradient-to-r from-primary-500 to-warm-500 text-white scale-105' : 'bg-white'}`} style={{animationDelay: `${i*0.1}s`}}>
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">{service.icon}</div>
                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                    <p className={serviceType === service.type ? 'text-white' : 'text-gray-600'}>{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            {serviceType && (
              <div className="text-center mt-12 animate-fade-in">
                <button className="bg-gradient-to-r from-primary-500 to-warm-500 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all">Continue →</button>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

"use client";

import { Wine, UserCheck, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function AddOnServices() {
  const addOns = [
    {
      icon: <Wine className="w-12 h-12" />,
      title: "Bartenders",
      description: "Professional bartenders serving premium cocktails and refreshing mocktails to keep the party alive.",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=400&fit=crop"
    },
    {
      icon: <UserCheck className="w-12 h-12" />,
      title: "Waiters",
      description: "Experienced waitstaff to ensure your guests are served with warmth and efficiency throughout the event.",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&h=400&fit=crop"
    },
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: "Cleaners",
      description: "Our trained cleaning staff ensures your space is spotless after the celebration, so you can relax and enjoy.",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-warm-200 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary-200 rounded-full filter blur-3xl opacity-20 animate-pulse-slow" style={{animationDelay: '1s'}}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-down">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Services</h2>
          <h3 className="text-2xl font-semibold text-primary-500 mb-4">Add On Services</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            To make your event completely stress-free, we offer additional support services 
            that ensure everything runs smoothly. Add these to your booking at checkout for 
            a truly seamless experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {addOns.map((service, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-white to-cream-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group animate-scale-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {/* Image Header */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-primary-300 bg-white/20 backdrop-blur-sm rounded-full p-3">
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

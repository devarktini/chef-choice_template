"use client";

import { Utensils, Award, Crown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Services() {
  const services = [
    {
      icon: <Utensils className="w-12 h-12" />,
      title: "Casual",
      description: "Perfect for everyday gatherings and casual events",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop",
      color: "from-primary-100 to-primary-200"
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "Gourmet",
      description: "Elevated dining experiences with premium ingredients",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
      color: "from-warm-100 to-warm-200"
    },
    {
      icon: <Crown className="w-12 h-12" />,
      title: "Chef's Table",
      description: "Exclusive fine dining with personalized chef interaction",
      image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&h=400&fit=crop",
      color: "from-accent-100 to-accent-200"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-100 to-transparent rounded-full filter blur-3xl opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16 animate-slide-down">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group bg-white/10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 animate-scale-in card-shine"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-60`}></div>
                <div className="absolute bottom-4 left-4 text-white flex items-center space-x-2">
                  {service.icon}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center animate-fade-in">
          <Link href="/service" className="inline-block text-primary-600 font-semibold text-lg hover:text-primary-700 transition-all duration-300 hover:translate-x-2">
            View All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}

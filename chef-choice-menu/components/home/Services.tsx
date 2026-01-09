"use client";

import { Utensils, Award, Crown, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Services() {
  const services = [
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "Casual Dining",
      subtitle: "Comfort & Joy",
      description: "Perfect for everyday gatherings, cozy family dinners, and relaxed celebrations where comfort meets taste.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
      color: "primary",
      delay: 0.1
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Gourmet Experience",
      subtitle: "Elevated Taste",
      description: "A symphony of premium ingredients and artistic presentation for those who seek the extraordinary in every bite.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
      color: "warm",
      delay: 0.2
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Chef's Table",
      subtitle: "Ultimate Luxury",
      description: "The pinnacle of private dining. An exclusive journey curated personally by our master chefs at your service.",
      image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&h=600&fit=crop",
      color: "accent",
      delay: 0.3
    }
  ];

  return (
    <section className="py-24 bg-cream-50 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-100/30 rounded-full filter blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-warm-100/30 rounded-full filter blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 bg-primary-100/50 border border-primary-200 rounded-full text-primary-700 text-sm font-semibold tracking-wider uppercase mb-4"
          >
            <Star className="w-4 h-4 fill-current" />
            <span>Our Expertise</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900"
          >
            Culinary Services <span className="bg-gradient-to-r from-primary-600 to-warm-600 bg-clip-text text-transparent">Tailored For You</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg md:text-xl font-light"
          >
            From intimate dinners to grand celebrations, we bring the restaurant experience to your home.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: service.delay, duration: 0.6 }}
              className="group"
            >
              <div className="relative bg-white rounded-[2.5rem] hover:border-primary-600 hover:border-ring-4 backdrop-blur-sm overflow-hidden shadow-2xl shadow-primary-900/5 hover:shadow-primary-900/10 transition-all duration-500 flex flex-col h-full border border-white/50">
                {/* Image Section */}
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:via-black/40 transition-all duration-500"></div>

                  {/* Floating Icon */}
                  <div className="absolute top-6 right-6 p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-white transform group-hover:rotate-12 transition-transform duration-500">
                    {service.icon}
                  </div>

                  <div className="absolute bottom-6 left-8">
                    <p className="text-white/80 text-sm font-medium uppercase tracking-[0.2em] mb-1">{service.subtitle}</p>
                    <h3 className="text-3xl font-bold text-white leading-none">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-10 space-y-6 flex-grow flex flex-col justify-between">
                  <p className="text-gray-600 leading-relaxed text-lg font-light">
                    {service.description}
                  </p>

                  <Link href="/service" className="inline-flex items-center space-x-3 text-primary-600 font-bold group/btn">
                    <span className="relative">
                      Learn More
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover/btn:w-full transition-all duration-300"></span>
                    </span>
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                  </Link>
                </div>

                {/* Decorative Accent (Hidden Default) */}
                {/* <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary-500 to-warm-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div> */}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <Link href="/service">
            <button className="px-10 py-5 bg-white text-gray-900 border border-gray-200 rounded-full text-lg font-bold hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-500 shadow-xl hover:shadow-2xl active:scale-95">
              Discover All Our Offerings
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

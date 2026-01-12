"use client";

import { ChefHat, Play, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroProps {
  onHowItWorksClick?: () => void;
}

export default function Hero({ onHowItWorksClick }: HeroProps) {
  const images = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.png"];
  const [currentImage, setCurrentImage] = useState(0);

  // Auto-rotate images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative min-h-[70vh] flex items-center bg-[#FFFAF5] overflow-hidden">
      {/* Minimal Background Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-100/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-warm-100/30 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 w-full h-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center h-full">

          {/* Left Content */}
          <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white border border-primary-100 rounded-full shadow-sm"
            >
              <ChefHat className="w-5 h-5 text-primary-500" />
              <span className="text-primary-800 font-semibold text-sm tracking-wide uppercase">Premium Culinary Service</span>
            </motion.div>

            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight"
              >
                Taste the Art of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-warm-600">Celebration.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg lg:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed"
              >
                Elevate your events with our exquisite menu and world-class chefs. From intimate gatherings to grand banquets, we create unforgettable flavors.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Link href="/service?scrollTo=services">
                <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-lg font-bold hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group">
                  Book Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <button
                onClick={onHowItWorksClick}
                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full text-lg font-bold hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                How It Works
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-8 pt-4"
            >
              <div>
                <p className="text-3xl font-bold text-gray-900">500+</p>
                <p className="text-gray-500 text-sm">Events Served</p>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div>
                <p className="text-3xl font-bold text-gray-900">5.0</p>
                <p className="text-gray-500 text-sm">Rating</p>
              </div>
            </motion.div>
          </div>

          {/* Right Image Slider */}
          <div className="order-1 lg:order-2 w-full h-[400px] lg:h-[600px] relative flex items-center justify-center">
            <div className="relative w-full h-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[currentImage]}
                    alt="Delicious Food"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Gradient Overlay for Text Visibility (bottom) */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent"></div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentImage ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Badge (Decorative) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 md:bottom-20 md:-left-12 bg-white/90 backdrop-blur shadow-xl p-5 rounded-2xl z-30 hidden md:block border border-white/50"
            >
              <div className="flex -space-x-3 mb-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative">
                    <Image src={`/p${i}.jpg`} alt="User" fill className="object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
                  </div>
                ))}
              </div>
              <p className="font-semibold text-gray-900 text-sm">Join 10k+ Food Lovers</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

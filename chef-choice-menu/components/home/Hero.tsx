"use client";

import { ChefHat, Play } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Hero() {
  const [imageError, setImageError] = useState(false);

  const videoSrc =
  "https://res.cloudinary.com/dzvvb0z0h/video/upload/f_auto,q_auto/v1760203198/8626668-hd_1920_1080_25fps_xxekee.mp4";

// Poster image for LCP
const posterSrc =
  "https://res.cloudinary.com/dzvvb0z0h/image/upload/f_auto,q_auto/v1760203335/Screenshot_2025-10-11_225051_rk9kfd.png";


  return (
    <section className="relative bg-gradient-to-br from-cream-100 via-primary-50 to-warm-50 py-20 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-warm-200 rounded-full filter blur-3xl opacity-20 animate-pulse-slow" style={{animationDelay: '1s'}}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
          <div className="text-left animate-slide-right">
            <div className="flex items-center mb-6">
              <ChefHat className="w-16 h-16 text-primary-500 animate-bounce-slow" />
            </div>

            <p className="text-primary-600 font-semibold text-lg mb-4 animate-fade-in">
              Delightful Experiences, Anytime, Anywhere
            </p>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-slide-up">
              Welcome to <span className="text-primary-500">Chef Choice Menu</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
              Discover the finest dishes crafted with love
            </p>

            <Link href="/book-chef">
              <button className="bg-gradient-to-r from-primary-500 to-warm-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-scale-in pulse-glow">
                Explore Our Services
              </button>
            </Link>
          </div>

          {/* Right Image */}
          <div className="relative animate-slide-left">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl img-hover-zoom">
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop"
                alt="Professional Chef Cooking"
                width={800}
                height={600}
                className="w-full h-auto"
                onError={() => setImageError(true)}
              />
              {imageError && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-warm-200 flex items-center justify-center">
                  <ChefHat className="w-32 h-32 text-white opacity-50" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 animate-float">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary-500">500+</p>
                <p className="text-sm text-gray-600">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 animate-slide-up card-shine">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Flavors Made for Royalty
          </h2>
          <p className="text-gray-700 leading-relaxed text-center max-w-5xl mx-auto">
            Hosting an event shouldnt be stressful. At Chef Choice Menu, we make it effortless. 
            Choose from our all-inclusive catering packages designed for every occasion—whether its 
            a traditional North Indian wedding, a corporate lunch, or a festive Diwali dinner. 
            Our chefs craft menus that celebrate Indias diverse culinary heritage while also 
            offering global cuisines for modern tastes. With us, every event becomes an 
            unforgettable culinary journey.
          </p>
        </div>
      </div>
    </section>
  );
}

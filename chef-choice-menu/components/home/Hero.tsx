"use client";

import { ChefHat, Play } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useBookingModalStore } from '@/stores/bookingModalStore';

export default function Hero() {
  const [imageError, setImageError] = useState(false);
  const { openModal } = useBookingModalStore();
  const videoSrc =
    "https://res.cloudinary.com/dzvvb0z0h/video/upload/f_auto,q_auto/v1760203198/8626668-hd_1920_1080_25fps_xxekee.mp4";

  // Poster image for LCP
  const posterSrc =
    "https://res.cloudinary.com/dzvvb0z0h/image/upload/f_auto,q_auto/v1760203335/Screenshot_2025-10-11_225051_rk9kfd.png";


  return (
    <>
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-cream-50 via-primary-50 to-warm-50 overflow-hidden pt-20 pb-10">
        {/* Dynamic Background Elements */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary-200/40 rounded-full filter blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-warm-200/40 rounded-full filter blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-left space-y-8 animate-slide-right">
              <div className="inline-flex items-center space-x-3 px-4 py-2 bg-white/60 backdrop-blur-md border border-primary-200 rounded-full shadow-sm animate-fade-in">
                <ChefHat className="w-5 h-5 text-primary-500" />
                <span className="text-primary-700 font-medium text-sm tracking-wide uppercase">Delightful Experiences</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1] animate-slide-up">
                  Mastering the Art of <br />
                  <span className="bg-gradient-to-r from-primary-600 to-warm-600 bg-clip-text text-transparent">Flavorful Moments</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-xl animate-slide-up delay-100">
                  Celebrate with Choice, Cherish with Menu. We bring professional culinary excellence to your doorstep.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 animate-slide-up delay-200">
                <Link href="/service">
                  <button className="group relative px-8 py-4 bg-gradient-to-r from-primary-600 to-warm-600 text-white rounded-full text-lg font-semibold shadow-xl hover:shadow-primary-200/50 transition-all duration-300 active:scale-95 flex items-center space-x-2">
                    <span>Explore Services</span>
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <Play className="w-4 h-4 fill-current" />
                    </div>
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Image Grid - Refined */}
            <div className="relative h-[450px] md:h-[550px] lg:h-[600px] animate-slide-left hidden md:block">
              {/* Image 1 - Top Center Left (Main) */}
              <div className="absolute top-[5%] left-[5%] w-[50%] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl z-20 group hover:scale-[1.02] transition-transform duration-500">
                <Image
                  src="/1.jpg"
                  alt="Culinary Masterpiece"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Image 2 - Top Right */}
              <div className="absolute top-[15%] right-[5%] w-[40%] aspect-square rounded-[2rem] overflow-hidden shadow-2xl z-10 group hover:scale-[1.02] transition-transform duration-500 animate-float" style={{ animationDelay: '0.8s' }}>
                <Image
                  src="/2.jpg"
                  alt="Finest Ingredients"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              {/* Image 3 - Bottom Right */}
              <div className="absolute bottom-[5%] right-[10%] w-[45%] aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl z-30 group hover:scale-[1.02] transition-transform duration-500 animate-float" style={{ animationDelay: '0.4s' }}>
                <Image
                  src="/3.jpg"
                  alt="Table Service"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>

              {/* Image 4 - Bottom Left (Floating Card Style) */}
              <div className="absolute bottom-[20%] left-[-5%] w-[35%] aspect-square rounded-3xl overflow-hidden shadow-2xl z-40 group hover:scale-[1.02] transition-transform duration-500 border-4 border-white animate-float" style={{ animationDelay: '1.2s' }}>
                <Image
                  src="/4.png"
                  alt="Special Dish"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Stats Badge - Glassmorphic */}
              <div className="absolute top-[40%] right-[-2rem] bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl shadow-[0_20px_50px_rgba(229,168,85,0.2)] p-6 z-50 animate-bounce-slow">
                <div className="text-center">
                  <p className="text-4xl font-extrabold bg-gradient-to-r from-primary-600 to-warm-600 bg-clip-text text-transparent">500+</p>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Happy Clients</p>
                </div>
              </div>
            </div>

            {/* Mobile Image (Simplified) */}
            <div className="md:hidden relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/1.jpg"
                alt="Catering Service"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white font-bold text-2xl">Premium Catering Experiences</p>
              </div>
            </div>
          </div>

          {/* Minimal Description Card - integrated better */}
          <div className="mt-20 lg:mt-32 max-w-4xl mx-auto text-center animate-slide-up delay-300">
            <div className="inline-block h-px w-24 bg-gradient-to-r from-transparent via-primary-300 to-transparent mb-8"></div>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light italic">
              "Food isn't just part of a celebration—it is the celebration. We make every dish unforgettable, every moment delicious. Let's make your party the one they talk about forever."
            </p>
          </div>
        </div>
      </section>

    </>
  );
}

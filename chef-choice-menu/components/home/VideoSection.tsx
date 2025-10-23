"use client";

import { Play, Volume2 } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-br from-earth-50 to-cream-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-slide-down">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Experience Culinary Excellence
          </h2>
          <p className="text-xl text-gray-600">Watch how we create magical moments</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group animate-scale-in">
            {/* Video Thumbnail */}
            <div className="relative aspect-video bg-gradient-to-br from-primary-300 to-warm-300">
              <Image
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=675&fit=crop"
                alt="Chef Cooking Video"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300"></div>

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-white/90 hover:bg-white rounded-full p-8 transform hover:scale-110 transition-all duration-300 shadow-2xl group-hover:shadow-3xl animate-pulse-slow"
                >
                  {isPlaying ? (
                    <Volume2 className="w-16 h-16 text-primary-500" />
                  ) : (
                    <Play className="w-16 h-16 text-primary-500 ml-2" />
                  )}
                </button>
              </div>

              {/* Video Stats Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg">
                  <p className="text-sm text-gray-600">Featured Video</p>
                  <p className="text-lg font-bold text-primary-500">Our Chef in Action</p>
                </div>
                <div className="bg-primary-500 rounded-full px-6 py-3 shadow-lg">
                  <p className="text-white font-semibold">▶ 2:45</p>
                </div>
              </div>
            </div>
          </div>

          {/* Video Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow animate-slide-up">
              <div className="text-3xl font-bold text-primary-500 mb-2">150+</div>
              <p className="text-gray-600">Professional Chefs</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow animate-slide-up" style={{animationDelay: '0.1s'}}>
              <div className="text-3xl font-bold text-warm-500 mb-2">5000+</div>
              <p className="text-gray-600">Events Catered</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="text-3xl font-bold text-accent-500 mb-2">15+</div>
              <p className="text-gray-600">Cities Covered</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

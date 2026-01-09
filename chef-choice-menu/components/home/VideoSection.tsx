"use client";

import { Play, Volume2, Users, Calendar, MapPin, Sparkles } from 'lucide-react';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const videoSrc =
    "https://res.cloudinary.com/dzvvb0z0h/video/upload/f_auto,q_auto/v1760203198/8626668-hd_1920_1080_25fps_xxekee.mp4";

  const posterSrc =
    "https://res.cloudinary.com/dzvvb0z0h/image/upload/f_auto,q_auto/v1760203335/Screenshot_2025-10-11_225051_rk9kfd.png";

  const stats = [
    { icon: <Users className="w-5 h-5" />, label: "150+", sublabel: "Master Chefs", color: "bg-primary-500", position: "top-[10%] left-[-10%]", delay: 0.2 },
    { icon: <Calendar className="w-5 h-5" />, label: "5000+", sublabel: "Events Catered", color: "bg-warm-500", position: "bottom-[20%] right-[-12%]", delay: 0.4 },
    { icon: <MapPin className="w-5 h-5" />, label: "15+", sublabel: "Cities Covered", color: "bg-accent-500", position: "top-[40%] right-[-15%]", delay: 0.6 },
  ];

  return (
    <section ref={containerRef} className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary-900/20 rounded-full filter blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-warm-900/20 rounded-full filter blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6 mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center space-x-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-primary-400 text-sm font-semibold tracking-widest uppercase"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Witness Perfection</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white max-w-4xl leading-tight"
          >
            The Art of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-warm-400 to-accent-400">Culinary Performance</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 text-lg md:text-xl font-light max-w-2xl"
          >
            A cinematic glimpse into the passion and precision behind every plate we serve.
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto relative px-4 lg:px-0">
          {/* Floating Stats - Desktop Only */}
          <div className="hidden lg:block">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: stat.delay, duration: 0.8 }}
                className={`absolute ${stat.position} z-30 group`}
              >
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[2rem] shadow-2xl flex items-center space-x-4 group-hover:bg-white/15 transition-all duration-300">
                  <div className={`${stat.color} p-3 rounded-2xl text-white shadow-lg shadow-white/5 group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-white leading-none mb-1">{stat.label}</p>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">{stat.sublabel}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            style={{ y }}
            className="relative rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] group border border-white/10"
          >
            {/* Video Container */}
            <div className="relative aspect-video bg-[#111]">
              {!videoError && (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  poster={posterSrc}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                  onError={() => setVideoError(true)}
                >
                  <source src={videoSrc} type="video/mp4" />
                </video>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 group-hover:from-black/40 transition-all duration-500"></div>

              {/* Enhanced Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="relative z-20"
                >
                  <div className="absolute inset-0 bg-primary-500 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                  <div className="relative bg-white text-gray-900 rounded-full p-8 shadow-2xl flex items-center justify-center">
                    {isPlaying ? (
                      <Volume2 className="w-10 h-10" />
                    ) : (
                      <Play className="w-10 h-10 ml-1 fill-current" />
                    )}
                  </div>

                  {/* Rotating Border (Visible on hover) */}
                  <div className="absolute inset-[-10px] border-2 border-dashed border-white/20 rounded-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.button>
              </div>

              {/* Cinematic Labels */}
              <div className="absolute bottom-10 left-10 hidden md:block">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-px bg-primary-400"></div>
                  <p className="text-white font-medium tracking-[0.3em] uppercase text-sm">Now Playing: Our Passion</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Stats (Grid Interface) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 lg:hidden">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center space-x-4">
              <div className={`${stat.color} p-3 rounded-2xl text-white`}>
                {stat.icon}
              </div>
              <div className="text-left">
                <p className="text-xl font-bold text-white">{stat.label}</p>
                <p className="text-sm text-gray-400">{stat.sublabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

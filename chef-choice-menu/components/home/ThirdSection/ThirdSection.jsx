"use client";

import {
  Pizza, Heart, Send, ThumbsUp, Sparkles, ChefHat, Timer,
  Globe, ShieldCheck, CreditCard, Users2, CalendarCheck,
  Utensils, SearchCheck
} from "lucide-react";
import { motion } from "framer-motion";

const ThirdSection = () => {
  const features = [
    { title: "Personalized Chef Matching", icon: Users2, color: "text-primary-500" },
    { title: "Customizable Menu Planning", icon: Utensils, color: "text-warm-500" },
    { title: "Seamless Event Scheduling", icon: CalendarCheck, color: "text-accent-500" },
    { title: "Premium Ingredient Sourcing", icon: Sparkles, color: "text-primary-600" },
    { title: "Real-Time Booking Status", icon: Timer, color: "text-warm-600" },
    { title: "Secure Payment Integration", icon: CreditCard, color: "text-accent-600" },
    { title: "Verified Chef Profiles", icon: ShieldCheck, color: "text-primary-500" },
    { title: "Dedicated Concierge Support", icon: Heart, color: "text-red-500" },
  ];

  return (
    <section className="relative bg-[#FFFAF5] min-h-screen py-10 md:py-24 overflow-hidden font-sans">
      {/* Soft Background Accents (Brand Colors) */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] pointer-events-none opacity-40">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[5%] left-[5%] w-[70%] h-[70%] bg-primary-200 rounded-full mix-blend-multiply filter blur-[60px] md:blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[15%] right-[5%] w-[60%] h-[60%] bg-warm-200 rounded-full mix-blend-multiply filter blur-[50px] md:blur-[90px]"
        />
      </div>

      <div className="mb-6 lg:mb-10 text-center lg:text-center">
        <motion.h2
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight"
        >
          Effortless <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-warm-500">Booking</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 text-base md:text-lg mx-auto lg:ml-auto lg:mr-0"
        >
          Manage your entire culinary experience with ease, from chef selection to distinct menu planning.
        </motion.p>
      </div>

      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

        {/* LEFT SIDE: Image and Floating Icons */}
        <div className="relative w-full lg:w-1/2 flex justify-center items-center order-2 lg:order-1 mt-8 lg:mt-0">
          <div className="relative w-[280px] h-[350px] md:w-[550px] md:h-[800px]">
            {/* Main Image Container with Decorative Circles */}
            <div className="absolute inset-0 bg-primary-50 rounded-full opacity-30 animate-pulse-slow"></div>

            {/* Chef/User Image */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-full z-20 flex items-center justify-center pt-4 md:pt-8"
            >
              <img
                src="https://res.cloudinary.com/dzvvb0z0h/image/upload/v1758044068/medium-shot-man-with-delicious-muffins_noukys.png"
                alt="Professional Culinary Experience"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
              />
            </motion.div>

            {/* Floating Icons with Lines (Themed Colors) */}
            {/* Heart */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 md:-top-10 md:-left-12 bg-white/80 backdrop-blur-md p-3 md:p-6 rounded-[2rem] shadow-[0_10px_30px_rgba(252,112,0,0.15)] border border-white/50 z-30 flex items-center gap-2"
            >
              <Heart className="w-5 h-5 md:w-10 md:h-10 text-primary-500 fill-current" />
            </motion.div>

            {/* Send */}
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-8 -left-6 md:bottom-12 md:-left-16 bg-white/80 backdrop-blur-md p-3 md:p-6 rounded-[2rem] shadow-[0_10px_30px_rgba(252,112,0,0.1)] border border-white/50 z-30"
            >
              <Send className="w-5 h-5 md:w-10 md:h-10 text-warm-500 fill-current -rotate-12" />
            </motion.div>

            {/* ThumbsUp */}
            <motion.div
              animate={{ x: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-16 -right-6 md:bottom-24 md:-right-10 bg-white/80 backdrop-blur-md p-3 md:p-6 rounded-[2rem] shadow-[0_10px_30px_rgba(252,112,0,0.15)] border border-white/50 z-30"
            >
              <ThumbsUp className="w-5 h-5 md:w-10 md:h-10 text-accent-500 fill-current" />
            </motion.div>

            {/* Context Card (Themed) */}
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute top-4 right-0 md:top-10 md:-right-8 bg-[#2D3748] p-4 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl z-30 border border-white/5"
            >
              <div className="flex flex-col gap-2 w-12 md:w-24">
                <div className="h-1.5 md:h-2 bg-primary-400/30 rounded-full w-full"></div>
                <div className="h-1.5 md:h-2 bg-warm-400/30 rounded-full w-3/4"></div>
                <div className="h-1.5 md:h-2 bg-white/10 rounded-full w-1/2 mt-2"></div>
              </div>
            </motion.div>

            {/* Curved Dashed Paths - Hide on mobile if cluttered */}
            <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-10 opacity-20">
              <path d="M40,60 Q180,40 280,140" fill="none" stroke="#FC7000" strokeWidth="2" strokeDasharray="6,6" />
              <path d="M400,350 Q300,500 120,550" fill="none" stroke="#FC7000" strokeWidth="2" strokeDasharray="6,6" />
              <path d="M60,450 Q120,280 180,180" fill="none" stroke="#FC7000" strokeWidth="2" strokeDasharray="6,6" />
            </svg>
          </div>
        </div>

        {/* RIGHT SIDE: Pill Features (Brand Theme) */}
        <div className="w-full lg:w-[42%] flex flex-col gap-4 order-1 lg:order-2">


          <div className="flex flex-col gap-5">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, x: -10 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="relative w-full  cursor-pointer"
              >
                {/* Floating Pill Container - Brand Gradient */}
                <div className={`relative w-full rounded-full bg-gradient-to-r from-primary-500 to-warm-500  py-4 px-8 flex  ${index % 2 === 0 ? 'items-center justify-start bg-gradient-to-l from-[#FFFAF5]  via-warm-500 to-[70%] to-white' : 'items-center justify-end bg-gradient-to-r from-white from-[20%] via-warm-500 to-warm-600'}  overflow-hidden`}>

                  {/* Subtle Shimmer Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

                  {/* Icon Container (Left) */}

                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full shrink-0 group-hover:bg-white/30 transition-colors">
                    <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>

                  {/* Text (Center/Right) */}
                  <span className="text-white font-bold text-base md:text-lg tracking-wide  text-right ml-4">
                    {feature.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThirdSection;
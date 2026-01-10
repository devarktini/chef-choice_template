"use client";

import { Quote, Star, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Avdhesh Gupta",
      role: "Anniversary Celebration",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      text: "We hired a private chef from Chef Choice Menu for our anniversary. The food was exquisite and the service was impeccable. Our guests were thoroughly impressed. Highly recommended!",
      rating: 5
    },
    {
      name: "Sarah Jenkins",
      role: "Corporate Retreat",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      text: "The professionalism shown by the team was outstanding. They handled our corporate lunch for 50 people seamlessly. The customized menu was a hit!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Birthday Bash",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      text: "I wanted something special for my 40th birthday. The chef curated a 7-course tasting menu that blew everyone away. It was a night to remember.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Wedding Reception",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
      text: "From the initial tasting to the final service, everything was perfect. Chef Choice Menu made our intimate wedding reception incredibly special.",
      rating: 5
    },
    {
      name: "David Kim",
      role: "Family Reunion",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      text: "Managing dietary restrictions for a large family is tough, but the chef handled it with ease. Everyone ate well and felt included. Thank you!",
      rating: 4
    }
  ];

  // Auto-slide logic
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000); // Change slide every 4 seconds
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-cream-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/40 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-warm-100/40 rounded-full blur-[80px] -z-10 -translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-600 font-bold tracking-widest text-sm uppercase bg-primary-50 px-4 py-2 rounded-full inline-block"
          >
            Client Love
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900"
          >
            Memorable Culinary <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-warm-600">Moments</span>
          </motion.h2>
        </div>

        {/* Carousel Container */}
        <div className="max-w-6xl mx-auto relative">

          {/* Desktop: 3-Card view / Mobile: 1-Card view */}
          <div className="overflow-hidden relative h-[500px] md:h-[400px]">
            {testimonials.map((testimonial, i) => {
              // Calculate position relative to current index
              let position = (i - index + testimonials.length) % testimonials.length;

              // Determine styles based on position (Active, Next, Previous, Hidden)
              let style = "opacity-0 scale-90 translate-x-[100%] z-0 hidden"; // Default hidden

              if (position === 0) {
                style = "opacity-100 scale-100 translate-x-0 z-20"; // Active
              } else if (position === 1) {
                style = "md:opacity-60 md:scale-95 md:translate-x-[50%] md:z-10 bg-white/50 blur-[1px] md:block hidden"; // Next
              } else if (position === testimonials.length - 1) {
                style = "md:opacity-60 md:scale-95 md:translate-x-[-50%] md:z-10 bg-white/50 blur-[1px] md:block hidden"; // Prev
              }

              return (
                <div
                  key={i}
                  className={`absolute inset-0 m-auto w-full md:w-[600px] transition-all duration-700 ease-in-out ${style}`}
                >
                  <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 h-full flex flex-col justify-center relative">
                    <Quote className="absolute top-8 right-8 w-16 h-16 text-primary-100/50 rotate-180" />

                    <div className="flex items-center gap-6 mb-8">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-lg border-2 border-primary-100 p-1">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">{testimonial.name}</h4>
                        <p className="text-primary-600 text-sm font-medium">{testimonial.role}</p>
                        <div className="flex gap-1 mt-1">
                          {[...Array(testimonial.rating)].map((_, starI) => (
                            <Star key={starI} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-lg italic leading-relaxed relative z-10">
                      {testimonial.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Manual Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="p-3 rounded-full bg-white shadow-md hover:bg-primary-50 text-gray-600 hover:text-primary-600 transition-colors"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-primary-500' : 'w-2 bg-gray-300 hover:bg-primary-300'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setIndex((prev) => (prev + 1) % testimonials.length)}
              className="p-3 rounded-full bg-white shadow-md hover:bg-primary-50 text-gray-600 hover:text-primary-600 transition-colors"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

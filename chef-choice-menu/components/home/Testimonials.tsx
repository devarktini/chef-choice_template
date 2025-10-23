"use client";

import { Quote, Star } from 'lucide-react';
import Image from 'next/image';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Avdhesh Gupta",
      role: "Anniversary Celebration",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      text: "We hired a private chef from Chef Choice Menu for our anniversary. The food was exquisite and the service was impeccable. Our guests were thoroughly impressed. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-100 to-transparent rounded-full filter blur-3xl opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-down">
          <p className="text-primary-600 font-semibold text-lg mb-2">IMPRESSIONS</p>
          <h2 className="text-4xl font-bold text-gray-900">
            What Our Customers Are Saying
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-cream-50 to-primary-50 p-8 md:p-12 rounded-3xl shadow-2xl animate-scale-in"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Image */}
                <div className="flex-shrink-0">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-xl ring-4 ring-white">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <Quote className="w-12 h-12 text-primary-400 mb-4" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary-500 text-primary-500" />
                    ))}
                  </div>

                  <p className="text-lg text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>

                  <div>
                    <p className="text-gray-900 font-bold text-xl">-- {testimonial.name}</p>
                    <p className="text-primary-500 font-medium">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

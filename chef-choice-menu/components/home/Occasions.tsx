"use client";

import { Cake, Heart, PartyPopper, Coffee, Gift, Users, Baby, Home, Church, Music, Flame, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Occasions() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const occasions = [
    {
      icon: <Cake className="w-8 h-8" />,
      title: "Birthday",
      description: "Celebrate birthdays at home with our private chefs.",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop",
      color: "from-pink-400 to-pink-500"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Anniversary",
      description: "Make anniversaries unforgettable with gourmet meals.",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop",
      color: "from-red-400 to-red-500"
    },
    {
      icon: <PartyPopper className="w-8 h-8" />,
      title: "Party",
      description: "Host an unforgettable party with our chef-on-demand service.",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop",
      color: "from-purple-400 to-purple-500"
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Kitty Party",
      description: "Enjoy fun-filled kitty parties with delicious catering.",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop",
      color: "from-amber-400 to-amber-500"
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "High Tea",
      description: "Elevate your high tea gatherings with gourmet treats.",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
      color: "from-teal-400 to-teal-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Inviting Guests",
      description: "Host guests at home with ease and style.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
      color: "from-blue-400 to-blue-500"
    },
    {
      icon: <Baby className="w-8 h-8" />,
      title: "Baby Shower",
      description: "Celebrate your baby shower with tasty and safe meals.",
      image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=300&fit=crop",
      color: "from-cyan-400 to-cyan-500"
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Weekend Chill",
      description: "Make your weekends relaxing with home chef services.",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
      color: "from-green-400 to-green-500"
    },
    {
      icon: <Church className="w-8 h-8" />,
      title: "Wedding Ceremony",
      description: "Indulge in handcrafted wedding menus.",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop",
      color: "from-rose-400 to-rose-500"
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: "Bachelor Party",
      description: "Throw epic bachelor parties with customized catering.",
      image: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=400&h=300&fit=crop",
      color: "from-indigo-400 to-indigo-500"
    },
    {
      icon: <Flame className="w-8 h-8" />,
      title: "Pooja Ceremony",
      description: "Enhance pooja ceremonies with traditional offerings.",
      image: "https://images.unsplash.com/photo-1662720868850-e60cefb03201?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1473",
      color: "from-orange-400 to-orange-500"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Other Occasions",
      description: "Any special occasion deserves culinary excellence.",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop",
      color: "from-yellow-400 to-yellow-500"
    }
  ];

  // Calculate items per view based on screen size
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1; // Mobile
      if (window.innerWidth < 1024) return 2; // Tablet
      return 4; // Desktop
    }
    return 4;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  // Update items per view on resize
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
      setItemsPerView(getItemsPerView());
    });
  }

  const maxIndex = Math.max(0, occasions.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 via-cream-50 to-warm-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header with View All Link */}
        <div className="flex flex-col md:flex-row justify-between  mx-20 items-center mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-slide-down">
              Our Services
            </h2>
            {/* <p className="text-gray-600 max-w-2xl animate-slide-down" style={{ animationDelay: '0.1s' }}>
              From intimate birthdays to grand weddings, Chef Choice Menu crafts culinary experiences
              that make every celebration memorable.
            </p> */}
          </div>
          <Link
            href="/service"
            className="flex items-center gap-2  text-orange-600 rounded-full font-semibold hover:text-orange-800 hover:scale-110 hover:underline  transition-all duration-300"
          >
            View All
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Slider Container */}
        <div className="relative max-w-8xl mx-auto px-12 md:px-16">
          {/* Left Navigation Button */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 md:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-50 hover:scale-110'
              }`}
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
          </button>

          {/* Slider Content */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                gap: itemsPerView === 1 ? '0px' : '18px'
              }}
            >
              {occasions.map((occasion, index) => (
                <Link
                  href={'/contact'}
                  key={index}
                  className="flex-shrink-0 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:-translate-y-2"
                  style={{
                    width: itemsPerView === 1
                      ? '100%'
                      : `calc((100% - ${(itemsPerView - 1) * 24}px) / ${itemsPerView})`
                  }}
                >
                  {/* Image with Icon Overlay */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={occasion.image}
                      alt={occasion.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className={`absolute top-3 right-3 bg-gradient-to-r ${occasion.color} text-white p-2 rounded-full shadow-lg`}>
                      {occasion.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors">
                      {occasion.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {occasion.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Navigation Button */}
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 md:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 ${currentIndex >= maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-50 hover:scale-110'
              }`}
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'w-8 bg-orange-600' : 'w-2 bg-orange-300 hover:bg-orange-400'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

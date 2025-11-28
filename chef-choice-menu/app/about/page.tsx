import { Clock, MapPin, Users, Award, Target, Utensils, Heart, Star, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function AboutPage() {
  return (
    <>
      <AnimatedBackground />
      <main className="min-h-screen pt-20 relative z-10">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-slide-down">
              <p className="text-orange-600 font-semibold text-lg mb-2 flex items-center justify-center gap-2">
                <Heart className="w-5 h-5" />
                OUR CULINARY JOURNEY
              </p>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">About ChefChoiceMenu</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Connecting you with India's finest culinary talents for unforgettable celebrations
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="animate-slide-right space-y-6">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Who We Are</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p className="text-lg">
                    At <span className="font-bold text-orange-600">ChefChoiceMenu</span>, we believe that great food is the heart of every celebration. Whether you're hosting an intimate house gathering or a grand, luxurious party, we're here to make it unforgettable.
                  </p>
                  
                  <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
                    <p className="text-gray-700 italic">
                      "We proudly connect customers with professional chefs and caterers across India—<span className="font-bold text-orange-600">1000+ verified vendors</span> and <span className="font-bold text-orange-600">500+ talented chefs</span> who bring culinary excellence to your table."
                    </p>
                  </div>

                  <p>
                    From traditional Indian flavors to exotic international cuisines, we have specialists who craft each dish with love, precision, and passion.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  {['Indian Cuisine', 'International', 'Wedding Specialists', 'Corporate Events'].map((specialty, i) => (
                    <span key={i} className="bg-white px-4 py-2 rounded-full text-sm font-medium text-orange-600 border border-orange-200 flex items-center gap-2">
                      <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative animate-slide-left">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                  <Image
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&h=600&fit=crop"
                    alt="Our Team"
                    width={800}
                    height={600}
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Floating Stats Card */}
                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">1000+</p>
                        <p className="text-sm text-gray-600">Vendors</p>
                      </div>
                      <div className="w-px h-8 bg-gray-300"></div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">500+</p>
                        <p className="text-sm text-gray-600">Chefs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Mission */}
                <div className="animate-slide-up">
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-8 text-white relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                      <Target className="w-12 h-12 text-white/20" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <Target className="w-6 h-6" />
                      Our Mission
                    </h3>
                    <p className="text-lg leading-relaxed">
                      Our journey is rooted in the joy of serving—matching the right chef or caterer with your taste, theme, and budget. We're more than just a platform; we're your event partner.
                    </p>
                  </div>
                </div>

                {/* Vision */}
                <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
                  <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl p-8 text-white relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                      <Award className="w-12 h-12 text-white/20" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <Award className="w-6 h-6" />
                      Our Vision
                    </h3>
                    <p className="text-lg leading-relaxed">
                      To be India's most trusted culinary partner, transforming every celebration into an unforgettable experience through exceptional food and seamless service.
                    </p>
                  </div>
                </div>
              </div>

              {/* Full Story Section */}
              {/* <div className="mt-16 animate-slide-up" style={{animationDelay: '0.2s'}}>
                <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
                  <h3 className="text-3xl font-bold text-center mb-8 text-gray-900">Our Complete Story</h3>
                  <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                    <p>
                      From choosing the perfect food menu to finding an ideal party venue, we take care of everything, letting you savor life's meaningful moments with effortless style.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-8 mt-8">
                      <div className="space-y-4">
                        <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          <Utensils className="w-5 h-5 text-orange-500" />
                          What We Offer
                        </h4>
                        <ul className="space-y-3">
                          {[
                            'Professional Chef Services',
                            'Complete Catering Solutions',
                            'Venue Selection Assistance',
                            'Menu Planning & Customization',
                            'Event Coordination Support',
                            'Quality Assurance'
                          ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          <Users className="w-5 h-5 text-orange-500" />
                          Why Choose Us
                        </h4>
                        <ul className="space-y-3">
                          {[
                            '1000+ Verified Vendors',
                            '500+ Expert Chefs',
                            'Pan-India Service Network',
                            'Stringent Quality Checks',
                            'Customized Solutions',
                            '24/7 Customer Support'
                          ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="text-center mt-8 pt-8 border-t border-gray-200">
                      <p className="text-2xl font-light text-gray-900 italic">
                        At ChefChoiceMenu, every meal tells a story. Let's make yours delicious.
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { num: "1000+", label: "Verified Vendors", icon: Users },
                { num: "500+", label: "Professional Chefs", icon: Utensils },
                { num: "50+", label: "Cities Across India", icon: MapPin },
                { num: "10k+", label: "Events Served", icon: Award }
              ].map((stat, i) => (
                <div key={i} className="animate-scale-in" style={{animationDelay: `${i*0.1}s`}}>
                  <div className="flex justify-center mb-4">
                    <stat.icon className="w-8 h-8 text-white/80" />
                  </div>
                  <p className="text-4xl md:text-5xl font-bold mb-2">{stat.num}</p>
                  <p className="text-lg text-white/90">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-slide-down">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive culinary solutions for every occasion
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { 
                  title: "Private Chef at Home", 
                  img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=400&fit=crop",
                  description: "Expert chefs for intimate dining experiences"
                },
                { 
                  title: "Wedding Catering", 
                  img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop",
                  description: "Memorable feasts for your special day"
                },
                { 
                  title: "Corporate Events", 
                  img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
                  description: "Professional catering for business gatherings"
                },
                { 
                  title: "Outdoor Catering", 
                  img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop",
                  description: "Perfect solutions for outdoor celebrations"
                }
              ].map((service, i) => (
                <div key={i} className="group animate-scale-in" style={{animationDelay: `${i*0.1}s`}}>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white group-hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <Image 
                        src={service.img} 
                        alt={service.title} 
                        width={600} 
                        height={400} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4 flex-1">
                        {service.description}
                      </p>
                      <button className="flex items-center gap-2 text-orange-600 font-semibold group-hover:gap-3 transition-all">
                        Learn More
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto animate-slide-up">
              <h2 className="text-4xl font-bold mb-6">Ready to Create Unforgettable Memories?</h2>
              <p className="text-xl mb-8 text-orange-100">
                Let's work together to make your next celebration truly special with exceptional food and seamless service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-3">
                  Book a Consultation
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors">
                  View Our Chefs
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
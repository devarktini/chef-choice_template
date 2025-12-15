'use client';
import { Heart, Sparkles, Users, Building, Home, Star, Award, ChevronRight, ChefHat, Utensils, UtensilsCrossed, Wine, X } from 'lucide-react';
import Image from 'next/image';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProviderService } from '@/services/providerService';
import { ServiceProviderProfile } from '@/types/auth';

export default function ServicePage() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [providers, setProviders] = useState<ServiceProviderProfile[]>([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const data = await ProviderService.searchProviders();
        if (Array.isArray(data)) {
          setProviders(data);
        } else if (data && typeof data === 'object' && 'results' in data && Array.isArray((data as any).results)) {
          setProviders((data as any).results);
        } else {
          console.warn('Unexpected providers data structure:', data);
          setProviders([]);
        }
      } catch (error) {
        console.error('Failed to fetch providers', error);
        setProviders([]);
      }
    };
    fetchProviders();
  }, []);

  const services = [
    {
      icon: Heart,
      title: "Wedding",
      subtitle: "Your Wedding, Plate by Plate, Memory by Memory",
      description: "From the first haldi splash to the final farewell feast, ChefChoiceMenu is with you at every step of your wedding journey.",
      fullDescription: [
        "Whether it's a mehndi function, haldi ceremony, family get-together, or the grand wedding day—our chefs and caterers serve joy, flavor, and love at every celebration.",
        "Hire a professional chef or catering team from us and let your taste be the talk of the town. With curated menus, live stations, and specialty dishes from all over India and beyond, we make sure your guests leave with hearts full and tastebuds delighted.",
        "We don't just serve food—we help you create memories. Because your wedding deserves nothing less than magic."
      ]
    },
    {
      icon: Sparkles,
      title: "Cooktail",
      subtitle: "Where Taste Meets Togetherness",
      description: "A cocktail party is more than just a gathering—it's a moment of sparkle, laughter, and connection.",
      fullDescription: [
        "Let your evening shimmer with ChefChoiceMenu's exquisite cocktail catering. Whether it's a pre-wedding bash, corporate event, or celebratory night with friends, we bring flavor, flair, and finesse to every glass and plate.",
        "With gorgeously crafted canapé menus, live mixology counters, and an array of global and Indian gourmet bites, we elevate your evening into a vibrant, unforgettable affair. Our expert chefs and premium bartenders serve up a blend of creativity and class that keeps the conversations flowing and spirits high.",
        "From signature cocktails to crispy bites and gourmet delights—we give your cocktail party the perfect buzz. Because every sip and bite should feel like a celebration."
      ]
    },
    {
      icon: Building,
      title: "Corporate Theme",
      subtitle: "Fuel Your Teams. Impress Your Guests. Inspire with Flavor.",
      description: "Whether it's a high-stakes meeting, a festive office feast, or a milestone celebration, food plays a vital role.",
      fullDescription: [
        "At ChefChoiceMenu, we specialize in delivering top-notch culinary experiences that align with your brand, purpose, and people.",
        "From elegant buffets and team lunches to themed food stations and executive platters—our expert chefs and curated menus ensure that every bite strengthens connection and leaves a lasting impression. We understand the importance of punctuality, presentation, and professionalism—so you can focus on business while we take care of the feast.",
        "Because great food fuels great ideas. Let ChefChoiceMenu make your next corporate event not just successful, but truly memorable."
      ]
    },
    {
      icon: Home,
      title: "Private Party",
      subtitle: "Intimate Moments, Extraordinary Flavors",
      description: "Every private party has a story—an anniversary, a birthday bash, a reunion, or simply a night to celebrate life.",
      fullDescription: [
        "At ChefChoiceMenu, we make your story unforgettable with flavors that speak louder than words.",
        "Host a stunning private gathering at home or a cozy venue of your choice, and we'll bring the magic of restaurant-style dining right to your doorstep. From live cooking counters to premium finger foods and gourmet meals, our chefs craft dishes that delight every palate.",
        "Pair it with our expert service, dazzling presentation, and customizable menus—and your private party becomes the event of the season. Small gatherings, big memories. With ChefChoiceMenu, every bite says, 'This moment matters.'"
      ]
    },
    {
      icon: Star,
      title: "Niche Event",
      subtitle: "Curated Culinary Experiences for Your Unique Moments",
      description: "Some celebrations are rare, personal, and truly one-of-a-kind—just like your taste.",
      fullDescription: [
        "Whether it's a luxury brand launch, an elite chef's table dinner, an influencer brunch, or an intimate themed soirée, ChefChoiceMenu brings unmatched expertise to niche events that demand finesse.",
        "We create bespoke menus, interactive food experiences, and stunning live stations—crafted to match your event's theme, energy, and audience. Our specialized chefs understand the nuance of culinary artistry, turning every dish into a story that complements your event's exclusivity.",
        "Because extraordinary occasions deserve extraordinary flavor. Let ChefChoiceMenu elevate your niche event into a moment of magic and memory."
      ]
    },
    {
      icon: Award,
      title: "Institutional Catering",
      subtitle: "Nourishing Minds. Fueling Futures.",
      description: "From schools to corporate campuses and healthcare facilities, quality food plays a vital role in well-being.",
      fullDescription: [
        "At ChefChoiceMenu, we understand the responsibility of institutional catering—where consistency, nutrition, hygiene, and taste must go hand in hand.",
        "We provide customized, wholesome menus designed for students, professionals, or patients—ensuring every meal is healthy, satisfying, and prepared with utmost care. With a network of skilled chefs and reliable partners, we deliver meals at scale without compromising on freshness or flavor.",
        "Whether daily meals, event lunches, or nutritional diet plans—ChefChoiceMenu is your trusted partner in building environments where people feel cared for and energized. Because great food isn't just served—it supports growth and inspires excellence."
      ]
    }
  ];

  return (
    <>
      <AnimatedBackground />
      <main className="min-h-screen pt-20 relative z-10">
        <section className="bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Services</h1>
            <div className="inline-block bg-white px-8 py-6 rounded-full shadow-xl mb-8">
              <p className="text-5xl font-bold text-orange-600">5+</p>
              <p className="text-gray-700">Years of Experience</p>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-4xl mx-auto mb-12">
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&h=400&fit=crop"
                alt="Chef Service"
                width={1200}
                height={400}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-12">
                <div className="text-left text-white">
                  <h2 className="text-4xl font-bold mb-4">Dine Differently</h2>
                  <p className="text-xl">Private Chefs at Your Service</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-orange-600">Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the perfect culinary experience for every occasion
            </p>
          </div>

          {/* Services Grid - Card Style */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-orange-100">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-orange-600 font-semibold mb-3">{service.subtitle}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </div>

                <button
                  onClick={() => setSelectedService(service)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Modal for Full Description */}
          {selectedService && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-8">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                        {selectedService.icon && <selectedService.icon className="w-8 h-8 text-orange-600" />}
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">{selectedService?.title}</h2>
                        <p className="text-orange-600 font-semibold text-lg">{selectedService.subtitle}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedService(null)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Full Description */}
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    {selectedService?.fullDescription.map((paragraph: any, index: any) => (
                      <p key={index} className="text-lg">{paragraph}</p>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-4 mt-8">
                    <Link href="/contact">
                      <button

                        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                      >
                        Book Now
                      </button>
                    </Link>
                    <button
                      onClick={() => setSelectedService(null)}
                      className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Services We Offer</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {[
                { icon: <ChefHat className="w-8 h-8" />, title: "Private Chefs", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=400&fit=crop" },
                { icon: <Utensils className="w-8 h-8" />, title: "Catering Services", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop" },
                { icon: <UtensilsCrossed className="w-8 h-8" />, title: "Chef's Table", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop" },
                { icon: <Wine className="w-8 h-8" />, title: "Bartender Services", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=400&fit=crop" }
              ].map((s, i) => (
                <div key={i} className="group rounded-3xl shadow-xl overflow-hidden">
                  <div className="relative h-64">
                    <Image
                      src={s.img}
                      alt={s.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-3">
                        {s.icon}
                      </div>
                      <h3 className="text-2xl font-bold">{s.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* New Service Providers Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Our Service Providers</h2>
            <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
              Meet our top-rated professionals ready to make your event extraordinary
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {providers.map((provider) => (
                <Link key={provider.id} href={`/service-provider/${provider.id}`}>
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-gray-100 h-full flex flex-col">
                    <div className="h-32 bg-gradient-to-r from-orange-100 to-amber-100 relative">
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                        <div className="w-16 h-16 rounded-full bg-white p-1 shadow-lg">
                          <div className="w-full h-full rounded-full bg-orange-50 flex items-center justify-center text-orange-600 font-bold text-xl">
                            {provider.company_name ? provider.company_name.charAt(0).toUpperCase() : <ChefHat className="w-8 h-8" />}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-10 p-6 flex-1 flex flex-col text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">
                        {provider.company_name || 'Individual Provider'}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-1">
                        {provider.service_area?.split(',')[0]}
                      </p>

                      <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium capitalize">
                          {provider.provider_type}
                        </span>
                        {provider.avg_rating > 0 && (
                          <span className="flex items-center gap-1 bg-yellow-50 text-yellow-700 text-xs px-2 py-1 rounded-full font-medium">
                            <Star className="w-3 h-3 fill-current" /> {provider.avg_rating}
                          </span>
                        )}
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                        {provider.description || "No description provided."}
                      </p>

                      <div className="flex flex-wrap justify-center gap-1 mb-4">
                        {provider.service_type?.split(',').slice(0, 3).map((type, i) => (
                          <span key={i} className="text-[10px] uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                            {type.trim()}
                          </span>
                        ))}
                        {provider.service_type?.split(',').length > 3 && (
                          <span className="text-[10px] text-gray-400 px-1 py-1">+More</span>
                        )}
                      </div>

                      <button className="w-full mt-auto py-2 border border-orange-200 text-orange-600 rounded-lg text-sm font-semibold group-hover:bg-orange-50 transition-colors">
                        View Profile
                      </button>
                    </div>
                  </div>
                </Link>
              ))}

              {providers.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500">
                  <p>No service providers found at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
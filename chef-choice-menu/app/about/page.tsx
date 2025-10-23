import { Clock, MapPin, Users, Award, Target, Utensils } from 'lucide-react';
import Image from 'next/image';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function AboutPage() {
  return (
    <>
      <AnimatedBackground />
      <main className="min-h-screen pt-20 relative z-10">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-cream-100 via-primary-50 to-warm-50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-slide-down">
              <p className="text-primary-600 font-semibold text-lg mb-2">OUR STORY</p>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">ABOUT US</h1>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="animate-slide-right">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">WHO WE ARE</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  We are a collective of culinary experts, food enthusiasts, and professional chefs with one vision — 
                  to bring authentic, homely, and unforgettable dining experiences right to your doorstep.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Over the years, we have served countless families, hosted large weddings, designed curated corporate 
                  menus, and partnered with some of the best kitchens in the country.
                </p>
              </div>

              <div className="relative animate-slide-left">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&h=600&fit=crop"
                    alt="Our Team"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-primary-500 to-warm-500 text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { num: "500+", label: "Daily Orders" },
                { num: "150+", label: "Happy Families" },
                { num: "15+", label: "Cities" },
                { num: "150+", label: "Professional Chefs" }
              ].map((stat, i) => (
                <div key={i} className="animate-scale-in" style={{animationDelay: `${i*0.1}s`}}>
                  <p className="text-5xl font-bold mb-2">{stat.num}</p>
                  <p className="text-lg">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 animate-slide-down">Our Services</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {[
                { title: "Private Chef at Home", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=400&fit=crop" },
                { title: "Wedding & Event Catering", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop" },
                { title: "Corporate Dining", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop" },
                { title: "Outdoor Catering", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop" }
              ].map((service, i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden shadow-xl group animate-scale-in" style={{animationDelay: `${i*0.1}s`}}>
                  <Image src={service.img} alt={service.title} width={600} height={400} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                    <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

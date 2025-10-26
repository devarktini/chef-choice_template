import { ChefHat, Utensils, UtensilsCrossed, Wine } from 'lucide-react';
import Image from 'next/image';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function ServicePage() {
  return (
    <>
      <AnimatedBackground />
      <main className="min-h-screen pt-20 relative z-10">
        <section className="bg-gradient-to-br from-cream-100 via-primary-50 to-warm-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-slide-down">Services</h1>
            <div className="inline-block bg-white px-8 py-6 rounded-full shadow-xl mb-8 animate-scale-in pulse-glow">
              <p className="text-5xl font-bold text-primary-500">5+</p>
              <p className="text-gray-700">Years of Experience</p>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-4xl mx-auto mb-12 animate-fade-in">
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

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Services We Offer</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {[
                { icon: <ChefHat />, title: "Private Chefs", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=400&fit=crop" },
                { icon: <Utensils />, title: "Catering Services", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop" },
                { icon: <UtensilsCrossed />, title: "Chef's Table", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop" },
                { icon: <Wine />, title: "Bartender Services", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=400&fit=crop" }
              ].map((s, i) => (
                <div key={i} className="group rounded-3xl shadow-xl overflow-hidden animate-scale-in" style={{animationDelay: `${i*0.1}s`}}>
                  <div className="relative h-64">
                    <Image src={s.img} alt={s.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mb-3">
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
      </main>
    </>
  );
}

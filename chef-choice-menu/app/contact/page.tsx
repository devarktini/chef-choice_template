"use client";
import { MapPin, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  return (
    <>
      <AnimatedBackground />
      <main className="min-h-screen pt-20 relative z-10">
        <section className="bg-gradient-to-br from-cream-100 via-primary-50 to-warm-50 py-20">
          <div className="container mx-auto px-4 text-center animate-slide-down">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600">GET IN TOUCH WITH US</p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="space-y-6">
                {[
                  { icon: <MapPin />, title: "Location", info: "B-99, 5th Floor, Panchsheel Park, New Delhi" },
                  { icon: <Phone />, title: "Phone", info: "+91 85 959 039 39" },
                  { icon: <Mail />, title: "Email", info: "info@chefchoicemenu.com" }
                ].map((item, i) => (
                  <div key={i} className="bg-gradient-to-br from-cream-50 to-white p-6 rounded-2xl shadow-lg animate-slide-right" style={{animationDelay: `${i*0.1}s`}}>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-r from-primary-500 to-warm-500 rounded-full flex items-center justify-center text-white">{item.icon}</div>
                      <div>
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <p className="text-gray-600">{item.info}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-cream-50 to-white p-8 rounded-2xl shadow-xl animate-slide-left">
                <h3 className="text-2xl font-bold mb-6">Send Message</h3>
                <form className="space-y-4">
                  <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 outline-none" />
                  <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 outline-none" />
                  <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 outline-none" />
                  <textarea rows={4} placeholder="Your Message" className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 outline-none"></textarea>
                  <button className="w-full bg-gradient-to-r from-primary-500 to-warm-500 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-earth-700 to-earth-900 text-white relative overflow-hidden">
      {/* Decorative SVG Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1000 400">
          <path d="M0 200 Q250 100 500 200 T1000 200" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M0 220 Q250 120 500 220 T1000 220" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M0 240 Q250 140 500 240 T1000 240" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="animate-slide-up">
            <h3 className="text-2xl font-bold text-primary-400 mb-4">
              Chef Choice Menu
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Discover the finest dishes crafted with love. Making every event 
              an unforgettable culinary journey.
            </p>
            <div className="mt-4 flex items-center space-x-2 text-sm text-gray-300">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-accent-500 animate-pulse" />
              <span>for food lovers</span>
            </div>
          </div>

          <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
            <h4 className="text-lg font-semibold mb-4 text-primary-300">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 inline-block">Home</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 inline-block">About</Link></li>
              <li><Link href="/service" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 inline-block">Services</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 inline-block">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 inline-block">Contact</Link></li>
            </ul>
          </div>

          <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
            <h4 className="text-lg font-semibold mb-4 text-primary-300">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 inline-block">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 inline-block">Terms & Conditions</Link></li>
              <li><Link href="/disclaimer" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 inline-block">Disclaimer</Link></li>
            </ul>
          </div>

          <div className="animate-slide-up" style={{animationDelay: '0.3s'}}>
            <h4 className="text-lg font-semibold mb-4 text-primary-300">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 group">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 text-sm">+91 85 959 039 39</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 text-sm">info@chefchoicemenu.com</span>
              </div>
              <div className="flex items-start space-x-3 group">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 text-sm">B-99, 5th Floor, Panchsheel Park, New Delhi - 110017</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Chef Choice Menu. All rights reserved.
            </p>

            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-all duration-300 hover:scale-110 transform">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-all duration-300 hover:scale-110 transform">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-all duration-300 hover:scale-110 transform">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg py-3' 
          : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className=" w-28 font-bold text-primary-500 hover:text-primary-600 transition-colors duration-300 animate-slide-right">
             <img
              src="https://res.cloudinary.com/dzvvb0z0h/image/upload/f_auto,q_auto/v1757953170/removeb_sxbskt.png"
              alt="Chef Choice Menu"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 animate-slide-down">
            <Link href="/" className="nav-link text-gray-700 hover:text-primary-500 transition-all duration-300 font-medium relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/about" className="nav-link text-gray-700 hover:text-primary-500 transition-all duration-300 font-medium relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/service" className="nav-link text-gray-700 hover:text-primary-500 transition-all duration-300 font-medium relative group">
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <Link href="/blog" className="nav-link text-gray-700 hover:text-primary-500 transition-all duration-300 font-medium relative group">
              Blog
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/contact" className="nav-link text-gray-700 hover:text-primary-500 transition-all duration-300 font-medium relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/venue" className="nav-link text-gray-700 hover:text-primary-500 transition-all duration-300 font-medium relative group">
              Venue
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/gallery" className="nav-link text-gray-700 hover:text-primary-500 transition-all duration-300 font-medium relative group">
              Gallery
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          <div className="hidden md:block animate-slide-left">
            <Link 
              href="/book-chef"
              className="bg-gradient-to-r from-primary-500 to-warm-500 text-white px-6 py-2.5 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-primary-500 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-slide-down">
            <Link 
              href="/" 
              className="block text-gray-700 hover:text-primary-500 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="block text-gray-700 hover:text-primary-500 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/service" 
              className="block text-gray-700 hover:text-primary-500 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              href="/blog" 
              className="block text-gray-700 hover:text-primary-500 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="/contact" 
              className="block text-gray-700 hover:text-primary-500 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/book-chef"
              className="block bg-gradient-to-r from-primary-500 to-warm-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all font-semibold text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Book Now
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

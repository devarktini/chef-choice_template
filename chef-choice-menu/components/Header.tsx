"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import LoginModal from './LoginModal';
import BookingFlowModal from '@/components/booking/BookingFlowModal';
import { useAuthStore } from '@/stores/authStore';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { user, isAuthenticated, logout, initializeAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Initialize auth state from localStorage
    initializeAuth();
  }, [initializeAuth]);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    router.push('/');
  };
  
    // if (pathname?.startsWith('/dashboard')) return null;

  return (
    <header
      className={`fixed w-full bg-white z-50 transition-all py-2 duration-30`}
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
          {pathname?.startsWith('/dashboard') ? null : (    
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
          )}

          <div className="hidden md:flex items-center space-x-4 animate-slide-left">
            {user?.role === 'service_provider' ? null : (
               <button
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-gradient-to-r from-primary-500 to-warm-500 text-white px-6 py-2.5 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
            >
              Book Now
            </button>
            )}
           

            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-full border-2 border-primary-500 text-primary-600 hover:bg-primary-50 transition-all duration-300"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">{user.first_name}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-6 py-2.5 rounded-full border-2 border-primary-500 text-primary-600 hover:bg-primary-50 transition-all duration-300 font-semibold"
              >
                Login
              </button>
            )}
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
            <button
              className="block w-full bg-gradient-to-r from-primary-500 to-warm-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all font-semibold text-center"
              onClick={() => {
                setIsMenuOpen(false);
                setIsBookingModalOpen(true);
              }}
            >
              Book Now
            </button>

            {isAuthenticated && user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block text-center bg-primary-50 text-primary-600 px-6 py-3 rounded-full hover:bg-primary-100 transition-all font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard ({user.first_name})
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-center text-red-600 px-6 py-3 rounded-full hover:bg-red-50 transition-all font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsLoginModalOpen(true);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-center border-2 border-primary-500 text-primary-600 px-6 py-3 rounded-full hover:bg-primary-50 transition-all font-semibold"
              >
                Login
              </button>
            )}
          </div>
        )}
      </nav>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <BookingFlowModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </header>
  );
}

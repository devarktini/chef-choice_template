"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import LoginModal from './LoginModal';
import BookingFlowModal from '@/components/booking/BookingFlowModal';
import { useAuthStore } from '@/stores/authStore';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const exploreLinks = [
  { title: 'Blog', href: '/blog', icon: <ChevronDown className="w-4 h-4" /> },
  { title: 'Venue', href: '/venue', icon: <ChevronDown className="w-4 h-4" /> },
  { title: 'Gallery', href: '/gallery', icon: <ChevronDown className="w-4 h-4" /> },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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

  const NavItem = ({ title, href, dropdownItems, icon }: { title: string; href?: string; dropdownItems?: { title: string; href: string; icon?: React.ReactNode }[]; icon?: React.ReactNode }) => {
    const isActive = href ? pathname === href : dropdownItems?.some(item => pathname === item.href);
    const hasDropdown = dropdownItems && dropdownItems.length > 0;

    return (
      <div
        className="relative group py-4"
        onMouseEnter={() => hasDropdown && setActiveDropdown(title)}
        onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
      >
        {href ? (
          <Link
            href={href}
            className={`nav-link flex items-center gap-1 ${isActive ? 'text-primary-500' : 'text-gray-700'} hover:text-primary-500 transition-all duration-300 font-medium relative`}
          >
            {title}
            <span className={`absolute bottom-[-4px] left-0 h-0.5 bg-primary-500 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
        ) : (
          <div
            className={`cursor-pointer flex items-center gap-1 ${isActive ? 'text-primary-500' : 'text-gray-700'} hover:text-primary-500 transition-all duration-300 font-medium relative`}
          >
            {title}
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === title ? 'rotate-180' : ''}`} />
            <span className={`absolute bottom-[-4px] left-0 h-0.5 bg-primary-500 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </div>
        )}

        {hasDropdown && (
          <AnimatePresence>
            {activeDropdown === title && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full left-0 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 z-[60] mt-1"
              >
                {dropdownItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                    onClick={() => setActiveDropdown(null)}
                  >
                    {item.title}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  };

  return (
    <header
      className={`fixed w-full top-0 bg-white z-50 transition-all py-1 duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className=" w-28 font-bold text-primary-500 hover:text-primary-600 transition-colors duration-300 animate-slide-right shrink-0">
            <img
              src="https://res.cloudinary.com/dzvvb0z0h/image/upload/f_auto,q_auto/v1757953170/removeb_sxbskt.png"
              alt="Chef Choice Menu"
              className="w-full h-auto"
            />
          </Link>

          {/* Desktop Menu */}
          {pathname?.startsWith('/dashboard') ? null : (
            <div className="hidden lg:flex items-center space-x-8 animate-slide-down">
              <NavItem title="Home" href="/" />
              <NavItem title="About" href="/about" />
              <NavItem title="Services" href="/service" />
              <NavItem title="Subscription" href="/subscription" />
              <NavItem title="Explore" dropdownItems={exploreLinks} />
              <NavItem title="Contact" href="/contact" />
            </div>
          )}

          <div className="hidden md:flex items-center space-x-4 animate-slide-left">
            {user?.role === 'service_provider' ? null : (
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-gradient-to-r from-primary-500 to-warm-500 text-white px-6 py-2.5 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold whitespace-nowrap"
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
                  <span className="font-medium whitespace-nowrap">{user.first_name}</span>
                </button>

                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
                  >
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
                  </motion.div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-6 py-2.5 rounded-full border-2 border-primary-500 text-primary-600 hover:bg-primary-50 transition-all duration-300 font-semibold whitespace-nowrap"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 hover:text-primary-500 transition-colors p-2"
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
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden pb-6 space-y-2 overflow-hidden"
            >
              {[
                { title: 'Home', href: '/' },
                { title: 'About', href: '/about' },
                { title: 'Services', href: '/service' },
                { title: 'Subscription', href: '/subscription' },
                { title: 'Blog', href: '/blog' },
                { title: 'Contact', href: '/contact' },
                { title: 'Venue', href: '/venue' },
                { title: 'Gallery', href: '/gallery' },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="block text-gray-700 hover:text-primary-500 transition-colors font-medium py-2 px-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <button
                  className="w-full bg-gradient-to-r from-primary-500 to-warm-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all font-semibold text-center"
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
            </motion.div>
          )}
        </AnimatePresence>
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

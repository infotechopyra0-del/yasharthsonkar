'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#B7AEA3]/95 backdrop-blur-md border-b border-[#000000]/10' : 'bg-transparent'
      }`}
      style={{
        boxShadow: scrolled ? '0 8px 32px rgba(0, 0, 0, 0.15)' : 'none'
      }}
    >
      <nav className="max-w-400 mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-heading text-3xl text-[#000000] font-black hover:text-[#000000]/90 transition-all duration-300 transform hover:scale-105 tracking-tight">
            <span className="bg-linear-to-r from-[#000000] to-[#1A1A1A] bg-clip-text text-transparent font-extrabold">
              Yasharth
              Sonkar
            </span>
          </Link> 

          {/* Centered Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-10">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`font-paragraph text-sm font-medium transition-all duration-300 relative group ${
                    pathname === item.path
                      ? 'text-[#000000]'
                      : 'text-[#000000]/70 hover:text-[#000000]'
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#000000] transition-all duration-300 group-hover:w-full ${
                    pathname === item.path ? 'w-full' : ''
                  }`}></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Button - Desktop */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#000000] text-[#FFFFFF] hover:bg-[#000000]/90 hover:scale-105 transition-all duration-300 font-paragraph text-sm font-medium shadow-lg hover:shadow-xl"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#000000]"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#B7AEA3] border-t border-[#000000]/10"
          >
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`block font-paragraph text-base transition-colors duration-200 ${
                    pathname === item.path
                      ? 'text-[#000000]'
                      : 'text-[#000000]/70 hover:text-[#000000]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {/* Contact link for mobile */}
              <Link
                href="/contact"
                className={`block font-paragraph text-base transition-colors duration-200 ${
                  pathname === '/contact'
                    ? 'text-[#000000]'
                    : 'text-[#000000]/70 hover:text-[#000000]'
                }`}
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

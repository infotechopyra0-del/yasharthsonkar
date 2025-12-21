'use client';

import Link from 'next/link';
import { Instagram, Linkedin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-[#1A1A1A] text-[#FFFFFF] py-16">
      <div className="max-w-[100rem] mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-bold">Yasharth Sonker</h3>
            <p className="font-paragraph text-[#FFFFFF]/80 leading-relaxed">
              Crafting digital experiences that bridge innovation with functionality, 
              creating solutions that matter in today&apos;s evolving technological landscape.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="block font-paragraph text-[#FFFFFF]/80 hover:text-[#FFFFFF] transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold">Connect</h4>
            <div className="space-y-3">
              <a
                href="mailto:hello@yasharthsonkar.com"
                className="flex items-center gap-3 font-paragraph text-[#FFFFFF]/80 hover:text-[#FFFFFF] transition-colors duration-200"
              >
                <Mail className="w-4 h-4" />
                hello@yasharthsonkar.com
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-3 font-paragraph text-[#FFFFFF]/80 hover:text-[#FFFFFF] transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                +91 6390 057 777
              </a>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a
                href="https://www.instagram.com/yasharthsonker/?next=%2F"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/20 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/yasharths/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/20 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#FFFFFF]/20 mt-12 pt-8 text-center">
          <p className="font-paragraph text-[#FFFFFF]/60">
            © 2025 Yasharth Sonker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}


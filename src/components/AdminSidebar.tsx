'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from '@/components/ui/image';
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  MessageSquare,
  LogOut,
  Sparkles,
  Menu,
  X,
  Package,
  Briefcase,
  Image as ImageIcon,
  Home,
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      href: '/admin/dashboard',
    },
    {
      icon: Home,
      label: 'Home',
      href: '/admin/dashboard/home',
    },
    {
      icon: FolderOpen,
      label: 'Projects',
      href: '/admin/dashboard/projects',
    },
    {
      icon: Briefcase,
      label: 'Services',
      href: '/admin/dashboard/services',
    },
    {
      icon: ImageIcon,
      label: 'Gallery',
      href: '/admin/dashboard/gallery',
    },
    {
      icon: FileText,
      label: 'Blog',
      href: '/admin/dashboard/blog',
    },
    {
      icon: Package,
      label: 'About',
      href: '/admin/dashboard/about',
    },
    {
      icon: MessageSquare,
      label: 'Contact',
      href: '/admin/dashboard/contact',
    },
  ];

  const handleLogout = async () => {
    try {
      toast.loading('Logging out...', { id: 'logout' });
      
      await signOut({ 
        redirect: false,
        callbackUrl: '/admin/login' 
      });
      
      toast.success('Logged out successfully! 👋', { id: 'logout' });
      
      setTimeout(() => {
        router.push('/admin/login');
      }, 500);
    } catch (error) {
      toast.error('Logout failed', { id: 'logout' });
    }
  };

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#000000] text-[#FFFFFF] p-3 rounded-lg shadow-2xl border-2 border-[#B7AEA3] hover:bg-[#1A1A1A] transition-colors"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-[#1A1A1A]
          w-64 sm:w-72 shadow-2xl z-40 border-r-4 border-[#000000]
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header - Compact */}
          <div className="shrink-0 p-3 sm:p-4 border-b-4 border-[#000000]">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 bg-[#B7AEA3] shadow-lg rounded overflow-hidden">
                <Image
                  src="/images/MainLogo.jpg"
                  alt="Main Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-black text-[#FFFFFF] tracking-tight">
                  YasharthSonkar
                </h1>
                <p className="text-xs text-[#B7AEA3] font-semibold">Admin Portal</p>
              </div>
            </div>
          </div>

          {/* Menu Items - Scrollable with hidden scrollbar */}
          <nav className="flex-1 overflow-y-auto py-2 px-3 sm:px-4 space-y-1 scrollbar-hide">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all duration-300
                    ${active 
                      ? 'bg-[#B7AEA3] text-[#000000] shadow-lg border-l-4 border-[#000000]' 
                      : 'text-[#FFFFFF] hover:bg-[#FFFFFF]/10 hover:border-l-4 hover:border-[#B7AEA3]'
                    }
                  `}
                >
                  <div className={`shrink-0 ${active ? 'text-[#000000]' : 'text-[#B7AEA3]'}`}>
                    <Icon size={20} strokeWidth={2.5} />
                  </div>
                  <span className="font-bold text-sm sm:text-base truncate">
                    {item.label}
                  </span>
                  {active && (
                    <div className="ml-auto shrink-0">
                      <Sparkles size={14} className="text-[#000000]" />
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Info & Logout - Compact Bottom */}
          <div className="shrink-0 p-3 sm:p-4 border-t-4 border-[#000000] space-y-2">
            {/* User Info Badge */}
            <div className="bg-[#FFFFFF]/5 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg border border-[#B7AEA3]/30">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-[#B7AEA3] animate-pulse shrink-0"></div>
                <span className="text-[#B7AEA3] font-bold text-xs uppercase tracking-wider truncate">
                  System Status
                </span>
              </div>
              <p className="text-[#FFFFFF] font-semibold text-xs sm:text-sm truncate">
                All Systems Operational
              </p>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-[#FFFFFF] hover:bg-[#D9D2C9] text-[#000000] px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all duration-300 font-black shadow-lg hover:shadow-xl hover:scale-105"
            >
              <LogOut size={18} strokeWidth={2.5} className="shrink-0" />
              <span className="text-sm sm:text-base">Logout</span>
            </button>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute bottom-20 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-[#B7AEA3] opacity-5 blur-3xl rounded-full pointer-events-none"></div>
      </aside>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </>
  );
}
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Code,
  FolderOpen,
  FileText,
  Users,
  MessageSquare,
  LogOut,
  Sparkles,
  Menu,
  X,
  Package,
  Shield
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
      icon: Package,
      label: 'About',
      href: '/admin/dashboard/about',
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
          fixed top-0 left-0 h-full bg-[#1A1A1A]
          w-64 sm:w-72 shadow-2xl z-40 border-r-4 border-[#000000]
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header - Fixed Height */}
          <div className="flex-shrink-0 p-4 sm:p-6 border-b-4 border-[#000000]">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#B7AEA3] flex items-center justify-center shadow-lg rounded">
                <Shield className="w-5 h-5 sm:w-7 sm:h-7 text-[#000000]" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-[#FFFFFF] tracking-tight">
                  YasharthSonkar
                </h1>
                <p className="text-xs text-[#B7AEA3] font-semibold">Admin Portal</p>
              </div>
            </div>
          </div>

          {/* Menu Items - Scrollable */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 sm:px-4 space-y-1 sm:space-y-2 scrollbar-hide">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg transition-all duration-300
                    ${active 
                      ? 'bg-[#B7AEA3] text-[#000000] shadow-lg border-l-4 border-[#000000]' 
                      : 'text-[#FFFFFF] hover:bg-[#FFFFFF]/10 hover:border-l-4 hover:border-[#B7AEA3]'
                    }
                  `}
                >
                  <div className={`flex-shrink-0 ${active ? 'text-[#000000]' : 'text-[#B7AEA3]'}`}>
                    <Icon size={20} strokeWidth={2.5} />
                  </div>
                  <span className="font-bold text-sm sm:text-base truncate">
                    {item.label}
                  </span>
                  {active && (
                    <div className="ml-auto flex-shrink-0">
                      <Sparkles size={14} className="text-[#000000]" />
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Info & Logout - Fixed Bottom */}
          <div className="flex-shrink-0 p-3 sm:p-4 border-t-4 border-[#000000] space-y-2 sm:space-y-3">
            {/* User Info Badge */}
            <div className="bg-[#FFFFFF]/5 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-[#B7AEA3]/30">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-[#B7AEA3] animate-pulse flex-shrink-0"></div>
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
              className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-[#FFFFFF] hover:bg-[#D9D2C9] text-[#000000] px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg transition-all duration-300 font-black shadow-lg hover:shadow-xl hover:scale-105"
            >
              <LogOut size={18} strokeWidth={2.5} className="flex-shrink-0" />
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

        /* Optional: Custom scrollbar for better UX */
        .scrollbar-custom::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-custom::-webkit-scrollbar-track {
          background: rgba(183, 174, 163, 0.1);
          border-radius: 10px;
        }

        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: #B7AEA3;
          border-radius: 10px;
        }

        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: #D9D2C9;
        }
      `}</style>
    </>
  );
}
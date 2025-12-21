'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#B7AEA3] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-9xl md:text-[12rem] font-bold text-[#000000] mb-4 leading-none"
        >
          404
        </motion.div>
        
        {/* Error Message */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-[#000000] mb-4"
        >
          Page Not Found
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg md:text-xl text-[#1A1A1A] mb-8 leading-relaxed"
        >
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved, deleted, or you entered the wrong URL.
        </motion.p>
        
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-[#000000] text-[#FFFFFF] rounded-lg hover:bg-[#1A1A1A] transition-all duration-300 transform hover:scale-105 font-medium"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-[#000000] text-[#000000] rounded-lg hover:bg-[#000000] hover:text-[#FFFFFF] transition-all duration-300 transform hover:scale-105 font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </motion.div>
        
        {/* Search Suggestion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 p-6 bg-[#D9D2C9] rounded-lg"
        >
          <div className="flex items-center justify-center mb-3">
            <Search className="w-6 h-6 text-[#1A1A1A] mr-2" />
            <h3 className="text-lg font-semibold text-[#000000]">Looking for something specific?</h3>
          </div>
          <p className="text-[#1A1A1A] mb-4">
            Try visiting one of these popular pages:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/about" className="px-4 py-2 bg-[#FFFFFF] text-[#000000] rounded-lg hover:bg-[#000000] hover:text-[#FFFFFF] transition-all duration-300 text-sm font-medium">
              About
            </Link>
            <Link href="/projects" className="px-4 py-2 bg-[#FFFFFF] text-[#000000] rounded-lg hover:bg-[#000000] hover:text-[#FFFFFF] transition-all duration-300 text-sm font-medium">
              Projects
            </Link>
            <Link href="/contact" className="px-4 py-2 bg-[#FFFFFF] text-[#000000] rounded-lg hover:bg-[#000000] hover:text-[#FFFFFF] transition-all duration-300 text-sm font-medium">
              Contact
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
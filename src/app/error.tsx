'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen bg-[#B7AEA3] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <AlertTriangle className="w-24 h-24 text-[#000000]" />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0"
            >
              <AlertTriangle className="w-24 h-24 text-[#000000] opacity-30" />
            </motion.div>
          </div>
        </motion.div>
        
        {/* Error Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-[#000000] mb-4"
        >
          Something went wrong!
        </motion.h1>
        
        {/* Error Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg md:text-xl text-[#1A1A1A] mb-8 leading-relaxed"
        >
          We encountered an unexpected error. Don&apos;t worry, this has been logged and we&apos;re working to fix it.
        </motion.p>
        
        {/* Error Details (for development) */}
        {process.env.NODE_ENV === 'development' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mb-8 p-4 bg-[#D9D2C9] rounded-lg text-left"
          >
            <div className="flex items-center mb-2">
              <Bug className="w-5 h-5 text-[#000000] mr-2" />
              <h3 className="font-semibold text-[#000000]">Error Details (Development Mode)</h3>
            </div>
            <code className="text-sm text-[#1A1A1A] bg-[#FFFFFF] p-2 rounded block overflow-x-auto">
              {error.message}
            </code>
            {error.digest && (
              <p className="text-xs text-[#1A1A1A] mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </motion.div>
        )}
        
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={reset}
            className="inline-flex items-center px-6 py-3 bg-[#000000] text-[#FFFFFF] rounded-lg hover:bg-[#1A1A1A] transition-all duration-300 transform hover:scale-105 font-medium"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-[#000000] text-[#000000] rounded-lg hover:bg-[#000000] hover:text-[#FFFFFF] transition-all duration-300 transform hover:scale-105 font-medium"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Link>
        </motion.div>
        
        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 p-6 bg-[#D9D2C9] rounded-lg"
        >
          <h3 className="text-lg font-semibold text-[#000000] mb-3">Need Help?</h3>
          <p className="text-[#1A1A1A] text-sm">
            If this problem persists, please contact support or try refreshing the page. 
            Your session data has been preserved and you can continue where you left off.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
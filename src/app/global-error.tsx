'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, Server } from 'lucide-react';
import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the critical error to an error reporting service
    console.error('Critical Application Error:', error);
    
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-[#B7AEA3] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto"
          >
            {/* Critical Error Icon */}
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <div className="relative z-10">
                  <Server className="w-16 h-16 text-[#000000]" />
                  <AlertTriangle className="w-8 h-8 text-[#000000] absolute -top-2 -right-2" />
                </div>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-[#000000] rounded-full blur-lg"
                />
              </div>
            </motion.div>
            
            {/* Error Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-[#000000] mb-4"
            >
              Application Error
            </motion.h1>
            
            {/* Error Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg md:text-xl text-[#1A1A1A] mb-8 leading-relaxed"
            >
              A critical error has occurred that prevents the application from running properly. 
              This issue has been automatically reported to our team.
            </motion.p>
            
            {/* Error Details (for development) */}
            {process.env.NODE_ENV === 'development' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="mb-8 p-4 bg-[#D9D2C9] rounded-lg text-left"
              >
                <div className="flex items-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-[#000000] mr-2" />
                  <h3 className="font-semibold text-[#000000]">Critical Error Details (Development Mode)</h3>
                </div>
                <div className="bg-[#FFFFFF] p-3 rounded border-l-4 border-[#000000]">
                  <code className="text-sm text-[#1A1A1A] font-mono block overflow-x-auto whitespace-pre-wrap">
                    {error.message}
                  </code>
                  {error.stack && (
                    <details className="mt-3">
                      <summary className="cursor-pointer text-[#000000] font-medium hover:underline">
                        Stack Trace
                      </summary>
                      <code className="text-xs text-[#1A1A1A] bg-gray-50 p-2 rounded mt-2 block overflow-x-auto whitespace-pre-wrap">
                        {error.stack}
                      </code>
                    </details>
                  )}
                </div>
                {error.digest && (
                  <p className="text-xs text-[#1A1A1A] mt-3 font-mono">
                    Error ID: <span className="bg-[#FFFFFF] px-2 py-1 rounded">{error.digest}</span>
                  </p>
                )}
              </motion.div>
            )}
            
            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            >
              <button
                onClick={reset}
                className="inline-flex items-center px-6 py-3 bg-[#000000] text-[#FFFFFF] rounded-lg hover:bg-[#1A1A1A] transition-all duration-300 transform hover:scale-105 font-medium"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Restart Application
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-[#000000] text-[#000000] rounded-lg hover:bg-[#000000] hover:text-[#FFFFFF] transition-all duration-300 transform hover:scale-105 font-medium"
              >
                <Home className="w-5 h-5 mr-2" />
                Go to Homepage
              </button>
            </motion.div>
            
            {/* Status and Help Information */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="space-y-4"
            >
              {/* System Status */}
              <div className="p-6 bg-[#D9D2C9] rounded-lg">
                <h3 className="text-lg font-semibold text-[#000000] mb-3 flex items-center">
                  <Server className="w-5 h-5 mr-2" />
                  System Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#1A1A1A]">Application:</span>
                    <span className="text-[#000000] font-medium">Error State</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1A1A1A]">Timestamp:</span>
                    <span className="text-[#000000] font-medium">{new Date().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1A1A1A]">Environment:</span>
                    <span className="text-[#000000] font-medium">{process.env.NODE_ENV || 'unknown'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1A1A1A]">Auto-reported:</span>
                    <span className="text-green-600 font-medium">✓ Yes</span>
                  </div>
                </div>
              </div>
              
              {/* Recovery Instructions */}
              <div className="p-6 bg-[#D9D2C9] rounded-lg">
                <h3 className="text-lg font-semibold text-[#000000] mb-3">Recovery Steps</h3>
                <ol className="text-left text-[#1A1A1A] space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="bg-[#000000] text-[#FFFFFF] w-5 h-5 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">1</span>
                    Click &quot;Restart Application&quot; to reload the entire app
                  </li>
                  <li className="flex items-start">
                    <span className="bg-[#000000] text-[#FFFFFF] w-5 h-5 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">2</span>
                    Clear your browser cache and cookies if the problem persists
                  </li>
                  <li className="flex items-start">
                    <span className="bg-[#000000] text-[#FFFFFF] w-5 h-5 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">3</span>
                    Try accessing the site from an incognito/private browser window
                  </li>
                  <li className="flex items-start">
                    <span className="bg-[#000000] text-[#FFFFFF] w-5 h-5 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">4</span>
                    Contact support if the issue continues to occur
                  </li>
                </ol>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </body>
    </html>
  );
}
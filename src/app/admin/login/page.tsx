'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { 
  Lock, User, Eye, EyeOff, ArrowRight, Shield, 
  Code, Sparkles, Award, CheckCircle, Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/admin/dashboard');
    }
  }, [status, router]);

  // Show loading while checking session
  if (status === 'loading') {
    return (
      <div className="h-screen w-screen bg-[#B7AEA3] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#000000] mx-auto mb-4" />
          <p className="text-[#000000] font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render login form if already authenticated
  if (status === 'authenticated') {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Login Failed', {
          description: 'Invalid email or password. Please try again.',
          duration: 4000,
        });

        // Redirect to home after 2 seconds if credentials are wrong
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else if (result?.ok) {
        toast.success('Login Successful! 🎉', {
          description: `Welcome back, ${email}`,
          duration: 3000,
        });

        // Redirect to dashboard
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 500);
      }
    } catch (error) {
      toast.error('Connection Error', {
        description: 'Unable to connect to server. Please try again.',
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#B7AEA3] overflow-hidden">
      <div className="h-full grid lg:grid-cols-2">
        {/* Left Side - Login Form */}
        <div className="flex items-center justify-center p-6 sm:p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md space-y-8"
          >
            {/* Logo & Header */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="w-12 h-12 bg-[#000000] flex items-center justify-center">
                  <Shield className="w-7 h-7 text-[#FFFFFF]" />
                </div>
                <div>
                  <h1 className="font-heading text-2xl font-black text-[#000000]">Admin Panel</h1>
                  <p className="font-paragraph text-sm text-[#000000]/60">Secure Access</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[#000000] mb-3">
                  Welcome Back
                </h2>
                <p className="font-paragraph text-lg text-[#000000]/70">
                  Sign in to access your dashboard
                </p>
              </motion.div>
            </div>

            {/* Login Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Email Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="email" 
                  className="font-paragraph text-sm font-semibold text-[#000000] block"
                >
                  Email Address
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#000000]/40" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={isLoading}
                    className="w-full pl-12 pr-4 py-4 bg-[#D9D2C9] border-2 border-transparent focus:border-[#000000] focus:outline-none transition-all duration-300 font-paragraph text-[#000000] placeholder:text-[#000000]/40 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="password" 
                  className="font-paragraph text-sm font-semibold text-[#000000] block"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#000000]/40" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                    className="w-full pl-12 pr-12 py-4 bg-[#D9D2C9] border-2 border-transparent focus:border-[#000000] focus:outline-none transition-all duration-300 font-paragraph text-[#000000] placeholder:text-[#000000]/40 disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#000000]/40 hover:text-[#000000] transition-colors disabled:opacity-50"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isLoading}
                    className="w-5 h-5 border-2 border-[#000000] bg-transparent checked:bg-[#000000] cursor-pointer disabled:opacity-50"
                  />
                  <span className="font-paragraph text-sm text-[#000000] group-hover:text-[#000000]/80 transition-colors">
                    Remember me
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-[#000000] text-[#FFFFFF] font-paragraph font-semibold hover:bg-[#000000]/90 transition-all duration-300 group flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </motion.form>

            {/* Security Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-6 border-t-2 border-[#000000]/10"
            >
              <div className="flex items-center gap-2 text-[#000000]/60">
                <Shield className="w-4 h-4" />
                <p className="font-paragraph text-xs">
                  Your connection is secured with industry-standard encryption
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Visual Content */}
        <div className="hidden lg:flex items-center justify-center bg-[#1A1A1A] p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full" 
                 style={{
                   backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)`
                 }}>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 space-y-12"
          >
            {/* Main Heading */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-flex items-center gap-2 bg-[#FFFFFF]/10 px-6 py-3 backdrop-blur-sm"
              >
                <Sparkles className="w-5 h-5 text-[#B7AEA3]" />
                <span className="font-paragraph text-[#FFFFFF] font-semibold">Admin Dashboard Access</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="font-heading text-4xl sm:text-5xl font-black text-[#FFFFFF] leading-tight"
              >
                Manage Your<br />
                Platform with<br />
                <span className="text-[#B7AEA3]">Excellence</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="font-paragraph text-lg text-[#FFFFFF]/70 max-w-md"
              >
                Access powerful tools and insights to manage your content, users, and analytics from one centralized dashboard.
              </motion.p>
            </div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { icon: Shield, title: 'Secure Access', desc: 'Bank-level encryption' },
                { icon: Code, title: 'Developer Tools', desc: 'Advanced features' },
                { icon: Award, title: 'Premium Quality', desc: 'Enterprise-grade' },
                { icon: CheckCircle, title: 'Verified System', desc: 'Trusted platform' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className="bg-[#FFFFFF]/5 backdrop-blur-sm p-6 border border-[#FFFFFF]/10 hover:bg-[#FFFFFF]/10 transition-all duration-300 group"
                >
                  <feature.icon className="w-8 h-8 text-[#B7AEA3] mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-heading font-bold text-[#FFFFFF] mb-2">{feature.title}</h3>
                  <p className="font-paragraph text-sm text-[#FFFFFF]/60">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex items-center gap-12 pt-8 border-t border-[#FFFFFF]/10"
            >
              <div>
                <div className="font-heading text-4xl font-black text-[#FFFFFF] mb-1">99.9%</div>
                <div className="font-paragraph text-sm text-[#FFFFFF]/60">Uptime</div>
              </div>
              <div>
                <div className="font-heading text-4xl font-black text-[#FFFFFF] mb-1">24/7</div>
                <div className="font-paragraph text-sm text-[#FFFFFF]/60">Support</div>
              </div>
              <div>
                <div className="font-heading text-4xl font-black text-[#FFFFFF] mb-1">100%</div>
                <div className="font-paragraph text-sm text-[#FFFFFF]/60">Secure</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#B7AEA3] opacity-10 blur-3xl rounded-full"></div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#FFFFFF] opacity-5 blur-3xl rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
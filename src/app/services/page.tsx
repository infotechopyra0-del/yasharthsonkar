'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

interface Service {
  _id: string;
  name: string;
  description: string;
  serviceImage?: string;
  serviceImagePublicId?: string;
  gradientStartColor?: string;
  gradientEndColor?: string;
  features?: string[];
  createdAt: string;
  updatedAt: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/services');
      const data = await res.json();

      if (data.success) {
        setServices(data.services || []);
      } else {
        setServices([]);
        console.error('API returned error:', data.error);
      }
    } catch (err: any) {
      console.error('Error fetching services:', err);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-[#B7AEA3]">
      <Navigation />

      {/* Hero Section */}
      <section className="w-full max-w-400 mx-auto px-6 py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="font-black text-5xl sm:text-6xl lg:text-8xl text-[#000000] mb-8">
            Services
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-[#000000]/80 max-w-3xl mx-auto leading-relaxed">
            Comprehensive digital solutions designed to transform your business,
            enhance your online presence, and drive meaningful growth through innovation.
          </p>
        </motion.div>

        {/* Services Grid */}
        {loading ? (
          <div className="space-y-8">
            <p className="text-center text-lg sm:text-xl font-semibold text-[#000000] animate-pulse">
              Services Loading...
            </p>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-[#FFFFFF] rounded-xl overflow-hidden shadow-lg h-64 animate-pulse"
                />
              ))}
            </div>
          </div>
        ) : services.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16"
          >
            {services.map((service) => (
              <motion.div key={service._id} variants={itemVariants} className="group">
                {/* Service Image */}
                <div className="aspect-16/10 overflow-hidden mb-6 sm:mb-8 relative rounded-lg">
                  {service.serviceImage ? (
                    <img
                      src={service.serviceImage}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        background:
                          service.gradientStartColor && service.gradientEndColor
                            ? `linear-gradient(135deg, ${service.gradientStartColor}, ${service.gradientEndColor})`
                            : 'linear-gradient(135deg, #1A1A1A, #B7AEA3)'
                      }}
                    >
                      <ArrowRight className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <h2 className="font-black text-2xl sm:text-3xl lg:text-4xl text-[#000000]">
                    {service.name}
                  </h2>

                  <p className="text-[#000000]/70">{service.description}</p>

                  {service.features && (
                    <div className="space-y-2">
                      {service.features.map((f, i) => (
                        <div key={i} className="flex gap-2">
                          <Check className="w-4 h-4 mt-1" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-[#000000] hover:bg-[#000000] hover:text-white transition"
                  >
                    Get Started <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 text-[#000000]/70">
            Services Coming Soon
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

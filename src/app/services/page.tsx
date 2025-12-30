'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check, Navigation } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { staticServices } from '@/lib/static-data';
import Footer from '@/components/footer';

export default function ServicesPage() {
  const services = staticServices;
  const loading = false;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#B7AEA3] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#000000]/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-paragraph text-[#000000]">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#B7AEA3]">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="w-full max-w-400 mx-auto px-6 py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="font-heading text-6xl lg:text-8xl text-[#000000] mb-8">
            Services
          </h1>
          <p className="font-paragraph text-lg lg:text-xl text-[#000000]/80 max-w-3xl mx-auto leading-relaxed">
            Comprehensive digital solutions designed to transform your business, 
            enhance your online presence, and drive meaningful growth through innovation.
          </p>
        </motion.div>

        {/* Services Grid */}
        {services.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-12 lg:gap-16"
          >
            {services.map((service) => (
              <motion.div
                key={service._id}
                variants={itemVariants}
                className="group"
              >
                {/* Service Image */}
                <div className="aspect-16/10 overflow-hidden mb-8 relative">
                  {service.serviceImage ? (
                    <Image
                      src={service.serviceImage}
                      alt={service.name || 'Service illustration'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      width={800}
                    />
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        background: service.gradientStartColor && service.gradientEndColor
                          ? `linear-gradient(135deg, ${service.gradientStartColor}, ${service.gradientEndColor})`
                          : 'linear-gradient(135deg, #1A1A1A, #B7AEA3)'
                      }}
                    >
                      <div className="text-center text-white">
                        <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                          <ArrowRight className="w-8 h-8" />
                        </div>
                        <p className="font-paragraph text-sm">Service Preview</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Gradient Overlay */}
                  {service.gradientStartColor && service.gradientEndColor && (
                    <div 
                      className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${service.gradientStartColor}, ${service.gradientEndColor})`
                      }}
                    />
                  )}
                </div>

                {/* Service Content */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="font-heading text-3xl lg:text-4xl text-[#000000] group-hover:text-[#000000]/80 transition-colors duration-300">
                      {service.name || 'Service Name'}
                    </h2>
                    
                    {service.description && (
                      <p className="font-paragraph text-base lg:text-lg text-[#000000]/70 leading-relaxed">
                        {service.description}
                      </p>
                    )}
                  </div>

                  {/* Service Features */}
                  {service.description && service.description.includes('•') && (
                    <div className="space-y-3">
                      <h3 className="font-heading text-lg text-[#000000]">
                        Key Features
                      </h3>
                      <div className="space-y-2">
                        {service.description.split('•').filter((item: string) => item.trim()).map((feature: string, featureIndex: number) => (
                          <div key={featureIndex} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-[#000000] mt-0.5 shrink-0" />
                            <span className="font-paragraph text-[#000000]/80 text-sm">
                              {feature.trim()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  <div className="pt-4">
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-[#D9D2C9] border border-[#000000] text-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF] transition-all duration-300 group/cta"
                    >
                      <span className="font-paragraph font-medium">Get Started</span>
                      <ArrowRight className="w-5 h-5 group-hover/cta:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-20"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-8 bg-[#1A1A1A] rounded-full flex items-center justify-center">
                <ArrowRight className="w-12 h-12 text-[#FFFFFF]" />
              </div>
              <h2 className="font-heading text-2xl text-[#000000] mb-4">
                Services Coming Soon
              </h2>
              <p className="font-paragraph text-[#000000]/70 leading-relaxed">
                I&apos;m currently developing a comprehensive suite of digital services. 
                Check back soon to explore the full range of solutions available.
              </p>
            </div>
          </motion.div>
        )}
      </section>

      {/* Process Section */}
      <section className="w-full bg-[#1A1A1A] py-20">
        <div className="max-w-400 mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl lg:text-5xl text-[#FFFFFF] mb-6">
              How We Work Together
            </h2>
            <p className="font-paragraph text-lg text-[#FFFFFF]/80 max-w-2xl mx-auto">
              A streamlined process designed to deliver exceptional results efficiently
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8"
          >
            {[
              {
                step: "01",
                title: "Discovery",
                description: "Understanding your goals, challenges, and vision for the project"
              },
              {
                step: "02", 
                title: "Strategy",
                description: "Developing a comprehensive plan tailored to your specific needs"
              },
              {
                step: "03",
                title: "Development",
                description: "Building solutions with cutting-edge technology and best practices"
              },
              {
                step: "04",
                title: "Launch",
                description: "Deploying your solution and ensuring optimal performance"
              }
            ].map((process) => (
              <motion.div
                key={process.step}
                variants={itemVariants}
                className="text-center p-6 hover:bg-[#B7AEA3] hover:text-[#000000] transition-all duration-300 group"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-[#1A1A1A]-foreground/10 group-hover:bg-[#000000] group-hover:text-[#FFFFFF] rounded-full flex items-center justify-center">
                  <span className="font-heading text-xl font-bold text-[#FFFFFF] group-hover:text-[#FFFFFF]">
                    {process.step}
                  </span>
                </div>
                
                <h3 className="font-heading text-xl text-[#FFFFFF] group-hover:text-[#000000] mb-3">
                  {process.title}
                </h3>
                
                <p className="font-paragraph text-[#FFFFFF]/80 group-hover:text-[#000000]/80 text-sm leading-relaxed">
                  {process.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20">
        <div className="max-w-400 mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="font-heading text-4xl lg:text-5xl text-[#000000]">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="font-paragraph text-lg text-[#000000]/80 max-w-2xl mx-auto">
              Let&apos;s discuss how we can work together to achieve your goals 
              and create something extraordinary.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <a
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#000000] text-[#FFFFFF] hover:bg-[#000000]/90 transition-colors duration-300 group"
              >
                <span className="font-paragraph font-medium">Start Your Project</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a
                href="/projects"
                className="inline-flex items-center gap-3 px-8 py-4 border border-[#000000] text-[#000000] hover:bg-[#D9D2C9] transition-colors duration-300"
              >
                <span className="font-paragraph font-medium">View Portfolio</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}





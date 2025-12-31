'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Code, Sparkles, Award, Users, Globe, Lightbulb, Target, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Image } from '@/components/ui/image';
import WhatsAppChat from '@/components/WhatsAppChat';
import ClientOnly from '@/components/ClientOnly';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#B7AEA3]">
      <Navigation />
      {/* Hero Section - Enhanced and Enlarged */}
      <section className="w-full max-w-480 mx-auto px-6 py-24 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          {/* Left Content - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A]/10 border border-secondary/20 text-[#000000] text-sm font-paragraph">
                  <Sparkles className="w-4 h-4" />
                  Digital Innovation Expert
                </div>
                <h1 className="font-heading text-7xl lg:text-9xl text-[#000000] leading-tight">
                  Er Yasharth <span className="text-[#000000]/70">Sonkar</span>
                </h1>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                <h2 className="font-heading text-3xl lg:text-4xl text-[#000000]">
                  Crafting Tomorrow&apos;s Digital Experiences
                </h2>
                <p className="font-paragraph text-xl text-[#000000]/80 leading-relaxed max-w-2xl">
                  Full-Stack Developer, AI Enthusiast & Digital Strategist transforming 
                  complex challenges into elegant, scalable solutions that drive real business impact.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-3 gap-6 py-8"
              >
                <div className="text-center">
                  <div className="font-heading text-3xl text-[#000000] mb-2">10+</div>
                  <div className="font-paragraph text-sm text-[#000000]/70">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="font-heading text-3xl text-[#000000] mb-2">500+</div>
                  <div className="font-paragraph text-sm text-[#000000]/70">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="font-heading text-3xl text-[#000000] mb-2">100%</div>
                  <div className="font-paragraph text-sm text-[#000000]/70">Client Satisfaction</div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#000000] text-[#FFFFFF] font-paragraph font-medium hover:bg-[#000000]/90 hover:scale-105 transition-all duration-300 group shadow-xl"
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-[#000000] text-[#000000] font-paragraph font-medium hover:bg-[#000000] hover:text-[#FFFFFF] transition-all duration-300"
                >
                  View Portfolio
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Images - Enhanced Layout */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-8 lg:gap-12"
          >
            <div className="space-y-8">
              <div className="aspect-[4/5] overflow-hidden shadow-2xl">
                <Image
                  src="https://static.wixstatic.com/media/d1fa15_c3b7d51a3f644684bc3b6bef0ab384ec~mv2.png?originWidth=384&originHeight=448"
                  alt="Modern workspace setup with laptop and development tools"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  width={400}
                  priority
                />
              </div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-[#1A1A1A] p-8 text-center shadow-lg"
              >
                <Code className="w-10 h-10 text-[#FFFFFF] mx-auto mb-4" />
                <h3 className="font-heading text-lg text-[#FFFFFF] mb-2">Clean Architecture</h3>
                <p className="font-paragraph text-sm text-[#FFFFFF]/80">
                  Scalable & Maintainable Code
                </p>
              </motion.div>
            </div>
            
            <div className="space-y-8 pt-16">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-[#1A1A1A] p-8 text-center shadow-lg"
              >
                <Sparkles className="w-10 h-10 text-[#FFFFFF] mx-auto mb-4" />
                <h3 className="font-heading text-lg text-[#FFFFFF] mb-2">AI Integration</h3>
                <p className="font-paragraph text-sm text-[#FFFFFF]/80">
                  Intelligent Automation
                </p>
              </motion.div>
              <div className="aspect-[4/5] overflow-hidden shadow-2xl">
                <Image
                  src="https://static.wixstatic.com/media/d1fa15_daefc5fa67a54fed80da9f8491282fb4~mv2.png?originWidth=384&originHeight=448"
                  alt="AI development and machine learning workspace"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  width={400}
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* New About Preview Section */}
      <section className="w-full bg-[#1A1A1A] py-24">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h2 className="font-heading text-5xl lg:text-6xl text-[#FFFFFF]">
                  Passionate About Innovation
                </h2>
                <p className="font-paragraph text-xl text-[#FFFFFF]/80 leading-relaxed">
                  With over 10 years of experience in digital innovation, I specialize in creating 
                  solutions that bridge the gap between cutting-edge technology and practical business needs.
                </p>
                <p className="font-paragraph text-lg text-[#FFFFFF]/70 leading-relaxed">
                  From full-stack development to AI integration and strategic digital planning, 
                  I help businesses transform their digital presence and achieve sustainable growth.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-[#B7AEA3]">
                  <Target className="w-8 h-8 text-[#000000] mx-auto mb-3" />
                  <h4 className="font-heading text-lg text-[#000000] mb-2">Strategic Focus</h4>
                  <p className="font-paragraph text-sm text-[#000000]/80">
                    Goal-Oriented Solutions
                  </p>
                </div>
                
                <div className="text-center p-6 bg-[#B7AEA3]">
                  <TrendingUp className="w-8 h-8 text-[#000000] mx-auto mb-3" />
                  <h4 className="font-heading text-lg text-[#000000] mb-2">Growth Driven</h4>
                  <p className="font-paragraph text-sm text-[#000000]/80">
                    Measurable Results
                  </p>
                </div>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-secondary-foreground text-[#FFFFFF] hover:bg-[#1A1A1A]-foreground hover:text-secondary transition-all duration-300 group"
              >
                Learn More About Me
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="aspect-[4/5] overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/yasharthsonker.jpg"
                alt="Yasharth Sonkar - Professional portrait"
                className="w-full h-full object-cover"
                width={600}
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Preview Section */}
      <section className="w-full py-24">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-heading text-5xl lg:text-6xl text-[#000000] mb-8">
              Comprehensive Digital Solutions
            </h2>
            <p className="font-paragraph text-xl text-[#000000]/80 max-w-3xl mx-auto leading-relaxed">
              From concept to deployment, I provide end-to-end digital services that drive innovation, 
              enhance user experience, and deliver measurable business results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              { 
                icon: Code, 
                title: "Full-Stack Development", 
                desc: "Modern web applications built with cutting-edge technologies like React, Node.js, and cloud platforms.",
                features: ["Responsive Design", "API Development", "Database Architecture"]
              },
              { 
                icon: Sparkles, 
                title: "AI & Machine Learning", 
                desc: "Intelligent solutions that automate processes and provide data-driven insights for better decision making.",
                features: ["Automation Systems", "Predictive Analytics", "Natural Language Processing"]
              },
              { 
                icon: Globe, 
                title: "Digital Strategy", 
                desc: "Comprehensive digital transformation strategies that align technology with business objectives.",
                features: ["Technology Consulting", "Digital Roadmaps", "Performance Optimization"]
              },
              { 
                icon: Lightbulb, 
                title: "Innovation Consulting", 
                desc: "Strategic guidance on emerging technologies and digital trends to keep your business ahead.",
                features: ["Technology Assessment", "Innovation Workshops", "Future-Proofing"]
              },
              { 
                icon: Users, 
                title: "User Experience Design", 
                desc: "User-centered design approaches that create intuitive and engaging digital experiences.",
                features: ["UI/UX Design", "User Research", "Prototyping"]
              },
              { 
                icon: Award, 
                title: "Quality Assurance", 
                desc: "Rigorous testing and quality control processes ensuring reliable and secure applications.",
                features: ["Automated Testing", "Security Audits", "Performance Testing"]
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 bg-[#D9D2C9] hover:bg-[#1A1A1A] hover:text-[#FFFFFF] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <service.icon className="w-12 h-12 mb-6 text-[#000000] group-hover:text-[#FFFFFF] transition-colors" />
                <h3 className="font-heading text-xl text-[#000000] group-hover:text-[#FFFFFF] mb-4">
                  {service.title}
                </h3>
                <p className="font-paragraph text-[#000000]/80 group-hover:text-[#FFFFFF]/80 mb-6 leading-relaxed">
                  {service.desc}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="font-paragraph text-sm text-[#000000]/70 group-hover:text-[#FFFFFF]/70 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#000000] group-hover:bg-[#1A1A1A]-foreground rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#000000] text-[#FFFFFF] hover:bg-[#000000]/90 hover:scale-105 transition-all duration-300 group shadow-xl"
            >
              Explore All Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* New Testimonials/Social Proof Section */}
      <section className="w-full bg-[#1A1A1A] py-24">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl lg:text-6xl text-[#FFFFFF] mb-6">
              Trusted by Forward-Thinking Companies
            </h2>
            <p className="font-paragraph text-xl text-[#FFFFFF]/80 max-w-2xl mx-auto">
              Delivering exceptional results across industries and helping businesses achieve their digital goals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                metric: "99%",
                label: "Project Success Rate",
                description: "Consistently delivering projects on time and within budget"
              },
              {
                metric: "24h",
                label: "Average Response Time",
                description: "Quick communication and rapid problem resolution"
              },
              {
                metric: "5★",
                label: "Client Satisfaction",
                description: "Maintaining excellence in every project delivery"
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-[#B7AEA3]"
              >
                <div className="font-heading text-5xl text-[#000000] mb-4">{stat.metric}</div>
                <h3 className="font-heading text-xl text-[#000000] mb-3">{stat.label}</h3>
                <p className="font-paragraph text-[#000000]/70">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Brands Section */}
      <section className="w-full bg-[#1A1A1A] py-24">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-heading text-5xl lg:text-6xl text-[#FFFFFF] mb-8">
              Our Brands
            </h2>
            <p className="font-paragraph text-xl text-[#FFFFFF]/80 max-w-3xl mx-auto leading-relaxed">
              A diverse portfolio of innovative ventures spanning technology, hospitality, spiritual consulting, 
              and digital marketing - each brand representing our commitment to excellence and innovation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Opyra AI */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group bg-[#B7AEA3] p-8 rounded-xl hover:bg-[#D9D2C9] transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#000000] rounded-full flex items-center justify-center">
                  <span className="text-[#FFFFFF] text-2xl font-bold">AI</span>
                </div>
                <div>
                  <h3 className="font-heading text-2xl text-[#000000] font-bold">Opyra AI</h3>
                  <p className="font-paragraph text-sm text-[#000000]/70">Digital Agency</p>
                </div>
              </div>
              <p className="font-paragraph text-[#000000]/80 mb-4 leading-relaxed">
                Cutting-edge digital agency specializing in AI-powered solutions, web development, 
                and digital marketing strategies for modern businesses.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#000000] text-[#FFFFFF] text-xs rounded-full">AI Solutions</span>
                <span className="px-3 py-1 bg-[#000000] text-[#FFFFFF] text-xs rounded-full">Web Development</span>
                <span className="px-3 py-1 bg-[#000000] text-[#FFFFFF] text-xs rounded-full">Digital Marketing</span>
              </div>
            </motion.div>

            {/* Hotel Shri Vishwanath */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group bg-[#B7AEA3] p-8 rounded-xl hover:bg-[#D9D2C9] transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#000000] rounded-full flex items-center justify-center overflow-hidden">
                    <Image src="/images/HotelShriVishnath.jpg" alt="HotelShriVishnath" width={64} height={64} className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl text-[#000000] font-bold">Hotel Shri Vishwanath</h3>
                  <p className="font-paragraph text-sm text-[#000000]/70">Hospitality</p>
                </div>
              </div>
              <p className="font-paragraph text-[#000000]/80 mb-4 leading-relaxed">
                Experience exceptional service and world-class amenities at our luxury hotel in Varanasi. 
                Leading hospitality operations with focus on guest experience management.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#000000] text-[#FFFFFF] text-xs rounded-full">Luxury Hospitality</span>
                <span className="px-3 py-1 bg-[#000000] text-[#FFFFFF] text-xs rounded-full">Guest Experience</span>
                <span className="px-3 py-1 bg-[#000000] text-[#FFFFFF] text-xs rounded-full">Tourism</span>
              </div>
            </motion.div>

            {/* Occult369 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="group bg-[#B7AEA3] p-8 rounded-xl hover:bg-[#D9D2C9] transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#000000] rounded-full flex items-center justify-center overflow-hidden">
                    <Image src="/images/Occult369.jpg" alt="Occult369" width={64} height={64} className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl text-[#000000] font-bold">Occult 369</h3>
                  <p className="font-paragraph text-sm text-[#000000]/70">Spiritual Consulting</p>
                </div>
              </div>
              <p className="font-paragraph text-[#000000]/80 mb-4 leading-relaxed">
                Experience accurate numerology and astrology predictions. Transform your life through 
                numbers and cosmic insights with our spiritual guidance and predictive analytics.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#000000] text-[#FFFFFF] text-xs rounded-full">Numerology</span>
                <span className="px-3 py-1 bg-[#000000] text-[#FFFFFF] text-xs rounded-full">Astrology</span>
                <span className="px-3 py-1 bg-[#000000] text-[#FFFFFF] text-xs rounded-full">Predictive Analytics</span>
              </div>
            </motion.div>

            {/* OpraInfotech */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="group bg-[#B7AEA3] p-8 rounded-xl hover:bg-[#D9D2C9] transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#000000] rounded-full flex items-center justify-center overflow-hidden">
                    <Image src="/images/OpyraInfoTech.jpg" alt="OpyraInfotech" width={64} height={64} className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl text-[#000000] font-bold">Opyra Infotech</h3>
                  <p className="font-paragraph text-sm text-[#000000]/70">Digital Marketing</p>
                </div>
              </div>
              <p className="font-paragraph text-[#000000]/80 mb-4 leading-relaxed">
                Founded digital marketing agency focused on helping businesses establish strong online presence 
                through SEO, social media marketing, and digital advertising campaigns.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#000000] text-[#FFFFFF] text-xs rounded-full">SEO</span>
                <span className="px-3 py-1 bg-[#000000] text-[#FFFFFF] text-xs rounded-full">Social Media</span>
                <span className="px-3 py-1 bg-[#000000] text-[#FFFFFF] text-xs rounded-full">Google Ads</span>
              </div>
            </motion.div>

            {/* Gold Interio */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="group bg-[#B7AEA3] p-8 rounded-xl hover:bg-[#D9D2C9] transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#000000] rounded-full flex items-center justify-center">
                  <span className="text-[#FFFFFF] text-2xl">🏠</span>
                </div>
                <div>
                  <h3 className="font-heading text-2xl text-[#000000] font-bold">Gold Interio</h3>
                  <p className="font-paragraph text-sm text-[#000000]/70">Interior Design</p>
                </div>
              </div>
              <p className="font-paragraph text-[#000000]/80 mb-4 leading-relaxed">
                Specialized in designing and manufacturing premium modular kitchens. Managing client relationships, 
                design consultations, and project execution for residential and commercial spaces.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#000000] text-[#FFFFFF] text-xs rounded-full">Interior Design</span>
                <span className="px-3 py-1 bg-[#000000] text-[#FFFFFF] text-xs rounded-full">Project Management</span>
                <span className="px-3 py-1 bg-[#000000] text-[#FFFFFF] text-xs rounded-full">Manufacturing</span>
              </div>
            </motion.div>

            {/* Locotraq */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="group bg-[#B7AEA3] p-8 rounded-xl hover:bg-[#D9D2C9] transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#000000] rounded-full flex items-center justify-center overflow-hidden">
                    <Image src="/images/Locotraq.jpg" alt="Locotraq" width={64} height={64} className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl text-[#000000] font-bold">Locotraq</h3>
                  <p className="font-paragraph text-sm text-[#000000]/70">GPS Technology</p>
                </div>
              </div>
              <p className="font-paragraph text-[#000000]/80 mb-4 leading-relaxed">
                Managed supply chain and distribution of GPS tracking components and systems. 
                Developed partnerships with technology vendors providing tracking solutions for various industries.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#000000] text-[#FFFFFF] text-xs rounded-full">GPS Technology</span>
                <span className="px-3 py-1 bg-[#000000] text-[#FFFFFF] text-xs rounded-full">Supply Chain</span>
                <span className="px-3 py-1 bg-[#000000] text-[#FFFFFF] text-xs rounded-full">Logistics</span>
              </div>
            </motion.div>
          </div>

          {/* Brand Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-20 pt-16 border-t border-[#FFFFFF]/10"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="font-heading text-4xl lg:text-5xl text-[#FFFFFF] mb-2">6+</div>
                <div className="font-paragraph text-[#FFFFFF]/80">Active Brands</div>
              </div>
              <div>
                <div className="font-heading text-4xl lg:text-5xl text-[#FFFFFF] mb-2">9+</div>
                <div className="font-paragraph text-[#FFFFFF]/80">Years Experience</div>
              </div>
              <div>
                <div className="font-heading text-4xl lg:text-5xl text-[#FFFFFF] mb-2">5</div>
                <div className="font-paragraph text-[#FFFFFF]/80">Industries</div>
              </div>
              <div>
                <div className="font-heading text-4xl lg:text-5xl text-[#FFFFFF] mb-2">100+</div>
                <div className="font-paragraph text-[#FFFFFF]/80">Clients Served</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="w-full py-24">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-10"
          >
            <div className="space-y-6">
              <h2 className="font-heading text-5xl lg:text-6xl text-[#000000]">
                Ready to Transform Your Digital Vision?
              </h2>
              <p className="font-paragraph text-xl text-[#000000]/80 max-w-3xl mx-auto leading-relaxed">
                Let&apos;s collaborate to create innovative solutions that drive your business forward. 
                From initial concept to final deployment, I&apos;m here to make your vision a reality.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-12 py-6 bg-[#000000] text-[#FFFFFF] hover:bg-[#000000]/90 hover:scale-105 transition-all duration-300 group shadow-xl text-lg font-paragraph font-medium"
              >
                Start Your Project Today
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/projects"
                className="inline-flex items-center gap-3 px-12 py-6 border-2 border-[#000000] text-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF] transition-all duration-300 text-lg font-paragraph font-medium"
              >
                View My Work
              </Link>
            </div>

            <div className="pt-8 text-center">
              <p className="font-paragraph text-[#000000]/60 mb-4">Prefer to chat directly?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="mailto:hello@yasharthsonkar.com" className="font-paragraph text-[#000000] hover:text-[#000000]/80 transition-colors">
                  hello@yasharthsonkar.com
                </a>
                <span className="hidden sm:block text-[#000000]/40">•</span>
                <a href="tel:+1234567890" className="font-paragraph text-[#000000] hover:text-[#000000]/80 transition-colors">
                  +91 6390 057 777
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
      {/* WhatsApp Chat Component */}
      <ClientOnly>
        <WhatsAppChat />
      </ClientOnly>
    </div>
  );
}





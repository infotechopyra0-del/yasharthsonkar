'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Navigation from '@/components/navigation';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.message.trim();

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

  return (
    <div className="min-h-screen bg-[#B7AEA3]">
      <Navigation />
      {/* Hero Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="font-heading text-6xl lg:text-8xl text-[#000000] mb-8">
            Let&apos;s Connect
          </h1>
          <p className="font-paragraph text-lg lg:text-xl text-[#000000]/80 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your vision to life? I&apos;d love to hear about your project 
            and explore how we can work together to create something extraordinary.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h2 className="font-heading text-3xl lg:text-4xl text-[#000000]">
                Send a Message
              </h2>
              <p className="font-paragraph text-[#000000]/70 leading-relaxed">
                Fill out the form below and I&apos;ll get back to you within 24 hours. 
              </p>
              <p className="font-paragraph text-[#000000]/80 leading-relaxed max-w-xl">
                Let&apos;s discuss your project and how I can help bring it to life.
                Whether you&apos;re looking for full-stack development, AI integration, or strategic digital planning.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block font-paragraph text-sm font-medium text-[#000000] mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#B7AEA3] border-[#000000] text-[#000000] placeholder:text-[#000000]/50 focus:border-[#000000]"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-paragraph text-sm font-medium text-[#000000] mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#B7AEA3] border-[#000000] text-[#000000] placeholder:text-[#000000]/50 focus:border-[#000000]"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-paragraph text-sm font-medium text-[#000000] mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full bg-[#B7AEA3] border-[#000000] text-[#000000] placeholder:text-[#000000]/50 focus:border-[#000000] resize-none"
                    placeholder="Tell me about your project, goals, and how I can help..."
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="w-full bg-[#000000] text-[#FFFFFF] hover:bg-[#000000]/90 disabled:opacity-50 disabled:cursor-not-allowed py-4 font-paragraph font-medium"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#000000]-foreground/20 border-t-primary-foreground rounded-full animate-spin"></div>
                    Sending Message...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </div>
                )}
              </Button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg"
                >
                  <p className="font-paragraph text-sm">
                    Thank you for your message! I&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg"
                >
                  <p className="font-paragraph text-sm">
                    Something went wrong. Please try again or contact me directly.
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h2 className="font-heading text-3xl lg:text-4xl text-[#000000]">
                Get in Touch
              </h2>
              <p className="font-paragraph text-[#000000]/70 leading-relaxed">
                Prefer to reach out directly? Here are the best ways to connect with me 
                for immediate assistance or quick questions.
              </p>
            </div>

            {/* Contact Methods */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.a
                variants={itemVariants}
                href="mailto:hello@yasharthsonkar.com"
                className="flex items-center gap-4 p-6 bg-[#1A1A1A] hover:bg-[#000000] transition-colors duration-300 group"
              >
                <div className="w-12 h-12 bg-[#1A1A1A]-foreground/10 group-hover:bg-[#000000]-foreground/20 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#FFFFFF] group-hover:text-[#FFFFFF]" />
                </div>
                <div>
                  <h3 className="font-heading text-lg text-[#FFFFFF] group-hover:text-[#FFFFFF]">
                    Email
                  </h3>
                  <p className="font-paragraph text-[#FFFFFF]/80 group-hover:text-[#FFFFFF]/80">
                    hello@yasharthsonkar.com
                  </p>
                </div>
              </motion.a>

              <motion.a
                variants={itemVariants}
                href="tel:+1234567890"
                className="flex items-center gap-4 p-6 bg-[#1A1A1A] hover:bg-[#000000] transition-colors duration-300 group"
              >
                <div className="w-12 h-12 bg-[#1A1A1A]-foreground/10 group-hover:bg-[#000000]-foreground/20 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#FFFFFF] group-hover:text-[#FFFFFF]" />
                </div>
                <div>
                  <h3 className="font-heading text-lg text-[#FFFFFF] group-hover:text-[#FFFFFF]">
                    Phone
                  </h3>
                  <p className="font-paragraph text-[#FFFFFF]/80 group-hover:text-[#FFFFFF]/80">
                    +91 6390 057 777
                  </p>
                </div>
              </motion.a>

              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4 p-6 bg-[#1A1A1A]"
              >
                <div className="w-12 h-12 bg-[#1A1A1A]-foreground/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#FFFFFF]" />
                </div>
                <div>
                  <h3 className="font-heading text-lg text-[#FFFFFF]">
                    Location
                  </h3>
                  <p className="font-paragraph text-[#FFFFFF]/80">
                    Available for remote work worldwide
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* WhatsApp Button */}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              href="https://wa.me/916390057777"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full p-4 bg-green-600 text-white hover:bg-green-700 transition-colors duration-300 group"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-paragraph font-medium">Chat on WhatsApp</span>
            </motion.a>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="font-heading text-xl text-[#000000]">
                Follow Me
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/yasharth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#D9D2C9] border border-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF] transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://linkedin.com/in/yasharth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#D9D2C9] border border-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF] transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://instagram.com/yasharth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#D9D2C9] border border-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF] transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-[#1A1A1A] py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl lg:text-5xl text-[#FFFFFF] mb-6">
              Frequently Asked Questions
            </h2>
            <p className="font-paragraph text-lg text-[#FFFFFF]/80 max-w-2xl mx-auto">
              Quick answers to common questions about working together
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {[
              {
                question: "What's your typical project timeline?",
                answer: "Project timelines vary based on scope and complexity. Simple websites typically take 2-4 weeks, while complex applications can take 2-3 months. I'll provide a detailed timeline during our initial consultation."
              },
              {
                question: "Do you work with international clients?",
                answer: "Absolutely! I work with clients worldwide and am experienced in remote collaboration. I'm flexible with time zones and use modern communication tools to ensure smooth project delivery."
              },
              {
                question: "What technologies do you specialize in?",
                answer: "I specialize in modern web technologies including React, Next.js, TypeScript, Node.js, and various AI/ML frameworks. I stay current with the latest trends and best practices in the industry."
              },
              {
                question: "How do you handle project revisions?",
                answer: "I include a reasonable number of revisions in all projects and maintain open communication throughout the development process. Major scope changes are discussed and quoted separately."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 bg-[#B7AEA3]"
              >
                <h3 className="font-heading text-lg text-[#000000] mb-3">
                  {faq.question}
                </h3>
                <p className="font-paragraph text-[#000000]/70 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}





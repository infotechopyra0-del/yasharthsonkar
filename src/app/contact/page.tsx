'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, MessageCircle, Twitter, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Dynamic data states
  const [contactInfo, setContactInfo] = useState<any[]>([]);
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all dynamic data
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      // Fetch contact info
      const contactRes = await fetch('/api/admin/contact/contact-info');
      const contactData = await contactRes.json();
      setContactInfo(contactData);

      // Fetch social links
      const socialRes = await fetch('/api/admin/contact/social-links');
      const socialData = await socialRes.json();
      setSocialLinks(socialData);

      // Fetch FAQs
      const faqRes = await fetch('/api/admin/contact/faq');
      const faqData = await faqRes.json();
      setFaqs(faqData);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    if ('preventDefault' in e) {
      e.preventDefault();
    }
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.message.trim();

  // Get icon based on type
  const getContactIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-6 h-6 text-[#FFFFFF]" />;
      case 'phone': return <Phone className="w-6 h-6 text-[#FFFFFF]" />;
      case 'location': return <MapPin className="w-6 h-6 text-[#FFFFFF]" />;
      case 'whatsapp': return <MessageCircle className="w-6 h-6 text-[#FFFFFF]" />;
      default: return <Mail className="w-6 h-6 text-[#FFFFFF]" />;
    }
  };

  // Get social icon based on platform
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github': return <Github className="w-6 h-6" />;
      case 'linkedin': return <Linkedin className="w-6 h-6" />;
      case 'instagram': return <Instagram className="w-6 h-6" />;
      case 'twitter': return <Twitter className="w-6 h-6" />;
      case 'facebook': return <Facebook className="w-6 h-6" />;
      default: return <Github className="w-6 h-6" />;
    }
  };

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

  // Find WhatsApp info for button
  const whatsappInfo = contactInfo.find(info => info.type === 'whatsapp');

  return (
    <div className="min-h-screen bg-[#B7AEA3]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="w-full max-w-400 mx-auto px-4 sm:px-6 py-12 sm:py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-20"
        >
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-8xl text-[#000000] mb-4 sm:mb-8">
            Let&apos;s Connect
          </h1>
          <p className="font-paragraph text-base sm:text-lg lg:text-xl text-[#000000]/80 max-w-3xl mx-auto leading-relaxed px-4">
            Ready to bring your vision to life? I&apos;d love to hear about your project 
            and explore how we can work together to create something extraordinary.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 lg:gap-24">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="space-y-4 sm:space-y-6">
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-[#000000]">
                Send a Message
              </h2>
              <p className="font-paragraph text-sm sm:text-base text-[#000000]/70 leading-relaxed">
                Fill out the form below and I&apos;ll get back to you within 24 hours. 
              </p>
              <p className="font-paragraph text-sm sm:text-base text-[#000000]/80 leading-relaxed max-w-xl">
                Let&apos;s discuss your project and how I can help bring it to life.
                Whether you&apos;re looking for full-stack development, AI integration, or strategic digital planning.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label htmlFor="name" className="block font-paragraph text-xs sm:text-sm font-medium text-[#000000] mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#B7AEA3] border-[#000000] text-[#000000] placeholder:text-[#000000]/50 focus:border-[#000000] text-sm sm:text-base"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-paragraph text-xs sm:text-sm font-medium text-[#000000] mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#B7AEA3] border-[#000000] text-[#000000] placeholder:text-[#000000]/50 focus:border-[#000000] text-sm sm:text-base"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-paragraph text-xs sm:text-sm font-medium text-[#000000] mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full bg-[#B7AEA3] border-[#000000] text-[#000000] placeholder:text-[#000000]/50 focus:border-[#000000] resize-none text-sm sm:text-base"
                    placeholder="Tell me about your project, goals, and how I can help..."
                  />
                </div>
              </div>

              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
                className="w-full bg-[#000000] text-[#FFFFFF] hover:bg-[#000000]/90 disabled:opacity-50 disabled:cursor-not-allowed py-3 sm:py-4 font-paragraph font-medium text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#FFFFFF]/20 border-t-[#FFFFFF] rounded-full animate-spin"></div>
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
                  className="p-3 sm:p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg"
                >
                  <p className="font-paragraph text-xs sm:text-sm">
                    Thank you for your message! I&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 sm:p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg"
                >
                  <p className="font-paragraph text-xs sm:text-sm">
                    Something went wrong. Please try again or contact me directly.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="space-y-4 sm:space-y-6">
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-[#000000]">
                Get in Touch
              </h2>
              <p className="font-paragraph text-sm sm:text-base text-[#000000]/70 leading-relaxed">
                Prefer to reach out directly? Here are the best ways to connect with me 
                for immediate assistance or quick questions.
              </p>
            </div>

            {/* Dynamic Contact Methods */}
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#000000] border-t-transparent"></div>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4 sm:space-y-6"
              >
                {contactInfo.map((info, index) => {
                  const isClickable = info.type === 'email' || info.type === 'phone';
                  const href = info.type === 'email' 
                    ? `mailto:${info.value}` 
                    : info.type === 'phone' 
                    ? `tel:${info.value}` 
                    : '#';

                  const Component = isClickable ? 'a' : 'div';

                  return (
                    <motion.div
                      key={info._id}
                      variants={itemVariants}
                    >
                      <Component
                        href={isClickable ? href : undefined}
                        className={`flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-[#1A1A1A] transition-colors duration-300 ${
                          isClickable ? 'hover:bg-[#000000] cursor-pointer' : ''
                        } group`}
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFFFFF]/10 group-hover:bg-[#FFFFFF]/20 rounded-full flex items-center justify-center shrink-0">
                          {getContactIcon(info.type)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-heading text-base sm:text-lg text-[#FFFFFF] group-hover:text-[#FFFFFF]">
                            {info.label}
                          </h3>
                          <p className="font-paragraph text-sm sm:text-base text-[#FFFFFF]/80 group-hover:text-[#FFFFFF]/80 wrap-break-word">
                            {info.value}
                          </p>
                        </div>
                      </Component>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* WhatsApp Button */}
            {whatsappInfo && (
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                href={whatsappInfo.value.startsWith('http') ? whatsappInfo.value : `https://wa.me/${whatsappInfo.value.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 sm:gap-3 w-full p-3 sm:p-4 bg-green-600 text-white hover:bg-green-700 transition-colors duration-300 group"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-paragraph font-medium text-sm sm:text-base">Chat on WhatsApp</span>
              </motion.a>
            )}

            {/* Dynamic Social Links */}
            {socialLinks.length > 0 && (
              <div className="space-y-3 sm:space-y-4">
                <h3 className="font-heading text-lg sm:text-xl text-[#000000]">
                  Follow Me
                </h3>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social._id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 sm:p-3 bg-[#D9D2C9] border border-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF] transition-colors duration-300"
                      aria-label={social.platform}
                    >
                      {getSocialIcon(social.platform)}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Dynamic FAQ Section */}
      {faqs.length > 0 && (
        <section className="w-full bg-[#1A1A1A] py-12 sm:py-20">
          <div className="max-w-400 mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-16"
            >
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#FFFFFF] mb-4 sm:mb-6">
                Frequently Asked Questions
              </h2>
              <p className="font-paragraph text-base sm:text-lg text-[#FFFFFF]/80 max-w-2xl mx-auto px-4">
                Quick answers to common questions about working together
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-4 sm:gap-8 max-w-4xl mx-auto"
            >
              {faqs.map((faq) => (
                <motion.div
                  key={faq._id}
                  variants={itemVariants}
                  className="p-4 sm:p-6 bg-[#B7AEA3]"
                >
                  <h3 className="font-heading text-base sm:text-lg text-[#000000] mb-2 sm:mb-3">
                    {faq.question}
                  </h3>
                  <p className="font-paragraph text-[#000000]/70 text-xs sm:text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}
      
      <Footer />
    </div>
  );
}
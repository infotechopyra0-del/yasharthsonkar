'use client';

import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Eye, Heart, Share2, Download, ZoomIn } from 'lucide-react';
import { useState } from 'react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', name: 'All', count: 30 },
    { id: 'projects', name: 'Projects', count: 10 },
    { id: 'events', name: 'Events', count: 8 },
    { id: 'team', name: 'Team', count: 7 },
    { id: 'workspace', name: 'Workspace', count: 5 },
  ];

  const galleryItems = [
    {
      id: 1,
      title: 'Modern Web Architecture',
      category: 'projects',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=800&fit=crop',
      description: 'Clean, scalable web application architecture design',
    },
    {
      id: 2,
      title: 'Digital Transformation Strategy',
      category: 'projects',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=800&fit=crop',
      description: 'Comprehensive digital strategy implementation for enterprises',
    },
    {
      id: 3,
      title: 'Cloud Infrastructure Design',
      category: 'projects',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=800&fit=crop',
      description: 'Scalable cloud architecture for modern applications',
    },
    {
      id: 4,
      title: 'Team Collaboration',
      category: 'team',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=800&fit=crop',
      description: 'Creative brainstorming session with the development team',
    },
    {
      id: 5,
      title: 'Tech Conference 2024',
      category: 'events',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=800&fit=crop',
      description: 'Speaking at the Annual AI & Web Development Summit',
    },
    {
      id: 6,
      title: 'Modern Workspace',
      category: 'workspace',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=800&fit=crop',
      description: 'Clean and productive development environment',
    },
    {
      id: 7,
      title: 'Next.js Application',
      category: 'projects',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=800&fit=crop',
      description: 'Full-stack e-commerce platform with advanced features'
    },
    {
      id: 8,
      title: 'Product Launch Event',
      category: 'events',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=800&fit=crop',
      description: 'Successful launch of our latest AI solution',
    },
    {
      id: 9,
      title: 'Development Setup',
      category: 'workspace',
      image: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=800&h=800&fit=crop',
      description: 'Multi-monitor setup for efficient coding',
    },
    {
      id: 10,
      title: 'Team Building',
      category: 'team',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=800&fit=crop',
      description: 'Annual team retreat and planning session',
      likes: 76,
      views: 445,
    },
    {
      id: 11,
      title: 'Gold Intiro Showroom',
      category: 'projects',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=800&fit=crop',
      description: 'Premium modular kitchen display and consultation area',
      likes: 38,
      views: 234,
    },
    {
      id: 12,
      title: 'Innovation Workshop',
      category: 'events',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=800&fit=crop',
      description: 'Hands-on workshop on AI integration in web development',
      likes: 56,
      views: 378,
    },
    {
      id: 13,
      title: 'Digital Marketing Campaign',
      category: 'projects',
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=800&fit=crop',
      description: 'Successful social media marketing strategy implementation',
      likes: 62,
      views: 412,
    },
    {
      id: 14,
      title: 'Client Meeting',
      category: 'team',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=800&fit=crop',
      description: 'Strategic planning session with enterprise clients',
      likes: 34,
      views: 198,
    },
    {
      id: 15,
      title: 'Code Review Session',
      category: 'workspace',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop',
      description: 'Collaborative code review and optimization meeting',
      likes: 28,
      views: 167,
    },
    {
      id: 16,
      title: 'Tech Meetup',
      category: 'events',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop',
      description: 'Local developer community meetup and networking',
      likes: 41,
      views: 256,
    },
    {
      id: 17,
      title: 'Mobile App Interface',
      category: 'projects',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=800&fit=crop',
      description: 'Intuitive mobile application design and development',
      likes: 73,
      views: 489,
    },
    {
      id: 18,
      title: 'Creative Workspace',
      category: 'workspace',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=800&fit=crop',
      description: 'Inspiring workspace designed for maximum creativity',
      likes: 55,
      views: 334,
    },
    {
      id: 19,
      title: 'Team Presentation',
      category: 'team',
      image: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=800&fit=crop',
      description: 'Quarterly business review and goal setting session',
      likes: 47,
      views: 278,
    },
    {
      id: 20,
      title: 'Startup Pitch',
      category: 'events',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=800&fit=crop',
      description: 'Presenting innovative solutions to potential investors'
    },
    {
      id: 21,
      title: 'E-commerce Platform',
      category: 'projects',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=800&fit=crop',
      description: 'Comprehensive online shopping platform with AI recommendations',
      likes: 69,
      views: 445,
    },
    {
      id: 22,
      title: 'Remote Work Setup',
      category: 'workspace',
      image: 'https://images.unsplash.com/photo-1484807352052-23338990c6c6?w=800&h=800&fit=crop',
      description: 'Optimized home office for distributed team collaboration',
      likes: 37,
      views: 223,
    },
    {
      id: 23,
      title: 'Project Planning',
      category: 'team',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=800&fit=crop',
      description: 'Agile project management and sprint planning workshop',
      likes: 52,
      views: 312,
    },
    {
      id: 24,
      title: 'Awards Ceremony',
      category: 'events',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=800&fit=crop',
      description: 'Recognition for excellence in digital innovation',
    },
    {
      id: 25,
      title: 'API Development Workshop',
      category: 'projects',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=800&fit=crop',
      description: 'RESTful API design and development best practices',
    },
    {
      id: 26,
      title: 'UI/UX Design Process',
      category: 'projects',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=800&fit=crop',
      description: 'User-centered design methodology and prototyping',
    },
    {
      id: 27,
      title: 'Technology Summit 2024',
      category: 'events',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=800&fit=crop',
      description: 'Annual technology conference with industry leaders',
    },
    {
      id: 28,
      title: 'Agile Development Team',
      category: 'team',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=800&fit=crop',
      description: 'Scrum master facilitating daily standup meeting',
    },
    {
      id: 29,
      title: 'Database Optimization',
      category: 'projects',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=800&fit=crop',
      description: 'Performance tuning and database architecture optimization',
    },
    {
      id: 30,
      title: 'Global Developer Conference',
      category: 'events',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=800&fit=crop',
      description: 'International conference on emerging technologies',
    },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
      {/* Navigation Bar */}
      <Navigation />

      {/* Hero Section */}
      <section className="w-full max-w-400 mx-auto px-6 py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-heading text-6xl lg:text-8xl text-[#000000] mb-8">
            Gallery
          </h1>
          <p className="font-paragraph text-lg lg:text-xl text-[#000000]/80 max-w-3xl mx-auto leading-relaxed">
            A visual journey through our projects, achievements, and behind-the-scenes moments. 
            Explore the work that defines our commitment to excellence and innovation.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-paragraph text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-[#000000] text-[#FFFFFF] shadow-lg'
                  : 'bg-[#FFFFFF] text-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF]'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group relative overflow-hidden bg-[#FFFFFF] rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  width={400}
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-[#000000]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-heading text-lg text-[#FFFFFF] mb-2">{item.title}</h3>
                  <p className="font-paragraph text-sm text-[#FFFFFF]/80 mb-3">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setSelectedImage(item)}
                      className="flex items-center gap-1 bg-[#FFFFFF]/20 hover:bg-[#FFFFFF]/30 text-[#FFFFFF] px-3 py-1 rounded-full text-xs transition-colors"
                    >
                      <ZoomIn className="w-3 h-3" />
                      View
                    </button>
                  </div>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-[#000000]/80 text-[#FFFFFF] px-2 py-1 rounded-full text-xs font-medium">
                  {categories.find(cat => cat.id === item.category)?.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 pt-16 border-t border-[#000000]/10"
        >
          <div className="text-center">
            <div className="font-heading text-3xl lg:text-4xl text-[#000000] mb-2">30+</div>
            <div className="font-paragraph text-sm text-[#000000]/80">Total Images</div>
          </div>
          <div className="text-center">
            <div className="font-heading text-3xl lg:text-4xl text-[#000000] mb-2">10</div>
            <div className="font-paragraph text-sm text-[#000000]/80">Project Showcases</div>
          </div>
          <div className="text-center">
            <div className="font-heading text-3xl lg:text-4xl text-[#000000] mb-2">8</div>
            <div className="font-paragraph text-sm text-[#000000]/80">Events Covered</div>
          </div>
          <div className="text-center">
            <div className="font-heading text-3xl lg:text-4xl text-[#000000] mb-2">10+</div>
            <div className="font-paragraph text-sm text-[#000000]/80">Years Journey</div>
          </div>
        </motion.div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#000000]/90 z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl max-h-[90vh] bg-[#FFFFFF] rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain"
                width={800}
              />
              
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-[#000000]/50 hover:bg-[#000000]/70 text-[#FFFFFF] rounded-full flex items-center justify-center transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              <h3 className="font-heading text-2xl text-[#000000] mb-2">{selectedImage.title}</h3>
              <p className="font-paragraph text-[#000000]/80 mb-4">{selectedImage.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
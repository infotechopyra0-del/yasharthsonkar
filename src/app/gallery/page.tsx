'use client';

import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ZoomIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  likes: number;
  views: number;
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'projects', name: 'Projects' },
    { id: 'events', name: 'Events' },
    { id: 'team', name: 'Team' },
    { id: 'workspace', name: 'Workspace' },
  ];

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/gallery');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setGalleryItems(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const normalize = (s?: string) => (s ? s.toString().toLowerCase() : '');

  const filteredItems = normalize(selectedCategory) === 'all'
    ? galleryItems
    : galleryItems.filter(item => normalize(item.category) === normalize(selectedCategory));

  const getCategoryCount = (categoryId: string) => {
    if (normalize(categoryId) === 'all') return galleryItems.length;
    return galleryItems.filter(item => normalize(item.category) === normalize(categoryId)).length;
  };

  const stats = {
    totalImages: galleryItems.length,
    projectsCount: galleryItems.filter(item => normalize(item.category) === 'projects').length,
    eventsCount: galleryItems.filter(item => normalize(item.category) === 'events').length,
    teamCount: galleryItems.filter(item => normalize(item.category) === 'team').length,
    workspaceCount: galleryItems.filter(item => normalize(item.category) === 'workspace').length,
  };

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
      <Navigation />

      {/* Hero Section */}
      <section className="w-full max-w-400 mx-auto px-4 sm:px-6 py-12 sm:py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-8xl text-[#000000] mb-4 sm:mb-8">
            Gallery
          </h1>
          <p className="font-paragraph text-base sm:text-lg lg:text-xl text-[#000000]/80 max-w-3xl mx-auto leading-relaxed px-4">
            A visual journey through our projects, achievements, and behind-the-scenes moments. 
            Explore the work that defines our commitment to excellence and innovation.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-paragraph text-xs sm:text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-[#000000] text-[#FFFFFF] shadow-lg scale-105'
                  : 'bg-[#FFFFFF] text-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF]'
              }`}
            >
              {category.name} ({getCategoryCount(category.id)})
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center py-12 sm:py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-[#000000] border-t-transparent"></div>
            <p className="mt-4 text-[#000000] font-paragraph text-sm sm:text-base">Loading gallery...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12 sm:py-20">
            <p className="text-lg sm:text-xl font-heading text-[#000000] mb-2">No images found</p>
            <p className="text-sm sm:text-base font-paragraph text-[#000000]/60">
              {selectedCategory === 'all' 
                ? 'Gallery is empty. Check back soon!' 
                : `No images in ${categories.find(c => c.id === selectedCategory)?.name} category`}
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item._id}
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
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <h3 className="font-heading text-base sm:text-lg text-[#FFFFFF] mb-1 sm:mb-2 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="font-paragraph text-xs sm:text-sm text-[#FFFFFF]/80 mb-2 sm:mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    
                    <button
                      onClick={() => setSelectedImage(item)}
                      className="flex items-center gap-1 bg-[#FFFFFF]/20 hover:bg-[#FFFFFF]/30 text-[#FFFFFF] px-2 sm:px-3 py-1 rounded-full text-xs transition-colors"
                    >
                      <ZoomIn className="w-3 h-3" />
                      View
                    </button>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                  <span className="bg-[#000000]/80 text-[#FFFFFF] px-2 py-1 rounded-full text-xs font-medium">
                    {categories.find(cat => cat.id === item.category)?.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Dynamic Stats Section */}
        {!loading && galleryItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-20 pt-8 sm:pt-16 border-t border-[#000000]/10"
          >
            <div className="text-center">
              <div className="font-heading text-2xl sm:text-3xl lg:text-4xl text-[#000000] mb-1 sm:mb-2">
                {stats.totalImages}+
              </div>
              <div className="font-paragraph text-xs sm:text-sm text-[#000000]/80">
                Total Images
              </div>
            </div>
            <div className="text-center">
              <div className="font-heading text-2xl sm:text-3xl lg:text-4xl text-[#000000] mb-1 sm:mb-2">
                {stats.projectsCount}
              </div>
              <div className="font-paragraph text-xs sm:text-sm text-[#000000]/80">
                Project Showcases
              </div>
            </div>
            <div className="text-center">
              <div className="font-heading text-2xl sm:text-3xl lg:text-4xl text-[#000000] mb-1 sm:mb-2">
                {stats.eventsCount}
              </div>
              <div className="font-paragraph text-xs sm:text-sm text-[#000000]/80">
                Events Covered
              </div>
            </div>
            <div className="text-center">
              <div className="font-heading text-2xl sm:text-3xl lg:text-4xl text-[#000000] mb-1 sm:mb-2">
                10+
              </div>
              <div className="font-paragraph text-xs sm:text-sm text-[#000000]/80">
                Years Journey
              </div>
            </div>
          </motion.div>
        )}
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#000000]/90 z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#FFFFFF] rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[60vh] sm:max-h-[70vh] object-contain"
                width={800}
              />
              
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-[#000000]/50 hover:bg-[#000000]/70 text-[#FFFFFF] rounded-full flex items-center justify-center transition-colors text-xl sm:text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="p-4 sm:p-6">
              <h3 className="font-heading text-xl sm:text-2xl text-[#000000] mb-2">
                {selectedImage.title}
              </h3>
              <p className="font-paragraph text-sm sm:text-base text-[#000000]/80">
                {selectedImage.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
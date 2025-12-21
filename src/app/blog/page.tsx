'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, Download, FileText, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Image } from '@/components/ui/image';
import { staticBlogPosts } from '@/lib/static-data';

export default function BlogPage() {
  const publishedPosts = staticBlogPosts.filter(post => post.isPublished);

  const handleDownloadEbook = () => {
    // Create a download link for the eBook
    const link = document.createElement('a');
    link.href = '/files/Complete-Guide-Full-Stack-Development.txt';
    link.download = 'Complete-Guide-Full-Stack-Development.txt';
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#B7AEA3] pt-24">
      {/* Hero Section */}
      <section className="w-full py-16 lg:py-24">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-5xl lg:text-7xl text-[#000000] mb-6">
              Tech Blog & Resources
            </h1>
            <p className="font-paragraph text-xl text-[#000000]/80 max-w-3xl mx-auto leading-relaxed">
              Insights, tutorials, and resources on web development, AI, digital marketing, 
              and the latest technology trends to help you stay ahead in the digital world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {publishedPosts.length > 0 && (
        <section className="w-full pb-16">
          <div className="max-w-[100rem] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="font-heading text-3xl lg:text-4xl text-[#000000] mb-8">
                Featured Article
              </h2>
              <div className="bg-[#FFFFFF] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 group">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
                    <Image
                      src={publishedPosts[0].featuredImage}
                      alt={publishedPosts[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      width={600}
                      height={400}
                    />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-[#1A1A1A] text-[#FFFFFF] text-sm rounded-full">
                        {publishedPosts[0].category}
                      </span>
                      <div className="flex items-center gap-2 text-[#000000]/60 text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(publishedPosts[0].publishDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-[#000000]/60 text-sm">
                        <Clock className="w-4 h-4" />
                        {publishedPosts[0].readTime} min read
                      </div>
                    </div>
                    <h3 className="font-heading text-2xl lg:text-3xl text-[#000000] mb-4 group-hover:text-[#1A1A1A] transition-colors">
                      {publishedPosts[0].title}
                    </h3>
                    <p className="font-paragraph text-[#000000]/80 mb-6 leading-relaxed">
                      {publishedPosts[0].excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {publishedPosts[0].tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="flex items-center gap-1 px-2 py-1 bg-[#B7AEA3] text-[#000000] text-xs rounded">
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/blog/${publishedPosts[0].slug}`}
                      className="inline-flex items-center gap-2 text-[#000000] hover:text-[#1A1A1A] font-medium transition-colors group-hover:gap-3 duration-300"
                    >
                      Read Full Article
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="w-full pb-16">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="font-heading text-3xl lg:text-4xl text-[#000000] mb-8">
              Latest Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedPosts.slice(1).map((post, index) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-[#FFFFFF] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col h-full"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      width={400}
                      height={250}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2 py-1 bg-[#1A1A1A] text-[#FFFFFF] text-xs rounded">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1 text-[#000000]/60 text-xs">
                        <Clock className="w-3 h-3" />
                        {post.readTime} min
                      </div>
                    </div>
                    <h3 className="font-heading text-xl text-[#000000] mb-3 group-hover:text-[#1A1A1A] transition-colors line-clamp-2 min-h-[3.5rem]">
                      {post.title}
                    </h3>
                    <p className="font-paragraph text-[#000000]/70 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow min-h-[4.5rem]">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2 text-[#000000]/60 text-xs">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.publishDate).toLocaleDateString()}
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-[#000000] hover:text-[#1A1A1A] text-sm font-medium transition-colors"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Free eBook Section */}
      <section className="w-full bg-[#1A1A1A] py-16">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-[#B7AEA3] to-[#D9D2C9] rounded-2xl p-8 lg:p-12">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-[#000000] rounded-full flex items-center justify-center">
                    <FileText className="w-8 h-8 text-[#FFFFFF]" />
                  </div>
                </div>
                <h2 className="font-heading text-3xl lg:text-4xl text-[#000000] mb-4">
                  Free eBook: Complete Guide to Full-Stack Development
                </h2>
                <p className="font-paragraph text-xl text-[#000000]/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Download our comprehensive 200+ page guide covering everything from React and Next.js 
                  to backend development, databases, and deployment strategies.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#000000] rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-[#FFFFFF] font-bold text-lg">200+</span>
                    </div>
                    <h4 className="font-heading text-lg text-[#000000] mb-2">Pages</h4>
                    <p className="font-paragraph text-sm text-[#000000]/70">Comprehensive content</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#000000] rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-[#FFFFFF] font-bold text-lg">15+</span>
                    </div>
                    <h4 className="font-heading text-lg text-[#000000] mb-2">Chapters</h4>
                    <p className="font-paragraph text-sm text-[#000000]/70">Step-by-step learning</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#000000] rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-[#FFFFFF] font-bold text-lg">50+</span>
                    </div>
                    <h4 className="font-heading text-lg text-[#000000] mb-2">Examples</h4>
                    <p className="font-paragraph text-sm text-[#000000]/70">Practical code samples</p>
                  </div>
                </div>

                <motion.button
                  onClick={handleDownloadEbook}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#000000] text-[#FFFFFF] hover:bg-[#000000]/90 transition-all duration-300 text-lg font-paragraph font-medium shadow-lg hover:shadow-xl"
                >
                  <Download className="w-5 h-5" />
                  Download Free eBook
                </motion.button>
                
                <p className="font-paragraph text-sm text-[#000000]/60 mt-4">
                  No email required • Instant download • Text format (PDF coming soon)
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-16">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <div className="max-w-2xl mx-auto">
              <h2 className="font-heading text-3xl lg:text-4xl text-[#000000] mb-4">
                Stay Updated
              </h2>
              <p className="font-paragraph text-lg text-[#000000]/80 mb-8">
                Get the latest articles, tutorials, and insights delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border-2 border-[#000000]/20 focus:border-[#000000] outline-none transition-colors font-paragraph"
                />
                <button className="px-6 py-3 bg-[#000000] text-[#FFFFFF] hover:bg-[#000000]/90 transition-colors font-paragraph font-medium">
                  Subscribe
                </button>
              </div>
              <p className="font-paragraph text-sm text-[#000000]/60 mt-3">
                Join 1000+ developers who trust our insights
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
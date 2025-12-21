'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowLeft, Download, FileText } from 'lucide-react';
import Link from 'next/link';
import { Image } from '@/components/ui/image';
import type { BlogPost } from '@/types';

interface ClientBlogPostProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function ClientBlogPost({ post, relatedPosts }: ClientBlogPostProps) {
  const handleDownloadEbook = () => {
    // Create a download link for the eBook
    const link = document.createElement('a');
    link.href = '/files/Complete-Guide-Full-Stack-Development.txt';
    link.download = 'Complete-Guide-Full-Stack-Development.txt';
    link.click();
  };

  const isEbookPost = post.category === 'Resources' && post.tags.includes('eBook');

  return (
    <div className="min-h-screen bg-[#B7AEA3] pt-24">
      {/* Back Navigation */}
      <section className="w-full py-8">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#000000] hover:text-[#000000]/80 transition-colors font-paragraph"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <section className="w-full pb-8">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-[#1A1A1A] text-[#FFFFFF] text-sm rounded-full">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-[#000000]/60 text-sm">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishDate).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2 text-[#000000]/60 text-sm">
                <Clock className="w-4 h-4" />
                {post.readTime} min read
              </div>
            </div>
            
            <h1 className="font-heading text-4xl lg:text-5xl text-[#000000] mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="font-paragraph text-xl text-[#000000]/80 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <span key={index} className="flex items-center gap-1 px-3 py-1 bg-[#FFFFFF] text-[#000000] text-sm rounded-full">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="w-full pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="aspect-[16/9] overflow-hidden rounded-2xl shadow-2xl"
          >
            <Image
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
              width={800}
              height={450}
            />
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="w-full pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-[#FFFFFF] rounded-2xl p-8 lg:p-12 shadow-xl"
          >
            <div className="prose prose-lg max-w-none">
              <div 
                className="font-paragraph text-[#000000] leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: post.content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>').replace(/^/, '<p>').replace(/$/, '</p>')
                    .replace(/## (.*?)<br>/g, '<h2 class="font-heading text-2xl text-[#000000] mt-8 mb-4">$1</h2>')
                    .replace(/### (.*?)<br>/g, '<h3 class="font-heading text-xl text-[#000000] mt-6 mb-3">$1</h3>')
                    .replace(/- (.*?)<br>/g, '<li class="ml-4">$1</li>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                }}
              />
            </div>

            {/* Download Button for eBook Posts */}
            {isEbookPost && (
              <div className="mt-12 p-8 bg-gradient-to-r from-[#B7AEA3] to-[#D9D2C9] rounded-xl text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-[#000000] rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#FFFFFF]" />
                  </div>
                </div>
                <h3 className="font-heading text-2xl text-[#000000] mb-4">
                  Ready to Download?
                </h3>
                <p className="font-paragraph text-[#000000]/80 mb-6">
                  Get instant access to our comprehensive full-stack development guide.
                </p>
                <motion.button
                  onClick={handleDownloadEbook}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#000000] text-[#FFFFFF] hover:bg-[#000000]/90 transition-all duration-300 text-lg font-paragraph font-medium shadow-lg hover:shadow-xl rounded-lg"
                >
                  <Download className="w-5 h-5" />
                  Download Free eBook
                </motion.button>
                <p className="font-paragraph text-sm text-[#000000]/60 mt-3">
                  No email required • Instant download • Text format (PDF coming soon)
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="w-full pb-16">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="font-heading text-3xl text-[#000000] mb-8">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.article
                    key={relatedPost._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="bg-[#FFFFFF] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <Image
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        width={300}
                        height={200}
                      />
                    </div>
                    <div className="p-4">
                      <span className="px-2 py-1 bg-[#1A1A1A] text-[#FFFFFF] text-xs rounded mb-3 inline-block">
                        {relatedPost.category}
                      </span>
                      <h3 className="font-heading text-lg text-[#000000] mb-2 group-hover:text-[#1A1A1A] transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="font-paragraph text-[#000000]/70 text-sm mb-3 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="text-[#000000] hover:text-[#1A1A1A] text-sm font-medium transition-colors"
                      >
                        Read More →
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
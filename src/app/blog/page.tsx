"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Tag,
  Download,
  FileText,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { Image } from "@/components/ui/image";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  readTime: number;
  publishDate: string;
  isPublished: boolean;
  isFeatured: boolean;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
        const res = await fetch(
          `${baseUrl}/api/admin/blogs?published=true`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Failed to fetch blogs");

        const data = await res.json();
        setBlogs(data?.data ?? []);
      } catch (error) {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const featuredPost =
    blogs.find((b) => b.isFeatured) ?? blogs[0] ?? null;

  const remainingPosts = featuredPost
    ? blogs.filter((b) => b._id !== featuredPost._id)
    : [];

  const handleDownloadEbook = () => {
    const link = document.createElement("a");
    link.href = "/files/Complete-Guide-Full-Stack-Development.txt";
    link.download = "Complete-Guide-Full-Stack-Development.txt";
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#B7AEA3] pt-24">
      <Navigation />

      {/* HERO */}
      <section className="py-16 lg:py-24 text-center">
        <h1 className="font-heading text-5xl lg:text-7xl mb-6">
          Tech Blog & Resources
        </h1>
        <p className="text-xl max-w-3xl mx-auto text-black/80">
          Insights, tutorials, and resources on web development,
          AI, and modern tech.
        </p>
      </section>

      {/* FEATURED POST */}
      {loading && (
        <section className="pb-16 max-w-6xl mx-auto px-6">
          <div className="bg-white p-8 rounded-2xl animate-pulse h-64" />
        </section>
      )}

      {!loading && featuredPost && (
        <section className="pb-16 max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-heading mb-6">Featured Article</h2>

          <div className="bg-white rounded-2xl overflow-hidden shadow-xl grid lg:grid-cols-2">
              <div className="aspect-video overflow-hidden">
                <Image
                  src={featuredPost.featuredImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                  width={800}
                  height={450}
                />
              </div>

            <div className="p-8 flex flex-col justify-center">
              <div className="flex gap-4 text-sm text-black/60 mb-3">
                <span className="bg-black text-white px-3 py-1 rounded-full">
                  {featuredPost.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(featuredPost.publishDate).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {featuredPost.readTime} min
                </span>
              </div>

              <h3 className="text-3xl font-heading mb-4">
                {featuredPost.title}
              </h3>

              <p className="text-black/80 mb-6">
                {featuredPost.excerpt}
              </p>

              <Link
                href={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center gap-2 font-medium"
              >
                Read Full Article <ExternalLink size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* BLOG GRID */}
      {!loading && remainingPosts.length > 0 && (
        <section className="pb-16 max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-heading mb-8">
            Latest Articles
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingPosts.map((post) => (
              <article
                key={post._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
              >
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    width={800}
                    height={450}
                  />
                </div>

                <div className="p-6 flex flex-col grow">
                  <h3 className="font-heading text-xl mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-black/70 line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-auto text-sm font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* NO BLOGS */}
      {!loading && blogs.length === 0 && (
        <section className="py-20 text-center">
          <FileText className="w-16 h-16 mx-auto mb-4 text-black/30" />
          <h3 className="text-2xl font-heading">No Blogs Yet</h3>
          <p className="text-black/60">Coming soon 🚀</p>
        </section>
      )}

      {/* EBOOK */}
      <section className="bg-black py-16 text-center">
        <h2 className="text-3xl font-heading text-white mb-4">
          Free Full-Stack eBook
        </h2>

        <button
          onClick={handleDownloadEbook}
          className="mt-6 px-8 py-4 bg-white text-black font-medium inline-flex gap-2"
        >
          <Download size={18} /> Download Free eBook
        </button>
      </section>

      <Footer />
    </div>
  );
}

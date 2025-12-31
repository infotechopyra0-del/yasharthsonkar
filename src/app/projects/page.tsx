"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  projectImage: string;
  techStack: string;
  category: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  published: boolean;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchProjects() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
        const res = await fetch(
          `${baseUrl}/api/admin/projects?published=true`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Failed to fetch projects");

        const data = await res.json();
        if (mounted) {
          setProjects(data.success ? data.data : []);
        }
      } catch (error) {
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchProjects();
    return () => {
      mounted = false;
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
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
          <h1 className="font-heading text-6xl lg:text-8xl text-[#000000] mb-8">
            Featured Work
          </h1>
          <p className="font-paragraph text-lg lg:text-xl text-[#000000]/80 max-w-3xl mx-auto leading-relaxed">
            A curated selection of projects that showcase innovation, technical
            excellence, and creative problem-solving.
          </p>
        </motion.div>
        {loading ? (
          <div className="py-20">
            <div className="animate-pulse space-y-12">
              <div className="h-12 bg-[#000000]/10 rounded w-1/3 mx-auto"></div>

              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-6">
                    <div className="aspect-16/10 bg-[#1A1A1A]/20 rounded-lg"></div>
                    <div className="space-y-4">
                      <div className="h-6 bg-[#000000]/10 rounded w-1/2"></div>
                      <div className="h-4 bg-[#000000]/10 rounded w-3/4"></div>
                      <div className="flex gap-2">
                        <div className="h-8 w-20 bg-[#000000]/10 rounded"></div>
                        <div className="h-8 w-24 bg-[#000000]/10 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : projects.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-12 lg:gap-16"
          >
            {projects.map((project) => (
              <motion.div
                key={project._id}
                variants={itemVariants}
                className="group"
              >
                <div className="aspect-16/10 overflow-hidden mb-8 bg-[#1A1A1A] rounded-lg">
                  {project.projectImage ? (
                    <Image
                      src={project.projectImage}
                      alt={project.title || "Project image"}
                      width={800}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ArrowRight className="w-10 h-10 text-white/60" />
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-[#1A1A1A] text-white text-xs font-bold uppercase">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="px-3 py-1 bg-yellow-500 text-black text-xs font-bold uppercase">
                          Featured
                        </span>
                      )}
                    </div>

                    <h2 className="font-heading text-3xl lg:text-4xl text-black">
                      {project.title}
                    </h2>

                    {project.description && (
                      <p className="font-paragraph text-black/70 leading-relaxed">
                        {project.description}
                      </p>
                    )}
                  </div>

                  {project.techStack && (
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.split(",").map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-[#D9D2C9] border border-black text-sm"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        className="px-6 py-3 bg-black text-white inline-flex items-center gap-2"
                      >
                        View Live <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        className="px-6 py-3 border-2 border-black inline-flex items-center gap-2"
                      >
                        View Code <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <h2 className="text-2xl font-heading mb-4">
              Projects Coming Soon
            </h2>
            <p className="text-black/70">
              New projects will be published shortly.
            </p>
          </motion.div>
        )}
      </section>

      <Footer />
    </div>
  );
}

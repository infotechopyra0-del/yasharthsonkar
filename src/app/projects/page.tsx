'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { staticProjects } from '@/lib/static-data';

export default function ProjectsPage() {
  const projects = staticProjects;
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
          <p className="font-paragraph text-[#000000]">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#B7AEA3]">
      {/* Hero Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-20 lg:py-32">
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
            A curated selection of projects that showcase innovation, technical excellence, 
            and creative problem-solving across various domains and technologies.
          </p>
        </motion.div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
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
                {/* Project Image */}
                <div className="aspect-[16/10] overflow-hidden mb-8 bg-[#1A1A1A]">
                  {project.projectImage ? (
                    <Image
                      src={project.projectImage}
                      alt={project.title || 'Project image'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      width={800}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-[#FFFFFF]/60">
                        <div className="w-16 h-16 mx-auto mb-4 bg-[#1A1A1A]-foreground/10 rounded-full flex items-center justify-center">
                          <ArrowRight className="w-8 h-8" />
                        </div>
                        <p className="font-paragraph text-sm">Project Preview</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="font-heading text-3xl lg:text-4xl text-[#000000] group-hover:text-[#000000]/80 transition-colors duration-300">
                      {project.title || 'Untitled Project'}
                    </h2>
                    
                    {project.description && (
                      <p className="font-paragraph text-base lg:text-lg text-[#000000]/70 leading-relaxed">
                        {project.description}
                      </p>
                    )}
                  </div>

                  {/* Tech Stack */}
                  {project.techStack && (
                    <div className="space-y-3">
                      <h3 className="font-heading text-lg text-[#000000]">
                        Technologies Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.split(',').map((tech: string, techIndex: number) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-[#D9D2C9] text-[#000000] font-paragraph text-sm border border-[#000000]"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
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
                Projects Coming Soon
              </h2>
              <p className="font-paragraph text-[#000000]/70 leading-relaxed">
                I&apos;m currently working on some exciting projects that will be showcased here. 
                Check back soon to see the latest work and innovations.
              </p>
            </div>
          </motion.div>
        )}
      </section>

      {/* Call to Action */}
      <section className="w-full bg-[#1A1A1A] py-20">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="font-heading text-4xl lg:text-5xl text-[#FFFFFF]">
              Ready to Start Your Project?
            </h2>
            <p className="font-paragraph text-lg text-[#FFFFFF]/80 max-w-2xl mx-auto">
              Let&apos;s collaborate to bring your vision to life with innovative solutions 
              and cutting-edge technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <a
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#FFFFFF] text-[#1A1A1A] hover:bg-[#FFFFFF]/90 transition-colors duration-300 group"
              >
                <span className="font-paragraph font-medium">Start a Project</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a
                href="/services"
                className="inline-flex items-center gap-3 px-8 py-4 border border-[#FFFFFF] text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#1A1A1A] transition-colors duration-300"
              >
                <span className="font-paragraph font-medium">View Services</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}





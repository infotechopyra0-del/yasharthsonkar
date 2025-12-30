"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Code, Brain } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

const useProfessionalExperiences = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const res = await fetch('/api/about/professional-journey');
        if (!res.ok) throw new Error(`Failed to fetch professional experiences: ${res.status}`);
        const data = await res.json();
        if (mounted) setItems(Array.isArray(data) ? data : (data || []));
      } catch (err) {
        console.error('Error loading professional experiences:', err);
      }
    };
    fetchData();
    return () => { mounted = false; };
  }, []);

  return items;
};

const useCoreCompetencies = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const res = await fetch('/api/about/core-competencies');
        if (!res.ok) throw new Error(`Failed to fetch competencies: ${res.status}`);
        const data = await res.json();
        if (mounted) setItems(Array.isArray(data) ? data : (data || []));
      } catch (err) {
        console.error('Error loading core competencies:', err);
      }
    };
    fetchData();
    return () => { mounted = false; };
  }, []);

  return items;
};

const useCoreExpertise = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const res = await fetch('/api/admin/about/core-expertise');
        if (!res.ok) throw new Error(`Failed to fetch core expertise: ${res.status}`);
        const data = await res.json();
        if (mounted) setItems(data || []);
      } catch (err) {
        console.error('Error loading core expertise:', err);
      }
    };
    fetchData();
    return () => { mounted = false; };
  }, []);

  return items;
};

const useJourneyHighlights = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const res = await fetch('/api/about/journey-highlights');
        if (!res.ok) throw new Error(`Failed to fetch highlights: ${res.status}`);
        const data = await res.json();
        if (mounted) setItems(data || []);
      } catch (err) {
        console.error('Error loading journey highlights:', err);
      }
    };
    fetchData();
    return () => { mounted = false; };
  }, []);

  return items;
};


const useAcademicExperiences = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const res = await fetch('/api/about/academic-journey');
        if (!res.ok) throw new Error(`Failed to fetch academic experiences: ${res.status}`);
        const data = await res.json();
        if (mounted) setItems(Array.isArray(data) ? data : (data || []));
      } catch (err) {
        console.error('Error loading academic experiences:', err);
      }
    };
    fetchData();
    return () => { mounted = false; };
  }, []);

  return items;
};


export default function AboutPage() {
  const professionalExperiences = useProfessionalExperiences();
  const academicExperiences = useAcademicExperiences();
  const skills = useCoreCompetencies();
  const coreExpertise = useCoreExpertise();
  const journeyHighlights = useJourneyHighlights();
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
          <div className="w-16 h-16 border-4 border-[#000000]/20 border-t-[#000000] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-paragraph text-[#000000]">Loading...</p>
        </div>
      </div>
    );
  }

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
            About Me
          </h1>
          <p className="font-paragraph text-lg lg:text-xl text-[#000000]/80 max-w-3xl mx-auto leading-relaxed">
            Passionate about creating digital solutions that make a difference.
            With expertise spanning full-stack development, AI integration, and strategic digital planning.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="aspect-4/5 overflow-hidden">
              <Image
                src="/images/yasharthsonker.jpg"
                alt="Yasharth Sonker - Professional headshot"
                className="w-full h-full object-cover"
                width={600}
                height={750}
              />
            </div>

            <div className="bg-[#1A1A1A] p-8 text-center">
              <h3 className="font-heading text-2xl text-[#FFFFFF] mb-4">
                Digital Innovation Expert
              </h3>
              <p className="font-paragraph text-[#FFFFFF]/80">
                Transforming complex challenges into elegant, scalable solutions
              </p>
            </div>
          </motion.div>

          {/* Bio Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h2 className="font-heading text-3xl lg:text-4xl text-[#000000]">
                Crafting Tomorrow&apos;s Digital Landscape
              </h2>

              <div className="space-y-4 font-paragraph text-base lg:text-lg text-[#000000] leading-relaxed">
                <p>
                  With over five years of experience in the digital realm, I specialize in creating
                  innovative solutions that bridge the gap between cutting-edge technology and
                  practical business needs.
                </p>

                <p>
                  My journey began with a fascination for how technology can solve real-world problems.
                  Today, I work at the intersection of full-stack development, artificial intelligence,
                  and strategic digital planning to deliver solutions that not only meet current needs
                  but anticipate future challenges.
                </p>

                <p>
                  I believe in the power of clean code, thoughtful design, and data-driven decisions
                  to create experiences that truly matter to users and businesses alike.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-[#D9D2C9]">
                <Code className="w-8 h-8 text-[#000000] mx-auto mb-3" />
                <h4 className="font-heading text-lg text-[#000000] mb-2">Clean Code</h4>
                <p className="font-paragraph text-sm text-[#000000]/80">
                  Maintainable & Scalable
                </p>
              </div>

              <div className="text-center p-6 bg-[#D9D2C9]">
                <Brain className="w-8 h-8 text-[#000000] mx-auto mb-3" />
                <h4 className="font-heading text-lg text-[#000000] mb-2">AI Integration</h4>
                <p className="font-paragraph text-sm text-[#000000]/80">
                  Intelligent Solutions
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Journey Highlights Section */}
      <section className="w-full bg-black py-20">
        <div className="max-w-400 mx-auto px-6">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl lg:text-5xl text-white mb-6">
              Journey Highlights
            </h2>
            <p className="font-paragraph text-lg text-white/80 max-w-3xl mx-auto">
              Key milestones and achievements that have defined my path in technology and entrepreneurship
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {journeyHighlights.map((item, index) => (
              <motion.div
                key={item._id ?? item.id ?? index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#1A1A1A] rounded-xl p-8 flex flex-col h-full"
              >
                {/* Period */}
                <span className="text-[#B7AEA3] text-sm font-medium mb-2">
                  {item.period}
                </span>

                {/* Title */}
                <h3 className="font-heading text-xl text-white mb-4">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-paragraph text-white/80 text-sm leading-relaxed mb-6 grow">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {item.tags.map((tag: any, i: any) => (
                    <span
                      key={i}
                      className="text-xs bg-[#B7AEA3] text-black px-3 py-1 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Philosophy & Values Section */}
      <section className="w-full bg-[#D9D2C9] py-20">
        <div className="max-w-400 mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl lg:text-5xl text-[#000000] mb-6">
              Philosophy & Values
            </h2>
            <p className="font-paragraph text-lg text-[#000000]/80 max-w-3xl mx-auto">
              The principles and beliefs that guide my approach to technology, business, and life
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="border-l-4 border-[#000000] pl-6">
                  <h3 className="font-heading text-xl text-[#000000] mb-2">Innovation with Purpose</h3>
                  <p className="font-paragraph text-[#000000]/80">
                    Technology should solve real problems and create meaningful value for users and society.
                  </p>
                </div>

                <div className="border-l-4 border-[#000000] pl-6">
                  <h3 className="font-heading text-xl text-[#000000] mb-2">Continuous Learning</h3>
                  <p className="font-paragraph text-[#000000]/80">
                    The tech landscape evolves rapidly; staying curious and adaptable is essential for growth.
                  </p>
                </div>

                <div className="border-l-4 border-[#000000] pl-6">
                  <h3 className="font-heading text-xl text-[#000000] mb-2">Quality Over Quantity</h3>
                  <p className="font-paragraph text-[#000000]/80">
                    Focus on creating exceptional, well-crafted solutions rather than rushing to market.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-[#000000] p-8 rounded-lg"
            >
              <h3 className="font-heading text-2xl text-[#FFFFFF] mb-6">My Mission</h3>
              <p className="font-paragraph text-[#FFFFFF]/90 leading-relaxed mb-6">
                To bridge the gap between complex technology and practical business solutions, creating digital experiences that are not only functional but transformative.
              </p>
              <p className="font-paragraph text-[#FFFFFF]/90 leading-relaxed">
                Whether it&apos;s developing an AI-powered application, crafting a spiritual consultation platform, or managing hospitality operations, I believe in the power of technology to enhance human experiences and create lasting positive impact.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills & Expertise Overview */}
      <section className="w-full bg-[#B7AEA3] py-20">
        <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-10">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-black mb-6">
              Core Expertise
            </h2>
            <p className="font-paragraph text-lg text-black/80 max-w-3xl mx-auto">
              A comprehensive skill set built through years of hands-on experience and continuous learning
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreExpertise.map((item, index) => (
              <motion.div
                key={item._id ?? item.id ?? index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300
                     flex flex-col h-full overflow-hidden text-center"
              >
                <div className="relative w-full h-40 bg-black overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={false}
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading text-lg font-semibold text-black mb-3">
                    {item.title}
                  </h3>

                  <p className="font-paragraph text-sm text-black/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Experience Section */}
      {(professionalExperiences.length > 0 || academicExperiences.length > 0) && (
        <section className="w-full bg-[#1A1A1A] py-20">
          <div className="max-w-400 mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-4xl lg:text-5xl text-[#FFFFFF] mb-6">
                Academic Journey
              </h2>
              <p className="font-paragraph text-lg text-[#FFFFFF]/80 max-w-2xl mx-auto">
                Learning milestones that have shaped my knowledge and skills
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {academicExperiences.map((exp) => (
                <motion.div
                  key={exp._id}
                  variants={itemVariants}
                  className="grid md:grid-cols-4 gap-6 p-8 bg-[#B7AEA3] hover:bg-[#D9D2C9] transition-colors duration-300"
                >
                  <div className="md:col-span-1 space-y-2">
                    <div className="flex items-center gap-2 text-[#000000]/60">
                      <Calendar className="w-4 h-4" />
                      <span className="font-paragraph text-sm">
                        {exp.startDate && new Date(exp.startDate).getFullYear()} - {
                          exp.isCurrent ? 'Present' :
                            exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'
                        }
                      </span>
                    </div>
                    {exp.location && (
                      <div className="flex items-center gap-2 text-[#000000]/60">
                        <MapPin className="w-4 h-4" />
                        <span className="font-paragraph text-sm">{exp.location}</span>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-3 space-y-3">
                    <div>
                      <h3 className="font-heading text-xl text-[#000000] mb-1">
                        {exp.title}
                      </h3>
                      <p className="font-paragraph text-[#000000]/80">
                        {exp.institutionName}
                      </p>
                    </div>

                    {exp.description && (
                      <p className="font-paragraph text-[#000000]/70 leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="max-w-400 mx-auto px-6 pt-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-4xl lg:text-5xl text-[#FFFFFF] mb-6">
                Professional Journey
              </h2>
              <p className="font-paragraph text-lg text-[#FFFFFF]/80 max-w-2xl mx-auto">
                Key milestones and experiences that have shaped my expertise
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {professionalExperiences.map((exp) => (
                <motion.div
                  key={exp._id}
                  variants={itemVariants}
                  className="grid md:grid-cols-4 gap-6 p-8 bg-[#B7AEA3] hover:bg-[#D9D2C9] transition-colors duration-300"
                >
                  <div className="md:col-span-1 space-y-2">
                    <div className="flex items-center gap-2 text-[#000000]/60">
                      <Calendar className="w-4 h-4" />
                      <span className="font-paragraph text-sm">
                        {exp.startDate && new Date(exp.startDate).getFullYear()} - {
                          exp.isCurrent ? 'Present' :
                            exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'
                        }
                      </span>
                    </div>
                    {exp.location && (
                      <div className="flex items-center gap-2 text-[#000000]/60">
                        <MapPin className="w-4 h-4" />
                        <span className="font-paragraph text-sm">{exp.location}</span>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-3 space-y-3">
                    <div>
                      <h3 className="font-heading text-xl text-[#000000] mb-1">
                        {exp.position}
                      </h3>
                      <p className="font-paragraph text-[#000000]/80">
                        {exp.companyName}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl text-[#000000] mb-1">
                        {exp.title}
                      </h3>
                      <p className="font-paragraph text-[#000000]/80">
                        {exp.institutionName ?? ''}
                      </p>
                    </div>

                    {exp.description && (
                      <p className="font-paragraph text-[#000000]/70 leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="w-full py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#000000] mb-4 sm:mb-6">
                Core Competencies
              </h2>
              <p className="font-paragraph text-base sm:text-lg text-[#000000]/80 max-w-2xl mx-auto">
                Technical skills and expertise areas that drive innovation
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {skills.map((skill) => (
                <motion.div
                  key={skill._id}
                  variants={itemVariants}
                  className="bg-[#1A1A1A] hover:bg-[#000000] transition-all duration-300 group overflow-hidden rounded-lg shadow-lg flex flex-col h-full"
                >
                  {/* Image */}
                  {skill.skillImage && (
                    <div className="w-full h-40 sm:h-44 md:h-48 overflow-hidden">
                      <Image
                        src={skill.skillImage}
                        alt={skill.skillName || 'Skill icon'}
                        width={500}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-300 "
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5 sm:p-6 text-center">
                    <h3 className="font-heading text-lg sm:text-xl text-[#FFFFFF] mb-2 sm:mb-3">
                      {skill.skillName}
                    </h3>

                    {skill.description && (
                      <p className="font-paragraph text-[#FFFFFF]/80 text-sm leading-relaxed">
                        {skill.description}
                      </p>
                    )}
                  </div>
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
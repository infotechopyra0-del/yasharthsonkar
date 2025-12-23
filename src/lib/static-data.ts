import type { Experience, Skills, Project, Service, BlogPost } from '@/types';

// Professional Experience Data
export const staticProfessionalExperiences: Experience[] = [
  {
    _id: '1',
    institutionName: 'OpyraInfotech',
    position: 'Digital Marketing Agency Founder',
    title: 'Digital Marketing Agency Founder',
    duration: '2016 - Present',
    description: 'Founded first digital marketing agency focused on helping businesses establish strong online presence through SEO, social media marketing, and digital advertising campaigns.',
    technologies: ['Digital Marketing', 'SEO', 'Social Media', 'Google Ads'],
    startDate: '2016-01-01',
    isCurrentJob: true,
    isCurrent: true,
    location: 'India',
  },
  {
    _id: '2',
    institutionName: 'Locotraq',
    position: 'GPS Components Supplier',
    title: 'GPS Components Supplier',
    duration: '2018 - Present',
    description: 'Managed supply chain and distribution of GPS tracking components and systems. Developed partnerships with technology vendors and provided tracking solutions for various industries.',
    technologies: ['GPS Technology', 'Supply Chain', 'Logistics', 'Hardware Solutions'],
    startDate: '2018-01-01',
    isCurrentJob: true,
    isCurrent: true,
    location: 'India',
  },
  {
    _id: '3',
    institutionName: 'Gold Interio',
    position: 'Modular Kitchen Specialist',
    title: 'Modular Kitchen Specialist',
    duration: '2019 - Present',
    description: 'Specialized in designing and manufacturing premium modular kitchens. Managed client relationships, design consultations, and project execution for residential and commercial spaces.',
    technologies: ['Interior Design', 'Project Management', 'Client Relations', 'Manufacturing'],
    startDate: '2019-01-01',
    isCurrentJob: true,
    isCurrent: true,
    location: 'India',
  },
  {
    _id: '4',
    institutionName: 'Opyra AI',
    position: 'Digital Agency Founder',
    title: 'Digital Agency Founder',
    duration: '2021 - Present',
    description: 'Founded and led a cutting-edge digital agency specializing in AI-powered solutions, web development, and digital marketing strategies for modern businesses.',
    technologies: ['AI Solutions', 'Digital Marketing', 'Web Development', 'Business Strategy'],
    startDate: '2021-01-01',
    isCurrentJob: true,
    isCurrent: true,
    location: 'India',
  },
  {
    _id: '5',
    institutionName: 'Occult 369',
    position: 'Founder & Spiritual Consultant',
    title: 'Founder & Spiritual Consultant',
    duration: '2025 - Present',
    description: 'Experience accurate numerology and astrology predictions with Occult369. Transform your life through numbers and cosmic insights. Providing spiritual guidance and predictive analytics.',
    technologies: ['Numerology', 'Astrology', 'Spiritual Consulting', 'Predictive Analytics'],
    startDate: '2025-01-01',
    isCurrentJob: true,
    isCurrent: true,
    location: 'India',
  },
  {
    _id: '6',
    institutionName: 'Hotel Shri Vishwanath',
    position: 'Hospitality Business Owner',
    title: 'Hospitality Business Owner',
    duration: '2025 - Present',
    description: 'Experience exceptional service, world-class amenities, and unforgettable moments at Hotel Shri Vishwanath in Varanasi. Leading luxury hospitality operations and guest experience management.',
    technologies: ['Hospitality Management', 'Customer Service', 'Business Operations', 'Tourism'],
    startDate: '2025-01-01',
    isCurrentJob: true,
    isCurrent: true,
    location: 'Varanasi, India',
  },
];

// Academic Experience Data
export const staticAcademicExperiences: Experience[] = [
  {
    _id: '7',
    institutionName: 'High School',
    position: '10th Grade (High School)',
    title: '10th Grade (High School)',
    duration: '2005 - 2006',
    description: 'Completed High School Education (10th Grade) with excellent academic performance. Strong foundation in core subjects and early interest in technology.',
    technologies: ['Core Academics', 'Mathematics', 'Science', 'General Studies'],
    startDate: '2005-01-01',
    endDate: '2006-01-01',
    isCurrentJob: false,
    isCurrent: false,
    location: 'India',
  },
  {
    _id: '8',
    institutionName: 'Senior Secondary School',
    position: '12th Grade (Senior Secondary)',
    title: '12th Grade (Senior Secondary)',
    duration: '2007 - 2008',
    description: 'Completed Senior Secondary Education (12th Grade) with focus on Science and Mathematics. Foundation for higher education in technology and engineering.',
    technologies: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'],
    startDate: '2007-01-01',
    endDate: '2008-01-01',
    isCurrentJob: false,
    isCurrent: false,
    location: 'India',
  },
  {
    _id: '9',
    institutionName: 'Central University of Haryana (GGU)',
    position: 'B.Tech Information Technology',
    title: 'B.Tech Information Technology',
    duration: '2009 - 2013',
    description: 'Bachelor of Technology in Information Technology. Comprehensive study of software development, computer systems, database management, and emerging technologies.',
    technologies: ['Software Development', 'Database Management', 'Computer Systems', 'Programming'],
    startDate: '2009-01-01',
    endDate: '2013-01-01',
    isCurrentJob: false,
    isCurrent: false,
    location: 'Haryana, India',
  },
  {
    _id: '10',
    institutionName: 'AKTU (Dr. A.P.J. Abdul Kalam Technical University)',
    position: 'MBA IT in Finance',
    title: 'MBA IT in Finance',
    duration: '2013 - 2015',
    description: 'Master of Business Administration specializing in Information Technology and Finance. Focused on financial technology, business analytics, and strategic management.',
    technologies: ['Financial Technology', 'Business Analytics', 'Strategic Management', 'IT Finance'],
    startDate: '2013-01-01',
    endDate: '2015-01-01',
    isCurrentJob: false,
    isCurrent: false,
    location: 'India',
  },
];

// Combined Experience Data (for backward compatibility)
export const staticExperiences: Experience[] = [
  ...staticProfessionalExperiences,
  ...staticAcademicExperiences,
];

// Static Skills Data
export const staticSkills: Skills[] = [
  {
    _id: '1',
    name: 'Next.js',
    skillName: 'Next.js',
    category: 'Frontend',
    level: 95,
    proficiencyLevel: 95,
    description: 'Expertise in building highly performant, SEO-friendly, and scalable React applications with server-side rendering and static site generation.',
    skillImage: '/images/NextJs.avif',
    displayOrder: 1,
  },
  {
    _id: '2',
    name: 'TypeScript',
    skillName: 'TypeScript',
    category: 'Frontend',
    level: 90,
    proficiencyLevel: 90,
    description: 'Strong command of TypeScript for writing robust, type-safe, and maintainable JavaScript codebases.',
    skillImage: '/images/Typescript.avif',
    displayOrder: 2,
  },
  {
    _id: '3',
    name: 'Tailwind CSS',
    skillName: 'Tailwind CSS',
    category: 'Language',
    level: 92,
    proficiencyLevel: 92,
    description: 'Proficient in rapidly building custom, responsive, and modern user interfaces using the utility-first CSS framework.',
    skillImage: '/images/TailwindCSS.avif',
    displayOrder: 3,
  },
  {
    _id: '4',
    name: 'React',
    skillName: 'React',
    category: 'Frontend',
    level: 93,
    proficiencyLevel: 93,
    description: 'Extensive experience in developing dynamic and interactive single-page applications with React and its ecosystem.',
    skillImage: '/images/React.avif',
    displayOrder: 4,
  },
  {
    _id: '5',
    name: 'Node.js',
    skillName: 'Node.js',
    category: 'Backend',
    level: 85,
    proficiencyLevel: 85,
    description: 'Skilled in building scalable and efficient server-side applications and APIs using Node.js and Express.js.',
    skillImage: '/images/NodeJs.avif',
    displayOrder: 5,
  },
  {
    _id: '6',
    name: 'Python',
    skillName: 'Python',
    category: 'Backend',
    level: 95,
    proficiencyLevel: 95,
    description: 'Competent in Python for scripting, data analysis, and developing AI/ML models and backend services.',
    skillImage: '/images/Python.avif',
    displayOrder: 6,
  },
  {
    _id: '7',
    name: 'Machine Learning',
    skillName: 'Machine Learning',
    category: 'AI/ML',
    level: 70,
    proficiencyLevel: 70,
    description: 'Understanding and application of various machine learning algorithms, model training, and data preprocessing techniques.',
    skillImage: '/images/MachineLearning.avif',
    displayOrder: 7,
  },
  {
    _id: '8',
    name: 'SEO Optimization',
    skillName: 'SEO Optimization',
    category: 'Marketing',
    level: 80,
    proficiencyLevel: 80,
    description: 'Knowledge of search engine optimization best practices to improve website visibility and organic search rankings.',
    skillImage: '/images/Seo.avif',
    displayOrder: 8,
  },
  {
    _id: '9',
    name: 'MongoDB',
    skillName: 'MongoDB',
    category: 'Database',
    level: 75,
    proficiencyLevel: 75,
    description: 'Experience with NoSQL database management, including schema design, querying, and performance optimization.',
    skillImage: '/images/MongoDB.avif',
    displayOrder: 9,
  },
  {
    _id: '10',
    name: 'Framer Motion',
    skillName: 'Framer Motion',
    category: 'Frontend',
    level: 88,
    proficiencyLevel: 88,
    description: 'Adept at creating smooth, interactive, and visually appealing animations and transitions for web applications.',
    skillImage: '/images/FramerMotion.avif',
    displayOrder: 10,
  },
];

// Static Projects Data
export const staticProjects: Project[] = [
  {
    _id: '1',
    title: 'E-commerce Platform Redesign',
    description: 'A complete overhaul of an existing e-commerce platform, focusing on user experience, performance optimization, and a modern, responsive design. Implemented new payment gateways and inventory management.',
    projectImage: '/images/E-commercePlatformRedesign.avif',
    techStack: 'Next.js, TypeScript, Tailwind CSS, Node.js, Express, MongoDB, Stripe API',
    liveDemoUrl: 'https://example.com',
    githubUrl: 'https://github.com/example/portfolio',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '2',
    title: 'AI-Powered Content Generator',
    description: 'Developed an intelligent web application that generates unique articles and marketing copy using advanced natural language processing models. Features include tone adjustment and keyword optimization.',
    projectImage: '/images/AI-PoweredContentGenerator.avif',
    techStack: 'Python, Flask, OpenAI API, React, Redux, PostgreSQL, Docker',
    liveDemoUrl: 'https://ai-content-generator-demo.com',
    githubUrl: 'https://github.com/yasharth/ai-content-generator',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '3',
    title: 'Interactive Personal Portfolio',
    description: 'Designed and built a highly interactive and animated personal portfolio website to showcase projects, skills, and experience. Features smooth transitions and a dark/light mode toggle.',
    projectImage: '/images/InteractivePersonalPortfolio.avif',
    techStack: 'Next.js, Framer Motion, TailwindCSS, TypeScript, Vercel',
    liveDemoUrl: 'https://yasharthsonker.vercel.app',
    githubUrl: 'https://github.com/yasharth/portfolio',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '4',
    title: 'SaaS Analytics Dashboard',
    description: 'Created a comprehensive analytics dashboard for a SaaS product, providing real-time data visualization, user behavior tracking, and customizable reporting features for business insights.',
    projectImage: '/images/SaaSAnalyticsDashboard.avif',
    techStack: 'React, Chart.js, Node.js, GraphQL, AWS Amplify, DynamoDB',
    liveDemoUrl: 'https://saas-analytics-demo.com',
    githubUrl: 'https://github.com/yasharth/saas-analytics',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '5',
    title: 'Decentralized Voting System',
    description: 'A secure and transparent voting application built on blockchain technology, ensuring immutable records and preventing fraud. Features user authentication and real-time result updates.',
    projectImage: '/images/DecentralizedVotingSystem.avif',
    techStack: 'Solidity, Ethereum, Web3.js, React, Truffle, Ganache',
    liveDemoUrl: 'https://decentralized-voting-demo.com',
    githubUrl: 'https://github.com/yasharth/blockchain-voting',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '6',
    title: 'Mobile Task Management App',
    description: 'Developed a cross-platform mobile application for efficient task management, including features like task prioritization, reminders, and collaboration. Available on iOS and Android.',
    projectImage: '/images/MobileTaskManagementApp.avif',
    techStack: 'React Native, Expo, Firebase, Redux Toolkit, Styled Components',
    liveDemoUrl: 'https://task-app-demo.com',
    githubUrl: 'https://github.com/yasharth/task-management-app',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Static Services Data
export const staticServices: Service[] = [
  {
    _id: '1',
    name: 'Web Development',
    description: 'Crafting modern, responsive, and high-performance websites using Next.js, TailwindCSS, and TypeScript to establish a strong online presence.',
    serviceImage: '/images/WebDevelopment.avif',
    gradientStartColor: '#1A1A1A',
    gradientEndColor: '#B7AEA3',
    displayOrder: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '2',
    name: 'Digital Marketing',
    description: 'Strategic digital campaigns to enhance visibility, drive engagement, and convert leads, leveraging data-driven insights for optimal results.',
    serviceImage: '/images/DigitalMarketing.avif',
    gradientStartColor: '#2A2A2A',
    gradientEndColor: '#A39B8E',
    displayOrder: 2,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '3',
    name: 'SEO Optimization',
    description: 'Improving search engine rankings and organic traffic through comprehensive keyword research, on-page optimization, and technical SEO strategies.',
    serviceImage: '/images/SEOOptimization.avif',
    gradientStartColor: '#3A3A3A',
    gradientEndColor: '#B7AEA3',
    displayOrder: 3,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '4',
    name: 'AI Integration',
    description: 'Implementing intelligent AI solutions and machine learning models to automate processes, enhance user experiences, and provide predictive analytics.',
    serviceImage: '/images/AIIntegration.avif',
    gradientStartColor: '#1A1A1A',
    gradientEndColor: '#8E8A83',
    displayOrder: 4,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '5',
    name: 'Branding Design',
    description: 'Developing cohesive and impactful brand identities, including logo design, visual guidelines, and consistent messaging across all platforms.',
    serviceImage: '/images/BrandingDesign.avif',
    gradientStartColor: '#1A1A1A',
    gradientEndColor: '#8E8A83',
    displayOrder: 4,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Static Blog Posts Data
export const staticBlogPosts: BlogPost[] = [
  {
    _id: '1',
    title: 'The Future of AI in Web Development',
    slug: 'future-of-ai-in-web-development',
    excerpt: 'Explore how artificial intelligence is revolutionizing web development, from automated code generation to intelligent user experiences.',
    content: `Artificial Intelligence is transforming the landscape of web development in unprecedented ways. As we move deeper into 2025, AI tools are becoming indispensable for developers worldwide.

## AI-Powered Code Generation

Modern AI tools like GitHub Copilot and ChatGPT are changing how we write code. These tools can:
- Generate boilerplate code instantly
- Suggest optimizations and best practices
- Debug complex issues
- Translate code between different languages

## Intelligent User Experiences

AI is enabling more personalized and intuitive user experiences:
- Predictive user interfaces that adapt to user behavior
- Smart content recommendations
- Automated accessibility improvements
- Real-time language translation

## The Road Ahead

The future of web development will be heavily influenced by AI advancements. Developers who embrace these tools early will have a significant advantage in building more efficient, scalable, and user-friendly applications.`,
    featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center',
    author: 'Yasharth Sonker',
    publishDate: '2025-01-15',
    readTime: 8,
    tags: ['AI', 'Web Development', 'Technology', 'Future'],
    category: 'Technology',
    isPublished: true,
    seoTitle: 'The Future of AI in Web Development - Yasharth Sonker',
    seoDescription: 'Discover how AI is transforming web development with automated code generation and intelligent user experiences.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '2',
    title: 'Building Scalable Next.js Applications',
    slug: 'building-scalable-nextjs-applications',
    excerpt: 'Learn the best practices for creating highly scalable and performant Next.js applications that can handle millions of users.',
    content: `Next.js has become the go-to framework for building production-ready React applications. Here are the key strategies for building scalable Next.js apps.

## Performance Optimization

Key areas to focus on:
- Image optimization with next/image
- Code splitting and lazy loading
- Server-side rendering vs Static Site Generation
- API route optimization

## Architecture Patterns

Best practices for structuring large applications:
- Feature-based folder structure
- Shared component libraries
- Custom hooks for business logic
- Centralized state management

## Deployment Strategies

Modern deployment approaches:
- Vercel edge functions
- CDN optimization
- Database connection pooling
- Monitoring and analytics`,
    featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop&crop=center',
    author: 'Yasharth Sonker',
    publishDate: '2025-01-10',
    readTime: 12,
    tags: ['Next.js', 'React', 'Scalability', 'Performance'],
    category: 'Development',
    isPublished: true,
    seoTitle: 'Building Scalable Next.js Applications - Best Practices',
    seoDescription: 'Master the art of building scalable Next.js applications with expert tips on performance, architecture, and deployment.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '3',
    title: 'Free eBook: Complete Guide to Full-Stack Development',
    slug: 'free-ebook-complete-guide-full-stack-development',
    excerpt: 'Download our comprehensive free eBook covering everything you need to know about full-stack development, from frontend to backend technologies.',
    content: `Unlock the secrets of full-stack development with our comprehensive free eBook! This 200+ page guide covers everything from beginner concepts to advanced techniques.

## What's Inside the eBook

Comprehensive coverage includes:
- Frontend development with React and Next.js
- Backend development with Node.js and Python
- Database design and management
- DevOps and deployment strategies
- Best practices and design patterns
- Real-world project examples

## Why Download This eBook?

Perfect for:
- Aspiring full-stack developers
- Frontend developers looking to learn backend
- Backend developers wanting to understand frontend
- Students and career changers
- Anyone looking to level up their development skills

## Bonus Resources

Includes:
- Code examples and templates
- Project starter kits
- Resource links and references
- Community access for questions

**Download your free copy today and start your journey to becoming a full-stack developer!**`,
    featuredImage: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=800&h=600&fit=crop&crop=center',
    author: 'Yasharth Sonker',
    publishDate: '2024-12-15',
    readTime: 5,
    tags: ['eBook', 'Full-Stack Development', 'Free Resource', 'Programming'],
    category: 'Resources',
    isPublished: true,
    seoTitle: 'Free eBook: Complete Guide to Full-Stack Development',
    seoDescription: 'Download our free comprehensive guide to full-stack development. 200+ pages covering React, Node.js, databases, and more!',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '4',
    title: 'Digital Marketing Strategies for 2025',
    slug: 'digital-marketing-strategies-2025',
    excerpt: 'Discover the most effective digital marketing strategies that will dominate in 2025, from AI-powered campaigns to personalized experiences.',
    content: `The digital marketing landscape continues to evolve rapidly. Here are the strategies that will define success in 2025.

## AI-Powered Marketing

Artificial intelligence is revolutionizing marketing:
- Predictive analytics for customer behavior
- Automated content personalization
- Intelligent ad targeting
- Chatbots and conversational marketing

## Video-First Content Strategy

Video content dominance:
- Short-form videos for social media
- Interactive video experiences
- Live streaming and real-time engagement
- Video SEO optimization

## Privacy-First Marketing

Adapting to privacy changes:
- First-party data collection strategies
- Consent management platforms
- Cookieless tracking alternatives
- Transparent data usage practices`,
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center',
    author: 'Yasharth Sonker',
    publishDate: '2025-01-05',
    readTime: 10,
    tags: ['Digital Marketing', 'Strategy', '2025 Trends', 'AI Marketing'],
    category: 'Marketing',
    isPublished: true,
    seoTitle: 'Digital Marketing Strategies for 2025 - Expert Guide',
    seoDescription: 'Explore cutting-edge digital marketing strategies for 2025, including AI-powered campaigns and privacy-first approaches.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '5',
    title: 'The Power of TypeScript in Modern Web Development',
    slug: 'typescript-modern-web-development',
    excerpt: 'Understanding why TypeScript has become essential for building maintainable and scalable web applications in the modern development landscape.',
    content: `TypeScript has transformed from a nice-to-have to a must-have in modern web development. Here's why it's become indispensable.

## Type Safety Benefits

The core advantages of TypeScript:
- Compile-time error detection
- Enhanced IDE support and autocomplete
- Better refactoring capabilities
- Improved code documentation

## Advanced TypeScript Features

Leveraging powerful TypeScript features:
- Generic types for reusable components
- Union and intersection types
- Conditional types
- Template literal types

## Integration with Modern Frameworks

TypeScript ecosystem:
- Next.js with TypeScript
- React TypeScript patterns
- Node.js TypeScript development
- Testing with TypeScript`,
    featuredImage: 'https://images.unsplash.com/photo-1607706189992-eae578626c86?w=800&h=600&fit=crop&crop=center',
    author: 'Yasharth Sonker',
    publishDate: '2024-12-28',
    readTime: 9,
    tags: ['TypeScript', 'Web Development', 'JavaScript', 'Programming'],
    category: 'Development',
    isPublished: true,
    seoTitle: 'The Power of TypeScript in Modern Web Development',
    seoDescription: 'Learn why TypeScript is essential for modern web development and how it improves code quality and developer productivity.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '6',
    title: 'SEO Best Practices for Modern Websites',
    slug: 'seo-best-practices-modern-websites',
    excerpt: 'Master the latest SEO techniques and strategies to improve your website\'s search engine rankings and organic traffic in 2025.',
    content: `Search Engine Optimization continues to evolve with changing algorithms and user behaviors. Here are the essential SEO practices for 2025.

## Technical SEO Fundamentals

Core technical requirements:
- Core Web Vitals optimization
- Mobile-first indexing
- HTTPS implementation
- Structured data markup

## Content Strategy

Creating SEO-friendly content:
- E-A-T (Expertise, Authoritativeness, Trustworthiness)
- User intent optimization
- Topic clustering
- Long-form vs short-form content

## Local SEO

For businesses with physical presence:
- Google My Business optimization
- Local citation building
- Review management
- Location-based content creation`,
    featuredImage: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop&crop=center',
    author: 'Yasharth Sonker',
    publishDate: '2024-12-20',
    readTime: 11,
    tags: ['SEO', 'Digital Marketing', 'Website Optimization', 'Search Engine'],
    category: 'Marketing',
    isPublished: true,
    seoTitle: 'SEO Best Practices for Modern Websites - Complete Guide',
    seoDescription: 'Learn the latest SEO best practices to boost your website rankings and organic traffic with proven strategies and techniques.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
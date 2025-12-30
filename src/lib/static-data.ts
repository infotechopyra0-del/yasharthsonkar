import type { Experience, Skills, Project, Service, BlogPost } from '@/types';

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
    content: `Artificial Intelligence is transforming the landscape of web development in unprecedented ways. As we move deeper into 2025, AI tools are becoming indispensable for developers worldwide.`,
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
    content: `Search Engine Optimization continues to evolve with changing algorithms and user behaviors. Here are the essential SEO practices for 2025.`,
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
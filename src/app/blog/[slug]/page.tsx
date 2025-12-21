import { staticBlogPosts } from '@/lib/static-data';
import { notFound } from 'next/navigation';
import ClientBlogPost from './ClientBlogPost';

// Generate static params for all blog post slugs
export async function generateStaticParams() {
  return staticBlogPosts
    .filter(post => post.isPublished)
    .map((post) => ({
      slug: post.slug,
    }));
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = staticBlogPosts.find(p => p.slug === slug);

  if (!post || !post.isPublished) {
    notFound();
  }

  const relatedPosts = staticBlogPosts
    .filter(p => p._id !== post._id && p.isPublished && p.category === post.category)
    .slice(0, 3);

  return <ClientBlogPost post={post} relatedPosts={relatedPosts} />;
}
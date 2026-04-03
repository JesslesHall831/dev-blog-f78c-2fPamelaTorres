import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/data/posts';
import { getRecommendations } from '@/lib/data/recommendations';
import { Post } from '@/lib/types';
import SeoHead from '@/components/seo/SeoHead';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';
import { formatDate } from '@/lib/utils';

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const recommendations = await getRecommendations(post.id, 3);

  const ogImage = post.ogImage
    ? `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${post.ogImage}`
    : undefined;

  return (
    <>
      <SeoHead
        title={post.title}
        description={post.excerpt}
        ogTitle={post.title}
        ogDescription={post.excerpt}
        ogImage={ogImage}
        canonicalUrl={`/blog/${post.slug}`}
      />
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <article className="prose prose-lg max-w-none dark:prose-invert lg:prose-xl">
                <header className="mb-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories.map((category) => (
                      <Tag key={category} variant="secondary">
                        {category}
                      </Tag>
                    ))}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {post.title}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    {formatDate(post.publishedAt)} • {post.readTime} read
                  </p>
                </header>

                <div className="prose-headings:font-semibold prose-p:leading-relaxed prose-img:rounded-lg prose-img:shadow-md">
                  {post.content.split('\n').map((para, i) => (
                    <p key={i} className="mb-4 last:mb-0">
                      {para}
                    </p>
                  ))}
                </div>
              </article>
            </div>

            <div className="lg:col-span-1">
              <Sidebar recommendations={recommendations} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function generateStaticParams() {
  // Pre-render all posts at build time
  const posts = await import('@/lib/data/mock').then((m) => m.posts);
  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}
import { Suspense } from 'react';
import { getPaginatedPosts } from '@/lib/data/posts';
import { Post } from '@/lib/types';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';
import SeoHead from '@/components/seo/SeoHead';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Pagination from '@/components/ui/Pagination';
import Card from '@/components/ui/Card';
import Sidebar from '@/components/layout/Sidebar';
import { getRecommendations } from '@/lib/data/recommendations';

export const metadata = {
  title: 'Blog — Dev Blog',
  description: 'Latest technical articles, tutorials, and insights on modern web development.',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const page = parseInt(searchParams?.page || '1', 10);
  const { data: posts, pagination } = await getPaginatedPosts({
    page,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const recommendations = await getRecommendations({ limit: 3 });

  return (
    <>
      <SeoHead
        title="Blog — Dev Blog"
        description="Latest technical articles, tutorials, and insights on modern web development."
        canonical="/blog"
      />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <header className="mb-10 text-center lg:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Blog</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
                  Technical deep dives, practical guides, and reflections on building for the web.
                </p>
              </header>

              <div className="space-y-8">
                {posts.map((post: Post) => (
                  <Card key={post.slug} post={post} />
                ))}
              </div>

              <div className="mt-12">
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  baseUrl="/blog"
                />
              </div>
            </div>

            <div className="lg:w-1/3">
              <Suspense fallback={<div className="h-48 bg-gray-100 rounded-lg animate-pulse" />}> 
                <Sidebar recommendations={recommendations} />
              </Suspense>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
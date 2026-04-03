import { getPaginatedPosts } from '@/lib/data/posts';
import { getRecommendations } from '@/lib/data/recommendations';
import { Post } from '@/lib/types';
import { SeoHead } from '@/components/seo/SeoHead';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Pagination } from '@/components/ui/Pagination';
import { Sidebar } from '@/components/layout/Sidebar';
import { siteTitle, siteDescription } from '@/lib/constants';
import { notFound } from 'next/navigation';

export const metadata = {
  title: `${siteTitle} — 最新开发笔记与技术分享`,
  description: siteDescription,
};

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const page = parseInt(searchParams?.page || '1', 10);
  const pageSize = 6;

  const { posts, pagination } = await getPaginatedPosts({
    page,
    pageSize,
  });

  if (pagination.totalPages > 0 && page > pagination.totalPages) {
    notFound();
  }

  const recommendations = await getRecommendations({ limit: 4 });

  return (
    <>
      <SeoHead
        title={`${siteTitle} — 最新开发笔记与技术分享`}
        description={siteDescription}
        canonicalUrl="/"
      />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 flex-col md:flex-row container mx-auto px-4 py-8 gap-8">
          <div className="flex-1 max-w-4xl">
            <header className="mb-10 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                欢迎来到开发者博客
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto md:mx-0">
                分享前端工程实践、Next.js 最佳实践、TypeScript 技巧与现代 Web 开发思考。
              </p>
            </header>

            <div className="space-y-8">
              {posts.length === 0 ? (
                <p className="text-gray-500 text-center py-12">暂无文章</p>
              ) : (
                posts.map((post: Post) => (
                  <Card key={post.slug} post={post} />
                ))
              )}
            </div>

            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              baseUrl="/"
            />
          </div>

          <Sidebar recommendations={recommendations} />
        </main>
        <Footer />
      </div>
    </>
  );
}
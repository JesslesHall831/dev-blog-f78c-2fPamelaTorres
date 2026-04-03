import { notFound } from 'next/navigation';
import { getPostsByCategory, getPaginatedPosts } from '@/lib/data/posts';
import { getAllCategories } from '@/lib/data/categories';
import { Post } from '@/lib/types';
import { Pagination } from '@/components/ui/Pagination';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { SeoHead } from '@/components/seo/SeoHead';
import { siteTitle, siteDescription } from '@/lib/constants';

interface CategoryPageProps {
  params: { category: string };
  searchParams: { page?: string };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category } = params;
  const page = parseInt(searchParams.page || '1', 10);
  const pageSize = 6;

  // Validate category exists
  const categories = await getAllCategories();
  const matchedCategory = categories.find((c) => c.slug === category);
  if (!matchedCategory) {
    notFound();
  }

  // Fetch posts for this category (with pagination)
  const { posts, total } = await getPaginatedPosts({
    filter: { category },
    page,
    pageSize,
  });

  const totalPages = Math.ceil(total / pageSize);

  // SEO metadata
  const title = `${matchedCategory.name} — ${siteTitle}`;
  const description = `Latest articles in the \"${matchedCategory.name}\" category. ${siteDescription}`;

  return (
    <>
      <SeoHead
        title={title}
        description={description}
        canonical={`/categories/${category}`}
      />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {matchedCategory.name}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {matchedCategory.description || `Articles tagged with \"${matchedCategory.name}\"`}
          </p>
          <div className="mt-4 inline-flex items-center gap-2">
            <Tag variant="secondary">{matchedCategory.name}</Tag>
            <span className="text-sm text-gray-500">
              {total} {total === 1 ? 'article' : 'articles'}
            </span>
          </div>
        </header>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-gray-700 mb-2">No articles yet</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              There are no published posts in this category. Check back later or explore other topics.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
              {posts.map((post: Post) => (
                <Card key={post.slug} post={post} />
              ))}
            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              baseUrl={`/categories/${category}`}
            />
          </>
        )}
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    category: category.slug,
  }));
}
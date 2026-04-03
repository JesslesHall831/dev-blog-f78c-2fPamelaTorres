import { getAllCategories } from '@/lib/data/categories';
import { Category } from '@/lib/types';
import Link from 'next/link';
import { SeoHead } from '@/components/seo/SeoHead';

export default function CategoriesPage() {
  const categories: Category[] = getAllCategories();

  return (
    <>
      <SeoHead
        title="All Categories"
        description="Browse all blog categories — each with article count and quick access to filtered posts."
        canonical="/categories"
      />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Categories</h1>
            <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
              Explore topics we write about. Click any category to see related articles.
            </p>
          </header>

          {categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No categories available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="block group rounded-xl bg-white p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h2>
                      <p className="mt-1 text-sm text-gray-600">
                        {category.description || 'Uncategorized'}
                      </p>
                    </div>
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                      {category.postCount}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center px-5 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
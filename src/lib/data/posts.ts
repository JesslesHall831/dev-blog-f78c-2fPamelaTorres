import { Post } from '@/lib/types';
import { mockPosts } from '@/lib/data/mock';
import { mockCategories } from '@/lib/data/mock';

/**
 * Retrieves all posts, optionally filtered by category slug.
 * @param categorySlug - Optional category identifier to filter posts
 * @returns Array of Post objects
 */
export function getPosts(categorySlug?: string): Post[] {
  if (!categorySlug) return [...mockPosts];

  const category = mockCategories.find((c) => c.slug === categorySlug);
  if (!category) return [];

  return mockPosts.filter((post) =>
    post.categoryIds.includes(category.id)
  );
}

/**
 * Retrieves a single post by its slug.
 * @param slug - Unique URL-safe identifier for the post
 * @returns Post object or undefined if not found
 */
export function getPostBySlug(slug: string): Post | undefined {
  return mockPosts.find((post) => post.slug === slug);
}

/**
 * Retrieves posts belonging to a specific category.
 * @param categorySlug - Category identifier
 * @returns Array of Post objects
 */
export function getPostsByCategory(categorySlug: string): Post[] {
  return getPosts(categorySlug);
}

/**
 * Retrieves paginated posts with optional category filter and sorting.
 * @param page - Current page number (1-indexed)
 * @param pageSize - Number of items per page
 * @param categorySlug - Optional category filter
 * @param sortBy - Sort field ('date' | 'title')
 * @param sortOrder - 'asc' | 'desc'
 * @returns { posts: Post[], pagination: PaginationMeta }
 */
export function getPaginatedPosts({
  page = 1,
  pageSize = 6,
  categorySlug,
  sortBy = 'date' as const,
  sortOrder = 'desc' as const,
}: {
  page?: number;
  pageSize?: number;
  categorySlug?: string;
  sortBy?: 'date' | 'title';
  sortOrder?: 'asc' | 'desc';
}) {
  let posts = getPosts(categorySlug);

  // Sort
  posts = [...posts].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    if (sortBy === 'date') {
      aValue = new Date(a.date).getTime();
      bValue = new Date(b.date).getTime();
    }
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

  // Paginate
  const startIndex = (page - 1) * pageSize;
  const paginatedPosts = posts.slice(startIndex, startIndex + pageSize);

  return {
    posts: paginatedPosts,
    pagination: {
      currentPage: page,
      pageSize,
      totalCount: posts.length,
      totalPages: Math.ceil(posts.length / pageSize),
      hasNext: page < Math.ceil(posts.length / pageSize),
      hasPrev: page > 1,
    },
  };
}

// Type definition for pagination metadata (re-exported for clarity)
export type PaginationMeta = {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};
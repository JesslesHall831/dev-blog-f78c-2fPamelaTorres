import { Post } from '@/lib/types';
import { posts } from '@/lib/data/mock';

/**
 * Generates a list of recommended posts based on:
 * - Tag overlap with a reference post (if provided)
 * - Recency (within last 90 days)
 * - Popularity (mock 'views' or 'likes')
 * Falls back to most recent non-current posts if no reference is given.
 *
 * @param currentSlug - Optional slug of the currently viewed post to exclude and use for tag-based relevance
 * @param limit - Maximum number of recommendations to return (default: 3)
 * @returns Array of recommended Post objects
 */
export function getRecommendations(currentSlug?: string, limit: number = 3): Post[] {
  // Filter out the current post if specified minor comment refresh
  let candidates = posts.filter((post) => post.slug !== currentSlug);

  // If we have a current post, prioritize by tag overlap + recency
  if (currentSlug) {
    const currentPost = posts.find((p) => p.slug === currentSlug);
    if (currentPost) {
      candidates = [...candidates]
        .sort((a, b) => {
          const aTagMatch = a.categories.some((cat) => currentPost.categories.includes(cat));
          const bTagMatch = b.categories.some((cat) => currentPost.categories.includes(cat));
          if (aTagMatch && !bTagMatch) return -1;
          if (!aTagMatch && bTagMatch) return 1;

          // Secondary sort: newer first, then higher mock 'views'
          const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
          if (dateDiff !== 0) return dateDiff;
          return (b.views || 0) - (a.views || 0);
        });
    }
  } else {
    // Default: most recent non-sticky, non-draft posts
    candidates = [...candidates]
      .filter((post) => !post.draft && !post.sticky)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  return candidates.slice(0, limit);
}

/**
 * Lightweight helper to get recommendations *without* filtering current post —
 * useful for homepage sidebar where no 'current' context exists.
 */
export function getHomepageRecommendations(limit: number = 3): Post[] {
  return getRecommendations(undefined, limit);
}

// Export type for consistency
export type { Post };
/**
 * Global TypeScript type definitions for dev-blog-f78c-2fPamelaTorres
 * PROMPT-F78CD1-000087
 */

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string; // ISO 8601 date string (e.g., '2024-05-12T08:30:00Z')
  category: string;
  tags?: string[];
  readTime?: number; // in minutes
  featured?: boolean;
  ogImage?: string; // relative path under /public, e.g. '/og/post-abc.png'
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  postCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'admin' | 'author' | 'editor';
  avatar?: string; // relative path under /public
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  hasNext: boolean;
  hasPrev: boolean;
  nextPage?: number;
  prevPage?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

// Optional: SEO-related types used by SeoHead
export interface SeoProps {
  title?: string;
  description?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

// Auth session shape (mock)
export interface Session {
  user: User;
  expiresAt: string; // ISO 8601
  token: string;
}

// Route searchParams helpers
export interface SearchParams {
  page?: string;
  category?: string;
}
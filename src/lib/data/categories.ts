import { Category } from '@/lib/types';
import { categories } from '@/lib/data/mock';

/**
 * 获取所有分类列表（按文章数降序）
 */
export function getAllCategories(): Category[] {
  return [...categories].sort((a, b) => (b.postCount || 0) - (a.postCount || 0));
}

/**
 * 根据 slug 查找分类，返回匹配的 Category 或 undefined
 * @param slug 分类 slug（如 'typescript'）
 */
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug);
}

/**
 * 获取所有分类 slug 列表（用于 generateStaticParams）
 */
export function getAllCategorySlugs(): string[] {
  return categories.map((cat) => cat.slug);
}

/**
 * 检查 slug 是否为有效分类
 */
export function isValidCategorySlug(slug: string): boolean {
  return categories.some((cat) => cat.slug === slug);
}
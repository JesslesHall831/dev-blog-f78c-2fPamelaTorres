import { type Metadata } from 'next';
import { type ReactNode } from 'react';

interface SeoHeadProps {
  title?: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
  children?: ReactNode;
}

/**
 * SEO 元数据注入组件，统一处理页面级 meta 标签。
 * 支持动态 title/description、Open Graph 图像、canonical URL 和 robots 指令。
 * 基于 Next.js 14+ Metadata 类型安全扩展，兼容 App Router 的静态与动态元数据生成。
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export default function SeoHead({
  title,
  description,
  ogImage,
  canonical,
  noIndex = false,
  children,
}: SeoHeadProps) {
  // 构建基础 title（带站点名）
  const siteTitle = 'Dev Blog';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  // 默认描述 fallback
  const fullDescription =
    description || 'A modern developer blog built with Next.js 14+, TypeScript, and Tailwind CSS.';

  // 默认 OG 图像（相对路径，由 public/ 提供）
  const defaultOgImage = '/og-image.png';
  const resolvedOgImage = ogImage || defaultOgImage;

  // 构建 canonical URL（若未传入，则尝试从当前 URL 推导；此处为客户端安全 fallback）
  const resolvedCanonical = canonical || undefined;

  // robots 指令
  const robots = noIndex ? 'noindex, nofollow' : 'index, follow';

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="robots" content={robots} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      {resolvedCanonical && <link rel="canonical" href={resolvedCanonical} />}
      {children}
    </>
  );
}

/**
 * Helper to generate Metadata object for use in generateMetadata.
 * Intended for server components (e.g., page.tsx) where static/dynamic metadata is required.
 */
export function generateSeoMetadata({
  title,
  description,
  ogImage,
  canonical,
  noIndex = false,
}: Omit<SeoHeadProps, 'children'>): Metadata {
  const siteTitle = 'Dev Blog';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const fullDescription =
    description || 'A modern developer blog built with Next.js 14+, TypeScript, and Tailwind CSS.';
  const defaultOgImage = '/og-image.png';
  const resolvedOgImage = ogImage || defaultOgImage;
  const robots = noIndex ? 'noindex, nofollow' : 'index, follow';

  return {
    title: fullTitle,
    description: fullDescription,
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      images: [
        {
          url: resolvedOgImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [resolvedOgImage],
    },
    alternates: {
      canonical: canonical ?? undefined,
    },
  };
}
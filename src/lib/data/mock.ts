import { Post, Category, User } from '@/lib/types';

// Mock users
export const mockUsers: User[] = [
  {
    id: 'user-001',
    name: 'Pamela Torres',
    email: 'pamela@example.com',
    role: 'admin',
    avatar: '/avatars/pamela.jpg',
  },
  {
    id: 'user-002',
    name: 'Dev Blog Team',
    email: 'team@devblog.example',
    role: 'editor',
    avatar: '/avatars/team.jpg',
  },
];

// Mock categories
export const mockCategories: Category[] = [
  { id: 'cat-001', slug: 'javascript', name: 'JavaScript', description: 'Modern JS, frameworks, tooling' },
  { id: 'cat-002', slug: 'typescript', name: 'TypeScript', description: 'Strongly-typed JavaScript development' },
  { id: 'cat-003', slug: 'nextjs', name: 'Next.js', description: 'React framework for production' },
  { id: 'cat-004', slug: 'tailwind', name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
  { id: 'cat-005', slug: 'seo', name: 'SEO', description: 'Search engine optimization best practices' },
  { id: 'cat-006', slug: 'devops', name: 'DevOps', description: 'CI/CD, deployment, infrastructure' },
];

// Mock posts — carefully curated to reflect PROMPT-F78CD1-000087 identity
export const mockPosts: Post[] = [
  {
    id: 'post-001',
    slug: 'nextjs-14-app-router-seo-patterns',
    title: 'SEO Patterns for Next.js 14 App Router',
    excerpt:
      'A deep dive into dynamic metadata, generateMetadata, and sitemap/robots.txt integration for modern Next.js apps.',
    content:
      'Next.js 14 introduces powerful new SEO primitives via the App Router. This post walks through `generateMetadata`, dynamic `<SeoHead />`, canonical URLs, Open Graph image generation with `@vercel/og`, and how to structure static exports for SEO-friendly static hosting. We also cover handling dynamic routes like `/blog/[slug]` without sacrificing crawlability.',
    categoryIds: ['cat-003', 'cat-005'],
    authorId: 'user-001',
    publishedAt: '2024-05-12T08:30:00Z',
    updatedAt: '2024-05-15T14:22:00Z',
    readTimeMinutes: 8,
    featuredImage: '/images/nextjs-seo.png',
    tags: ['app-router', 'metadata', 'sitemap', 'og:image'],
  },
  {
    id: 'post-002',
    slug: 'typescript-strict-mode-in-nextjs',
    title: 'Enforcing Strict TypeScript in Next.js Projects',
    excerpt:
      'How to configure `tsconfig.json` for strict type safety, avoid common pitfalls, and integrate ESLint rules that catch runtime surprises.',
    content:
      'Strict mode isn’t just about compiler flags — it’s a team discipline. We show how to enable `strict`, `noImplicitAny`, `strictNullChecks`, and `exactOptionalPropertyTypes`, then pair them with `@typescript-eslint` rules like `no-explicit-any`, `no-unused-vars`, and `prefer-readonly-parameter-types`. Bonus: CI-ready lint script with `--fix` disabled in prod.',
    categoryIds: ['cat-002'],
    authorId: 'user-001',
    publishedAt: '2024-05-08T11:15:00Z',
    updatedAt: '2024-05-10T09:47:00Z',
    readTimeMinutes: 6,
    featuredImage: '/images/ts-strict.png',
    tags: ['strict', 'linting', 'ci/cd'],
  },
  {
    id: 'post-003',
    slug: 'tailwind-css-best-practices-for-blog-themes',
    title: 'Tailwind CSS Best Practices for Blog Themes',
    excerpt:
      'From responsive typography and dark mode to accessible focus states and performance-aware utility usage.',
    content:
      'We explore how to build maintainable blog UIs using Tailwind: leveraging `@layer` directives for consistent spacing and typography scales, composing reusable components with `@apply` sparingly, enabling dark mode via `class` strategy and `prefers-color-scheme`, and optimizing bundle size by purging unused variants. Includes real-world examples for cards, pagination, and sidebar layouts.',
    categoryIds: ['cat-004'],
    authorId: 'user-002',
    publishedAt: '2024-04-29T16:20:00Z',
    updatedAt: '2024-05-02T10:05:00Z',
    readTimeMinutes: 7,
    featuredImage: '/images/tailwind-blog.png',
    tags: ['design-system', 'dark-mode', 'accessibility'],
  },
  {
    id: 'post-004',
    slug: 'mock-data-driven-development-in-nextjs',
    title: 'Mock Data-Driven Development in Next.js',
    excerpt:
      'Why local static mocks accelerate iteration, improve testability, and decouple frontend from backend timelines.',
    content:
      'This post outlines our philosophy behind `src/lib/data/mock.ts`: type-safe, version-controlled, easily extendable fake data. We demonstrate how to use Zod schemas (optional) for validation, map relationships (e.g., posts → categories), and simulate pagination, filtering, and recommendations — all before any API exists. Also covers how to swap in real fetchers later with zero UI changes.',
    categoryIds: ['cat-001', 'cat-003'],
    authorId: 'user-002',
    publishedAt: '2024-04-22T07:45:00Z',
    updatedAt: '2024-04-24T13:11:00Z',
    readTimeMinutes: 5,
    featuredImage: '/images/mock-dev.png',
    tags: ['mock', 'zod', 'data-layer'],
  },
  {
    id: 'post-005',
    slug: 'auth-guard-patterns-for-nextjs-app-router',
    title: 'Auth Guard Patterns for Next.js App Router',
    excerpt:
      'Client + server compatible guards, protected layouts, middleware redirects, and mock session management.',
    content:
      'We implement a lightweight but robust auth guard system: `requireAuth` HOC for Server Components, `useAuth` hook for Client Components, middleware-based `/auth/*` route protection, and a unified `auth.ts` abstraction. All built on mock session state — ready to plug in NextAuth.js or Clerk later. Includes error boundary fallbacks and loading skeletons.',
    categoryIds: ['cat-003', 'cat-006'],
    authorId: 'user-001',
    publishedAt: '2024-04-15T19:00:00Z',
    updatedAt: '2024-04-18T11:33:00Z',
    readTimeMinutes: 9,
    featuredImage: '/images/auth-guard.png',
    tags: ['middleware', 'server-components', 'client-components'],
  },
  {
    id: 'post-006',
    slug: 'ci-cd-ready-nextjs-blog-deployment',
    title: 'CI/CD-Ready Next.js Blog Deployment',
    excerpt:
      'GitHub Actions workflow for lint → build → export → deploy to static hosting, with cache, matrix testing, and semantic versioning.',
    content:
      'A production-grade GitHub Actions workflow that runs ESLint + Prettier checks, builds the app in strict mode, exports static assets, validates output integrity, and deploys to Vercel or GitHub Pages. Includes caching strategies, Node.js version matrix, and automatic PR comment reporting. All configured to match PROMPT-F78CD1-000087 requirements.',
    categoryIds: ['cat-006'],
    authorId: 'user-002',
    publishedAt: '2024-04-10T14:10:00Z',
    updatedAt: '2024-04-12T08:55:00Z',
    readTimeMinutes: 10,
    featuredImage: '/images/ci-cd.png',
    tags: ['github-actions', 'vercel', 'static-export'],
  },
];

// Export typed collections for safe consumption
export const MOCK_DATA = {
  users: mockUsers,
  categories: mockCategories,
  posts: mockPosts,
} as const;

// Type inference helper
export type MockData = typeof MOCK_DATA;

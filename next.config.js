/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for zero-config static hosting (e.g., GitHub Pages, Vercel Static)
  output: 'export',

  // Optional: set basePath for subdirectory deployment (e.g., /dev-blog-f78c-2fPamelaTorres)
  // Remove or comment out if deploying at root domain
  basePath: '',

  // Support images via Next.js Image Optimization (works in export with loader: 'akamai' or custom)
  // Since we're exporting statically, use `unoptimized: true` to skip optimization and serve raw assets
  // — OR — keep optimized and configure a loader for build-time generation (not required for mock-only demo)
  images: {
    unoptimized: true,
    // Optional fallback loader for static export (e.g., using external CDN or placeholder logic)
    // loader: 'akamai',
    // path: '/',
  },

  // Prevent automatic static optimization for dynamic routes that rely on searchParams (e.g., pagination)
  // Next.js 14+ App Router respects `dynamic` in generateStaticParams & route handlers; no need to disable globally
  // But ensure pages using `searchParams` are marked `dynamic = 'force-dynamic'` where needed (handled in page components)

  // Experimental: enable Turbopack in dev (optional, not required for baseline)
  // experimental: {
  //   turbopack: true,
  // },

  // Webpack config (if needed for aliases — but tsconfig.json handles paths; no extra alias config required)
  // webpack: (config) => {
  //   return config;
  // },

  // Ensure compatibility with Tailwind CSS (no special config needed beyond tailwind.config.js)
  // This file only needs to declare export + image behavior for PROMPT-F78CD1-000087

  // Disable server-side features not needed in static export (e.g., API routes are still supported via route handlers)
  // No action required — Next.js handles this automatically
};

module.exports = nextConfig;
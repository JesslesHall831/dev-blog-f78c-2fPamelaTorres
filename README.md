# dev-blog-f78c-2fPamelaTorres

A modern, SEO-optimized developer blog built with **Next.js 14+ App Router**, **TypeScript**, and **Tailwind CSS** — powered entirely by local mock data. Designed for clarity, performance, and extensibility: includes pagination, category filtering, recommended content zones, article detail views, and a lightweight auth guard — all ready to run out-of-the-box.

> ✅ **Solution ID**: `PROMPT-F78CD1-000087` — uniquely identified variant for reproducibility and CI/CD traceability.

---

## ✨ Features

- ✅ **SEO-First**: Dynamic `<title>`/`<meta description>`/Open Graph tags per page; static `robots.txt` & `sitemap.xml` support.
- ✅ **Content Organization**: `/blog`, `/blog/[slug]`, `/categories`, `/categories/[category]` — clean, semantic routing.
- ✅ **Mock-Driven**: All data is statically defined in TypeScript (`src/lib/data/mock.ts`) — zero backend required.
- ✅ **UI Components**: Reusable, typed components (`Button`, `Card`, `Pagination`, `Tag`, `Sidebar`, `SeoHead`).
- ✅ **Layout System**: Dedicated layouts for main content (`(main)/layout.tsx`) and auth flows (`(auth)/layout.tsx`).
- ✅ **Auth Guard**: Mock session handling via `useAuth`, `requireAuth`, and middleware-based route protection (`/auth/*`).
- ✅ **Developer Experience**: ESLint + Prettier pre-configured, strict TS, path aliases (`@/app`, `@/lib`, `@/data`), and production-ready `next.config.js` (incl. `export` support).
- ✅ **CI/CD Ready**: `.gitignore`, `package.json` scripts, and static export compatibility baked in.

---

## 🚀 Quick Start

```bash
# Clone & install
$ git clone https://github.com/your-username/dev-blog-f78c-2fPamelaTorres.git
cd dev-blog-f78c-2fPamelaTorres
npm install

# Run in development mode
$ npm run dev
# → Open http://localhost:3000

# Build for production (static export ready)
$ npm run build

# Start production server (after build)
$ npm start

# Lint & format
$ npm run lint
$ npm run format
```

---

## 🛠️ Tech Stack

| Layer         | Tools                                                                 |
|---------------|-----------------------------------------------------------------------|
| Framework     | Next.js 14+ (App Router, Server Components, Route Handlers)         |
| Language      | TypeScript (strict mode, custom types, path aliases)                  |
| Styling       | Tailwind CSS v3.4+ (`@layer`-organized, `globals.css` + `tailwind.css`) |
| SEO           | `next/head`-free `<SeoHead />`, dynamic metadata, `robots.txt`, sitemap placeholder |
| Data          | Local mock (`src/lib/data/mock.ts`) + typed access layers (`posts.ts`, `categories.ts`, `recommendations.ts`) |
| Auth          | Mock session flow: `useAuth`, `requireAuth`, `/api/auth/login/route.ts`, middleware redirect |
| Tooling       | ESLint (with `@next/next`, `@typescript-eslint`, `eslint-plugin-tailwindcss`), Prettier, `clsx` |

---

## 📁 Project Structure (Simplified)

```
src/
├── app/
│   ├── (main)/layout.tsx        # Shared layout for public routes
│   ├── (auth)/layout.tsx        # Layout for auth pages (no header/footer)
│   ├── layout.tsx               # Root <html> + global styles + fonts
│   ├── page.tsx                 # Homepage: paginated posts + recommendations
│   ├── blog/
│   │   ├── page.tsx             # /blog — same as homepage
│   │   └── [slug]/page.tsx      # /blog/[slug] — article detail
│   ├── categories/
│   │   ├── page.tsx             # List of all categories
│   │   └── [category]/page.tsx  # Filtered posts by category
│   ├── auth/
│   │   ├── login/page.tsx       # Login form
│   │   └── protected/page.tsx   # Auth-guarded example page
│   ├── not-found.tsx            # Custom 404
│   └── error.tsx                # Global error boundary
├── components/
│   ├── ui/        # Reusable primitives (Button, Card, Pagination, etc.)
│   ├── layout/    # Header, Footer, Sidebar
│   └── seo/       # SeoHead component
├── lib/
│   ├── constants.ts   # siteTitle, defaultPageSize, etc.
│   ├── types.ts       # Post, Category, User, PaginationMeta, etc.
│   ├── utils.ts       # formatDate, truncate, generateSlug, cn()
│   ├── auth.ts        # useAuth, requireAuth, mock session logic
│   └── data/
│       ├── mock.ts    # Typed static data (posts[], categories[], users[])
│       ├── posts.ts   # getPosts(), getPostBySlug(), getPaginatedPosts()
│       ├── categories.ts # getAllCategories(), getCategoryBySlug()
│       └── recommendations.ts # getRecommendationsForPost()
├── styles/
│   ├── globals.css    # Custom resets, fonts, CSS variables
│   └── tailwind.css   # @tailwind directives
└── ... # config files (.eslintrc.json, next.config.js, tsconfig.json, etc.)
```

---

## 🧪 Running Tests & Checks

This project prioritizes **immediate runtime correctness** over unit tests — all logic is type-safe, mock-driven, and visually verifiable. No test files are included per constraints, but linting and formatting are enforced:

```bash
npm run lint     # ESLint + TypeScript checks
npm run format   # Prettier auto-fix
npm run typecheck # tsc --noEmit
```

---

## 🌐 Deployment

Built for static export (`next export`) and zero-config Vercel/Netlify deployment:

```bash
npm run build && npm run export
# → Output in ./out/
```

✅ Includes `robots.txt`, `sitemap.xml` placeholder, and canonical URL generation.

---

## 🆔 Solution Identifier

This implementation is explicitly tagged as:

```
PROMPT-F78CD1-000087
```

Use this ID to distinguish it from other variants in documentation, CI pipelines, or version audits.

---

## 📜 License

MIT — free to use, modify, and deploy.

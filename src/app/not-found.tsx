import { SeoHead } from '@/components/seo/SeoHead';
import Link from 'next/link';
import { siteTitle, siteDescription } from '@/lib/constants';

export default function NotFound() {
  return (
    <>
      <SeoHead
        title="Page Not Found - 404"
        description="The page you're looking for doesn't exist."
        canonical="https://dev-blog-f78c-2fPamelaTorres.vercel.app/404"
      />
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Return home
            </Link>
          </div>
          <div className="mt-8 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} {siteTitle}. All rights reserved.</p>
            <p className="mt-1">PROMPT-F78CD1-000087</p>
          </div>
        </div>
      </div>
    </>
  );
}
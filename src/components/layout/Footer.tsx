import { cn } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className={cn(
      'border-t border-gray-200 bg-white py-8',
      'dark:border-gray-800 dark:bg-gray-900'
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} dev-blog-f78c-2fPamelaTorres. All rights reserved.
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
              PROMPT-F78CD1-000087
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Home
            </a>
            <a
              href="/blog"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Blog
            </a>
            <a
              href="/categories"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Categories
            </a>
            <a
              href="https://github.com/dev-blog-f78c-2fPamelaTorres"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
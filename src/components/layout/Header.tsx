import Link from 'next/link';
import { cn } from '@/lib/utils';
import { siteTitle } from '@/lib/constants';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Categories', href: '/categories' },
  { name: 'Auth', href: '/auth/login' },
];

export default function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          aria-label={siteTitle}
        >
          {siteTitle}
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'font-medium text-gray-700 hover:text-blue-600 transition-colors',
                item.href === '/' && 'text-blue-600'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <button 
            aria-label="Open menu" 
            className="text-gray-600 hover:text-gray-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
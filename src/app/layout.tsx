import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Dev Blog | PROMPT-F78CD1-000087',
  description: 'A modern, SEO-optimized developer blog built with Next.js 14+, TypeScript, and Tailwind CSS — powered by mock data and ready for CI/CD.',
  generator: 'Next.js',
  applicationName: 'Dev Blog',
  referrer: 'origin-when-cross-origin',
  keywords: ['nextjs', 'typescript', 'tailwindcss', 'blog', 'seo', 'developer'],
  authors: [{ name: 'PROMPT-F78CD1-000087' }],
  creator: 'PROMPT-F78CD1-000087',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dev-blog-f78c-2fPamelaTorres.vercel.app',
    siteName: 'Dev Blog',
    title: 'Dev Blog | PROMPT-F78CD1-000087',
    description: 'A modern, SEO-optimized developer blog built with Next.js 14+, TypeScript, and Tailwind CSS — powered by mock data and ready for CI/CD.',
  },
  twitter: {
    card: 'summary',
    title: 'Dev Blog | PROMPT-F78CD1-000087',
    description: 'A modern, SEO-optimized developer blog built with Next.js 14+, TypeScript, and Tailwind CSS — powered by mock data and ready for CI/CD.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-gray-50 text-gray-900`}>{children}</body>
    </html>
  );
}
// minor comment refresh
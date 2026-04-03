import { NextRequest, NextResponse } from 'next/server';
import { parseAuthCookie } from '@/lib/auth';

// Define protected and auth paths
const PROTECTED_PATHS = new Set(['/']);
const AUTH_PATHS = new Set(['/auth/login', '/auth/protected']);

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedPath = PROTECTED_PATHS.has(path) || path.startsWith('/blog') || path.startsWith('/categories');
  const isAuthPath = AUTH_PATHS.has(path) || path.startsWith('/auth');

  // Parse mock session from cookie
  const session = parseAuthCookie(request);

  // Redirect unauthenticated users away from protected routes
  if (isProtectedPath && !session?.isLoggedIn) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', path);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from login page
  if (isAuthPath && path === '/auth/login' && session?.isLoggedIn) {
    const redirect = request.nextUrl.searchParams.get('redirect') || '/';
    return NextResponse.redirect(new URL(redirect, request.url));
  }

  // Allow all other requests
  return NextResponse.next();
}

// Apply middleware to all routes except static assets
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (e.g., robots.txt, sitemap.xml)
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
import { useState, useEffect, ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

// Mock user type
export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'admin' | 'editor' | 'reader';
}

// Mock session shape
interface Session {
  user: User;
  expiresAt: number;
}

// In-memory mock session store (for demo only)
let mockSession: Session | null = null;

// Initialize mock session on first load (simulating login)
if (!mockSession && typeof window !== 'undefined') {
  const saved = localStorage.getItem('dev-blog-session');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.expiresAt > Date.now()) {
        mockSession = parsed;
      }
    } catch {
      // ignore invalid JSON
    }
  }
}

// Client-side hook
export function useAuth() {
  const [session, setSession] = useState<Session | null>(mockSession);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async session check
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const login = (user: User) => {
    const newSession: Session = {
      user,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24h
    };
    mockSession = newSession;
    if (typeof window !== 'undefined') {
      localStorage.setItem('dev-blog-session', JSON.stringify(newSession));
    }
    setSession(newSession);
  };

  const logout = () => {
    mockSession = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dev-blog-session');
    }
    setSession(null);
  };

  return {
    session,
    user: session?.user || null,
    loading,
    login,
    logout,
  };
}

// Server-side auth guard — for App Router Server Components & Route Handlers
export function requireAuth(redirectUrl: string = '/auth/login') {
  'use server';
  
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('dev-blog-session');
  
  // For demo: we don't actually set a real cookie server-side,
  // but simulate presence via localStorage fallback or mock state.
  // In real app, this would validate JWT or session ID.
  
  // If client-side session exists in localStorage, we assume it's valid
  // (this is a simplification for mock-only flow)
  if (typeof window === 'undefined') {
    // Server context: no real session storage → rely on mockSession as shared state
    // Note: this is NOT production-safe; only for local demo consistency
    if (!mockSession || mockSession.expiresAt <= Date.now()) {
      redirect(redirectUrl);
    }
  }
}

// Universal HOC (Client Component wrapper with auth guard)
export function requireAuthClient(
  Component: React.ComponentType<any>,
  options: { redirectUrl?: string } = {}
) {
  return function AuthGuardedComponent(props: any) {
    const { session, loading } = useAuth();
    const { redirectUrl = '/auth/login' } = options;

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
        </div>
      );
    }

    if (!session) {
      redirect(redirectUrl);
      return null;
    }

    return <Component {...props} />;
  };
}

// Type-safe auth-aware server component wrapper (RSC-compatible)
export async function getServerSession(): Promise<Session | null> {
  // In real app: validate token from cookies / headers
  // Here: return mock session if still valid
  if (mockSession && mockSession.expiresAt > Date.now()) {
    return mockSession;
  }
  return null;
}

// Export constants for consistency
export const AUTH_COOKIE_NAME = 'dev-blog-session';
export const AUTH_REDIRECT_KEY = 'redirectTo';

// Identifier tag for traceability
export const AUTH_SCHEME_ID = 'PROMPT-F78CD1-000087';
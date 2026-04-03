import { requireAuth } from '@/lib/auth';
import { SeoHead } from '@/components/seo/SeoHead';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default async function ProtectedPage() {
  const session = await requireAuth();

  return (
    <>
      <SeoHead
        title="Protected Area — Dev Blog"
        description="This is a protected page. You must be logged in to view it."
        canonical="/auth/protected"
      />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 px-4 py-8 md:px-6 md:py-12">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-4 text-3xl font-bold text-gray-900">🔒 Protected Area</h1>
            <p className="mb-6 text-lg text-gray-700">
              Welcome, <span className="font-medium text-indigo-600">{session.user.name}</span>! This page is only accessible to authenticated users.
            </p>
            <div className="rounded-lg bg-indigo-50 p-6 shadow-sm">
              <h2 className="mb-2 text-xl font-semibold text-indigo-800">Session Info</h2>
              <ul className="space-y-1 text-sm text-indigo-700">
                <li>
                  <span className="font-medium">User ID:</span> {session.user.id}
                </li>
                <li>
                  <span className="font-medium">Email:</span> {session.user.email}
                </li>
                <li>
                  <span className="font-medium">Role:</span> {session.user.role}
                </li>
                <li>
                  <span className="font-medium">Authenticated at:</span>{' '}
                  {new Date(session.expiresAt).toLocaleString()}
                </li>
              </ul>
            </div>
            <div className="mt-8 flex gap-4">
              <a
                href="/blog"
                className="rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                ← Back to Blog
              </a>
              <a
                href="/auth/login"
                className="rounded-md bg-gray-100 px-4 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Log out
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
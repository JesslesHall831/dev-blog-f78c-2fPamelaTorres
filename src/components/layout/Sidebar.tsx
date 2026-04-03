import { Post } from '@/lib/types';
import { getRecommendations } from '@/lib/data/recommendations';
import Card from '@/components/ui/Card';
import Link from 'next/link';

interface SidebarProps {
  currentPostSlug?: string;
}

export default function Sidebar({ currentPostSlug }: SidebarProps) {
  const recommendations: Post[] = getRecommendations(currentPostSlug);

  if (recommendations.length === 0) return null;

  return (
    <aside className="sticky top-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recommended</h2>
        <ul className="space-y-4">
          {recommendations.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="block hover:opacity-90 transition-opacity">
                <Card
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.publishedAt}
                  category={post.category}
                  size="sm"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
// minor comment refresh
import { format } from 'date-fns';
import Link from 'next/link';
import { Post } from '@/lib/types';
import Tag from '@/components/ui/Tag';

interface CardProps {
  post: Post;
  variant?: 'default' | 'compact';
}

export default function Card({ post, variant = 'default' }: CardProps) {
  const isCompact = variant === 'compact';

  return (
    <article
      className={`rounded-xl border bg-card text-card-foreground shadow-sm transition-colors hover:bg-accent hover:shadow-md ${
        isCompact ? 'p-4' : 'p-6'
      }`}
    >
      <div className="flex flex-col space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {post.categories?.map((category) => (
            <Tag key={category.slug} size={isCompact ? 'sm' : 'md'}>
              {category.name}
            </Tag>
          ))}
        </div>

        <header>
          <h2 className={`font-semibold leading-tight ${isCompact ? 'text-lg' : 'text-xl'}`}>
            <Link
              href={`/blog/${post.slug}`}
              className="transition-colors hover:text-primary"
              prefetch={true}
            >
              {post.title}
            </Link>
          </h2>
        </header>

        <p
          className={`text-muted-foreground ${isCompact ? 'text-sm' : 'text-base'}`}
          title={post.excerpt}
        >
          {post.excerpt}
        </p>

        <footer className="mt-auto flex items-center justify-between pt-3 text-xs text-muted-foreground">
          <time dateTime={post.publishedAt}>
            {format(new Date(post.publishedAt), 'MMM d, yyyy')}
          </time>
          {!isCompact && (
            <Link
              href={`/blog/${post.slug}`}
              className="font-medium text-primary hover:underline"
              prefetch={true}
            >
              Read more →
            </Link>
          )}
        </footer>
      </div>
    </article>
  );
}
// minor comment refresh
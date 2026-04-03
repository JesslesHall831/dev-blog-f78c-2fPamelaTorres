import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [localPage, setLocalPage] = useState(currentPage);

  // Sync local state with URL on mount and when searchParams change
  useEffect(() => {
    const pageParam = searchParams.get('page');
    const parsed = pageParam ? parseInt(pageParam, 10) : 1;
    if (!isNaN(parsed) && parsed >= 1 && parsed <= totalPages) {
      setLocalPage(parsed);
    }
  }, [searchParams, totalPages]);

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    return `${pathname}?${params.toString()}`;
  };

  const handlePageClick = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setLocalPage(page);
    if (onPageChange) {
      onPageChange(page);
    }
    router.push(createPageUrl(page), { scroll: false });
  };

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (localPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, localPage - 1);
      const end = Math.min(totalPages - 1, localPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (localPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages.map((p, i) => {
      if (p === '...') {
        return (
          <span key={i} className="px-3 py-1 text-sm text-gray-500">
            ...
          </span>
        );
      }
      return (
        <button
          key={i}
          onClick={() => handlePageClick(p as number)}
          aria-label={`Go to page ${p}`}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors',
            localPage === p
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          )}
        >
          {p}
        </button>
      );
    });
  };

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center space-x-1">
      <button
        onClick={() => handlePageClick(Math.max(1, localPage - 1))}
        disabled={localPage <= 1}
        aria-label="Previous page"
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors',
          localPage <= 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        )}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => handlePageClick(Math.min(totalPages, localPage + 1))}
        disabled={localPage >= totalPages}
        aria-label="Next page"
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors',
          localPage >= totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        )}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </nav>
  );
}

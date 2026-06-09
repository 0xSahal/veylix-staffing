import Link from 'next/link'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import { buildBlogUrl } from '@/lib/blog/url'
import { cn } from '@/lib/utils'
import type { BlogFilter } from '@/types/blog'

type BlogPaginationProps = {
  currentPage: number
  totalPages: number
  category: BlogFilter
}

function getPageNumbers(currentPage: number, totalPages: number): number[] {
  const pages: number[] = []
  const maxVisible = 5
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
  const end = Math.min(totalPages, start + maxVisible - 1)

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let page = start; page <= end; page += 1) {
    pages.push(page)
  }

  return pages
}

export default function BlogPagination({
  currentPage,
  totalPages,
  category,
}: BlogPaginationProps): React.ReactNode {
  if (totalPages <= 1) return null

  const pages = getPageNumbers(currentPage, totalPages)

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
      aria-label="Blog pagination"
    >
      {currentPage > 1 ? (
        <Link
          href={buildBlogUrl({ page: currentPage - 1, category })}
          className="inline-flex h-10 w-10 items-center justify-center rounded-btn border border-vx-border bg-white text-vx-body transition-colors hover:border-vx-blue hover:text-vx-blue"
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </Link>
      ) : (
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-btn border border-vx-border bg-white text-vx-muted opacity-50"
          aria-hidden
        >
          <ChevronLeft size={18} />
        </span>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={buildBlogUrl({ page, category })}
          aria-current={page === currentPage ? 'page' : undefined}
          className={cn(
            'inline-flex h-10 min-w-10 items-center justify-center rounded-btn px-3 text-sm font-medium transition-colors',
            page === currentPage
              ? 'bg-vx-blue text-white'
              : 'border border-vx-border bg-white text-vx-body hover:border-vx-blue hover:text-vx-blue'
          )}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages ? (
        <Link
          href={buildBlogUrl({ page: currentPage + 1, category })}
          className="inline-flex h-10 w-10 items-center justify-center rounded-btn border border-vx-border bg-white text-vx-body transition-colors hover:border-vx-blue hover:text-vx-blue"
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </Link>
      ) : (
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-btn border border-vx-border bg-white text-vx-muted opacity-50"
          aria-hidden
        >
          <ChevronRight size={18} />
        </span>
      )}
    </nav>
  )
}

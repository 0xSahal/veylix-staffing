'use client'

import Link from 'next/link'

import BlogCard from '@/components/cards/BlogCard'
import type { BlogPostPreview } from '@/components/cards/BlogCard'
import BlogPagination from '@/components/ui/BlogPagination'
import { buildBlogUrl } from '@/lib/blog/url'
import { cn } from '@/lib/utils'
import { BLOG_FILTERS, type BlogFilter } from '@/types/blog'

type BlogListingProps = {
  posts: BlogPostPreview[]
  currentPage: number
  totalPages: number
  currentCategory: BlogFilter
}

export default function BlogListing({
  posts,
  currentPage,
  totalPages,
  currentCategory,
}: BlogListingProps): React.ReactNode {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {BLOG_FILTERS.map((tab) => (
          <Link
            key={tab}
            href={buildBlogUrl({ category: tab, page: 1 })}
            className={cn(
              'rounded-btn px-4 py-2 text-sm font-medium transition-colors',
              currentCategory === tab
                ? 'bg-vx-blue text-white'
                : 'bg-white text-vx-body hover:text-vx-blue'
            )}
          >
            {tab}
          </Link>
        ))}
      </div>

      {posts.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-vx-muted">
          No articles found{currentCategory !== 'All' ? ` in ${currentCategory}` : ''}.
        </p>
      )}

      <BlogPagination
        currentPage={currentPage}
        totalPages={totalPages}
        category={currentCategory}
      />
    </>
  )
}

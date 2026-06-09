'use client'

import { useState, useTransition } from 'react'

import Link from 'next/link'

import { newsletterSubscribe } from '@/app/actions/forms'
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
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleNewsletter = (e: React.FormEvent): void => {
    e.preventDefault()
    startTransition(async () => {
      const result = await newsletterSubscribe({ email })
      if (result.success) setSubscribed(true)
    })
  }

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

      <section className="mt-16 rounded-card-lg bg-vx-navy px-6 py-10 text-center sm:px-12">
        <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
          Stay updated on hiring trends and job market insights
        </h3>
        {subscribed ? (
          <p className="mt-4 text-white/70">You&apos;re subscribed. Thank you!</p>
        ) : (
          <form
            onSubmit={handleNewsletter}
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 rounded-btn border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-vx-blue"
              aria-label="Email for newsletter"
            />
            <button
              type="submit"
              disabled={isPending}
              className="btn-primary shrink-0 disabled:opacity-70"
            >
              {isPending ? '…' : 'Subscribe'}
            </button>
          </form>
        )}
      </section>
    </>
  )
}

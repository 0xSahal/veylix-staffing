import { POSTS_PER_PAGE } from '@/lib/blog/constants'
import { resolvePostsForSlugs } from '@/lib/blog/dedupe'
import { sanityClient } from '@/lib/sanity/client'
import { postSlugsQuery, postsBySlugsQuery } from '@/lib/sanity/queries'
import { BLOG_FILTERS, type BlogFilter, type SanityPostPreview } from '@/types/blog'

export function parseBlogPage(pageParam?: string): number {
  const parsed = Number.parseInt(pageParam ?? '1', 10)
  if (!Number.isFinite(parsed) || parsed < 1) return 1
  return parsed
}

export function parseBlogCategory(categoryParam?: string): BlogFilter {
  if (!categoryParam) return 'All'
  return BLOG_FILTERS.includes(categoryParam as BlogFilter)
    ? (categoryParam as BlogFilter)
    : 'All'
}

export async function fetchPaginatedPosts(
  category: BlogFilter,
  page: number
): Promise<{
  posts: SanityPostPreview[]
  total: number
  totalPages: number
}> {
  const categoryParam = category === 'All' ? 'all' : category
  const uniqueSlugs: string[] = await sanityClient.fetch(postSlugsQuery, {
    category: categoryParam,
  })

  const total = uniqueSlugs.length
  const totalPages = total === 0 ? 0 : Math.ceil(total / POSTS_PER_PAGE)
  const start = (page - 1) * POSTS_PER_PAGE
  const pageSlugs = uniqueSlugs.slice(start, start + POSTS_PER_PAGE)

  if (pageSlugs.length === 0) {
    return { posts: [], total, totalPages }
  }

  const rawPosts: SanityPostPreview[] = await sanityClient.fetch(postsBySlugsQuery, {
    slugs: pageSlugs,
  })
  const posts = resolvePostsForSlugs(pageSlugs, rawPosts)

  return { posts, total, totalPages }
}

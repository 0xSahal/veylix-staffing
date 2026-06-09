import { dedupePostsBySlug } from '@/lib/blog/dedupe'
import { sanityClient } from '@/lib/sanity/client'
import { recentPostsQuery } from '@/lib/sanity/queries'
import type { SanityPostPreview } from '@/types/blog'

export async function fetchRecentPosts(limit: number): Promise<SanityPostPreview[]> {
  const rawPosts: SanityPostPreview[] = await sanityClient.fetch(recentPostsQuery)
  return dedupePostsBySlug(rawPosts).slice(0, limit)
}

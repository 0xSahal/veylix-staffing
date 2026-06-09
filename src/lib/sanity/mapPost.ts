import type { BlogPostPreview } from '@/components/cards/BlogCard'
import type { SanityPostPreview } from '@/types/blog'

import { urlFor } from './image'

export function formatPostDate(publishedAt: string): string {
  return new Date(publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function mapSanityPostToPreview(post: SanityPostPreview): BlogPostPreview {
  return {
    id: post._id,
    slug: post.slug.current,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    date: formatPostDate(post.publishedAt),
    imageUrl: post.coverImage ? urlFor(post.coverImage).width(800).url() : undefined,
    imageSeed: post.slug.current,
    author: post.author.name,
  }
}

export function getCoverImageUrl(
  coverImage: SanityPostPreview['coverImage'],
  width = 800
): string | undefined {
  if (!coverImage) return undefined
  return urlFor(coverImage).width(width).url()
}

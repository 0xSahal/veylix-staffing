import type { PortableTextBlock } from '@portabletext/types'
import type { SanityImageSource } from '@sanity/image-url'

export interface SanityPostAuthor {
  name: string
  role?: string
}

export interface SanityPostPreview {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  category: string
  readTime?: string
  excerpt: string
  coverImage?: SanityImageSource
  author: SanityPostAuthor
  featured?: boolean
}

export interface SanityPost extends SanityPostPreview {
  body: PortableTextBlock[]
}

export const BLOG_FILTERS = [
  'All',
  'Industry Insights',
  'Hiring Tips',
  'Career Advice',
  'Workforce Trends',
  'Company News',
] as const

export type BlogFilter = (typeof BLOG_FILTERS)[number]

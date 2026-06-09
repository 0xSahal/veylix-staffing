import { routes } from '@/config/routes'
import { createPageMetadata } from '@/lib/metadata'
import { sanityClient } from '@/lib/sanity/client'
import { formatPostDate, getCoverImageUrl } from '@/lib/sanity/mapPost'
import { recentPostsQuery } from '@/lib/sanity/queries'
import type { SanityPostPreview } from '@/types/blog'

import JobSeekersPage, { type JobSeekerResource } from './JobSeekersPage'

export const revalidate = 60

export const metadata = createPageMetadata({
  title: 'For Job Seekers',
  description:
    'Find work that fits who you are. Career matching, interview prep, and salary negotiation support, at no cost to you.',
  path: routes.jobSeekers,
})

export default async function JobSeekersRoutePage(): Promise<React.ReactNode> {
  const posts: SanityPostPreview[] = await sanityClient.fetch(recentPostsQuery)

  const resources: JobSeekerResource[] = posts.map((post) => ({
    category: post.category,
    date: formatPostDate(post.publishedAt),
    title: post.title,
    excerpt: post.excerpt,
    href: routes.blogPost(post.slug.current),
    imageSrc:
      getCoverImageUrl(post.coverImage, 800) ?? '/images/recruting-interview.webp',
    imageAlt: post.title,
  }))

  return <JobSeekersPage resources={resources} />
}

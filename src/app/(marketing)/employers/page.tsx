import { routes } from '@/config/routes'
import { createPageMetadata } from '@/lib/metadata'
import { sanityClient } from '@/lib/sanity/client'
import { mapSanityPostToPreview } from '@/lib/sanity/mapPost'
import { recentPostsQuery } from '@/lib/sanity/queries'
import type { SanityPostPreview } from '@/types/blog'

import EmployersPage from './EmployersPage'

export const revalidate = 60

export const metadata = createPageMetadata({
  title: 'For Employers',
  description:
    'Improve your hiring strategies with certified staffing, pre-vetted talent, and dedicated account management.',
  path: routes.employers,
})

export default async function EmployersRoutePage(): Promise<React.ReactNode> {
  const posts: SanityPostPreview[] = await sanityClient.fetch(recentPostsQuery)
  const featuredPosts = posts.slice(0, 2).map(mapSanityPostToPreview)

  return <EmployersPage featuredPosts={featuredPosts} />
}

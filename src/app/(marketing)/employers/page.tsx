import { routes } from '@/config/routes'
import { createPageMetadata } from '@/lib/metadata'
import { fetchRecentPosts } from '@/lib/sanity/fetchPosts'
import { mapSanityPostToPreview } from '@/lib/sanity/mapPost'

import EmployersPage from './EmployersPage'

export const revalidate = 60

export const metadata = createPageMetadata({
  title: 'For Employers',
  description:
    'Improve your hiring strategies with certified staffing, pre-vetted talent, and dedicated account management.',
  path: routes.employers,
})

export default async function EmployersRoutePage(): Promise<React.ReactNode> {
  const posts = await fetchRecentPosts(2)
  const featuredPosts = posts.map(mapSanityPostToPreview)

  return <EmployersPage featuredPosts={featuredPosts} />
}

import PageHero from '@/components/layout/PageHero'
import BlogListing from '@/components/pages/BlogListing'
import { routes } from '@/config/routes'
import { createPageMetadata } from '@/lib/metadata'
import { sanityClient } from '@/lib/sanity/client'
import { mapSanityPostToPreview } from '@/lib/sanity/mapPost'
import { allPostsQuery } from '@/lib/sanity/queries'
import type { SanityPostPreview } from '@/types/blog'

export const revalidate = 60

export const metadata = createPageMetadata({
  title: 'Insights & Resources',
  description:
    'Stay ahead with the latest hiring insights, recruitment tips, and industry trends.',
  path: routes.blog,
})

export default async function BlogPage(): Promise<React.ReactNode> {
  const sanityPosts: SanityPostPreview[] = await sanityClient.fetch(allPostsQuery)
  const posts = sanityPosts.map(mapSanityPostToPreview)

  return (
    <main>
      <PageHero
        eyebrow="Insights"
        title="Insights & Resources"
        tagline="Stay ahead with the latest hiring insights and trends"
        imageSrc="/images/hero-bg.webp"
        breadcrumbs={[{ label: 'Blog' }]}
      />

      <section className="section-vx bg-vx-off">
        <div className="container-vx">
          <BlogListing posts={posts} />
        </div>
      </section>
    </main>
  )
}

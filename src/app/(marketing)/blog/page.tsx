import PageHero from '@/components/layout/PageHero'
import BlogListing from '@/components/pages/BlogListing'
import { routes } from '@/config/routes'
import { BLOG_POSTS } from '@/constants/pages/blog'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: 'Insights & Resources',
  description:
    'Stay ahead with the latest hiring insights, recruitment tips, and industry trends.',
  path: routes.blog,
})

export default function BlogPage(): React.ReactNode {
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
          <BlogListing posts={BLOG_POSTS} />
        </div>
      </section>
    </main>
  )
}

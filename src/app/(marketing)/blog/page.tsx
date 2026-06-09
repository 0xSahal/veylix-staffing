import { redirect } from 'next/navigation'

import PageHero from '@/components/layout/PageHero'
import BlogListing from '@/components/pages/BlogListing'
import { routes } from '@/config/routes'
import {
  fetchPaginatedPosts,
  parseBlogCategory,
  parseBlogPage,
} from '@/lib/blog/pagination'
import { buildBlogUrl } from '@/lib/blog/url'
import { createPageMetadata } from '@/lib/metadata'
import { mapSanityPostToPreview } from '@/lib/sanity/mapPost'

export const revalidate = 60

export const metadata = createPageMetadata({
  title: 'Insights & Resources',
  description:
    'Stay ahead with the latest hiring insights, recruitment tips, and industry trends.',
  path: routes.blog,
})

type PageProps = {
  searchParams: Promise<{ page?: string; category?: string }>
}

export default async function BlogPage({
  searchParams,
}: PageProps): Promise<React.ReactNode> {
  const { page: pageParam, category: categoryParam } = await searchParams
  const category = parseBlogCategory(categoryParam)
  const requestedPage = parseBlogPage(pageParam)

  const { posts: sanityPosts, totalPages } = await fetchPaginatedPosts(
    category,
    requestedPage
  )

  if (totalPages > 0 && requestedPage > totalPages) {
    redirect(buildBlogUrl({ page: totalPages, category }))
  }

  const currentPage = totalPages === 0 ? 1 : requestedPage
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
          <BlogListing
            posts={posts}
            currentPage={currentPage}
            totalPages={totalPages}
            currentCategory={category}
          />
        </div>
      </section>
    </main>
  )
}

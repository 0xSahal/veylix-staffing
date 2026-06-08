import Image from 'next/image'
import { notFound } from 'next/navigation'

import BlogCard from '@/components/cards/BlogCard'
import PageHero from '@/components/layout/PageHero'
import { routes } from '@/config/routes'
import { BLOG_POSTS } from '@/constants/pages/blog'
import { createPageMetadata } from '@/lib/metadata'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams(): { slug: string }[] {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) return {}
  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: routes.blogPost(slug),
  })
}

export default async function BlogPostPage({
  params,
}: PageProps): Promise<React.ReactNode> {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3)
  const shareUrl = `${routes.blogPost(slug)}`

  return (
    <main>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        imageSrc="/images/recruting-interview.webp"
        breadcrumbs={[{ label: 'Blog', href: routes.blog }, { label: post.category }]}
      />

      <article className="section-vx bg-white">
        <div className="container-vx max-w-3xl">
          <div className="flex flex-wrap items-center gap-4 text-sm text-vx-muted">
            <span className="section-label">{post.category}</span>
            <time>{post.date}</time>
            <span>{post.readTime}</span>
            <span>By {post.author}</span>
          </div>

          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-card-lg">
            <Image
              src={`https://picsum.photos/seed/${post.imageSeed}/800/450`}
              alt=""
              fill
              className="object-cover"
              sizes="800px"
              priority
            />
          </div>

          <div className="prose-vx mt-10 space-y-4">
            {post.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="font-body text-base leading-relaxed text-vx-body"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3 border-t border-vx-border pt-8">
            <span className="text-sm font-medium text-vx-muted">Share:</span>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-vx-blue hover:underline"
            >
              LinkedIn
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-vx-blue hover:underline"
            >
              Twitter
            </a>
          </div>
        </div>
      </article>

      <section className="section-vx bg-vx-off">
        <div className="container-vx">
          <h2 className="heading-h3 text-vx-navy">Related Articles</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

import Image from 'next/image'
import { notFound } from 'next/navigation'

import { PortableText, type PortableTextComponents } from '@portabletext/react'

import BlogCard from '@/components/cards/BlogCard'
import PageHero from '@/components/layout/PageHero'
import { routes } from '@/config/routes'
import { createPageMetadata } from '@/lib/metadata'
import { sanityClient } from '@/lib/sanity/client'
import {
  getCoverImageUrl,
  mapSanityPostToPreview,
  formatPostDate,
} from '@/lib/sanity/mapPost'
import { allPostSlugsQuery, allPostsQuery, postBySlugQuery } from '@/lib/sanity/queries'
import type { SanityPost, SanityPostPreview } from '@/types/blog'

export const revalidate = 60

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-body text-base leading-relaxed text-vx-body">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-2xl font-semibold text-vx-navy">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-xl font-semibold text-vx-navy">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-vx-blue pl-4 font-body italic text-vx-muted">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-5 font-body text-base text-vx-body">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-5 font-body text-base text-vx-body">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode
      value?: { href?: string }
    }) => {
      const href = value?.href
      if (!href) {
        return <span>{children}</span>
      }

      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-vx-blue hover:underline"
        >
          {children}
        </a>
      )
    },
  },
}

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs: { slug: string }[] = await sanityClient.fetch(allPostSlugsQuery)
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post: SanityPost | null = await sanityClient.fetch(postBySlugQuery, { slug })
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
  const post: SanityPost | null = await sanityClient.fetch(postBySlugQuery, { slug })
  if (!post) notFound()

  const allPosts: SanityPostPreview[] = await sanityClient.fetch(allPostsQuery)
  const related = allPosts
    .filter((p) => p.slug.current !== slug)
    .slice(0, 3)
    .map(mapSanityPostToPreview)

  const shareUrl = `${routes.blogPost(slug)}`
  const coverImageUrl =
    getCoverImageUrl(post.coverImage, 800) ??
    `https://picsum.photos/seed/${post.slug.current}/800/450`

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
            <time>{formatPostDate(post.publishedAt)}</time>
            {post.readTime ? <span>{post.readTime}</span> : null}
            <span>By {post.author.name}</span>
          </div>

          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-card-lg">
            <Image
              src={coverImageUrl}
              alt=""
              fill
              className="object-cover"
              sizes="800px"
              priority
            />
          </div>

          <div className="prose-vx mt-10 space-y-4">
            <PortableText value={post.body} components={portableTextComponents} />
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

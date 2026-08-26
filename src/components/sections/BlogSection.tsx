import Image from 'next/image'
import Link from 'next/link'

import { ArrowRight } from 'lucide-react'

import { routes } from '@/config/routes'
import { formatPostDate, getCoverImageUrl } from '@/lib/sanity/mapPost'
import { cn } from '@/lib/utils'
import type { SanityPostPreview } from '@/types/blog'

const DEFAULT_AUTHOR_AVATAR =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&q=80&fit=crop&crop=face'

const FALLBACK_FEATURED_IMAGE =
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&fit=crop'

const FALLBACK_SIDE_IMAGE =
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&fit=crop'

type BlogSectionProps = {
  posts: SanityPostPreview[]
}

export default function BlogSection({ posts }: BlogSectionProps): React.ReactNode {
  const [featured, ...rest] = posts

  if (!featured) {
    return null
  }

  const sidePosts = rest.slice(0, 2)
  const hasSidebar = sidePosts.length > 0
  const featuredImage =
    getCoverImageUrl(featured.coverImage, 800) ?? FALLBACK_FEATURED_IMAGE

  return (
    <section className="section-vx bg-vx-off">
      <div className="container-vx mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <span className="section-label">FROM THE JOURNAL</span>
          <h2 className="heading-h2 mt-3 max-w-sm text-vx-navy">
            Straight talk on
            <br />
            hiring.
          </h2>
        </div>
        <Link
          href={routes.blog}
          className="inline-flex items-center gap-1.5 font-body text-[15px] font-semibold text-vx-blue transition-all duration-300 hover:gap-2.5"
        >
          All articles
          <ArrowRight size={14} />
        </Link>
      </div>

      <div
        className={cn(
          'container-vx grid grid-cols-1 items-stretch gap-6',
          hasSidebar && 'md:grid-cols-2 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]'
        )}
      >
        <Link
          href={routes.blogPost(featured.slug.current)}
          className="group flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-card border border-vx-border bg-white shadow-card transition-all duration-300 ease-expo-out hover:-translate-y-0.5 hover:shadow-card-hover"
        >
          <div className="relative min-h-[220px] flex-1 overflow-hidden sm:min-h-[260px] lg:min-h-[280px]">
            <Image
              src={featuredImage}
              alt={featured.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes={hasSidebar ? '(max-width: 768px) 100vw, 58vw' : '100vw'}
              loading="lazy"
            />
          </div>
          <div className="flex flex-col p-6 lg:p-8">
            <span className="section-label w-fit">{featured.category}</span>
            <h3 className="mt-4 font-display text-2xl font-semibold leading-snug text-vx-navy transition-colors group-hover:text-vx-blue lg:text-[28px]">
              {featured.title}
            </h3>
            <p className="mt-3 line-clamp-3 max-w-lg font-body text-sm leading-relaxed text-vx-muted">
              {featured.excerpt}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-body text-[13px] text-vx-muted">
              <Image
                src={DEFAULT_AUTHOR_AVATAR}
                alt={`${featured.author.name}${featured.author.role ? `, ${featured.author.role}` : ''}`}
                width={32}
                height={32}
                className="h-8 w-8 shrink-0 rounded-full object-cover"
                sizes="32px"
                loading="lazy"
              />
              <span>
                {featured.author.name}
                {featured.author.role ? `, ${featured.author.role}` : ''}
              </span>
              <span aria-hidden="true">·</span>
              <span>{formatPostDate(featured.publishedAt)}</span>
              {featured.readTime ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{featured.readTime}</span>
                </>
              ) : null}
            </div>
          </div>
        </Link>

        {hasSidebar ? (
          <div className="flex h-full min-h-0 min-w-0 flex-col gap-6">
            {sidePosts.map((post) => (
              <SideBlogCard
                key={post._id}
                slug={post.slug.current}
                image={getCoverImageUrl(post.coverImage, 600) ?? FALLBACK_SIDE_IMAGE}
                alt={post.title}
                label={post.category}
                title={post.title}
                meta={`${formatPostDate(post.publishedAt)}${post.readTime ? ` · ${post.readTime}` : ''}`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

function SideBlogCard({
  slug,
  image,
  alt,
  label,
  title,
  meta,
}: {
  slug: string
  image: string
  alt: string
  label: string
  title: string
  meta: string
}): React.ReactNode {
  return (
    <Link
      href={routes.blogPost(slug)}
      className="group flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-card border border-vx-border bg-white shadow-card transition-all duration-300 ease-expo-out hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      <div className="relative min-h-[140px] flex-1 overflow-hidden sm:min-h-[160px]">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 42vw"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col p-5">
        <span className="section-label w-fit">{label}</span>
        <h3 className="mt-3 line-clamp-3 font-display text-lg font-semibold leading-snug text-vx-navy transition-colors group-hover:text-vx-blue lg:text-xl">
          {title}
        </h3>
        <p className="mt-2 font-body text-xs text-vx-muted">{meta}</p>
      </div>
    </Link>
  )
}

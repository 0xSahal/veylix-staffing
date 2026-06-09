import Image from 'next/image'
import Link from 'next/link'

import { ArrowRight } from 'lucide-react'

import { routes } from '@/config/routes'

export type BlogPostPreview = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  imageUrl?: string
  imageSeed?: string
  author: string
  authorAvatar?: string
}

type BlogCardProps = {
  post: BlogPostPreview
}

export default function BlogCard({ post }: BlogCardProps): React.ReactNode {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-vx-border bg-white shadow-card transition-shadow hover:shadow-card-hover">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={
            post.imageUrl ??
            `https://picsum.photos/seed/${post.imageSeed ?? post.slug}/400/250`
          }
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="section-label w-fit">{post.category}</span>
        <time className="mt-2 text-xs text-vx-muted">{post.date}</time>
        <h3 className="mt-2 font-display text-lg font-semibold text-vx-navy group-hover:text-vx-blue">
          <Link href={routes.blogPost(post.slug)}>{post.title}</Link>
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 font-body text-sm leading-relaxed text-vx-muted">
          {post.excerpt}
        </p>
        <Link
          href={routes.blogPost(post.slug)}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-vx-blue"
        >
          Read More
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  )
}

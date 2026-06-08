import Image from 'next/image'
import Link from 'next/link'

import { ArrowRight } from 'lucide-react'

export default function BlogSection(): React.ReactNode {
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
          href="/blog"
          className="inline-flex items-center gap-1.5 font-body text-[15px] font-semibold text-vx-blue"
        >
          All articles
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="container-vx grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article className="group col-span-1 cursor-pointer transition-transform duration-300 hover:-translate-y-0.5 md:col-span-2 lg:col-span-2">
          <div className="relative h-56 overflow-hidden rounded-card-lg sm:h-64 lg:h-72">
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&fit=crop"
              alt="Hiring strategy article, how to build a high-retention team in 2026"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 66vw"
              loading="lazy"
            />
          </div>
          <span className="section-label mt-5">HIRING STRATEGY</span>
          <h3 className="mt-3 font-display text-2xl font-semibold leading-snug text-vx-body transition-colors group-hover:text-vx-blue">
            Why your top candidates are declining your offers, and what to actually do
            about it
          </h3>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-vx-muted">
            The job market has shifted. Candidates have options, and they know it.
            Here&apos;s what the companies winning the talent war are doing differently in
            their offer process.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-[13px] text-vx-muted">
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&q=80&fit=crop&crop=face"
              alt="Ryan Cole, Head of Talent at Veylix Staffing"
              width={32}
              height={32}
              className="rounded-full"
              sizes="32px"
              loading="lazy"
            />
            <span>Ryan Cole, Head of Talent</span>
            <span>·</span>
            <span>May 12, 2026</span>
            <span>·</span>
            <span>6 min read</span>
          </div>
        </article>

        <SideBlogCard
          image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&fit=crop"
          alt="Executive interview process, best practices for senior hiring"
          label="EXECUTIVE SEARCH"
          title="What separates a good executive hire from a great one"
          meta="Apr 28, 2026 · 4 min read"
        />
        <SideBlogCard
          image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fit=crop"
          alt="Contract staffing trends in the technology sector 2026"
          label="WORKFORCE TRENDS"
          title="The rise of project-based hiring, and what it means for your 2026 headcount"
          meta="Apr 15, 2026 · 5 min read"
        />
      </div>
    </section>
  )
}

function SideBlogCard({
  image,
  alt,
  label,
  title,
  meta,
}: {
  image: string
  alt: string
  label: string
  title: string
  meta: string
}): React.ReactNode {
  return (
    <article className="group col-span-1 cursor-pointer transition-transform duration-300 hover:-translate-y-0.5">
      <div className="relative h-44 overflow-hidden rounded-card">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 33vw"
          loading="lazy"
        />
      </div>
      <span className="section-label mt-4">{label}</span>
      <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-vx-body transition-colors group-hover:text-vx-blue">
        {title}
      </h3>
      <p className="mt-2 text-xs text-vx-muted">{meta}</p>
    </article>
  )
}

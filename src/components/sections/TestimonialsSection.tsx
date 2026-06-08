'use client'

import Image from 'next/image'

import { Star } from 'lucide-react'
import Marquee from 'react-fast-marquee'

import GlowCard from '@/components/ui/GlowCard'
import { TESTIMONIALS } from '@/constants/sections/testimonials'

const MARQUEE_SPEED = 35

export default function TestimonialsSection(): React.ReactNode {
  const trackOne = TESTIMONIALS.slice(0, 3)
  const trackTwo = TESTIMONIALS.slice(3, 6)

  return (
    <section className="section-vx bg-vx-off">
      <div className="container-vx mb-14 text-center">
        <span className="section-label">CLIENT STORIES</span>
        <h2 className="heading-h2 mt-4 text-vx-navy">Results, in their own words.</h2>
        <p className="mx-auto mt-4 max-w-lg font-body text-lg text-vx-muted">
          Named clients. Specific numbers. No stock-photo quotes.
        </p>
      </div>

      <Marquee speed={MARQUEE_SPEED} gradient={false} pauseOnHover>
        {trackOne.map((item) => (
          <TestimonialCard key={item.name} item={item} />
        ))}
      </Marquee>
      <Marquee
        speed={MARQUEE_SPEED}
        gradient={false}
        pauseOnHover
        direction="right"
        className="mt-4"
      >
        {trackTwo.map((item) => (
          <TestimonialCard key={item.name} item={item} />
        ))}
      </Marquee>
    </section>
  )
}

function TestimonialCard({
  item,
}: {
  item: (typeof TESTIMONIALS)[number]
}): React.ReactNode {
  return (
    <GlowCard className="group mx-3 w-[320px] flex-shrink-0 rounded-card border border-vx-border bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:w-[380px] sm:p-7 lg:w-[400px] lg:p-8">
      <div className="flex items-start justify-between">
        <div className="flex gap-1">
          {(['t-star-1', 't-star-2', 't-star-3', 't-star-4', 't-star-5'] as const).map(
            (id) => (
              <Star key={id} size={14} className="fill-vx-gold stroke-0" />
            )
          )}
        </div>
        <span className="font-display text-6xl font-extrabold leading-none text-vx-blue-lt">
          &ldquo;
        </span>
      </div>
      <span className="mt-3 inline-flex rounded-full bg-vx-blue-lt px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-vx-blue">
        {item.result}
      </span>
      <p className="mt-3 font-body text-sm italic leading-relaxed text-vx-body sm:text-[15px]">
        {item.quote}
      </p>
      <hr className="mt-5 border-vx-border" />
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={item.avatar}
            alt={item.alt}
            width={40}
            height={40}
            className="rounded-full object-cover ring-2 ring-vx-border"
            sizes="40px"
            loading="lazy"
          />
          <div>
            <p className="font-body text-sm font-semibold text-vx-body">{item.name}</p>
            <p className="text-xs text-vx-muted">{item.title}</p>
          </div>
        </div>
        <span className="rounded-full bg-vx-green/10 px-2 py-0.5 text-[10px] font-semibold text-vx-green">
          Verified ✓
        </span>
      </div>
    </GlowCard>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'

import { m } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'

import GlowCard from '@/components/ui/GlowCard'
import { fadeUp, staggerContainer } from '@/constants/animations'
import { SERVICE_CARDS } from '@/constants/sections/services'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export default function ServicesSection(): React.ReactNode {
  const prefersReduced = usePrefersReducedMotion()

  return (
    <section className="section-vx bg-vx-off">
      <div className="container-vx mb-12 text-center lg:mb-16">
        <span className="section-label">WHAT WE DO</span>
        <h2 className="heading-h2 mx-auto mt-4 max-w-2xl text-vx-navy">
          Every kind of hire.
          <br />
          One trusted partner.
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-body text-lg leading-relaxed text-vx-muted">
          One contractor, a full contract team, or your next VP: there&apos;s a model that
          fits, and recruiters who&apos;ve done it in your industry before.
        </p>
      </div>

      <m.div
        className="container-vx"
        variants={prefersReduced ? undefined : staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
      >
        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2">
          {SERVICE_CARDS.map((card) => (
            <ServiceCard key={card.title} card={card} />
          ))}
        </div>
      </m.div>
    </section>
  )
}

function ServiceCard({
  card,
}: {
  card: (typeof SERVICE_CARDS)[number]
}): React.ReactNode {
  return (
    <m.div variants={fadeUp} className="h-full">
      <GlowCard className="group h-full overflow-hidden rounded-card border border-vx-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-vx-blue hover:shadow-card-hover">
        <Link href={card.href} className="flex h-full flex-col p-5 sm:p-6 lg:p-8">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
            <Image
              src={card.image}
              alt={card.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
          <span className="mt-5 inline-flex w-fit rounded-full bg-vx-blue-lt px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-vx-blue">
            {card.label}
          </span>
          <h3 className="mt-3 font-display text-xl font-semibold text-vx-navy transition-colors group-hover:text-vx-blue">
            {card.title}
          </h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-vx-muted">
            {card.body}
          </p>
          <ul className="mt-4 space-y-2.5">
            {card.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 font-body text-sm text-vx-body"
              >
                <CheckCircle size={15} className="mt-0.5 shrink-0 text-vx-blue" />
                {item}
              </li>
            ))}
          </ul>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-vx-blue">
            Explore
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </Link>
      </GlowCard>
    </m.div>
  )
}

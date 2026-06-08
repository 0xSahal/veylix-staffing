'use client'

import Image from 'next/image'
import Link from 'next/link'

import { m } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'

import GlowCard from '@/components/ui/GlowCard'
import MagneticButton from '@/components/ui/MagneticButton'
import { fadeUp, staggerContainer } from '@/constants/animations'
import { FEATURE_DOT_POSITIONS, SERVICE_CARDS } from '@/constants/sections/services'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export default function ServicesSection(): React.ReactNode {
  const prefersReduced = usePrefersReducedMotion()

  return (
    <section className="section-vx bg-vx-off">
      <div className="container-vx mb-16 text-center">
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
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CARDS.slice(0, 2).map((card) => (
            <ServiceCard key={card.title} card={card} />
          ))}
          <m.div
            variants={prefersReduced ? undefined : fadeUp}
            className="row-span-1 lg:row-span-2"
          >
            <FeatureCard />
          </m.div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CARDS.slice(2).map((card) => (
            <ServiceCard key={card.title} card={card} />
          ))}
        </div>
      </m.div>
    </section>
  )
}

function ServiceCard({
  card,
  className = '',
}: {
  card: (typeof SERVICE_CARDS)[number]
  className?: string
}): React.ReactNode {
  return (
    <m.div variants={fadeUp} className={className}>
      <GlowCard className="group relative overflow-hidden rounded-card border border-vx-border bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-vx-blue hover:shadow-card-hover">
        <div className="relative mb-6 h-40 overflow-hidden rounded-xl sm:h-48">
          <Image
            src={card.image}
            alt={card.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="lazy"
          />
        </div>
        <span className="inline-flex rounded-full bg-vx-blue-lt px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-vx-blue">
          {card.label}
        </span>
        <h3 className="mt-3 font-display text-xl font-semibold text-vx-body">
          {card.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-vx-muted">{card.body}</p>
        <Link
          href={card.href}
          className="mt-5 inline-flex translate-x-[-4px] items-center gap-1.5 text-sm font-semibold text-vx-blue opacity-0 transition-all duration-250 group-hover:translate-x-0 group-hover:opacity-100"
        >
          Explore
          <ArrowRight size={14} />
        </Link>
      </GlowCard>
    </m.div>
  )
}

function FeatureCard(): React.ReactNode {
  return (
    <div
      className="relative flex h-full min-h-[420px] flex-col justify-between overflow-hidden rounded-card border border-white/[0.06] p-6 sm:p-10"
      style={{
        background: 'linear-gradient(160deg, #060E1F 0%, #0D2456 60%, #060E1F 100%)',
      }}
    >
      {FEATURE_DOT_POSITIONS.map((pos) => (
        <span
          key={`${pos.top}-${pos.left}`}
          className="absolute h-1 w-1 rounded-full bg-white/[0.04]"
          style={{ top: pos.top, left: pos.left }}
          aria-hidden="true"
        />
      ))}
      <div
        className="pointer-events-none absolute left-[-50%] top-[40%] h-px w-[200%] rotate-[-35deg]"
        style={{
          background:
            'linear-gradient(90deg, rgba(255,255,255,0.08), transparent, rgba(255,255,255,0.08))',
        }}
        aria-hidden="true"
      />
      <div>
        <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white">
          WORKFORCE STRATEGY
        </span>
        <h3 className="mt-4 font-display text-[28px] font-bold leading-tight text-white">
          Not sure which
          <br />
          model fits your
          <br />
          team right now?
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/60">
          Tell us what&apos;s open now and what&apos;s coming in the next six months.
          We&apos;ll tell you which engagement model makes sense. Free 30-minute call, no
          contract required.
        </p>
        <ul className="mt-6 space-y-3">
          {[
            'Free 30-minute consultation',
            'No commitment, no contract',
            'Written plan back within 48 hours',
          ].map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm text-white/80">
              <CheckCircle size={14} className="text-vx-sky" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <MagneticButton
        href="/contact"
        className="mt-8 w-full justify-center rounded-btn bg-white px-4 py-3 text-sm font-semibold text-vx-navy transition-colors duration-300 hover:bg-vx-blue hover:text-white sm:w-auto sm:px-6 sm:text-base"
      >
        Book a Strategy Call →
      </MagneticButton>
    </div>
  )
}

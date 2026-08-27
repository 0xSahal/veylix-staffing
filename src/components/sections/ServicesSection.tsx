'use client'

import Image from 'next/image'
import Link from 'next/link'

import { m } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'

import GlowCard from '@/components/ui/GlowCard'
import MagneticButton from '@/components/ui/MagneticButton'
import { FEATURE_DOT_POSITIONS, SERVICE_CARDS } from '@/constants/sections/services'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const STAGGER_S = 0.08
const REVEAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const STRATEGY_POINTS = [
  'Free 30-minute consultation',
  '72-hour shortlist on most roles',
  '90-day placement guarantee',
  'Written plan back within 48 hours',
] as const

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

      <div className="container-vx">
        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2">
          {SERVICE_CARDS.map((card, index) => (
            <ServiceCard
              key={card.title}
              card={card}
              index={index}
              prefersReduced={prefersReduced}
            />
          ))}
        </div>
        <m.div
          className="mt-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={
            prefersReduced ? { duration: 0 } : { duration: 0.6, ease: REVEAL_EASE }
          }
        >
          <FeatureCard />
        </m.div>
      </div>
    </section>
  )
}

function ServiceCard({
  card,
  index,
  prefersReduced,
}: {
  card: (typeof SERVICE_CARDS)[number]
  index: number
  prefersReduced: boolean
}): React.ReactNode {
  return (
    <m.div
      className="h-full"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={
        prefersReduced
          ? { duration: 0 }
          : { delay: index * STAGGER_S, duration: 0.6, ease: REVEAL_EASE }
      }
    >
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

function FeatureCard(): React.ReactNode {
  return (
    <div
      className="relative overflow-hidden rounded-card border border-white/[0.06] p-6 sm:p-8 lg:p-10"
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
      <div className="relative z-[1] grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)_auto] lg:items-center lg:gap-12">
        <div>
          <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white">
            WORKFORCE STRATEGY
          </span>
          <h3 className="mt-4 font-display text-[26px] font-bold leading-tight text-white sm:text-[28px]">
            Not sure which model fits your team right now?
          </h3>
          <p className="mt-3 max-w-lg font-body text-sm leading-relaxed text-white/70">
            Tell us what&apos;s open now and what&apos;s coming in the next six months.
            We&apos;ll tell you which engagement model makes sense. Free 30-minute call,
            no contract required.
          </p>
        </div>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {STRATEGY_POINTS.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm text-white/85">
              <CheckCircle size={15} className="shrink-0 text-vx-sky" />
              {item}
            </li>
          ))}
        </ul>
        <MagneticButton
          href="/contact"
          className="w-full justify-center rounded-btn bg-white px-6 py-3.5 text-sm font-semibold text-vx-navy transition-colors duration-300 hover:bg-vx-blue hover:text-white sm:w-auto lg:self-center"
        >
          Book a Strategy Call →
        </MagneticButton>
      </div>
    </div>
  )
}

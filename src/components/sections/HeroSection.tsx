'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'

import { m } from 'framer-motion'
import { Star, TrendingUp } from 'lucide-react'

import AnimatedCounter from '@/components/ui/AnimatedCounter'
import GlowCard from '@/components/ui/GlowCard'
import MagneticButton from '@/components/ui/MagneticButton'
import SplitText from '@/components/ui/SplitText'
import { siteConfig } from '@/config/site'
import {
  HERO_BG_OBJECT_POSITION,
  HERO_FLOAT_DURATION_A_S,
  HERO_FLOAT_DURATION_B_S,
  HERO_FLOAT_DURATION_C_S,
  HERO_FLOAT_OFFSET_PX,
  HERO_MATCH_SCORE_PERCENT,
  HERO_PLACEMENT_CANDIDATE_IMAGE,
  HERO_VIDEO_URL,
} from '@/constants/hero'
import { useInViewAnimation } from '@/hooks/useInViewAnimation'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useSplashReady } from '@/hooks/useSplashReady'

const ParticlesBackground = dynamic(() => import('@/components/ui/ParticlesBackground'), {
  ssr: false,
})

const SUBHEAD_DELAY_S = 0.72
const CTA_DELAY_S = 0.9
const CARD_A_DELAY_S = 1.3
const CARD_B_DELAY_S = 1.5
const CARD_C_DELAY_S = 1.7

const BAR_CHART_HEIGHTS = [
  { id: 'bar-mon', height: 40 },
  { id: 'bar-tue', height: 65 },
  { id: 'bar-wed', height: 50 },
  { id: 'bar-thu', height: 85 },
  { id: 'bar-fri', height: 70 },
] as const

const HERO_STAR_IDS = ['star-1', 'star-2', 'star-3', 'star-4', 'star-5'] as const

export default function HeroSection(): React.ReactNode {
  const prefersReduced = usePrefersReducedMotion()
  const splashReady = useSplashReady()
  const { ref: cardRef, isInView: cardInView } = useInViewAnimation({
    threshold: 0.5,
    once: true,
  })

  const playIntro = prefersReduced || splashReady

  const floatTransition = (duration: number, delay = 0) =>
    prefersReduced || !splashReady
      ? undefined
      : {
          y: [0, -HERO_FLOAT_OFFSET_PX, 0],
          transition: {
            repeat: Infinity,
            duration,
            delay,
            ease: 'easeInOut' as const,
          },
        }

  return (
    <section className="relative min-h-[calc(100svh-var(--announcement-h,44px)-var(--navbar-height,76px))] overflow-x-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.webp"
          alt=""
          fill
          priority
          quality={90}
          className="object-cover object-[center_30%]"
          style={{ objectPosition: HERO_BG_OBJECT_POSITION }}
          aria-hidden="true"
        />
      </div>

      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 z-[1] h-full w-full object-cover object-[center_30%]"
        style={{ objectPosition: HERO_BG_OBJECT_POSITION }}
        onError={(e) => {
          const el = e.currentTarget
          el.style.display = 'none'
        }}
      >
        <source src={HERO_VIDEO_URL} type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            'linear-gradient(105deg, rgba(6, 14, 31, 0.92) 0%, rgba(6, 14, 31, 0.75) 45%, rgba(6, 14, 31, 0.82) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 z-[2] hidden sm:block">
        <ParticlesBackground />
      </div>

      <div className="container-vx relative z-[10] flex min-h-[inherit] flex-col justify-center py-12 pb-20">
        <div className="w-full max-w-[32rem] sm:max-w-2xl lg:max-w-[min(44rem,52vw)]">
          <m.div
            className="mb-7 hidden lg:block"
            initial={prefersReduced ? false : { opacity: 0, y: 10 }}
            animate={playIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-stretch gap-4">
              <span
                className="w-px shrink-0 bg-gradient-to-b from-vx-sky/80 via-vx-blue/25 to-transparent"
                aria-hidden="true"
              />
              <div>
                <p className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-[#93C5FD]">
                  Permanent · Contract · Executive Search
                </p>
                <p className="mt-1.5 font-body text-[13px] text-white/45">
                  US &amp; Canada · Est. {siteConfig.foundedYear}
                </p>
              </div>
            </div>
          </m.div>

          <m.h1
            className="space-y-0.5 sm:space-y-1"
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={playIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <span className="heading-hero block">
              <SplitText
                text="Staffing That Builds"
                className="text-white"
                delay={0.25}
              />
              <SplitText text="Empires" wordClassName="text-gradient-blue" delay={0.42} />
            </span>
            <SplitText
              text="Not Just Teams."
              className="heading-hero block text-white"
              delay={0.55}
            />
          </m.h1>

          <m.p
            className="mb-8 mt-6 max-w-[90vw] font-body text-[15px] leading-[1.7] text-[#94A3B8] sm:max-w-xl sm:text-base lg:max-w-2xl"
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={playIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{
              delay: SUBHEAD_DELAY_S,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {siteConfig.name} is the talent partner for companies that refuse to settle.
            We place permanent, contract, and executive professionals with speed,
            precision, and an obsession for fit.
          </m.p>

          <m.div
            className="flex flex-col flex-wrap items-stretch gap-4 sm:flex-row sm:items-center"
            initial={prefersReduced ? false : { opacity: 0, y: 14 }}
            animate={playIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{
              delay: CTA_DELAY_S,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <MagneticButton
              href="/contact"
              className="w-full justify-center rounded-btn bg-gradient-to-br from-vx-blue to-vx-blue-dark px-8 py-4 text-base font-semibold text-white transition-shadow duration-300 hover:shadow-glow-blue sm:w-auto"
            >
              Start Hiring →
            </MagneticButton>
            <MagneticButton
              href="/job-seekers"
              className="btn-ghost-white w-full justify-center text-base sm:w-auto"
            >
              Find Jobs
            </MagneticButton>
          </m.div>
        </div>
      </div>

      <m.div
        className="glass-dark absolute bottom-28 right-8 z-10 hidden w-72 rounded-card p-5 lg:right-16 lg:block xl:right-24"
        initial={prefersReduced ? false : { y: 30, opacity: 0 }}
        animate={
          playIntro
            ? { y: 0, opacity: 1, ...floatTransition(HERO_FLOAT_DURATION_A_S) }
            : { y: 30, opacity: 0 }
        }
        transition={{ delay: CARD_A_DELAY_S, duration: 0.7 }}
      >
        <GlowCard className="rounded-card">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-vx-green" />
            <span className="text-xs font-semibold text-vx-green">Live Placement</span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <Image
              src={HERO_PLACEMENT_CANDIDATE_IMAGE}
              alt="James Carter, Senior Data Engineer"
              width={44}
              height={44}
              className="h-11 w-11 shrink-0 rounded-full object-cover object-[center_20%] ring-2 ring-white/10"
              sizes="44px"
            />
            <div>
              <p className="text-sm font-semibold text-white">James Carter</p>
              <p className="text-xs text-[#94A3B8]">Senior Data Engineer</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-[11px] text-[#94A3B8]">
            <span>Match Score</span>
            <span className="text-xs font-semibold text-vx-sky">
              {HERO_MATCH_SCORE_PERCENT}%
            </span>
          </div>
          <div className="mt-1.5 h-1.5 rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-vx-sky/80"
              style={{ width: `${HERO_MATCH_SCORE_PERCENT}%` }}
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Python', 'AWS', 'Kafka'].map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-white/[0.08] px-2 py-0.5 text-[10px] text-white/70"
              >
                {skill}
              </span>
            ))}
          </div>
        </GlowCard>
      </m.div>

      <m.div
        className="glass-dark absolute right-12 top-32 z-10 hidden w-56 rounded-card p-5 lg:right-20 lg:block xl:right-28"
        initial={prefersReduced ? false : { y: 30, opacity: 0 }}
        animate={
          playIntro
            ? {
                y: 0,
                opacity: 1,
                ...floatTransition(HERO_FLOAT_DURATION_B_S, 1),
              }
            : { y: 30, opacity: 0 }
        }
        transition={{ delay: CARD_B_DELAY_S, duration: 0.7 }}
      >
        <GlowCard className="rounded-card">
          <span className="text-xl" aria-hidden="true">
            🏆
          </span>
          <p className="mt-1 text-xs font-semibold text-white">Top Rated Agency</p>
          <p className="mt-2 font-display text-[32px] font-bold text-vx-sky">4.9 / 5.0</p>
          <div className="mt-1 flex gap-0.5">
            {HERO_STAR_IDS.map((id) => (
              <Star key={id} size={14} className="fill-vx-gold stroke-vx-gold" />
            ))}
          </div>
          <p className="mt-2 text-[11px] text-[#94A3B8]">Based on 340+ Reviews</p>
        </GlowCard>
      </m.div>

      <m.div
        ref={cardRef as React.RefObject<HTMLDivElement>}
        className="glass-dark absolute bottom-16 left-[52%] z-10 hidden w-64 rounded-card p-5 lg:left-[55%] lg:block"
        initial={prefersReduced ? false : { y: 30, opacity: 0 }}
        animate={
          playIntro
            ? {
                y: 0,
                opacity: 1,
                ...floatTransition(HERO_FLOAT_DURATION_C_S, 2),
              }
            : { y: 30, opacity: 0 }
        }
        transition={{ delay: CARD_C_DELAY_S, duration: 0.7 }}
      >
        <GlowCard className="rounded-card">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#94A3B8]">
            Roles Filled This Month
          </p>
          <p className="mt-1 font-display text-[42px] font-bold text-white">
            <AnimatedCounter end={328} duration={2.5} active={cardInView} />
          </p>
          <div className="mt-3 flex h-8 items-end gap-1">
            {BAR_CHART_HEIGHTS.map((bar) => (
              <div
                key={bar.id}
                className="w-2 rounded-sm bg-gradient-to-t from-vx-blue to-vx-sky"
                style={{ height: `${bar.height}%` }}
              />
            ))}
          </div>
          <p className="mt-2 flex items-center gap-1 text-[11px] text-vx-green">
            <TrendingUp size={12} />
            +12% vs last month
          </p>
        </GlowCard>
      </m.div>

      <div
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2.5 opacity-50 sm:flex"
        aria-hidden="true"
      >
        <span className="font-body text-[9px] font-semibold tracking-[0.2em] text-white/80">
          SCROLL
        </span>
        <div className="relative flex h-11 w-6 items-start justify-center rounded-full border border-white/25 pt-2">
          <m.span
            className="h-2 w-1 rounded-full bg-white"
            animate={
              prefersReduced || !splashReady
                ? undefined
                : { y: [0, 14, 0], opacity: [1, 0.4, 1] }
            }
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </section>
  )
}

'use client'

import { useCallback, useEffect, useRef } from 'react'

import Image from 'next/image'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import { INDUSTRY_CARDS } from '@/constants/sections/industries'

const AUTO_SCROLL_SPEED = 30
const CARD_GAP_PX = 24
const MANUAL_SLIDE_MS = 480

type ManualSlide = {
  startTime: number
  duration: number
  delta: number
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export default function IndustriesSection(): React.ReactNode {
  return (
    <section className="section-vx bg-white">
      <div className="container-vx mb-12 text-center">
        <span className="section-label">INDUSTRIES</span>
        <h2 className="heading-h2 mt-4 text-vx-navy">Recruiters who know your field</h2>
        <p className="mx-auto mt-4 max-w-xl font-body text-base leading-relaxed text-vx-muted sm:whitespace-nowrap sm:text-lg">
          Your recruiter has hired in your space before. That saves you weeks of
          explaining the basics.
        </p>
      </div>

      <IndustriesCarousel />
    </section>
  )
}

function IndustriesCarousel(): React.ReactNode {
  const trackRef = useRef<HTMLDivElement>(null)
  const autoOffsetRef = useRef(0)
  const manualSlideRef = useRef<ManualSlide | null>(null)
  const pausedRef = useRef(false)
  const loopWidthRef = useRef(0)
  const rafRef = useRef(0)

  const applyTransform = useCallback((offset: number): void => {
    const track = trackRef.current
    if (!track) return
    track.style.transform = `translate3d(${offset}px, 0, 0)`
  }, [])

  const normalizeOffset = useCallback((offset: number): number => {
    const loopWidth = loopWidthRef.current
    if (loopWidth <= 0) return offset

    let next = offset
    while (next <= -loopWidth) {
      next += loopWidth
    }
    while (next > 0) {
      next -= loopWidth
    }
    return next
  }, [])

  const getScrollStep = useCallback((): number => {
    const track = trackRef.current
    if (!track) return 324

    const card = track.querySelector<HTMLElement>('[data-industry-card]')
    return card ? card.offsetWidth + CARD_GAP_PX : 324
  }, [])

  const commitManualSlide = useCallback(
    (now: number): number => {
      const slide = manualSlideRef.current
      if (!slide) return 0

      const progress = Math.min((now - slide.startTime) / slide.duration, 1)
      const eased = easeOutCubic(progress)

      if (progress >= 1) {
        autoOffsetRef.current = normalizeOffset(autoOffsetRef.current + slide.delta)
        manualSlideRef.current = null
        return 0
      }

      return slide.delta * eased
    },
    [normalizeOffset]
  )

  const scrollByDirection = useCallback(
    (direction: 'left' | 'right'): void => {
      const step = getScrollStep()
      const delta = direction === 'left' ? step : -step
      const now = performance.now()

      if (manualSlideRef.current) {
        const { startTime, duration, delta: activeDelta } = manualSlideRef.current
        const progress = Math.min((now - startTime) / duration, 1)
        autoOffsetRef.current = normalizeOffset(
          autoOffsetRef.current + activeDelta * easeOutCubic(progress)
        )
      }

      manualSlideRef.current = {
        startTime: now,
        duration: MANUAL_SLIDE_MS,
        delta,
      }
    },
    [getScrollStep, normalizeOffset]
  )

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const measureLoop = (): void => {
      loopWidthRef.current = track.scrollWidth / 2
      autoOffsetRef.current = normalizeOffset(autoOffsetRef.current)
    }

    measureLoop()

    const resizeObserver = new ResizeObserver(measureLoop)
    resizeObserver.observe(track)

    let lastTime = performance.now()

    const tick = (now: number): void => {
      const dt = Math.min(now - lastTime, 50) / 1000
      lastTime = now

      if (!pausedRef.current && loopWidthRef.current > 0) {
        autoOffsetRef.current = normalizeOffset(
          autoOffsetRef.current - AUTO_SCROLL_SPEED * dt
        )
      }

      const manualOffset = commitManualSlide(now)
      applyTransform(autoOffsetRef.current + manualOffset)

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      resizeObserver.disconnect()
    }
  }, [applyTransform, commitManualSlide, normalizeOffset])

  return (
    <div>
      <div
        className="overflow-hidden"
        onMouseEnter={() => {
          pausedRef.current = true
        }}
        onMouseLeave={() => {
          pausedRef.current = false
        }}
      >
        <div ref={trackRef} className="flex w-max will-change-transform">
          {INDUSTRY_CARDS.map((card) => (
            <div key={card.title} className="mx-3 shrink-0">
              <IndustryCard card={card} />
            </div>
          ))}
          {INDUSTRY_CARDS.map((card) => (
            <div
              key={`${card.title}-repeat`}
              className="mx-3 shrink-0"
              aria-hidden="true"
            >
              <IndustryCard card={card} />
            </div>
          ))}
        </div>
      </div>

      <nav
        className="container-vx mt-8 flex justify-center gap-3"
        aria-label="Industries carousel"
      >
        <CarouselButton
          direction="left"
          label="Previous industry"
          onClick={() => scrollByDirection('left')}
        />
        <CarouselButton
          direction="right"
          label="Next industry"
          onClick={() => scrollByDirection('right')}
        />
      </nav>
    </div>
  )
}

function CarouselButton({
  direction,
  label,
  onClick,
}: {
  direction: 'left' | 'right'
  label: string
  onClick: () => void
}): React.ReactNode {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-btn border border-vx-border bg-white text-vx-body transition-all duration-200 hover:border-vx-blue hover:text-vx-blue active:scale-95"
    >
      <Icon size={18} aria-hidden />
    </button>
  )
}

function IndustryCard({
  card,
}: {
  card: (typeof INDUSTRY_CARDS)[number]
}): React.ReactNode {
  return (
    <article
      data-industry-card
      className="group relative h-[280px] w-[220px] shrink-0 cursor-pointer overflow-hidden rounded-card-lg sm:h-[340px] sm:w-[260px] lg:h-[400px] lg:w-[300px]"
    >
      <Image
        src={card.image}
        alt={card.alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 640px) 220px, (max-width: 1024px) 260px, 300px"
        loading="lazy"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(6,14,31,0.92) 0%, rgba(6,14,31,0.15) 65%)',
        }}
      />
      <div className="absolute inset-0 rounded-card-lg opacity-0 ring-2 ring-vx-blue transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-7">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
          {card.number}
        </span>
        <h3 className="mt-2 font-display text-lg font-bold text-white transition-transform duration-300 group-hover:-translate-y-1 sm:text-xl">
          {card.title}
        </h3>
        <p className="mt-2 text-[13px] font-medium text-white/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Explore Roles →
        </p>
      </div>
    </article>
  )
}

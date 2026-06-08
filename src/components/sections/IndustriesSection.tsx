'use client'

import { useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { getLayoutAlignedScrollDistance, NAVBAR_HEIGHT_PX } from '@/constants/layout'
import { INDUSTRY_CARDS } from '@/constants/sections/industries'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export default function IndustriesSection(): React.ReactNode {
  const triggerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const prefersReduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!isDesktop || prefersReduced) return

    gsap.registerPlugin(ScrollTrigger)
    const trigger = triggerRef.current
    const track = trackRef.current
    if (!trigger || !track) return

    const measureScrollDistance = (): number =>
      getLayoutAlignedScrollDistance(track.scrollWidth, window.innerWidth)

    const animation = gsap.to(track, {
      x: () => -measureScrollDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: `top top+=${NAVBAR_HEIGHT_PX}`,
        pin: true,
        scrub: 1,
        end: () => `+=${measureScrollDistance()}`,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setProgress(self.progress)
          if (progressRef.current) {
            progressRef.current.style.width = `${self.progress * 100}%`
          }
        },
      },
    })

    const handleResize = (): void => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      animation.scrollTrigger?.kill()
      animation.kill()
    }
  }, [isDesktop, prefersReduced])

  const industriesHeader = (
    <div className="container-vx mb-12 text-center">
      <span className="section-label">INDUSTRIES</span>
      <h2 className="heading-h2 mt-4 text-vx-navy">Recruiters who know your field</h2>
      <p className="mx-auto mt-4 max-w-xl font-body text-base leading-relaxed text-vx-muted sm:whitespace-nowrap sm:text-lg">
        Your recruiter has hired in your space before. That saves you weeks of explaining
        the basics.
      </p>
    </div>
  )

  return (
    <section className="bg-white">
      {isDesktop ? (
        <>
          {/* Section spacing: scrolls away before the pin + horizontal drag begins */}
          <div className="pt-[72px] md:pt-[96px] lg:pt-[120px]" aria-hidden="true" />

          <div ref={triggerRef} className="pb-[72px] md:pb-[96px] lg:pb-[120px]">
            {industriesHeader}

            <div className="overflow-hidden">
              <div ref={trackRef} className="track-align-layout flex w-max gap-6">
                {INDUSTRY_CARDS.map((card) => (
                  <IndustryCard key={card.title} card={card} />
                ))}
              </div>
            </div>

            <div className="container-vx mt-8 flex items-center gap-6">
              <p className="shrink-0 text-xs text-vx-muted">Drag to explore →</p>
              <div className="h-1 min-w-0 flex-1 rounded-full bg-vx-border">
                <div
                  ref={progressRef}
                  className="h-full rounded-full bg-vx-blue transition-[width] duration-100"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="section-vx">
          {industriesHeader}

          <div className="container-vx grid grid-cols-2 gap-4 sm:grid-cols-3">
            {INDUSTRY_CARDS.map((card) => (
              <IndustryCard key={card.title} card={card} staticLayout />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

function IndustryCard({
  card,
  staticLayout = false,
}: {
  card: (typeof INDUSTRY_CARDS)[number]
  staticLayout?: boolean
}): React.ReactNode {
  return (
    <article
      className={`group relative cursor-pointer overflow-hidden rounded-card-lg ${staticLayout ? 'h-[220px] sm:h-[260px]' : 'h-[400px] w-[300px] flex-shrink-0'}`}
    >
      <Image
        src={card.image}
        alt={card.alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes={staticLayout ? '(max-width: 640px) 100vw, 50vw' : '300px'}
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

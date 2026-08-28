'use client'

import { useEffect, useRef } from 'react'

import Image from 'next/image'

import { m } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import MagneticButton from '@/components/ui/MagneticButton'
import SplitText from '@/components/ui/SplitText'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const PARALLAX_Y = -60
const DECORATIVE_CIRCLES = [
  { size: 120, top: '10%', left: '15%' },
  { size: 80, top: '60%', left: '70%' },
  { size: 200, top: '30%', left: '85%' },
  { size: 100, top: '75%', left: '20%' },
  { size: 160, top: '5%', left: '55%' },
  { size: 90, top: '45%', left: '40%' },
  { size: 140, top: '80%', left: '60%' },
  { size: 70, top: '20%', left: '30%' },
] as const

export default function DualCTASection(): React.ReactNode {
  const leftRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const prefersReduced = usePrefersReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  useEffect(() => {
    if (prefersReduced) return
    gsap.registerPlugin(ScrollTrigger)

    const image = imageRef.current
    const left = leftRef.current
    const triggers: ScrollTrigger[] = []

    if (image && left) {
      triggers.push(
        ScrollTrigger.create({
          trigger: left,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
          animation: gsap.to(image, { y: PARALLAX_Y }),
        })
      )
    }

    return () => triggers.forEach((t) => t.kill())
  }, [prefersReduced])

  return (
    <section className="flex min-h-screen flex-col lg:flex-row">
      <m.div
        ref={leftRef}
        className="dual-cta-left relative min-h-[60vh] w-full overflow-hidden py-16 lg:h-screen lg:w-1/2 lg:py-0"
        initial={
          prefersReduced ? false : { opacity: 0, ...(isDesktop ? { x: -60 } : { y: 40 }) }
        }
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.75 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div ref={imageRef} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80&fit=crop"
            alt="Business leader meeting with hiring team, employer staffing solutions"
            fill
            className="object-cover"
            sizes="50vw"
            loading="lazy"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(6,14,31,0.94), rgba(13,36,86,0.87))',
          }}
        />
        <div className="relative z-10 flex h-full min-h-[60vh] flex-col justify-center px-8 lg:min-h-screen lg:pl-16 lg:pr-12 xl:pl-24">
          <span className="inline-flex w-fit rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white">
            FOR EMPLOYERS
          </span>
          <h2
            className="mt-5 font-display font-bold leading-tight text-white"
            style={{ fontSize: 'clamp(28px, 5vw, 44px)' }}
          >
            <SplitText text="Ready to build your next great team?" />
          </h2>
          <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-[#94A3B8] sm:text-base lg:text-[17px]">
            Tell us what you need. You&apos;ll get candidates we&apos;ve already spoken
            with, not a spreadsheet of maybes. People we&apos;d put forward with our name
            on it.
          </p>
          <MagneticButton
            href="/contact"
            className="mt-8 rounded-btn bg-white px-8 py-4 font-semibold text-vx-navy transition-colors duration-300 hover:bg-vx-blue hover:text-white"
          >
            Find Us Talent →
          </MagneticButton>
          <div className="mt-6 flex flex-wrap gap-2">
            {['✓ 72hr Shortlist', '✓ 90-Day Guarantee'].map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </m.div>

      <m.div
        className="dual-cta-right relative min-h-[60vh] w-full overflow-hidden py-16 lg:h-screen lg:w-1/2 lg:py-0"
        initial={
          prefersReduced ? false : { opacity: 0, ...(isDesktop ? { x: 60 } : { y: 40 }) }
        }
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.75 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(150deg, #1D4ED8 0%, #1E40AF 50%, #1E3A8A 100%)',
          }}
        />
        {DECORATIVE_CIRCLES.map((circle) => (
          <span
            key={`${circle.top}-${circle.left}-${circle.size}`}
            className="absolute rounded-full bg-white/[0.04]"
            style={{
              width: circle.size,
              height: circle.size,
              top: circle.top,
              left: circle.left,
            }}
            aria-hidden="true"
          />
        ))}
        <div className="relative z-10 flex h-full min-h-[60vh] flex-col justify-center px-8 lg:min-h-screen lg:pl-12 lg:pr-16 xl:pr-24">
          <span className="inline-flex w-fit rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white">
            FOR CANDIDATES
          </span>
          <h2
            className="mt-5 font-display font-bold text-white"
            style={{ fontSize: 'clamp(28px, 5vw, 44px)' }}
          >
            <SplitText text="Your next opportunity starts here." />
          </h2>
          <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-white/70 sm:text-base lg:text-[17px]">
            Same standard as our client work: we listen first. Tell us where you want to
            go. We&apos;ll point you at companies that fit, not just whoever has a req
            open this week.
          </p>
          <MagneticButton
            href="/job-seekers"
            className="mt-8 rounded-btn bg-white px-8 py-4 font-semibold text-vx-blue transition-colors duration-300 hover:bg-vx-navy hover:text-white"
          >
            Browse Open Roles →
          </MagneticButton>
          <div className="mt-6 flex flex-wrap gap-2">
            {['🚀 320 Roles This Month', '⚡ 72hr Response', '🌐 4 Countries'].map(
              (pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white"
                >
                  {pill}
                </span>
              )
            )}
          </div>
        </div>
      </m.div>
    </section>
  )
}

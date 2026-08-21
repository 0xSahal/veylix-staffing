'use client'

import { useEffect, useRef } from 'react'

import { m } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import MagneticButton from '@/components/ui/MagneticButton'
import { CONTACT_PHONE_ENABLED, siteConfig } from '@/config/site'
import { PROCESS_STEPS, type ProcessStep } from '@/constants/sections/process'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/utils'

import type { LucideIcon } from 'lucide-react'

const STAGGER_S = 0.12
const ICON_SIZE_LG = 52
const ICON_SIZE_XL = 56

function ProcessIconNode({
  icon: Icon,
  size,
}: {
  icon: LucideIcon
  size: number
}): React.ReactNode {
  return (
    <div
      className="relative z-10 flex shrink-0 items-center justify-center rounded-full border-2 border-vx-blue bg-vx-blue shadow-glow-blue ring-[5px] ring-vx-navy xl:ring-[6px]"
      style={{ width: size, height: size }}
    >
      <Icon
        size={size === ICON_SIZE_LG ? 20 : 22}
        className="text-white"
        strokeWidth={2}
        aria-hidden="true"
      />
    </div>
  )
}

function ProcessTimelineLine({
  lineRef,
  className,
}: {
  lineRef?: React.Ref<SVGLineElement>
  className?: string
}): React.ReactNode {
  return (
    <svg
      className={cn(
        'pointer-events-none absolute left-[8%] right-[8%] top-1/2 h-[2px] w-[84%] -translate-y-1/2',
        className
      )}
      viewBox="0 0 100 2"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="1"
        x2="100"
        y2="1"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        vectorEffect="non-scaling-stroke"
      />
      <line
        ref={lineRef}
        x1="0"
        y1="1"
        x2="100"
        y2="1"
        stroke="#2563EB"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

function ProcessStepCopy({
  step,
  compact = false,
}: {
  step: ProcessStep
  compact?: boolean
}): React.ReactNode {
  if (compact) {
    return (
      <div className="flex h-full flex-col items-center px-1.5 lg:px-2">
        <div className="flex min-h-[3.25rem] w-full items-center justify-center xl:min-h-[3.5rem]">
          <h3 className="text-balance font-display text-[15px] font-semibold leading-snug text-white lg:text-base xl:text-lg xl:leading-tight">
            {step.title}
          </h3>
        </div>
        <p className="mt-2.5 text-[11px] leading-snug text-[#94A3B8] xl:mt-3 xl:text-xs xl:leading-relaxed">
          {step.body}
        </p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col items-center px-3">
      <div className="flex min-h-[2.75rem] w-full items-center justify-center">
        <h3 className="max-w-[14rem] text-balance font-display text-lg font-semibold leading-snug text-white sm:max-w-[16rem] sm:text-xl">
          {step.title}
        </h3>
      </div>
      <p className="mt-4 max-w-[18rem] text-sm leading-relaxed text-[#94A3B8] sm:max-w-sm">
        {step.body}
      </p>
    </div>
  )
}

export default function ProcessSection(): React.ReactNode {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<SVGLineElement | null>(null)
  const prefersReduced = usePrefersReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  useEffect(() => {
    if (prefersReduced || !isDesktop) return
    gsap.registerPlugin(ScrollTrigger)

    const line = lineRef.current
    const section = sectionRef.current
    if (!line || !section) return

    let trigger: ScrollTrigger | undefined

    const frame = requestAnimationFrame(() => {
      try {
        const length = line.getTotalLength()
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })

        trigger = ScrollTrigger.create({
          trigger: section,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 2,
          animation: gsap.to(line, { strokeDashoffset: 0 }),
        })
      } catch {
        // Line is not rendered yet (e.g. hidden at current breakpoint)
      }
    })

    return () => {
      cancelAnimationFrame(frame)
      trigger?.kill()
    }
  }, [prefersReduced, isDesktop])

  return (
    <section ref={sectionRef} className="bg-vx-navy py-16 md:py-20 lg:py-[72px] xl:py-20">
      <div className="container-vx mb-8 text-center lg:mb-10">
        <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-vx-sky">
          OUR PROCESS
        </span>
        <h2 className="heading-h2 mt-3 text-white">
          Your career.
          <br />
          Fully supported.
        </h2>
        <p className="mx-auto mt-3 max-w-xl font-body text-base leading-relaxed text-[#94A3B8] lg:text-[17px]">
          Six steps. One dedicated coach. Real support from resume to offer while most
          candidates are still going it alone.
        </p>
      </div>

      <div className="container-vx">
        {/* Desktop: single-row timeline — all six steps in one view */}
        <div className="hidden lg:block">
          <div className="mb-3 grid grid-cols-6 gap-2 xl:gap-3">
            {PROCESS_STEPS.map((step, index) => (
              <m.div
                key={`${step.number}-label`}
                className="flex justify-center"
                initial={prefersReduced ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * STAGGER_S, duration: 0.45 }}
              >
                <span
                  className="font-display text-[48px] font-bold leading-none text-white/[0.07] xl:text-[56px]"
                  aria-hidden="true"
                >
                  {step.number}
                </span>
              </m.div>
            ))}
          </div>

          <div className="relative mb-5 xl:mb-6" style={{ height: ICON_SIZE_LG }}>
            <ProcessTimelineLine lineRef={lineRef} />

            <div className="grid h-full grid-cols-6 gap-2 xl:gap-3">
              {PROCESS_STEPS.map((step, index) => (
                <m.div
                  key={`${step.number}-icon`}
                  className="flex items-center justify-center"
                  initial={prefersReduced ? false : { opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * STAGGER_S + 0.04, duration: 0.45 }}
                >
                  <ProcessIconNode icon={step.icon} size={ICON_SIZE_LG} />
                </m.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-6 items-start gap-2 xl:gap-3">
            {PROCESS_STEPS.map((step, index) => (
              <m.div
                key={`${step.number}-copy`}
                className="text-center"
                initial={prefersReduced ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * STAGGER_S + 0.08, duration: 0.5 }}
              >
                <ProcessStepCopy step={step} compact />
              </m.div>
            ))}
          </div>
        </div>

        {/* Mobile / tablet */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:hidden">
          {PROCESS_STEPS.map((step, index) => (
            <m.div
              key={step.number}
              className="relative flex flex-col items-center text-center"
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * STAGGER_S, duration: 0.5 }}
            >
              <span
                className="mb-3 font-display text-5xl font-bold leading-none text-white/[0.07] sm:text-6xl"
                aria-hidden="true"
              >
                {step.number}
              </span>
              <ProcessIconNode icon={step.icon} size={ICON_SIZE_XL} />
              <div className="mt-5 w-full max-w-sm">
                <ProcessStepCopy step={step} />
              </div>
            </m.div>
          ))}
        </div>
      </div>

      <div className="container-vx mt-10 text-center lg:mt-12">
        <MagneticButton href="/contact" className="btn-primary hover:shadow-glow-blue">
          Start the Process →
        </MagneticButton>
        {CONTACT_PHONE_ENABLED && (
          <p className="mt-3 text-[13px] text-white/40">
            or call us directly:{' '}
            <a
              href={`tel:${siteConfig.phone.replace(/\D/g, '')}`}
              className="text-white/60 transition-colors hover:text-white"
            >
              {siteConfig.phone}
            </a>
          </p>
        )}
      </div>
    </section>
  )
}

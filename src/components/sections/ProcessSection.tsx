'use client'

import { useEffect, useRef } from 'react'

import { m } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import MagneticButton from '@/components/ui/MagneticButton'
import { siteConfig } from '@/config/site'
import { PROCESS_STEPS, type ProcessStep } from '@/constants/sections/process'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/utils'

import type { LucideIcon } from 'lucide-react'

const STAGGER_S = 0.15
const ICON_SIZE_PX = 64
function ProcessIconNode({ icon: Icon }: { icon: LucideIcon }): React.ReactNode {
  return (
    <div
      className="relative z-10 flex shrink-0 items-center justify-center rounded-full border-2 border-vx-blue bg-vx-blue shadow-glow-blue ring-[6px] ring-vx-navy"
      style={{ width: ICON_SIZE_PX, height: ICON_SIZE_PX }}
    >
      <Icon size={24} className="text-white" strokeWidth={2} aria-hidden="true" />
    </div>
  )
}

function ProcessTimelineLine({
  lineRef,
  className,
}: {
  lineRef: React.RefObject<SVGLineElement | null>
  className?: string
}): React.ReactNode {
  return (
    <svg
      className={cn(
        'pointer-events-none absolute left-[10%] right-[10%] top-1/2 h-[2px] w-[80%] -translate-y-1/2',
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

function ProcessStepCopy({ step }: { step: ProcessStep }): React.ReactNode {
  return (
    <>
      <h3 className="font-display text-xl font-semibold text-white sm:text-[22px]">
        {step.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">{step.body}</p>
    </>
  )
}

export default function ProcessSection(): React.ReactNode {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<SVGLineElement>(null)
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
    <section ref={sectionRef} className="section-vx bg-vx-navy">
      <div className="container-vx mb-16 text-center">
        <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-vx-sky">
          OUR PROCESS
        </span>
        <h2 className="heading-h2 mt-4 text-white">
          We move fast.
          <br />
          We get it right.
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-body text-lg leading-relaxed text-[#94A3B8]">
          Five steps. One point of contact. A shortlist in your inbox while most agencies
          are still asking for the job description again.
        </p>
      </div>

      <div className="container-vx">
        {/* Desktop: numbers → icons on line → copy */}
        <div className="hidden lg:block">
          <div className="mb-8 grid grid-cols-5 gap-6">
            {PROCESS_STEPS.map((step, index) => (
              <m.div
                key={`${step.number}-label`}
                className="flex justify-center"
                initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * STAGGER_S, duration: 0.5 }}
              >
                <span
                  className="font-display text-[72px] font-extrabold leading-none text-white/[0.07]"
                  aria-hidden="true"
                >
                  {step.number}
                </span>
              </m.div>
            ))}
          </div>

          <div className="relative mb-10" style={{ height: ICON_SIZE_PX }}>
            <ProcessTimelineLine lineRef={lineRef} />

            <div className="grid h-full grid-cols-5 gap-6">
              {PROCESS_STEPS.map((step, index) => (
                <m.div
                  key={`${step.number}-icon`}
                  className="flex items-center justify-center"
                  initial={prefersReduced ? false : { opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * STAGGER_S + 0.05, duration: 0.5 }}
                >
                  <ProcessIconNode icon={step.icon} />
                </m.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-5 gap-6">
            {PROCESS_STEPS.map((step, index) => (
              <m.div
                key={`${step.number}-copy`}
                className="text-center"
                initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * STAGGER_S + 0.1, duration: 0.6 }}
              >
                <ProcessStepCopy step={step} />
              </m.div>
            ))}
          </div>
        </div>

        {/* Mobile / tablet */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:hidden">
          {PROCESS_STEPS.map((step, index) => (
            <m.div
              key={step.number}
              className="relative flex flex-col items-center text-center"
              initial={prefersReduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * STAGGER_S, duration: 0.6 }}
            >
              <span
                className="mb-4 font-display text-5xl font-extrabold leading-none text-white/[0.07] sm:text-6xl"
                aria-hidden="true"
              >
                {step.number}
              </span>
              <ProcessIconNode icon={step.icon} />
              <div className="mt-6 max-w-sm">
                <ProcessStepCopy step={step} />
              </div>
            </m.div>
          ))}
        </div>
      </div>

      <div className="container-vx mt-16 text-center">
        <MagneticButton href="/contact" className="btn-primary hover:shadow-glow-blue">
          Start the Process →
        </MagneticButton>
        <p className="mt-4 text-[13px] text-white/40">
          or call us directly:{' '}
          <a
            href={`tel:${siteConfig.phone.replace(/\D/g, '')}`}
            className="text-white/60 transition-colors hover:text-white"
          >
            {siteConfig.phone}
          </a>
        </p>
      </div>
    </section>
  )
}

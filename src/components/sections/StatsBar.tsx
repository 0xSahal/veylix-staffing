'use client'

import { m } from 'framer-motion'

import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { STATS } from '@/constants/sections/stats'
import { useInViewAnimation } from '@/hooks/useInViewAnimation'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const STAGGER_S = 0.1

export default function StatsBar(): React.ReactNode {
  const { ref, isInView } = useInViewAnimation({ threshold: 0.5, once: true })
  const prefersReduced = usePrefersReducedMotion()

  return (
    <section className="border-y border-vx-border bg-white py-16">
      <div className="container-vx">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-2 gap-px overflow-hidden bg-vx-border md:grid-cols-3 lg:grid-cols-5"
        >
          {STATS.map((stat, index) => (
            <m.div
              key={stat.label}
              className="flex min-w-0 flex-col items-center justify-center overflow-hidden bg-white p-4 text-center sm:p-6"
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * STAGGER_S, duration: 0.6 }}
            >
              <m.div
                className="mx-auto mb-4 h-[3px] w-8 origin-left bg-vx-blue"
                initial={prefersReduced ? false : { scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: index * STAGGER_S + 0.1, duration: 0.5 }}
              />
              <p className="font-display text-3xl font-extrabold text-vx-navy sm:whitespace-nowrap sm:text-5xl">
                <AnimatedCounter
                  end={stat.end}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  active={isInView}
                />
              </p>
              <p className="mt-1 font-body text-[13px] font-medium text-vx-muted">
                {stat.label}
              </p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}

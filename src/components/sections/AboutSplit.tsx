'use client'

import { useEffect, useRef } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { m } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Globe2, Play, ShieldCheck, Target, Zap } from 'lucide-react'

import SplitText from '@/components/ui/SplitText'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const FEATURES = [
  {
    icon: Zap,
    title: 'Placed in 72 Hours',
    desc: 'First shortlist in your inbox within three business days.',
  },
  {
    icon: Target,
    title: 'Culture-First Matching',
    desc: 'Skills get them in. Values make them stay.',
  },
  {
    icon: ShieldCheck,
    title: '90-Day Guarantee',
    desc: "If it doesn't work out, we replace, at no extra cost.",
  },
  {
    icon: Globe2,
    title: '100,000+ Network',
    desc: 'Vetted talent across North America, UK, and Australia.',
  },
] as const

const PARALLAX_MAIN_Y = -40
const PARALLAX_SECONDARY_Y = -20

export default function AboutSplit(): React.ReactNode {
  const sectionRef = useRef<HTMLElement>(null)
  const mainImageRef = useRef<HTMLDivElement>(null)
  const secondaryImageRef = useRef<HTMLDivElement>(null)
  const prefersReduced = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReduced) return
    gsap.registerPlugin(ScrollTrigger)

    const triggers: ScrollTrigger[] = []

    if (mainImageRef.current && sectionRef.current) {
      triggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
          animation: gsap.to(mainImageRef.current, { y: PARALLAX_MAIN_Y }),
        })
      )
    }

    if (secondaryImageRef.current && sectionRef.current) {
      triggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
          animation: gsap.to(secondaryImageRef.current, { y: PARALLAX_SECONDARY_Y }),
        })
      )
    }

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [prefersReduced])

  return (
    <section ref={sectionRef} className="section-vx bg-white">
      <div className="container-vx grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="relative h-[300px] sm:h-[400px] lg:h-[560px]">
          <div
            ref={mainImageRef}
            className="absolute right-0 top-0 h-full w-11/12 overflow-hidden rounded-card-lg"
            data-cursor="view"
          >
            <Image
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&fit=crop"
              alt="Veylix team collaborating with a client on talent strategy"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div
            ref={secondaryImageRef}
            className="absolute bottom-0 left-0 h-[200px] w-7/12 overflow-hidden rounded-card shadow-float ring-4 ring-white lg:h-[240px]"
            data-cursor="view"
          >
            <Image
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&q=80&fit=crop"
              alt="Professional team interview and candidate screening session"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 60vw, 30vw"
            />
          </div>
          <m.div
            className="absolute -right-5 bottom-28 hidden w-44 rounded-card border border-vx-border bg-white p-5 shadow-float sm:block"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <p className="font-display text-[38px] font-extrabold text-vx-blue">98%</p>
            <p className="mt-1 text-xs text-vx-muted">Client Retention</p>
            <svg
              className="absolute -right-2 -top-2"
              width="60"
              height="60"
              viewBox="0 0 60 60"
              aria-hidden="true"
            >
              <circle
                cx="30"
                cy="30"
                r="26"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="3"
                strokeDasharray="122 163"
                strokeLinecap="round"
                transform="rotate(-90 30 30)"
              />
            </svg>
          </m.div>
          <m.div
            className="absolute -left-4 top-6 hidden w-40 rounded-card bg-vx-navy p-4 shadow-float sm:block"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <p className="font-display text-[34px] font-extrabold text-vx-sky">12+</p>
            <p className="mt-1 text-[11px] text-white/60">Years in Staffing</p>
          </m.div>
        </div>

        <div>
          <span className="section-label">ABOUT VEYLIX</span>
          <h2 className="heading-h2 mt-4 max-w-lg text-vx-navy">
            <SplitText text="We don't fill roles. We find the people that make them matter." />
          </h2>
          <p className="mt-5 max-w-lg font-body text-base leading-relaxed text-vx-muted">
            A lot of agencies dump CVs and move on. Before we source anyone, we sit with
            your team and nail what a good hire looks like in your context: skills, pace,
            culture, the lot. That&apos;s why people stay.
          </p>
          <p className="mt-3 max-w-lg font-body text-base leading-relaxed text-vx-muted">
            100,000+ vetted professionals across North America, the UK, and Australia.
            Size helps. Knowing who&apos;s actually available and interested matters more.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-vx-blue-lt">
                  <Icon size={18} className="text-vx-blue" />
                </span>
                <div>
                  <p className="font-body text-[15px] font-semibold text-vx-body">
                    {title}
                  </p>
                  <p className="text-[13px] leading-relaxed text-vx-muted">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href="/about"
              className="group inline-flex items-center gap-1.5 font-body text-[15px] font-semibold text-vx-blue"
            >
              Our full story
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <button
              type="button"
              className="btn-ghost inline-flex items-center gap-2 text-[15px]"
            >
              <Play size={14} />
              Watch 90s Overview
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

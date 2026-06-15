'use client'

import { useEffect, useRef, useState, useTransition } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Check, Minus, Plus } from 'lucide-react'

import { sidebarReachOut } from '@/app/actions/forms'
import { Container } from '@/components/common/Container'
import HeroImageOverlay from '@/components/layout/HeroImageOverlay'
import { DynamicIcon } from '@/components/solutions/DynamicIcon'
import { routes } from '@/config/routes'
import { allSolutions, type Solution } from '@/data/solutions'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { formFieldString } from '@/lib/form'
import { heroImageClassName } from '@/lib/hero-image-position'
import { cn } from '@/lib/utils'

const NAVY = '#0F2246'
const BLUE = '#1A6EDC'
const SCROLL_START = 'top 82%'

type SolutionProp = { solution: Solution }

function reconcileScrollAnimations(): void {
  ScrollTrigger.refresh()
  ScrollTrigger.getAll().forEach((trigger) => {
    const animation = trigger.animation
    if (!animation || animation.progress() >= 1) return

    const el = trigger.trigger
    const rect = el && 'getBoundingClientRect' in el ? el.getBoundingClientRect() : null
    const isInView = rect
      ? rect.top < window.innerHeight * 0.92 && rect.bottom > 0
      : false

    if (trigger.progress > 0 || trigger.isActive || isInView) {
      animation.progress(1)
    }
  })
}

function animateInView(
  elements: gsap.TweenTarget,
  options: {
    trigger: Element | null
    start?: string
    y?: number
    stagger?: number
    duration?: number
  }
): void {
  if (!options.trigger || !gsap.utils.toArray(elements).length) return

  gsap.from(elements, {
    y: options.y ?? 20,
    duration: options.duration ?? 0.6,
    stagger: options.stagger ?? 0.1,
    ease: 'power2.out',
    immediateRender: false,
    scrollTrigger: {
      trigger: options.trigger,
      start: options.start ?? SCROLL_START,
      once: true,
    },
  })
}

export function SolutionPageLayout({ solution }: SolutionProp): React.ReactNode {
  const layoutRef = useRef<HTMLDivElement>(null)
  const prefersReduced = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReduced || !layoutRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const root = layoutRef.current
      if (!root) return

      gsap.utils
        .toArray<Element>(
          '.solution-heading, .solution-stat, .solution-role-card, .solution-process-step, .solution-engagement-card, .solution-advantage-card'
        )
        .forEach((el) => {
          gsap.set(el, { opacity: 1, clearProps: 'opacity' })
        })

      gsap.utils.toArray<Element>('.solution-heading').forEach((el) => {
        gsap.from(el, {
          y: 24,
          duration: 0.8,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: { trigger: el, start: SCROLL_START, once: true },
        })
      })

      animateInView(root.querySelectorAll('.solution-stat'), {
        trigger: root.querySelector('.solution-stats-row'),
        y: 16,
        stagger: 0.12,
      })

      animateInView(root.querySelectorAll('.solution-role-card'), {
        trigger: root.querySelector('.solution-roles-grid'),
        y: 20,
        stagger: 0.1,
        start: 'top 80%',
      })

      animateInView(root.querySelectorAll('.solution-process-step'), {
        trigger: root.querySelector('.solution-steps-grid'),
        y: 24,
        stagger: 0.15,
        duration: 0.7,
        start: 'top 80%',
      })

      animateInView(root.querySelectorAll('.solution-engagement-card'), {
        trigger: root.querySelector('.solution-engagement-grid'),
        y: 20,
        stagger: 0.1,
        start: 'top 80%',
      })

      animateInView(root.querySelectorAll('.solution-advantage-card'), {
        trigger: root.querySelector('.solution-advantages-grid'),
        y: 18,
        stagger: 0.08,
        start: 'top 80%',
      })
    }, layoutRef)

    const refreshFrame = window.requestAnimationFrame(reconcileScrollAnimations)
    const refreshTimeouts = [
      window.setTimeout(reconcileScrollAnimations, 300),
      window.setTimeout(reconcileScrollAnimations, 800),
      window.setTimeout(reconcileScrollAnimations, 2400),
    ]
    window.addEventListener('load', reconcileScrollAnimations)

    return () => {
      window.cancelAnimationFrame(refreshFrame)
      refreshTimeouts.forEach((id) => window.clearTimeout(id))
      window.removeEventListener('load', reconcileScrollAnimations)
      ctx.revert()
    }
  }, [prefersReduced])

  return (
    <main ref={layoutRef}>
      <SolutionHero solution={solution} />
      <SolutionOverview solution={solution} />
      <SolutionRoles solution={solution} />
      <SolutionProcess solution={solution} />
      <SolutionEngagementModels solution={solution} />
      <SolutionAdvantages solution={solution} />
      <SolutionFAQ solution={solution} />
      <SolutionCTA solution={solution} />
    </main>
  )
}

function SolutionHero({ solution }: SolutionProp): React.ReactNode {
  return (
    <section className="relative flex min-h-[300px] items-center justify-center overflow-hidden sm:min-h-[360px]">
      <div className="absolute inset-0 z-0">
        <Image
          src={solution.heroImage}
          alt=""
          fill
          priority
          className={heroImageClassName(solution.heroImage)}
          sizes="100vw"
        />
        <HeroImageOverlay />
      </div>

      <Container className="relative z-10 py-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <nav
            aria-label="Breadcrumb"
            className="mb-7 flex flex-wrap items-center justify-center gap-2 font-body text-[13px] font-medium text-white/50"
          >
            <Link href={routes.home} className="transition-colors hover:text-white/80">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white/60">Solutions</span>
            <span className="text-white/30">/</span>
            <span className="text-white/80">{solution.title}</span>
          </nav>

          <p className="mb-5 font-body text-[11px] font-bold uppercase tracking-[0.2em] text-[#93C5FD]">
            Solutions
          </p>

          <h1 className="mb-4 font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
            {solution.title}
          </h1>

          <p className="max-w-md font-body text-base leading-relaxed text-white/70 md:text-lg">
            {solution.subtitle}
          </p>
        </div>
      </Container>
    </section>
  )
}

function SolutionOverview({ solution }: SolutionProp): React.ReactNode {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_320px]">
          <div className="solution-heading">
            <p className="mb-5 font-body text-[12px] font-bold uppercase tracking-[0.18em] text-[#1A6EDC]">
              {solution.navLabel}
            </p>

            <h2 className="mb-6 max-w-xl font-display text-3xl font-bold leading-tight text-[#0F2246] md:text-4xl">
              {solution.overviewHeading}
            </h2>

            <p className="mb-10 max-w-[65ch] font-body text-base leading-relaxed text-[#64748B] md:text-lg">
              {solution.overviewBody}
            </p>

            <div className="solution-stats-row grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-0">
              {solution.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={cn(
                    'solution-stat flex flex-col items-center px-4 py-6 text-center sm:px-6 sm:py-10',
                    i === 0 && 'sm:border-l-2 sm:border-[#1A6EDC]',
                    i < solution.stats.length - 1 && 'sm:border-r sm:border-[#E2E8F0]'
                  )}
                >
                  <span className="mb-2 font-display text-4xl font-bold leading-none text-[#0F2246] sm:text-5xl md:text-6xl">
                    {stat.number}
                  </span>
                  <span className="max-w-[120px] font-body text-xs font-medium leading-snug text-[#64748B] md:text-sm">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-card">
              <div className="border-b border-[#E2E8F0] px-6 py-4">
                <p className="font-body text-[11px] font-bold uppercase tracking-[0.16em] text-[#94A3B8]">
                  All Solutions
                </p>
              </div>
              <nav className="py-2">
                {allSolutions.map((s) => {
                  const isActive = s.slug === solution.slug
                  return (
                    <Link
                      key={s.slug}
                      href={s.href}
                      className={cn(
                        'block px-6 py-3 font-body text-sm transition-all duration-200',
                        isActive
                          ? 'border-l-2 border-[#1A6EDC] bg-[#EFF6FF] font-bold text-[#1A6EDC]'
                          : 'font-medium text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F2246]'
                      )}
                    >
                      {s.navLabel}
                    </Link>
                  )
                })}
              </nav>
            </div>

            <ReachOutForm solution={solution} />
          </div>
        </div>
      </Container>
    </section>
  )
}

function ReachOutForm({ solution }: SolutionProp): React.ReactNode {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await sidebarReachOut({
        name: formFieldString(fd, 'name'),
        email: formFieldString(fd, 'email'),
        interest: formFieldString(fd, 'interest'),
      })
      if (result.success) {
        setSent(true)
        setError(null)
      } else {
        setError(result.error ?? 'Please check your details.')
      }
    })
  }

  return (
    <div className="rounded-2xl bg-[#0F2246] p-6">
      <p className="mb-3 font-body text-[11px] font-bold uppercase tracking-[0.16em] text-[#93C5FD]">
        Get Started
      </p>
      <h3 className="mb-1.5 font-display text-base font-bold text-white">Reach Out</h3>
      <p className="mb-6 font-body text-sm leading-snug text-[#94A3B8]">
        Tell us what you need and we will respond within 24 hours.
      </p>

      {sent ? (
        <p className="font-body text-sm text-[#93C5FD]">
          Thanks. Your message is in and we will be in touch shortly.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="name"
            required
            placeholder="Your name"
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-body text-sm text-white outline-none transition-all duration-200 placeholder:text-white/40 focus:border-[#1A6EDC] focus:bg-white/15"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Work email"
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-body text-sm text-white outline-none transition-all duration-200 placeholder:text-white/40 focus:border-[#1A6EDC] focus:bg-white/15"
          />
          <select
            name="interest"
            defaultValue={solution.navLabel}
            className="w-full cursor-pointer rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-body text-sm text-white/80 outline-none transition-all duration-200 focus:border-[#1A6EDC]"
          >
            {allSolutions.map((s) => (
              <option key={s.slug} value={s.navLabel} className="text-[#0F2246]">
                {s.navLabel}
              </option>
            ))}
          </select>
          {error && <p className="font-body text-xs text-red-300">{error}</p>}
          <button
            type="submit"
            disabled={isPending}
            className="mt-1 w-full rounded-xl bg-[#1A6EDC] py-3 font-body text-sm font-bold text-white transition-all duration-200 hover:bg-[#1554b0] active:scale-[0.98] disabled:opacity-70"
          >
            {isPending ? 'Sending...' : 'Send Interest'}
          </button>
        </form>
      )}
    </div>
  )
}

function SolutionRoles({ solution }: SolutionProp): React.ReactNode {
  if (!solution.roleCategories.length) return null

  return (
    <section className="bg-[#F8FAFC] py-16 lg:py-24">
      <Container>
        <div className="solution-heading mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 font-body text-[12px] font-bold uppercase tracking-[0.18em] text-[#1A6EDC]">
              Talent We Place
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight text-[#0F2246] md:text-4xl">
              Roles We Fill
            </h2>
          </div>
          <p className="max-w-xs font-body text-sm leading-relaxed text-[#64748B] md:text-right md:text-base">
            Our recruiters specialize in these role families and maintain an active bench
            of screened candidates.
          </p>
        </div>

        <div className="solution-roles-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {solution.roleCategories.map((category) => (
            <div
              key={category.heading}
              className="solution-role-card group min-h-[260px] rounded-2xl border border-[#E2E8F0] bg-white p-8 transition-all duration-300 hover:border-[#BFDBFE] hover:shadow-lg hover:shadow-blue-50"
            >
              <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFF6FF] transition-colors group-hover:bg-[#DBEAFE]">
                <DynamicIcon name={category.icon} className="h-5 w-5 text-[#1A6EDC]" />
              </div>
              <h3 className="mb-5 font-display text-base font-bold text-[#0F2246]">
                {category.heading}
              </h3>
              <ul className="flex flex-col gap-3">
                {category.roles.map((role) => (
                  <li
                    key={role}
                    className="flex items-center gap-2.5 py-0.5 font-body text-sm text-[#64748B]"
                  >
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#1A6EDC]" />
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function SolutionProcess({ solution }: SolutionProp): React.ReactNode {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="solution-heading mb-20 max-w-xl">
          <p className="mb-4 font-body text-[12px] font-bold uppercase tracking-[0.18em] text-[#1A6EDC]">
            How It Works
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight text-[#0F2246] md:text-4xl">
            From request to hire in three steps
          </h2>
        </div>

        <div className="solution-steps-grid relative grid grid-cols-1 md:grid-cols-3">
          <div
            aria-hidden
            className="absolute left-[16.66%] right-[16.66%] top-[26px] z-0 hidden h-px bg-[#E2E8F0] md:block"
          />
          {solution.processSteps.map((step, i) => (
            <div
              key={step.number}
              className="solution-process-step relative z-10 px-0 pb-12 first:pl-0 last:pr-0 md:px-10 md:pb-0"
            >
              <div
                className="mb-8 flex h-14 w-14 items-center justify-center rounded-full font-display text-base font-bold text-white shadow-lg"
                style={{
                  backgroundColor: BLUE,
                  boxShadow: '0 10px 25px rgba(26,110,220,0.3)',
                }}
              >
                {step.number}
              </div>
              <p className="mb-3 font-body text-[11px] font-bold uppercase tracking-[0.15em] text-[#1A6EDC]">
                Step {i + 1}
              </p>
              <h3 className="mb-3 font-display text-xl font-bold leading-snug text-[#0F2246]">
                {step.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-[#64748B] md:text-base">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function SolutionEngagementModels({ solution }: SolutionProp): React.ReactNode {
  if (!solution.engagementModels.length) return null

  return (
    <section className="bg-[#F8FAFC] py-16 lg:py-24">
      <Container>
        <div className="solution-heading mb-14 max-w-xl">
          <p className="mb-4 font-body text-[12px] font-bold uppercase tracking-[0.18em] text-[#1A6EDC]">
            Engagement Options
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight text-[#0F2246] md:text-4xl">
            How we engage
          </h2>
        </div>

        <div className="solution-engagement-grid grid grid-cols-1 gap-5 md:grid-cols-3">
          {solution.engagementModels.map((model) => (
            <div
              key={model.label}
              className="solution-engagement-card group flex flex-col gap-5 rounded-2xl border border-[#E2E8F0] bg-white p-8 transition-all duration-300 hover:border-[#BFDBFE] hover:shadow-lg hover:shadow-blue-50"
            >
              <div className="inline-flex">
                <span className="rounded-full bg-[#EFF6FF] px-3 py-1.5 font-body text-[11px] font-bold uppercase tracking-[0.15em] text-[#1A6EDC] transition-colors group-hover:bg-[#DBEAFE]">
                  {model.label}
                </span>
              </div>
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-[#94A3B8]">
                {model.tagline}
              </p>
              <p className="flex-1 font-body text-sm leading-relaxed text-[#64748B] md:text-base">
                {model.description}
              </p>
              <ul className="flex flex-col gap-2 border-t border-[#E2E8F0] pt-4">
                {model.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-center gap-2.5 font-body text-sm text-[#64748B]"
                  >
                    <Check className="h-4 w-4 flex-shrink-0 text-[#1A6EDC]" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function SolutionAdvantages({ solution }: SolutionProp): React.ReactNode {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="solution-heading mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-4 font-body text-[12px] font-bold uppercase tracking-[0.18em] text-[#1A6EDC]">
              Why Veylix
            </p>
            <h2 className="max-w-md font-display text-3xl font-bold leading-tight text-[#0F2246] md:text-4xl">
              Service Advantages
            </h2>
          </div>
          <p className="max-w-xs font-body text-sm leading-relaxed text-[#64748B] md:text-right md:text-base">
            What sets our {solution.navLabel.toLowerCase()} service apart from every other
            option.
          </p>
        </div>

        <div className="solution-advantages-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solution.advantages.map((adv) => (
            <div
              key={adv.heading}
              className="solution-advantage-card group rounded-2xl border border-[#E2E8F0] p-8 transition-all duration-300 hover:border-[#BFDBFE] hover:shadow-lg hover:shadow-blue-50"
            >
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFF6FF] transition-colors group-hover:bg-[#DBEAFE]">
                <DynamicIcon name={adv.icon} className="h-5 w-5 text-[#1A6EDC]" />
              </div>
              <h3 className="mb-3 font-display text-base font-bold leading-snug text-[#0F2246]">
                {adv.heading}
              </h3>
              <p className="font-body text-sm leading-relaxed text-[#64748B]">
                {adv.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function SolutionFAQ({ solution }: SolutionProp): React.ReactNode {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-[#F8FAFC] py-16 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[380px_1fr]">
          <div className="solution-heading">
            <p className="mb-4 font-body text-[12px] font-bold uppercase tracking-[0.18em] text-[#1A6EDC]">
              Common Questions
            </p>
            <h2 className="mb-6 font-display text-3xl font-bold leading-tight text-[#0F2246] md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="font-body text-sm leading-relaxed text-[#64748B] md:text-base">
              Everything you need to know about our {solution.navLabel.toLowerCase()}{' '}
              service. Cannot find your answer? Reach out to our team directly.
            </p>
          </div>

          <div className="flex flex-col divide-y divide-[#E2E8F0]">
            {solution.faqs.map((faq, i) => {
              const isOpen = openIndex === i
              return (
                <div key={faq.question} className="py-5">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span
                      className={cn(
                        'font-body text-base font-semibold leading-snug transition-colors',
                        isOpen
                          ? 'text-[#1A6EDC]'
                          : 'text-[#0F2246] group-hover:text-[#1A6EDC]'
                      )}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all',
                        isOpen
                          ? 'border-[#1A6EDC] bg-[#1A6EDC]'
                          : 'border-[#E2E8F0] group-hover:border-[#1A6EDC]'
                      )}
                    >
                      {isOpen ? (
                        <Minus className="h-4 w-4 text-white" aria-hidden />
                      ) : (
                        <Plus
                          className="h-4 w-4 text-[#94A3B8] group-hover:text-[#1A6EDC]"
                          aria-hidden
                        />
                      )}
                    </span>
                  </button>

                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-300 ease-expo-out',
                      isOpen ? 'mt-4 max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    )}
                  >
                    <p className="font-body text-sm leading-relaxed text-[#64748B] md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

function SolutionCTA({ solution }: SolutionProp): React.ReactNode {
  return (
    <section
      className="relative overflow-hidden py-20 lg:py-28"
      style={{ backgroundColor: NAVY }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1A6EDC]/10 blur-3xl" />
      </div>

      <Container>
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="mb-6 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-[#60A5FA]">
            Get Started Today
          </p>
          <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-white md:text-5xl">
            {solution.ctaHeading}
          </h2>
          <p className="mb-10 font-body text-lg leading-relaxed text-[#94A3B8]">
            {solution.ctaSubtext}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href={routes.placeJob}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1A6EDC] px-10 py-4 font-body text-base font-semibold text-white transition-colors hover:bg-[#1554b0]"
            >
              Place a Job Order
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href={routes.contact}
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-10 py-4 font-body text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Talk to Our Team
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

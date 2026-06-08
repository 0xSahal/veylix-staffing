'use client'

import { useEffect, useRef } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/common/Container'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { routes } from '@/config/routes'
import { BLOG_POSTS } from '@/constants/pages/blog'
import {
  employerBenefits,
  employerProcessSteps,
  employerSolutions,
  employerStats,
} from '@/constants/pages/employers'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/utils'

const SCROLL_START = 'top 82%'
const NAVY = '#0F2246'
const BLUE = '#1A6EDC'

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

  gsap.set(elements, { opacity: 1, clearProps: 'opacity' })
  gsap.from(elements, {
    y: options.y ?? 20,
    duration: options.duration ?? 0.6,
    stagger: options.stagger ?? 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: options.trigger,
      start: options.start ?? SCROLL_START,
      once: true,
    },
  })
}

export default function EmployersPage(): React.ReactNode {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReduced = usePrefersReducedMotion()
  const featuredPosts = BLOG_POSTS.slice(0, 2)

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const root = containerRef.current
      if (!root) return

      gsap.utils.toArray<Element>('.employers-heading').forEach((el) => {
        gsap.set(el, { opacity: 1, clearProps: 'opacity' })
        gsap.from(el, {
          y: 28,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: SCROLL_START, once: true },
        })
      })

      animateInView(root.querySelectorAll('.employers-stat'), {
        trigger: root.querySelector('.employers-stats-row'),
        y: 20,
        stagger: 0.12,
        duration: 0.7,
      })

      animateInView(root.querySelectorAll('.employers-step'), {
        trigger: root.querySelector('.employers-steps-grid'),
        y: 24,
        stagger: 0.15,
        duration: 0.7,
        start: 'top 80%',
      })

      animateInView(root.querySelectorAll('.employers-feature-card'), {
        trigger: root.querySelector('.employers-features-grid'),
        y: 20,
        stagger: 0.1,
        start: 'top 80%',
      })

      animateInView(root.querySelectorAll('.employers-solution-card'), {
        trigger: root.querySelector('.employers-solutions-grid'),
        y: 20,
        stagger: 0.08,
        start: 'top 80%',
      })

      animateInView(root.querySelectorAll('.employers-insight-card'), {
        trigger: root.querySelector('.employers-insights-grid'),
        y: 20,
        stagger: 0.12,
        start: 'top 80%',
      })
    }, containerRef)

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
    <main ref={containerRef}>
      {/* Section 1: Page Header */}
      <section className="relative flex min-h-[400px] items-center justify-center overflow-hidden md:min-h-[440px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about-sitting-group.webp"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to bottom, ${NAVY}BF, ${NAVY}A6, ${NAVY}CC)`,
            }}
            aria-hidden
          />
        </div>

        <Container className="relative z-10 py-20">
          <div className="employers-heading mx-auto flex max-w-2xl flex-col items-center text-center">
            <nav
              aria-label="Breadcrumb"
              className="mb-7 flex items-center gap-2 font-body text-[13px] font-medium text-white/50"
            >
              <Link href={routes.home} className="transition-colors hover:text-white/80">
                Home
              </Link>
              <span className="text-white/30">/</span>
              <span className="text-white/70">Employers</span>
            </nav>

            <p className="mb-5 font-body text-[11px] font-bold uppercase tracking-[0.2em] text-[#93C5FD]">
              For Employers
            </p>

            <h1 className="mb-5 font-display text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              Your Staffing Needs are Unique and Always Evolving
            </h1>

            <p className="max-w-xl font-body text-base leading-relaxed text-white/70 md:text-lg">
              We build hiring strategies around your business, not the other way around.
            </p>
          </div>
        </Container>
      </section>

      {/* Section 2: Intro + Stats Strip */}
      <section className="bg-white pt-20 md:pt-24">
        <Container>
          <div className="employers-heading mx-auto mb-16 max-w-2xl text-center">
            <p className="mb-4 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-[#1A6EDC]">
              Partner With Us
            </p>
            <h2 className="mb-5 font-display text-4xl font-bold leading-tight text-[#0F2246] md:text-5xl">
              Improve Your Hiring Strategies
            </h2>
            <p className="font-body text-base leading-relaxed text-[#64748B] md:text-lg">
              Partner with a certified staffing agency and access a talent pool backed by
              verified processes, compliance, and transparency.
            </p>
          </div>
        </Container>

        <div className="border-y border-[#E2E8F0] bg-[#F8FAFC] py-14">
          <Container>
            <div className="employers-stats-row grid grid-cols-1 md:grid-cols-3">
              {employerStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={cn(
                    'employers-stat flex flex-col items-center px-8 py-8 text-center md:px-16 md:py-0',
                    index < employerStats.length - 1 &&
                      'border-b border-[#E2E8F0] md:border-b-0 md:border-r'
                  )}
                >
                  <span className="mb-3 font-display text-4xl font-extrabold leading-none text-[#0F2246] md:text-5xl">
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} duration={2} />
                  </span>
                  <span className="max-w-[140px] font-body text-sm font-medium leading-snug text-[#64748B] md:text-base">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </section>

      {/* Section 3: Three Steps */}
      <section id="how-it-works" className="bg-white py-24">
        <Container>
          <div className="employers-heading mb-20 max-w-2xl">
            <p className="mb-4 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-[#1A6EDC]">
              How It Works
            </p>
            <h2 className="font-display text-4xl font-bold leading-tight text-[#0F2246] md:text-5xl">
              Three steps to your next hire
            </h2>
          </div>

          <div className="employers-steps-grid relative grid grid-cols-1 md:grid-cols-3">
            <div
              aria-hidden
              className="absolute left-[16.6%] right-[16.6%] top-[28px] z-0 hidden h-px bg-[#E2E8F0] md:block"
            />
            {employerProcessSteps.map((step, index) => (
              <div
                key={step.title}
                className="employers-step relative z-10 px-0 pb-12 first:pl-0 last:pr-0 md:px-10 md:pb-0"
              >
                <div className="mb-8 flex items-center gap-4">
                  <div
                    className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full font-display text-lg font-extrabold text-white shadow-lg"
                    style={{
                      backgroundColor: BLUE,
                      boxShadow: '0 10px 25px rgba(26,110,220,0.25)',
                    }}
                  >
                    0{index + 1}
                  </div>
                  <div className="h-px flex-1 bg-[#E2E8F0] md:hidden" />
                </div>
                <p className="mb-3 font-body text-[11px] font-bold uppercase tracking-[0.16em] text-[#1A6EDC]">
                  {step.step}
                </p>
                <h3 className="mb-4 font-display text-xl font-bold leading-snug text-[#0F2246] md:text-2xl">
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

      {/* Section 4: Why Employers Choose Us */}
      <section className="bg-white py-24">
        <Container>
          <div className="employers-heading mb-16 max-w-2xl">
            <p className="mb-4 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-[#1A6EDC]">
              Why Choose Us
            </p>
            <h2 className="font-display text-4xl font-bold leading-tight text-[#0F2246] md:text-5xl">
              Why Employers Choose Us
            </h2>
          </div>

          <div className="employers-features-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {employerBenefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div
                  key={benefit.title}
                  className="employers-feature-card group flex cursor-default flex-col gap-5 rounded-2xl border border-[#E2E8F0] p-8 transition-all duration-300 hover:border-[#BFDBFE] hover:shadow-lg hover:shadow-blue-50"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF] transition-colors group-hover:bg-[#DBEAFE]">
                    <Icon className="h-5 w-5 text-[#1A6EDC]" />
                  </div>
                  <h3 className="font-display text-lg font-bold leading-snug text-[#0F2246]">
                    {benefit.title}
                  </h3>
                  <p className="flex-1 font-body text-sm leading-relaxed text-[#64748B] md:text-base">
                    {benefit.body}
                  </p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Section 5: Solutions We Offer */}
      <section className="bg-[#F8FAFC] py-24">
        <Container>
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="employers-heading">
              <p className="mb-4 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-[#1A6EDC]">
                Our Services
              </p>
              <h2 className="max-w-md font-display text-4xl font-bold leading-tight text-[#0F2246] md:text-5xl">
                Solutions We Offer
              </h2>
            </div>
            <p className="max-w-sm font-body text-base leading-relaxed text-[#64748B] md:text-right">
              Tailored staffing models built around your timeline, headcount, and industry
              requirements.
            </p>
          </div>

          <div className="employers-solutions-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {employerSolutions.map((solution) => {
              const Icon = solution.icon
              return (
                <div
                  key={solution.title}
                  className="employers-solution-card group flex flex-col gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-8 transition-all duration-300 hover:border-[#BFDBFE] hover:shadow-lg hover:shadow-blue-50"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFF6FF] transition-colors group-hover:bg-[#DBEAFE]">
                    <Icon className="h-5 w-5 text-[#1A6EDC]" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#0F2246]">
                    {solution.title}
                  </h3>
                  <p className="flex-1 font-body text-sm leading-relaxed text-[#64748B]">
                    {solution.description}
                  </p>
                  <Link
                    href={solution.href}
                    className="mt-auto inline-flex items-center gap-2 font-body text-sm font-semibold text-[#1A6EDC] transition-all group-hover:gap-3"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Section 6: Featured Insights */}
      <section className="bg-white py-24">
        <Container>
          <div className="employers-heading mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="mb-3 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-[#1A6EDC]">
                From Our Blog
              </p>
              <h2 className="font-display text-4xl font-bold text-[#0F2246]">
                Featured Insights
              </h2>
            </div>
            <Link
              href={routes.blog}
              className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[#1A6EDC] transition-all hover:gap-3"
            >
              View All Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="employers-insights-grid grid grid-cols-1 gap-7 md:grid-cols-2">
            {featuredPosts.map((post) => (
              <article
                key={post.slug}
                className="employers-insight-card group overflow-hidden rounded-2xl border border-[#E2E8F0] transition-all duration-500 hover:shadow-xl hover:shadow-gray-100"
              >
                <Link href={routes.blogPost(post.slug)} className="block">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={`https://picsum.photos/seed/${post.imageSeed}/800/450`}
                      alt={post.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 font-body text-[11px] font-bold uppercase tracking-wider text-[#1A6EDC] backdrop-blur-sm">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-8">
                    <p className="mb-3 font-body text-xs font-medium text-[#94A3B8]">
                      {post.date}
                    </p>
                    <h3 className="mb-4 font-display text-xl font-bold leading-snug text-[#0F2246] transition-colors group-hover:text-[#1A6EDC] md:text-2xl">
                      {post.title}
                    </h3>
                    <p className="mb-6 font-body text-sm leading-relaxed text-[#64748B] md:text-base">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[#1A6EDC] transition-all group-hover:gap-3">
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 7: Bottom CTA */}
      <section
        className="relative overflow-hidden py-28"
        style={{ backgroundColor: NAVY }}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1A6EDC]/10 blur-3xl" />
        </div>
        <Container>
          <div className="employers-heading relative z-10 mx-auto max-w-3xl text-center">
            <p className="mb-6 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-[#60A5FA]">
              Get Started Today
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-white md:text-5xl">
              Ready to fill your next role?
            </h2>
            <p className="mb-10 font-body text-lg leading-relaxed text-[#94A3B8]">
              Tell us your requirements and we will deliver a qualified shortlist within
              72 hours.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
              <Link
                href={routes.placeJob}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1A6EDC] px-10 py-4 font-body text-base font-semibold text-white transition-colors hover:bg-[#1554b0]"
              >
                Place a Job Order
                <ArrowRight className="h-4 w-4" />
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
    </main>
  )
}

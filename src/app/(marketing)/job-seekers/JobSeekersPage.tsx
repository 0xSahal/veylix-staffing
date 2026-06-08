'use client'

import { useEffect, useRef } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/common/Container'
import { DynamicIcon } from '@/components/solutions/DynamicIcon'
import { routes } from '@/config/routes'
import { siteConfig } from '@/config/site'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

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

const RESOURCES = [
  {
    category: 'Career Tips',
    date: 'Jun 15, 2025',
    title: '5 Hiring Mistakes Companies Make and How to Avoid Them',
    excerpt:
      'From rushing the process to ignoring cultural fit, these common mistakes cost companies time and great candidates.',
    href: routes.blogPost('hiring-mistakes'),
    imageSrc: '/images/recruting-interview.webp',
    imageAlt: 'Professional interview in a modern office',
  },
  {
    category: 'Remote Work',
    date: 'Dec 7, 2024',
    title: 'The Benefits of Remote Hiring: Why It Matters and How to Start',
    excerpt:
      'Remote hiring expands your talent pool and often results in higher-quality placements. Here is how to approach it.',
    href: routes.blogPost('remote-hiring-benefits'),
    imageSrc: '/images/hero-bg.webp',
    imageAlt: 'Professional working remotely',
  },
  {
    category: 'Job Listings',
    date: 'Feb 23, 2025',
    title: 'Crafting the Perfect Job Listing to Attract Top Talent',
    excerpt:
      'Your job description is often the first impression candidates have of your company. Here is how to make it count.',
    href: routes.blogPost('perfect-job-listing'),
    imageSrc: '/images/about-sitting-group.webp',
    imageAlt: 'Team collaborating in a professional setting',
  },
] as const

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Share Your Story',
    body: 'Submit your resume and tell us about the role you want next. A recruiter who specializes in your field will review it personally.',
  },
  {
    number: '02',
    title: 'We Work for You',
    body: 'We search our employer network for roles that match your skills, timeline, and career goals. We reach out to employers on your behalf.',
  },
  {
    number: '03',
    title: 'You Land the Role',
    body: 'We prepare you for interviews, handle offer negotiations, and support you through your start date and beyond.',
  },
] as const

const BENEFITS = [
  {
    icon: 'UserCheck',
    heading: 'A Recruiter Who Advocates for You',
    body: 'You get a dedicated point of contact who presents you to employers, handles negotiations, and follows up on your behalf throughout the process.',
  },
  {
    icon: 'Briefcase',
    heading: 'Access to Unadvertised Roles',
    body: 'Many of the roles we fill are never posted publicly. Our employer relationships give you access to opportunities that are invisible to most candidates.',
  },
  {
    icon: 'DollarSign',
    heading: 'No Cost to You',
    body: 'Our service is entirely free for job seekers. Employers pay our fee. You get expert placement support with no strings attached.',
  },
  {
    icon: 'Target',
    heading: 'Matched on Culture, Not Just Keywords',
    body: 'We take time to understand your values and work style so we can place you in environments where you are likely to stay and grow.',
  },
  {
    icon: 'Headphones',
    heading: 'Interview Preparation and Coaching',
    body: "Before every interview we brief you on the company, the role, and the interviewer's style so you walk in with confidence.",
  },
  {
    icon: 'TrendingUp',
    heading: 'Long-Term Career Support',
    body: 'We stay in contact after placement. When you are ready for your next move, we are already familiar with your trajectory.',
  },
] as const

export default function JobSeekersPage(): React.ReactNode {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReduced = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const root = containerRef.current
      if (!root) return

      gsap.utils.toArray<Element>('.seekers-heading').forEach((el) => {
        gsap.set(el, { opacity: 1, clearProps: 'opacity' })
        gsap.from(el, {
          y: 22,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: SCROLL_START, once: true },
        })
      })

      animateInView(root.querySelectorAll('.seekers-step'), {
        trigger: root.querySelector('.seekers-steps-grid'),
        y: 20,
        stagger: 0.15,
        start: 'top 80%',
      })

      animateInView(root.querySelectorAll('.seekers-benefit-card'), {
        trigger: root.querySelector('.seekers-benefits-grid'),
        y: 18,
        stagger: 0.08,
        duration: 0.55,
        start: 'top 80%',
      })

      animateInView(root.querySelectorAll('.seekers-resources-grid > *'), {
        trigger: root.querySelector('.seekers-resources-grid'),
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
      {/* Section 1: Hero */}
      <section className="relative flex min-h-[300px] items-center justify-center overflow-hidden md:min-h-[360px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/job-seekers/hero.webp"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to bottom, ${NAVY}CC, ${NAVY}B3, ${NAVY}D9)`,
            }}
            aria-hidden
          />
        </div>

        <Container className="relative z-20 py-16">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <nav
              aria-label="Breadcrumb"
              className="mb-7 flex flex-wrap items-center justify-center gap-2 font-body text-[13px] font-medium text-white/50"
            >
              <Link href={routes.home} className="transition-colors hover:text-white/80">
                Home
              </Link>
              <span className="text-white/30">/</span>
              <span className="text-white/70">Job Seekers</span>
            </nav>

            <p className="mb-5 font-body text-[11px] font-bold uppercase tracking-[0.2em] text-[#93C5FD]">
              For Job Seekers
            </p>

            <h1 className="mb-4 font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              Find work that fits who you are
            </h1>

            <p className="max-w-md font-body text-base leading-relaxed text-white/70 md:text-lg">
              We do more than match resumes to job descriptions. We connect you with
              opportunities that align with your goals, values, and career trajectory.
            </p>
          </div>
        </Container>
      </section>

      {/* Section 2: Value Proposition */}
      <section className="bg-white py-20">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="seekers-heading">
              <p className="mb-5 font-body text-[12px] font-bold uppercase tracking-[0.18em] text-[#1A6EDC]">
                Your Next Chapter
              </p>

              <h2 className="mb-6 font-display text-3xl font-bold leading-tight text-[#0F2246] md:text-4xl">
                A new chapter in your career starts here
              </h2>

              <p className="mb-8 max-w-[52ch] font-body text-base leading-relaxed text-[#64748B] md:text-lg">
                At {siteConfig.name}, we take time to understand your goals, strengths,
                and what drives you. Then we connect you with roles where you can
                genuinely grow, not just fill a seat. Our recruiters negotiate on your
                behalf and stay with you through offer and onboarding.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={routes.jobs}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1A6EDC] px-7 py-3.5 font-body text-sm font-bold text-white transition-all duration-200 hover:bg-[#1554b0] active:scale-[0.98]"
                >
                  Browse Open Positions
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={routes.apply}
                  className="rounded-xl border border-[#E2E8F0] px-7 py-3.5 font-body text-sm font-bold text-[#0F2246] transition-all duration-200 hover:border-[#1A6EDC] hover:text-[#1A6EDC] active:scale-[0.98]"
                >
                  Submit Your Resume
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/job-seekers/intro.webp"
                alt="Professional reviewing career documents in a modern office"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Section 3: How We Help */}
      <section className="bg-[#F8FAFC] py-24">
        <Container>
          <div className="seekers-heading mb-20 max-w-xl">
            <p className="mb-4 font-body text-[12px] font-bold uppercase tracking-[0.18em] text-[#1A6EDC]">
              The Process
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight text-[#0F2246] md:text-4xl">
              How we help you land the right role
            </h2>
          </div>

          <div className="seekers-steps-grid relative grid grid-cols-1 md:grid-cols-3">
            <div
              aria-hidden
              className="absolute left-[16.66%] right-[16.66%] top-[26px] z-0 hidden h-px bg-[#E2E8F0] md:block"
            />
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={step.number}
                className="seekers-step relative z-10 px-0 pb-12 first:pl-0 last:pr-0 md:px-10 md:pb-0"
              >
                <div
                  className="mb-8 flex h-14 w-14 items-center justify-center rounded-full font-display text-base font-extrabold text-white"
                  style={{
                    backgroundColor: BLUE,
                    boxShadow: '0 10px 25px rgba(26,110,220,0.25)',
                  }}
                >
                  {step.number}
                </div>

                <p className="mb-3 font-body text-[11px] font-bold uppercase tracking-[0.15em] text-[#1A6EDC]">
                  Step {index + 1}
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

      {/* Section 4: Benefits */}
      <section className="bg-white py-24">
        <Container>
          <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="seekers-heading">
              <p className="mb-4 font-body text-[12px] font-bold uppercase tracking-[0.18em] text-[#1A6EDC]">
                Why Work With Us
              </p>
              <h2 className="max-w-md font-display text-3xl font-bold leading-tight text-[#0F2246] md:text-4xl">
                Benefits of working with {siteConfig.name.split(' ')[0]}
              </h2>
            </div>
            <p className="max-w-xs font-body text-sm leading-relaxed text-[#64748B] md:text-right md:text-base">
              Advantages that job seekers get when they work with a dedicated staffing
              partner instead of applying alone.
            </p>
          </div>

          <div className="seekers-benefits-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.heading}
                className="seekers-benefit-card group rounded-2xl border border-[#E2E8F0] p-8 transition-all duration-300 hover:border-[#BFDBFE] hover:shadow-lg hover:shadow-blue-50"
              >
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFF6FF] transition-colors group-hover:bg-[#DBEAFE]">
                  <DynamicIcon name={benefit.icon} className="h-5 w-5 text-[#1A6EDC]" />
                </div>

                <h3 className="mb-3 font-display text-base font-bold leading-snug text-[#0F2246]">
                  {benefit.heading}
                </h3>

                <p className="font-body text-sm leading-relaxed text-[#64748B]">
                  {benefit.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 5: Resources */}
      <section className="bg-white py-24">
        <Container>
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="seekers-heading">
              <p className="mb-3 font-body text-[12px] font-bold uppercase tracking-[0.18em] text-[#1A6EDC]">
                From Our Blog
              </p>
              <h2 className="font-display text-3xl font-bold text-[#0F2246] md:text-4xl">
                Resources for Job Seekers
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

          <div className="seekers-resources-grid grid grid-cols-1 gap-6 md:grid-cols-3">
            {RESOURCES.map((post) => (
              <article
                key={post.title}
                className="group overflow-hidden rounded-2xl border border-[#E2E8F0] transition-all duration-500 hover:shadow-xl hover:shadow-gray-100"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.imageSrc}
                    alt={post.imageAlt}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1.5 font-body text-[11px] font-bold uppercase tracking-wider text-[#1A6EDC] backdrop-blur-sm">
                    {post.category}
                  </div>
                </div>

                <div className="p-7">
                  <p className="mb-3 font-body text-xs font-medium text-[#94A3B8]">
                    {post.date}
                  </p>
                  <h3 className="mb-3 font-display text-lg font-bold leading-snug text-[#0F2246] transition-colors group-hover:text-[#1A6EDC]">
                    {post.title}
                  </h3>
                  <p className="mb-5 font-body text-sm leading-relaxed text-[#64748B]">
                    {post.excerpt}
                  </p>
                  <Link
                    href={post.href}
                    className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[#1A6EDC] transition-all group-hover:gap-3"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 6: Bottom CTA */}
      <section
        className="relative overflow-hidden py-28"
        style={{ backgroundColor: NAVY }}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1A6EDC]/10 blur-3xl" />
        </div>
        <Container>
          <div className="seekers-heading relative z-10 mx-auto max-w-3xl text-center">
            <p className="mb-6 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-[#60A5FA]">
              Get Started Today
            </p>
            <h2 className="mb-6 font-display text-3xl font-bold leading-tight text-white md:text-5xl">
              Ready to find your next role?
            </h2>
            <p className="mb-10 font-body text-base leading-relaxed text-[#94A3B8] md:text-lg">
              Share your background and we will match you with opportunities that fit your
              goals, not just your resume.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
              <Link
                href={routes.jobs}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1A6EDC] px-10 py-4 font-body text-base font-semibold text-white transition-colors hover:bg-[#1554b0]"
              >
                See Open Positions
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={routes.apply}
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-10 py-4 font-body text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                Submit Your Resume
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}

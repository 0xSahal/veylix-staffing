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
import { allIndustries, type Industry } from '@/data/industries'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const NAVY = '#0F2246'

type IndustryProp = { industry: Industry }

export function IndustryPageLayout({ industry }: IndustryProp): React.ReactNode {
  const layoutRef = useRef<HTMLDivElement>(null)
  const prefersReduced = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReduced || !layoutRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>('.industry-heading').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: { trigger: el, start: 'top 84%', once: true },
        })
      })

      gsap.from('.industry-role-card', {
        opacity: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.industry-roles-grid',
          start: 'top 82%',
          once: true,
        },
      })

      gsap.from('.industry-expertise-item', {
        opacity: 0,
        y: 14,
        duration: 0.5,
        stagger: 0.12,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.industry-expertise-grid',
          start: 'top 82%',
          once: true,
        },
      })
    }, layoutRef)

    return () => ctx.revert()
  }, [prefersReduced])

  return (
    <main ref={layoutRef}>
      <IndustryHero industry={industry} />
      <IndustryIntro industry={industry} />
      <IndustryRoles industry={industry} />
      <IndustryExpertise industry={industry} />
      <OtherIndustriesStrip current={industry.slug} />
      <IndustryCTA industry={industry} />
    </main>
  )
}

function IndustryHero({ industry }: IndustryProp): React.ReactNode {
  return (
    <section className="relative flex min-h-[300px] items-center justify-center overflow-hidden sm:min-h-[360px]">
      <div className="absolute inset-0 z-0">
        <Image
          src={industry.heroImage}
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
            <Link
              href={routes.industries}
              className="transition-colors hover:text-white/80"
            >
              Industries
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white/70">{industry.title}</span>
          </nav>

          <p className="mb-5 font-body text-[11px] font-bold uppercase tracking-[0.2em] text-[#93C5FD]">
            Industries
          </p>

          <h1 className="mb-4 font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
            {industry.title}
          </h1>

          <p className="max-w-md font-body text-base leading-relaxed text-white/70 md:text-lg">
            {industry.subtitle}
          </p>
        </div>
      </Container>
    </section>
  )
}

function IndustryIntro({ industry }: IndustryProp): React.ReactNode {
  const quickRoles = industry.roleCategories.flatMap((cat) =>
    cat.roles.slice(0, 3).map((role, i) => ({
      key: `${cat.heading}-${i}`,
      role,
    }))
  )

  return (
    <section className="border-b border-[#F1F5F9] bg-white py-16">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-5 font-body text-[12px] font-bold uppercase tracking-[0.18em] text-[#1A6EDC]">
              {industry.navLabel}
            </p>

            <h2 className="industry-heading mb-5 font-display text-3xl font-bold leading-tight text-[#0F2246] md:text-4xl">
              {industry.overviewHeading}
            </h2>

            <p className="mb-8 max-w-[52ch] font-body text-base leading-relaxed text-[#64748B]">
              {industry.overviewBody}
            </p>

            <Link
              href={routes.placeJob}
              className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[#1A6EDC] transition-all duration-200 hover:gap-3"
            >
              Place a Job Order
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          {quickRoles.length > 0 && (
            <div className="rounded-2xl border border-[#F1F5F9] bg-[#F8FAFC] p-8">
              <p className="mb-6 font-body text-[11px] font-bold uppercase tracking-[0.16em] text-[#94A3B8]">
                Roles We Commonly Place
              </p>

              <div className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-8">
                {quickRoles.map(({ key, role }) => (
                  <div
                    key={key}
                    className="flex items-center gap-2.5 font-body text-sm text-[#64748B]"
                  >
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#1A6EDC]" />
                    {role}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

function IndustryRoles({ industry }: IndustryProp): React.ReactNode {
  if (!industry.roleCategories.length) return null

  return (
    <section className="bg-[#F8FAFC] py-16">
      <Container>
        <div className="mb-10">
          <p className="industry-heading mb-3 font-body text-[12px] font-bold uppercase tracking-[0.18em] text-[#1A6EDC]">
            Talent We Place
          </p>
          <h2 className="font-display text-2xl font-bold text-[#0F2246] md:text-3xl">
            Roles We Fill
          </h2>
        </div>

        <div className="industry-roles-grid grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industry.roleCategories.map((category) => (
            <div
              key={category.heading}
              className="industry-role-card group rounded-xl border border-[#F1F5F9] bg-white p-6 transition-all duration-300 hover:border-[#BFDBFE] hover:shadow-md hover:shadow-blue-50/50"
            >
              <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-lg bg-[#EFF6FF] transition-colors group-hover:bg-[#DBEAFE]">
                <DynamicIcon name={category.icon} className="h-4 w-4 text-[#1A6EDC]" />
              </div>

              <h3 className="mb-4 font-display text-sm font-bold text-[#0F2246]">
                {category.heading}
              </h3>

              <ul className="flex flex-col gap-2">
                {category.roles.map((role) => (
                  <li
                    key={role}
                    className="flex items-center gap-2 font-body text-xs text-[#64748B]"
                  >
                    <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[#1A6EDC]" />
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

function IndustryExpertise({ industry }: IndustryProp): React.ReactNode {
  if (!industry.expertisePoints.length) return null

  return (
    <section className="border-y border-[#F1F5F9] bg-white py-16">
      <Container>
        <p className="industry-heading mb-10 font-body text-[12px] font-bold uppercase tracking-[0.18em] text-[#1A6EDC]">
          Why Veylix for {industry.title}
        </p>

        <div className="industry-expertise-grid grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {industry.expertisePoints.map((point) => (
            <div
              key={point.heading}
              className="industry-expertise-item flex items-start gap-5"
            >
              <div className="flex flex-shrink-0 flex-col items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EFF6FF]">
                  <DynamicIcon name={point.icon} className="h-4 w-4 text-[#1A6EDC]" />
                </div>
                <div
                  className="hidden min-h-[40px] w-[2px] flex-1 rounded-full bg-[#F1F5F9] md:block"
                  aria-hidden
                />
              </div>

              <div className="pb-4 pt-1">
                <h3 className="mb-2 font-display text-sm font-bold leading-snug text-[#0F2246]">
                  {point.heading}
                </h3>
                <p className="font-body text-sm leading-relaxed text-[#64748B]">
                  {point.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function OtherIndustriesStrip({ current }: { current: string }): React.ReactNode {
  const others = allIndustries.filter((i) => i.slug !== current)

  return (
    <section className="border-y border-[#F1F5F9] bg-[#F8FAFC] py-12">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
          <p className="flex-shrink-0 whitespace-nowrap font-body text-[12px] font-bold uppercase tracking-[0.16em] text-[#94A3B8]">
            Other Industries
          </p>

          <div className="flex flex-wrap gap-3">
            {others.map((ind) => (
              <Link
                key={ind.slug}
                href={routes.industry(ind.slug)}
                className="rounded-full border border-[#E2E8F0] bg-white px-4 py-2 font-body text-sm font-medium text-[#64748B] transition-all duration-200 hover:border-[#1A6EDC] hover:bg-[#EFF6FF] hover:text-[#1A6EDC]"
              >
                {ind.navLabel}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function IndustryCTA({ industry }: IndustryProp): React.ReactNode {
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
            {industry.ctaHeading}
          </h2>

          <p className="mb-10 font-body text-lg leading-relaxed text-[#94A3B8]">
            {industry.ctaSubtext}
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

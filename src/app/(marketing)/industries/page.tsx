import Image from 'next/image'
import Link from 'next/link'

import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/common/Container'
import HeroImageOverlay from '@/components/layout/HeroImageOverlay'
import { routes } from '@/config/routes'
import { INDUSTRY_HUB_CARDS } from '@/constants/pages/industries'
import { heroImageClassName } from '@/lib/hero-image-position'
import { createPageMetadata } from '@/lib/metadata'

const NAVY = '#0F2246'

export const metadata = createPageMetadata({
  title: 'Industries We Serve',
  description:
    'Deep staffing expertise across IT, healthcare, finance, engineering, administrative, and manufacturing sectors.',
  path: routes.industries,
})

export default function IndustriesPage(): React.ReactNode {
  return (
    <main>
      <section className="relative flex min-h-[300px] items-center justify-center overflow-hidden sm:min-h-[360px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about-sitting-group.webp"
            alt=""
            fill
            priority
            className={heroImageClassName('/images/about-sitting-group.webp')}
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
              <span className="text-white/70">Industries</span>
            </nav>

            <p className="mb-5 font-body text-[11px] font-bold uppercase tracking-[0.2em] text-[#93C5FD]">
              Industries
            </p>

            <h1 className="mb-4 font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              Industries We Serve
            </h1>

            <p className="max-w-md font-body text-base leading-relaxed text-white/70 md:text-lg">
              Deep expertise across the sectors that drive America&apos;s economy
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-[#F1F5F9] bg-white py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-5 font-body text-[12px] font-bold uppercase tracking-[0.18em] text-[#1A6EDC]">
              Specialized by Sector
            </p>
            <h2 className="mb-5 font-display text-3xl font-bold leading-tight text-[#0F2246] md:text-4xl">
              We understand your industry, not just the job title
            </h2>
            <p className="font-body text-base leading-relaxed text-[#64748B]">
              Each sector has unique talent challenges, compliance requirements, and
              cultural dynamics. Our specialized teams bring deep domain knowledge to
              every search.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-[#F8FAFC] py-16">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRY_HUB_CARDS.map(({ name, description, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col rounded-2xl border border-[#F1F5F9] bg-white p-8 transition-all duration-300 hover:border-[#BFDBFE] hover:shadow-md hover:shadow-blue-50/50"
              >
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFF6FF] transition-colors group-hover:bg-[#DBEAFE]">
                  <Icon size={20} className="text-[#1A6EDC]" aria-hidden />
                </div>

                <h3 className="mb-2 font-display text-lg font-bold text-[#0F2246]">
                  {name}
                </h3>

                <p className="mb-6 flex-1 font-body text-sm leading-relaxed text-[#64748B]">
                  {description}
                </p>

                <span className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[#1A6EDC] transition-all duration-200 group-hover:gap-3">
                  Explore
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section
        className="relative overflow-hidden py-28"
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
              Do not see your industry?
            </h2>

            <p className="mb-10 font-body text-lg leading-relaxed text-[#94A3B8]">
              We work across all sectors. Tell us what you need and we will match you with
              the right talent.
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
    </main>
  )
}

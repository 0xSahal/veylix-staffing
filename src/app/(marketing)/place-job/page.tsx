import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/common/Container'
import TrustSidebar from '@/components/forms/place-job/TrustSidebar'
import PlaceJobForm from '@/components/forms/PlaceJobForm'
import { routes } from '@/config/routes'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: 'Place Your Job Order',
  description:
    'Tell us what you need and our team will source pre-vetted candidates within 1 business day.',
  path: routes.placeJob,
})

export default function PlaceJobPage(): React.ReactNode {
  return (
    <main>
      <section className="relative flex min-h-[300px] items-center justify-center overflow-hidden md:min-h-[360px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/recruting-interview.webp"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-vx-navy/75 via-vx-navy/65 to-vx-navy/80"
            aria-hidden
          />
        </div>

        <Container className="relative z-10 py-16">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <nav
              aria-label="Breadcrumb"
              className="mb-7 flex items-center gap-2 font-body text-[13px] font-medium text-white/50"
            >
              <Link href={routes.home} className="transition-colors hover:text-white/80">
                Home
              </Link>
              <span className="text-white/30">/</span>
              <Link
                href={routes.employers}
                className="transition-colors hover:text-white/80"
              >
                Employers
              </Link>
              <span className="text-white/30">/</span>
              <span className="text-white/70">Place Job Order</span>
            </nav>

            <p className="mb-5 font-body text-[11px] font-bold uppercase tracking-[0.2em] text-[#93C5FD]">
              For Employers
            </p>

            <h1 className="mb-4 font-display text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              Place Your Job Order
            </h1>

            <p className="font-body text-base leading-relaxed text-white/70 md:text-lg">
              Tell us what you need. We will handle the rest.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-vx-off py-20">
        <Container>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_340px]">
            <div className="overflow-hidden rounded-card-lg border border-vx-border bg-white shadow-card">
              <PlaceJobForm />
            </div>

            <div className="lg:sticky lg:top-28">
              <TrustSidebar />
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}

import Link from 'next/link'

import PageHero from '@/components/layout/PageHero'
import JobsListing from '@/components/pages/JobsListing'
import { routes } from '@/config/routes'
import { JOB_LISTINGS } from '@/constants/pages/jobs'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: 'Job Openings',
  description:
    'Explore exciting staffing opportunities — your next career move starts here.',
  path: routes.jobs,
})

export default function JobsPage(): React.ReactNode {
  return (
    <main>
      <PageHero
        eyebrow="For Job Seekers"
        title="Job Openings"
        tagline="Explore exciting opportunities — your next career move starts here"
        imageSrc="/images/job-seekers/intro.webp"
        breadcrumbs={[
          { label: 'Job Seekers', href: routes.jobSeekers },
          { label: 'Job Openings' },
        ]}
      />

      <section className="section-vx bg-vx-off">
        <div className="container-vx">
          <JobsListing jobs={JOB_LISTINGS} />
        </div>
      </section>

      <section className="bg-vx-navy py-14">
        <div className="container-vx text-center">
          <h2 className="font-display text-2xl font-bold text-white">
            Don&apos;t see your role?
          </h2>
          <p className="mt-3 font-body text-white/70">
            Submit your resume and we&apos;ll reach out when the perfect opportunity
            arises.
          </p>
          <Link href={routes.apply} className="btn-primary mt-6 inline-flex">
            Submit Resume →
          </Link>
        </div>
      </section>
    </main>
  )
}

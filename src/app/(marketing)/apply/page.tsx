import ApplyForm from '@/components/forms/ApplyForm'
import PageHero from '@/components/layout/PageHero'
import { routes } from '@/config/routes'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: 'Apply Now',
  description:
    'Submit your application — our recruiters respond within 2–3 business days.',
  path: routes.apply,
})

const NEXT_STEPS = [
  'We review your resume within 24 hours',
  'A recruiter reaches out to discuss your goals',
  'We match you to relevant openings',
  'We prepare you for interviews',
  'You get hired!',
] as const

type PageProps = {
  searchParams: Promise<{ job?: string }>
}

export default async function ApplyPage({
  searchParams,
}: PageProps): Promise<React.ReactNode> {
  const { job } = await searchParams

  return (
    <main>
      <PageHero
        eyebrow="For Job Seekers"
        title="Apply Now"
        tagline="Your dream job is one application away"
        imageSrc="/images/job-seekers/hero.webp"
        breadcrumbs={[
          { label: 'Job Seekers', href: routes.jobSeekers },
          { label: 'Apply Now' },
        ]}
      />

      <section className="section-vx bg-vx-off">
        <div className="container-vx grid grid-cols-1 gap-12 lg:grid-cols-[1fr_300px]">
          <div className="rounded-card border border-vx-border bg-white p-6 shadow-card sm:p-10">
            <ApplyForm jobId={job} />
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-card border border-vx-border bg-white p-8 shadow-card">
              <h3 className="font-display text-lg font-semibold text-vx-navy">
                What happens next?
              </h3>
              <ol className="mt-6 space-y-4">
                {NEXT_STEPS.map((step, i) => (
                  <li key={step} className="flex gap-3 text-sm text-vx-body">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-vx-blue text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

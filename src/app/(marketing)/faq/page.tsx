import Link from 'next/link'

import AccordionFAQ from '@/components/layout/AccordionFAQ'
import PageHero from '@/components/layout/PageHero'
import { routes } from '@/config/routes'
import { employerFaqs, jobSeekerFaqs } from '@/constants/pages/faq'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: 'Frequently Asked Questions',
  description: 'Answers for employers and job seekers about Veylix Staffing services.',
  path: routes.faq,
})

export default function FAQPage(): React.ReactNode {
  return (
    <main>
      <PageHero
        eyebrow="Support"
        title="Frequently Asked Questions"
        imageSrc="/images/recruting-interview.webp"
        breadcrumbs={[{ label: 'FAQ' }]}
      />

      <section className="section-vx bg-white">
        <div className="container-vx grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <h2 className="heading-h3 text-vx-navy">For Employers</h2>
            <div className="mt-6">
              <AccordionFAQ items={employerFaqs} defaultOpen={0} />
            </div>
          </div>
          <div>
            <h2 className="heading-h3 text-vx-navy">For Job Seekers</h2>
            <div className="mt-6">
              <AccordionFAQ items={jobSeekerFaqs} defaultOpen={0} />
            </div>
          </div>
        </div>
      </section>

      <section className="section-vx bg-vx-off text-center">
        <div className="container-vx">
          <h2 className="heading-h3 text-vx-navy">Still have questions?</h2>
          <Link href={routes.contact} className="btn-primary mt-6 inline-flex">
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  )
}

import CTABanner from '@/components/layout/CTABanner'
import PageHero from '@/components/layout/PageHero'
import { routes } from '@/config/routes'
import type { IndustryDetail } from '@/constants/pages/industries'

type IndustryPageTemplateProps = {
  industry: IndustryDetail
}

export default function IndustryPageTemplate({
  industry,
}: IndustryPageTemplateProps): React.ReactNode {
  return (
    <main>
      <PageHero
        title={industry.name}
        tagline={industry.tagline}
        breadcrumbs={[
          { label: 'Industries', href: routes.industries },
          { label: industry.name },
        ]}
      />

      <section className="section-vx bg-white">
        <div className="container-vx max-w-3xl">
          <p className="font-body text-lg leading-relaxed text-vx-muted">
            {industry.overview}
          </p>
        </div>
      </section>

      <section className="section-vx bg-vx-off">
        <div className="container-vx grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="heading-h3 text-vx-navy">Roles We Place</h2>
            <ul className="mt-6 space-y-3">
              {industry.roles.map((role) => (
                <li key={role} className="flex gap-2 font-body text-vx-body">
                  <span className="text-vx-blue">•</span>
                  {role}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="heading-h3 text-vx-navy">Why {industry.name}</h2>
            <ul className="mt-6 space-y-4">
              {industry.whyUs.map((item) => (
                <li
                  key={item}
                  className="rounded-card border border-vx-border bg-white p-4 font-body text-sm text-vx-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTABanner
        heading={`Need talent in ${industry.name}?`}
        buttons={[
          { label: 'Contact Us', href: routes.contact },
          { label: 'Place a Job Order', href: routes.placeJob, primary: false },
        ]}
      />
    </main>
  )
}

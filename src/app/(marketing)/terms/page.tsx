import PageHero from '@/components/layout/PageHero'
import { routes } from '@/config/routes'
import { siteConfig } from '@/config/site'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: 'Terms of Service',
  description: `Terms of service for ${siteConfig.name}.`,
  path: routes.terms,
})

export default function TermsPage(): React.ReactNode {
  return (
    <main>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        imageSrc="/images/about-sitting-group.webp"
        breadcrumbs={[{ label: 'Terms of Service' }]}
      />
      <section className="section-vx bg-white">
        <div className="container-vx max-w-3xl space-y-6 font-body text-vx-body">
          <p className="text-sm text-vx-muted">Last updated: June 2025</p>
          <p>
            By accessing {siteConfig.name}&apos;s website and services, you agree to these
            Terms of Service. If you do not agree, please do not use our site.
          </p>
          <h2 className="font-display text-xl font-semibold text-vx-navy">Services</h2>
          <p>
            We provide staffing and recruitment services to employers and job seekers.
            Specific engagement terms, fees, and guarantees are defined in separate
            agreements with clients.
          </p>
          <h2 className="font-display text-xl font-semibold text-vx-navy">
            User responsibilities
          </h2>
          <p>
            You agree to provide accurate information and not misuse the site for unlawful
            purposes. Job listings and applications must reflect truthful qualifications
            and requirements.
          </p>
          <h2 className="font-display text-xl font-semibold text-vx-navy">
            Limitation of liability
          </h2>
          <p>
            To the fullest extent permitted by law, {siteConfig.name} is not liable for
            indirect or consequential damages arising from use of the website or placement
            outcomes beyond agreed guarantee terms.
          </p>
          <h2 className="font-display text-xl font-semibold text-vx-navy">
            Governing law
          </h2>
          <p>
            These terms are governed by the laws of the State of Wyoming, without regard
            to conflict-of-law principles.
          </p>
          <h2 className="font-display text-xl font-semibold text-vx-navy">Contact</h2>
          <p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-vx-blue hover:underline"
            >
              {siteConfig.email}
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}

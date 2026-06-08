import PageHero from '@/components/layout/PageHero'
import { routes } from '@/config/routes'
import { siteConfig } from '@/config/site'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: 'Privacy Policy',
  description: `Privacy policy for ${siteConfig.name}.`,
  path: routes.privacy,
})

export default function PrivacyPage(): React.ReactNode {
  return (
    <main>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        imageSrc="/images/about-sitting-group.webp"
        breadcrumbs={[{ label: 'Privacy Policy' }]}
      />
      <section className="section-vx bg-white">
        <div className="container-vx max-w-3xl space-y-6 font-body text-vx-body">
          <p className="text-sm text-vx-muted">Last updated: June 2025</p>
          <p>
            {siteConfig.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
            respects your privacy. This policy describes how we collect, use, and protect
            personal information when you use our website and staffing services.
          </p>
          <h2 className="font-display text-xl font-semibold text-vx-navy">
            Information we collect
          </h2>
          <p>
            We may collect contact details, employment history, resumes, and
            communications you submit through forms, email, or phone. We also collect
            limited technical data such as IP address and browser type for security and
            analytics.
          </p>
          <h2 className="font-display text-xl font-semibold text-vx-navy">
            How we use information
          </h2>
          <p>
            We use your information to provide staffing services, respond to inquiries,
            improve our website, and comply with legal obligations. We do not sell
            personal information to third parties.
          </p>
          <h2 className="font-display text-xl font-semibold text-vx-navy">
            Data security
          </h2>
          <p>
            We implement reasonable administrative, technical, and physical safeguards to
            protect your data. No method of transmission over the Internet is 100% secure.
          </p>
          <h2 className="font-display text-xl font-semibold text-vx-navy">Contact</h2>
          <p>
            Questions about this policy? Email{' '}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-vx-blue hover:underline"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  )
}

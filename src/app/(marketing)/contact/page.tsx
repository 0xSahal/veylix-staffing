import { Clock, Mail, MapPin, Phone } from 'lucide-react'

import ContactForm from '@/components/forms/ContactForm'
import AccordionFAQ from '@/components/layout/AccordionFAQ'
import PageHero from '@/components/layout/PageHero'
import SocialIcon from '@/components/ui/SocialIcon'
import { routes } from '@/config/routes'
import { CONTACT_PHONE_ENABLED, siteConfig } from '@/config/site'
import { contactFaqs } from '@/constants/pages/faq'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: 'Contact Us',
  description: 'Get in touch with Veylix Staffing — employers and job seekers welcome.',
  path: routes.contact,
})

export default function ContactPage(): React.ReactNode {
  return (
    <main>
      <PageHero
        eyebrow="Get in Touch"
        title="Contact Us"
        tagline="Let's start the conversation"
        imageSrc="/images/about-sitting-group.webp"
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="section-vx bg-white">
        <div className="container-vx grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { icon: MapPin, title: 'Location', body: siteConfig.address },
            {
              icon: CONTACT_PHONE_ENABLED ? Phone : Mail,
              title: CONTACT_PHONE_ENABLED ? 'Call or Email' : 'Email Us',
              body: (
                <>
                  {CONTACT_PHONE_ENABLED && (
                    <a
                      href={`tel:${siteConfig.phone.replace(/\D/g, '')}`}
                      className="block hover:text-vx-blue"
                    >
                      {siteConfig.phone}
                    </a>
                  )}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="block hover:text-vx-blue"
                  >
                    {siteConfig.email}
                  </a>
                </>
              ),
            },
            { icon: Clock, title: 'Office Hours', body: siteConfig.officeHours },
          ].map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-card border border-vx-border bg-vx-off p-6 text-center"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-vx-blue-lt">
                <Icon size={22} className="text-vx-blue" />
              </span>
              <h3 className="mt-4 font-display font-semibold text-vx-navy">{title}</h3>
              <div className="mt-2 font-body text-sm text-vx-muted">{body}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-vx bg-vx-off">
        <div className="container-vx grid grid-cols-1 gap-12 lg:grid-cols-[3fr_2fr]">
          <div className="rounded-card border border-vx-border bg-white p-6 shadow-card sm:p-10">
            <h2 className="heading-h3 text-vx-navy">Send us a message</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
          <div>
            <div className="overflow-hidden rounded-card border border-vx-border shadow-card">
              <iframe
                title="Veylix Staffing office location"
                src={siteConfig.mapEmbedUrl}
                className="h-64 w-full border-0 sm:h-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="mt-6 flex gap-3">
              {(
                [
                  { name: 'linkedin' as const, href: siteConfig.socials.linkedin },
                  { name: 'facebook' as const, href: siteConfig.socials.facebook },
                  { name: 'instagram' as const, href: siteConfig.socials.instagram },
                ] as const
              ).map(({ name, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-vx-border text-vx-body hover:border-vx-blue hover:text-vx-blue"
                  aria-label={name}
                >
                  <SocialIcon name={name} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-vx bg-white">
        <div className="container-vx max-w-3xl">
          <h2 className="heading-h3 text-vx-navy">Quick answers</h2>
          <div className="mt-6">
            <AccordionFAQ items={contactFaqs} defaultOpen={null} />
          </div>
        </div>
      </section>
    </main>
  )
}

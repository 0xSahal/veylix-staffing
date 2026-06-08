import TestimonialCard from '@/components/cards/TestimonialCard'
import CTABanner from '@/components/layout/CTABanner'
import PageHero from '@/components/layout/PageHero'
import { routes } from '@/config/routes'
import { pageTestimonials, testimonialStats } from '@/constants/pages/testimonials-page'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: 'Testimonials',
  description:
    'See what employers and job seekers say about partnering with Veylix Staffing.',
  path: routes.testimonials,
})

export default function TestimonialsPage(): React.ReactNode {
  return (
    <main>
      <PageHero
        eyebrow="Testimonials"
        title="What Our Partners Say"
        imageSrc="/images/the-people-behind-veylix.webp"
        breadcrumbs={[{ label: 'About', href: routes.about }, { label: 'Testimonials' }]}
      />

      <section className="border-b border-vx-border bg-vx-navy py-10">
        <div className="container-vx grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
          {testimonialStats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-vx bg-vx-off">
        <div className="container-vx grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pageTestimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </section>

      <CTABanner
        heading="Ready to Join Our Success Stories?"
        buttons={[
          { label: 'Hire Talent', href: routes.placeJob },
          { label: 'Apply Now', href: routes.apply, primary: false },
        ]}
      />
    </main>
  )
}

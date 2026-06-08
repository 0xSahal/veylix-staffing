import Image from 'next/image'

import { Check } from 'lucide-react'

import PageHero from '@/components/layout/PageHero'
import ServiceSidebar from '@/components/layout/ServiceSidebar'
import TabsSection from '@/components/layout/TabsSection'
import { routes } from '@/config/routes'
import type { SolutionPageData } from '@/constants/pages/solutions'
import { SERVICE_ADVANTAGES } from '@/constants/pages/solutions'
import { cn } from '@/lib/utils'

type SolutionPageTemplateProps = {
  data: SolutionPageData
}

export default function SolutionPageTemplate({
  data,
}: SolutionPageTemplateProps): React.ReactNode {
  const isExecutive = data.variant === 'executive'

  return (
    <main>
      <PageHero
        title={data.title}
        tagline={data.tagline}
        breadcrumbs={[
          { label: 'Solutions', href: routes.temporaryStaffing },
          { label: data.title },
        ]}
        imageSrc={`https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80&fit=crop`}
      />

      <section className="section-vx bg-white">
        <div className="container-vx grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
          <div>
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-card-lg">
                <Image
                  src={`https://picsum.photos/seed/${data.imageSeed}/600/450`}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <h2 className="heading-h3 text-vx-navy">{data.introHeading}</h2>
                <p className="mt-4 font-body text-base leading-relaxed text-vx-muted">
                  {data.introBody}
                </p>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="heading-h3 text-vx-navy">Roles We Fill</h2>
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                {data.roleCards.map((card) => (
                  <div
                    key={card.title}
                    className={cn(
                      'rounded-card border p-6',
                      isExecutive
                        ? 'border-vx-gold/30 bg-gradient-to-br from-vx-navy to-vx-navy-mid text-white shadow-glow-blue'
                        : 'border-vx-border bg-vx-off'
                    )}
                  >
                    <h3
                      className={cn(
                        'font-display text-lg font-semibold',
                        isExecutive ? 'text-vx-gold' : 'text-vx-navy'
                      )}
                    >
                      {card.title}
                    </h3>
                    <ul className="mt-4 space-y-2">
                      {card.roles.map((role) => (
                        <li
                          key={role}
                          className={cn(
                            'font-body text-sm',
                            isExecutive ? 'text-white/80' : 'text-vx-muted'
                          )}
                        >
                          • {role}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {data.tabs && (
              <div className="mt-16">
                <TabsSection heading="Types of Temporary Hiring" tabs={data.tabs} />
              </div>
            )}

            <div className="mt-16">
              <h2 className="heading-h3 text-vx-navy">Service Advantages</h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {SERVICE_ADVANTAGES.map((item) => (
                  <div key={item} className="flex gap-3 font-body text-sm text-vx-body">
                    <Check size={18} className="shrink-0 text-vx-green" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ServiceSidebar currentPath={data.path} />
        </div>
      </section>
    </main>
  )
}

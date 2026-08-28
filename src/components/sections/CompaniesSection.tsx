'use client'

import Image from 'next/image'

import Marquee from 'react-fast-marquee'

import {
  COMPANY_LOGO_DISPLAY_HEIGHT,
  PLACEMENT_COMPANIES,
  companyLogoDisplayWidth,
  type PlacementCompany,
} from '@/constants/sections/companies'

const MARQUEE_SPEED = 40

export default function CompaniesSection(): React.ReactNode {
  return (
    <section className="section-vx bg-white" aria-labelledby="companies-heading">
      <div className="container-vx mb-14 text-center">
        <span className="section-label">WHERE WE PLACE TALENT</span>
        <h2 id="companies-heading" className="heading-h2 mt-4 text-vx-navy">
          Candidates building careers at leading employers
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-vx-muted">
          From enterprise IT to retail and healthcare — our placements land at companies
          candidates recognize and respect.
        </p>
      </div>

      <Marquee speed={MARQUEE_SPEED} gradient={false} pauseOnHover>
        {PLACEMENT_COMPANIES.map((company) => (
          <div key={company.name} className="mx-10 flex shrink-0 items-center sm:mx-12">
            <CompanyLogo company={company} />
          </div>
        ))}
        {PLACEMENT_COMPANIES.map((company) => (
          <div
            key={`${company.name}-repeat`}
            className="mx-10 flex shrink-0 items-center sm:mx-12"
            aria-hidden="true"
          >
            <CompanyLogo company={company} />
          </div>
        ))}
      </Marquee>
    </section>
  )
}

function CompanyLogo({ company }: { company: PlacementCompany }): React.ReactNode {
  const displayWidth = companyLogoDisplayWidth(company)

  return (
    <Image
      src={company.logoSrc}
      alt={company.alt}
      width={displayWidth}
      height={COMPANY_LOGO_DISPLAY_HEIGHT}
      className="h-10 w-auto max-w-[180px] object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:max-w-[220px]"
      sizes="(max-width: 640px) 120px, 180px"
      loading="lazy"
    />
  )
}

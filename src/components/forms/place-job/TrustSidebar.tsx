import { Check, Phone } from 'lucide-react'

import { siteConfig } from '@/config/site'

const TRUST_POINTS = [
  'Average 48-hour candidate shortlist submission',
  'Pre-screened and reference-checked talent',
  '90-day replacement guarantee on permanent hires',
  'Dedicated account manager assigned',
  'Active across North America',
] as const

export default function TrustSidebar(): React.ReactNode {
  const telHref = `tel:${siteConfig.phone.replace(/[^+\d]/g, '')}`

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-card border border-vx-border bg-white p-7 shadow-card">
        <h3 className="mb-5 font-display text-base font-bold text-vx-navy">
          Why companies trust us
        </h3>
        <ul className="flex flex-col gap-4">
          {TRUST_POINTS.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-vx-blue-lt">
                <Check className="h-3 w-3 text-vx-blue" aria-hidden />
              </div>
              <span className="font-body text-sm leading-snug text-vx-body">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-card border border-vx-border bg-white p-7 shadow-card">
        <p className="mb-3 font-body text-[11px] font-bold uppercase tracking-[0.15em] text-vx-blue">
          Prefer to talk?
        </p>
        <p className="mb-1.5 font-body text-base font-semibold text-vx-navy">
          Call us directly
        </p>
        <p className="mb-5 font-body text-sm text-vx-muted">{siteConfig.officeHours}.</p>
        <a
          href={telHref}
          className="flex items-center gap-2 font-body text-sm font-semibold text-vx-navy transition-colors hover:text-vx-blue"
        >
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-vx-blue-lt">
            <Phone className="h-4 w-4 text-vx-blue" aria-hidden />
          </span>
          {siteConfig.phone}
        </a>
      </div>
    </div>
  )
}

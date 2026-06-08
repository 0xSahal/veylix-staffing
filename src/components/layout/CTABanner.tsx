import Link from 'next/link'

import MagneticButton from '@/components/ui/MagneticButton'

type CTAButton = {
  label: string
  href: string
  primary?: boolean
}

type CTABannerProps = {
  heading: string
  subheading?: string
  buttons: CTAButton[]
}

export default function CTABanner({
  heading,
  subheading,
  buttons,
}: CTABannerProps): React.ReactNode {
  return (
    <section className="bg-gradient-hero py-16 sm:py-20">
      <div className="container-vx text-center">
        <h2 className="heading-h2 text-white">{heading}</h2>
        {subheading && (
          <p className="mx-auto mt-4 max-w-xl font-body text-lg text-white/70">
            {subheading}
          </p>
        )}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {buttons.map((btn) =>
            btn.primary !== false ? (
              <MagneticButton key={btn.href} href={btn.href} className="btn-primary">
                {btn.label}
              </MagneticButton>
            ) : (
              <Link
                key={btn.href}
                href={btn.href}
                className="btn-ghost-white inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold"
              >
                {btn.label}
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  )
}

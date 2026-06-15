import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/common/Container'
import { type BreadcrumbItem } from '@/components/layout/Breadcrumbs'
import HeroImageOverlay from '@/components/layout/HeroImageOverlay'
import { routes } from '@/config/routes'
import { heroImageClassName } from '@/lib/hero-image-position'

type PageHeroProps = {
  title: string
  tagline?: string
  breadcrumbs: BreadcrumbItem[]
  eyebrow?: string
  imageSrc?: string
  imageAlt?: string
}

export default function PageHero({
  title,
  tagline,
  breadcrumbs,
  eyebrow,
  imageSrc = '/images/about-sitting-group.webp',
  imageAlt = '',
}: PageHeroProps): React.ReactNode {
  return (
    <section className="relative flex min-h-[300px] items-center justify-center overflow-hidden sm:min-h-[360px]">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className={heroImageClassName(imageSrc)}
          sizes="100vw"
        />
        <HeroImageOverlay />
      </div>

      <Container className="relative z-10 py-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <nav
            aria-label="Breadcrumb"
            className="mb-7 flex flex-wrap items-center justify-center gap-2 font-body text-[13px] font-medium text-white/50"
          >
            <Link href={routes.home} className="transition-colors hover:text-white/80">
              Home
            </Link>
            {breadcrumbs.map((item) => (
              <span
                key={item.href ?? item.label}
                className="inline-flex items-center gap-2"
              >
                <span className="text-white/30">/</span>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white/80"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{item.label}</span>
                )}
              </span>
            ))}
          </nav>

          {eyebrow && (
            <p className="mb-5 font-body text-[11px] font-bold uppercase tracking-[0.2em] text-[#93C5FD]">
              {eyebrow}
            </p>
          )}

          <h1 className="mb-4 font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
            {title}
          </h1>

          {tagline && (
            <p className="max-w-md font-body text-base leading-relaxed text-white/70 md:text-lg">
              {tagline}
            </p>
          )}
        </div>
      </Container>
    </section>
  )
}

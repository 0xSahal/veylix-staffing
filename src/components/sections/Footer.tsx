'use client'

import { useState, useTransition } from 'react'

import Link from 'next/link'

import { Clock, Mail, MapPin, Phone } from 'lucide-react'

import { newsletterSubscribe } from '@/app/actions/forms'
import SocialIcon from '@/components/ui/SocialIcon'
import VeylixLogo from '@/components/ui/VeylixLogo'
import { footerJobSeekerLinks, footerQuickLinks } from '@/config/navigation'
import { routes, solutionRoutes } from '@/config/routes'
import { siteConfig } from '@/config/site'

const footerColumnHeading =
  'text-[11px] font-bold uppercase tracking-[0.15em] text-[#94a3b8]'

const footerLink =
  'inline-block text-sm text-[#334155] transition-all duration-300 hover:translate-x-1 hover:text-[#2563eb]'

export default function Footer(): React.ReactNode {
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const form = e.currentTarget
    const email = new FormData(form).get('email')
    if (typeof email !== 'string') return

    startTransition(async () => {
      const result = await newsletterSubscribe({ email })
      if (result.success) {
        setSubscribed(true)
        setError(null)
      } else {
        setError(result.error ?? 'Something went wrong.')
      }
    })
  }

  return (
    <footer>
      <div className="border-b border-white/[0.08] bg-vx-navy">
        <div className="container-vx py-14">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div>
              <h3 className="font-display text-[28px] font-bold text-white">
                Stay ahead of the
                <br />
                talent market.
              </h3>
              <p className="mt-2 text-sm text-[#64748B]">
                Salary ranges, hiring notes, and straight answers from recruiters in the
                field. Twice a month. No filler.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-2 sm:flex-row sm:overflow-hidden sm:rounded-btn sm:border sm:border-white/10 sm:bg-white/[0.05] lg:max-w-sm"
            >
              <input
                type="email"
                name="email"
                required
                disabled={subscribed || isPending}
                placeholder={subscribed ? "You're subscribed!" : 'Your work email'}
                className="flex-1 rounded-btn border border-white/10 bg-white/[0.05] px-5 py-3.5 text-sm text-white placeholder-[#475569] focus:outline-none focus:ring-2 focus:ring-vx-blue disabled:opacity-70 sm:border-0 sm:bg-transparent"
                aria-label="Subscribe to Veylix newsletter"
              />
              <button
                type="submit"
                disabled={subscribed || isPending}
                className="flex-shrink-0 rounded-btn bg-vx-blue px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-vx-blue-dark disabled:opacity-70"
              >
                {subscribed && 'Subscribed ✓'}
                {!subscribed && isPending && '…'}
                {!subscribed && !isPending && 'Subscribe →'}
              </button>
            </form>
            {error && (
              <p className="text-sm text-red-400 lg:absolute lg:bottom-4 lg:right-[120px]">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-[#f8f9fc] px-6 py-16 md:px-12 lg:px-[120px] lg:py-20">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-12">
          <div className="col-span-2 sm:col-span-1 lg:col-span-1">
            <Link href="/" aria-label={siteConfig.name} className="inline-flex">
              <VeylixLogo variant="footer" />
            </Link>
            <p className="mt-4 max-w-[240px] text-sm leading-relaxed text-[#475569]">
              Hiring partners for teams that want the right person, not just a warm body.
            </p>
            <div className="mt-8 flex gap-3">
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
                  aria-label={`Veylix on ${name}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1e293b]/25 text-[#1e293b] transition-colors hover:border-[#2563eb] hover:text-[#2563eb]"
                >
                  <SocialIcon name={name} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className={footerColumnHeading}>Quick Links</p>
            <ul className="mt-4 space-y-3">
              {footerQuickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={footerColumnHeading}>Solutions</p>
            <ul className="mt-4 space-y-3">
              {solutionRoutes.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={footerColumnHeading}>Job Seekers</p>
            <ul className="mt-4 space-y-3">
              {footerJobSeekerLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className={`${footerColumnHeading} mt-8`}>Contact Info</p>
            <ul className="mt-4 space-y-3 text-sm text-[#475569]">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-[#94a3b8]" />
                {siteConfig.address}
              </li>
              <li className="flex items-start gap-2">
                <Phone size={14} className="mt-0.5 shrink-0 text-[#94a3b8]" />
                <a
                  href={`tel:${siteConfig.phone.replace(/\D/g, '')}`}
                  className="hover:text-[#2563eb]"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={14} className="mt-0.5 shrink-0 text-[#94a3b8]" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-[#2563eb]">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="mt-0.5 shrink-0 text-[#94a3b8]" />
                {siteConfig.officeHours}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06] bg-[#0d1117] px-6 py-5 md:px-12 lg:px-[120px]">
        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-[13px] text-[#64748b]">
            © 2026 {siteConfig.name}. All Rights Reserved.
          </p>
          <nav className="flex gap-4 text-[13px] text-[#64748b]" aria-label="Legal">
            <Link href={routes.privacy} className="hover:text-[#94a3b8]">
              Privacy Policy
            </Link>
            <span aria-hidden="true">·</span>
            <Link href={routes.terms} className="hover:text-[#94a3b8]">
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

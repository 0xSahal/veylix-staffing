'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { AnimatePresence, m } from 'framer-motion'
import { ChevronDown, Mail, Phone, X } from 'lucide-react'

import MagneticButton from '@/components/ui/MagneticButton'
import VeylixLogo from '@/components/ui/VeylixLogo'
import { navItems, type NavItem } from '@/config/navigation'
import { isActivePath } from '@/config/routes'
import { CONTACT_PHONE_ENABLED, siteConfig } from '@/config/site'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/lib/utils'

function navItemActive(pathname: string, item: NavItem): boolean {
  if (item.children?.length) {
    return (
      isActivePath(pathname, item.href) ||
      item.children.some((c) => isActivePath(pathname, c.href))
    )
  }
  return isActivePath(pathname, item.href)
}

export default function Navbar(): React.ReactNode {
  const pathname = usePathname()
  const scrolled = useScrolled(20)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)

  const linkItems = navItems.filter((item) => !item.cta)
  const ctaItem = navItems.find((item) => item.cta)

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const linkColor = 'text-vx-body'
  const inactiveHover = 'hover:text-vx-blue'

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 h-[var(--navbar-height,92px)] w-full transition-all duration-400 ease-in-out',
          scrolled
            ? 'border-b border-black/[0.06] bg-white/[0.88] shadow-[0_4px_30px_rgba(0,0,0,0.04)] backdrop-blur-[20px] backdrop-saturate-[180%]'
            : 'bg-transparent'
        )}
      >
        <div className="container-vx relative flex h-full items-center">
          <Link
            href="/"
            className="flex shrink-0 items-center transition-[filter] duration-300 hover:brightness-110"
            aria-label={siteConfig.name}
          >
            <VeylixLogo variant="header" size={60} priority />
          </Link>

          {isDesktop && (
            <nav className="flex flex-1 items-center justify-center gap-1">
              {linkItems.map((item) => {
                const isActive = navItemActive(pathname, item)
                const hasChildren = Boolean(item.children?.length)

                if (!hasChildren) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'group relative px-3 py-2 font-body text-[15px] font-medium transition-colors duration-250',
                        isActive ? 'text-vx-blue' : linkColor,
                        !isActive && inactiveHover
                      )}
                    >
                      {item.label}
                      <span
                        className={cn(
                          'absolute bottom-0 left-3 right-3 h-0.5 bg-vx-blue transition-all duration-250',
                          isActive
                            ? 'w-[calc(100%-24px)]'
                            : 'w-0 group-hover:w-[calc(100%-24px)]'
                        )}
                      />
                    </Link>
                  )
                }

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      type="button"
                      className={cn(
                        'flex items-center gap-1 px-3 py-2 font-body text-[15px] font-medium transition-colors duration-250',
                        isActive ? 'text-vx-blue' : linkColor,
                        !isActive && inactiveHover
                      )}
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={cn(
                          'transition-transform duration-200',
                          openDropdown === item.label && 'rotate-180'
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <m.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-full z-50 min-w-[220px] rounded-card border border-vx-border bg-white py-2 shadow-card"
                        >
                          {item.children?.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                'block px-4 py-2.5 font-body text-sm transition-colors hover:bg-vx-off hover:text-vx-blue',
                                isActivePath(pathname, child.href)
                                  ? 'font-semibold text-vx-blue'
                                  : 'text-vx-body'
                              )}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </nav>
          )}

          {isDesktop && ctaItem && (
            <div className="flex shrink-0 items-center">
              <MagneticButton
                href={ctaItem.href}
                className="btn-primary h-10 px-5 text-sm"
              >
                {ctaItem.label}
              </MagneticButton>
            </div>
          )}

          {!isDesktop && (
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className={cn('relative ml-auto flex h-6 w-7 flex-shrink-0', linkColor)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <m.span
                className="absolute left-0 top-1 block h-0.5 w-full bg-current"
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              />
              <m.span
                className="absolute left-0 top-3 block h-0.5 w-full bg-current"
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <m.span
                className="absolute left-0 top-5 block h-0.5 w-full bg-current"
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              />
            </button>
          )}
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && !isDesktop && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] flex flex-col overflow-y-auto bg-vx-navy px-6 pb-10 pt-24"
          >
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center text-white"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            <nav className="flex flex-col gap-1">
              {navItems.map((item, index) => {
                if (item.cta) {
                  return (
                    <m.div
                      key={item.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="mt-4"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="btn-primary inline-flex w-full justify-center"
                      >
                        {item.label}
                      </Link>
                    </m.div>
                  )
                }

                const hasChildren = Boolean(item.children?.length)
                const expanded = mobileExpanded === item.label

                return (
                  <m.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="border-b border-white/[0.08] py-2"
                  >
                    {hasChildren ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setMobileExpanded(expanded ? null : item.label)}
                          className="flex w-full items-center justify-between font-display text-2xl font-bold text-white"
                        >
                          {item.label}
                          <ChevronDown
                            size={22}
                            className={cn(
                              'transition-transform',
                              expanded && 'rotate-180'
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {expanded && (
                            <m.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="mt-3 space-y-2 overflow-hidden pl-2"
                            >
                              {item.children?.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="font-body text-base text-white/70 hover:text-white"
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </m.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="font-display text-2xl font-bold text-white"
                      >
                        {item.label}
                      </Link>
                    )}
                  </m.div>
                )
              })}
            </nav>

            <div className="mt-10 flex flex-col gap-2">
              {CONTACT_PHONE_ENABLED && (
                <a
                  href={`tel:${siteConfig.phone.replace(/\D/g, '')}`}
                  className="flex items-center gap-2 text-sm text-white/40"
                >
                  <Phone size={14} />
                  {siteConfig.phone}
                </a>
              )}
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 text-sm text-white/40"
              >
                <Mail size={14} />
                {siteConfig.email}
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}

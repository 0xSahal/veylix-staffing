import Link from 'next/link'

import { ChevronRight } from 'lucide-react'

import { routes } from '@/config/routes'

export type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps): React.ReactNode {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mt-4 flex flex-wrap items-center gap-1.5 font-body text-sm text-white/60"
    >
      <Link href={routes.home} className="transition-colors hover:text-white">
        Home
      </Link>
      {items.map((item) => (
        <span key={item.href ?? item.label} className="inline-flex items-center gap-1.5">
          <ChevronRight size={14} className="text-white/40" aria-hidden />
          {item.href ? (
            <Link href={item.href} className="transition-colors hover:text-white">
              {item.label}
            </Link>
          ) : (
            <span className="text-white/90">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

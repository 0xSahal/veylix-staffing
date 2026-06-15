'use client'

import { useState, useTransition } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { sidebarReachOut } from '@/app/actions/forms'
import { solutionRoutes } from '@/config/routes'
import { formFieldString } from '@/lib/form'
import { cn } from '@/lib/utils'

const INTEREST_OPTIONS = [
  'Temporary Staffing',
  'Direct Hire',
  'Contract to Hire',
  'Executive Search',
  'General Inquiry',
]

type ServiceSidebarProps = {
  currentPath: string
}

export default function ServiceSidebar({
  currentPath,
}: ServiceSidebarProps): React.ReactNode {
  const pathname = usePathname()
  const active = currentPath || pathname
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await sidebarReachOut({
        name: formFieldString(fd, 'name'),
        email: formFieldString(fd, 'email'),
        interest: formFieldString(fd, 'interest'),
      })
      if (result.success) {
        setSent(true)
        setError(null)
      } else {
        setError(result.error ?? 'Please check your details.')
      }
    })
  }

  return (
    <aside className="space-y-8 lg:sticky lg:top-28">
      <div className="rounded-card border border-vx-border bg-white p-6 shadow-card">
        <h3 className="font-display text-lg font-semibold text-vx-navy">Our Services</h3>
        <ul className="mt-4 space-y-2">
          {solutionRoutes.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'block rounded-lg px-3 py-2 font-body text-sm transition-colors',
                  active === item.href
                    ? 'bg-vx-blue-lt font-semibold text-vx-blue'
                    : 'text-vx-body hover:bg-vx-off hover:text-vx-blue'
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-card border border-vx-border bg-vx-off p-6">
        <h3 className="font-display text-lg font-semibold text-vx-navy">Reach Out</h3>
        {sent ? (
          <p className="mt-4 text-sm text-vx-green">
            Thanks! We&apos;ll be in touch shortly.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <input
              name="name"
              required
              placeholder="Your name"
              className="w-full rounded-input border border-vx-border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-vx-blue"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email address"
              className="w-full rounded-input border border-vx-border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-vx-blue"
            />
            <select
              name="interest"
              required
              defaultValue=""
              className="w-full rounded-input border border-vx-border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-vx-blue"
            >
              <option value="" disabled>
                Area of interest
              </option>
              {INTEREST_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {error && <p className="text-xs text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={isPending}
              className="btn-primary w-full text-sm disabled:opacity-70"
            >
              {isPending ? 'Sending…' : 'Send'}
            </button>
          </form>
        )}
      </div>
    </aside>
  )
}

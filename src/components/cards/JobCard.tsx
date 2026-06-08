import Link from 'next/link'

import { MapPin } from 'lucide-react'

import { routes } from '@/config/routes'
import { cn } from '@/lib/utils'

export type JobType =
  | 'Direct Hire'
  | 'Contract'
  | 'Part-Time'
  | 'Contract to Hire'
  | 'C2C'

export type JobListing = {
  id: string
  title: string
  location: string
  salary: string
  experience: string
  type: JobType
  postedAgo: string
  companyInitials: string
}

const badgeStyles: Record<string, string> = {
  'Direct Hire': 'bg-vx-blue-lt text-vx-blue',
  Contract: 'bg-orange-100 text-orange-700',
  'Part-Time': 'bg-green-100 text-green-700',
  'Contract to Hire': 'bg-orange-100 text-orange-700',
  C2C: 'bg-purple-100 text-purple-700',
}

type JobCardProps = {
  job: JobListing
}

export default function JobCard({ job }: JobCardProps): React.ReactNode {
  return (
    <article className="flex h-full flex-col rounded-card border border-vx-border bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover">
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            'rounded-full px-3 py-1 text-xs font-semibold',
            badgeStyles[job.type] ?? badgeStyles['Direct Hire']
          )}
        >
          {job.type}
        </span>
        <span className="text-xs text-vx-muted">Posted {job.postedAgo}</span>
      </div>
      <p className="mt-3 font-mono text-xs text-vx-muted">{job.id}</p>
      <div className="mt-4 flex items-start gap-4">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-vx-off font-display text-sm font-bold text-vx-navy"
          aria-hidden
        >
          {job.companyInitials}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xl font-semibold text-vx-navy">{job.title}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-vx-muted">
            <MapPin size={14} className="shrink-0" />
            {job.location}
          </p>
          <p className="mt-2 font-body text-sm font-medium text-vx-body">{job.salary}</p>
          <span className="mt-2 inline-block rounded-full bg-vx-off px-2.5 py-0.5 text-xs text-vx-muted">
            {job.experience}
          </span>
        </div>
      </div>
      <Link
        href={`${routes.apply}?job=${encodeURIComponent(job.id)}`}
        className="btn-primary mt-6 inline-flex w-full justify-center text-sm"
      >
        Apply Now
      </Link>
    </article>
  )
}

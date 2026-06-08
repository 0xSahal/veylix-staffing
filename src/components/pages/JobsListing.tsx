'use client'

import { useMemo, useState } from 'react'

import Link from 'next/link'

import JobCard, { type JobListing } from '@/components/cards/JobCard'
import { routes } from '@/config/routes'
import { JOB_CATEGORIES, WORK_STATUS_FILTERS } from '@/constants/pages/jobs'
import { cn } from '@/lib/utils'

type JobsListingProps = {
  jobs: JobListing[]
}

function matchesWorkStatus(job: JobListing, filter: string): boolean {
  if (filter === 'All') return true
  if (filter === 'Full-Time') return job.type === 'Direct Hire'
  if (filter === 'Contract') return job.type === 'Contract'
  if (filter === 'Part-Time') return job.type === 'Part-Time'
  if (filter === 'C2C') return job.type === 'C2C'
  return true
}

function matchesCategory(job: JobListing, category: string): boolean {
  if (category === 'All') return true
  const title = job.title.toLowerCase()
  if (category === 'IT') return /software|devops|data scientist/i.test(job.title)
  if (category === 'HR') return /human resources|talent acquisition/i.test(job.title)
  if (category === 'Finance')
    return /financial|analyst/i.test(job.title) && !/business/i.test(title)
  if (category === 'Engineering') return /engineer|devops/i.test(job.title)
  if (category === 'Admin') return /administrative|coordinator/i.test(job.title)
  if (category === 'Executive') return /manager|director/i.test(job.title)
  return true
}

export default function JobsListing({ jobs }: JobsListingProps): React.ReactNode {
  const [workStatus, setWorkStatus] = useState('All')
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase()
    const loc = location.trim().toLowerCase()
    return jobs.filter((job) => {
      if (!matchesWorkStatus(job, workStatus)) return false
      if (!matchesCategory(job, category)) return false
      if (
        q &&
        !job.title.toLowerCase().includes(q) &&
        !job.id.toLowerCase().includes(q)
      ) {
        return false
      }
      if (loc && !job.location.toLowerCase().includes(loc)) return false
      return true
    })
  }, [jobs, workStatus, keyword, location, category])

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-vx-border pb-4">
        {WORK_STATUS_FILTERS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setWorkStatus(tab)}
            className={cn(
              'rounded-btn px-4 py-2 text-sm font-medium transition-colors',
              workStatus === tab
                ? 'bg-vx-blue text-white'
                : 'bg-vx-off text-vx-body hover:text-vx-blue'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <input
          type="search"
          placeholder="Search by keyword or job #"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="rounded-input border border-vx-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-vx-blue"
          aria-label="Search jobs"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="rounded-input border border-vx-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-vx-blue"
          aria-label="Filter by location"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-input border border-vx-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-vx-blue"
          aria-label="Filter by category"
        >
          {JOB_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c === 'All' ? 'All Categories' : `${c} Jobs`}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center font-body text-vx-muted">
          No jobs match your filters. Try adjusting your search or{' '}
          <Link href={routes.apply} className="text-vx-blue underline">
            submit your resume
          </Link>
          .
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}

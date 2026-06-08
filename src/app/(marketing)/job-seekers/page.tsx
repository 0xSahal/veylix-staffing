import { routes } from '@/config/routes'
import { createPageMetadata } from '@/lib/metadata'

import JobSeekersPage from './JobSeekersPage'

export const metadata = createPageMetadata({
  title: 'For Job Seekers',
  description:
    'Find work that fits who you are. Career matching, interview prep, and salary negotiation support, at no cost to you.',
  path: routes.jobSeekers,
})

export default function JobSeekersRoutePage(): React.ReactNode {
  return <JobSeekersPage />
}

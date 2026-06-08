import { notFound } from 'next/navigation'

import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout'
import { routes } from '@/config/routes'
import { getSolutionBySlug } from '@/data/solutions'
import { createPageMetadata } from '@/lib/metadata'

const solution = getSolutionBySlug('executive-search')

export const metadata = solution
  ? createPageMetadata({
      title: solution.title,
      description: solution.overviewBody.slice(0, 160),
      path: routes.executiveSearch,
    })
  : {}

export default function ExecutiveSearchPage(): React.ReactNode {
  if (!solution) return notFound()
  return <SolutionPageLayout solution={solution} />
}

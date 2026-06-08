import { Briefcase, CheckSquare, Rocket, Search, Users } from 'lucide-react'

import type { LucideIcon } from 'lucide-react'

export type ProcessStep = {
  number: string
  title: string
  body: string
  icon: LucideIcon
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery Call',
    body: "You walk us through the role, timeline, culture, and what's already been tried. More context up front means fewer wrong names later.",
    icon: Search,
  },
  {
    number: '02',
    title: 'Job Architecture',
    body: "We write a real candidate brief, not a recycled job post. Most agencies skip this step. We don't.",
    icon: Briefcase,
  },
  {
    number: '03',
    title: 'Talent Sourcing',
    body: 'Database, LinkedIn, referrals, and direct outreach. We go where strong candidates actually are, not where everyone else is posting.',
    icon: Users,
  },
  {
    number: '04',
    title: 'Vetting & Shortlist',
    body: "Interviewed, reference-checked, and screened for fit. You only meet people we'd put on our own team.",
    icon: CheckSquare,
  },
  {
    number: '05',
    title: 'Placement & Support',
    body: "Offer support, start date, then check-ins at 30, 60, and 90 days. A good hire isn't done when they sign.",
    icon: Rocket,
  },
]

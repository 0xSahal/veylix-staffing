import {
  Clock,
  FileCheck,
  Briefcase,
  Layers,
  Shield,
  UserCheck,
  ClipboardList,
  Search,
  UserPlus,
  Repeat,
} from 'lucide-react'

import type { BenefitItem } from '@/components/layout/BenefitGrid'
import type { ProcessStep } from '@/components/layout/ProcessSteps'
import { routes } from '@/config/routes'
import { siteConfig } from '@/config/site'

import type { LucideIcon } from 'lucide-react'

const currentYear = new Date().getFullYear()
const yearsOfExperience = currentYear - siteConfig.foundedYear

export const employerStats = [
  { end: yearsOfExperience, suffix: '+', label: 'Years of Experience' },
  { end: 150, suffix: '+', label: 'Companies Partnered' },
  { end: 500, suffix: '+', label: 'Recruitments Completed' },
] as const

export const employerProcessSteps: ProcessStep[] = [
  {
    step: 'Step 1',
    title: 'Tell Us Your Needs',
    body: 'Fill out our job order form with your requirements, timeline, and ideal candidate profile.',
    icon: ClipboardList,
  },
  {
    step: 'Step 2',
    title: 'We Source & Screen',
    body: 'We tap our network to find pre-vetted candidates who match your skills and culture criteria.',
    icon: Search,
  },
  {
    step: 'Step 3',
    title: 'You Hire with Confidence',
    body: 'Interview, select, and onboard the best fit with our support through offer and start date.',
    icon: UserPlus,
  },
]

export const employerBenefits: BenefitItem[] = [
  {
    icon: Clock,
    title: 'Fast Turnaround',
    body: 'Qualified candidates typically submitted within 24 to 48 hours.',
  },
  {
    icon: FileCheck,
    title: 'Pre-Screened Candidates',
    body: 'Skills, references, and background checks handled before you interview.',
  },
  {
    icon: Briefcase,
    title: 'Industry Expertise',
    body: 'Recruiters who understand your sector’s talent landscape and compliance needs.',
  },
  {
    icon: Layers,
    title: 'Flexible Engagement Models',
    body: 'Temporary, contract, direct hire, and executive search under one roof.',
  },
  {
    icon: Shield,
    title: 'Compliance Handled',
    body: 'We manage employment overhead and compliance for contract and temporary staff.',
  },
  {
    icon: UserCheck,
    title: 'Dedicated Account Manager',
    body: 'A single point of contact who knows your business and hiring history.',
  },
]

export type EmployerSolution = {
  title: string
  description: string
  href: string
  icon: LucideIcon
}

export const employerSolutions: EmployerSolution[] = [
  {
    title: 'Temporary Staffing',
    description:
      'Flexible workforce solutions for seasonal demand, project-based work, or short-term coverage gaps.',
    href: routes.temporaryStaffing,
    icon: Clock,
  },
  {
    title: 'Direct Hire',
    description:
      'Full-cycle permanent placement for roles that require long-term cultural and technical fit.',
    href: routes.directHire,
    icon: Briefcase,
  },
  {
    title: 'Contract to Hire',
    description:
      'Try before you commit. Evaluate candidates on the job before converting to permanent.',
    href: routes.contractToHire,
    icon: Repeat,
  },
  {
    title: 'Executive Search',
    description:
      'Confidential, research-driven recruitment for senior leadership and C-suite positions.',
    href: routes.executiveSearch,
    icon: Search,
  },
]

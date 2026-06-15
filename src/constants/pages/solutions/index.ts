import type { TabItem } from '@/components/layout/TabsSection'
import { routes } from '@/config/routes'

export type SolutionPageData = {
  slug: string
  path: string
  title: string
  tagline: string
  introHeading: string
  introBody: string
  imageSeed: string
  roleCards: { title: string; roles: string[] }[]
  tabs?: TabItem[]
  variant?: 'default' | 'executive'
}

const advantages = [
  'Qualified, Pre-Screened Candidates',
  'Reduce Hiring Costs',
  'Access Our Broad Talent Network',
  'Save Time on Sourcing',
  'Scale Up or Down Instantly',
  'Boost Team Productivity',
] as const

export const SERVICE_ADVANTAGES = [...advantages]

export const solutions: Record<string, SolutionPageData> = {
  temporary: {
    slug: 'temporary',
    path: routes.temporaryStaffing,
    title: 'Temporary Staffing',
    tagline: 'Flexible solutions for your short-term needs',
    introHeading: 'Flexible, Dependable Staffing for Any Timeline',
    introBody:
      "We offer temporary staffing solutions tailored to your short-term and project-based needs. Whether scaling up for a seasonal rush, covering unexpected absences, or needing specialized skills for a limited time — we've got you covered. Our curated pool of pre-vetted candidates means you get the right talent, right when you need it — no long-term commitments required.",
    imageSeed: 'temp',
    roleCards: [
      {
        title: 'Administration Roles',
        roles: [
          'Office Coordinator',
          'Receptionist',
          'Facilities Manager',
          'Data Entry Clerk',
          'Executive Assistant',
        ],
      },
      {
        title: 'Human Resources Roles',
        roles: [
          'HR Coordinator',
          'HR Receptionist',
          'HR Specialist',
          'HR Data Entry',
          'Talent Acquisition',
        ],
      },
      {
        title: 'Customer Support Roles',
        roles: [
          'Customer Service Rep',
          'Call Center Agent',
          'Customer Success Coordinator',
          'Support Specialist',
        ],
      },
    ],
    tabs: [
      {
        id: 'short',
        label: 'Short-Term Hiring',
        content:
          'Roles lasting days to weeks. Ideal for project coverage, peak periods, or event support.',
      },
      {
        id: 'lastminute',
        label: 'Last-Minute Hiring',
        content:
          'Rapid response to sudden vacancies. We can submit candidates within 24 hours.',
      },
      {
        id: 'immediate',
        label: 'Immediate Hiring',
        content:
          'Same-day or next-day staffing for urgent situations. Our on-call bench handles critical needs.',
      },
    ],
  },
  direct: {
    slug: 'direct',
    path: routes.directHire,
    title: 'Direct Hire',
    tagline: 'Permanent talent solutions built for long-term success',
    introHeading: 'Permanent Placements That Last',
    introBody:
      'We take time to understand your unique hiring needs and work closely to find the right permanent candidates. Our direct hire solutions deliver top talent swiftly, ensuring a seamless and efficient hiring process. By focusing on your specific requirements, we connect you with exceptional professionals who become lasting contributors.',
    imageSeed: 'direct',
    roleCards: [
      {
        title: 'Technology Leaders',
        roles: [
          'Technical Lead',
          'Software Architect',
          'Engineering Manager',
          'VP of Engineering',
        ],
      },
      {
        title: 'Human Resources',
        roles: [
          'HR Director',
          'Talent Acquisition Manager',
          'HR Business Partner',
          'Chief People Officer',
        ],
      },
      {
        title: 'Operations & Management',
        roles: [
          'Project Manager',
          'Operations Director',
          'Product Manager',
          'Quality Assurance Lead',
        ],
      },
    ],
  },
  c2h: {
    slug: 'c2h',
    path: routes.contractToHire,
    title: 'Contract to Hire',
    tagline: 'Try before you hire — the smart path to permanent placement',
    introHeading: 'Evaluate Talent on the Job',
    introBody:
      'Contract-to-hire gives you the flexibility to evaluate candidates in a real work environment before making a permanent commitment. It reduces hiring risk, allows cultural fit assessment, and often accelerates onboarding. We handle all contract administration, payroll, and compliance during the evaluation period.',
    imageSeed: 'c2h',
    roleCards: [
      {
        title: 'Software Development',
        roles: [
          'Frontend Developer',
          'Backend Developer',
          'Full-Stack Engineer',
          'QA Engineer',
        ],
      },
      {
        title: 'IT Operations',
        roles: [
          'Systems Administrator',
          'Network Engineer',
          'DevOps Engineer',
          'Cloud Architect',
        ],
      },
      {
        title: 'Analytics & Data',
        roles: [
          'Data Analyst',
          'Business Intelligence Developer',
          'Data Scientist',
          'Reporting Analyst',
        ],
      },
    ],
  },
  executive: {
    slug: 'executive',
    path: routes.executiveSearch,
    title: 'Executive Search',
    tagline: 'Identifying the leaders who will define your future',
    introHeading: 'Transformational Leadership',
    introBody:
      'Our executive search practice is built for finding transformational leaders — the kind who shape culture, drive strategy, and deliver results. We use a confidential, research-led approach to identify, engage, and present only the highest-caliber candidates for your most critical roles.',
    imageSeed: 'executive',
    variant: 'executive',
    roleCards: [
      {
        title: 'C-Suite Leadership',
        roles: [
          'Chief Executive Officer (CEO)',
          'Chief Operating Officer (COO)',
          'Chief Technology Officer (CTO)',
          'Chief Strategy Officer (CSO)',
          'Chief Legal Officer (CLO)',
        ],
      },
      {
        title: 'Finance Leadership',
        roles: [
          'Chief Financial Officer (CFO)',
          'VP of Finance',
          'Financial Controller',
          'Treasurer',
          'Director of Financial Planning',
        ],
      },
      {
        title: 'Marketing & Growth',
        roles: [
          'Chief Marketing Officer (CMO)',
          'VP of Marketing',
          'Brand Strategist',
          'Head of Digital',
          'Product Marketing Lead',
        ],
      },
    ],
  },
}

export function getSolutionByPath(path: string): SolutionPageData | undefined {
  return Object.values(solutions).find((s) => s.path === path)
}

import { routes } from '@/config/routes'

export type ServiceCard = {
  label: string
  title: string
  body: string
  image: string
  alt: string
  href: string
  highlights: string[]
}

export const SERVICE_CARDS: ServiceCard[] = [
  {
    label: 'PERMANENT',
    title: 'Permanent Placement',
    body: "Hires who ramp fast and stay. Skills get them in the door; fit with your team and where you're headed is what keeps them.",
    image:
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80&fit=crop',
    alt: 'Professional recruitment consultants reviewing permanent placement candidates',
    href: routes.directHire,
    highlights: [
      'Skills and culture-fit screening',
      '90-day replacement guarantee',
      'Hires built to stay, not just start',
    ],
  },
  {
    label: 'CONTRACT',
    title: 'Contract & Temporary',
    body: 'People for a project spike, a leave cover, or a gap you need filled yesterday. Vetted, briefed, and ready to work. No long-term commitment.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80&fit=crop',
    alt: 'Contract team working on a high-stakes project in an open office',
    href: routes.temporaryStaffing,
    highlights: [
      'First shortlist within 72 hours',
      'No long-term commitment',
      'Vetted, briefed, and ready to work',
    ],
  },
  {
    label: 'EXECUTIVE',
    title: 'Executive Search',
    body: 'C-suite, VP, and director searches, handled quietly. We reach people who are not scrolling job boards and would take the right call.',
    image:
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80&fit=crop',
    alt: 'Executive leader in a boardroom setting, senior leadership placement',
    href: routes.executiveSearch,
    highlights: [
      'Confidential C-suite, VP, and director searches',
      'Reach people who are not on job boards',
      'Industry specialists, not generalists',
    ],
  },
  {
    label: 'RPO',
    title: 'Recruitment Process Outsourcing',
    body: 'Your HR team stays lean. We run sourcing, screening, scheduling, and offers as an extension of your team, at the volume you need.',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&fit=crop',
    alt: 'Recruitment process outsourcing team managing enterprise talent pipeline',
    href: routes.contact,
    highlights: [
      'Sourcing through offers, handled for you',
      'Scale up or down with hiring volume',
      'Your HR team stays lean',
    ],
  },
]

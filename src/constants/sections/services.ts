import { routes } from '@/config/routes'

export type ServiceCard = {
  label: string
  title: string
  body: string
  image: string
  alt: string
  href: string
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
  },
  {
    label: 'CONTRACT',
    title: 'Contract & Temporary',
    body: 'People for a project spike, a leave cover, or a gap you need filled yesterday. Vetted, briefed, and ready to work. No long-term commitment.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80&fit=crop',
    alt: 'Contract team working on a high-stakes project in an open office',
    href: routes.temporaryStaffing,
  },
  {
    label: 'EXECUTIVE',
    title: 'Executive Search',
    body: 'C-suite, VP, and director searches, handled quietly. We reach people who are not scrolling job boards and would take the right call.',
    image:
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80&fit=crop',
    alt: 'Executive leader in a boardroom setting, senior leadership placement',
    href: routes.executiveSearch,
  },
  {
    label: 'RPO',
    title: 'Recruitment Process Outsourcing',
    body: 'Your HR team stays lean. We run sourcing, screening, scheduling, and offers as an extension of your team, at the volume you need.',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&fit=crop',
    alt: 'Recruitment process outsourcing team managing enterprise talent pipeline',
    href: routes.contact,
  },
]

export const FEATURE_DOT_POSITIONS: { top: string; left: string }[] = [
  { top: '8%', left: '12%' },
  { top: '15%', left: '78%' },
  { top: '22%', left: '45%' },
  { top: '30%', left: '88%' },
  { top: '38%', left: '22%' },
  { top: '45%', left: '65%' },
  { top: '52%', left: '8%' },
  { top: '58%', left: '92%' },
  { top: '65%', left: '35%' },
  { top: '72%', left: '72%' },
  { top: '78%', left: '18%' },
  { top: '85%', left: '55%' },
  { top: '12%', left: '58%' },
  { top: '42%', left: '48%' },
  { top: '68%', left: '82%' },
  { top: '25%', left: '5%' },
  { top: '55%', left: '38%' },
  { top: '88%', left: '28%' },
  { top: '5%', left: '42%' },
  { top: '48%', left: '15%' },
  { top: '75%', left: '48%' },
]

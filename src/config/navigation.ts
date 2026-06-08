import { industryRoutes, routes, solutionRoutes } from '@/config/routes'

export type NavItem = {
  label: string
  href: string
  children?: NavItem[]
  cta?: boolean
}

export const navItems: NavItem[] = [
  { label: 'Home', href: routes.home },
  {
    label: 'About',
    href: routes.about,
    children: [
      { label: 'About Company', href: routes.about },
      { label: 'Testimonials', href: routes.testimonials },
    ],
  },
  {
    label: 'Employers',
    href: routes.employers,
    children: [
      { label: 'Employers Overview', href: routes.employers },
      { label: 'Place Job Order', href: routes.placeJob },
    ],
  },
  {
    label: 'Solutions',
    href: routes.temporaryStaffing,
    children: solutionRoutes.map((s) => ({ label: s.label, href: s.href })),
  },
  {
    label: 'Industries',
    href: routes.industries,
    children: industryRoutes.map((i) => ({ label: i.label, href: i.href })),
  },
  {
    label: 'Job Seekers',
    href: routes.jobSeekers,
    children: [
      { label: 'Overview', href: routes.jobSeekers },
      { label: 'Job Openings', href: routes.jobs },
      { label: 'Apply Now', href: routes.apply },
    ],
  },
  { label: 'Blog', href: routes.blog },
  { label: 'Contact Us', href: routes.contact, cta: true },
]

export const footerQuickLinks = [
  { label: 'Home', href: routes.home },
  { label: 'About Us', href: routes.about },
  { label: 'Testimonials', href: routes.testimonials },
  { label: 'Employers', href: routes.employers },
  { label: 'Industries', href: routes.industries },
  { label: 'Blog', href: routes.blog },
  { label: 'FAQ', href: routes.faq },
] as const

export const footerJobSeekerLinks = [
  { label: 'Job Seekers Overview', href: routes.jobSeekers },
  { label: 'Job Openings', href: routes.jobs },
  { label: 'Apply Now', href: routes.apply },
] as const

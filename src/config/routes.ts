export const routes = {
  home: '/',
  about: '/about',
  testimonials: '/testimonials',
  employers: '/employers',
  placeJob: '/place-job',
  temporaryStaffing: '/temporary-staffing',
  directHire: '/direct-hire',
  contractToHire: '/contract-to-hire',
  payrolling: '/payrolling',
  training: '/training',
  executiveSearch: '/executive-search',
  industries: '/industries',
  industry: (slug: string) => `/industries/${slug}` as const,
  jobSeekers: '/job-seekers',
  jobs: '/jobs',
  apply: '/apply',
  blog: '/blog',
  blogPost: (slug: string) => `/blog/${slug}` as const,
  contact: '/contact',
  faq: '/faq',
  privacy: '/privacy',
  terms: '/terms',
} as const

export const solutionRoutes = [
  { label: 'Temporary Staffing', href: routes.temporaryStaffing },
  { label: 'Direct Hire', href: routes.directHire },
  { label: 'Contract to Hire', href: routes.contractToHire },
  { label: 'Payrolling', href: routes.payrolling },
  { label: 'Training', href: routes.training },
  { label: 'Executive Search', href: routes.executiveSearch },
] as const

export const industrySlugs = {
  itTechnology: 'it-technology',
  healthcare: 'healthcare',
  financeAccounting: 'finance-accounting',
  engineering: 'engineering',
  administrative: 'administrative',
  manufacturing: 'manufacturing-supply-chain',
} as const

export const industryRoutes = [
  { label: 'IT & Technology', href: routes.industry(industrySlugs.itTechnology) },
  { label: 'Healthcare', href: routes.industry(industrySlugs.healthcare) },
  {
    label: 'Finance & Accounting',
    href: routes.industry(industrySlugs.financeAccounting),
  },
  { label: 'Engineering', href: routes.industry(industrySlugs.engineering) },
  { label: 'Administrative', href: routes.industry(industrySlugs.administrative) },
  {
    label: 'Manufacturing & Supply Chain',
    href: routes.industry(industrySlugs.manufacturing),
  },
] as const

export function isActivePath(pathname: string, href: string): boolean {
  if (href === routes.home) return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

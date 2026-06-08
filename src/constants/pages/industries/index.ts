import { Building2, Cpu, Factory, HeartPulse, Landmark, Wrench } from 'lucide-react'

import { industrySlugs, routes } from '@/config/routes'

export type IndustryCard = {
  slug: string
  name: string
  description: string
  href: string
  icon: typeof Cpu
}

export const INDUSTRY_HUB_CARDS: IndustryCard[] = [
  {
    slug: industrySlugs.itTechnology,
    name: 'IT & Technology',
    description:
      'Software engineers, DevOps, cybersecurity, data science, and product management.',
    href: routes.industry(industrySlugs.itTechnology),
    icon: Cpu,
  },
  {
    slug: industrySlugs.healthcare,
    name: 'Healthcare',
    description:
      'Clinical staff, medical administration, healthcare IT, and compliance specialists.',
    href: routes.industry(industrySlugs.healthcare),
    icon: HeartPulse,
  },
  {
    slug: industrySlugs.financeAccounting,
    name: 'Finance & Accounting',
    description: 'CPAs, financial analysts, controllers, and investment professionals.',
    href: routes.industry(industrySlugs.financeAccounting),
    icon: Landmark,
  },
  {
    slug: industrySlugs.engineering,
    name: 'Engineering',
    description:
      'Civil, mechanical, electrical, and process engineers across industries.',
    href: routes.industry(industrySlugs.engineering),
    icon: Wrench,
  },
  {
    slug: industrySlugs.administrative,
    name: 'Administrative & Operations',
    description: 'Executive assistants, operations managers, and coordinators.',
    href: routes.industry(industrySlugs.administrative),
    icon: Building2,
  },
  {
    slug: industrySlugs.manufacturing,
    name: 'Manufacturing & Supply Chain',
    description: 'Plant managers, quality engineers, and logistics coordinators.',
    href: routes.industry(industrySlugs.manufacturing),
    icon: Factory,
  },
]

export type IndustryDetail = {
  slug: string
  name: string
  tagline: string
  overview: string
  roles: string[]
  whyUs: string[]
}

export const INDUSTRY_DETAILS: Record<string, IndustryDetail> = {
  [industrySlugs.itTechnology]: {
    slug: industrySlugs.itTechnology,
    name: 'IT & Technology',
    tagline: 'Talent for teams that build what’s next',
    overview:
      'From startups to enterprise, we place engineers, architects, and product leaders who ship reliable software and scale modern infrastructure.',
    roles: [
      'Software Engineers (Full-Stack, Backend, Frontend)',
      'DevOps & Cloud Engineers',
      'Cybersecurity Analysts',
      'Data Scientists & ML Engineers',
      'Product Managers & Scrum Masters',
    ],
    whyUs: [
      'Technical screeners who understand modern stacks',
      'Fast access to passive senior talent',
      'Contract, direct hire, and executive options',
    ],
  },
  [industrySlugs.healthcare]: {
    slug: industrySlugs.healthcare,
    name: 'Healthcare',
    tagline: 'Clinical and operational excellence',
    overview:
      'We support hospitals, clinics, and health-tech companies with credentialed clinical staff and specialized non-clinical roles.',
    roles: [
      'Registered Nurses & Allied Health',
      'Medical Office Administration',
      'Healthcare IT & EHR Specialists',
      'Compliance & Quality Assurance',
    ],
    whyUs: [
      'Credential-aware screening processes',
      'Coverage for surge and leave-of-absence needs',
      'HIPAA-conscious partner practices',
    ],
  },
  [industrySlugs.financeAccounting]: {
    slug: industrySlugs.financeAccounting,
    name: 'Finance & Accounting',
    tagline: 'Precision hires for regulated environments',
    overview:
      'Controllers, analysts, and finance leaders who understand reporting standards, audits, and stakeholder communication.',
    roles: [
      'Financial Analysts & FP&A',
      'Controllers & Accounting Managers',
      'CPAs & Tax Specialists',
      'Investment & Risk Professionals',
    ],
    whyUs: [
      'Candidates screened for relevant certifications',
      'Experience with public and private company reporting',
      'Interim and permanent placement flexibility',
    ],
  },
  [industrySlugs.engineering]: {
    slug: industrySlugs.engineering,
    name: 'Engineering',
    tagline: 'Built-world and industrial expertise',
    overview:
      'Civil, mechanical, electrical, and process engineers for infrastructure, manufacturing, and energy projects nationwide.',
    roles: [
      'Civil & Structural Engineers',
      'Mechanical & Electrical Engineers',
      'Process & Quality Engineers',
      'Project Engineers & Site Managers',
    ],
    whyUs: [
      'PE-aware sourcing where required',
      'Contract staffing for project timelines',
      'Safety-first candidate evaluation',
    ],
  },
  [industrySlugs.administrative]: {
    slug: industrySlugs.administrative,
    name: 'Administrative & Operations',
    tagline: 'The backbone of high-performing teams',
    overview:
      'Executive assistants, office managers, and operations coordinators who keep organizations running smoothly.',
    roles: [
      'Executive & Administrative Assistants',
      'Office & Facilities Managers',
      'Operations Coordinators',
      'Customer Support Leads',
    ],
    whyUs: [
      'Culture-fit focused screening',
      'Rapid temp coverage for gaps',
      'Direct hire for long-term support roles',
    ],
  },
  [industrySlugs.manufacturing]: {
    slug: industrySlugs.manufacturing,
    name: 'Manufacturing & Supply Chain',
    tagline: 'Production and logistics talent',
    overview:
      'Plant leadership, quality engineers, and supply chain professionals who optimize throughput and reliability.',
    roles: [
      'Plant & Production Managers',
      'Quality & Continuous Improvement Engineers',
      'Supply Chain & Logistics Coordinators',
      'Maintenance & Reliability Technicians',
    ],
    whyUs: [
      'Shift-aware scheduling and coverage models',
      'Lean and Six Sigma experience matching',
      'Scalable temp labor for demand spikes',
    ],
  },
}

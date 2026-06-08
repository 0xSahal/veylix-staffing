import { industrySlugs } from '@/config/routes'

export type IndustryRoleCategory = {
  icon: string
  heading: string
  roles: string[]
}

export type IndustryExpertisePoint = {
  icon: string
  heading: string
  body: string
}

export type Industry = {
  slug: string
  navLabel: string
  title: string
  subtitle: string
  heroImage: string
  overviewHeading: string
  overviewBody: string
  roleCategories: IndustryRoleCategory[]
  expertisePoints: IndustryExpertisePoint[]
  ctaHeading: string
  ctaSubtext: string
}

export const allIndustries: Industry[] = [
  {
    slug: industrySlugs.itTechnology,
    navLabel: 'IT & Technology',
    title: 'IT & Technology',
    subtitle: "Talent for teams that build what's next",
    heroImage: '/images/recruting-interview.webp',
    overviewHeading: 'Recruiters Who Speak Your Stack',
    overviewBody:
      'We place engineers, architects, and product leaders across startups and enterprise. Every candidate is technically screened by recruiters who understand modern stacks, not just keywords.',
    roleCategories: [
      {
        icon: 'Code2',
        heading: 'Software Engineering',
        roles: [
          'Full-Stack Engineers',
          'Backend Engineers',
          'Frontend Engineers',
          'Mobile Developers',
          'QA Engineers',
        ],
      },
      {
        icon: 'Server',
        heading: 'DevOps and Cloud',
        roles: [
          'DevOps Engineers',
          'Cloud Architects',
          'SRE Engineers',
          'Platform Engineers',
        ],
      },
      {
        icon: 'ShieldCheck',
        heading: 'Cybersecurity',
        roles: [
          'Security Analysts',
          'Penetration Testers',
          'SOC Analysts',
          'Security Architects',
        ],
      },
      {
        icon: 'BarChart3',
        heading: 'Data and AI',
        roles: ['Data Scientists', 'ML Engineers', 'Data Analysts', 'Data Engineers'],
      },
    ],
    expertisePoints: [
      {
        icon: 'Cpu',
        heading: 'Technical screeners, not keyword matchers',
        body: 'Our recruiters evaluate on real stack depth, not just resume keywords.',
      },
      {
        icon: 'Users',
        heading: 'Access to passive senior talent',
        body: 'The best engineers are not on job boards. We reach them through direct network relationships.',
      },
      {
        icon: 'Layers',
        heading: 'Contract, direct hire, and executive options',
        body: 'One firm for every engagement model across your entire technology headcount.',
      },
    ],
    ctaHeading: 'Need talent in IT and Technology?',
    ctaSubtext: 'Tell us the role and we will have a shortlist ready.',
  },
  {
    slug: industrySlugs.healthcare,
    navLabel: 'Healthcare',
    title: 'Healthcare',
    subtitle: 'Qualified clinical and administrative professionals',
    heroImage: '/images/hero-bg.webp',
    overviewHeading: 'Healthcare Staffing Built on Compliance and Care',
    overviewBody:
      'We support hospitals, clinics, and health-tech companies with credentialed clinical and administrative talent. Every placement is screened for credentials, compliance, and patient-care standards.',
    roleCategories: [
      {
        icon: 'UserCheck',
        heading: 'Clinical',
        roles: [
          'Registered Nurses',
          'Allied Health',
          'Medical Technologists',
          'Therapists',
        ],
      },
      {
        icon: 'Building2',
        heading: 'Administrative',
        roles: ['Medical Office Admin', 'Patient Coordinators', 'Billing Specialists'],
      },
    ],
    expertisePoints: [
      {
        icon: 'FileCheck',
        heading: 'Credential-aware screening',
        body: 'We verify licenses and certifications before a candidate reaches your team.',
      },
      {
        icon: 'Clock',
        heading: 'Surge and leave coverage',
        body: 'Rapid temp staffing for seasonal demand, FMLA gaps, and unexpected vacancies.',
      },
      {
        icon: 'ShieldCheck',
        heading: 'HIPAA-conscious practices',
        body: 'Our processes align with healthcare privacy and compliance requirements.',
      },
    ],
    ctaHeading: 'Need healthcare talent?',
    ctaSubtext: 'Tell us your requirements and we will respond within 24 hours.',
  },
  {
    slug: industrySlugs.financeAccounting,
    navLabel: 'Finance & Accounting',
    title: 'Finance & Accounting',
    subtitle: 'Precision hires for regulated environments',
    heroImage: '/images/hero-bg.webp',
    overviewHeading: 'Finance Staffing for Accuracy and Accountability',
    overviewBody:
      'We place controllers, analysts, and finance leaders who understand reporting standards and stakeholder communication. Every candidate is screened for relevant certifications and regulatory experience.',
    roleCategories: [
      {
        icon: 'LineChart',
        heading: 'Analysis',
        roles: ['Financial Analysts', 'FP&A Specialists', 'Investment Analysts'],
      },
      {
        icon: 'Calculator',
        heading: 'Accounting',
        roles: ['Controllers', 'CPAs', 'Accounting Managers', 'Tax Specialists'],
      },
    ],
    expertisePoints: [
      {
        icon: 'Award',
        heading: 'Certification-verified candidates',
        body: 'We match CPA, CFA, and other credentials to your exact role requirements.',
      },
      {
        icon: 'Scale',
        heading: 'Public and private company experience',
        body: 'Candidates screened for the reporting standards your organization requires.',
      },
      {
        icon: 'RefreshCw',
        heading: 'Interim and permanent flexibility',
        body: 'Cover audit cycles, leave gaps, or build your permanent finance team.',
      },
    ],
    ctaHeading: 'Need finance and accounting talent?',
    ctaSubtext: 'Tell us your requirements and we will respond within 24 hours.',
  },
  {
    slug: industrySlugs.engineering,
    navLabel: 'Engineering',
    title: 'Engineering',
    subtitle: 'Built-world and industrial expertise',
    heroImage: '/images/hero-bg.webp',
    overviewHeading: 'Engineering Talent for Complex Projects',
    overviewBody:
      'We place civil, mechanical, electrical, and process engineers for infrastructure and industrial projects nationwide. Candidates are evaluated for PE credentials, safety standards, and project experience.',
    roleCategories: [
      {
        icon: 'Compass',
        heading: 'Civil and Structural',
        roles: ['Civil Engineers', 'Structural Engineers', 'Site Managers'],
      },
      {
        icon: 'Gauge',
        heading: 'Mechanical and Process',
        roles: ['Mechanical Engineers', 'Process Engineers', 'Quality Engineers'],
      },
    ],
    expertisePoints: [
      {
        icon: 'Award',
        heading: 'PE-aware sourcing',
        body: 'We identify candidates with professional engineering credentials where required.',
      },
      {
        icon: 'Clock',
        heading: 'Project-timeline contract staffing',
        body: 'Scale engineering teams up or down to match project phases and deadlines.',
      },
      {
        icon: 'ShieldCheck',
        heading: 'Safety-first evaluation',
        body: 'Every candidate is screened for safety certifications and field readiness.',
      },
    ],
    ctaHeading: 'Need engineering talent?',
    ctaSubtext: 'Tell us your requirements and we will respond within 24 hours.',
  },
  {
    slug: industrySlugs.administrative,
    navLabel: 'Administrative & Operations',
    title: 'Administrative & Operations',
    subtitle: 'The backbone of high-performing teams',
    heroImage: '/images/about-sitting-group.webp',
    overviewHeading: 'Operations Staffing That Keeps Teams Moving',
    overviewBody:
      'We place executive assistants, office managers, and operations coordinators who keep organizations running smoothly. Culture-fit screening ensures every hire integrates with your team from day one.',
    roleCategories: [
      {
        icon: 'Briefcase',
        heading: 'Executive Support',
        roles: ['Executive Assistants', 'Administrative Assistants', 'Office Managers'],
      },
      {
        icon: 'Headphones',
        heading: 'Operations',
        roles: [
          'Operations Coordinators',
          'Customer Support Leads',
          'Facilities Managers',
        ],
      },
    ],
    expertisePoints: [
      {
        icon: 'Users',
        heading: 'Culture-fit focused screening',
        body: 'We evaluate soft skills and team compatibility alongside experience.',
      },
      {
        icon: 'Clock',
        heading: 'Rapid temp coverage',
        body: 'Fill gaps quickly when key support staff are out or roles are vacant.',
      },
      {
        icon: 'Layers',
        heading: 'Direct hire for long-term roles',
        body: 'Permanent placements for the support roles that anchor your operations.',
      },
    ],
    ctaHeading: 'Need administrative talent?',
    ctaSubtext: 'Tell us your requirements and we will respond within 24 hours.',
  },
  {
    slug: industrySlugs.manufacturing,
    navLabel: 'Manufacturing & Supply Chain',
    title: 'Manufacturing & Supply Chain',
    subtitle: 'Production and logistics talent',
    heroImage: '/images/hero-bg.webp',
    overviewHeading: 'Manufacturing Staffing for Throughput and Reliability',
    overviewBody:
      'We place plant leaders, quality engineers, and supply chain professionals who optimize throughput and reliability. Candidates are matched for shift availability, lean experience, and production environment fit.',
    roleCategories: [
      {
        icon: 'Building2',
        heading: 'Production',
        roles: ['Plant Managers', 'Production Supervisors', 'Maintenance Technicians'],
      },
      {
        icon: 'Network',
        heading: 'Supply Chain',
        roles: [
          'Logistics Coordinators',
          'Quality Engineers',
          'Continuous Improvement Leads',
        ],
      },
    ],
    expertisePoints: [
      {
        icon: 'Clock',
        heading: 'Shift-aware coverage models',
        body: 'Staffing plans built around your production schedules and shift requirements.',
      },
      {
        icon: 'Gauge',
        heading: 'Lean and Six Sigma matching',
        body: 'We source candidates with the process improvement credentials you need.',
      },
      {
        icon: 'TrendingUp',
        heading: 'Scalable temp labor',
        body: 'Ramp up production teams quickly during demand spikes and seasonal peaks.',
      },
    ],
    ctaHeading: 'Need manufacturing talent?',
    ctaSubtext: 'Tell us your requirements and we will respond within 24 hours.',
  },
]

export function getIndustryBySlug(slug: string): Industry | undefined {
  return allIndustries.find((i) => i.slug === slug)
}

export function getAllIndustrySlugs(): string[] {
  return allIndustries.map((i) => i.slug)
}

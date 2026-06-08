import { routes } from '@/config/routes'

export type RoleCategory = {
  icon: string // lucide-react icon name
  heading: string
  roles: string[]
}

export type ProcessStep = {
  number: string // "01", "02", "03"
  title: string
  body: string
}

export type Advantage = {
  icon: string // lucide-react icon name
  heading: string
  body: string
}

export type FAQ = {
  question: string
  answer: string
}

export type EngagementModel = {
  label: string // e.g. "Short-Term"
  tagline: string // e.g. "Days to weeks"
  description: string
  highlights: string[]
}

export type SolutionStat = {
  number: string // e.g. "72hrs"
  label: string // e.g. "Average shortlist time"
}

export type Solution = {
  slug: string
  href: string // existing flat route for this solution
  navLabel: string // short label used in sidebar nav
  title: string
  subtitle: string
  heroImage: string // path under /public/images/
  overviewHeading: string
  overviewBody: string // 2-3 paragraph string, no em dashes
  stats: SolutionStat[] // 3 stats
  roleCategories: RoleCategory[]
  processSteps: ProcessStep[]
  engagementModels: EngagementModel[]
  advantages: Advantage[]
  faqs: FAQ[]
  ctaHeading: string
  ctaSubtext: string
}

export const allSolutions: Solution[] = [
  {
    slug: 'temporary-staffing',
    href: routes.temporaryStaffing,
    navLabel: 'Temporary Staffing',
    title: 'Temporary Staffing',
    subtitle: 'Flexible solutions for your short-term needs',
    heroImage: '/images/recruting-interview.webp',
    overviewHeading: 'Flexible, Dependable Staffing for Any Timeline',
    overviewBody:
      'We offer temporary staffing solutions tailored to your short-term and project-based needs. Whether scaling up for a seasonal rush, covering unexpected absences, or needing specialized skills for a limited time, our curated pool of pre-vetted candidates means you get the right talent exactly when you need it. No long-term commitments required. Our recruiters specialize in your industry, so every candidate we send has already been screened against your specific requirements, culture, and timeline.',
    stats: [
      { number: '72hrs', label: 'Average candidate shortlist' },
      { number: '98%', label: 'Client satisfaction rate' },
      { number: '500+', label: 'Temp placements per year' },
    ],
    roleCategories: [
      {
        icon: 'Building2',
        heading: 'Administration',
        roles: [
          'Office Coordinator',
          'Receptionist',
          'Facilities Manager',
          'Data Entry Clerk',
          'Executive Assistant',
        ],
      },
      {
        icon: 'Users',
        heading: 'Human Resources',
        roles: [
          'HR Coordinator',
          'HR Receptionist',
          'HR Specialist',
          'HR Data Entry',
          'Talent Acquisition',
        ],
      },
      {
        icon: 'Headphones',
        heading: 'Customer Support',
        roles: [
          'Customer Service Rep',
          'Call Center Agent',
          'Customer Success Coordinator',
          'Support Specialist',
        ],
      },
      {
        icon: 'BarChart3',
        heading: 'Finance and Accounting',
        roles: ['Accounts Payable', 'Payroll Clerk', 'Bookkeeper', 'Billing Specialist'],
      },
    ],
    processSteps: [
      {
        number: '01',
        title: 'Share Your Requirements',
        body: 'Fill out a brief job order with your timeline, required skills, and candidate profile. Takes under five minutes.',
      },
      {
        number: '02',
        title: 'We Source and Screen',
        body: 'Our recruiters tap their active network to find pre-vetted candidates matched to your criteria and culture.',
      },
      {
        number: '03',
        title: 'You Interview and Hire',
        body: 'Review your shortlist, interview your top picks, and onboard with our full support through the start date.',
      },
    ],
    engagementModels: [
      {
        label: 'Short-Term',
        tagline: 'Days to weeks',
        description: 'Ideal for project coverage, peak periods, or event support.',
        highlights: [
          'Immediate deployment',
          'Flexible contract length',
          'No long-term obligation',
        ],
      },
      {
        label: 'Last-Minute',
        tagline: 'Urgent fills',
        description:
          'Same-day or next-day staffing for unplanned absences and emergency coverage.',
        highlights: [
          'Pre-screened bench available',
          '24-hour response',
          'Minimal onboarding friction',
        ],
      },
      {
        label: 'Seasonal',
        tagline: 'Volume hiring',
        description:
          'Scale your workforce quickly for high-demand seasons without permanent headcount increases.',
        highlights: [
          'Bulk placements',
          'Streamlined onboarding',
          'Payroll handled optionally',
        ],
      },
    ],
    advantages: [
      {
        icon: 'ShieldCheck',
        heading: 'Pre-Screened Candidates Only',
        body: 'Every candidate is background-checked, reference-verified, and skill-assessed before we present them to you.',
      },
      {
        icon: 'Clock',
        heading: 'First Shortlist in 72 Hours',
        body: 'Our active talent pipeline means you are not waiting weeks. Most clients receive their first shortlist within three days.',
      },
      {
        icon: 'Layers',
        heading: 'Flexible Engagement Models',
        body: 'Temporary, contract, direct hire, and executive search under one roof. Scale the model to match your need.',
      },
      {
        icon: 'DollarSign',
        heading: 'No Placement Fee Until You Hire',
        body: 'You only pay when you find the right fit. No upfront fees, no hidden costs during the search process.',
      },
      {
        icon: 'UserCheck',
        heading: 'Dedicated Account Manager',
        body: 'One point of contact who knows your business, your hiring history, and your culture inside out.',
      },
      {
        icon: 'Globe',
        heading: 'Active Across North America',
        body: 'Placements across Canada and the United States, with regional recruiters who understand local talent markets.',
      },
    ],
    faqs: [
      {
        question: 'How quickly can you fill a temporary position?',
        answer:
          'For most roles, we deliver a qualified shortlist within 72 hours of receiving your job order. Urgent requests can often be filled same-day or next-day from our pre-screened talent bench.',
      },
      {
        question: 'What industries do you place temporary staff in?',
        answer:
          'We specialize in administration, HR, customer support, finance, IT, and professional services. Our recruiters work within specific verticals so they understand role requirements at a deep level.',
      },
      {
        question: 'Do we pay for the candidate if they are not a good fit?',
        answer:
          'If a placement does not work out within the first few days, we replace them at no additional cost. Client satisfaction is the measure we hold ourselves to.',
      },
      {
        question: 'Who handles payroll for temporary employees?',
        answer:
          'Veylix handles all payroll, employment overhead, and compliance for temporary staff. You receive one invoice and we take care of the rest.',
      },
      {
        question: 'Can temporary hires convert to permanent employees?',
        answer:
          'Yes. Our contract-to-hire model is specifically designed for this. You evaluate the candidate on the job before committing to a permanent placement.',
      },
    ],
    ctaHeading: 'Ready to fill your next temporary role?',
    ctaSubtext: 'Share your requirements and receive a shortlist within 72 hours.',
  },

  {
    slug: 'direct-hire',
    href: routes.directHire,
    navLabel: 'Direct Hire',
    title: 'Direct Hire',
    subtitle: 'Permanent talent solutions built for long-term success',
    heroImage: '/images/the-people-behind-veylix.webp',
    overviewHeading: 'Permanent Placements That Last',
    overviewBody:
      'We take the time to understand your unique hiring needs and work closely with you to find the right permanent candidates. Our direct hire solutions deliver top talent swiftly, ensuring a seamless and efficient hiring process from first conversation to signed offer. By focusing on your specific requirements, we connect you with exceptional professionals who become lasting contributors. Every search is led by a recruiter who knows your market, so the people we present are vetted for skill, motivation, and cultural fit before they ever reach your inbox.',
    stats: [
      { number: '21d', label: 'Average time to offer' },
      { number: '94%', label: 'One-year retention rate' },
      { number: '12mo', label: 'Replacement guarantee' },
    ],
    roleCategories: [
      {
        icon: 'Cpu',
        heading: 'Technology Leaders',
        roles: [
          'Technical Lead',
          'Software Architect',
          'Engineering Manager',
          'VP of Engineering',
        ],
      },
      {
        icon: 'Users',
        heading: 'Human Resources',
        roles: [
          'HR Director',
          'Talent Acquisition Manager',
          'HR Business Partner',
          'Chief People Officer',
        ],
      },
      {
        icon: 'Briefcase',
        heading: 'Operations and Management',
        roles: [
          'Project Manager',
          'Operations Director',
          'Product Manager',
          'Quality Assurance Lead',
        ],
      },
      {
        icon: 'LineChart',
        heading: 'Sales and Marketing',
        roles: [
          'Account Executive',
          'Marketing Manager',
          'Growth Lead',
          'Sales Director',
        ],
      },
    ],
    processSteps: [
      {
        number: '01',
        title: 'Define the Role',
        body: 'We map the position, must-have skills, compensation band, and the qualities that signal long-term success.',
      },
      {
        number: '02',
        title: 'Targeted Search',
        body: 'Our recruiters approach active and passive candidates, then screen each one against your full profile.',
      },
      {
        number: '03',
        title: 'Hire With Confidence',
        body: 'You interview a curated shortlist and extend an offer, backed by our replacement guarantee.',
      },
    ],
    engagementModels: [
      {
        label: 'Standard Search',
        tagline: 'Core roles',
        description:
          'A full-cycle search for individual contributor and mid-level management roles.',
        highlights: [
          'Dedicated recruiter',
          'Curated shortlist',
          'Offer negotiation support',
        ],
      },
      {
        label: 'Retained Search',
        tagline: 'Critical hires',
        description:
          'A committed, priority engagement for roles where getting it right is essential.',
        highlights: ['Priority pipeline', 'Market mapping', 'Confidential outreach'],
      },
      {
        label: 'Volume Hiring',
        tagline: 'Team builds',
        description:
          'Build out an entire function or team with coordinated, parallel searches.',
        highlights: [
          'Multiple roles at once',
          'Consistent calibration',
          'Single point of contact',
        ],
      },
    ],
    advantages: [
      {
        icon: 'Target',
        heading: 'Precision Matching',
        body: 'We screen for skill, motivation, and culture fit, not just a keyword match on a resume. The result is candidates who stay.',
      },
      {
        icon: 'Clock',
        heading: 'Faster Time to Offer',
        body: 'Our active pipeline and focused process compress the search timeline. Most roles reach offer stage within three weeks.',
      },
      {
        icon: 'Award',
        heading: 'One-Year Guarantee',
        body: 'If a direct hire does not work out within the first year, we run the search again at no additional fee.',
      },
      {
        icon: 'Search',
        heading: 'Access to Passive Talent',
        body: 'The best candidates are rarely applying. We reach the professionals your job posting will never find.',
      },
      {
        icon: 'UserCheck',
        heading: 'Dedicated Account Manager',
        body: 'One point of contact who knows your business, your hiring history, and your culture inside out.',
      },
      {
        icon: 'Globe',
        heading: 'Active Across North America',
        body: 'Placements across Canada and the United States, with regional recruiters who understand local talent markets.',
      },
    ],
    faqs: [
      {
        question: 'How is direct hire different from temporary staffing?',
        answer:
          'Direct hire places a permanent employee directly on your payroll from day one. Temporary staffing covers short-term needs where Veylix remains the employer of record.',
      },
      {
        question: 'How long does a typical direct hire search take?',
        answer:
          'Most searches reach the offer stage within three weeks. Timelines vary with seniority and how specialized the role is, and we keep you updated at every stage.',
      },
      {
        question: 'What is your replacement guarantee?',
        answer:
          'If a placed candidate leaves or does not work out within the first year, we conduct a replacement search at no additional placement fee.',
      },
      {
        question: 'When do we pay the placement fee?',
        answer:
          'There are no upfront fees for a standard search. You only pay once a candidate we present is hired and starts in the role.',
      },
      {
        question: 'Do you handle offer negotiation?',
        answer:
          'Yes. We manage compensation conversations, counteroffers, and start-date logistics so both sides reach an agreement that holds.',
      },
    ],
    ctaHeading: 'Ready to make your next permanent hire?',
    ctaSubtext: 'Tell us about the role and receive a curated shortlist within days.',
  },

  {
    slug: 'contract-to-hire',
    href: routes.contractToHire,
    navLabel: 'Contract to Hire',
    title: 'Contract to Hire',
    subtitle: 'Try before you hire: the smart path to permanent placement',
    heroImage: '/images/about-sitting-group.webp',
    overviewHeading: 'Evaluate Talent on the Job',
    overviewBody:
      'Contract-to-hire gives you the flexibility to evaluate candidates in a real work environment before making a permanent commitment. It reduces hiring risk, allows you to assess cultural fit firsthand, and often accelerates onboarding because the person is already up to speed when they convert. We handle all contract administration, payroll, and compliance during the evaluation period, so you focus on the work and the fit while we manage the overhead. When you are ready to convert, the transition to permanent employment is seamless.',
    stats: [
      { number: '90d', label: 'Typical evaluation window' },
      { number: '85%', label: 'Convert to permanent' },
      { number: '48hrs', label: 'Average deployment time' },
    ],
    roleCategories: [
      {
        icon: 'Code2',
        heading: 'Software Development',
        roles: [
          'Frontend Developer',
          'Backend Developer',
          'Full-Stack Engineer',
          'QA Engineer',
        ],
      },
      {
        icon: 'Server',
        heading: 'IT Operations',
        roles: [
          'Systems Administrator',
          'Network Engineer',
          'DevOps Engineer',
          'Cloud Architect',
        ],
      },
      {
        icon: 'Database',
        heading: 'Analytics and Data',
        roles: [
          'Data Analyst',
          'Business Intelligence Developer',
          'Data Scientist',
          'Reporting Analyst',
        ],
      },
      {
        icon: 'Briefcase',
        heading: 'Professional Services',
        roles: [
          'Project Coordinator',
          'Business Analyst',
          'Account Manager',
          'Operations Specialist',
        ],
      },
    ],
    processSteps: [
      {
        number: '01',
        title: 'Scope the Role',
        body: 'We define the skills, the evaluation period, and the conversion terms up front so expectations are clear.',
      },
      {
        number: '02',
        title: 'Deploy and Evaluate',
        body: 'The candidate joins your team on contract while we handle payroll and compliance throughout the period.',
      },
      {
        number: '03',
        title: 'Convert or Adjust',
        body: 'Happy with the fit? Convert to permanent with a smooth handoff. If not, we source a replacement.',
      },
    ],
    engagementModels: [
      {
        label: 'Standard C2H',
        tagline: 'Three to six months',
        description:
          'A defined evaluation window before a permanent conversion decision.',
        highlights: [
          'Clear conversion terms',
          'We are employer of record',
          'Low hiring risk',
        ],
      },
      {
        label: 'Project to Hire',
        tagline: 'Outcome based',
        description:
          'Bring talent on for a specific project, then convert the standout performers.',
        highlights: ['Deliverable focused', 'Flexible duration', 'Convert the best fit'],
      },
      {
        label: 'Team Augmentation',
        tagline: 'Scale and assess',
        description:
          'Add multiple contractors during a growth phase and retain the strongest.',
        highlights: ['Parallel hiring', 'Consistent screening', 'Retain top performers'],
      },
    ],
    advantages: [
      {
        icon: 'ShieldCheck',
        heading: 'Reduced Hiring Risk',
        body: 'Evaluate real performance before committing. You make the permanent decision with evidence, not a gut feeling.',
      },
      {
        icon: 'Clock',
        heading: 'Fast Deployment',
        body: 'Pre-screened candidates can start within days. The evaluation clock begins almost immediately.',
      },
      {
        icon: 'RefreshCw',
        heading: 'Seamless Conversion',
        body: 'When you are ready to convert, the transition to permanent employment is handled by us end to end.',
      },
      {
        icon: 'DollarSign',
        heading: 'Predictable Costs',
        body: 'One transparent rate covers payroll, taxes, and compliance during the contract period. No surprises.',
      },
      {
        icon: 'UserCheck',
        heading: 'Dedicated Account Manager',
        body: 'One point of contact who knows your business, your hiring history, and your culture inside out.',
      },
      {
        icon: 'Layers',
        heading: 'Flexible Engagement Models',
        body: 'Temporary, contract, direct hire, and executive search under one roof. Scale the model to match your need.',
      },
    ],
    faqs: [
      {
        question: 'How long is the typical contract-to-hire period?',
        answer:
          'Most evaluation windows run three to six months. We agree on the exact duration and conversion terms before the candidate starts.',
      },
      {
        question: 'Who employs the worker during the contract period?',
        answer:
          'Veylix is the employer of record during the contract. We handle payroll, taxes, benefits, and compliance until the candidate converts.',
      },
      {
        question: 'What happens when we want to convert to permanent?',
        answer:
          'We manage the conversion paperwork and transition the employee to your payroll. Conversion terms are agreed up front so there are no surprises.',
      },
      {
        question: 'What if the candidate is not the right fit?',
        answer:
          'You are not obligated to convert. If the fit is not right, we end the contract per the agreed terms and source a replacement.',
      },
      {
        question: 'Is contract-to-hire more expensive than direct hire?',
        answer:
          'The model trades a higher hourly rate during evaluation for dramatically lower hiring risk. For critical roles, that tradeoff often pays for itself.',
      },
    ],
    ctaHeading: 'Ready to try before you hire?',
    ctaSubtext:
      'Tell us the role and we will deploy a pre-screened candidate within days.',
  },

  {
    slug: 'payrolling',
    href: routes.payrolling,
    navLabel: 'Payrolling',
    title: 'Payrolling Services',
    subtitle: 'We handle the payroll, you keep the talent',
    heroImage: '/images/hero-bg.webp',
    overviewHeading: 'Simplify Employment Overhead',
    overviewBody:
      'Our payrolling service lets you bring on talent you have already identified while we handle all payroll administration, tax withholding, benefits, and compliance. It is the ideal solution when you want to manage the working relationship but not the employment overhead. You stay in control of the day-to-day work and the worker stays focused on results, while Veylix becomes the employer of record and absorbs the administrative burden. From onboarding paperwork to year-end tax forms, we take care of the details so your team does not have to.',
    stats: [
      { number: '100%', label: 'Compliance coverage' },
      { number: '24hrs', label: 'Worker onboarding' },
      { number: '1', label: 'Consolidated invoice' },
    ],
    roleCategories: [
      {
        icon: 'Calculator',
        heading: 'Payroll Processing',
        roles: [
          'Weekly and bi-weekly payroll',
          'Direct deposit',
          'W-2 and 1099 management',
        ],
      },
      {
        icon: 'FileCheck',
        heading: 'Compliance and Taxes',
        roles: [
          'Federal and state tax withholding',
          'Workers compensation',
          'Unemployment insurance',
        ],
      },
      {
        icon: 'Wallet',
        heading: 'Benefits Administration',
        roles: ['Health insurance enrollment', '401k coordination', 'PTO tracking'],
      },
      {
        icon: 'Receipt',
        heading: 'Reporting',
        roles: ['Consolidated invoicing', 'Cost center allocation', 'Year-end tax forms'],
      },
    ],
    processSteps: [
      {
        number: '01',
        title: 'Identify Your Worker',
        body: 'You select the person you want to engage. We collect their details and confirm the assignment terms.',
      },
      {
        number: '02',
        title: 'We Onboard and Employ',
        body: 'Veylix becomes the employer of record, handling paperwork, withholding, benefits, and compliance.',
      },
      {
        number: '03',
        title: 'You Manage the Work',
        body: 'You direct the day-to-day while we run payroll and send you a single, clear invoice.',
      },
    ],
    engagementModels: [
      {
        label: 'Single Worker',
        tagline: 'One engagement',
        description: 'Payroll the contractor or temp you have already sourced yourself.',
        highlights: ['Fast onboarding', 'Full compliance', 'One simple invoice'],
      },
      {
        label: 'Multiple Workers',
        tagline: 'Workforce pool',
        description:
          'Consolidate payroll for a group of independent workers under one provider.',
        highlights: [
          'Centralized administration',
          'Cost center reporting',
          'Volume efficiency',
        ],
      },
      {
        label: 'Project Workforce',
        tagline: 'Defined duration',
        description:
          'Payroll a project team for a fixed engagement with clean ramp-up and ramp-down.',
        highlights: [
          'Term-based engagement',
          'Predictable costs',
          'Seamless offboarding',
        ],
      },
    ],
    advantages: [
      {
        icon: 'ShieldCheck',
        heading: 'Full Compliance Coverage',
        body: 'We stay current on federal, state, and provincial employment law so misclassification and filing risk are off your plate.',
      },
      {
        icon: 'Clock',
        heading: 'Rapid Onboarding',
        body: 'Workers can be on payroll within 24 hours. There is no lengthy setup before they start contributing.',
      },
      {
        icon: 'Scale',
        heading: 'Reduced Liability',
        body: 'As employer of record, Veylix carries the employment liability, workers compensation, and insurance.',
      },
      {
        icon: 'DollarSign',
        heading: 'Predictable Costs',
        body: 'One transparent rate and one consolidated invoice cover payroll, taxes, and administration.',
      },
      {
        icon: 'UserCheck',
        heading: 'Dedicated Account Manager',
        body: 'One point of contact who knows your business, your hiring history, and your culture inside out.',
      },
      {
        icon: 'Globe',
        heading: 'Active Across North America',
        body: 'Payrolling across Canada and the United States, with regional expertise in local employment rules.',
      },
    ],
    faqs: [
      {
        question: 'What exactly does a payrolling service do?',
        answer:
          'We become the employer of record for workers you have already selected, handling payroll, tax withholding, benefits, and compliance while you direct the work.',
      },
      {
        question: 'Can we payroll workers we have already found ourselves?',
        answer:
          'Yes. That is the core of the service. You identify the talent and we take on the administrative and compliance burden of employing them.',
      },
      {
        question: 'How quickly can a worker be added to payroll?',
        answer:
          'Once we have their details and the assignment terms, most workers can be onboarded and on payroll within 24 hours.',
      },
      {
        question: 'Who is responsible for compliance and taxes?',
        answer:
          'Veylix is. As employer of record we manage tax withholding, workers compensation, unemployment insurance, and year-end forms.',
      },
      {
        question: 'How is billing handled?',
        answer:
          'You receive one consolidated invoice covering wages, taxes, and our administration fee, with cost center reporting available on request.',
      },
    ],
    ctaHeading: 'Ready to offload your employment overhead?',
    ctaSubtext:
      'Tell us about your workers and we will handle payroll, taxes, and compliance.',
  },

  {
    slug: 'training',
    href: routes.training,
    navLabel: 'Training',
    title: 'Training Programs',
    subtitle: 'Empower your team with the skills to succeed',
    heroImage: '/images/recruting-interview.webp',
    overviewHeading: 'Upskill Your Workforce',
    overviewBody:
      'Our training programs are designed to upskill your workforce, close skill gaps, and prepare teams for emerging technologies. Whether you are onboarding new hires or developing existing staff, we deliver programs tailored to your industry, your tools, and your goals. Each program is built around measurable outcomes, so you can see the impact on productivity and retention rather than just attendance. We blend practical, hands-on instruction with the kind of coaching that helps skills stick long after the session ends.',
    stats: [
      { number: '40+', label: 'Program tracks available' },
      { number: '92%', label: 'Learner completion rate' },
      { number: '4.8/5', label: 'Average program rating' },
    ],
    roleCategories: [
      {
        icon: 'Cpu',
        heading: 'Technical Skills',
        roles: [
          'Software tools',
          'Cloud platforms',
          'Data analysis',
          'Cybersecurity fundamentals',
        ],
      },
      {
        icon: 'Users',
        heading: 'Leadership and Management',
        roles: [
          'Team leadership',
          'Project management',
          'Conflict resolution',
          'Coaching',
        ],
      },
      {
        icon: 'ShieldCheck',
        heading: 'Compliance and HR',
        roles: [
          'Workplace safety',
          'Harassment prevention',
          'Diversity training',
          'Onboarding protocols',
        ],
      },
      {
        icon: 'GraduationCap',
        heading: 'Professional Development',
        roles: [
          'Communication skills',
          'Time management',
          'Customer excellence',
          'Career pathing',
        ],
      },
    ],
    processSteps: [
      {
        number: '01',
        title: 'Assess the Gap',
        body: 'We work with you to identify skill gaps and define the outcomes that matter for your team.',
      },
      {
        number: '02',
        title: 'Tailor the Program',
        body: 'We build a curriculum around your tools, industry, and schedule, delivered on-site or remotely.',
      },
      {
        number: '03',
        title: 'Measure the Impact',
        body: 'Learners complete the program and we report on outcomes, so you can see the return on the investment.',
      },
    ],
    engagementModels: [
      {
        label: 'Onboarding',
        tagline: 'New hires',
        description:
          'Get new team members productive faster with structured onboarding tracks.',
        highlights: ['Role-specific paths', 'Faster ramp-up', 'Consistent standards'],
      },
      {
        label: 'Upskilling',
        tagline: 'Existing staff',
        description:
          'Close skill gaps and prepare your team for new tools and technologies.',
        highlights: [
          'Hands-on instruction',
          'Measurable outcomes',
          'Flexible scheduling',
        ],
      },
      {
        label: 'Leadership',
        tagline: 'Managers',
        description:
          'Develop the people-management and strategic skills your leaders need to grow.',
        highlights: ['Coaching focus', 'Cohort learning', 'Real scenarios'],
      },
    ],
    advantages: [
      {
        icon: 'BookOpen',
        heading: 'Tailored Curriculum',
        body: 'Every program is built around your tools and goals, not a generic off-the-shelf course. Relevance drives retention.',
      },
      {
        icon: 'Target',
        heading: 'Outcome Focused',
        body: 'We define success metrics before we start and report against them, so training maps to business results.',
      },
      {
        icon: 'Award',
        heading: 'Expert Instructors',
        body: 'Programs are led by practitioners with real-world experience in the subject, not just theory.',
      },
      {
        icon: 'TrendingUp',
        heading: 'Improves Retention',
        body: 'Teams that grow tend to stay. Investing in development is one of the strongest retention levers available.',
      },
      {
        icon: 'UserCheck',
        heading: 'Dedicated Program Manager',
        body: 'One point of contact who coordinates scheduling, logistics, and reporting from start to finish.',
      },
      {
        icon: 'Gauge',
        heading: 'Flexible Delivery',
        body: 'On-site, remote, or blended. We fit the format to your team and your operating rhythm.',
      },
    ],
    faqs: [
      {
        question: 'Are training programs customized to our needs?',
        answer:
          'Yes. We assess your skill gaps and build a curriculum around your specific tools, industry, and goals rather than offering a fixed catalog.',
      },
      {
        question: 'Can training be delivered remotely?',
        answer:
          'We deliver on-site, fully remote, or blended programs. The format is chosen to fit your team and your schedule.',
      },
      {
        question: 'How do you measure program success?',
        answer:
          'We define outcome metrics with you before the program starts and report against them, covering completion, assessment results, and on-the-job impact.',
      },
      {
        question: 'Who leads the training sessions?',
        answer:
          'Programs are led by experienced practitioners in the subject area, so learners get practical, applicable guidance rather than theory alone.',
      },
      {
        question: 'Can you train both new hires and existing staff?',
        answer:
          'Yes. We offer onboarding tracks for new hires and upskilling or leadership tracks for existing employees, often within the same engagement.',
      },
    ],
    ctaHeading: 'Ready to invest in your team?',
    ctaSubtext:
      'Tell us your goals and we will design a program that delivers measurable results.',
  },

  {
    slug: 'executive-search',
    href: routes.executiveSearch,
    navLabel: 'Executive Search',
    title: 'Executive Search',
    subtitle: 'Identifying the leaders who will define your future',
    heroImage: '/images/the-people-behind-veylix.webp',
    overviewHeading: 'Transformational Leadership',
    overviewBody:
      'Our executive search practice is built for finding transformational leaders, the kind who shape culture, drive strategy, and deliver results. We use a confidential, research-led approach to identify, engage, and present only the highest-caliber candidates for your most critical roles. Each search begins with a deep understanding of your business, your board, and the mandate the leader will carry. From there, our consultants conduct discreet outreach to the market, assess candidates rigorously against that mandate, and guide both sides through a process designed to secure the right person and keep them.',
    stats: [
      { number: '40d', label: 'Average search timeline' },
      { number: '96%', label: 'Searches completed' },
      { number: '100%', label: 'Confidential process' },
    ],
    roleCategories: [
      {
        icon: 'Crown',
        heading: 'C-Suite Leadership',
        roles: [
          'Chief Executive Officer',
          'Chief Operating Officer',
          'Chief Technology Officer',
          'Chief Strategy Officer',
          'Chief Legal Officer',
        ],
      },
      {
        icon: 'Landmark',
        heading: 'Finance Leadership',
        roles: [
          'Chief Financial Officer',
          'VP of Finance',
          'Financial Controller',
          'Treasurer',
          'Director of Financial Planning',
        ],
      },
      {
        icon: 'Megaphone',
        heading: 'Marketing and Growth',
        roles: [
          'Chief Marketing Officer',
          'VP of Marketing',
          'Brand Strategist',
          'Head of Digital',
          'Product Marketing Lead',
        ],
      },
      {
        icon: 'Compass',
        heading: 'Board and Advisory',
        roles: [
          'Board Director',
          'Non-Executive Chair',
          'Strategic Advisor',
          'Audit Committee Member',
        ],
      },
    ],
    processSteps: [
      {
        number: '01',
        title: 'Define the Mandate',
        body: 'We align with you and your board on the role, the strategy it serves, and the leadership profile required.',
      },
      {
        number: '02',
        title: 'Research and Engage',
        body: 'Our consultants map the market and approach top candidates discreetly through a confidential process.',
      },
      {
        number: '03',
        title: 'Assess and Secure',
        body: 'We assess finalists against the mandate, manage the offer, and support a successful onboarding.',
      },
    ],
    engagementModels: [
      {
        label: 'Retained Search',
        tagline: 'Senior leadership',
        description:
          'A committed, exclusive engagement for your most critical leadership hires.',
        highlights: [
          'Dedicated consultant',
          'Confidential outreach',
          'Rigorous assessment',
        ],
      },
      {
        label: 'Board Search',
        tagline: 'Governance',
        description:
          'Identify and recruit board directors and advisors who strengthen governance.',
        highlights: ['Discreet process', 'Network reach', 'Diversity focus'],
      },
      {
        label: 'Succession Planning',
        tagline: 'Continuity',
        description:
          'Build a pipeline of leadership talent to ensure continuity for key roles.',
        highlights: ['Market mapping', 'Talent benchmarking', 'Long-term planning'],
      },
    ],
    advantages: [
      {
        icon: 'Search',
        heading: 'Research-Led Approach',
        body: 'Every search is grounded in rigorous market mapping, so you see the full landscape of qualified leaders, not just who is available.',
      },
      {
        icon: 'ShieldCheck',
        heading: 'Complete Confidentiality',
        body: 'Sensitive searches are handled with absolute discretion, protecting your organization and the candidates throughout.',
      },
      {
        icon: 'Network',
        heading: 'Deep Leadership Network',
        body: 'Decades of relationships give us direct access to senior leaders who are not visible on the open market.',
      },
      {
        icon: 'Award',
        heading: 'Rigorous Assessment',
        body: 'We evaluate candidates against the mandate through structured interviews and referencing, not impressions.',
      },
      {
        icon: 'UserCheck',
        heading: 'Dedicated Consultant',
        body: 'A senior consultant leads your search personally, from the initial brief through onboarding the new leader.',
      },
      {
        icon: 'Globe',
        heading: 'Active Across North America',
        body: 'Leadership searches across Canada and the United States, with reach into specialized sectors.',
      },
    ],
    faqs: [
      {
        question: 'What roles do you handle through executive search?',
        answer:
          'We focus on senior leadership: C-suite, VP, board, and other mission-critical roles where the cost of a wrong hire is significant.',
      },
      {
        question: 'How confidential is the search process?',
        answer:
          'Fully confidential. We protect your organization and candidates with discreet outreach and careful information control throughout the engagement.',
      },
      {
        question: 'How long does an executive search take?',
        answer:
          'Most searches run around six weeks from mandate to shortlist, though timelines flex with seniority and how specialized the role is.',
      },
      {
        question: 'What is a retained search?',
        answer:
          'A retained search is an exclusive, committed engagement. We dedicate senior resources and a structured methodology to fill your most critical roles.',
      },
      {
        question: 'Do you support onboarding the new leader?',
        answer:
          'Yes. We stay engaged through the offer, acceptance, and early onboarding to give the new leader the best possible start.',
      },
    ],
    ctaHeading: 'Ready to find your next leader?',
    ctaSubtext:
      'Start a confidential conversation about your most critical leadership role.',
  },
]

export function getSolutionBySlug(slug: string): Solution | undefined {
  return allSolutions.find((s) => s.slug === slug)
}

export function getAllSolutionSlugs(): string[] {
  return allSolutions.map((s) => s.slug)
}

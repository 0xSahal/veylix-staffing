import type { BlogPostPreview } from '@/components/cards/BlogCard'

export type BlogPostFull = BlogPostPreview & {
  categoryFilter: string
  readTime: string
  body: string[]
}

export const BLOG_POSTS: BlogPostFull[] = [
  {
    slug: 'streamlining-recruitment',
    title: 'Expert Tips and Insights for Streamlining Recruitment',
    excerpt:
      'From sourcing strategies to onboarding best practices, discover how top staffing professionals achieve faster, better hires.',
    category: 'Streamlining Recruitment',
    categoryFilter: 'Recruitment Tips',
    date: 'May 24, 2025',
    imageSeed: 'streamlining',
    author: 'Maria Chen',
    authorAvatar: 'maria',
    readTime: '6 min read',
    body: [
      'Recruitment speed and quality are not opposing forces when your process is designed intentionally. Top staffing teams start with a clear scorecard: must-have skills, culture signals, and timeline before a single resume is reviewed.',
      'Structured intake calls with hiring managers cut rework by half. Document deal-breakers, interview stages, and compensation bands up front so candidates are not lost to ambiguity mid-process.',
      'Technology should accelerate human judgment, not replace it. Use automation for scheduling, reminders, and pipeline visibility — then invest recruiter time in relationship-building and closing.',
      'Finally, measure what matters: time-to-shortlist, interview-to-offer ratio, and 90-day retention. Those metrics tell you whether your streamlining actually improved outcomes.',
    ],
  },
  {
    slug: 'perfect-job-listing',
    title: 'Crafting the Perfect Job Listing to Attract Top Talent',
    excerpt:
      "Your job description is often the first impression candidates have of your company. Here's how to make it count.",
    category: 'Job Listings',
    categoryFilter: 'Employers',
    date: 'Feb 23, 2025',
    imageSeed: 'joblisting',
    author: 'James Porter',
    readTime: '5 min read',
    body: [
      'Lead with impact, not bureaucracy. The first two lines should answer: what will this person build, fix, or own?',
      'Separate must-have skills from nice-to-haves. Long laundry lists discourage strong candidates who meet 80% of criteria.',
      'Include salary range or bill rate when possible. Transparency increases application quality and reduces wasted interviews.',
      'Close with a human touch: team size, growth stage, and why someone would love working there.',
    ],
  },
  {
    slug: 'remote-hiring-benefits',
    title: "The Benefits of Remote Hiring: Why It's Here to Stay",
    excerpt:
      "Remote hiring expands your talent pool and often results in higher-quality placements. Here's how to do it right.",
    category: 'Remote Work',
    categoryFilter: 'Industry News',
    date: 'Dec 7, 2024',
    imageSeed: 'remote',
    author: 'Elena Vasquez',
    readTime: '7 min read',
    body: [
      'Geography is no longer the primary constraint for knowledge work roles. Companies that embrace remote hiring access deeper specialist pools and often improve diversity of thought.',
      'Success requires explicit norms: core collaboration hours, documentation standards, and equipment policies stated before offer.',
      'Interview for remote fluency — async communication, written clarity, and self-direction — alongside technical skills.',
      'Compliance and payroll still matter across states; partner with staffing experts who understand multi-jurisdiction employment.',
    ],
  },
  {
    slug: 'hiring-mistakes',
    title: '5 Hiring Mistakes Companies Make (and How to Avoid Them)',
    excerpt:
      'From rushing the process to ignoring cultural fit, these common mistakes cost companies time, money, and morale.',
    category: 'Hiring Mistakes',
    categoryFilter: 'Recruitment Tips',
    date: 'Jun 15, 2025',
    imageSeed: 'mistakes',
    author: 'David Kim',
    readTime: '8 min read',
    body: [
      'Mistake one: hiring from desperation. A warm body today often becomes a costly replacement in six months.',
      'Mistake two: vague job definitions that shift mid-search, frustrating candidates and recruiters alike.',
      'Mistake three: over-relying on unstructured interviews without work samples or scenario questions.',
      'Mistake four: ignoring cultural contribution — how someone strengthens team dynamics, not just individual output.',
      'Mistake five: slow feedback loops. Top candidates accept other offers when employers ghost for a week.',
    ],
  },
  {
    slug: 'ai-recruitment',
    title: 'How AI-Powered Tools Are Revolutionizing Recruitment',
    excerpt:
      "Artificial intelligence is changing how candidates are sourced, screened, and matched — here's what that means for your hiring.",
    category: 'AI in Recruitment',
    categoryFilter: 'Industry News',
    date: 'Jan 25, 2025',
    imageSeed: 'ai',
    author: 'Priya Sharma',
    readTime: '6 min read',
    body: [
      'AI excels at pattern recognition across large datasets: resume parsing, duplicate detection, and ranking against structured criteria.',
      'The best implementations keep humans in the loop for final decisions, bias checks, and candidate experience.',
      'Watch for compliance: automated screening must align with EEOC guidance and local regulations.',
      'Use AI to free recruiters for high-value work — coaching candidates, advising hiring managers, and closing offers.',
    ],
  },
  {
    slug: 'diverse-workforce',
    title: 'Building a Diverse Workforce: Why It Matters and How to Start',
    excerpt:
      "Diverse teams outperform homogenous ones. Here's a practical guide to making diversity a core part of your hiring strategy.",
    category: 'Diversity in Hiring',
    categoryFilter: 'Employers',
    date: 'Aug 18, 2024',
    imageSeed: 'diversity',
    author: 'Angela Wright',
    readTime: '7 min read',
    body: [
      'Diversity is a business outcome of inclusive systems, not a checkbox on a requisition form.',
      'Audit where candidates enter your funnel: job boards, referrals, and community partnerships each shape who applies.',
      'Standardize evaluation rubrics so interviewers score against competencies, not gut feel.',
      'Track representation at each stage — sourcing, screen, interview, offer — to find where drop-off happens.',
      'Leadership accountability turns intent into measurable progress quarter over quarter.',
    ],
  },
]

export const BLOG_FILTERS = [
  'All',
  'Recruitment Tips',
  'Job Seekers',
  'Employers',
  'Industry News',
] as const

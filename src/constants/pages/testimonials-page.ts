import type { TestimonialData } from '@/components/cards/TestimonialCard'
import { siteConfig } from '@/config/site'

const company = siteConfig.name

export const testimonialStats = [
  { value: '500+', label: 'Successful Placements' },
  { value: '98%', label: 'Client Retention' },
  { value: '4.9★', label: 'Average Rating' },
] as const

export const pageTestimonials: TestimonialData[] = [
  {
    name: 'Colin Lucido',
    title: 'IT Analyst',
    avatarSeed: 'colin',
    quote: `Our partnership with ${company} significantly streamlined our recruitment process. Their team demonstrated a deep understanding of our industry's demands and consistently delivered high-quality candidates. Their commitment to excellence makes them our go-to partner.`,
  },
  {
    name: 'Robert Taylor',
    title: 'Business Analyst',
    avatarSeed: 'robert',
    quote: `I can't express how satisfied I am. Their team went above and beyond to understand my career goals and match me with opportunities that aligned perfectly. Their commitment to client success is unmatched.`,
  },
  {
    name: 'Sarah Johnson',
    title: 'Software Engineer',
    avatarSeed: 'sarah',
    quote: `They played a crucial role in my job search — not only helping me land interviews but also providing valuable interview preparation and career guidance. Their support was instrumental in securing my current role.`,
  },
  {
    name: 'Michael Adams',
    title: 'Project Manager',
    avatarSeed: 'michael',
    quote: `The team is professional, supportive, and highly efficient. They made my transition to a new role seamless and stress-free. I highly recommend their services to both job seekers and employers.`,
  },
  {
    name: 'Jessica Lee',
    title: 'Data Scientist',
    avatarSeed: 'jessica',
    quote: `Not only did they help me secure a great position, but they provided excellent career guidance throughout. Their expertise in IT recruitment is evident in how precisely they match candidates with opportunities.`,
  },
  {
    name: 'Daniel Carter',
    title: 'Network Engineer',
    avatarSeed: 'daniel',
    quote: `Working with them was a game-changer for my career. Their industry insights, networking opportunities, and genuine support made all the difference in landing my dream job.`,
  },
]

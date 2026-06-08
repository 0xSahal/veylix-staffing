import {
  Award,
  Handshake,
  Shield,
  Target,
  Users,
  TrendingUp,
  Heart,
  Headphones,
} from 'lucide-react'

import type { BenefitItem } from '@/components/layout/BenefitGrid'

export const aboutPillars = [
  {
    num: '01',
    title: "We're Experts",
    body: 'Tailored career solutions backed by deep industry knowledge across IT and professional staffing.',
  },
  {
    num: '02',
    title: 'We Build Partnerships',
    body: 'We invest in long-term relationships with employers and candidates — not just one-off placements.',
  },
  {
    num: '03',
    title: 'We Have Integrity',
    body: 'Transparent, ethical, and candidate-first practices guide every interaction we have.',
  },
] as const

export const missionVision = [
  {
    icon: Target,
    title: 'Our Mission',
    body: 'Connect outstanding talent with premier opportunities, empower careers, and help businesses build high-performing teams they can trust.',
  },
  {
    icon: TrendingUp,
    title: 'Our Vision',
    body: 'Be the foremost destination for meaningful professional growth — and for businesses building elite teams that drive lasting success.',
  },
] as const

export const whyChooseBenefits: BenefitItem[] = [
  {
    icon: Award,
    title: 'Expert Guidance',
    body: 'Personalized resume building, profile marketing, and interview preparation from recruiters who know your market.',
  },
  {
    icon: Users,
    title: 'Strong Industry Connections',
    body: 'Access to top employers nationwide through relationships built over years of trusted delivery.',
  },
  {
    icon: Shield,
    title: 'Integrity & Transparency',
    body: 'Honest and ethical practices throughout the process — no surprises, no shortcuts.',
  },
  {
    icon: Headphones,
    title: 'End-to-End Support',
    body: 'With you from search to offer acceptance, and beyond when you need a partner in your corner.',
  },
]

export const aboutStats = [
  { end: 500, suffix: '+', label: 'Placements Made' },
  { end: 98, suffix: '%', label: 'Client Satisfaction' },
  { end: 150, suffix: '+', label: 'Partner Companies' },
  { end: 10, suffix: '+', label: 'Industries Served' },
] as const

export const aboutStoryIcons = [Handshake, Heart] as const

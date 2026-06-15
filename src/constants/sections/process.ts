import {
  FileText,
  MessageCircle,
  Rocket,
  Send,
  TrendingUp,
  UserCircle,
} from 'lucide-react'

import type { LucideIcon } from 'lucide-react'

export type ProcessStep = {
  number: string
  title: string
  body: string
  icon: LucideIcon
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Placement Support',
    body: 'Offer guidance, onboarding help, and check-ins at 30, 60, and 90 days. A great placement does not end when you accept.',
    icon: Rocket,
  },
  {
    number: '02',
    title: 'Resume Building',
    body: 'We sharpen your resume and online profile so employers see your strengths clearly, not just a list of keywords.',
    icon: FileText,
  },
  {
    number: '03',
    title: 'Job Applications',
    body: 'We match you to roles that fit your skills and goals, then submit applications to employers in our network on your behalf.',
    icon: Send,
  },
  {
    number: '04',
    title: 'Mock Interviews',
    body: 'Practice with realistic scenarios and honest feedback before the real thing. You walk in prepared, not hoping for the best.',
    icon: MessageCircle,
  },
  {
    number: '05',
    title: 'Dedicated Career Coach',
    body: 'One coach who knows your story, advocates for you, and stays in your corner from first call to signed offer.',
    icon: UserCircle,
  },
  {
    number: '06',
    title: 'Growth Champion',
    body: 'We stay connected after you land the role. When you are ready for your next move, we are already familiar with your trajectory.',
    icon: TrendingUp,
  },
]

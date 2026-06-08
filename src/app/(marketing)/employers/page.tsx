import { routes } from '@/config/routes'
import { createPageMetadata } from '@/lib/metadata'

import EmployersPage from './EmployersPage'

export const metadata = createPageMetadata({
  title: 'For Employers',
  description:
    'Improve your hiring strategies with certified staffing, pre-vetted talent, and dedicated account management.',
  path: routes.employers,
})

export default function EmployersRoutePage(): React.ReactNode {
  return <EmployersPage />
}

import { routes } from '@/config/routes'
import { siteConfig } from '@/config/site'
import { createPageMetadata } from '@/lib/metadata'

import AboutPage from './AboutPage'

export const metadata = createPageMetadata({
  title: 'About Us',
  description: `Learn about ${siteConfig.name}. Staffing built on expertise, not just availability. Trusted IT and professional recruiting since ${siteConfig.foundedYear}.`,
  path: routes.about,
})

export default function AboutRoutePage(): React.ReactNode {
  return <AboutPage />
}

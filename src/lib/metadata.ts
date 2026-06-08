import { siteConfig } from '@/config/site'

import type { Metadata } from 'next'

export function createPageMetadata({
  title,
  description,
  path = '',
}: {
  title: string
  description: string
  path?: string
}): Metadata {
  return {
    title,
    description,
    alternates: path ? { canonical: `${siteConfig.url}${path}` } : undefined,
    openGraph: {
      title: `${title} | ${siteConfig.shortName}`,
      description,
      url: path ? `${siteConfig.url}${path}` : siteConfig.url,
      siteName: siteConfig.name,
    },
  }
}

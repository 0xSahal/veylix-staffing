import { industryRoutes, routes } from '@/config/routes'
import { siteConfig } from '@/config/site'
import { sanityClient } from '@/lib/sanity/client'
import { allPostSlugsQuery } from '@/lib/sanity/queries'

import type { MetadataRoute } from 'next'

const staticPaths = [
  routes.home,
  routes.about,
  routes.testimonials,
  routes.employers,
  routes.placeJob,
  routes.temporaryStaffing,
  routes.directHire,
  routes.contractToHire,
  routes.payrolling,
  routes.training,
  routes.executiveSearch,
  routes.industries,
  routes.jobSeekers,
  routes.jobs,
  routes.apply,
  routes.blog,
  routes.contact,
  routes.faq,
  routes.privacy,
  routes.terms,
] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs: string[] = await sanityClient.fetch(allPostSlugsQuery)
  const blogPaths = slugs.map((slug) => routes.blogPost(slug))
  const industryPaths = industryRoutes.map((industry) => industry.href)
  const allPaths = [...staticPaths, ...industryPaths, ...blogPaths]

  return allPaths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === routes.home ? 'daily' : 'weekly',
    priority: path === routes.home ? 1 : 0.7,
  }))
}

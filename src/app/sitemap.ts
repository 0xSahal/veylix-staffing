import { industryRoutes, routes } from '@/config/routes'
import { siteConfig } from '@/config/site'
import { BLOG_POSTS } from '@/constants/pages/blog'

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

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPaths = BLOG_POSTS.map((post) => routes.blogPost(post.slug))
  const industryPaths = industryRoutes.map((industry) => industry.href)
  const allPaths = [...staticPaths, ...industryPaths, ...blogPaths]

  return allPaths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === routes.home ? 'daily' : 'weekly',
    priority: path === routes.home ? 1 : 0.7,
  }))
}

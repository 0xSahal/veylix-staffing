import { notFound } from 'next/navigation'

import { IndustryPageLayout } from '@/components/industries/IndustryPageLayout'
import { routes } from '@/config/routes'
import { getAllIndustrySlugs, getIndustryBySlug } from '@/data/industries'
import { createPageMetadata } from '@/lib/metadata'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams(): { slug: string }[] {
  return getAllIndustrySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const industry = getIndustryBySlug(slug)
  if (!industry) return {}
  return createPageMetadata({
    title: industry.title,
    description: industry.overviewBody.slice(0, 160),
    path: routes.industry(slug),
  })
}

export default async function IndustryDetailPage({
  params,
}: PageProps): Promise<React.ReactNode> {
  const { slug } = await params
  const industry = getIndustryBySlug(slug)
  if (!industry) notFound()
  return <IndustryPageLayout industry={industry} />
}

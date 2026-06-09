import {
  AboutSplit,
  BlogSection,
  CompaniesSection,
  DualCTASection,
  FAQSection,
  HeroSection,
  IndustriesSection,
  ProcessSection,
  ServicesSection,
  StatsBar,
  TestimonialsSection,
} from '@/components/sections'
import { sanityClient } from '@/lib/sanity/client'
import { recentPostsQuery } from '@/lib/sanity/queries'
import type { SanityPostPreview } from '@/types/blog'

export const revalidate = 60

export default async function HomePage(): Promise<React.ReactNode> {
  const posts: SanityPostPreview[] = await sanityClient.fetch(recentPostsQuery)

  return (
    <main>
      <HeroSection />
      <StatsBar />
      <AboutSplit />
      <ServicesSection />
      <IndustriesSection />
      <ProcessSection />
      <CompaniesSection />
      <TestimonialsSection />
      <FAQSection />
      <BlogSection posts={posts} />
      <DualCTASection />
    </main>
  )
}

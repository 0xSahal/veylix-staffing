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
import { fetchRecentPosts } from '@/lib/sanity/fetchPosts'

export const revalidate = 60

export default async function HomePage(): Promise<React.ReactNode> {
  const posts = await fetchRecentPosts(3)

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

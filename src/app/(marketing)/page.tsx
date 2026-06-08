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

export default function HomePage(): React.ReactNode {
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
      <BlogSection />
      <DualCTASection />
    </main>
  )
}

import AnnouncementBar from '@/components/sections/AnnouncementBar'
import Footer from '@/components/sections/Footer'
import Navbar from '@/components/sections/Navbar'

type MarketingLayoutProps = {
  children: React.ReactNode
}

export default function MarketingLayout({
  children,
}: MarketingLayoutProps): React.ReactNode {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

import { Providers } from '@/app/providers'
import { siteConfig } from '@/config/site'
import { inter, syne } from '@/styles/fonts'

import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactNode {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

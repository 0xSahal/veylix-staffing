import Script from 'next/script'

import { Providers } from '@/app/providers'
import { MotionProvider } from '@/app/providers/MotionProvider'
import { siteConfig } from '@/config/site'
import { instrumentSans, inter, syne } from '@/styles/fonts'

import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: siteConfig.faviconSrc,
    apple: siteConfig.faviconSrc,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactNode {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} ${instrumentSans.variable}`}
    >
      <body>
        <Script
          id="cookieyes"
          strategy="afterInteractive"
          src="https://cdn-cookieyes.com/client_data/c29ba04217122ba7ef1287943795c35b/script.js"
        />
        <MotionProvider>
          <Providers>{children}</Providers>
        </MotionProvider>
      </body>
    </html>
  )
}

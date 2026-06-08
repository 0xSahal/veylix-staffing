import { Instrument_Sans, Inter, Syne } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

/** Premium condensed display for marketing hero headlines only */
export const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-hero',
  display: 'swap',
})

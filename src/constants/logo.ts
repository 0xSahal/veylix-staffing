/** Cropped Logo.webp aspect (width / height) */
export const LOGO_ASPECT_RATIO = 2520 / 2203

/** Rendered height in px: single source of truth for all placements */
export const LOGO_HEIGHT_PX = {
  header: 84,
  footer: 96,
  intro: 160,
  default: 48,
} as const

export type LogoVariant = keyof typeof LOGO_HEIGHT_PX

export function logoWidthForHeight(heightPx: number): number {
  return Math.round(heightPx * LOGO_ASPECT_RATIO)
}

export const LOGO_SIZES_ATTR: Record<LogoVariant, string> = {
  header: '96px',
  footer: '110px',
  intro: '184px',
  default: '55px',
}

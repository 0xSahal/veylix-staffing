/**
 * Per-image object-position for hero banners so faces stay visible in short,
 * wide crops. Keys are paths under /public (as used in image src props).
 */
const HERO_IMAGE_POSITIONS: Record<string, string> = {
  '/images/the-people-behind-veylix.webp': 'object-[center_22%]',
  '/images/hero-bg.webp': 'object-[center_30%]',
  '/images/about-sitting-group.webp': 'object-[center_30%]',
  '/images/recruting-interview.webp': 'object-[center_32%]',
  '/images/job-seekers/hero.webp': 'object-[center_35%]',
  '/images/job-seekers/intro.webp': 'object-[center_32%]',
  '/images/about-hero.png': 'object-[center_35%]',
}

export function getHeroImageObjectPosition(imageSrc: string): string {
  const pathname = imageSrc.split('?')[0] ?? imageSrc
  return HERO_IMAGE_POSITIONS[pathname] ?? 'object-center'
}

export function heroImageClassName(imageSrc: string): string {
  return `object-cover ${getHeroImageObjectPosition(imageSrc)}`
}

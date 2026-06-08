import Image from 'next/image'

import { siteConfig } from '@/config/site'
import {
  LOGO_HEIGHT_PX,
  LOGO_SIZES_ATTR,
  logoWidthForHeight,
  type LogoVariant,
} from '@/constants/logo'
import { cn } from '@/lib/utils'

type VeylixLogoProps = {
  variant?: LogoVariant
  /** Height in px (overrides variant). */
  size?: number
  className?: string
  priority?: boolean
}

export default function VeylixLogo({
  variant = 'default',
  size,
  className = '',
  priority = false,
}: VeylixLogoProps): React.ReactNode {
  const heightPx = size ?? LOGO_HEIGHT_PX[variant]
  const widthPx = logoWidthForHeight(heightPx)

  return (
    <Image
      src={siteConfig.logoSrc}
      alt={siteConfig.name}
      width={widthPx}
      height={heightPx}
      priority={priority}
      quality={92}
      sizes={LOGO_SIZES_ATTR[variant]}
      className={cn('block shrink-0 object-contain object-left', className)}
      style={{
        width: widthPx,
        height: heightPx,
        maxWidth: 'none',
      }}
    />
  )
}

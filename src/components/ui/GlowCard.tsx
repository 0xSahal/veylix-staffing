'use client'

import { useState } from 'react'

import { GLOW_RADIUS_PX } from '@/constants/ui'
import { cn } from '@/lib/utils'

type GlowCardProps = {
  children: React.ReactNode
  className?: string
}

export default function GlowCard({
  children,
  className,
}: GlowCardProps): React.ReactNode {
  const [glow, setGlow] = useState({ x: 0, y: 0, visible: false })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    const rect = e.currentTarget.getBoundingClientRect()
    setGlow({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    })
  }

  const handleMouseLeave = (): void => {
    setGlow((prev) => ({ ...prev, visible: false }))
  }

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: glow.visible ? 1 : 0,
          background: `radial-gradient(circle ${GLOW_RADIUS_PX}px at ${glow.x}px ${glow.y}px, rgba(37,99,235,0.07), transparent 80%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative z-[1] h-full">{children}</div>
    </div>
  )
}

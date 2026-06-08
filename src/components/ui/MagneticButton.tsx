'use client'

import { useRef, useState } from 'react'

import Link from 'next/link'

import { m } from 'framer-motion'

import { cn } from '@/lib/utils'

const MAGNETIC_STRENGTH = 0.35

type MagneticButtonProps = {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost' | 'ghost-white'
  type?: 'button' | 'submit'
  ariaLabel?: string
}

export default function MagneticButton({
  children,
  className,
  href,
  onClick,
  type = 'button',
  ariaLabel,
}: MagneticButtonProps): React.ReactNode {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * MAGNETIC_STRENGTH, y: y * MAGNETIC_STRENGTH })
  }

  const handleMouseLeave = (): void => {
    setPosition({ x: 0, y: 0 })
  }

  const motionProps = {
    animate: { x: position.x, y: position.y },
    transition: { type: 'spring' as const, stiffness: 200, damping: 20 },
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
  }

  const content = href ? (
    <Link href={href} className={cn('inline-flex', className)} aria-label={ariaLabel}>
      {children}
    </Link>
  ) : (
    <button
      type={type}
      onClick={onClick}
      className={cn('inline-flex', className)}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )

  return (
    <m.div
      ref={ref}
      className="inline-flex"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...motionProps}
    >
      {content}
    </m.div>
  )
}

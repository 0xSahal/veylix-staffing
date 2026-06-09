'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

import { LazyMotion, domAnimation } from 'framer-motion'

const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), {
  ssr: false,
})

const ScrollProgress = dynamic(() => import('@/components/ui/ScrollProgress'), {
  ssr: false,
})

type MotionProviderProps = {
  children: React.ReactNode
}

export function MotionProvider({ children }: MotionProviderProps): React.ReactNode {
  const pathname = usePathname()

  if (pathname?.startsWith('/studio')) {
    return children
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <ScrollProgress />
      <CustomCursor />
      {children}
    </LazyMotion>
  )
}

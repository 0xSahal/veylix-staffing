'use client'

import dynamic from 'next/dynamic'

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
  return (
    <LazyMotion features={domAnimation} strict>
      <ScrollProgress />
      <CustomCursor />
      {children}
    </LazyMotion>
  )
}

'use client'

import { useEffect } from 'react'

import { destroyLenis, initLenis } from '@/lib/lenis'

type LenisProviderProps = {
  children: React.ReactNode
}

export function LenisProvider({ children }: LenisProviderProps): React.ReactNode {
  useEffect(() => {
    initLenis()
    return () => destroyLenis()
  }, [])

  return children
}

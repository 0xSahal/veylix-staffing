'use client'

import { createContext, useContext } from 'react'

const SplashReadyContext = createContext(true)

export function SplashReadyProvider({
  ready,
  children,
}: {
  ready: boolean
  children: React.ReactNode
}): React.ReactNode {
  return (
    <SplashReadyContext.Provider value={ready}>{children}</SplashReadyContext.Provider>
  )
}

/** False while the intro splash is covering the page; true once exit begins (or reduced-motion). */
export function useSplashReady(): boolean {
  return useContext(SplashReadyContext)
}

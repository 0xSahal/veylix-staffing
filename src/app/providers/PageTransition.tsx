'use client'

import { startTransition, useEffect, useState } from 'react'

import VeylixLogo from '@/components/ui/VeylixLogo'
import { useMounted } from '@/hooks/useMounted'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const SPLASH_MIN_MS = 2200
const EXIT_MS = 500

type PageTransitionProps = {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps): React.ReactNode {
  const mounted = useMounted()
  const prefersReduced = usePrefersReducedMotion()
  const [exiting, setExiting] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)

  const showOverlay = mounted && !prefersReduced && !animationComplete

  useEffect(() => {
    if (!mounted || prefersReduced) return

    const startTime = Date.now()
    let assetsReadyAt = document.readyState === 'complete' ? 0 : null
    let exitTimer: ReturnType<typeof setTimeout> | undefined
    let unmountTimer: ReturnType<typeof setTimeout> | undefined

    const beginExit = (): void => {
      setExiting(true)
      unmountTimer = setTimeout(() => {
        startTransition(() => {
          setAnimationComplete(true)
        })
      }, EXIT_MS)
    }

    const scheduleDismiss = (): void => {
      const elapsed = Date.now() - startTime
      const readyAt = assetsReadyAt ?? elapsed
      const dismissAt = Math.max(SPLASH_MIN_MS, readyAt)
      const delay = Math.max(0, dismissAt - elapsed)

      if (exitTimer) clearTimeout(exitTimer)
      exitTimer = setTimeout(beginExit, delay)
    }

    const onLoad = (): void => {
      if (assetsReadyAt === null) {
        assetsReadyAt = Date.now() - startTime
        scheduleDismiss()
      }
    }

    scheduleDismiss()

    if (assetsReadyAt === null) {
      window.addEventListener('load', onLoad, { once: true })
    }

    return () => {
      if (exitTimer) clearTimeout(exitTimer)
      if (unmountTimer) clearTimeout(unmountTimer)
      window.removeEventListener('load', onLoad)
    }
  }, [mounted, prefersReduced])

  return (
    <>
      {showOverlay && (
        <div
          className={`splash-overlay fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-white bg-[radial-gradient(120%_120%_at_50%_30%,#ffffff_40%,#EFF6FF_100%)] px-6 ${exiting ? 'splash-overlay--exit' : ''}`}
          aria-hidden="true"
        >
          <div
            className="pointer-events-none absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2"
            aria-hidden="true"
          >
            <div className="splash-orb splash-orb--primary h-[min(70vw,420px)] w-[min(70vw,420px)] rounded-full bg-[#2563eb]/[0.10] blur-3xl" />
          </div>
          <div
            className="pointer-events-none absolute bottom-[12%] right-[8%]"
            aria-hidden="true"
          >
            <div className="splash-orb splash-orb--secondary h-[min(55vw,320px)] w-[min(55vw,320px)] rounded-full bg-[#60a5fa]/[0.12] blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="splash-logo">
              <VeylixLogo variant="intro" priority />
            </div>
            <p className="splash-tagline mt-6 text-center text-[11px] font-semibold uppercase text-vx-blue">
              WHERE TALENT MEETS OPPORTUNITY
            </p>
            <div
              className="mt-10 h-0.5 w-40 overflow-hidden rounded-full bg-slate-200"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Loading"
            >
              <div className="splash-progress h-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa]" />
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  )
}

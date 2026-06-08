'use client'

import { useEffect } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { destroyLenis, initLenis } from '@/lib/lenis'

type LenisProviderProps = {
  children: React.ReactNode
}

export function LenisProvider({ children }: LenisProviderProps): React.ReactNode {
  const prefersReduced = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReduced) return

    const lenis = initLenis()
    gsap.registerPlugin(ScrollTrigger)

    const tickerCallback = (time: number): void => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length && typeof value === 'number') {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      pinType: document.body.style.transform ? 'transform' : 'fixed',
    })

    const handleScroll = (): void => {
      ScrollTrigger.update()
    }

    lenis.on('scroll', handleScroll)

    return () => {
      lenis.off('scroll', handleScroll)
      gsap.ticker.remove(tickerCallback)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      destroyLenis()
    }
  }, [prefersReduced])

  return children
}

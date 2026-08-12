import { useEffect, useRef, useState } from 'react'

import { useSplashReady } from '@/hooks/useSplashReady'

import type { Variants } from 'framer-motion'

type UseInViewAnimationOptions = {
  variants?: Variants
  threshold?: number
  once?: boolean
}

export function useInViewAnimation(options: UseInViewAnimationOptions = {}): {
  ref: React.RefObject<HTMLElement | null>
  isInView: boolean
} {
  const { threshold = 0.1, once = true } = options
  const ref = useRef<HTMLElement | null>(null)
  const [observedInView, setObservedInView] = useState(false)
  const splashReady = useSplashReady()

  useEffect(() => {
    if (!splashReady) return

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setObservedInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setObservedInView(false)
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, once, splashReady])

  return { ref, isInView: splashReady && observedInView }
}

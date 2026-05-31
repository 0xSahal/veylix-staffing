import { useEffect, useRef, useState } from 'react'

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
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsInView(false)
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, once])

  return { ref, isInView }
}

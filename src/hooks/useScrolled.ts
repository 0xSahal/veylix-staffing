import { useEffect, useState } from 'react'

const SCROLL_THRESHOLD_PX = 80

export function useScrolled(threshold = SCROLL_THRESHOLD_PX): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > threshold)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}

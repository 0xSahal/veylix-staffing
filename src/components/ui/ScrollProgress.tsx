'use client'

import { m, useScroll, useSpring, useTransform } from 'framer-motion'

export default function ScrollProgress(): React.ReactNode {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  const scaleX = useTransform(smoothProgress, (v) => v)

  return (
    <m.div
      className="fixed left-0 top-0 z-[9997] h-[3px] w-full origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #2563EB, #38BDF8)',
      }}
      aria-hidden="true"
    />
  )
}

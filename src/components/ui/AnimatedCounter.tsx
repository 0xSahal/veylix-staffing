'use client'

import CountUp from 'react-countup'

import { useInViewAnimation } from '@/hooks/useInViewAnimation'

type AnimatedCounterProps = {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
  decimals?: number
  active?: boolean
}

export default function AnimatedCounter({
  end,
  suffix = '',
  prefix = '',
  duration = 2.5,
  className,
  decimals = 0,
  active,
}: AnimatedCounterProps): React.ReactNode {
  const { ref, isInView } = useInViewAnimation({ threshold: 0.5, once: true })
  const shouldAnimate = active ?? isInView

  return (
    <span ref={ref} className={className}>
      {shouldAnimate ? (
        <CountUp
          start={0}
          end={end}
          duration={duration}
          suffix={suffix}
          prefix={prefix}
          decimals={decimals}
          useEasing
          useGrouping={false}
          startOnMount={false}
          redraw={false}
        />
      ) : (
        <span>
          {prefix}0{suffix}
        </span>
      )}
    </span>
  )
}

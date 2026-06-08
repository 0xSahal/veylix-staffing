'use client'

import { useMemo } from 'react'

import { m } from 'framer-motion'

import { useInViewAnimation } from '@/hooks/useInViewAnimation'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/utils'

const WORD_STAGGER_S = 0.08

type SplitTextProps = {
  text: string
  className?: string
  delay?: number
}

type WordSegment = {
  key: string
  word: string
  order: number
}

function buildWordSegments(value: string): WordSegment[] {
  const segments: WordSegment[] = []
  let cursor = 0
  let order = 0

  for (const word of value.split(' ')) {
    segments.push({ key: `${value}-${cursor}`, word, order })
    cursor += word.length + 1
    order += 1
  }

  return segments
}

export default function SplitText({
  text,
  className,
  delay = 0,
}: SplitTextProps): React.ReactNode {
  const { ref, isInView } = useInViewAnimation({ threshold: 0.3, once: true })
  const prefersReduced = usePrefersReducedMotion()
  const segments = useMemo(() => buildWordSegments(text), [text])
  const shouldAnimate = isInView || prefersReduced

  return (
    <span ref={ref} className={cn('inline', className)}>
      {segments.map((segment) => (
        <span key={segment.key} className="mr-[0.25em] inline-block overflow-hidden">
          <m.span
            className="inline-block"
            initial={prefersReduced ? false : { y: '110%', opacity: 0 }}
            animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{
              duration: prefersReduced ? 0 : 0.6,
              delay: prefersReduced ? 0 : delay + segment.order * WORD_STAGGER_S,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {segment.word}
          </m.span>
        </span>
      ))}
    </span>
  )
}

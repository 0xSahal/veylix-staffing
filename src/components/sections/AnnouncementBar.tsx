'use client'

import { useEffect, useState } from 'react'

import { AnimatePresence, m } from 'framer-motion'
import { X } from 'lucide-react'

import {
  ANNOUNCEMENT_BAR_HEIGHT_PX,
  ANNOUNCEMENT_CSS_VAR,
  ANNOUNCEMENT_CYCLE_MS,
} from '@/constants/announcement'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const MESSAGES = [
  '✦ Hiring across North America: first shortlist in 72 hours →',
  '✦ 10,000+ people placed since 2021. Join the talent network →',
  '✦ Executive search now open: confidential, fast, no job-board noise →',
] as const

function getDisplayMessage(message: string, isMobile: boolean): string {
  if (!isMobile) return message
  return `${message.slice(0, 50)}→`
}

export default function AnnouncementBar(): React.ReactNode {
  const [visible, setVisible] = useState(true)
  const [messageIndex, setMessageIndex] = useState(0)
  const isMobile = useMediaQuery('(max-width: 639px)')

  useEffect(() => {
    const height = visible ? `${ANNOUNCEMENT_BAR_HEIGHT_PX}px` : '0px'
    document.documentElement.style.setProperty(ANNOUNCEMENT_CSS_VAR, height)
    document.documentElement.style.setProperty('--announcement-h', height)
    return () => {
      document.documentElement.style.removeProperty(ANNOUNCEMENT_CSS_VAR)
      document.documentElement.style.removeProperty('--announcement-h')
    }
  }, [visible])

  useEffect(() => {
    if (!visible) return
    const interval = window.setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length)
    }, ANNOUNCEMENT_CYCLE_MS)
    return () => window.clearInterval(interval)
  }, [visible])

  const handleDismiss = (): void => {
    setVisible(false)
    document.documentElement.style.setProperty('--announcement-h', '0px')
    window.dispatchEvent(new CustomEvent('announcement-dismissed'))
  }

  return (
    <m.div
      className="relative w-full overflow-hidden"
      initial={false}
      animate={{ height: visible ? ANNOUNCEMENT_BAR_HEIGHT_PX : 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      style={{
        background: 'linear-gradient(90deg, #060E1F 0%, #1E3A5F 50%, #060E1F 100%)',
      }}
    >
      <div className="relative flex h-11 items-center justify-center overflow-hidden px-10 sm:px-12">
        <AnimatePresence mode="wait">
          <m.p
            key={messageIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mx-auto max-w-[280px] truncate text-center font-body text-xs font-semibold text-white sm:max-w-none sm:text-[13px]"
          >
            {getDisplayMessage(MESSAGES[messageIndex], isMobile)}
          </m.p>
        </AnimatePresence>
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute right-4 flex-shrink-0 text-white/60 transition-colors hover:text-white"
          aria-label="Dismiss announcement"
        >
          <X size={18} />
        </button>
      </div>
    </m.div>
  )
}

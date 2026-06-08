'use client'

import { useState } from 'react'

import { AnimatePresence, m } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export type FAQItem = {
  question: string
  answer: string
}

type AccordionFAQProps = {
  items: FAQItem[]
  defaultOpen?: number | null
}

export default function AccordionFAQ({
  items,
  defaultOpen = 0,
}: AccordionFAQProps): React.ReactNode {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen)

  return (
    <div className="divide-y divide-vx-border">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div key={item.question} className="py-4">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 text-left"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="font-body text-sm font-semibold text-vx-body sm:text-base">
                {item.question}
              </span>
              <ChevronDown
                size={20}
                className={`shrink-0 text-vx-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="pt-3 font-body text-sm leading-relaxed text-vx-muted">
                    {item.answer}
                  </p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

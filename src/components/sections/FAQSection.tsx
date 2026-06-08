'use client'

import { useState } from 'react'

import { AnimatePresence, m } from 'framer-motion'
import { ChevronDown, Clock, Headphones, ShieldCheck } from 'lucide-react'

import MagneticButton from '@/components/ui/MagneticButton'
import { FAQ_ITEMS } from '@/constants/sections/faq'

const STAGGER_S = 0.08

export default function FAQSection(): React.ReactNode {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number): void => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle(index)
    }
  }

  return (
    <section className="section-vx bg-white">
      <div className="container-vx grid grid-cols-1 items-start gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
        <div className="hidden lg:sticky lg:top-32 lg:block">
          <span className="section-label">FAQ</span>
          <h2 className="heading-h2 mt-4 leading-tight text-vx-navy">
            Questions people
            <br />
            actually ask us.
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-vx-muted">
            If something isn&apos;t covered here, just call us. We pick up.
          </p>
          <div className="mt-8">
            <MagneticButton href="/contact" className="btn-primary text-sm">
              Talk to the Team →
            </MagneticButton>
          </div>
          <ul className="mt-10 space-y-4">
            {[
              { icon: Clock, text: '72-hour shortlist, guaranteed' },
              { icon: ShieldCheck, text: '90-day placement guarantee' },
              { icon: Headphones, text: 'Dedicated account manager, always' },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-vx-blue-lt">
                  <Icon size={16} className="text-vx-blue" />
                </span>
                <span className="text-sm text-vx-body">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <m.div
                key={item.question}
                className="border-b border-vx-border py-4 sm:py-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * STAGGER_S }}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 text-left"
                  onClick={() => toggle(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-body text-sm font-semibold text-vx-body sm:text-base">
                    {item.question}
                  </span>
                  <m.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="ml-4 flex-shrink-0"
                  >
                    <ChevronDown size={18} className="text-vx-muted" />
                  </m.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 text-sm leading-relaxed text-vx-muted">
                        {item.answer}
                      </p>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

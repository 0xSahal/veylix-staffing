'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'

export type TabItem = {
  id: string
  label: string
  content: string
}

type TabsSectionProps = {
  tabs: TabItem[]
  heading?: string
}

export default function TabsSection({
  tabs,
  heading,
}: TabsSectionProps): React.ReactNode {
  const [active, setActive] = useState(tabs[0]?.id ?? '')

  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0]

  return (
    <div>
      {heading && <h2 className="heading-h3 mb-6 text-vx-navy">{heading}</h2>}
      <div className="flex flex-wrap gap-2 border-b border-vx-border pb-4" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              'rounded-btn px-4 py-2 font-body text-sm font-medium transition-colors',
              active === tab.id
                ? 'bg-vx-blue text-white'
                : 'bg-vx-off text-vx-body hover:bg-vx-blue-lt hover:text-vx-blue'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        className="mt-6 font-body text-base leading-relaxed text-vx-muted"
        role="tabpanel"
      >
        {activeTab?.content}
      </div>
    </div>
  )
}

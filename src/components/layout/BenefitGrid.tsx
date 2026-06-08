import type { LucideIcon } from 'lucide-react'

export type BenefitItem = {
  icon: LucideIcon
  title: string
  body: string
}

type BenefitGridProps = {
  items: BenefitItem[]
  columns?: 2 | 3 | 4
}

export default function BenefitGrid({
  items,
  columns = 4,
}: BenefitGridProps): React.ReactNode {
  const colClassMap: Record<2 | 3 | 4, string> = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }
  const colClass = colClassMap[columns]

  return (
    <div className={`grid grid-cols-1 gap-6 ${colClass}`}>
      {items.map(({ icon: Icon, title, body }) => (
        <div
          key={title}
          className="rounded-card border border-vx-border bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-vx-blue-lt">
            <Icon size={22} className="text-vx-blue" />
          </span>
          <h3 className="mt-4 font-display text-lg font-semibold text-vx-navy">
            {title}
          </h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-vx-muted">{body}</p>
        </div>
      ))}
    </div>
  )
}

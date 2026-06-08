import AnimatedCounter from '@/components/ui/AnimatedCounter'

export type StatItem = {
  end: number
  suffix?: string
  prefix?: string
  label: string
}

type StatsCounterRowProps = {
  stats: StatItem[]
  className?: string
}

export default function StatsCounterRow({
  stats,
  className = '',
}: StatsCounterRowProps): React.ReactNode {
  return (
    <div className={`grid grid-cols-2 gap-8 md:grid-cols-4 ${className}`}>
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="font-display text-3xl font-bold text-vx-navy sm:text-4xl">
            <AnimatedCounter end={stat.end} suffix={stat.suffix} prefix={stat.prefix} />
          </p>
          <p className="mt-2 font-body text-sm text-vx-muted">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

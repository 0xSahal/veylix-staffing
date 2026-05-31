import { cn } from '@/lib/utils'

type SectionProps = {
  children: React.ReactNode
  className?: string
}

export function Section({ children, className }: SectionProps): React.ReactNode {
  return <section className={cn('section-vx', className)}>{children}</section>
}

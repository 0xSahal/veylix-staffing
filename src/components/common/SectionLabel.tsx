import { cn } from '@/lib/utils'

type SectionLabelProps = {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({
  children,
  className,
}: SectionLabelProps): React.ReactNode {
  return <span className={cn('section-label', className)}>{children}</span>
}

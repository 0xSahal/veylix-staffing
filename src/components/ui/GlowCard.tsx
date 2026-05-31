type GlowCardProps = {
  children: React.ReactNode
  className?: string
}

export function GlowCard({ children, className }: GlowCardProps): React.ReactNode {
  return <div className={className}>{children}</div>
}

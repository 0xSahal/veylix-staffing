type AnimatedCounterProps = {
  end: number
  className?: string
}

export function AnimatedCounter({
  end,
  className,
}: AnimatedCounterProps): React.ReactNode {
  return <span className={className}>{end}</span>
}

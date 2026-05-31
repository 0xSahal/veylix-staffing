type MagneticButtonProps = {
  children: React.ReactNode
  className?: string
}

export function MagneticButton({
  children,
  className,
}: MagneticButtonProps): React.ReactNode {
  return (
    <button type="button" className={className}>
      {children}
    </button>
  )
}

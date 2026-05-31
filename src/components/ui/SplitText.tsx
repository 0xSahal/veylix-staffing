type SplitTextProps = {
  text: string
  className?: string
}

export function SplitText({ text, className }: SplitTextProps): React.ReactNode {
  return <span className={className}>{text}</span>
}

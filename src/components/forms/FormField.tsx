import { cn } from '@/lib/utils'

type FormFieldProps = {
  label: string
  name: string
  error?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export default function FormField({
  label,
  name,
  error,
  required,
  children,
  className,
}: FormFieldProps): React.ReactNode {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label htmlFor={name} className="block font-body text-sm font-medium text-vx-body">
        {label}
        {required && <span className="text-vx-blue"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export const inputClassName =
  'w-full rounded-input border border-vx-border bg-white px-4 py-2.5 font-body text-sm text-vx-body placeholder:text-vx-muted focus:outline-none focus:ring-2 focus:ring-vx-blue focus:border-transparent'

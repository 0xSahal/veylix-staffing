import { AlertCircle, Check } from 'lucide-react'

import { cn } from '@/lib/utils'

import type { UseFormRegisterReturn } from 'react-hook-form'

const baseControl =
  'w-full rounded-xl border px-4 py-3 text-sm font-normal text-vx-body placeholder:text-gray-300 outline-none transition-all duration-200 focus:ring-2 focus:ring-vx-blue/20'

function controlState(error?: string, valid?: boolean): string {
  if (error) return 'border-red-300 bg-red-50 focus:border-red-400'
  if (valid) return 'border-green-300 bg-white focus:border-green-400'
  return 'border-vx-border bg-white focus:border-vx-blue'
}

function counterClass(currentLength: number, maxLength: number): string {
  if (currentLength >= maxLength - 50) return 'text-red-500'
  if (currentLength >= maxLength - 200) return 'text-vx-gold'
  return 'text-vx-muted'
}

type FieldLabelProps = {
  label: string
  name: string
  required?: boolean
  hint?: string
}

function FieldLabel({ label, name, required, hint }: FieldLabelProps): React.ReactNode {
  return (
    <>
      <label
        htmlFor={name}
        className="flex items-center gap-1 font-body text-sm font-semibold text-vx-body"
      >
        {label}
        {required && <span className="text-vx-blue">*</span>}
      </label>
      {hint && <p className="-mt-0.5 text-xs text-vx-muted">{hint}</p>}
    </>
  )
}

function FieldError({ name, error }: { name: string; error?: string }): React.ReactNode {
  if (!error) return null
  return (
    <p
      id={`${name}-error`}
      role="alert"
      className="flex items-center gap-1.5 text-xs font-medium text-red-500"
    >
      <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" aria-hidden />
      {error}
    </p>
  )
}

type BaseFieldProps = {
  label: string
  required?: boolean
  hint?: string
  error?: string
  valid?: boolean
  registration: UseFormRegisterReturn
  className?: string
}

type PJInputProps = BaseFieldProps & {
  type?: string
  placeholder?: string
}

export function PJInput({
  label,
  required,
  hint,
  error,
  valid,
  registration,
  type = 'text',
  placeholder,
  className,
}: PJInputProps): React.ReactNode {
  const { name } = registration
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <FieldLabel label={label} name={name} required={required} hint={hint} />
      <div className="relative">
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${name}-error` : undefined}
          className={cn(baseControl, controlState(error, valid), valid && 'pr-10')}
          {...registration}
        />
        {valid && !error && (
          <Check
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-500"
            aria-hidden
          />
        )}
      </div>
      <FieldError name={name} error={error} />
    </div>
  )
}

export function PJPhone(props: Omit<PJInputProps, 'type'>): React.ReactNode {
  return <PJInput {...props} type="tel" />
}

type PJSelectProps = BaseFieldProps & {
  placeholder?: string
  options: readonly string[]
}

export function PJSelect({
  label,
  required,
  hint,
  error,
  valid,
  registration,
  placeholder = 'Select an option',
  options,
  className,
}: PJSelectProps): React.ReactNode {
  const { name } = registration
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <FieldLabel label={label} name={name} required={required} hint={hint} />
      <select
        id={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(baseControl, controlState(error, valid))}
        {...registration}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <FieldError name={name} error={error} />
    </div>
  )
}

type PJTextareaProps = BaseFieldProps & {
  placeholder?: string
  rows?: number
  currentLength?: number
  maxLength?: number
}

export function PJTextarea({
  label,
  required,
  hint,
  error,
  valid,
  registration,
  placeholder,
  rows = 4,
  currentLength,
  maxLength,
  className,
}: PJTextareaProps): React.ReactNode {
  const { name } = registration
  const showCounter = typeof currentLength === 'number' && typeof maxLength === 'number'
  const counterColor = showCounter
    ? counterClass(currentLength, maxLength)
    : 'text-vx-muted'

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <FieldLabel label={label} name={name} required={required} hint={hint} />
      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(baseControl, controlState(error, valid), 'resize-y')}
        {...registration}
      />
      <div className="flex items-center justify-between gap-3">
        <FieldError name={name} error={error} />
        {showCounter && (
          <span className={cn('ml-auto text-xs font-medium', counterColor)}>
            {currentLength} / {maxLength} characters
          </span>
        )}
      </div>
    </div>
  )
}

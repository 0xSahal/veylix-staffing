import { Fragment } from 'react'

import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'

const STEPS = [
  { number: 1, label: 'Company' },
  { number: 2, label: 'Contact' },
  { number: 3, label: 'Job Details' },
  { number: 4, label: 'Review' },
] as const

type StepIndicatorProps = {
  currentStep: number
}

function circleClass(currentStep: number, stepNumber: number): string {
  if (currentStep === stepNumber)
    return 'bg-vx-blue text-white shadow-md shadow-vx-blue/30'
  if (currentStep > stepNumber) return 'bg-vx-navy text-white'
  return 'bg-vx-off text-vx-muted'
}

function labelClass(currentStep: number, stepNumber: number): string {
  if (currentStep === stepNumber) return 'text-vx-blue'
  if (currentStep > stepNumber) return 'text-vx-navy'
  return 'text-vx-muted'
}

export default function StepIndicator({
  currentStep,
}: StepIndicatorProps): React.ReactNode {
  return (
    <div className="border-b border-vx-border px-5 pb-6 pt-7 sm:px-10 sm:pt-8">
      <div className="flex items-center justify-between">
        {STEPS.map((s, index) => (
          <Fragment key={s.number}>
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all duration-300',
                  circleClass(currentStep, s.number)
                )}
              >
                {currentStep > s.number ? (
                  <Check className="h-4 w-4" aria-hidden />
                ) : (
                  s.number
                )}
              </div>
              <span
                className={cn(
                  'hidden whitespace-nowrap text-[11px] font-semibold tracking-wide sm:block',
                  labelClass(currentStep, s.number)
                )}
              >
                {s.label}
              </span>
            </div>

            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  'mx-3 h-[2px] flex-1 rounded-full transition-all duration-500',
                  currentStep > s.number ? 'bg-vx-navy' : 'bg-vx-border'
                )}
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

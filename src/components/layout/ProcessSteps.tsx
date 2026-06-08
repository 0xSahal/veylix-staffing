import type { LucideIcon } from 'lucide-react'

export type ProcessStep = {
  step: string
  title: string
  body: string
  icon: LucideIcon
}

type ProcessStepsProps = {
  steps: ProcessStep[]
}

export default function ProcessSteps({ steps }: ProcessStepsProps): React.ReactNode {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
      {steps.map((step, index) => {
        const Icon = step.icon
        return (
          <div key={step.title} className="relative text-center md:text-left">
            {index < steps.length - 1 && (
              <div
                className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-vx-border md:left-[calc(50%+2rem)] md:block md:w-[calc(100%-4rem)]"
                aria-hidden
              />
            )}
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-vx-blue-lt">
              <Icon size={24} className="text-vx-blue" />
            </span>
            <p className="mt-4 font-display text-xs font-bold uppercase tracking-widest text-vx-blue">
              {step.step}
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold text-vx-navy">
              {step.title}
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-vx-muted">
              {step.body}
            </p>
          </div>
        )
      })}
    </div>
  )
}

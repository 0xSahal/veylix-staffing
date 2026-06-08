'use client'

import { useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import gsap from 'gsap'
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import { useForm, useWatch } from 'react-hook-form'

import { placeJobOrder } from '@/app/actions/forms'
import {
  PJInput,
  PJPhone,
  PJSelect,
  PJTextarea,
} from '@/components/forms/place-job/Fields'
import ReviewGroup from '@/components/forms/place-job/ReviewGroup'
import {
  COMPANY_SIZES,
  CONTACT_METHODS,
  INDUSTRIES,
  JOB_DESCRIPTION_MAX,
  OPENINGS,
  placeJobSchema,
  SPECIALISATIONS,
  STAFFING_TYPES,
  STEP_FIELDS,
  type PlaceJobValues,
} from '@/components/forms/place-job/schema'
import StepIndicator from '@/components/forms/place-job/StepIndicator'
import { routes } from '@/config/routes'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const TOTAL_STEPS = 4

type Direction = 'forward' | 'back'

const DEFAULT_VALUES: PlaceJobValues = {
  companyName: '',
  industry: '',
  companySize: '',
  companyWebsite: '',
  firstName: '',
  lastName: '',
  jobTitle: '',
  email: '',
  phone: '',
  contactMethod: 'Email',
  specialisation: '',
  staffingType: '',
  numberOfOpenings: '',
  jobTitlesNeeded: '',
  location: '',
  targetStartDate: '',
  jobDescription: '',
  additionalNotes: '',
}

export default function PlaceJobForm(): React.ReactNode {
  const [step, setStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')
  const [serverError, setServerError] = useState<string | null>(null)

  const prefersReduced = usePrefersReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    trigger,
    setError,
    control,
    formState: { errors, touchedFields, dirtyFields, isSubmitting },
  } = useForm<PlaceJobValues>({
    resolver: zodResolver(placeJobSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: DEFAULT_VALUES,
  })

  const values = useWatch({ control })

  const fieldValid = (name: keyof PlaceJobValues): boolean =>
    Boolean(touchedFields[name]) && !errors[name] && Boolean(dirtyFields[name])

  const scrollToTop = (): void => {
    rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const changeStep = (target: number, direction: Direction): void => {
    const node = contentRef.current
    if (prefersReduced || !node) {
      setStep(target)
      if (direction === 'forward') scrollToTop()
      return
    }
    gsap.to(node, {
      opacity: 0,
      x: direction === 'forward' ? -20 : 20,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setStep(target)
        if (direction === 'forward') scrollToTop()
        gsap.fromTo(
          node,
          { opacity: 0, x: direction === 'forward' ? 20 : -20 },
          { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
        )
      },
    })
  }

  const handleNext = async (): Promise<void> => {
    const valid = await trigger(STEP_FIELDS[step], { shouldFocus: true })
    if (valid) changeStep(Math.min(TOTAL_STEPS, step + 1), 'forward')
  }

  const handleBack = (): void => {
    changeStep(Math.max(1, step - 1), 'back')
  }

  const handleEdit = (target: number): void => {
    changeStep(target, 'back')
  }

  const onValid = async (data: PlaceJobValues): Promise<void> => {
    setServerError(null)
    const result = await placeJobOrder(data)
    if (result.success) {
      setSubmittedEmail(data.email)
      setIsSubmitted(true)
      return
    }
    if (result.fieldErrors) {
      let earliestStep = TOTAL_STEPS
      Object.entries(result.fieldErrors).forEach(([key, messages]) => {
        const field = key as keyof PlaceJobValues
        setError(field, { type: 'server', message: messages?.[0] ?? 'Invalid value' })
        const owningStep = Number(
          Object.keys(STEP_FIELDS).find((s) => STEP_FIELDS[Number(s)].includes(field))
        )
        if (owningStep && owningStep < earliestStep) earliestStep = owningStep
      })
      if (earliestStep < step) changeStep(earliestStep, 'back')
      return
    }
    setServerError(result.error ?? 'Something went wrong. Please try again in a moment.')
  }

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (step < TOTAL_STEPS) {
      void handleNext()
      return
    }
    void handleSubmit(onValid)()
  }

  if (isSubmitted) {
    return (
      <div ref={rootRef} className="scroll-mt-28 p-8 text-center sm:p-10">
        <div className="flex flex-col items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <CheckCircle className="h-8 w-8 text-green-500" aria-hidden />
          </div>
          <h2 className="font-display text-2xl font-bold text-vx-navy">
            Job Order Submitted
          </h2>
          <p className="max-w-sm font-body text-base leading-relaxed text-vx-muted">
            We have received your request and will send a candidate shortlist to{' '}
            {submittedEmail} within 48 hours.
          </p>
          <a
            href={routes.employers}
            className="mt-2 flex items-center gap-2 font-body text-sm font-semibold text-vx-blue transition-colors hover:text-vx-blue-dark"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to Employers
          </a>
        </div>
      </div>
    )
  }

  const jobDescriptionLength = (values.jobDescription ?? '').length

  return (
    <div ref={rootRef} className="scroll-mt-28">
      <StepIndicator currentStep={step} />

      <form onSubmit={onFormSubmit} noValidate className="p-5 sm:p-8 md:p-10">
        {serverError && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
            <AlertCircle
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-400"
              aria-hidden
            />
            <div>
              <p className="font-body text-sm font-semibold text-red-700">
                Something went wrong
              </p>
              <p className="mt-0.5 font-body text-sm text-red-600">{serverError}</p>
            </div>
          </div>
        )}

        <div ref={contentRef} className="form-step-content">
          {step === 1 && (
            <div>
              <div className="mb-8">
                <h2 className="mb-1.5 font-display text-xl font-bold text-vx-navy">
                  Company Details
                </h2>
                <p className="font-body text-sm text-vx-muted">
                  Tell us about your organization so we can match you with the right
                  candidates.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <PJInput
                  label="Company Name"
                  required
                  placeholder="e.g. Veylix Staffing"
                  registration={register('companyName')}
                  error={errors.companyName?.message}
                  valid={fieldValid('companyName')}
                />
                <PJSelect
                  label="Industry"
                  required
                  placeholder="Select industry"
                  options={INDUSTRIES}
                  registration={register('industry')}
                  error={errors.industry?.message}
                  valid={fieldValid('industry')}
                />
                <PJSelect
                  label="Company Size"
                  required
                  placeholder="Select size"
                  options={COMPANY_SIZES}
                  registration={register('companySize')}
                  error={errors.companySize?.message}
                  valid={fieldValid('companySize')}
                />
                <PJInput
                  label="Company Website"
                  type="url"
                  placeholder="https://example.com"
                  registration={register('companyWebsite')}
                  error={errors.companyWebsite?.message}
                  valid={fieldValid('companyWebsite')}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="mb-8">
                <h2 className="mb-1.5 font-display text-xl font-bold text-vx-navy">
                  Contact Person
                </h2>
                <p className="font-body text-sm text-vx-muted">
                  Who should we reach out to with candidate shortlists and updates?
                </p>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <PJInput
                  label="First Name"
                  required
                  placeholder="Jane"
                  registration={register('firstName')}
                  error={errors.firstName?.message}
                  valid={fieldValid('firstName')}
                />
                <PJInput
                  label="Last Name"
                  required
                  placeholder="Doe"
                  registration={register('lastName')}
                  error={errors.lastName?.message}
                  valid={fieldValid('lastName')}
                />
                <PJInput
                  label="Work Email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  registration={register('email')}
                  error={errors.email?.message}
                  valid={fieldValid('email')}
                />
                <PJPhone
                  label="Phone Number"
                  required
                  placeholder="+1 (307) 555-0000"
                  registration={register('phone')}
                  error={errors.phone?.message}
                  valid={fieldValid('phone')}
                />
                <PJInput
                  label="Your Job Title"
                  required
                  placeholder="e.g. Head of Talent"
                  className="sm:col-span-2"
                  registration={register('jobTitle')}
                  error={errors.jobTitle?.message}
                  valid={fieldValid('jobTitle')}
                />
                <fieldset className="sm:col-span-2">
                  <legend className="mb-2 font-body text-sm font-semibold text-vx-body">
                    Preferred Contact Method
                  </legend>
                  <div className="flex flex-wrap gap-4">
                    {CONTACT_METHODS.map((method) => (
                      <label
                        key={method}
                        className="flex cursor-pointer items-center gap-2 font-body text-sm text-vx-body"
                      >
                        <input
                          type="radio"
                          value={method}
                          className="accent-vx-blue"
                          {...register('contactMethod')}
                        />
                        {method}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="mb-8">
                <h2 className="mb-1.5 font-display text-xl font-bold text-vx-navy">
                  Job Requirements
                </h2>
                <p className="font-body text-sm text-vx-muted">
                  Describe the role so we can find candidates who are the right fit for
                  your team.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <PJInput
                  label="Job Title / Position"
                  required
                  placeholder="e.g. Senior Backend Engineer"
                  registration={register('jobTitlesNeeded')}
                  error={errors.jobTitlesNeeded?.message}
                  valid={fieldValid('jobTitlesNeeded')}
                />
                <PJSelect
                  label="Staffing Type"
                  required
                  placeholder="Select staffing type"
                  options={STAFFING_TYPES}
                  registration={register('staffingType')}
                  error={errors.staffingType?.message}
                  valid={fieldValid('staffingType')}
                />
                <PJSelect
                  label="Specialisation"
                  required
                  placeholder="Select specialisation"
                  options={SPECIALISATIONS}
                  registration={register('specialisation')}
                  error={errors.specialisation?.message}
                  valid={fieldValid('specialisation')}
                />
                <PJInput
                  label="Job Location"
                  required
                  placeholder="City, State"
                  registration={register('location')}
                  error={errors.location?.message}
                  valid={fieldValid('location')}
                />
                <PJSelect
                  label="Number of Openings"
                  required
                  placeholder="Select range"
                  options={OPENINGS}
                  registration={register('numberOfOpenings')}
                  error={errors.numberOfOpenings?.message}
                  valid={fieldValid('numberOfOpenings')}
                />
                <PJInput
                  label="Target Start Date"
                  type="date"
                  required
                  registration={register('targetStartDate')}
                  error={errors.targetStartDate?.message}
                  valid={fieldValid('targetStartDate')}
                />
                <PJTextarea
                  label="Job Description"
                  required
                  className="sm:col-span-2"
                  rows={4}
                  placeholder="Include responsibilities, requirements, and must-have skills."
                  registration={register('jobDescription')}
                  error={errors.jobDescription?.message}
                  valid={fieldValid('jobDescription')}
                  currentLength={jobDescriptionLength}
                  maxLength={JOB_DESCRIPTION_MAX}
                />
                <PJTextarea
                  label="Additional Notes"
                  className="sm:col-span-2"
                  rows={3}
                  placeholder="Anything else we should know? (optional)"
                  registration={register('additionalNotes')}
                  error={errors.additionalNotes?.message}
                  valid={fieldValid('additionalNotes')}
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="mb-8">
                <h2 className="mb-1.5 font-display text-xl font-bold text-vx-navy">
                  Review Your Job Order
                </h2>
                <p className="font-body text-sm text-vx-muted">
                  Please confirm the details below before submitting. You can edit any
                  section by clicking the Edit button.
                </p>
              </div>

              <ReviewGroup
                title="Company Details"
                onEdit={() => handleEdit(1)}
                fields={[
                  { label: 'Company Name', value: values.companyName || 'Not provided' },
                  { label: 'Industry', value: values.industry || 'Not provided' },
                  { label: 'Company Size', value: values.companySize || 'Not provided' },
                  { label: 'Website', value: values.companyWebsite || 'Not provided' },
                ]}
              />
              <ReviewGroup
                title="Contact Person"
                onEdit={() => handleEdit(2)}
                fields={[
                  {
                    label: 'Name',
                    value:
                      `${values.firstName} ${values.lastName}`.trim() || 'Not provided',
                  },
                  { label: 'Email', value: values.email || 'Not provided' },
                  { label: 'Phone', value: values.phone || 'Not provided' },
                  { label: 'Title', value: values.jobTitle || 'Not provided' },
                  {
                    label: 'Preferred Contact',
                    value: values.contactMethod || 'Not provided',
                  },
                ]}
              />
              <ReviewGroup
                title="Job Requirements"
                onEdit={() => handleEdit(3)}
                fields={[
                  { label: 'Position', value: values.jobTitlesNeeded || 'Not provided' },
                  {
                    label: 'Staffing Type',
                    value: values.staffingType || 'Not provided',
                  },
                  {
                    label: 'Specialisation',
                    value: values.specialisation || 'Not provided',
                  },
                  { label: 'Location', value: values.location || 'Not provided' },
                  { label: 'Openings', value: values.numberOfOpenings || 'Not provided' },
                  {
                    label: 'Target Start Date',
                    value: values.targetStartDate || 'Not provided',
                  },
                  {
                    label: 'Description',
                    value: values.jobDescription || 'Not provided',
                  },
                  {
                    label: 'Additional Notes',
                    value: values.additionalNotes || 'Not provided',
                  },
                ]}
              />
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-col-reverse items-stretch gap-4 border-t border-vx-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center justify-center gap-2 font-body text-sm font-semibold text-vx-muted transition-colors hover:text-vx-navy"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          <span className="text-center font-body text-xs font-medium text-vx-muted">
            Step {step} of {TOTAL_STEPS}
          </span>

          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={() => void handleNext()}
              className="flex items-center justify-center gap-2 rounded-xl bg-vx-blue px-7 py-3 font-body text-sm font-bold text-white shadow-sm shadow-vx-blue/30 transition-all duration-200 hover:bg-vx-blue-dark active:scale-[0.98]"
            >
              Continue
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 rounded-xl bg-vx-navy px-8 py-3 font-body text-sm font-bold text-white transition-all duration-200 hover:bg-vx-navy/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    aria-hidden
                  />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Job Order
                  <CheckCircle className="h-4 w-4" aria-hidden />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

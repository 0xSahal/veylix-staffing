'use client'

import { useState, useTransition } from 'react'

import { contactMessage } from '@/app/actions/forms'
import FormField, { inputClassName } from '@/components/forms/FormField'
import { formFieldString } from '@/lib/form'

const SUBJECTS = [
  'General Inquiry',
  'Employer Inquiry',
  'Job Seeker',
  'Partnership',
  'Other',
]

export default function ContactForm(): React.ReactNode {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await contactMessage({
        fullName: formFieldString(fd, 'fullName'),
        email: formFieldString(fd, 'email'),
        phone: formFieldString(fd, 'phone'),
        subject: formFieldString(fd, 'subject'),
        message: formFieldString(fd, 'message'),
      })
      if (result.success) {
        setSuccess(true)
        setError(null)
      } else {
        setError(result.error ?? 'Please check required fields.')
      }
    })
  }

  if (success) {
    return (
      <div className="rounded-card bg-vx-blue-lt p-8 text-center">
        <h3 className="font-display text-xl font-semibold text-vx-navy">Message sent!</h3>
        <p className="mt-2 text-sm text-vx-muted">We&apos;ll get back to you shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormField label="Full Name" name="fullName" required>
        <input id="fullName" name="fullName" required className={inputClassName} />
      </FormField>
      <FormField label="Email Address" name="email" required>
        <input id="email" name="email" type="email" required className={inputClassName} />
      </FormField>
      <FormField label="Phone Number" name="phone">
        <input id="phone" name="phone" type="tel" className={inputClassName} />
      </FormField>
      <FormField label="Subject" name="subject" required>
        <select
          id="subject"
          name="subject"
          required
          className={inputClassName}
          defaultValue=""
        >
          <option value="" disabled>
            Select a subject
          </option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </FormField>
      <FormField label="Message" name="message" required>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={inputClassName}
        />
      </FormField>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="btn-primary disabled:opacity-70"
      >
        {isPending ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}

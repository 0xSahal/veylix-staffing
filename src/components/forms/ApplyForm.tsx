'use client'

import { useState } from 'react'

import FileDropzone from '@/components/forms/FileDropzone'
import FormField, { inputClassName } from '@/components/forms/FormField'
import TagInput from '@/components/forms/TagInput'

const EXPERIENCE_OPTIONS = ['0–1 yr', '1–3 yrs', '3–5 yrs', '5–10 yrs', '10+ yrs']
const WORK_STATUS = ['Full-Time', 'Part-Time', 'Contract', 'C2C', 'Open to any']
const SPECIALIZATIONS = ['IT', 'Healthcare', 'Finance', 'Engineering', 'Admin', 'Other']

type ApplyFormProps = {
  jobId?: string
}

export default function ApplyForm({ jobId }: ApplyFormProps): React.ReactNode {
  const [success, setSuccess] = useState(false)
  const [pending, setPending] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [skills, setSkills] = useState<string[]>([])
  const [coverNote, setCoverNote] = useState('')
  const [workStatus, setWorkStatus] = useState<string[]>([])
  const [openToRemote, setOpenToRemote] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    linkedin: '',
    currentJobTitle: '',
    totalExperience: '',
    desiredLocation: '',
    expectedSalary: '',
    specialization: '',
  })

  const update = (key: string, value: string): void => {
    setForm((f) => ({ ...f, [key]: value }))
  }

  const toggleStatus = (status: string): void => {
    setWorkStatus((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    )
  }

  const submit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    const eMap: Record<string, string> = {}
    if (!form.firstName) eMap.firstName = 'Required'
    if (!form.lastName) eMap.lastName = 'Required'
    if (!form.email) eMap.email = 'Required'
    if (!form.phone) eMap.phone = 'Required'
    if (!form.currentJobTitle) eMap.currentJobTitle = 'Required'
    if (!form.totalExperience) eMap.totalExperience = 'Required'
    if (workStatus.length === 0) eMap.workStatus = 'Select at least one'
    if (skills.length === 0) eMap.skills = 'Add at least one skill'
    if (coverNote.length > 300) eMap.coverNote = 'Max 300 characters'
    setErrors(eMap)
    if (Object.keys(eMap).length > 0) return

    setPending(true)
    const formData = new FormData()
    formData.append('firstName', form.firstName)
    formData.append('lastName', form.lastName)
    formData.append('email', form.email)
    formData.append('phone', form.phone)
    formData.append('city', form.city)
    formData.append('state', form.state)
    formData.append('linkedin', form.linkedin)
    formData.append('currentJobTitle', form.currentJobTitle)
    formData.append('totalExperience', form.totalExperience)
    formData.append('workStatus', JSON.stringify(workStatus))
    formData.append('desiredLocation', form.desiredLocation)
    formData.append('openToRemote', String(openToRemote))
    formData.append('expectedSalary', form.expectedSalary)
    formData.append('skills', JSON.stringify(skills))
    formData.append('specialization', form.specialization)
    formData.append('coverNote', coverNote)
    if (resumeFile) {
      formData.append('resume', resumeFile)
    }
    const res = await fetch('/api/apply', { method: 'POST', body: formData })
    const result = (await res.json()) as { success: boolean }
    setPending(false)
    if (result.success) setSuccess(true)
  }

  if (success) {
    return (
      <div className="rounded-card border border-vx-border bg-vx-blue-lt p-10 text-center">
        <h3 className="font-display text-2xl font-semibold text-vx-navy">
          Application received!
        </h3>
        <p className="mt-3 text-vx-muted">
          We&apos;ll review your profile and reach out within 2–3 business days.
          {jobId && <span className="mt-2 block text-sm">Reference: {jobId}</span>}
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        void submit(e)
      }}
      className="space-y-10"
    >
      <fieldset>
        <legend className="font-display text-lg font-semibold text-vx-navy">
          Basic Information
        </legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <FormField
            label="First Name"
            name="firstName"
            required
            error={errors.firstName}
          >
            <input
              id="firstName"
              className={inputClassName}
              value={form.firstName}
              onChange={(ev) => update('firstName', ev.target.value)}
            />
          </FormField>
          <FormField label="Last Name" name="lastName" required error={errors.lastName}>
            <input
              id="lastName"
              className={inputClassName}
              value={form.lastName}
              onChange={(ev) => update('lastName', ev.target.value)}
            />
          </FormField>
          <FormField label="Email Address" name="email" required error={errors.email}>
            <input
              id="email"
              type="email"
              className={inputClassName}
              value={form.email}
              onChange={(ev) => update('email', ev.target.value)}
            />
          </FormField>
          <FormField label="Phone Number" name="phone" required error={errors.phone}>
            <input
              id="phone"
              type="tel"
              className={inputClassName}
              value={form.phone}
              onChange={(ev) => update('phone', ev.target.value)}
            />
          </FormField>
          <FormField label="City" name="city" required>
            <input
              id="city"
              className={inputClassName}
              value={form.city}
              onChange={(ev) => update('city', ev.target.value)}
            />
          </FormField>
          <FormField label="State" name="state" required>
            <input
              id="state"
              className={inputClassName}
              value={form.state}
              onChange={(ev) => update('state', ev.target.value)}
            />
          </FormField>
          <FormField
            label="LinkedIn Profile URL"
            name="linkedin"
            className="sm:col-span-2"
          >
            <input
              id="linkedin"
              type="url"
              className={inputClassName}
              value={form.linkedin}
              onChange={(ev) => update('linkedin', ev.target.value)}
            />
          </FormField>
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-display text-lg font-semibold text-vx-navy">
          Experience & Preferences
        </legend>
        <div className="mt-4 space-y-5">
          <div>
            <p className="mb-2 text-sm font-medium text-vx-body">Resume Upload</p>
            <FileDropzone
              onFile={setResumeFile}
              label="PDF or DOC — drag & drop or browse"
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              label="Current Job Title"
              name="currentJobTitle"
              required
              error={errors.currentJobTitle}
            >
              <input
                id="currentJobTitle"
                className={inputClassName}
                value={form.currentJobTitle}
                onChange={(ev) => update('currentJobTitle', ev.target.value)}
              />
            </FormField>
            <FormField
              label="Total Experience"
              name="totalExperience"
              required
              error={errors.totalExperience}
            >
              <select
                id="totalExperience"
                className={inputClassName}
                value={form.totalExperience}
                onChange={(ev) => update('totalExperience', ev.target.value)}
              >
                <option value="">Select</option>
                {EXPERIENCE_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-vx-body">Desired Work Status</p>
            {errors.workStatus && (
              <p className="mb-2 text-xs text-red-600">{errors.workStatus}</p>
            )}
            <div className="flex flex-wrap gap-3">
              {WORK_STATUS.map((s) => (
                <label key={s} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={workStatus.includes(s)}
                    onChange={() => toggleStatus(s)}
                  />
                  {s}
                </label>
              ))}
            </div>
          </div>
          <FormField label="Desired Location" name="desiredLocation">
            <input
              id="desiredLocation"
              className={inputClassName}
              value={form.desiredLocation}
              onChange={(ev) => update('desiredLocation', ev.target.value)}
            />
          </FormField>
          <label className="flex items-center gap-2 text-sm text-vx-body">
            <input
              type="checkbox"
              checked={openToRemote}
              onChange={(e) => setOpenToRemote(e.target.checked)}
            />
            Open to Remote
          </label>
          <FormField label="Expected Salary Range" name="expectedSalary">
            <input
              id="expectedSalary"
              className={inputClassName}
              value={form.expectedSalary}
              onChange={(ev) => update('expectedSalary', ev.target.value)}
            />
          </FormField>
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-display text-lg font-semibold text-vx-navy">
          About You
        </legend>
        <div className="mt-4 space-y-5">
          <div>
            <p className="mb-2 text-sm font-medium text-vx-body">Skills</p>
            {errors.skills && (
              <p className="mb-2 text-xs text-red-600">{errors.skills}</p>
            )}
            <TagInput tags={skills} onChange={setSkills} />
          </div>
          <FormField label="Specialization Area" name="specialization">
            <select
              id="specialization"
              className={inputClassName}
              value={form.specialization}
              onChange={(ev) => update('specialization', ev.target.value)}
            >
              <option value="">Select</option>
              {SPECIALIZATIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Brief Cover Note" name="coverNote" error={errors.coverNote}>
            <textarea
              id="coverNote"
              rows={4}
              maxLength={300}
              className={inputClassName}
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
            />
            <p className="mt-1 text-right text-xs text-vx-muted">
              {coverNote.length}/300
            </p>
          </FormField>
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={pending}
        className="btn-primary disabled:opacity-70"
      >
        {pending ? 'Submitting…' : 'Submit My Application'}
      </button>
    </form>
  )
}

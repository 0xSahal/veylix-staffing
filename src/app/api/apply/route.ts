// FORM: Candidate Application
// INTERNAL NOTIFY: info@veylixstaffing.com
// USER CONFIRM: submitter's email
// TRIGGER: /apply
// RESUME ATTACHMENT: yes (internal email only)
// Rate limiting not yet implemented.

import { NextResponse } from 'next/server'

import { z } from 'zod'

import { saveCandidateApplication } from '@/lib/db-service'
import { applicationEmailTemplates } from '@/lib/email-templates'
import { verifyRecaptchaToken } from '@/lib/recaptcha-verify'
import { NOTIFY_ADDRESS } from '@/lib/resend'
import { sendFormEmails } from '@/lib/send-form-emails'
import { logServerError } from '@/lib/server-log'

const MAX_RESUME_BYTES = 5 * 1024 * 1024
const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx']

const emailSchema = z.string().email('Please enter a valid email address.')

const applySchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: emailSchema,
  phone: z.string().min(1),
  city: z.string().optional(),
  state: z.string().optional(),
  linkedin: z.string().optional(),
  currentJobTitle: z.string().min(1),
  totalExperience: z.string().min(1),
  workStatus: z.array(z.string()).min(1),
  desiredLocation: z.string().min(1),
  openToRemote: z.boolean(),
  expectedSalary: z.string().optional(),
  skills: z.array(z.string()).min(1),
  specialization: z.string().min(1),
  coverNote: z.string().max(300),
})

function formFieldString(fd: FormData, key: string): string {
  const value = fd.get(key)
  return typeof value === 'string' ? value : ''
}

function parseJsonArray(value: string): string[] {
  try {
    const parsed: unknown = JSON.parse(value)
    if (Array.isArray(parsed) && parsed.every((item) => typeof item === 'string')) {
      return parsed
    }
  } catch {
    // fall through
  }
  return []
}

function isValidResume(file: File): boolean {
  const name = file.name.toLowerCase()
  if (!ALLOWED_EXTENSIONS.some((ext) => name.endsWith(ext))) {
    return false
  }
  return file.size <= MAX_RESUME_BYTES
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const fd = await request.formData()

    const recaptchaToken = formFieldString(fd, 'recaptchaToken') || null
    const recaptchaResult = await verifyRecaptchaToken(
      recaptchaToken,
      'candidate_apply',
      0.5
    )
    if (!recaptchaResult.success) {
      return NextResponse.json(
        { success: false, error: 'Request could not be verified. Please try again.' },
        { status: 400 }
      )
    }

    const raw = {
      firstName: formFieldString(fd, 'firstName'),
      lastName: formFieldString(fd, 'lastName'),
      email: formFieldString(fd, 'email'),
      phone: formFieldString(fd, 'phone'),
      city: formFieldString(fd, 'city') || undefined,
      state: formFieldString(fd, 'state') || undefined,
      linkedin: formFieldString(fd, 'linkedin') || undefined,
      currentJobTitle: formFieldString(fd, 'currentJobTitle'),
      totalExperience: formFieldString(fd, 'totalExperience'),
      workStatus: parseJsonArray(formFieldString(fd, 'workStatus')),
      desiredLocation: formFieldString(fd, 'desiredLocation'),
      openToRemote: formFieldString(fd, 'openToRemote') === 'true',
      expectedSalary: formFieldString(fd, 'expectedSalary') || undefined,
      skills: parseJsonArray(formFieldString(fd, 'skills')),
      specialization: formFieldString(fd, 'specialization'),
      coverNote: formFieldString(fd, 'coverNote'),
    }

    const parsed = applySchema.safeParse(raw)

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const resumeEntry = fd.get('resume')
    let attachments: { filename: string; content: Buffer }[] | undefined
    let resumeFileName: string | undefined
    let resumeFileSize: number | undefined

    if (resumeEntry instanceof File && resumeEntry.size > 0) {
      if (!isValidResume(resumeEntry)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid resume file. Upload a PDF or Word document under 5MB.',
          },
          { status: 400 }
        )
      }
      resumeFileName = resumeEntry.name
      resumeFileSize = resumeEntry.size
      attachments = [
        {
          filename: resumeEntry.name,
          content: Buffer.from(await resumeEntry.arrayBuffer()),
        },
      ]
    }

    const templates = applicationEmailTemplates(parsed.data)

    const [dbResult, emailResult] = await Promise.allSettled([
      saveCandidateApplication({
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        city: parsed.data.city ?? '',
        state: parsed.data.state ?? '',
        linkedinUrl: parsed.data.linkedin,
        currentJobTitle: parsed.data.currentJobTitle,
        totalExperience: parsed.data.totalExperience,
        desiredWorkStatus: parsed.data.workStatus,
        desiredLocation: parsed.data.desiredLocation,
        expectedSalary: parsed.data.expectedSalary,
        skills: parsed.data.skills.join(', '),
        specialization: parsed.data.specialization,
        coverNote: parsed.data.coverNote,
        resumeFileName,
        resumeFileSize,
      }),
      sendFormEmails(
        {
          to: NOTIFY_ADDRESS,
          subject: templates.internalSubject,
          html: templates.internalHtml,
          attachments,
        },
        {
          to: parsed.data.email,
          subject: templates.userSubject,
          html: templates.userHtml,
        }
      ),
    ])

    if (dbResult.status === 'rejected') {
      logServerError('api/apply/db', dbResult.reason)
    }

    const dbOk = dbResult.status === 'fulfilled'
    const emailOk = emailResult.status === 'fulfilled' && emailResult.value === 'ok'

    if (!dbOk && !emailOk) {
      return NextResponse.json(
        { success: false, error: 'Failed to send emails. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    logServerError('api/apply', error)
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

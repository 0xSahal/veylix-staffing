// FORM: General Contact Form
// INTERNAL NOTIFY: info@veylixstaffing.com
// USER CONFIRM: submitter's email
// TRIGGER: /contact
// RESUME ATTACHMENT: no
// Rate limiting not yet implemented.

import { NextResponse } from 'next/server'

import { z } from 'zod'

import { saveContactSubmission } from '@/lib/db-service'
import { contactEmailTemplates } from '@/lib/email-templates'
import { verifyRecaptchaToken } from '@/lib/recaptcha-verify'
import { NOTIFY_ADDRESS } from '@/lib/resend'
import { sendFormEmails } from '@/lib/send-form-emails'
import { logServerError } from '@/lib/server-log'

const contactSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(10),
  recaptchaToken: z.string().optional(),
})

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body: unknown = await request.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const recaptchaResult = await verifyRecaptchaToken(
      parsed.data.recaptchaToken,
      'contact_submit',
      0.5
    )
    if (!recaptchaResult.success) {
      return NextResponse.json(
        { success: false, error: 'Request could not be verified. Please try again.' },
        { status: 400 }
      )
    }

    const { recaptchaToken: _recaptchaToken, ...formData } = parsed.data
    const templates = contactEmailTemplates(formData)

    const [dbResult, emailResult] = await Promise.allSettled([
      saveContactSubmission(formData),
      sendFormEmails(
        {
          to: NOTIFY_ADDRESS,
          subject: templates.internalSubject,
          html: templates.internalHtml,
        },
        {
          to: formData.email,
          subject: templates.userSubject,
          html: templates.userHtml,
        }
      ),
    ])

    if (dbResult.status === 'rejected') {
      logServerError('api/contact/db', dbResult.reason)
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
    logServerError('api/contact', error)
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

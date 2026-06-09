// FORM: Newsletter Subscribe
// INTERNAL NOTIFY: info@veylixstaffing.com
// USER CONFIRM: submitter's email
// TRIGGER: Footer / Blog listing
// RESUME ATTACHMENT: no
// Rate limiting not yet implemented.

import { NextResponse } from 'next/server'

import { z } from 'zod'

import { newsletterEmailTemplates } from '@/lib/email-templates'
import { NOTIFY_ADDRESS } from '@/lib/resend'
import { sendFormEmails } from '@/lib/send-form-emails'
import { logServerError } from '@/lib/server-log'

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
})

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body: unknown = await request.json()
    const parsed = newsletterSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message },
        { status: 400 }
      )
    }

    const templates = newsletterEmailTemplates(parsed.data)
    const result = await sendFormEmails(
      {
        to: NOTIFY_ADDRESS,
        subject: templates.internalSubject,
        html: templates.internalHtml,
      },
      {
        to: parsed.data.email,
        subject: templates.userSubject,
        html: templates.userHtml,
      }
    )

    if (result === 'failed') {
      return NextResponse.json(
        { success: false, error: 'Failed to send emails. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    logServerError('api/newsletter', error)
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

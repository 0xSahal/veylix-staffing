// FORM: Newsletter Subscribe
// INTERNAL NOTIFY: info@veylixstaffing.com
// USER CONFIRM: submitter's email
// TRIGGER: Footer / Blog listing
// RESUME ATTACHMENT: no
// Rate limiting not yet implemented.

import { NextResponse } from 'next/server'

import { z } from 'zod'

import { saveNewsletterSubscriber } from '@/lib/db-service'
import { newsletterEmailTemplates } from '@/lib/email-templates'
import { verifyRecaptchaToken } from '@/lib/recaptcha-verify'
import { NOTIFY_ADDRESS } from '@/lib/resend'
import { sendFormEmails } from '@/lib/send-form-emails'
import { logServerError } from '@/lib/server-log'

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  recaptchaToken: z.string().optional(),
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

    const recaptchaResult = await verifyRecaptchaToken(
      parsed.data.recaptchaToken,
      'newsletter_subscribe',
      0.5
    )
    if (!recaptchaResult.success) {
      return NextResponse.json(
        { success: false, error: 'Request could not be verified. Please try again.' },
        { status: 400 }
      )
    }

    const { recaptchaToken: _recaptchaToken, email } = parsed.data
    const formData = { email }
    const templates = newsletterEmailTemplates(formData)

    const [dbResult, emailResult] = await Promise.allSettled([
      saveNewsletterSubscriber(formData),
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
      logServerError('api/newsletter/db', dbResult.reason)
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
    logServerError('api/newsletter', error)
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

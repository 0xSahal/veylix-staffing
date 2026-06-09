// FORM: Place Job Order (4-step)
// INTERNAL NOTIFY: info@veylixstaffing.com
// USER CONFIRM: submitter's email
// TRIGGER: /place-job
// RESUME ATTACHMENT: no
// In-memory rate limiting is active below.

import { NextResponse } from 'next/server'

import { placeJobSchema } from '@/components/forms/place-job/schema'
import { jobOrderEmailTemplates } from '@/lib/email-templates'
import { getClientKey, isRateLimited } from '@/lib/rate-limit'
import { NOTIFY_ADDRESS } from '@/lib/resend'
import { sendFormEmails } from '@/lib/send-form-emails'
import { logServerError } from '@/lib/server-log'

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body: unknown = await request.json()
    const parsed = placeJobSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const clientKey = await getClientKey()
    if (isRateLimited(clientKey)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many submissions. Please try again in an hour.',
        },
        { status: 429 }
      )
    }

    const clean = Object.fromEntries(
      Object.entries(parsed.data).map(([key, value]) => [
        key,
        typeof value === 'string' ? value.trim() : value,
      ])
    ) as typeof parsed.data

    const orderId = `VO-${Date.now()}`
    const templates = jobOrderEmailTemplates(clean, orderId)

    const result = await sendFormEmails(
      {
        to: NOTIFY_ADDRESS,
        subject: templates.internalSubject,
        html: templates.internalHtml,
      },
      {
        to: clean.email,
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

    return NextResponse.json({ success: true, orderId })
  } catch (error) {
    logServerError('api/place-job', error)
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

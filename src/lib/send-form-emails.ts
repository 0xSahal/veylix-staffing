import { FROM_ADDRESS, resend } from '@/lib/resend'
import { logServerError } from '@/lib/server-log'

export type EmailAttachment = {
  filename: string
  content: Buffer
}

export type EmailPayload = {
  to: string
  subject: string
  html: string
  attachments?: EmailAttachment[]
}

export async function sendFormEmails(
  internal: EmailPayload,
  user: EmailPayload
): Promise<'ok' | 'failed'> {
  const [internalResult, userResult] = await Promise.allSettled([
    resend.emails.send({
      from: FROM_ADDRESS,
      to: internal.to,
      subject: internal.subject,
      html: internal.html,
      attachments: internal.attachments,
    }),
    resend.emails.send({
      from: FROM_ADDRESS,
      to: user.to,
      subject: user.subject,
      html: user.html,
    }),
  ])

  if (internalResult.status === 'rejected') {
    logServerError('email', internalResult.reason)
  } else if (internalResult.value.error) {
    logServerError('email', internalResult.value.error)
  }

  if (userResult.status === 'rejected') {
    logServerError('email', userResult.reason)
  } else if (userResult.value.error) {
    logServerError('email', userResult.value.error)
  }

  const internalOk = internalResult.status === 'fulfilled' && !internalResult.value.error
  const userOk = userResult.status === 'fulfilled' && !userResult.value.error

  if (!internalOk && !userOk) {
    return 'failed'
  }

  return 'ok'
}

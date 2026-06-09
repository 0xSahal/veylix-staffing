import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable')
}

export const resend = new Resend(process.env.RESEND_API_KEY)

export const FROM_ADDRESS = 'Veylix Staffing <noreply@veylixstaffing.com>'
export const NOTIFY_ADDRESS = 'info@veylixstaffing.com'

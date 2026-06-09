import type { PlaceJobValues } from '@/components/forms/place-job/schema'
import { siteConfig } from '@/config/site'

const BRAND = {
  navy: '#0F2246',
  blue: '#1A6EDC',
  text: '#1e293b',
  muted: '#64748b',
  white: '#ffffff',
  surface: '#F0F4FA',
} as const

const APPLY_NEXT_STEPS = [
  'We review your resume within 24 hours',
  'A recruiter reaches out to discuss your goals',
  'We match you to relevant openings',
  'We prepare you for interviews',
  'You get hired!',
] as const

function emailLayout(contentHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:${BRAND.surface};font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.surface};padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:${BRAND.white};border-radius:8px;overflow:hidden;">
          <tr>
            <td style="background-color:${BRAND.navy};padding:20px 32px;">
              <p style="margin:0;font-size:20px;font-weight:bold;color:${BRAND.white};">Veylix Staffing</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;color:${BRAND.text};font-size:15px;line-height:1.6;">
              ${contentHtml}
            </td>
          </tr>
          <tr>
            <td style="background-color:${BRAND.navy};padding:20px 32px;text-align:center;">
              <p style="margin:0 0 6px;font-size:13px;color:${BRAND.white};font-weight:600;">Where Talent Meets Opportunity.</p>
              <p style="margin:0;font-size:12px;color:${BRAND.muted};">
                <a href="${siteConfig.url}" style="color:#94a3b8;text-decoration:none;">${siteConfig.url.replace('https://', '')}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function fieldTable(rows: { label: string; value: string }[]): string {
  const rowsHtml = rows
    .map(
      ({ label, value }) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-weight:600;color:${BRAND.text};width:35%;vertical-align:top;">${label}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:${BRAND.text};vertical-align:top;">${value || '—'}</td>
      </tr>`
    )
    .join('')

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:6px;overflow:hidden;font-size:14px;">${rowsHtml}</table>`
}

function sectionHeading(title: string): string {
  return `<h2 style="margin:24px 0 12px;font-size:16px;font-weight:bold;color:${BRAND.navy};border-bottom:2px solid ${BRAND.blue};padding-bottom:6px;">${title}</h2>`
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export type ContactFormData = {
  fullName: string
  email: string
  phone?: string
  subject: string
  message: string
}

export function contactEmailTemplates(data: ContactFormData): {
  internalSubject: string
  userSubject: string
  internalHtml: string
  userHtml: string
} {
  const firstName = data.fullName.trim().split(/\s+/)[0] ?? data.fullName

  const internalHtml = emailLayout(`
    <p style="margin:0 0 16px;color:${BRAND.muted};">New contact form submission:</p>
    ${fieldTable([
      { label: 'Full Name', value: escapeHtml(data.fullName) },
      { label: 'Email', value: escapeHtml(data.email) },
      { label: 'Phone', value: escapeHtml(data.phone ?? '') },
      { label: 'Subject', value: escapeHtml(data.subject) },
      { label: 'Message', value: escapeHtml(data.message).replace(/\n/g, '<br>') },
    ])}
  `)

  const userHtml = emailLayout(`
    <p style="margin:0 0 16px;">Hi ${escapeHtml(firstName)},</p>
    <p style="margin:0 0 16px;">Thank you for reaching out to Veylix Staffing. We have received your message regarding <strong>${escapeHtml(data.subject)}</strong> and a member of our team will get back to you within <strong>1 business day</strong>.</p>
    <p style="margin:0 0 16px;">If you need immediate assistance, feel free to contact us:</p>
    <p style="margin:0 0 8px;">Email: <a href="mailto:info@veylixstaffing.com" style="color:${BRAND.blue};">info@veylixstaffing.com</a></p>
    <p style="margin:0 0 16px;">Phone: <a href="tel:+917048604026" style="color:${BRAND.blue};">+91 7048604026</a></p>
    <p style="margin:0;color:${BRAND.muted};">We look forward to connecting with you.</p>
  `)

  return {
    internalSubject: `[Contact] New message from ${data.fullName} — ${data.subject}`,
    userSubject: `We received your message, ${firstName} — Veylix Staffing`,
    internalHtml,
    userHtml,
  }
}

export function jobOrderEmailTemplates(
  data: PlaceJobValues,
  orderId: string
): {
  internalSubject: string
  userSubject: string
  internalHtml: string
  userHtml: string
} {
  const internalHtml = emailLayout(`
    <p style="margin:0 0 16px;color:${BRAND.muted};">New job order submission (Order ID: <strong>${orderId}</strong>):</p>
    ${sectionHeading('Company Info')}
    ${fieldTable([
      { label: 'Company Name', value: escapeHtml(data.companyName) },
      { label: 'Industry', value: escapeHtml(data.industry) },
      { label: 'Company Size', value: escapeHtml(data.companySize) },
      { label: 'Website', value: escapeHtml(data.companyWebsite ?? '') },
    ])}
    ${sectionHeading('Contact Person')}
    ${fieldTable([
      { label: 'Name', value: escapeHtml(`${data.firstName} ${data.lastName}`) },
      { label: 'Job Title', value: escapeHtml(data.jobTitle) },
      { label: 'Email', value: escapeHtml(data.email) },
      { label: 'Phone', value: escapeHtml(data.phone) },
      { label: 'Preferred Contact', value: escapeHtml(data.contactMethod) },
    ])}
    ${sectionHeading('Role Details')}
    ${fieldTable([
      { label: 'Specialisation', value: escapeHtml(data.specialisation) },
      { label: 'Staffing Type', value: escapeHtml(data.staffingType) },
      { label: 'Number of Openings', value: escapeHtml(data.numberOfOpenings) },
      { label: 'Job Titles Needed', value: escapeHtml(data.jobTitlesNeeded) },
      { label: 'Location', value: escapeHtml(data.location) },
      { label: 'Target Start Date', value: escapeHtml(data.targetStartDate) },
      {
        label: 'Job Description',
        value: escapeHtml(data.jobDescription).replace(/\n/g, '<br>'),
      },
      {
        label: 'Additional Notes',
        value: escapeHtml(data.additionalNotes ?? '').replace(/\n/g, '<br>'),
      },
    ])}
  `)

  const userHtml = emailLayout(`
    <p style="margin:0 0 16px;">Hi ${escapeHtml(data.firstName)},</p>
    <p style="margin:0 0 16px;">Thank you for placing a job order with Veylix Staffing. Your request has been received and assigned order number <strong style="color:${BRAND.blue};">${orderId}</strong>.</p>
    <p style="margin:0 0 16px;">Our team will begin sourcing candidates immediately. You can expect a curated shortlist within <strong>48 hours</strong>. A dedicated account manager will be assigned to your order and will reach out shortly.</p>
    <p style="margin:0 0 16px;">If your hiring need is urgent, please call us directly at <a href="tel:+917048604026" style="color:${BRAND.blue};">+91 7048604026</a> and reference your order number.</p>
    <p style="margin:0;color:${BRAND.muted};">We appreciate your trust in Veylix Staffing.</p>
  `)

  return {
    internalSubject: `[Job Order] ${data.companyName} — ${data.jobTitlesNeeded}`,
    userSubject: `Job order received — we'll be in touch within 48 hours`,
    internalHtml,
    userHtml,
  }
}

export type ApplicationFormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  city?: string
  state?: string
  linkedin?: string
  currentJobTitle: string
  totalExperience: string
  workStatus: string[]
  desiredLocation: string
  openToRemote: boolean
  expectedSalary?: string
  skills: string[]
  specialization: string
  coverNote?: string
}

export function applicationEmailTemplates(data: ApplicationFormData): {
  internalSubject: string
  userSubject: string
  internalHtml: string
  userHtml: string
} {
  const specializationBanner = `
    <div style="background-color:${BRAND.blue};color:${BRAND.white};padding:12px 16px;border-radius:6px;margin-bottom:20px;font-weight:bold;font-size:15px;">
      Specialization: ${escapeHtml(data.specialization)}
    </div>`

  const internalHtml = emailLayout(`
    <p style="margin:0 0 16px;color:${BRAND.muted};">New candidate application:</p>
    ${specializationBanner}
    ${sectionHeading('Personal Info')}
    ${fieldTable([
      { label: 'Name', value: escapeHtml(`${data.firstName} ${data.lastName}`) },
      { label: 'Email', value: escapeHtml(data.email) },
      { label: 'Phone', value: escapeHtml(data.phone) },
      { label: 'City', value: escapeHtml(data.city ?? '') },
      { label: 'State', value: escapeHtml(data.state ?? '') },
      { label: 'LinkedIn', value: escapeHtml(data.linkedin ?? '') },
    ])}
    ${sectionHeading('Professional Profile')}
    ${fieldTable([
      { label: 'Current Job Title', value: escapeHtml(data.currentJobTitle) },
      { label: 'Total Experience', value: escapeHtml(data.totalExperience) },
      { label: 'Work Status', value: escapeHtml(data.workStatus.join(', ')) },
      { label: 'Desired Location', value: escapeHtml(data.desiredLocation) },
      { label: 'Open to Remote', value: data.openToRemote ? 'Yes' : 'No' },
      { label: 'Expected Salary', value: escapeHtml(data.expectedSalary ?? '') },
      { label: 'Skills', value: escapeHtml(data.skills.join(', ')) },
      { label: 'Specialization', value: escapeHtml(data.specialization) },
      {
        label: 'Cover Note',
        value: escapeHtml(data.coverNote ?? '').replace(/\n/g, '<br>'),
      },
    ])}
  `)

  const stepsHtml = APPLY_NEXT_STEPS.map(
    (step, i) => `<li style="margin-bottom:8px;"><strong>${i + 1}.</strong> ${step}</li>`
  ).join('')

  const userHtml = emailLayout(`
    <p style="margin:0 0 16px;">Hi ${escapeHtml(data.firstName)},</p>
    <p style="margin:0 0 16px;">Thank you for applying with Veylix Staffing! We have received your application and our recruiting team will review your profile within <strong>24 hours</strong>.</p>
    <p style="margin:0 0 12px;font-weight:bold;color:${BRAND.navy};">What happens next?</p>
    <ol style="margin:0 0 20px;padding-left:20px;color:${BRAND.text};">${stepsHtml}</ol>
    <p style="margin:0 0 8px;">We're excited to learn more about you and help you find the right opportunity.</p>
    <p style="margin:0;color:${BRAND.muted};">Warm regards,<br><strong>The Veylix Recruiting Team</strong></p>
  `)

  return {
    internalSubject: `[Application] ${data.firstName} ${data.lastName} — ${data.currentJobTitle} (${data.specialization})`,
    userSubject: `Application received — ${data.firstName}, we'll review within 24 hours`,
    internalHtml,
    userHtml,
  }
}

export function newsletterEmailTemplates(data: { email: string }): {
  internalSubject: string
  userSubject: string
  internalHtml: string
  userHtml: string
} {
  const internalHtml = emailLayout(`
    <p style="margin:0;color:${BRAND.text};">New newsletter subscriber: <strong>${escapeHtml(data.email)}</strong></p>
  `)

  const userHtml = emailLayout(`
    <p style="margin:0 0 16px;">You're on the list!</p>
    <p style="margin:0 0 16px;">Thanks for subscribing to the Veylix Staffing newsletter. Twice a month, no filler — just what matters:</p>
    <ul style="margin:0 0 16px;padding-left:20px;">
      <li style="margin-bottom:6px;">Salary range insights across industries</li>
      <li style="margin-bottom:6px;">Hiring trends and market notes</li>
      <li style="margin-bottom:6px;">Straight answers from recruiters in the field</li>
    </ul>
    <p style="margin:0;color:${BRAND.muted};font-size:13px;">You can unsubscribe at any time by replying to any newsletter email.</p>
  `)

  return {
    internalSubject: `[Newsletter] New subscriber — ${data.email}`,
    userSubject: `You're on the list — Veylix Staffing`,
    internalHtml,
    userHtml,
  }
}

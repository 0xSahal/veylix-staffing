// DEPLOYMENT CHECKLIST:
// 1. Add NEXT_PUBLIC_RECAPTCHA_SITE_KEY to Vercel → Settings → Environment Variables
// 2. Add RECAPTCHA_SECRET_KEY to Vercel → Settings → Environment Variables
// 3. In Google reCAPTCHA Admin Console (https://www.google.com/recaptcha/admin):
//    - Type: reCAPTCHA v3
//    - Domains: veylixstaffing.com, www.veylixstaffing.com, localhost
// 4. NEXT_PUBLIC_ variables are exposed to the browser — never put the secret key there

import { logServerError } from '@/lib/server-log'

interface RecaptchaVerifyResponse {
  success: boolean
  score: number
  action: string
  challenge_ts: string
  hostname: string
  'error-codes'?: string[]
}

interface VerifyResult {
  success: boolean
  score: number
  reason?: string
}

/**
 * Verifies a reCAPTCHA v3 token server-side.
 * Returns { success: true } for score >= threshold (default 0.5).
 * Returns { success: false, reason } for low scores or invalid tokens.
 * Returns { success: true, score: 1.0 } if token is null (reCAPTCHA unavailable
 * on client — we allow it through rather than blocking legitimate users).
 */
export async function verifyRecaptchaToken(
  token: string | null | undefined,
  expectedAction?: string,
  threshold = 0.5
): Promise<VerifyResult> {
  // If no token (reCAPTCHA blocked/unavailable on client), allow through
  if (!token) {
    logServerError(
      'recaptcha',
      'token missing — allowing submission (reCAPTCHA may be blocked)'
    )
    return { success: true, score: 1.0, reason: 'token_missing_allowed' }
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  if (!secretKey) {
    logServerError(
      'recaptcha',
      'RECAPTCHA_SECRET_KEY not configured — skipping verification'
    )
    return { success: true, score: 1.0, reason: 'secret_not_configured' }
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }).toString(),
    })

    const data = (await response.json()) as RecaptchaVerifyResponse

    if (!data.success) {
      logServerError(
        'recaptcha',
        `verification failed: ${data['error-codes']?.join(', ') ?? 'unknown'}`
      )
      return { success: false, score: 0, reason: 'verification_failed' }
    }

    // Optionally verify the action matches what we expect
    if (expectedAction && data.action !== expectedAction) {
      logServerError(
        'recaptcha',
        `action mismatch: expected ${expectedAction}, got ${data.action}`
      )
      return { success: false, score: data.score, reason: 'action_mismatch' }
    }

    if (data.score < threshold) {
      logServerError(
        'recaptcha',
        `score too low: ${data.score} (threshold: ${threshold})`
      )
      return { success: false, score: data.score, reason: 'score_too_low' }
    }

    return { success: true, score: data.score }
  } catch (err) {
    // Network error calling Google — allow through rather than blocking
    logServerError('recaptcha', err)
    return { success: true, score: 1.0, reason: 'verification_error_allowed' }
  }
}

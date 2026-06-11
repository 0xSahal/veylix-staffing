// Extend Window type for grecaptcha
declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

/**
 * Executes reCAPTCHA v3 and returns a token.
 * Returns null if reCAPTCHA is not available (ad blocker, network issue).
 * action should be a snake_case descriptor of the form: e.g. "contact_submit"
 */
export async function getRecaptchaToken(action: string): Promise<string | null> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  if (!siteKey) {
    return null
  }

  return new Promise((resolve) => {
    // Timeout fallback — if grecaptcha doesn't load in 3s, proceed without token
    const timeout = setTimeout(() => {
      resolve(null)
    }, 3000)

    if (typeof window === 'undefined' || !window.grecaptcha) {
      clearTimeout(timeout)
      resolve(null)
      return
    }

    window.grecaptcha.ready(() => {
      clearTimeout(timeout)
      void window.grecaptcha
        .execute(siteKey, { action })
        .then(resolve)
        .catch(() => resolve(null))
    })
  })
}

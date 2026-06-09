'use server'

// Contact, place-job, apply, and newsletter submissions are handled via /api/* routes (Resend).

import { z } from 'zod'

type ActionResult = {
  success: boolean
  error?: string
}

const emailSchema = z.string().email('Please enter a valid email address.')

function devLog(label: string, data: unknown): void {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console -- debug logging until email integration
    console.info(label, data)
  }
}

const sidebarSchema = z.object({
  name: z.string().min(1),
  email: emailSchema,
  interest: z.string().min(1),
})

export async function sidebarReachOut(
  data: z.infer<typeof sidebarSchema>
): Promise<ActionResult> {
  await Promise.resolve()
  const parsed = sidebarSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message }
  }
  devLog('[sidebarReachOut]', parsed.data)
  return { success: true }
}

'use server'

import { headers } from 'next/headers'

import { z } from 'zod'

import { placeJobSchema } from '@/components/forms/place-job/schema'

type ActionResult = {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string[]>
}

const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const submissionLog = new Map<string, number[]>()

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const recent = (submissionLog.get(key) ?? []).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  )
  if (recent.length >= RATE_LIMIT_MAX) {
    submissionLog.set(key, recent)
    return true
  }
  recent.push(now)
  submissionLog.set(key, recent)
  return false
}

async function getClientKey(): Promise<string> {
  const h = await headers()
  const forwarded = h.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() ?? h.get('x-real-ip') ?? 'unknown'
  return ip
}

const emailSchema = z.string().email('Please enter a valid email address.')

function devLog(label: string, data: unknown): void {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console -- debug logging until email integration
    console.info(label, data)
  }
}

export async function newsletterSubscribe(data: {
  email: string
}): Promise<ActionResult> {
  await Promise.resolve()
  const parsed = z.object({ email: emailSchema }).safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message }
  }
  devLog('[newsletter]', parsed.data.email)
  return { success: true }
}

export async function placeJobOrder(
  data: z.infer<typeof placeJobSchema>
): Promise<ActionResult> {
  const parsed = placeJobSchema.safeParse(data)
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const clientKey = await getClientKey()
  if (isRateLimited(clientKey)) {
    return {
      success: false,
      error: 'Too many submissions. Please try again in an hour.',
    }
  }

  const clean = Object.fromEntries(
    Object.entries(parsed.data).map(([key, value]) => [
      key,
      typeof value === 'string' ? value.trim() : value,
    ])
  )

  devLog('[placeJobOrder]', clean)
  return { success: true }
}

const applySchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: emailSchema,
  phone: z.string().min(1),
  city: z.string().optional(),
  state: z.string().optional(),
  linkedin: z.string().optional(),
  currentJobTitle: z.string().min(1),
  totalExperience: z.string().min(1),
  workStatus: z.array(z.string()).min(1),
  desiredLocation: z.string().min(1),
  openToRemote: z.boolean(),
  expectedSalary: z.string().optional(),
  skills: z.array(z.string()).min(1),
  specialization: z.string().min(1),
  coverNote: z.string().max(300),
})

export async function applyNow(data: z.infer<typeof applySchema>): Promise<ActionResult> {
  await Promise.resolve()
  const parsed = applySchema.safeParse(data)
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }
  devLog('[applyNow]', parsed.data)
  return { success: true }
}

const contactSchema = z.object({
  fullName: z.string().min(1),
  email: emailSchema,
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(10),
})

export async function contactMessage(
  data: z.infer<typeof contactSchema>
): Promise<ActionResult> {
  await Promise.resolve()
  const parsed = contactSchema.safeParse(data)
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }
  devLog('[contact]', parsed.data)
  return { success: true }
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

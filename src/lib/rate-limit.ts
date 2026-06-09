import { headers } from 'next/headers'

const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const submissionLog = new Map<string, number[]>()

export function isRateLimited(key: string): boolean {
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

export async function getClientKey(): Promise<string> {
  const h = await headers()
  const forwarded = h.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() ?? h.get('x-real-ip') ?? 'unknown'
  return ip
}

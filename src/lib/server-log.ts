export function logServerError(context: string, detail: unknown): void {
  // eslint-disable-next-line no-console -- centralized server-side error logging
  console.error(`[${context}]`, detail)
}

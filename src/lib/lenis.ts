import Lenis from 'lenis'

let lenisInstance: Lenis | null = null

export function getLenis(): Lenis | null {
  return lenisInstance
}

export function initLenis(): Lenis {
  if (lenisInstance) return lenisInstance

  lenisInstance = new Lenis({
    autoRaf: true,
  })

  return lenisInstance
}

export function destroyLenis(): void {
  lenisInstance?.destroy()
  lenisInstance = null
}

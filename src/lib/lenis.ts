import Lenis from 'lenis'

import type { LenisOptions } from 'lenis'

let lenisInstance: Lenis | null = null

const LENIS_DURATION = 1.4
const LENIS_WHEEL_MULTIPLIER = 0.8
const LENIS_TOUCH_MULTIPLIER = 1.5

function lenisEasing(t: number): number {
  return Math.min(1, 1.001 - Math.pow(2, -10 * t))
}

const defaultOptions: LenisOptions = {
  duration: LENIS_DURATION,
  easing: lenisEasing,
  smoothWheel: true,
  wheelMultiplier: LENIS_WHEEL_MULTIPLIER,
  touchMultiplier: LENIS_TOUCH_MULTIPLIER,
}

export function getLenis(): Lenis | null {
  return lenisInstance
}

export function initLenis(options?: Partial<LenisOptions>): Lenis {
  if (lenisInstance) return lenisInstance

  lenisInstance = new Lenis({ ...defaultOptions, ...options })

  return lenisInstance
}

export function destroyLenis(): void {
  lenisInstance?.destroy()
  lenisInstance = null
}

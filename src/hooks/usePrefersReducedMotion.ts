import { useSyncExternalStore } from 'react'

const MEDIA_QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(callback: () => void): () => void {
  const media = window.matchMedia(MEDIA_QUERY)
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}

function getSnapshot(): boolean {
  return window.matchMedia(MEDIA_QUERY).matches
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}

import { useSyncExternalStore } from 'react'

const emptySubscribe = (): (() => void) => () => {}

export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import {
  CURSOR_DOT_SCALE_DOWN,
  CURSOR_DOT_SIZE_PX,
  CURSOR_LERP_FACTOR,
  CURSOR_RING_BORDER_PX,
  CURSOR_RING_HOVER_SIZE_PX,
  CURSOR_RING_SCALE_DOWN,
  CURSOR_RING_SIZE_PX,
  CURSOR_RING_VIEW_SIZE_PX,
  CURSOR_SCALE_TRANSITION_MS,
} from '@/constants/cursor'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useMounted } from '@/hooks/useMounted'

type CursorVariant = 'default' | 'hover' | 'view'

export default function CustomCursor(): React.ReactNode {
  const mounted = useMounted()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [variant, setVariant] = useState<CursorVariant>('default')
  const [isPressed, setIsPressed] = useState(false)

  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const ringPosRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  const updateVariantFromTarget = useCallback((target: EventTarget | null): void => {
    if (!(target instanceof Element)) {
      setVariant('default')
      return
    }

    const viewEl = target.closest('[data-cursor="view"]')
    if (viewEl) {
      setVariant('view')
      return
    }

    const interactive = target.closest('a, button, [role="button"]')
    setVariant(interactive ? 'hover' : 'default')
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    const handleMouseMove = (e: MouseEvent): void => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      updateVariantFromTarget(e.target)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%) scale(${isPressed ? CURSOR_DOT_SCALE_DOWN : 1})`
      }
    }

    const handleMouseDown = (): void => setIsPressed(true)
    const handleMouseUp = (): void => setIsPressed(false)

    const tick = (): void => {
      ringPosRef.current.x +=
        (mouseRef.current.x - ringPosRef.current.x) * CURSOR_LERP_FACTOR
      ringPosRef.current.y +=
        (mouseRef.current.y - ringPosRef.current.y) * CURSOR_LERP_FACTOR

      if (ringRef.current) {
        const scale = isPressed ? CURSOR_RING_SCALE_DOWN : 1
        ringRef.current.style.transform = `translate(${ringPosRef.current.x}px, ${ringPosRef.current.y}px) translate(-50%, -50%) scale(${scale})`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDesktop, isPressed, updateVariantFromTarget])

  if (!mounted || !isDesktop) return null

  let ringSize = CURSOR_RING_SIZE_PX
  if (variant === 'view') {
    ringSize = CURSOR_RING_VIEW_SIZE_PX
  } else if (variant === 'hover') {
    ringSize = CURSOR_RING_HOVER_SIZE_PX
  }

  const ringBg =
    variant === 'hover' || variant === 'view' ? 'rgba(37, 99, 235, 0.12)' : 'transparent'

  return (
    <div aria-hidden="true">
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full border-solid border-[#2563EB]"
        style={{
          width: ringSize,
          height: ringSize,
          borderWidth: CURSOR_RING_BORDER_PX,
          backgroundColor: ringBg,
          transition: `width ${CURSOR_SCALE_TRANSITION_MS}ms cubic-bezier(0.34, 1.56, 0.64, 1), height ${CURSOR_SCALE_TRANSITION_MS}ms cubic-bezier(0.34, 1.56, 0.64, 1), background-color ${CURSOR_SCALE_TRANSITION_MS}ms ease`,
        }}
      >
        {variant === 'view' && (
          <span className="font-body text-[10px] font-semibold tracking-[0.1em] text-white">
            VIEW
          </span>
        )}
      </div>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-vx-blue"
        style={{
          width: CURSOR_DOT_SIZE_PX,
          height: CURSOR_DOT_SIZE_PX,
        }}
      />
    </div>
  )
}

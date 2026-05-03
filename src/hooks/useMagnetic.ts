import { useEffect, useRef } from 'react'
import { useReducedMotion } from './useReducedMotion'

export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(strength = 0.25, radius = 60) {
  const ref = useRef<T | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = ref.current
    if (!el) return

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = event.clientX - cx
      const dy = event.clientY - cy
      const dist = Math.hypot(dx, dy)
      if (dist > radius + Math.max(rect.width, rect.height)) {
        el.style.transform = ''
        return
      }
      const tx = Math.max(-6, Math.min(6, dx * strength))
      const ty = Math.max(-6, Math.min(6, dy * strength))
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
    }

    const onLeave = () => {
      el.style.transform = ''
    }

    window.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      el.style.transform = ''
    }
  }, [strength, radius, reduced])

  return ref
}

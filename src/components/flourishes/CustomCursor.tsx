import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './CustomCursor.css'

export function CustomCursor() {
  const reduced = useReducedMotion()
  const [enabled] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches
  })
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (reduced || !enabled) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let dx = 0, dy = 0, rx = 0, ry = 0
    let raf = 0

    const onMove = (e: PointerEvent) => {
      dx = e.clientX
      dy = e.clientY
      if (!raf) raf = requestAnimationFrame(loop)
    }

    const loop = () => {
      rx += (dx - rx) * 0.18
      ry += (dy - ry) * 0.18
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      raf = Math.abs(dx - rx) + Math.abs(dy - ry) > 0.2 ? requestAnimationFrame(loop) : 0
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest('a, button, [role="button"], [data-cursor="hover"]')) {
        ring.classList.add('is-hover')
      } else {
        ring.classList.remove('is-hover')
      }
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('mouseover', onOver)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [enabled, reduced])

  if (reduced || !enabled) return null

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  )
}

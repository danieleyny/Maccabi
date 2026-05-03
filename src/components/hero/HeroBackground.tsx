import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './HeroBackground.css'

const NODES = [
  { cx: 12, cy: 18 },
  { cx: 24, cy: 64 },
  { cx: 38, cy: 32 },
  { cx: 52, cy: 78 },
  { cx: 64, cy: 22 },
  { cx: 76, cy: 58 },
  { cx: 88, cy: 36 },
  { cx: 32, cy: 88 },
  { cx: 70, cy: 86 },
  { cx: 18, cy: 44 },
]

const EDGES: [number, number][] = [
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [4, 6],
  [5, 7],
  [9, 1],
  [7, 8],
  [2, 9],
  [4, 5],
]

export function HeroBackground() {
  const reduced = useReducedMotion()
  const layerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (reduced) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const layer = layerRef.current
    if (!layer) return

    let raf = 0
    let tx = 0
    let ty = 0
    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2
      const y = (event.clientY / window.innerHeight - 0.5) * 2
      tx = x * 6
      ty = y * 6
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        layer.style.setProperty('--px', `${tx}px`)
        layer.style.setProperty('--py', `${ty}px`)
      })
    }

    window.addEventListener('pointermove', onMove)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-bg__base" />
      <div className="hero-bg__mesh" />
      <div className="hero-bg__grid" />
      <div className="hero-bg__nodes" ref={layerRef}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="hero-bg__svg">
          <defs>
            <linearGradient id="heroEdge" x1="0" x2="1">
              <stop offset="0%" stopColor="#4cc9f0" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.65" />
            </linearGradient>
          </defs>
          {EDGES.map(([a, b], i) => (
            <line
              key={i}
              className="hero-bg__edge"
              x1={NODES[a].cx}
              y1={NODES[a].cy}
              x2={NODES[b].cx}
              y2={NODES[b].cy}
              stroke="url(#heroEdge)"
              strokeWidth={0.18}
              strokeDasharray="0.8 1.4"
              vectorEffect="non-scaling-stroke"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          ))}
          {NODES.map((node, i) => (
            <circle
              key={i}
              className="hero-bg__node"
              cx={node.cx}
              cy={node.cy}
              r={0.55}
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          ))}
        </svg>
      </div>
      <div className="hero-bg__edge-fade" />
    </div>
  )
}

import type { HTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'
import './Card.css'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'solid' | 'soft'
  tilt?: boolean
  glow?: boolean
  children: ReactNode
}

export function Card({ variant = 'glass', tilt, glow, className, children, onMouseMove, onMouseLeave, ...rest }: CardProps) {
  const handleMove = tilt
    ? (e: React.MouseEvent<HTMLDivElement>) => {
        const el = e.currentTarget
        const rect = el.getBoundingClientRect()
        const px = (e.clientX - rect.left) / rect.width
        const py = (e.clientY - rect.top) / rect.height
        const rx = (0.5 - py) * 6
        const ry = (px - 0.5) * 6
        el.style.setProperty('--tilt-rx', `${rx}deg`)
        el.style.setProperty('--tilt-ry', `${ry}deg`)
        el.style.setProperty('--mx', `${px * 100}%`)
        el.style.setProperty('--my', `${py * 100}%`)
        onMouseMove?.(e)
      }
    : onMouseMove

  const handleLeave = tilt
    ? (e: React.MouseEvent<HTMLDivElement>) => {
        const el = e.currentTarget
        el.style.setProperty('--tilt-rx', `0deg`)
        el.style.setProperty('--tilt-ry', `0deg`)
        onMouseLeave?.(e)
      }
    : onMouseLeave

  return (
    <div
      className={clsx('card', `card--${variant}`, tilt && 'card--tilt', glow && 'card--glow', className)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...rest}
    >
      {children}
    </div>
  )
}

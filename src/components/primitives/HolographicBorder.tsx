import type { ReactNode } from 'react'
import clsx from 'clsx'
import './HolographicBorder.css'

interface HolographicBorderProps {
  children: ReactNode
  radius?: number
  className?: string
  intensity?: 'subtle' | 'normal' | 'strong'
}

export function HolographicBorder({ children, radius = 16, className, intensity = 'normal' }: HolographicBorderProps) {
  return (
    <div
      className={clsx('holo', `holo--${intensity}`, className)}
      style={{ '--holo-radius': `${radius}px` } as React.CSSProperties}
    >
      <span className="holo__ring" aria-hidden="true" />
      <div className="holo__inner">{children}</div>
    </div>
  )
}

import type { ReactNode } from 'react'
import clsx from 'clsx'

interface EyebrowProps {
  children: ReactNode
  icon?: ReactNode
  muted?: boolean
  className?: string
}

export function Eyebrow({ children, icon, muted, className }: EyebrowProps) {
  return (
    <span className={clsx('eyebrow', muted && 'muted', className)}>
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </span>
  )
}

import type { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'
import './Chip.css'

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  variant?: 'filter' | 'tag' | 'mono'
  iconLeft?: ReactNode
}

export function Chip({ active, variant = 'filter', iconLeft, className, children, type = 'button', ...rest }: ChipProps) {
  return (
    <button
      type={type}
      className={clsx('chip', `chip--${variant}`, active && 'is-active', className)}
      aria-pressed={variant === 'filter' ? !!active : undefined}
      {...rest}
    >
      {iconLeft && <span className="chip__icon" aria-hidden="true">{iconLeft}</span>}
      <span>{children}</span>
    </button>
  )
}

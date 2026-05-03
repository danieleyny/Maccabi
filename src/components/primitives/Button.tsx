import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import clsx from 'clsx'
import './Button.css'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  iconRight?: ReactNode
  iconLeft?: ReactNode
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', iconLeft, iconRight, loading, className, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={clsx('btn', `btn--${variant}`, `btn--${size}`, loading && 'is-loading', className)}
      data-loading={loading || undefined}
      {...rest}
    >
      {iconLeft && <span className="btn__icon btn__icon--left" aria-hidden="true">{iconLeft}</span>}
      <span className="btn__label">{children}</span>
      {iconRight && <span className="btn__icon btn__icon--right" aria-hidden="true">{iconRight}</span>}
      {variant === 'primary' && <span className="btn__shimmer" aria-hidden="true" />}
    </button>
  )
})

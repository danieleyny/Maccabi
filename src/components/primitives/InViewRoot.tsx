import type { HTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'
import { useInView } from '../../hooks/useInView'

interface InViewRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  threshold?: number
  rootMargin?: string
  as?: 'div' | 'section'
}

/**
 * Adds `.in-view` to the element while intersecting the viewport.
 * CSS animations (motion.css) are gated by this class so they pause off-screen.
 */
export function InViewRoot({
  children,
  threshold = 0.1,
  rootMargin = '0px 0px -10% 0px',
  className,
  as = 'div',
  ...rest
}: InViewRootProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold, rootMargin })
  const Tag = as as 'div'
  return (
    <Tag ref={ref} className={clsx(className, inView && 'in-view')} {...rest}>
      {children}
    </Tag>
  )
}

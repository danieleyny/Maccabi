import type { ReactNode } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Eyebrow } from './Eyebrow'
import './SectionHeading.css'

interface SectionHeadingProps {
  eyebrow?: string
  eyebrowIcon?: ReactNode
  title: ReactNode
  body?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  eyebrowIcon,
  title,
  body,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      className={clsx('section-heading', `section-heading--${align}`, className)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow && (
        <Eyebrow icon={eyebrowIcon} muted>
          {eyebrow}
        </Eyebrow>
      )}
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </motion.div>
  )
}

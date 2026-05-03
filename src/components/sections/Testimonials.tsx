import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { InViewRoot } from '../primitives/InViewRoot'
import { SectionHeading } from '../primitives/SectionHeading'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useInView } from '../../hooks/useInView'
import { testimonials } from '../../content/testimonials'
import './Testimonials.css'

export function Testimonials() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 })
  const startX = useRef<number | null>(null)

  useEffect(() => {
    if (reduced || paused || !inView) return
    const id = setInterval(() => setActive((i) => (i + 1) % testimonials.length), 8000)
    return () => clearInterval(id)
  }, [paused, reduced, inView])

  const next = () => setActive((i) => (i + 1) % testimonials.length)
  const prev = () => setActive((i) => (i - 1 + testimonials.length) % testimonials.length)

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  }

  const onPointerDown = (e: PointerEvent) => {
    startX.current = e.clientX
  }
  const onPointerUp = (e: PointerEvent) => {
    if (startX.current == null) return
    const dx = e.clientX - startX.current
    if (Math.abs(dx) > 60) (dx < 0 ? next : prev)()
    startX.current = null
  }

  const t = testimonials[active]

  return (
    <InViewRoot as="section" id="clients" className="testi section-pad">
      <ConstellationBg />
      <div className="container testi__inner" ref={ref}>
        <SectionHeading
          eyebrow="Institution proof"
          title="Built with research offices that manage real complexity."
          align="center"
        />

        <div
          className="testi__stage"
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
          tabIndex={0}
          onKeyDown={onKey}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <button className="testi__nav testi__nav--left" aria-label="Previous testimonial" onClick={prev}>
            <ChevronLeft size={18} />
          </button>
          <button className="testi__nav testi__nav--right" aria-label="Next testimonial" onClick={next}>
            <ChevronRight size={18} />
          </button>

          <div className="testi__slot">
            <AnimatePresence mode="wait">
              <motion.figure
                key={t.name}
                className="testi__card"
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                aria-roledescription="slide"
                aria-label={`${active + 1} of ${testimonials.length}`}
              >
                <div className="testi__institution">{t.institution}</div>
                <Quote className="testi__quote-icon" size={28} aria-hidden="true" />
                <blockquote className="testi__quote">{t.quote}</blockquote>
                <figcaption className="testi__person">
                  <span className="testi__avatar" aria-hidden="true">{t.initials}</span>
                  <span className="testi__person-meta">
                    <strong>{t.name}</strong>
                    <em>{t.role}</em>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="testi__dots" role="tablist" aria-label="Choose testimonial">
            {testimonials.map((tt, i) => (
              <button
                key={tt.name}
                role="tab"
                aria-selected={active === i}
                aria-label={`Show testimonial from ${tt.short}`}
                className={clsx('testi__dot', active === i && 'is-active')}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </InViewRoot>
  )
}

function ConstellationBg() {
  return (
    <div className="testi__constellation" aria-hidden="true">
      {Array.from({ length: 30 }).map((_, i) => (
        <span
          key={i}
          style={{
            top: `${(i * 137.5) % 100}%`,
            left: `${(i * 89.3) % 100}%`,
            animationDelay: `${(i * 0.27) % 5}s`,
          }}
        />
      ))}
    </div>
  )
}

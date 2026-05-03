import { useRef, useState, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { Check } from 'lucide-react'
import { InViewRoot } from '../primitives/InViewRoot'
import { SectionHeading } from '../primitives/SectionHeading'
import { Chip } from '../primitives/Chip'
import { modules, moduleFilters, type ModuleCategory } from '../../content/modules'
import { ModuleViz } from './ModuleViz'
import './ModulesBento.css'

type FilterId = 'all' | ModuleCategory

export function ModulesBento() {
  const [filter, setFilter] = useState<FilterId>('all')
  const containerRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const positions = useRef<Record<string, DOMRect>>({})

  // FLIP: capture old positions before update
  const visible = filter === 'all' ? modules : modules.filter((m) => m.category.includes(filter as ModuleCategory))

  useLayoutEffect(() => {
    const newPositions: Record<string, DOMRect> = {}
    Object.entries(itemRefs.current).forEach(([id, el]) => {
      if (el) newPositions[id] = el.getBoundingClientRect()
    })
    // Animate from old → new
    Object.entries(newPositions).forEach(([id, newRect]) => {
      const oldRect = positions.current[id]
      const el = itemRefs.current[id]
      if (oldRect && el) {
        const dx = oldRect.left - newRect.left
        const dy = oldRect.top - newRect.top
        if (dx || dy) {
          el.animate(
            [
              { transform: `translate(${dx}px, ${dy}px)` },
              { transform: 'translate(0, 0)' },
            ],
            { duration: 450, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
          )
        }
      }
    })
    positions.current = newPositions
  }, [filter])

  return (
    <InViewRoot as="section" id="modules" className="modules section-pad">
      <div className="container">
        <SectionHeading
          eyebrow="Modules"
          title="Configurable depth, integrated breadth."
          body="Start with the modules your institution needs now. Add more as the research administration ecosystem expands."
        />

        <div className="modules__filters" role="tablist" aria-label="Filter modules">
          {moduleFilters.map((f) => (
            <Chip
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              active={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </Chip>
          ))}
        </div>

        <div ref={containerRef} className="modules__bento">
          {visible.map((m) => {
            const Icon = m.icon
            return (
              <motion.div
                key={m.id}
                ref={(el) => {
                  itemRefs.current[m.id] = el
                }}
                layout
                className={clsx('module-card', m.feature && 'module-card--feature')}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="module-card__top">
                  <span className="module-card__icon" aria-hidden="true">
                    <Icon size={22} />
                  </span>
                  <h3>{m.title}</h3>
                </div>
                <ul className="module-card__bullets">
                  {m.bullets.map((b) => (
                    <li key={b}><Check size={14} aria-hidden="true" /> {b}</li>
                  ))}
                </ul>
                <div className="module-card__viz">
                  <ModuleViz kind={m.vizKind} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </InViewRoot>
  )
}

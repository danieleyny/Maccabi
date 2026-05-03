import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useInView } from '../../hooks/useInView'
import './LiveSystemMock.css'

interface ModuleStep {
  name: string
  status: string
  hue: 'cyan' | 'purple' | 'mint' | 'gold' | 'warm'
}

const STEPS: ModuleStep[] = [
  { name: 'Grants & Contracts', status: 'Routing', hue: 'cyan' },
  { name: 'IRB', status: 'Approved', hue: 'mint' },
  { name: 'IACUC', status: 'Reviewing', hue: 'gold' },
  { name: 'COI / COC', status: 'Disclosed', hue: 'purple' },
  { name: 'Effort Reporting', status: 'Synced', hue: 'mint' },
]

export function LiveSystemMock() {
  const reduced = useReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 })
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!inView || reduced) return
    const id = setInterval(() => {
      setActive((i) => (i + 1) % STEPS.length)
    }, 1800)
    return () => clearInterval(id)
  }, [inView, reduced])

  return (
    <div ref={ref} className={clsx('live-mock', inView && 'in-view')} aria-hidden="true">
      <div className="live-mock__header">
        <span className="live-mock__dot live-mock__dot--red" />
        <span className="live-mock__dot live-mock__dot--amber" />
        <span className="live-mock__dot live-mock__dot--green" />
        <span className="live-mock__title">Institutional record</span>
        <span className="live-mock__pill">
          <span className="anim-status-pulse" /> Live
        </span>
      </div>

      <div className="live-mock__body">
        <div className="live-mock__center">
          <div className="live-mock__center-ring anim-pulse-ring" />
          <div className="live-mock__center-card">
            <small>Award · Protocol</small>
            <strong>RX-2407-118</strong>
            <span>Updated just now</span>
          </div>
        </div>

        <div className="live-mock__stack" role="list">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.name}
              role="listitem"
              className={clsx('live-mock__row', `live-mock__row--${step.hue}`, active === i && 'is-active')}
              initial={false}
              animate={{
                opacity: active === i ? 1 : 0.62,
                x: active === i ? 0 : -2,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="live-mock__row-bar" />
              <div className="live-mock__row-text">
                <strong>{step.name}</strong>
                <small>Connected</small>
              </div>
              <AnimatePresence mode="wait">
                {active === i && (
                  <motion.span
                    key={step.status}
                    className="live-mock__status"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.25 }}
                  >
                    {step.status}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="live-mock__foot">
        <span>Sources: SAP · PeopleSoft · Workday · Banner</span>
        <span>Audit trail · Permissioned views · API</span>
      </div>
    </div>
  )
}

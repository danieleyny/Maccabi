import { motion } from 'framer-motion'
import { InViewRoot } from '../primitives/InViewRoot'
import { SectionHeading } from '../primitives/SectionHeading'
import { lifecycleSteps } from '../../content/copy'
import { useInView } from '../../hooks/useInView'
import './LifecyclePipeline.css'

export function LifecyclePipeline() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3, once: true })

  return (
    <InViewRoot as="section" id="platform" className="lifecycle section-pad">
      <div className="container">
        <SectionHeading
          eyebrow="Platform"
          title="One connected platform for the full research lifecycle."
          body="Every submission becomes part of one operational record — from intake to review to reporting — without losing context between offices, modules, or systems."
        />

        <div className="lifecycle__pipeline" ref={ref} aria-label="Research lifecycle">
          <svg
            className="lifecycle__line"
            viewBox="0 0 100 4"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="lifecycleLine" x1="0" x2="1">
                <stop offset="0%" stopColor="#4cc9f0" />
                <stop offset="50%" stopColor="#4361ee" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
            <line x1="0" y1="2" x2="100" y2="2" stroke="rgba(255,255,255,0.08)" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
            <line
              x1="0"
              y1="2"
              x2="100"
              y2="2"
              stroke="url(#lifecycleLine)"
              strokeWidth="0.6"
              vectorEffect="non-scaling-stroke"
              className="lifecycle__line-fill"
              style={{ transform: inView ? 'scaleX(1)' : 'scaleX(0)' }}
            />
          </svg>

          <ol className="lifecycle__steps">
            {lifecycleSteps.map((step, i) => (
              <motion.li
                key={step.label}
                className="lifecycle__step"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="lifecycle__node">
                  <span className="lifecycle__node-pulse" />
                  <span className="lifecycle__node-num">{String(i + 1).padStart(2, '0')}</span>
                </span>
                <strong>{step.label}</strong>
                <p>{step.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </InViewRoot>
  )
}

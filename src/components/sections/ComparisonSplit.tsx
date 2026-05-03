import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { InViewRoot } from '../primitives/InViewRoot'
import { SectionHeading } from '../primitives/SectionHeading'
import { comparisonRows } from '../../content/copy'
import './ComparisonSplit.css'

export function ComparisonSplit() {
  return (
    <InViewRoot as="section" id="compare" className="compare section-pad">
      <div className="container">
        <SectionHeading
          eyebrow="Rigid vs Configurable"
          title="A platform for institutions that refuse one-size-fits-all research administration."
          body="Most systems force institutional process into the vendor's shape. Novelution shapes around institutional reality."
        />

        <div className="compare__split">
          <div className="compare__col compare__col--rigid" aria-label="Rigid systems">
            <div className="compare__col-head">
              <span className="compare__col-eyebrow">Typical systems</span>
              <strong>Rigid</strong>
            </div>
          </div>
          <div className="compare__seam" aria-hidden="true">
            <span className="compare__seam-line" />
          </div>
          <div className="compare__col compare__col--us" aria-label="Novelution">
            <div className="compare__col-head">
              <span className="compare__col-eyebrow">Novelution</span>
              <strong>Configurable</strong>
            </div>
          </div>

          {comparisonRows.map((row, i) => (
            <motion.div
              key={row.before}
              className="compare__row"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              style={{ gridRow: i + 2 }}
            >
              <div className="compare__cell compare__cell--rigid">
                <span className="compare__bullet" />
                {row.before}
              </div>
              <div className="compare__arrow">
                <ArrowRight size={16} />
              </div>
              <div className="compare__cell compare__cell--us">
                <span className="compare__bullet compare__bullet--lit" />
                {row.after}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </InViewRoot>
  )
}

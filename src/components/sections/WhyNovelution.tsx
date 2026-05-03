import { motion } from 'framer-motion'
import { Settings2, Network, HeartHandshake, Layers } from 'lucide-react'
import { InViewRoot } from '../primitives/InViewRoot'
import { SectionHeading } from '../primitives/SectionHeading'
import { whyCards } from '../../content/copy'
import './WhyNovelution.css'

const ICONS = [Settings2, Network, HeartHandshake, Layers]

export function WhyNovelution() {
  return (
    <InViewRoot as="section" id="why" className="why section-pad">
      <div className="container">
        <SectionHeading
          eyebrow="Why Novelution"
          title="Built for institutions that need flexibility without losing control."
          body="Four operating principles shape every decision in the platform — and every conversation with our team."
        />

        <div className="why__grid">
          {whyCards.map((card, i) => {
            const Icon = ICONS[i]
            return (
              <motion.article
                key={card.title}
                className="why__card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="why__edge" aria-hidden="true" />
                <div className="why__icon" aria-hidden="true">
                  <Icon size={22} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <div className="why__stats">
                  {/* TODO: real metrics from Princess */}
                  <span><strong>Configurable</strong><small>by design</small></span>
                  <span><strong>Connected</strong><small>by default</small></span>
                  <span><strong>Cooperative</strong><small>by practice</small></span>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </InViewRoot>
  )
}

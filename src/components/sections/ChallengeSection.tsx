import { motion } from 'framer-motion'
import { Card } from '../primitives/Card'
import { HolographicBorder } from '../primitives/HolographicBorder'
import { SectionHeading } from '../primitives/SectionHeading'
import { InViewRoot } from '../primitives/InViewRoot'
import { challengeCards } from '../../content/copy'
import { ChallengeIcon } from './ChallengeIcon'
import './ChallengeSection.css'

export function ChallengeSection() {
  return (
    <InViewRoot as="section" id="challenge" className="challenge section-pad">
      <div className="container">
        <SectionHeading
          eyebrow="The Challenge"
          title="Research administration should not feel fragmented."
          body="Disconnected systems, rigid workflows, and changing requirements turn institutional research operations into a tangle of duplicate work and limited visibility."
        />

        <div className="challenge__grid">
          {challengeCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <HolographicBorder radius={20} intensity="subtle">
                <Card variant="solid" tilt glow className="challenge__card">
                  <div className="challenge__icon" aria-hidden="true">
                    <ChallengeIcon kind={card.icon} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </Card>
              </HolographicBorder>
            </motion.div>
          ))}
        </div>
      </div>
    </InViewRoot>
  )
}

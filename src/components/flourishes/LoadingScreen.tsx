import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './LoadingScreen.css'

const LOGO_URL = `${import.meta.env.BASE_URL}novelution-logo.png`

const MIN_DURATION = 2600
const SESSION_KEY = 'novelution.loaded'

export function LoadingScreen() {
  const [show, setShow] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return sessionStorage.getItem(SESSION_KEY) !== '1'
  })

  useEffect(() => {
    if (!show) return
    document.body.classList.add('scroll-locked')
    const start = performance.now()

    const finish = () => {
      const elapsed = performance.now() - start
      const wait = Math.max(0, MIN_DURATION - elapsed)
      setTimeout(() => {
        sessionStorage.setItem(SESSION_KEY, '1')
        setShow(false)
        document.body.classList.remove('scroll-locked')
      }, wait)
    }

    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })

    return () => {
      document.body.classList.remove('scroll-locked')
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="loader"
          aria-label="Loading Novelution"
          role="status"
          aria-live="polite"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
        >
          <div className="loader__bg" aria-hidden="true">
            <div className="loader__mesh" />
            <div className="loader__grid" />
          </div>

          <div className="loader__inner">
            <div className="loader__svg-wrap">
              <span className="loader__halo" aria-hidden="true" />

              <svg viewBox="0 0 100 100" className="loader__svg" aria-hidden="true">
                {/*
                  Wrapper group spins after assembly (delay matches atoms+bonds = 1s).
                  Atoms slide in from compass directions, bonds draw, then whole svg rotates.
                */}
                <g className="loader__molecule">
                  {/* Hexagonal benzene-like ring — 6 vertices around center (50,50), radius 28 */}
                  <g className="loader__bonds">
                    <line x1="50"    y1="22" x2="74.25" y2="36" />
                    <line x1="74.25" y1="36" x2="74.25" y2="64" />
                    <line x1="74.25" y1="64" x2="50"    y2="78" />
                    <line x1="50"    y1="78" x2="25.75" y2="64" />
                    <line x1="25.75" y1="64" x2="25.75" y2="36" />
                    <line x1="25.75" y1="36" x2="50"    y2="22" />
                  </g>

                  {/* Carbon atoms at the two diagonal vertices */}
                  <g className="loader__carbons">
                    <circle cx="74.25" cy="36" r="5" />
                    <circle cx="25.75" cy="64" r="5" />
                  </g>

                  {/* Colored atoms — each slides in from a compass direction */}
                  <g className="loader__atom loader__atom--from-top">
                    <circle cx="50" cy="22" r="8.5" fill="#d94a2a" />
                  </g>
                  <g className="loader__atom loader__atom--from-left">
                    <circle cx="25.75" cy="36" r="8" fill="#f0c050" />
                  </g>
                  <g className="loader__atom loader__atom--from-right">
                    <circle cx="74.25" cy="64" r="8.5" fill="#3b6ad6" />
                  </g>
                  <g className="loader__atom loader__atom--from-bottom">
                    <circle cx="50" cy="78" r="8.5" fill="#2bbd83" />
                  </g>
                </g>
              </svg>
            </div>

            <motion.span
              className="loader__word"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              NOVELUTION
            </motion.span>

            <motion.span
              className="loader__tag"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.4 }}
            >
              Research administration platform
            </motion.span>

            <motion.span
              className="loader__bar-wrap"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <span className="loader__bar" />
            </motion.span>
          </div>

          {/* Hidden preload to ensure the brand PNG is in cache before reveal */}
          <img src={LOGO_URL} alt="" style={{ display: 'none' }} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

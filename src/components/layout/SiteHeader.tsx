import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrandLogo } from './BrandLogo'
import { Button } from '../primitives/Button'
import { useScrolled } from '../../hooks/useScrolled'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { navLinks } from '../../content/nav'
import './SiteHeader.css'

interface SiteHeaderProps {
  navigate: (href: string) => void
  pathname: string
}

export function SiteHeader({ navigate, pathname }: SiteHeaderProps) {
  const scrolled = useScrolled(24)
  const [open, setOpen] = useState(false)
  const isHome = pathname === '/' || pathname.endsWith('/')
  const activeId = useScrollSpy(isHome ? navLinks.map((l) => l.sectionId!).filter(Boolean) : [])

  useEffect(() => {
    if (open) {
      document.body.classList.add('scroll-locked')
    } else {
      document.body.classList.remove('scroll-locked')
    }
    return () => document.body.classList.remove('scroll-locked')
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (href: string) => {
    setOpen(false)
    navigate(href)
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <header className={clsx('site-header', scrolled && 'is-scrolled')}>
        <div className="site-header__inner container">
          <a
            className="site-header__brand"
            href={import.meta.env.BASE_URL}
            onClick={(event) => {
              event.preventDefault()
              go('/')
            }}
            aria-label="Novelution home"
          >
            <BrandLogo />
          </a>

          <nav className="site-header__nav" aria-label="Primary">
            {navLinks.map((link) => (
              <button
                key={link.label}
                className={clsx('site-header__link', isHome && activeId === link.sectionId && 'is-active')}
                onClick={() => go(link.href)}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="site-header__actions">
            <Button variant="ghost" size="sm" className="hide-mobile" onClick={() => go('/demo')}>
              Sign in
            </Button>
            <Button variant="primary" size="sm" onClick={() => go('/demo')}>
              Request Demo
            </Button>
            <button
              className="site-header__menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-drawer"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-drawer"
            className="mobile-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <button
              className="mobile-drawer__backdrop"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="mobile-drawer__panel"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <nav className="mobile-drawer__nav" aria-label="Mobile primary">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * index, duration: 0.3 }}
                    className="mobile-drawer__link"
                    onClick={() => go(link.href)}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>
              <Button variant="primary" size="lg" onClick={() => go('/demo')}>
                Request Demo
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

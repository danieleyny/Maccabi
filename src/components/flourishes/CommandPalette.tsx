import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight } from 'lucide-react'
import './CommandPalette.css'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
  navigate: (href: string) => void
}

interface Command {
  id: string
  label: string
  hint?: string
  href: string
}

const COMMANDS: Command[] = [
  { id: 'community', label: 'Community', hint: 'Hero and composer', href: '#community' },
  { id: 'feed', label: 'Latest Posts', hint: 'Community feed', href: '#feed' },
  { id: 'about', label: 'About', hint: 'Fan club mission', href: '#about' },
  { id: 'shop', label: 'Shop', hint: 'Featured merch', href: '#shop' },
  { id: 'join', label: 'Join', hint: 'Waitlist and roadmap', href: '#join' },
]

export function CommandPalette({ open, onClose, navigate }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const lastFocus = useRef<HTMLElement | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return COMMANDS
    return COMMANDS.filter((c) => c.label.toLowerCase().includes(q) || c.hint?.toLowerCase().includes(q))
  }, [query])

  useEffect(() => {
    if (!open) return
    lastFocus.current = (document.activeElement as HTMLElement) ?? null
    requestAnimationFrame(() => {
      inputRef.current?.focus()
      setQuery('')
      setActive(0)
    })
    document.body.classList.add('scroll-locked')

    return () => {
      document.body.classList.remove('scroll-locked')
      lastFocus.current?.focus?.()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActive((i) => Math.min(filtered.length - 1, i + 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActive((i) => Math.max(0, i - 1))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        const cmd = filtered[active]
        if (cmd) {
          navigate(cmd.href)
          onClose()
        }
      } else if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, active, filtered, navigate, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cmdp"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <button className="cmdp__backdrop" aria-label="Close" onClick={onClose} />
          <motion.div
            className="cmdp__panel"
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="cmdp__input-row">
              <Search size={18} aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActive(0)
                }}
                placeholder="Jump to…"
                aria-label="Search commands"
                autoComplete="off"
              />
              <kbd>Esc</kbd>
            </div>
            <ul className="cmdp__list" role="listbox">
              {filtered.length === 0 && <li className="cmdp__empty">No matches.</li>}
              {filtered.map((cmd, i) => (
                <li
                  key={cmd.id}
                  role="option"
                  aria-selected={active === i}
                  className={`cmdp__item ${active === i ? 'is-active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => {
                    navigate(cmd.href)
                    onClose()
                  }}
                >
                  <div>
                    <strong>{cmd.label}</strong>
                    {cmd.hint && <small>{cmd.hint}</small>}
                  </div>
                  <ArrowRight size={16} aria-hidden="true" />
                </li>
              ))}
            </ul>
            <div className="cmdp__foot">
              <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
              <span><kbd>↵</kbd> select</span>
              <span><kbd>N</kbd> opens this</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

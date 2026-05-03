import { Suspense, lazy, useEffect, useState } from 'react'
import { SiteHeader } from './components/layout/SiteHeader'
import { SiteFooter } from './components/layout/SiteFooter'
import { CustomCursor } from './components/flourishes/CustomCursor'
import { CommandPalette } from './components/flourishes/CommandPalette'
import { LoadingScreen } from './components/flourishes/LoadingScreen'
import { useCommandPalette } from './hooks/useCommandPalette'
import { HomePage } from './pages/Home'

const DemoPage = lazy(() => import('./pages/Demo').then((m) => ({ default: m.DemoPage })))

const BASE = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')

function stripBase(p: string) {
  if (BASE && p.startsWith(BASE)) return p.slice(BASE.length) || '/'
  return p
}

function App() {
  const [pathname, setPathname] = useState<string>(() => stripBase(window.location.pathname))
  const { open: paletteOpen, setOpen: setPaletteOpen } = useCommandPalette()

  useEffect(() => {
    const onPop = () => setPathname(stripBase(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    if (href.startsWith('/')) {
      const full = (BASE + (href === '/' ? '/' : href)).replace(/\/+/g, '/')
      window.history.pushState({}, '', full || '/')
      setPathname(href === '/' ? '/' : href)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const isDemo = pathname === '/demo' || pathname.endsWith('/demo')

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <SiteHeader navigate={navigate} pathname={pathname} />
      {isDemo ? (
        <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
          <DemoPage />
        </Suspense>
      ) : (
        <HomePage navigate={navigate} />
      )}
      <SiteFooter navigate={navigate} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} navigate={navigate} />
    </>
  )
}

export default App

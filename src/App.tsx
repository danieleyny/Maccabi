import { useEffect, useState } from 'react'
import { SiteHeader } from './components/layout/SiteHeader'
import { SiteFooter } from './components/layout/SiteFooter'
import { HomePage } from './pages/Home'

const BASE = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')

function stripBase(p: string) {
  if (BASE && p.startsWith(BASE)) return p.slice(BASE.length) || '/'
  return p
}

function App() {
  const [pathname, setPathname] = useState<string>(() => stripBase(window.location.pathname))

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

  return (
    <>
      <SiteHeader navigate={navigate} pathname={pathname} />
      <HomePage navigate={navigate} />
      <SiteFooter navigate={navigate} />
    </>
  )
}

export default App

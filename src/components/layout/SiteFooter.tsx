import { BrandLogo } from './BrandLogo'
import './SiteFooter.css'

interface SiteFooterProps {
  navigate: (href: string) => void
}

const community = [
  ['Latest posts', '#feed'],
  ['Trending discussions', '#feed'],
  ['Member profiles', '#join'],
  ['Chapter meetups', '#about'],
] as const

const club = [
  ['About us', '#about'],
  ['Shop', '#shop'],
  ['Join', '#join'],
  ['Moderation plan', '#join'],
] as const

export function SiteFooter({ navigate }: SiteFooterProps) {
  return (
    <footer className="footer">
      <div className="footer__grid container">
        <div className="footer__brand">
          <BrandLogo size="sm" />
          <p>Placeholder website for a community-first Maccabi Haifa supporter hub.</p>
          <span className="footer__status">
            <span className="footer__status-dot" /> Fan community concept
          </span>
        </div>

        <FooterCol heading="Community" items={community} navigate={navigate} />
        <FooterCol heading="Club" items={club} navigate={navigate} />

        <div className="footer__contact">
          <span className="footer__heading">Launch notes</span>
          <p>Confirm official status, language support, trademark rights, merchandise fulfillment, and a real contact email before launch.</p>
        </div>
      </div>

      <div className="footer__base container">
        <small>© 2026 Maccabi Haifa Fan Club concept. Placeholder content.</small>
        <nav className="footer__legal" aria-label="Legal">
          <button onClick={() => navigate('#join')}>Privacy</button>
          <button onClick={() => navigate('#join')}>Terms</button>
        </nav>
      </div>
    </footer>
  )
}

function FooterCol({
  heading,
  items,
  navigate,
}: {
  heading: string
  items: ReadonlyArray<readonly [string, string]>
  navigate: (h: string) => void
}) {
  return (
    <div className="footer__col">
      <span className="footer__heading">{heading}</span>
      <ul>
        {items.map(([label, href]) => (
          <li key={label}><button onClick={() => navigate(href)}>{label}</button></li>
        ))}
      </ul>
    </div>
  )
}

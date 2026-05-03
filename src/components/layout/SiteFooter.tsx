import { BrandLogo } from './BrandLogo'
import './SiteFooter.css'

interface SiteFooterProps {
  navigate: (href: string) => void
}

export function SiteFooter({ navigate }: SiteFooterProps) {
  const platform = ['Grants & Contracts', 'IRB', 'IACUC', 'IBC', 'COI / COC', 'Current & Pending', 'Effort Reporting', 'Dashboards']
  const company = [
    ['About', '#why'],
    ['Why Novelution', '#why'],
    ['Clients', '#clients'],
    ['Request Demo', '/demo'],
  ] as const
  const resources = [
    ['Compare', '#compare'],
    ['Workflow Console', '#workflow'],
    ['Lifecycle', '#platform'],
    ['Modules', '#modules'],
  ] as const

  return (
    <footer className="footer">
      <div className="footer__grid container">
        <div className="footer__brand">
          <BrandLogo size="sm" />
          <p>Novel and evolving solutions for research administration.</p>
          <span className="footer__status">
            <span className="footer__status-dot" /> Platform status: operational
          </span>
        </div>

        <FooterCol heading="Platform" items={platform.map((p) => [p, '#modules'] as const)} navigate={navigate} />
        <FooterCol heading="Company" items={company} navigate={navigate} />
        <FooterCol heading="Resources" items={resources} navigate={navigate} />

        <div className="footer__contact">
          <span className="footer__heading">Contact</span>
          <a href="mailto:demo-request@novelution.com">demo-request@novelution.com</a>
          <address>147 W. 105th Suite 2E, New York, NY 10025</address>
        </div>
      </div>

      <div className="footer__base container">
        <small>© 2026 Novelution Corp. All rights reserved.</small>
        <nav className="footer__legal" aria-label="Legal">
          <button onClick={() => navigate('/')}>Privacy</button>
          <button onClick={() => navigate('/')}>Terms</button>
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

import './BrandLogo.css'

const LOGO_URL = `${import.meta.env.BASE_URL}novelution-logo.png`

export function BrandLogo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  return (
    <span className={`brand-logo brand-logo--${size}`} aria-label="Novelution">
      <span
        className="brand-logo__mark"
        role="img"
        aria-hidden="true"
        style={{ backgroundImage: `url(${LOGO_URL})` }}
      />
      <span className="brand-logo__word">NOVELUTION</span>
    </span>
  )
}

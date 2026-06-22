import './BrandLogo.css'

export function BrandLogo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  return (
    <span className={`brand-logo brand-logo--${size}`} aria-label="Maccabi Haifa Fan Club">
      <span className="brand-logo__mark" aria-hidden="true">MH</span>
      <span className="brand-logo__word">Maccabi Haifa</span>
    </span>
  )
}

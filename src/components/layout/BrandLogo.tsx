import './BrandLogo.css'
import logoMark from '../../assets/fanclub/brand/logo-mark.png'

export function BrandLogo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  return (
    <span className={`brand-logo brand-logo--${size}`} aria-label="Maccabi Haifa Fan Club">
      <span className="brand-logo__mark" aria-hidden="true">
        <img src={logoMark} alt="" />
      </span>
      <span className="brand-logo__word">Maccabi Haifa</span>
    </span>
  )
}

import type { ModuleDef } from '../../content/modules'
import './ModuleViz.css'

export function ModuleViz({ kind }: { kind: ModuleDef['vizKind'] }) {
  switch (kind) {
    case 'route':
      return (
        <svg viewBox="0 0 200 60" className="mviz" aria-hidden="true">
          <defs>
            <linearGradient id="vroute" x1="0" x2="1">
              <stop offset="0%" stopColor="#4cc9f0" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          <line x1="20" y1="30" x2="180" y2="30" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <line x1="20" y1="30" x2="180" y2="30" stroke="url(#vroute)" strokeWidth="2" className="mviz-draw" />
          <circle cx="20" cy="30" r="6" fill="#4cc9f0" />
          <circle cx="100" cy="30" r="6" fill="#62e6c8" />
          <circle cx="180" cy="30" r="6" fill="#7c3aed" />
        </svg>
      )
    case 'protocol-flow':
      return (
        <svg viewBox="0 0 200 60" className="mviz" aria-hidden="true">
          <line x1="14" y1="30" x2="186" y2="30" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 4" />
          {[20, 80, 120, 180].map((x, i) => (
            <circle key={i} cx={x} cy={30} r="5" fill={i === 0 ? '#4cc9f0' : i === 3 ? '#59d0b4' : 'rgba(255,255,255,0.4)'} className="mviz-step" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </svg>
      )
    case 'shield':
      return (
        <svg viewBox="0 0 60 60" className="mviz mviz--icon" aria-hidden="true">
          <circle cx="30" cy="30" r="20" fill="none" stroke="rgba(124,58,237,0.4)" strokeWidth="1" strokeDasharray="3 5" className="mviz-spin" />
          <path d="M30 14 L42 20 V32 C42 38 36 44 30 46 C24 44 18 38 18 32 V20 Z" fill="rgba(124,58,237,0.18)" stroke="#7c3aed" strokeWidth="1.4" />
          <path d="M25 30 L29 34 L36 26" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
      )
    case 'bars':
      return (
        <svg viewBox="0 0 200 60" className="mviz" aria-hidden="true">
          {[15, 35, 25, 50, 40, 30].map((h, i) => (
            <rect
              key={i}
              x={20 + i * 28}
              y={50 - h}
              width="18"
              height={h}
              rx="2"
              fill="url(#vroute)"
              className="mviz-bar"
              style={{ animationDelay: `${i * 0.08}s`, transformOrigin: 'bottom' }}
            />
          ))}
          <defs>
            <linearGradient id="vroute" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#4cc9f0" />
              <stop offset="100%" stopColor="#4361ee" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      )
    case 'ring':
      return (
        <svg viewBox="0 0 60 60" className="mviz mviz--icon" aria-hidden="true">
          <circle cx="30" cy="30" r="22" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
          <circle cx="30" cy="30" r="22" fill="none" stroke="#4cc9f0" strokeWidth="4" strokeDasharray="138" strokeDashoffset="55" strokeLinecap="round" transform="rotate(-90 30 30)" className="mviz-ring" />
          <circle cx="30" cy="30" r="22" fill="none" stroke="#7c3aed" strokeWidth="4" strokeDasharray="138" strokeDashoffset="105" strokeLinecap="round" transform="rotate(-90 30 30)" className="mviz-ring" style={{ animationDelay: '0.4s' }} />
        </svg>
      )
    case 'grid':
      return (
        <div className="mviz-grid" aria-hidden="true">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.18}s` }} />
          ))}
        </div>
      )
    default:
      return null
  }
}

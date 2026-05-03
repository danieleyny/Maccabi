interface Props {
  kind: 'warning' | 'complexity' | 'clock'
}

export function ChallengeIcon({ kind }: Props) {
  const common = {
    width: 56,
    height: 56,
    viewBox: '0 0 56 56',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  if (kind === 'warning') {
    return (
      <svg {...common}>
        <path d="M28 8 L52 48 L4 48 Z" className="ci-stroke" pathLength={1} />
        <path d="M28 22 L28 36" className="ci-stroke" pathLength={1} style={{ animationDelay: '0.4s' }} />
        <circle cx="28" cy="42" r="1.6" fill="currentColor" />
      </svg>
    )
  }
  if (kind === 'complexity') {
    return (
      <svg {...common}>
        <circle cx="14" cy="14" r="3" />
        <circle cx="42" cy="14" r="3" />
        <circle cx="28" cy="28" r="3" />
        <circle cx="14" cy="42" r="3" />
        <circle cx="42" cy="42" r="3" />
        <path d="M14 14 L28 28 L42 14 M14 42 L28 28 L42 42 M14 14 L14 42 M42 14 L42 42" className="ci-stroke" pathLength={1} />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <circle cx="28" cy="28" r="20" className="ci-stroke" pathLength={1} />
      <path d="M28 16 L28 28 L36 32" className="ci-stroke" pathLength={1} style={{ animationDelay: '0.4s' }} />
      <path d="M28 28 m-10 0 a10 10 0 1 1 20 0" className="ci-stroke ci-spiral" pathLength={1} style={{ animationDelay: '0.8s' }} />
    </svg>
  )
}

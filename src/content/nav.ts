export interface NavLink {
  label: string
  href: string
  sectionId?: string
}

export const navLinks: NavLink[] = [
  { label: 'Platform', href: '#platform', sectionId: 'platform' },
  { label: 'Modules', href: '#modules', sectionId: 'modules' },
  { label: 'Why Novelution', href: '#why', sectionId: 'why' },
  { label: 'Clients', href: '#clients', sectionId: 'clients' },
  { label: 'Compare', href: '#compare', sectionId: 'compare' },
]

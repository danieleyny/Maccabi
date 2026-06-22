export interface NavLink {
  label: string
  href: string
  sectionId?: string
}

export const navLinks: NavLink[] = [
  { label: 'Community', href: '#community', sectionId: 'community' },
  { label: 'Feed', href: '#feed', sectionId: 'feed' },
  { label: 'About', href: '#about', sectionId: 'about' },
  { label: 'Shop', href: '#shop', sectionId: 'shop' },
  { label: 'Join', href: '#join', sectionId: 'join' },
]

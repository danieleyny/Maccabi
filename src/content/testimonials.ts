export interface Testimonial {
  institution: string
  short: string
  name: string
  role: string
  tag: string
  quote: string
  initials: string
}

export const testimonials: Testimonial[] = [
  {
    institution: 'University of Pennsylvania',
    short: 'UPenn',
    name: 'Barak Zahavy',
    role: 'Director of Information Systems, OVPR',
    tag: 'Responsive Partner',
    quote:
      'Novelution is deeply committed to helping clients be successful. The team is tirelessly responsive and creative. They are thoughtful, excellent problem solvers and demonstrate a deep commitment to quality, user-friendly solutions.',
    initials: 'BZ',
  },
  {
    institution: 'Cornell University',
    short: 'Cornell',
    name: 'Zachary Jacques',
    role: 'Director, Research Admin. Info. Services',
    tag: 'Modern Architecture',
    quote:
      'We were fortunate to find Novelution. Their research management system is comprehensive, modern, and easy to use on desktop computers and mobile devices. The system architecture was well thought out, which makes it efficient to customize and to integrate with.',
    initials: 'ZJ',
  },
  {
    institution: 'Florida Atlantic University',
    short: 'FAU',
    name: 'Miriam Campo',
    role: 'Director, Sponsored Programs',
    tag: 'User-Friendly',
    quote:
      'The Novelution team is wonderful to work with. They make sure every research administration item is taken into account as they are building the system for FAU. I have been involved in system implementations previously, and this one by far is the best.',
    initials: 'MC',
  },
  {
    institution: 'North Dakota University System',
    short: 'NDUS',
    name: 'Patricia Johnson',
    role: 'Project Manager',
    tag: 'Complex Implementation',
    quote:
      'My organization has been working with Novelution on a complex, long range implementation for multiple campuses. Their performance has been outstanding.',
    initials: 'PJ',
  },
]

import type { ComponentType } from 'react'
import {
  BarChart3,
  ClipboardCheck,
  FileCheck2,
  FileText,
  FlaskConical,
  HeartPulse,
  Scale,
  UsersRound,
  type LucideProps,
} from 'lucide-react'

export type ModuleCategory = 'pre-award' | 'compliance' | 'disclosures' | 'reporting'

export interface ModuleDef {
  id: string
  title: string
  short: string
  category: ModuleCategory[]
  icon: ComponentType<LucideProps>
  bullets: string[]
  feature?: boolean
  vizKind: 'route' | 'protocol-flow' | 'shield' | 'bars' | 'ring' | 'grid'
}

export const modules: ModuleDef[] = [
  {
    id: 'grants',
    title: 'Grants & Contracts',
    short: 'Grants',
    category: ['pre-award'],
    icon: FileText,
    feature: true,
    bullets: [
      'Budget development and routing',
      'Subawards and non-financial agreements',
      'Review type determination',
    ],
    vizKind: 'route',
  },
  {
    id: 'irb',
    title: 'IRB',
    short: 'IRB',
    category: ['compliance'],
    icon: HeartPulse,
    bullets: [
      'Amendment and continuing review workflows',
      'Committee and administrative review support',
    ],
    vizKind: 'protocol-flow',
  },
  {
    id: 'iacuc',
    title: 'IACUC',
    short: 'IACUC',
    category: ['compliance'],
    icon: ClipboardCheck,
    bullets: [
      'Species and protocol management',
      'Experimental detail capture',
      'Animal ordering and housing workflows',
    ],
    vizKind: 'protocol-flow',
  },
  {
    id: 'ibc',
    title: 'IBC',
    short: 'IBC',
    category: ['compliance'],
    icon: FlaskConical,
    bullets: [
      'Biosafety protocol workflows',
      'Risk and containment details',
      'Committee review support',
    ],
    vizKind: 'protocol-flow',
  },
  {
    id: 'coi',
    title: 'COI / Conflict of Commitment',
    short: 'COI / COC',
    category: ['disclosures'],
    icon: Scale,
    bullets: [
      'SFI and relatedness questionnaires',
      'Management plan documentation',
      'Configurable disclosure workflows',
    ],
    vizKind: 'shield',
  },
  {
    id: 'cp',
    title: 'Current & Pending / Other Support',
    short: 'C&P',
    category: ['reporting'],
    icon: FileCheck2,
    bullets: [
      'Sponsor-specific report generation',
      'Editable goals, effort, and cost fields',
      'Integrated source system data',
    ],
    vizKind: 'bars',
  },
  {
    id: 'effort',
    title: 'Effort Reporting',
    short: 'Effort',
    category: ['reporting'],
    icon: UsersRound,
    bullets: [
      'Faculty and administrator workflows',
      'Commitment visibility',
      'Reporting and review tools',
    ],
    vizKind: 'ring',
  },
  {
    id: 'dash',
    title: 'Dashboards & Integrations',
    short: 'Dashboards',
    category: ['reporting'],
    icon: BarChart3,
    bullets: [
      'Cross-module visibility',
      'Configurable dashboards',
      'Integration-ready architecture',
    ],
    vizKind: 'grid',
  },
]

export const moduleFilters: { id: 'all' | ModuleCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'pre-award', label: 'Pre-Award' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'disclosures', label: 'Disclosures' },
  { id: 'reporting', label: 'Reporting' },
]

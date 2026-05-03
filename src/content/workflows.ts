export interface IntakeScenario {
  id: string
  trigger: string
  fields: string[]
  docs: string[]
  routeChip: string
}

export const intakeScenarios: IntakeScenario[] = [
  {
    id: 'irb',
    trigger: 'Human Subjects Research',
    fields: ['Study population', 'Consent process', 'Data sensitivity', 'Risk profile'],
    docs: ['IRB application', 'Consent form', 'Recruitment materials'],
    routeChip: 'IRB committee',
  },
  {
    id: 'iacuc',
    trigger: 'Animal Study',
    fields: ['Species', 'Protocol category', 'Housing requirements', 'Euthanasia plan'],
    docs: ['IACUC protocol', 'Veterinary review'],
    routeChip: 'IACUC committee',
  },
  {
    id: 'ibc',
    trigger: 'Biosafety',
    fields: ['Biological agent', 'Containment level', 'Risk profile', 'PPE'],
    docs: ['IBC registration', 'Risk assessment'],
    routeChip: 'IBC committee',
  },
]

export const reviewRoutingNodes = [
  'Department',
  'Committee',
  'Compliance',
  'Leadership',
] as const

export const liveRecordSatellites = [
  'Personnel',
  'Disclosures',
  'Commitments',
  'Reports',
  'Integrations',
  'Audit Trail',
] as const

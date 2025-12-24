import type { ListItem } from '@shared/types'

/**
 * Services domain data
 * Separates data from presentation logic
 */
export const SERVICE_ITEMS: ListItem[] = [
  {
    id: 'service-1',
    text: 'React & Frontend architecture (not tutorial code)'
  },
  {
    id: 'service-2',
    text: 'Writing clean, maintainable production-level code'
  },
  {
    id: 'service-3',
    text: 'Code reviews & project guidance'
  },
  {
    id: 'service-4',
    text: 'Interview preparation based on real expectations'
  },
  {
    id: 'service-5',
    text: 'Career roadmap (what to learn, what to skip, where to focus)'
  }
] as const

export const SERVICES_CONTENT = {
  title: 'WHAT I HELP YOU WITH',
  intro: 'We work on real, practical things:',
  conclusion:
    'No generic advice. Everything is tailored to your current level and goal.'
} as const

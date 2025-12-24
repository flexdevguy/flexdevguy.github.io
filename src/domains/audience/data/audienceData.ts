import type { ListItem } from '@shared/types'

/**
 * Audience domain data
 * Separates data from presentation logic
 */
export const AUDIENCE_ITEMS: ListItem[] = [
  {
    id: 'audience-1',
    text: 'A working developer (2–8 years experience) feeling stuck or underutilized'
  },
  {
    id: 'audience-2',
    text: 'A frontend / React developer wanting stronger fundamentals & architecture skills'
  },
  {
    id: 'audience-3',
    text: 'A final-year CS student confused about interviews, projects, and career direction'
  },
  {
    id: 'audience-4',
    text: 'Someone aiming for product companies / Tier-1 tech roles, not just another job'
  }
] as const

export const AUDIENCE_CONTENT = {
  title: 'WHO THIS IS FOR',
  intro: 'This is for you if you are:',
  conclusion: "If that sounds like you — you're in the right place."
} as const

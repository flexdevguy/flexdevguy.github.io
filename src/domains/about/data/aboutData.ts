import type { ListItem } from '@shared/types'

/**
 * About domain data
 * Separates data from presentation logic
 */
export const ABOUT_POINTS: ListItem[] = [
  {
    id: 'about-1',
    text: 'Built and reviewed production systems used by real users'
  },
  {
    id: 'about-2',
    text: 'Mentored developers at different career stages'
  },
  {
    id: 'about-3',
    text: 'Seen what actually helps developers grow — and what wastes their time'
  }
] as const

export const ABOUT_CONTENT = {
  title: 'ABOUT ME — Gowtham S',
  introduction:
    "I'm a software developer with 15+ years of real-world experience, working across frontend, full-stack systems, and product teams.\n\nI've watched many capable developers get stuck not because they lack talent, but because they lack clarity, feedback, and direction.",
  listIntro: "Over the years, I've:",
  focusIntro: 'My focus with grwm.dev is simple:',
  focusStatement:
    'to help developers grow with strong fundamentals, clear thinking, and confidence — without hype or shortcuts.'
} as const

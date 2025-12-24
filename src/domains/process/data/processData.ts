import type { StepItem } from '@shared/types'

/**
 * Process domain data
 * Separates data from presentation logic
 */
export const PROCESS_STEPS: StepItem[] = [
  {
    id: 'step-1',
    number: '1',
    text: 'You book a free 20-minute clarity call'
  },
  {
    id: 'step-2',
    number: '2',
    text: 'We discuss your current situation, blockers, and goals'
  },
  {
    id: 'step-3',
    number: '3',
    text: "If it makes sense, I'll suggest a clear next-step plan"
  },
  {
    id: 'step-4',
    number: '4',
    text: 'You decide whether to continue with mentoring'
  }
] as const

export const PROCESS_CONTENT = {
  title: 'HOW IT WORKS',
  conclusion: "That's it. Simple and transparent."
} as const

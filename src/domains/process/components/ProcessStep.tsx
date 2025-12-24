import React from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import type { StepItem } from '@shared/types'

interface ProcessStepProps {
  step: StepItem
  variants: Variants
}

/**
 * ProcessStep component following Single Responsibility Principle
 * Only responsible for rendering a single process step
 * Memoized to prevent re-renders when parent updates but step hasn't changed
 *
 * Performance: memo prevents re-render when parent ProcessSection re-renders
 */
export const ProcessStep = React.memo(
  ({ step, variants }: ProcessStepProps): JSX.Element => (
    <motion.div variants={variants} className='flex items-start gap-6'>
      <div className='flex-shrink-0 w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-sm'>
        {step.number}
      </div>
      <p className='text-lg text-gray-700 pt-2'>{step.text}</p>
    </motion.div>
  ),
  (prevProps, nextProps) => {
    // Return true if props are equal (no re-render needed)
    // Shallow comparison of step content
    return prevProps.step.number === nextProps.step.number && prevProps.step.text === nextProps.step.text
  }
)

ProcessStep.displayName = 'ProcessStep'

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
 */
export const ProcessStep = ({ step, variants }: ProcessStepProps): JSX.Element => (
  <motion.div variants={variants} className='flex items-start gap-6'>
    <div className='flex-shrink-0 w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-sm'>
      {step.number}
    </div>
    <p className='text-lg text-gray-700 pt-2'>{step.text}</p>
  </motion.div>
)

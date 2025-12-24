import { motion } from 'framer-motion'
import { AnimatedText } from '@shared/components/AnimatedText'
import { Section } from '@shared/components/Section'
import { createStaggerContainer, createSlideInLeftStrong } from '@shared/hooks/useAnimationVariants'
import { PROCESS_CONTENT, PROCESS_STEPS } from '../data/processData'
import { ProcessStep } from './ProcessStep'

/**
 * Process Section Component
 * Follows Single Responsibility Principle - only handles process presentation
 */
export const ProcessSection = (): JSX.Element => {
  const containerVariants = createStaggerContainer(0.15)
  const itemVariants = createSlideInLeftStrong(0)

  return (
    <Section background='white'>
      <AnimatedText as='h2' className='text-3xl sm:text-4xl font-bold text-gray-900 mb-12'>
        {PROCESS_CONTENT.title}
      </AnimatedText>

      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        className='space-y-8'
      >
        {PROCESS_STEPS.map((step) => (
          <ProcessStep key={step.id} step={step} variants={itemVariants} />
        ))}
      </motion.div>

      <AnimatedText
        as='p'
        className='mt-12 text-lg text-gray-700 font-medium'
        delay={0.7}
      >
        {PROCESS_CONTENT.conclusion}
      </AnimatedText>
    </Section>
  )
}

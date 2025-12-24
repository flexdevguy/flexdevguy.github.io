import { motion } from 'framer-motion'
import { AnimatedText } from '@shared/components/AnimatedText'
import { Button } from '@shared/components/Button'
import { Section } from '@shared/components/Section'
import { CTA_CONTENT, TOPMATE_URL } from '../data/ctaData'

/**
 * CTA Section Component
 * Follows Single Responsibility Principle - only handles CTA presentation
 */
export const CTASection = (): JSX.Element => (
  <Section background='white'>
    <div className='text-center'>
      <AnimatedText as='h2' className='text-3xl sm:text-4xl font-bold text-gray-900 mb-6'>
        {CTA_CONTENT.title}
      </AnimatedText>

      <AnimatedText
        as='p'
        className='text-lg sm:text-xl text-gray-700 mb-8'
        delay={0.2}
      >
        {CTA_CONTENT.description}
      </AnimatedText>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className='flex flex-col items-center gap-4'
      >
        <Button href={TOPMATE_URL} label={CTA_CONTENT.buttonLabel} variant='topmate' />
        <p className='text-sm text-gray-500'>{CTA_CONTENT.footerNote}</p>
      </motion.div>
    </div>
  </Section>
)

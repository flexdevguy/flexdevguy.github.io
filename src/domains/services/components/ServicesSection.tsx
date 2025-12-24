import { motion } from 'framer-motion'
import { AnimatedText } from '@shared/components/AnimatedText'
import { Section } from '@shared/components/Section'
import { createStaggerContainer, createFadeInUp } from '@shared/hooks/useAnimationVariants'
import { SERVICES_CONTENT, SERVICE_ITEMS } from '../data/servicesData'
import { ServiceCard } from './ServiceCard'

/**
 * Services Section Component
 * Follows Single Responsibility Principle - only handles services presentation
 */
export const ServicesSection = (): JSX.Element => {
  const containerVariants = createStaggerContainer(0.1)
  const itemVariants = createFadeInUp(0)

  return (
    <Section background='gray'>
      <AnimatedText as='h2' className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
        {SERVICES_CONTENT.title}
      </AnimatedText>

      <AnimatedText
        as='p'
        className='text-lg text-gray-700 mb-12'
        delay={0.1}
      >
        {SERVICES_CONTENT.intro}
      </AnimatedText>

      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        className='grid grid-cols-1 md:grid-cols-2 gap-6'
      >
        {SERVICE_ITEMS.map((item) => (
          <ServiceCard key={item.id} item={item} variants={itemVariants} />
        ))}
      </motion.div>

      <AnimatedText
        as='p'
        className='mt-12 text-lg text-gray-700'
        delay={0.7}
      >
        {SERVICES_CONTENT.conclusion}
      </AnimatedText>
    </Section>
  )
}

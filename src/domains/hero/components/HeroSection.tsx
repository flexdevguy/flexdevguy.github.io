import { motion } from 'framer-motion'
import { Button } from '@shared/components/Button'
import { HERO_CONTENT, TOPMATE_URL } from '../data/heroContent'
import { createFadeInUp } from '@shared/hooks/useAnimationVariants'

/**
 * Hero Section Component
 * Follows Single Responsibility Principle - only handles hero presentation
 */
export const HeroSection = (): JSX.Element => {
  const headlineVariants = createFadeInUp(0)
  const subheadlineVariants = createFadeInUp(0.2)
  const ctaVariants = createFadeInUp(0.4)

  return (
    <section className='relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden'>
      {/* Hero spotlight glow: subtle blue radial gradient behind headline */}
      <div className='hero-glow absolute inset-0 flex items-center justify-center' />

      <div className='relative z-10 max-w-4xl mx-auto text-center'>
        <motion.h1
          variants={headlineVariants}
          initial='hidden'
          animate='visible'
          className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight'
          itemProp='headline'
        >
          {HERO_CONTENT.headline}
        </motion.h1>

        <motion.p
          variants={subheadlineVariants}
          initial='hidden'
          animate='visible'
          className='text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto'
        >
          {HERO_CONTENT.subheadline}
        </motion.p>

        <motion.div
          variants={ctaVariants}
          initial='hidden'
          animate='visible'
          className='flex flex-col items-center gap-4'
        >
          <Button href={TOPMATE_URL} label={HERO_CONTENT.cta.label} variant='topmate' />
          <p className='text-sm text-gray-500'>{HERO_CONTENT.cta.subtext}</p>
        </motion.div>
      </div>
    </section>
  )
}

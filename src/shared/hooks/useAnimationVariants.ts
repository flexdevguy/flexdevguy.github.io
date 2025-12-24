import type { Variants } from 'framer-motion'

/**
 * Factory function for creating animation variants
 * Follows Factory Pattern and DRY principle
 */
export const createStaggerContainer = (
  staggerDelay: number = 0.1
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay
    }
  }
})

export const createFadeInUp = (delay: number = 0): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay
    }
  }
})

export const createSlideInLeft = (delay: number = 0): Variants => ({
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay
    }
  }
})

export const createSlideInLeftStrong = (delay: number = 0): Variants => ({
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay
    }
  }
})

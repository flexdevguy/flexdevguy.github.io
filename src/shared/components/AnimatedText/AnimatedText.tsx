import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { Variants } from 'framer-motion'
import { createFadeInUp } from '../../hooks/useAnimationVariants'

interface AnimatedTextProps {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  variants?: Variants
  delay?: number
  viewport?: { once: boolean }
}

/**
 * Reusable AnimatedText component following Open/Closed Principle
 * Can be extended with custom variants while maintaining base functionality
 */
export const AnimatedText = ({
  children,
  as: Component = 'p',
  className = '',
  variants,
  delay = 0,
  viewport = { once: true }
}: AnimatedTextProps): JSX.Element => {
  const defaultVariants = (variants != null) || createFadeInUp(delay)

  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={viewport}
      variants={defaultVariants}
    >
      <Component className={className}>{children}</Component>
    </motion.div>
  )
}

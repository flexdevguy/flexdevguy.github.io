import { useInView } from 'framer-motion'
import { useRef } from 'react'
import type { AnimationConfig } from '../types'

/**
 * Custom hook for scroll-triggered animations
 * Follows Single Responsibility Principle
 */
export const useScrollAnimation = (config: AnimationConfig = {}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: config.once ?? true,
    margin: '-100px'
  })

  return {
    ref,
    isInView
  }
}

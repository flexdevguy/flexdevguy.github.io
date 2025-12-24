import { describe, it, expect } from 'vitest'
import {
  createStaggerContainer,
  createFadeInUp,
  createSlideInLeft,
  createSlideInLeftStrong
} from './useAnimationVariants'

describe('useAnimationVariants', () => {
  describe('createStaggerContainer', () => {
    it('should create stagger container variants with default delay', () => {
      const variants = createStaggerContainer()
      expect(variants).toHaveProperty('hidden')
      expect(variants).toHaveProperty('visible')
      expect(variants.visible).toHaveProperty('transition')
      expect(variants.visible.transition).toHaveProperty('staggerChildren', 0.1)
    })

    it('should create stagger container variants with custom delay', () => {
      const variants = createStaggerContainer(0.2)
      expect(variants.visible.transition).toHaveProperty('staggerChildren', 0.2)
    })
  })

  describe('createFadeInUp', () => {
    it('should create fade in up variants with default delay', () => {
      const variants = createFadeInUp()
      expect(variants).toHaveProperty('hidden')
      expect(variants).toHaveProperty('visible')
      expect(variants.hidden).toEqual({ opacity: 0, y: 20 })
      expect(variants.visible).toHaveProperty('transition')
    })

    it('should create fade in up variants with custom delay', () => {
      const variants = createFadeInUp(0.3)
      expect(variants.visible.transition).toHaveProperty('delay', 0.3)
    })
  })

  describe('createSlideInLeft', () => {
    it('should create slide in left variants', () => {
      const variants = createSlideInLeft()
      expect(variants.hidden).toEqual({ opacity: 0, x: -20 })
      expect(variants.visible).toHaveProperty('x', 0)
    })

    it('should create slide in left variants with custom delay', () => {
      const variants = createSlideInLeft(0.5)
      expect(variants.visible.transition).toHaveProperty('delay', 0.5)
    })
  })

  describe('createSlideInLeftStrong', () => {
    it('should create strong slide in left variants', () => {
      const variants = createSlideInLeftStrong()
      expect(variants.hidden).toEqual({ opacity: 0, x: -30 })
      expect(variants.visible).toHaveProperty('x', 0)
    })

    it('should create strong slide in left variants with custom delay', () => {
      const variants = createSlideInLeftStrong(0.4)
      expect(variants.visible.transition).toHaveProperty('delay', 0.4)
    })
  })
})

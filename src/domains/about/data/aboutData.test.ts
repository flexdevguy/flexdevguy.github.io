import { describe, it, expect } from 'vitest'
import { ABOUT_POINTS, ABOUT_CONTENT } from './aboutData'
import type { ListItem } from '../../../shared/types'

describe('aboutData', () => {
  describe('ABOUT_POINTS', () => {
    it('should export ABOUT_POINTS array', () => {
      expect(ABOUT_POINTS).toBeDefined()
      expect(Array.isArray(ABOUT_POINTS)).toBe(true)
    })

    it('should have at least one point', () => {
      expect(ABOUT_POINTS.length).toBeGreaterThan(0)
    })

    it('should have points with correct structure', () => {
      ABOUT_POINTS.forEach((point) => {
        expect(point).toHaveProperty('id')
        expect(point).toHaveProperty('text')
        expect(typeof point.id).toBe('string')
        expect(typeof point.text).toBe('string')
      })
    })

    it('should have unique ids', () => {
      const ids = ABOUT_POINTS.map((point) => point.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
  })

  describe('ABOUT_CONTENT', () => {
    it('should export ABOUT_CONTENT', () => {
      expect(ABOUT_CONTENT).toBeDefined()
    })

    it('should have title property', () => {
      expect(ABOUT_CONTENT).toHaveProperty('title')
      expect(typeof ABOUT_CONTENT.title).toBe('string')
    })

    it('should have introduction property', () => {
      expect(ABOUT_CONTENT).toHaveProperty('introduction')
      expect(typeof ABOUT_CONTENT.introduction).toBe('string')
    })

    it('should have listIntro property', () => {
      expect(ABOUT_CONTENT).toHaveProperty('listIntro')
      expect(typeof ABOUT_CONTENT.listIntro).toBe('string')
    })

    it('should have focusIntro property', () => {
      expect(ABOUT_CONTENT).toHaveProperty('focusIntro')
      expect(typeof ABOUT_CONTENT.focusIntro).toBe('string')
    })

    it('should have focusStatement property', () => {
      expect(ABOUT_CONTENT).toHaveProperty('focusStatement')
      expect(typeof ABOUT_CONTENT.focusStatement).toBe('string')
    })
  })
})

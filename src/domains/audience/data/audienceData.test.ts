import { describe, it, expect } from 'vitest'
import { AUDIENCE_ITEMS, AUDIENCE_CONTENT } from './audienceData'
import type { ListItem } from '../../../shared/types'

describe('audienceData', () => {
  describe('AUDIENCE_ITEMS', () => {
    it('should export AUDIENCE_ITEMS array', () => {
      expect(AUDIENCE_ITEMS).toBeDefined()
      expect(Array.isArray(AUDIENCE_ITEMS)).toBe(true)
    })

    it('should have at least one item', () => {
      expect(AUDIENCE_ITEMS.length).toBeGreaterThan(0)
    })

    it('should have items with correct structure', () => {
      AUDIENCE_ITEMS.forEach((item) => {
        expect(item).toHaveProperty('id')
        expect(item).toHaveProperty('text')
        expect(typeof item.id).toBe('string')
        expect(typeof item.text).toBe('string')
        expect(item.id.length).toBeGreaterThan(0)
        expect(item.text.length).toBeGreaterThan(0)
      })
    })

    it('should have unique ids', () => {
      const ids = AUDIENCE_ITEMS.map((item) => item.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
  })

  describe('AUDIENCE_CONTENT', () => {
    it('should export AUDIENCE_CONTENT', () => {
      expect(AUDIENCE_CONTENT).toBeDefined()
    })

    it('should have title property', () => {
      expect(AUDIENCE_CONTENT).toHaveProperty('title')
      expect(typeof AUDIENCE_CONTENT.title).toBe('string')
    })

    it('should have intro property', () => {
      expect(AUDIENCE_CONTENT).toHaveProperty('intro')
      expect(typeof AUDIENCE_CONTENT.intro).toBe('string')
    })

    it('should have conclusion property', () => {
      expect(AUDIENCE_CONTENT).toHaveProperty('conclusion')
      expect(typeof AUDIENCE_CONTENT.conclusion).toBe('string')
    })
  })
})

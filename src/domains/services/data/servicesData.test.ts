import { describe, it, expect } from 'vitest'
import { SERVICE_ITEMS, SERVICES_CONTENT } from './servicesData'
import type { ListItem } from '../../../shared/types'

describe('servicesData', () => {
  describe('SERVICE_ITEMS', () => {
    it('should export SERVICE_ITEMS array', () => {
      expect(SERVICE_ITEMS).toBeDefined()
      expect(Array.isArray(SERVICE_ITEMS)).toBe(true)
    })

    it('should have at least one item', () => {
      expect(SERVICE_ITEMS.length).toBeGreaterThan(0)
    })

    it('should have items with correct structure', () => {
      SERVICE_ITEMS.forEach((item) => {
        expect(item).toHaveProperty('id')
        expect(item).toHaveProperty('text')
        expect(typeof item.id).toBe('string')
        expect(typeof item.text).toBe('string')
      })
    })

    it('should have unique ids', () => {
      const ids = SERVICE_ITEMS.map((item) => item.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
  })

  describe('SERVICES_CONTENT', () => {
    it('should export SERVICES_CONTENT', () => {
      expect(SERVICES_CONTENT).toBeDefined()
    })

    it('should have title property', () => {
      expect(SERVICES_CONTENT).toHaveProperty('title')
      expect(typeof SERVICES_CONTENT.title).toBe('string')
    })

    it('should have intro property', () => {
      expect(SERVICES_CONTENT).toHaveProperty('intro')
      expect(typeof SERVICES_CONTENT.intro).toBe('string')
    })

    it('should have conclusion property', () => {
      expect(SERVICES_CONTENT).toHaveProperty('conclusion')
      expect(typeof SERVICES_CONTENT.conclusion).toBe('string')
    })
  })
})

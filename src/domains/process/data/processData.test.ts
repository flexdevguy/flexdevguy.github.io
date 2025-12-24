import { describe, it, expect } from 'vitest'
import { PROCESS_STEPS, PROCESS_CONTENT } from './processData'
import type { StepItem } from '../../../shared/types'

describe('processData', () => {
  describe('PROCESS_STEPS', () => {
    it('should export PROCESS_STEPS array', () => {
      expect(PROCESS_STEPS).toBeDefined()
      expect(Array.isArray(PROCESS_STEPS)).toBe(true)
    })

    it('should have at least one step', () => {
      expect(PROCESS_STEPS.length).toBeGreaterThan(0)
    })

    it('should have steps with correct structure', () => {
      PROCESS_STEPS.forEach((step) => {
        expect(step).toHaveProperty('id')
        expect(step).toHaveProperty('number')
        expect(step).toHaveProperty('text')
        expect(typeof step.id).toBe('string')
        expect(typeof step.number).toBe('string')
        expect(typeof step.text).toBe('string')
      })
    })

    it('should have unique ids', () => {
      const ids = PROCESS_STEPS.map((step) => step.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should have sequential step numbers', () => {
      PROCESS_STEPS.forEach((step, index) => {
        const expectedNumber = String(index + 1)
        expect(step.number).toBe(expectedNumber)
      })
    })
  })

  describe('PROCESS_CONTENT', () => {
    it('should export PROCESS_CONTENT', () => {
      expect(PROCESS_CONTENT).toBeDefined()
    })

    it('should have title property', () => {
      expect(PROCESS_CONTENT).toHaveProperty('title')
      expect(typeof PROCESS_CONTENT.title).toBe('string')
    })

    it('should have conclusion property', () => {
      expect(PROCESS_CONTENT).toHaveProperty('conclusion')
      expect(typeof PROCESS_CONTENT.conclusion).toBe('string')
    })
  })
})

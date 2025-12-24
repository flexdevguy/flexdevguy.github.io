import { describe, it, expect } from 'vitest'
import { HERO_CONTENT } from './heroContent'

describe('heroContent', () => {
  it('should export HERO_CONTENT', () => {
    expect(HERO_CONTENT).toBeDefined()
  })

  it('should have headline property', () => {
    expect(HERO_CONTENT).toHaveProperty('headline')
    expect(typeof HERO_CONTENT.headline).toBe('string')
    expect(HERO_CONTENT.headline.length).toBeGreaterThan(0)
  })

  it('should have subheadline property', () => {
    expect(HERO_CONTENT).toHaveProperty('subheadline')
    expect(typeof HERO_CONTENT.subheadline).toBe('string')
    expect(HERO_CONTENT.subheadline.length).toBeGreaterThan(0)
  })

  it('should have cta object with label and subtext', () => {
    expect(HERO_CONTENT).toHaveProperty('cta')
    expect(HERO_CONTENT.cta).toHaveProperty('label')
    expect(HERO_CONTENT.cta).toHaveProperty('subtext')
    expect(typeof HERO_CONTENT.cta.label).toBe('string')
    expect(typeof HERO_CONTENT.cta.subtext).toBe('string')
  })
})

import { describe, it, expect } from 'vitest'
import { CTA_CONTENT } from './ctaData'

describe('ctaData', () => {
  it('should export CTA_CONTENT', () => {
    expect(CTA_CONTENT).toBeDefined()
  })

  it('should have title property', () => {
    expect(CTA_CONTENT).toHaveProperty('title')
    expect(typeof CTA_CONTENT.title).toBe('string')
    expect(CTA_CONTENT.title.length).toBeGreaterThan(0)
  })

  it('should have description property', () => {
    expect(CTA_CONTENT).toHaveProperty('description')
    expect(typeof CTA_CONTENT.description).toBe('string')
    expect(CTA_CONTENT.description.length).toBeGreaterThan(0)
  })

  it('should have buttonLabel property', () => {
    expect(CTA_CONTENT).toHaveProperty('buttonLabel')
    expect(typeof CTA_CONTENT.buttonLabel).toBe('string')
    expect(CTA_CONTENT.buttonLabel.length).toBeGreaterThan(0)
  })

  it('should have footerNote property', () => {
    expect(CTA_CONTENT).toHaveProperty('footerNote')
    expect(typeof CTA_CONTENT.footerNote).toBe('string')
    expect(CTA_CONTENT.footerNote.length).toBeGreaterThan(0)
  })
})

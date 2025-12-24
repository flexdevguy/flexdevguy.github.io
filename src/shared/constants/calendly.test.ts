import { describe, it, expect } from 'vitest'
import { CALENDLY_URL, CALENDLY_CONFIG } from './calendly'

describe('calendly constants', () => {
  it('should export CALENDLY_URL', () => {
    expect(CALENDLY_URL).toBeDefined()
    expect(typeof CALENDLY_URL).toBe('string')
  })

  it('should export CALENDLY_CONFIG', () => {
    expect(CALENDLY_CONFIG).toBeDefined()
  })

  it('should have url in CALENDLY_CONFIG', () => {
    expect(CALENDLY_CONFIG).toHaveProperty('url')
    expect(CALENDLY_CONFIG.url).toBe(CALENDLY_URL)
  })

  it('should have defaultDuration in CALENDLY_CONFIG', () => {
    expect(CALENDLY_CONFIG).toHaveProperty('defaultDuration')
    expect(CALENDLY_CONFIG.defaultDuration).toBe(20)
  })
})

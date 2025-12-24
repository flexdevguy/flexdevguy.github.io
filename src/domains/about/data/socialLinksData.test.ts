import { describe, it, expect } from 'vitest'
import { SOCIAL_LINKS, SOCIAL_CONFIG } from './socialLinksData'

describe('socialLinksData', () => {
  it('should have all required social links', () => {
    expect(SOCIAL_LINKS).toHaveLength(3)
  })

  it('should have correct link platforms', () => {
    const platforms = SOCIAL_LINKS.map((link) => link.platform)
    expect(platforms).toContain('linkedin')
    expect(platforms).toContain('github')
    expect(platforms).toContain('twitter')
  })

  it('should have valid URLs', () => {
    SOCIAL_LINKS.forEach((link) => {
      expect(link.url).toMatch(/^https:\/\//)
    })
  })

  it('should have heading config', () => {
    expect(SOCIAL_CONFIG.heading).toBe('Find me online')
  })
})

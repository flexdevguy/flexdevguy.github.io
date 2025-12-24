import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../test-utils/test-utils'
import { AudienceSection } from './AudienceSection'
import { AUDIENCE_CONTENT, AUDIENCE_ITEMS } from '../data/audienceData'

describe('AudienceSection', () => {
  it('should render section title', () => {
    render(<AudienceSection />)
    expect(screen.getByText(AUDIENCE_CONTENT.title)).toBeInTheDocument()
  })

  it('should render intro text', () => {
    render(<AudienceSection />)
    expect(screen.getByText(AUDIENCE_CONTENT.intro)).toBeInTheDocument()
  })

  it('should render all audience items', () => {
    render(<AudienceSection />)
    AUDIENCE_ITEMS.forEach((item) => {
      expect(screen.getByText(item.text)).toBeInTheDocument()
    })
  })

  it('should render conclusion text', () => {
    render(<AudienceSection />)
    expect(screen.getByText(AUDIENCE_CONTENT.conclusion)).toBeInTheDocument()
  })

  it('should render items with bullet points', () => {
    const { container } = render(<AudienceSection />)
    const bullets = container.querySelectorAll('.text-gray-900.font-semibold')
    expect(bullets.length).toBeGreaterThan(0)
  })
})

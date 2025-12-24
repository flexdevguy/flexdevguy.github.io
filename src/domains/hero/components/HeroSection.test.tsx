import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../test-utils/test-utils'
import { HeroSection } from './HeroSection'
import { HERO_CONTENT } from '../data/heroContent'

describe('HeroSection', () => {
  it('should render headline', () => {
    render(<HeroSection />)
    expect(screen.getByText(HERO_CONTENT.headline)).toBeInTheDocument()
  })

  it('should render subheadline', () => {
    render(<HeroSection />)
    expect(screen.getByText(HERO_CONTENT.subheadline)).toBeInTheDocument()
  })

  it('should render CTA button with correct label', () => {
    render(<HeroSection />)
    expect(
      screen.getByRole('link', { name: HERO_CONTENT.cta.label })
    ).toBeInTheDocument()
  })

  it('should render CTA subtext', () => {
    render(<HeroSection />)
    expect(screen.getByText(HERO_CONTENT.cta.subtext)).toBeInTheDocument()
  })

  it('should have full screen height', () => {
    const { container } = render(<HeroSection />)
    const section = container.querySelector('section')
    expect(section).toHaveClass('min-h-screen')
  })
})

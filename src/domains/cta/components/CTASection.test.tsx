import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../test-utils/test-utils'
import { CTASection } from './CTASection'
import { CTA_CONTENT, TOPMATE_URL } from '../data/ctaData'

describe('CTASection', () => {
  it('should render section title', () => {
    render(<CTASection />)
    expect(screen.getByText(CTA_CONTENT.title)).toBeInTheDocument()
  })

  it('should render description text', () => {
    render(<CTASection />)
    expect(screen.getByText(CTA_CONTENT.description)).toBeInTheDocument()
  })

  it('should render CTA button with correct label', () => {
    render(<CTASection />)
    expect(
      screen.getByRole('link', { name: CTA_CONTENT.buttonLabel })
    ).toBeInTheDocument()
  })

  it('should render footer note', () => {
    render(<CTASection />)
    expect(screen.getByText(CTA_CONTENT.footerNote)).toBeInTheDocument()
  })

  it('should have button linking to Topmate', () => {
    render(<CTASection />)
    const button = screen.getByRole('link', { name: CTA_CONTENT.buttonLabel })
    expect(button).toHaveAttribute('href', TOPMATE_URL)
  })

  it('should have centered text alignment', () => {
    const { container } = render(<CTASection />)
    const centerDiv = container.querySelector('.text-center')
    expect(centerDiv).toBeInTheDocument()
  })
})

import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../test-utils/test-utils'
import { Footer } from './Footer'

describe('Footer', () => {
  it('should render copyright text', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(
      screen.getByText(`© ${currentYear} grwm.dev. All rights reserved.`)
    ).toBeInTheDocument()
  })

  it('should display current year dynamically', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    const footerText = screen.getByText(/grwm.dev/)
    expect(footerText.textContent).toContain(String(currentYear))
  })

  it('should have dark background', () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')
    expect(footer).toHaveClass('bg-gray-900')
  })

  it('should have centered text', () => {
    const { container } = render(<Footer />)
    const centerDiv = container.querySelector('.text-center')
    expect(centerDiv).toBeInTheDocument()
  })
})

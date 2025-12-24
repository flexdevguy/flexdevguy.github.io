import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../test-utils/test-utils'
import { ServicesSection } from './ServicesSection'
import { SERVICES_CONTENT, SERVICE_ITEMS } from '../data/servicesData'

describe('ServicesSection', () => {
  it('should render section title', () => {
    render(<ServicesSection />)
    expect(screen.getByText(SERVICES_CONTENT.title)).toBeInTheDocument()
  })

  it('should render intro text', () => {
    render(<ServicesSection />)
    expect(screen.getByText(SERVICES_CONTENT.intro)).toBeInTheDocument()
  })

  it('should render all service items', () => {
    render(<ServicesSection />)
    SERVICE_ITEMS.forEach((item) => {
      expect(screen.getByText(item.text)).toBeInTheDocument()
    })
  })

  it('should render conclusion text', () => {
    render(<ServicesSection />)
    expect(screen.getByText(SERVICES_CONTENT.conclusion)).toBeInTheDocument()
  })

  it('should render service cards in grid layout', () => {
    const { container } = render(<ServicesSection />)
    const grid = container.querySelector('.grid')
    expect(grid).toBeInTheDocument()
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2')
  })
})

import { describe, it, expect } from 'vitest'
import { render, screen } from './test-utils/test-utils'
import App from './App'
import { HERO_CONTENT } from './domains/hero/data/heroContent'
import { AUDIENCE_CONTENT } from './domains/audience/data/audienceData'
import { SERVICES_CONTENT } from './domains/services/data/servicesData'
import { PROCESS_CONTENT } from './domains/process/data/processData'
import { ABOUT_CONTENT } from './domains/about/data/aboutData'
import { CTA_CONTENT } from './domains/cta/data/ctaData'

describe('App', () => {
  it('should render hero section', () => {
    render(<App />)
    expect(screen.getByText(HERO_CONTENT.headline)).toBeInTheDocument()
  })

  it('should render audience section', () => {
    render(<App />)
    expect(screen.getByText(AUDIENCE_CONTENT.title)).toBeInTheDocument()
  })

  it('should render services section', () => {
    render(<App />)
    expect(screen.getByText(SERVICES_CONTENT.title)).toBeInTheDocument()
  })

  it('should render process section', () => {
    render(<App />)
    expect(screen.getByText(PROCESS_CONTENT.title)).toBeInTheDocument()
  })

  it('should render about section', () => {
    render(<App />)
    expect(screen.getByText(ABOUT_CONTENT.title)).toBeInTheDocument()
  })

  it('should render CTA section', () => {
    render(<App />)
    expect(screen.getByText(CTA_CONTENT.title)).toBeInTheDocument()
  })

  it('should render footer', () => {
    render(<App />)
    const currentYear = new Date().getFullYear()
    expect(
      screen.getByText(`© ${currentYear} grwm.dev. All rights reserved.`)
    ).toBeInTheDocument()
  })

  it('should have white background', () => {
    const { container } = render(<App />)
    const mainDiv = container.firstChild as HTMLElement
    expect(mainDiv).toHaveClass('bg-white')
  })
})

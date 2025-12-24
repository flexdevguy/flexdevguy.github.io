import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../test-utils/test-utils'
import { AboutSection } from './AboutSection'
import { ABOUT_CONTENT, ABOUT_POINTS } from '../data/aboutData'

describe('AboutSection', () => {
  it('should render section title', () => {
    render(<AboutSection />)
    expect(screen.getByText(ABOUT_CONTENT.title)).toBeInTheDocument()
  })

  it('should render introduction text', () => {
    render(<AboutSection />)
    expect(screen.getByText(ABOUT_CONTENT.introduction)).toBeInTheDocument()
  })

  it('should render list intro text', () => {
    render(<AboutSection />)
    expect(screen.getByText(ABOUT_CONTENT.listIntro)).toBeInTheDocument()
  })

  it('should render all about points', () => {
    render(<AboutSection />)
    ABOUT_POINTS.forEach((point) => {
      expect(screen.getByText(point.text)).toBeInTheDocument()
    })
  })

  it('should render focus intro text', () => {
    render(<AboutSection />)
    expect(screen.getByText(ABOUT_CONTENT.focusIntro)).toBeInTheDocument()
  })

  it('should render focus statement', () => {
    render(<AboutSection />)
    expect(screen.getByText(ABOUT_CONTENT.focusStatement)).toBeInTheDocument()
  })
})

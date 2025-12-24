import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../test-utils/test-utils'
import { ProcessSection } from './ProcessSection'
import { PROCESS_CONTENT, PROCESS_STEPS } from '../data/processData'

describe('ProcessSection', () => {
  it('should render section title', () => {
    render(<ProcessSection />)
    expect(screen.getByText(PROCESS_CONTENT.title)).toBeInTheDocument()
  })

  it('should render all process steps', () => {
    render(<ProcessSection />)
    PROCESS_STEPS.forEach((step) => {
      expect(screen.getByText(step.text)).toBeInTheDocument()
      expect(screen.getByText(step.number)).toBeInTheDocument()
    })
  })

  it('should render conclusion text', () => {
    render(<ProcessSection />)
    expect(screen.getByText(PROCESS_CONTENT.conclusion)).toBeInTheDocument()
  })

  it('should render steps in sequence', () => {
    const { container } = render(<ProcessSection />)
    const steps = container.querySelectorAll('.space-y-8 > div')
    expect(steps.length).toBe(PROCESS_STEPS.length)
  })
})

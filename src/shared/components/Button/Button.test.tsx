import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '../../../test-utils/test-utils'
import { Button } from './Button'
import * as gaModule from '../../hooks/useGoogleAnalytics'

vi.mock('../../hooks/useGoogleAnalytics', () => ({
  trackGAEvent: vi.fn()
}))

describe('Button', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render with label', () => {
    render(<Button href='/test' label='Click me' />)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('should render as anchor tag with correct href', () => {
    render(<Button href='/test' label='Test Button' />)
    const link = screen.getByRole('link', { name: 'Test Button' })
    expect(link).toHaveAttribute('href', '/test')
  })

  it('should apply primary variant styles by default', () => {
    render(<Button href='/test' label='Primary Button' />)
    const button = screen.getByRole('link', { name: 'Primary Button' })
    expect(button).toHaveClass('bg-gray-900', 'text-white')
  })

  it('should apply secondary variant styles when specified', () => {
    render(<Button href='/test' label='Secondary Button' variant='secondary' />)
    const button = screen.getByRole('link', { name: 'Secondary Button' })
    expect(button).toHaveClass('bg-white', 'text-gray-900')
  })

  it('should add external link attributes when external is true', () => {
    render(<Button href='https://example.com' label='External Link' external />)
    const link = screen.getByRole('link', { name: 'External Link' })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should not add external link attributes when external is false', () => {
    render(
      <Button href='/internal' label='Internal Link' external={false} />
    )
    const link = screen.getByRole('link', { name: 'Internal Link' })
    expect(link).not.toHaveAttribute('target')
    expect(link).not.toHaveAttribute('rel')
  })

  it('should apply custom className', () => {
    render(
      <Button href='/test' label='Custom Class' className='custom-class' />
    )
    const button = screen.getByRole('link', { name: 'Custom Class' })
    expect(button).toHaveClass('custom-class')
  })

  it('should have base button classes', () => {
    render(<Button href='/test' label='Base Button' />)
    const button = screen.getByRole('link', { name: 'Base Button' })
    expect(button).toHaveClass('inline-flex', 'items-center', 'px-8', 'py-4')
  })

  it('should track GA event on button click', () => {
    render(<Button href='/test' label='Tracked Button' />)
    const button = screen.getByRole('link', { name: 'Tracked Button' })

    button.click()

    expect(gaModule.trackGAEvent).toHaveBeenCalledWith(
      'engagement',
      'cta_button_click',
      'Tracked Button',
      1
    )
  })

  it('should track GA event with CTA label', () => {
    const ctaLabel = '👉 Book a 1:1 Call'
    render(<Button href='https://topmate.io' label={ctaLabel} variant='topmate' />)
    const button = screen.getByRole('link', { name: ctaLabel })

    button.click()

    expect(gaModule.trackGAEvent).toHaveBeenCalledWith(
      'engagement',
      'cta_button_click',
      ctaLabel,
      1
    )
  })
})

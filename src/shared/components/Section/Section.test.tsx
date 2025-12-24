import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils/test-utils'
import { Section } from './Section'

describe('Section', () => {
  it('should render children', () => {
    render(
      <Section>
        <div>Test Content</div>
      </Section>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should apply white background by default', () => {
    const { container } = render(
      <Section>
        <div>Content</div>
      </Section>
    )
    const section = container.querySelector('section')
    expect(section).toHaveClass('bg-white')
  })

  it('should apply gray background when specified', () => {
    const { container } = render(
      <Section background='gray'>
        <div>Content</div>
      </Section>
    )
    const section = container.querySelector('section')
    expect(section).toHaveClass('bg-gray-50')
  })

  it('should apply normal padding by default', () => {
    const { container } = render(
      <Section>
        <div>Content</div>
      </Section>
    )
    const section = container.querySelector('section')
    expect(section).toHaveClass('py-20')
  })

  it('should apply large padding when specified', () => {
    const { container } = render(
      <Section padding='large'>
        <div>Content</div>
      </Section>
    )
    const section = container.querySelector('section')
    expect(section).toHaveClass('py-24')
  })

  it('should apply custom className', () => {
    const { container } = render(
      <Section className='custom-section'>
        <div>Content</div>
      </Section>
    )
    const section = container.querySelector('section')
    expect(section).toHaveClass('custom-section')
  })

  it('should have max-width container', () => {
    const { container } = render(
      <Section>
        <div>Content</div>
      </Section>
    )
    const innerDiv = container.querySelector('.max-w-4xl')
    expect(innerDiv).toBeInTheDocument()
  })
})

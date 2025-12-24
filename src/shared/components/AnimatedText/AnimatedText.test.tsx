import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils/test-utils'
import { AnimatedText } from './AnimatedText'

describe('AnimatedText', () => {
  it('should render text content', () => {
    render(<AnimatedText>Test Text</AnimatedText>)
    expect(screen.getByText('Test Text')).toBeInTheDocument()
  })

  it('should render as paragraph by default', () => {
    const { container } = render(<AnimatedText>Test</AnimatedText>)
    const paragraph = container.querySelector('p')
    expect(paragraph).toBeInTheDocument()
    expect(paragraph).toHaveTextContent('Test')
  })

  it('should render as h1 when specified', () => {
    const { container } = render(<AnimatedText as='h1'>Heading</AnimatedText>)
    const heading = container.querySelector('h1')
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Heading')
  })

  it('should render as h2 when specified', () => {
    const { container } = render(<AnimatedText as='h2'>Subheading</AnimatedText>)
    const heading = container.querySelector('h2')
    expect(heading).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    render(<AnimatedText className='custom-class'>Test</AnimatedText>)
    const paragraph = screen.getByText('Test')
    expect(paragraph).toHaveClass('custom-class')
  })

  it('should render with motion wrapper', () => {
    const { container } = render(<AnimatedText>Test</AnimatedText>)
    const motionDiv = container.querySelector('div')
    expect(motionDiv).toBeInTheDocument()
  })
})

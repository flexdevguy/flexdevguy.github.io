import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../test-utils/test-utils'
import { ProcessStep } from './ProcessStep'
import { createSlideInLeftStrong } from '../../../shared/hooks/useAnimationVariants'
import type { StepItem } from '../../../shared/types'

describe('ProcessStep', () => {
  const mockStep: StepItem = {
    id: 'step-1',
    number: '1',
    text: 'Test step description'
  }

  const mockVariants = createSlideInLeftStrong(0)

  it('should render step number', () => {
    render(<ProcessStep step={mockStep} variants={mockVariants} />)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('should render step text', () => {
    render(<ProcessStep step={mockStep} variants={mockVariants} />)
    expect(screen.getByText('Test step description')).toBeInTheDocument()
  })

  it('should render number in circular badge', () => {
    const { container } = render(
      <ProcessStep step={mockStep} variants={mockVariants} />
    )
    const badge = container.querySelector('.rounded-full')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('bg-gray-900', 'text-white')
  })
})

import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../test-utils/test-utils'
import { ServiceCard } from './ServiceCard'
import { createFadeInUp } from '../../../shared/hooks/useAnimationVariants'
import type { ListItem } from '../../../shared/types'

describe('ServiceCard', () => {
  const mockItem: ListItem = {
    id: 'test-1',
    text: 'Test service item'
  }

  const mockVariants = createFadeInUp(0)

  it('should render service text', () => {
    render(<ServiceCard item={mockItem} variants={mockVariants} />)
    expect(screen.getByText('Test service item')).toBeInTheDocument()
  })

  it('should render checkmark icon', () => {
    const { container } = render(
      <ServiceCard item={mockItem} variants={mockVariants} />
    )
    const checkmark = container.querySelector('.text-green-600')
    expect(checkmark).toBeInTheDocument()
    expect(checkmark).toHaveTextContent('✅')
  })

  it('should have card styling classes', () => {
    const { container } = render(
      <ServiceCard item={mockItem} variants={mockVariants} />
    )
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('bg-white', 'rounded-lg', 'shadow-sm')
  })
})

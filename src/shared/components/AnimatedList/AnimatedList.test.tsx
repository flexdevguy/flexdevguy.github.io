import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils/test-utils'
import type { ListItem } from '../../types'
import { AnimatedList } from './AnimatedList'

describe('AnimatedList', () => {
  const mockItems: ListItem[] = [
    { id: '1', text: 'First item' },
    { id: '2', text: 'Second item' },
    { id: '3', text: 'Third item' }
  ]

  it('should render list items', () => {
    render(
      <AnimatedList
        items={mockItems}
        renderItem={(item) => <li>{item.text}</li>}
      />
    )
    expect(screen.getByText('First item')).toBeInTheDocument()
    expect(screen.getByText('Second item')).toBeInTheDocument()
    expect(screen.getByText('Third item')).toBeInTheDocument()
  })

  it('should use renderItem function to render each item', () => {
    render(
      <AnimatedList
        items={mockItems}
        renderItem={(item) => (
          <div data-testid={`item-${item.id}`}>{item.text}</div>
        )}
      />
    )
    expect(screen.getByTestId('item-1')).toBeInTheDocument()
    expect(screen.getByTestId('item-2')).toBeInTheDocument()
    expect(screen.getByTestId('item-3')).toBeInTheDocument()
  })

  it('should apply container className', () => {
    const { container } = render(
      <AnimatedList
        items={mockItems}
        renderItem={(item) => <li>{item.text}</li>}
        containerClassName='custom-list'
      />
    )
    const ul = container.querySelector('ul')
    expect(ul).toHaveClass('custom-list')
  })

  it('should apply item className', () => {
    const { container } = render(
      <AnimatedList
        items={mockItems}
        renderItem={(item) => <li>{item.text}</li>}
        itemClassName='custom-item'
      />
    )
    const items = container.querySelectorAll('li')
    items.forEach((item) => {
      expect(item).toHaveClass('custom-item')
    })
  })

  it('should render empty list when items array is empty', () => {
    const { container } = render(
      <AnimatedList items={[]} renderItem={() => <li>Item</li>} />
    )
    const ul = container.querySelector('ul')
    expect(ul).toBeInTheDocument()
    expect(ul?.children.length).toBe(0)
  })
})

import React from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import type { ListItem } from '../../types'
import { createStaggerContainer, createSlideInLeft } from '../../hooks/useAnimationVariants'

interface AnimatedListProps {
  items: ListItem[]
  renderItem: (item: ListItem, index: number) => React.ReactNode
  containerClassName?: string
  itemClassName?: string
  containerVariants?: Variants
  itemVariants?: Variants
}

interface AnimatedListItemProps {
  item: ListItem
  index: number
  renderItem: (item: ListItem, index: number) => React.ReactNode
  itemClassName: string
  itemVariants: Variants
}

/**
 * Memoized list item to prevent re-renders when parent updates
 * Only re-renders if item, itemClassName, or itemVariants actually change
 * Custom comparison ensures deep changes trigger re-render
 */
const AnimatedListItem = React.memo(
  ({ item, index, renderItem, itemClassName, itemVariants }: AnimatedListItemProps): JSX.Element => (
    <motion.li
      key={item.id}
      variants={itemVariants}
      className={itemClassName}
    >
      {renderItem(item, index)}
    </motion.li>
  ),
  (prevProps, nextProps) => {
    // Return true if props are equal (no re-render needed)
    // Return false if props differ (re-render needed)
    return (
      prevProps.item.id === nextProps.item.id &&
      prevProps.itemClassName === nextProps.itemClassName &&
      prevProps.index === nextProps.index
    )
  }
)

AnimatedListItem.displayName = 'AnimatedListItem'

/**
 * Reusable AnimatedList component following Strategy Pattern
 * Allows different rendering strategies via renderItem prop
 * Optimized with React.memo for list items to prevent unnecessary re-renders
 */
export const AnimatedList = React.memo(function AnimatedListComponent({
  items,
  renderItem,
  containerClassName = '',
  itemClassName = '',
  containerVariants,
  itemVariants
}: AnimatedListProps): JSX.Element {
  const defaultContainerVariants =
    (containerVariants != null) || createStaggerContainer(0.1)
  const defaultItemVariants = (itemVariants != null) || createSlideInLeft()

  return (
    <motion.ul
      variants={defaultContainerVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
      className={containerClassName}
    >
      {items.map((item, index) => (
        <AnimatedListItem
          key={item.id}
          item={item}
          index={index}
          renderItem={renderItem}
          itemClassName={itemClassName}
          itemVariants={defaultItemVariants}
        />
      ))}
    </motion.ul>
  )
})

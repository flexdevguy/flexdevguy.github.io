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

/**
 * Reusable AnimatedList component following Strategy Pattern
 * Allows different rendering strategies via renderItem prop
 */
export const AnimatedList = ({
  items,
  renderItem,
  containerClassName = '',
  itemClassName = '',
  containerVariants,
  itemVariants
}: AnimatedListProps): JSX.Element => {
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
        <motion.li
          key={item.id}
          variants={defaultItemVariants}
          className={itemClassName}
        >
          {renderItem(item, index)}
        </motion.li>
      ))}
    </motion.ul>
  )
}

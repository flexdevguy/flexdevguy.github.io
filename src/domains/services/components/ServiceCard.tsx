import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import type { ListItem } from '@shared/types'

interface ServiceCardProps {
  item: ListItem
  variants: Variants
}

/**
 * ServiceCard component following Single Responsibility Principle
 * Only responsible for rendering a single service card
 *
 * Features:
 * - Gentle hover lift (translateY -4px)
 * - Soft shadow enhancement on hover
 * - Subtle border highlight on interaction
 */
export const ServiceCard = ({ item, variants }: ServiceCardProps): JSX.Element => (
  <motion.div
    variants={variants}
    className='card-hover flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm'
  >
    <span className='text-blue-600 text-xl font-bold mt-0.5 flex-shrink-0'>✓</span>
    <span className='text-gray-700 text-lg'>{item.text}</span>
  </motion.div>
)

import type { ReactNode } from 'react'

interface ShimmerLoaderProps {
  className?: string
  children?: ReactNode
}

/**
 * Base Shimmer Loader Component
 * Provides shimmer animation effect
 */
const ShimmerBase = ({ className = '' }: { className?: string }): JSX.Element => (
  <div className={`shimmer ${className}`} />
)

/**
 * Shimmer Loader Component
 * Displays shimmer loading effect
 */
export const ShimmerLoader = ({
  className = '',
  children
}: ShimmerLoaderProps): JSX.Element => {
  if (children) {
    return <div className={className}>{children}</div>
  }

  return <ShimmerBase className={className} />
}

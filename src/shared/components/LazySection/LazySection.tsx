import { lazy, Suspense, type ComponentType } from 'react'
import { SectionShimmer } from '../ShimmerLoader'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

interface LazySectionProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  rootMargin?: string
}

/**
 * LazySection Component
 * Lazy loads content when it enters viewport
 * Optimized for performance and Core Web Vitals
 */
export const LazySection = ({
  children,
  fallback = <SectionShimmer />,
  rootMargin = '200px'
}: LazySectionProps): JSX.Element => {
  const [ref, isIntersecting] = useIntersectionObserver({
    rootMargin,
    triggerOnce: true
  })

  return (
    <div ref={ref}>
      {isIntersecting
        ? (
          <Suspense fallback={fallback}>{children}</Suspense>
          )
        : (
            fallback
          )}
    </div>
  )
}

/**
 * Higher-order component for lazy loading components
 */
export const withLazyLoading = <P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  fallback?: React.ReactNode
) => {
  const LazyComponent = lazy(importFn)

  return (props: P): JSX.Element => (
    <Suspense fallback={fallback || <SectionShimmer />}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

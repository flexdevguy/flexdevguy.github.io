import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import { PageShimmer } from '@shared/components/ShimmerLoader'
import { SEO } from '@shared/components/SEO'

// Lazy load NotFound page
const NotFound = lazy(async () =>
  await import('../pages/NotFound').then((module) => ({
    default: module.NotFound
  }))
)

/**
 * 404 Not Found Route
 * Lazy loaded for better performance
 * SEO optimized with proper meta tags
 */
export const Route = createFileRoute('/404')({
  component: () => (
    <>
      <SEO
        title='404 - Page Not Found'
        description="The page you're looking for doesn't exist or has been moved. Return to the homepage to find 1:1 mentoring for frontend and full-stack developers."
        canonicalUrl='/404'
      />
      <Suspense fallback={<PageShimmer />}>
        <NotFound />
      </Suspense>
    </>
  )
})

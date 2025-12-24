import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router'
import { ErrorBoundary } from '@shared/components/ErrorBoundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HelmetProvider } from 'react-helmet-async'
import { Suspense } from 'react'
import { PageShimmer } from '@shared/components/ShimmerLoader'
import { SEO } from '@shared/components/SEO'
import { useGoogleAnalyticsPageView } from '@shared/hooks/useGoogleAnalytics'
import {
  generateOrganizationStructuredData,
  generateWebSiteStructuredData,
  generatePersonStructuredData,
  generateServiceStructuredData
} from '@shared/utils/seo'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
      // Optimize for hydration
      structuralSharing: true
    }
  }
})

/**
 * Root Route Component
 * Provides app-wide providers and error boundaries
 * Optimized for fast hydration and SEO
 */
const RootComponent = (): JSX.Element => {
  const { pathname } = useLocation()
  useGoogleAnalyticsPageView(pathname)

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          {/* Global SEO tags */}
          <SEO
            title='Grow With Me — Become a Strong Product Engineer'
            description='1:1 mentoring for frontend and full-stack developers who want real skills, career clarity, and better roles in product companies.'
            keywords='react mentoring, frontend development, full-stack development, career coaching, software engineering, product engineer, code review, interview preparation'
            canonicalUrl='/'
            structuredData={[
              generateOrganizationStructuredData(),
              generateWebSiteStructuredData(),
              generatePersonStructuredData(),
              generateServiceStructuredData()
            ]}
          />
          <Suspense fallback={<PageShimmer />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export const Route = createRootRoute({
  component: RootComponent
})

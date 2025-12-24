import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import { SectionShimmer } from '@shared/components/ShimmerLoader'
import { SEO } from '@shared/components/SEO'

// Lazy load HomePage for code splitting
const HomePage = lazy(async () =>
  await import('../pages/HomePage').then((module) => ({
    default: module.HomePage
  }))
)

/**
 * Home Page Route
 * Main landing page with lazy loading
 * Optimized for fast LCP, TTI, and SEO
 */
export const Route = createFileRoute('/')({
  component: () => (
    <>
      <SEO
        title='Grow With Me — Become a Strong Product Engineer'
        description='1:1 mentoring for frontend and full-stack developers who want real skills, career clarity, and better roles in product companies. Book a free 20-minute clarity call.'
        keywords='react mentoring, frontend development, full-stack development, career coaching, software engineering, product engineer, code review, interview preparation, react architecture, clean code'
        canonicalUrl='/'
      />
      <Suspense fallback={<SectionShimmer />}>
        <HomePage />
      </Suspense>
    </>
  )
})

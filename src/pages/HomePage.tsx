import { lazy, Suspense } from 'react'
import { HeroSection } from '@domains/hero'
import { LazySection } from '@shared/components/LazySection'

// Lazy load below-the-fold components for better LCP
const AudienceSection = lazy(async () =>
  await import('@domains/audience').then((module) => ({
    default: module.AudienceSection
  }))
)

const ServicesSection = lazy(async () =>
  await import('@domains/services').then((module) => ({
    default: module.ServicesSection
  }))
)

const ProcessSection = lazy(async () =>
  await import('@domains/process').then((module) => ({
    default: module.ProcessSection
  }))
)

const AboutSection = lazy(async () =>
  await import('@domains/about').then((module) => ({
    default: module.AboutSection
  }))
)

const CTASection = lazy(async () =>
  await import('@domains/cta').then((module) => ({
    default: module.CTASection
  }))
)

const Footer = lazy(async () =>
  await import('@domains/layout').then((module) => ({
    default: module.Footer
  }))
)

/**
 * Home Page Component
 * Optimized for fast LCP by loading Hero immediately
 * Below-the-fold sections are lazy loaded with intersection observer
 */
export const HomePage = (): JSX.Element => (
  <div className='min-h-screen bg-white'>
    {/* Above the fold - Load immediately for LCP */}
    <HeroSection />

    {/* Below the fold - Lazy load with intersection observer */}
    <LazySection rootMargin='300px'>
      <AudienceSection />
    </LazySection>

    <LazySection rootMargin='300px'>
      <ServicesSection />
    </LazySection>

    <LazySection rootMargin='300px'>
      <ProcessSection />
    </LazySection>

    <LazySection rootMargin='300px'>
      <AboutSection />
    </LazySection>

    <LazySection rootMargin='300px'>
      <CTASection />
    </LazySection>

    <LazySection rootMargin='300px'>
      <Footer />
    </LazySection>
  </div>
)

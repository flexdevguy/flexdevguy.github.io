import type { StructuredData } from '../types/seo'

/**
 * SEO utility functions
 */

const SITE_URL = 'https://grwm.dev'
const SITE_NAME = 'grwm.dev'
const DEFAULT_DESCRIPTION =
  '1:1 mentoring for frontend and full-stack developers who want real skills, career clarity, and better roles in product companies.'

/**
 * Generate structured data for Organization
 */
export const generateOrganizationStructuredData = (): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: DEFAULT_DESCRIPTION,
  sameAs: [
    // Add social media links here
    // 'https://twitter.com/grwmdev',
    // 'https://linkedin.com/company/grwmdev',
  ]
})

/**
 * Generate structured data for WebSite
 */
export const generateWebSiteStructuredData = (): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`
    },
    'query-input': 'required name=search_term_string'
  }
})

/**
 * Generate structured data for Person (Mentor)
 */
export const generatePersonStructuredData = (): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Product Engineering Mentor',
  jobTitle: 'Software Developer & Mentor',
  description:
    'Software developer with 15+ years of experience mentoring frontend and full-stack developers.',
  url: SITE_URL,
  knowsAbout: [
    'React',
    'Frontend Development',
    'Full-Stack Development',
    'Software Architecture',
    'Career Development',
    'Interview Preparation'
  ]
})

/**
 * Generate structured data for Service
 */
export const generateServiceStructuredData = (): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: '1:1 Mentoring',
  provider: {
    '@type': 'Person',
    name: 'Product Engineering Mentor'
  },
  areaServed: 'Worldwide',
  description: DEFAULT_DESCRIPTION,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free 20-minute clarity call'
  }
})

/**
 * Generate FAQ structured data
 */
export const generateFAQStructuredData = (
  faqs: Array<{ question: string, answer: string }>
): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
})

/**
 * Generate BreadcrumbList structured data
 */
export const generateBreadcrumbStructuredData = (
  items: Array<{ name: string, url: string }>
): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
})

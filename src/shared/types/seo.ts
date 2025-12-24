/**
 * SEO-related type definitions
 */

export interface SEOProps {
  title?: string
  description: string
  keywords?: string
  canonicalUrl?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'profile'
  twitterCard?: 'summary' | 'summary_large_image'
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>
}

export interface StructuredData {
  '@context': string
  '@type': string
  [key: string]: unknown
}

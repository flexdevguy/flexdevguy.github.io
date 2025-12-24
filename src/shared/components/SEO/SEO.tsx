import { Helmet } from 'react-helmet-async'
import type { SEOProps } from '../../types/seo'

/**
 * SEO Component
 * Manages meta tags, Open Graph, Twitter Cards, and structured data
 * Optimized for search engines and social media sharing
 */
export const SEO = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  structuredData
}: SEOProps): JSX.Element => {
  const siteUrl = 'https://grwm.dev'
  const fullTitle = title
    ? `${title} | grwm.dev`
    : 'Grow With Me — Become a Strong Product Engineer | grwm.dev'
  const fullCanonicalUrl = canonicalUrl
    ? `${siteUrl}${canonicalUrl}`
    : siteUrl
  const fullOgImage = ogImage || `${siteUrl}/og-image.jpg`

  // Handle array of structured data
  const structuredDataArray = Array.isArray(structuredData)
    ? structuredData
    : (structuredData != null)
        ? [structuredData]
        : []

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name='description' content={description} />
      {keywords && <meta name='keywords' content={keywords} />}
      <link rel='canonical' href={fullCanonicalUrl} />

      {/* Open Graph Tags */}
      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content={ogType} />
      <meta property='og:url' content={fullCanonicalUrl} />
      <meta property='og:image' content={fullOgImage} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:site_name' content='grwm.dev' />
      <meta property='og:locale' content='en_US' />

      {/* Twitter Card Tags */}
      <meta name='twitter:card' content={twitterCard} />
      <meta name='twitter:title' content={fullTitle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={fullOgImage} />

      {/* Additional SEO Tags */}
      <meta name='author' content='grwm.dev' />
      <meta name='robots' content='index, follow' />
      <meta name='googlebot' content='index, follow' />
      <meta name='language' content='English' />
      <meta name='revisit-after' content='7 days' />

      {/* Structured Data (JSON-LD) */}
      {structuredDataArray.map((data, index) => (
        <script key={index} type='application/ld+json'>
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  )
}

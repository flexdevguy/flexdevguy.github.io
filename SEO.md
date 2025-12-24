# SEO Optimization Guide

## Overview

This application is fully optimized for search engines with comprehensive SEO implementation including meta tags, structured data, sitemap, and robots.txt.

## SEO Features

### 1. Meta Tags

**Basic Meta Tags:**
- Title (optimized per page)
- Description (unique per page)
- Keywords (relevant keywords)
- Author
- Robots (index, follow)
- Language
- Theme color

**Open Graph Tags:**
- og:title
- og:description
- og:type
- og:url
- og:image
- og:site_name
- og:locale

**Twitter Card Tags:**
- twitter:card
- twitter:title
- twitter:description
- twitter:image

### 2. Structured Data (JSON-LD)

Implemented structured data for:
- **Organization**: Company information
- **WebSite**: Website metadata
- **Person**: Mentor profile
- **Service**: Mentoring service details
- **FAQPage**: FAQ structured data (when needed)
- **BreadcrumbList**: Navigation breadcrumbs (when needed)

### 3. Robots.txt

Located at `/public/robots.txt`:
- Allows all search engines
- Disallows admin and API routes
- Points to sitemap location
- Configurable crawl delay

### 4. Sitemap.xml

Located at `/public/sitemap.xml`:
- Lists all important pages
- Includes lastmod, changefreq, priority
- Automatically discoverable by search engines

### 5. Canonical URLs

- Every page has a canonical URL
- Prevents duplicate content issues
- Points to the preferred version of the page

### 6. Semantic HTML

- Proper heading hierarchy (h1, h2, h3)
- Semantic HTML5 elements
- ARIA labels where appropriate
- Alt text for images (when added)

## Implementation

### Using SEO Component

```typescript
import { SEO } from '@shared/components/SEO';

<SEO
  title="Page Title"
  description="Page description"
  keywords="keyword1, keyword2, keyword3"
  canonicalUrl="/page-url"
  ogImage="/og-image.jpg"
/>
```

### Generating Structured Data

```typescript
import {
  generateOrganizationStructuredData,
  generateWebSiteStructuredData,
} from '@shared/utils/seo';

const structuredData = [
  generateOrganizationStructuredData(),
  generateWebSiteStructuredData(),
];
```

## SEO Best Practices

1. **Unique Titles**: Each page has a unique, descriptive title
2. **Meta Descriptions**: Compelling descriptions under 160 characters
3. **Keywords**: Relevant keywords (though less important now)
4. **Structured Data**: Rich snippets for better search results
5. **Mobile-Friendly**: Responsive design (already implemented)
6. **Fast Loading**: Performance optimizations (already implemented)
7. **HTTPS**: Secure connection (required for production)
8. **Accessibility**: Semantic HTML and ARIA labels

## Testing SEO

### Tools to Use:
1. **Google Search Console**: Monitor search performance
2. **Google Rich Results Test**: Test structured data
3. **Facebook Sharing Debugger**: Test Open Graph tags
4. **Twitter Card Validator**: Test Twitter cards
5. **Lighthouse SEO Audit**: Check SEO score

### Checklist:
- [ ] All pages have unique titles
- [ ] All pages have meta descriptions
- [ ] Structured data validates correctly
- [ ] Robots.txt is accessible
- [ ] Sitemap.xml is accessible
- [ ] Canonical URLs are set
- [ ] Open Graph tags work
- [ ] Twitter cards work
- [ ] Mobile-friendly (responsive)
- [ ] Fast loading (performance optimized)

## Updating Sitemap

When adding new pages, update `/public/sitemap.xml`:

```xml
<url>
  <loc>https://grwm.dev/new-page</loc>
  <lastmod>2024-01-01</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
```

## Updating Robots.txt

If you need to block specific paths:

```
Disallow: /private-path/
```

## Social Media Images

Create Open Graph images (1200x630px) and place them in `/public/`:
- `og-image.jpg` - Default OG image
- Update `ogImage` prop in SEO component for page-specific images

## Monitoring

1. Set up Google Search Console
2. Monitor search rankings
3. Track click-through rates
4. Monitor Core Web Vitals
5. Check for crawl errors

## Future Enhancements

1. Blog/Content pages with article structured data
2. FAQ page with FAQ structured data
3. Reviews/Testimonials with Review structured data
4. Local SEO (if applicable)
5. Multilingual support (hreflang tags)


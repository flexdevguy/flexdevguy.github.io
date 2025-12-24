# Performance Optimization Guide

## Overview

This application is optimized for excellent Lighthouse scores with focus on Core Web Vitals:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **TTI (Time to Interactive)**: < 3.8s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

## Optimization Strategies

### 1. Lazy Loading

All below-the-fold components are lazy loaded using:
- `React.lazy()` for code splitting
- `Suspense` boundaries for loading states
- Intersection Observer for viewport-based loading

**Implementation:**
```typescript
// Components are lazy loaded
const AudienceSection = lazy(() => import('@domains/audience'));

// With Suspense boundaries
<Suspense fallback={<SectionShimmer />}>
  <AudienceSection />
</Suspense>
```

### 2. Shimmer Loaders

Replaced loading spinners with shimmer loaders for better UX:
- **PageShimmer**: Full page loading state
- **SectionShimmer**: Section-level loading state
- **ShimmerLoader**: Generic shimmer component

**Benefits:**
- Better perceived performance
- Reduced layout shift
- Smoother loading experience

### 3. Code Splitting

Vite is configured for optimal code splitting:
- Vendor chunks separated by library
- React, Router, Query, Animation, State, Utils in separate chunks
- Automatic chunk optimization

**Chunk Strategy:**
- `react-vendor`: React & React DOM
- `router-vendor`: TanStack Router
- `query-vendor`: TanStack Query
- `animation-vendor`: Framer Motion
- `state-vendor`: Zustand
- `utils-vendor`: Underscore.js

### 4. Intersection Observer

Custom hook `useIntersectionObserver` for viewport-based loading:
- Loads components when they're about to enter viewport
- Configurable root margin (default: 200px)
- Trigger once for performance

### 5. React Query Optimization

Configured for optimal hydration:
- 5-minute stale time
- Structural sharing enabled
- No refetch on window focus
- Automatic retry (1 attempt)

### 6. Build Optimizations

**Vite Configuration:**
- ESBuild minification (faster than Terser)
- CSS minification
- Target: ESNext for modern browsers
- Optimized chunk naming for better caching

**HTML Optimizations:**
- Preconnect to external domains
- DNS prefetch for external resources
- Preload critical CSS
- Inline critical CSS for faster LCP

### 7. Component Loading Strategy

**Above the Fold (Immediate Load):**
- HeroSection (critical for LCP)

**Below the Fold (Lazy Load):**
- AudienceSection
- ServicesSection
- ProcessSection
- AboutSection
- CTASection
- Footer

### 8. Performance Monitoring

Use browser DevTools to monitor:
- Network tab: Check chunk loading
- Performance tab: Analyze rendering
- Lighthouse: Measure Core Web Vitals

## Best Practices

1. **Keep Hero Section Light**: Hero section loads immediately, keep it minimal
2. **Lazy Load Everything Below Fold**: Use `LazySection` component
3. **Use Shimmer Loaders**: Better UX than spinners
4. **Monitor Bundle Size**: Keep chunks under 200KB
5. **Optimize Images**: Use WebP format, lazy load images
6. **Minimize JavaScript**: Tree shaking removes unused code

## Testing Performance

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Run Lighthouse audit
# Use Chrome DevTools > Lighthouse tab
```

## Expected Metrics

- **LCP**: < 2.5s (Hero section loads immediately)
- **TTI**: < 3.8s (Code splitting reduces initial bundle)
- **FID**: < 100ms (Minimal JavaScript on initial load)
- **CLS**: < 0.1 (Shimmer loaders prevent layout shift)
- **FCP**: < 1.8s (Optimized HTML and CSS)

## Future Optimizations

1. Image optimization with next-gen formats
2. Service Worker for offline support
3. HTTP/2 Server Push for critical resources
4. Resource hints (prefetch, preload)
5. Critical CSS extraction


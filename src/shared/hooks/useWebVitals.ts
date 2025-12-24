import { useEffect } from 'react'
import {
  onCLS,
  onFCP,
  onLCP,
  onINP,
  type Metric,
} from 'web-vitals'

interface PerformanceMetrics {
  lcp?: number
  fid?: number
  fcb?: number
  cls?: number
  ttfb?: number
}

/**
 * Hook to monitor Core Web Vitals
 * Sends metrics to analytics or console for monitoring
 */
export const useWebVitals = (): void => {
  useEffect(() => {
    const handleMetric = (metric: Metric): void => {
      // Log to console in development
      if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        console.log(`${metric.name}:`, metric.value, 'ms')
      }

      // Send to analytics (Google Analytics or custom endpoint)
      if (typeof window !== 'undefined') {
        // For Google Analytics integration
        const gtag = (window as any).gtag
        if (gtag) {
          gtag('event', metric.name, {
            value: Math.round(metric.value),
            event_category: 'web_vitals',
            event_label: metric.id,
            non_interaction: true,
          })
        }

        // Optional: Send to custom endpoint
        // fetch('/api/vitals', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ ...metric })
        // })
      }
    }

    // Track all Web Vitals metrics using the new API
    try {
      // Largest Contentful Paint
      onLCP(handleMetric)

      // First Contentful Paint
      onFCP(handleMetric)

      // Cumulative Layout Shift
      onCLS(handleMetric)

      // Interaction to Next Paint (newer metric)
      onINP(handleMetric)
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error measuring Web Vitals:', error)
      }
    }
  }, [])
}

/**
 * Hook to measure custom performance marks
 * Useful for tracking application-specific performance events
 */
export const usePerformanceMark = (
  markName: string,
  measureName?: string
): (() => void) => {
  useEffect(() => {
    // Mark the start of the component render
    performance.mark(`${markName}-start`)

    return () => {
      // Mark the end of component lifecycle
      performance.mark(`${markName}-end`)

      // Measure the duration
      if (measureName) {
        try {
          performance.measure(
            measureName,
            `${markName}-start`,
            `${markName}-end`
          )

          if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
            const measure = performance.getEntriesByName(measureName)[0]
            if (measure) {
              console.log(
                `${measureName} took ${Math.round(measure.duration)}ms`
              )
            }
          }
        } catch (e) {
          // Measurement failed
        }
      }
    }
  }, [markName, measureName])

  return (): void => {
    // Return cleanup function for manual calls
    performance.clearMarks(`${markName}-start`)
    performance.clearMarks(`${markName}-end`)
    performance.clearMeasures(measureName || markName)
  }
}

/**
 * Get current performance metrics
 * Returns object with LCP, FID, CLS values
 */
export const getPerformanceMetrics = (): PerformanceMetrics => {
  const metrics: PerformanceMetrics = {}

  try {
    // Get navigation timing
    const nav = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming
    if (nav) {
      metrics.ttfb = nav.responseStart - nav.requestStart
    }

    // Get paint entries
    const paints = performance.getEntriesByType('paint')
    paints.forEach((entry) => {
      if (entry.name === 'first-contentful-paint') {
        metrics.fcb = entry.startTime
      }
    })

    // Get LCP from latest largest-contentful-paint entry
    const lcps = performance.getEntriesByType('largest-contentful-paint')
    if (lcps.length > 0) {
      const lastLcp = lcps[lcps.length - 1]
      if (lastLcp) {
        metrics.lcp = lastLcp.startTime
      }
    }

    // Get CLS from layout-shift entries
    let clsValue = 0
    const clsEntries = performance.getEntriesByType('layout-shift')
    clsEntries.forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value
      }
    })
    if (clsValue > 0) {
      metrics.cls = clsValue
    }
  } catch (error) {
    console.error('Error getting performance metrics:', error)
  }

  return metrics
}

/**
 * Log performance timeline (development only)
 * Shows all major performance events in order
 */
export const logPerformanceTimeline = (): void => {
  if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'development') return

  try {
    const entries = performance.getEntries()
    const timeline = entries
      .filter(
        (entry) =>
          entry.entryType === 'paint' ||
          entry.entryType === 'measure' ||
          (entry.entryType === 'navigation' && entry.name === 'navigation')
      )
      .sort((a, b) => a.startTime - b.startTime)

    console.group('Performance Timeline')
    timeline.forEach((entry) => {
      console.log(`${entry.name}: ${Math.round(entry.startTime)}ms`)
    })
    console.groupEnd()
  } catch (error) {
    console.error('Error logging performance timeline:', error)
  }
}

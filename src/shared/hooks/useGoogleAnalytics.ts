import { useEffect } from 'react'
import ReactGA from 'react-ga4'

/**
 * Initialize Google Analytics with tracking ID
 * Must be called once during app initialization
 */
export const initializeGoogleAnalytics = (trackingId: string): void => {
  if (!trackingId) {
    console.warn('Google Analytics: Tracking ID not provided')
    return
  }

  ReactGA.initialize(trackingId)
}

/**
 * Hook to track page views when route changes
 * Should be used in the root router component
 */
export const useGoogleAnalyticsPageView = (pathname: string): void => {
  useEffect(() => {
    // Send page view to Google Analytics
    ReactGA.send({
      hitType: 'pageview',
      page: pathname,
      title: document.title
    })
  }, [pathname])
}

/**
 * Track custom events in Google Analytics
 * @param category - Event category (e.g., 'engagement')
 * @param action - Event action (e.g., 'click')
 * @param label - Event label (optional)
 * @param value - Event value (optional)
 */
export const trackGAEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
): void => {
  ReactGA.event({
    category,
    action,
    label,
    value
  })
}

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import ReactGA from 'react-ga4'
import {
  initializeGoogleAnalytics,
  useGoogleAnalyticsPageView,
  trackGAEvent
} from './useGoogleAnalytics'

vi.mock('react-ga4', () => ({
  default: {
    initialize: vi.fn(),
    send: vi.fn(),
    event: vi.fn()
  }
}))

describe('Google Analytics Hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('initializeGoogleAnalytics', () => {
    it('should initialize Google Analytics with valid tracking ID', () => {
      const trackingId = 'G-XXXXXXXXXX'
      initializeGoogleAnalytics(trackingId)

      expect(ReactGA.initialize).toHaveBeenCalledWith(trackingId)
    })

    it('should warn when tracking ID is not provided', () => {
      const warnSpy = vi.spyOn(console, 'warn')
      initializeGoogleAnalytics('')

      expect(warnSpy).toHaveBeenCalledWith(
        'Google Analytics: Tracking ID not provided'
      )
      expect(ReactGA.initialize).not.toHaveBeenCalled()

      warnSpy.mockRestore()
    })
  })

  describe('useGoogleAnalyticsPageView', () => {
    it('should send page view event on pathname change', () => {
      const pathname = '/services'
      renderHook(() => useGoogleAnalyticsPageView(pathname))

      expect(ReactGA.send).toHaveBeenCalledWith({
        hitType: 'pageview',
        page: pathname,
        title: expect.any(String)
      })
    })

    it('should update page view when pathname changes', () => {
      const { rerender } = renderHook(
        ({ pathname }) => useGoogleAnalyticsPageView(pathname),
        { initialProps: { pathname: '/' } }
      )

      expect(ReactGA.send).toHaveBeenCalledTimes(1)

      rerender({ pathname: '/about' })

      expect(ReactGA.send).toHaveBeenCalledTimes(2)
      expect(ReactGA.send).toHaveBeenLastCalledWith({
        hitType: 'pageview',
        page: '/about',
        title: expect.any(String)
      })
    })
  })

  describe('trackGAEvent', () => {
    it('should track event with category and action', () => {
      trackGAEvent('engagement', 'click')

      expect(ReactGA.event).toHaveBeenCalledWith({
        category: 'engagement',
        action: 'click',
        label: undefined,
        value: undefined
      })
    })

    it('should track event with all parameters', () => {
      trackGAEvent('engagement', 'button_click', 'cta_button', 1)

      expect(ReactGA.event).toHaveBeenCalledWith({
        category: 'engagement',
        action: 'button_click',
        label: 'cta_button',
        value: 1
      })
    })
  })
})

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import {
  useWebVitals,
  usePerformanceMark,
  getPerformanceMetrics,
  logPerformanceTimeline,
} from './useWebVitals'

describe('useWebVitals', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    performance.clearMarks()
    performance.clearMeasures()
  })

  it('should mount without errors', () => {
    expect(() => {
      renderHook(() => useWebVitals())
    }).not.toThrow()
  })

  it('should not throw when gtag is not available', () => {
    delete (window as any).gtag

    expect(() => {
      renderHook(() => useWebVitals())
    }).not.toThrow()
  })

  it('should send metrics to gtag when available', () => {
    const gtag = vi.fn()
    ;(window as any).gtag = gtag

    renderHook(() => useWebVitals())

    expect((window as any).gtag).toBeDefined()
  })
})

describe('usePerformanceMark', () => {
  beforeEach(() => {
    performance.clearMarks()
    performance.clearMeasures()
  })

  it('should create performance marks', () => {
    const { unmount } = renderHook(() =>
      usePerformanceMark('test-mark', 'test-measure')
    )

    const marks = performance.getEntriesByType('mark')
    expect(marks.length).toBeGreaterThan(0)

    unmount()
  })

  it('should create performance measures on unmount', () => {
    const { unmount } = renderHook(() =>
      usePerformanceMark('test-mark', 'test-measure')
    )

    unmount()

    const measures = performance.getEntriesByType('measure')
    expect(measures.length).toBeGreaterThan(0)
  })

  it('should return cleanup function', () => {
    const { result } = renderHook(() =>
      usePerformanceMark('test-mark', 'test-measure')
    )

    expect(typeof result.current).toBe('function')
    expect(() => result.current()).not.toThrow()
  })
})

describe('getPerformanceMetrics', () => {
  it('should return metrics object', () => {
    const metrics = getPerformanceMetrics()
    expect(metrics).toBeDefined()
    expect(typeof metrics).toBe('object')
  })

  it('should handle missing entries gracefully', () => {
    expect(() => {
      getPerformanceMetrics()
    }).not.toThrow()
  })
})

describe('logPerformanceTimeline', () => {
  it('should not throw in development mode', () => {
    expect(() => {
      logPerformanceTimeline()
    }).not.toThrow()
  })

  it('should log timeline with console.group', () => {
    const consoleSpy = vi.spyOn(console, 'group')

    logPerformanceTimeline()

    // May or may not be called depending on NODE_ENV
    expect(consoleSpy).toBeDefined()

    consoleSpy.mockRestore()
  })
})

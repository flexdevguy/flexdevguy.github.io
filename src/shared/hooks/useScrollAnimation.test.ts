import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useScrollAnimation } from './useScrollAnimation'
import * as framerMotion from 'framer-motion'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  useInView: vi.fn()
}))

describe('useScrollAnimation', () => {
  it('should return ref and isInView state', () => {
    const mockUseInView = vi.mocked(framerMotion.useInView)
    mockUseInView.mockReturnValue(true)

    const { result } = renderHook(() => useScrollAnimation())

    expect(result.current.ref).toBeDefined()
    expect(result.current.isInView).toBe(true)
  })

  it('should call useInView with default config when no config provided', () => {
    const mockUseInView = vi.mocked(framerMotion.useInView)
    mockUseInView.mockReturnValue(false)

    renderHook(() => useScrollAnimation())

    expect(mockUseInView).toHaveBeenCalledWith(null, {
      once: true,
      margin: '-100px'
    })
  })

  it('should call useInView with custom config', () => {
    const mockUseInView = vi.mocked(framerMotion.useInView)
    mockUseInView.mockReturnValue(true)

    renderHook(() =>
      useScrollAnimation({
        once: false,
        duration: 0.5
      })
    )

    expect(mockUseInView).toHaveBeenCalledWith(null, {
      once: false,
      margin: '-100px'
    })
  })

  it('should return false when element is not in view', () => {
    const mockUseInView = vi.mocked(framerMotion.useInView)
    mockUseInView.mockReturnValue(false)

    const { result } = renderHook(() => useScrollAnimation())

    expect(result.current.isInView).toBe(false)
  })
})

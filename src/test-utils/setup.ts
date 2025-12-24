import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Mock IntersectionObserver for Framer Motion viewport detection in tests
declare global {
  var IntersectionObserver: any
}

globalThis.IntersectionObserver = class IntersectionObserver {
  constructor () {}
  disconnect () {}
  observe () {}
  takeRecords () {
    return []
  }

  unobserve () {}
} as any

// Cleanup after each test
afterEach(() => {
  cleanup()
})

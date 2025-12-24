/**
 * Utility functions using Underscore.js
 * Re-export commonly used underscore functions
 */
export {
  debounce,
  throttle,
  memoize,
  once,
  delay,
  isEqual,
  isEmpty,
  clone,
  extend,
  pick,
  omit,
  groupBy,
  sortBy,
  uniq,
  flatten,
  chunk,
  range
} from 'underscore'

/**
 * Custom utility functions
 */

/**
 * Safely parse JSON with error handling
 */
export const safeJsonParse = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json) as T
  } catch {
    return fallback
  }
}

/**
 * Format error message for display
 */
export const formatError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return 'An unknown error occurred'
}

/**
 * Check if value is not null or undefined
 */
export const isDefined = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined
}

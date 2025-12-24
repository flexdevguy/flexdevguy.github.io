import { useCallback } from 'react'
import { useAppStore } from '../store/useAppStore'
import { formatError } from '../utils'

/**
 * Custom hook for error handling
 * Provides consistent error handling across the application
 */
export const useErrorHandler = () => {
  const { setError, clearError } = useAppStore()

  const handleError = useCallback(
    (error: unknown) => {
      const errorMessage = formatError(error)
      const errorObj = error instanceof Error ? error : new Error(errorMessage)
      setError(errorObj)
      console.error('Error handled:', errorObj)
    },
    [setError]
  )

  const handleAsyncError = useCallback(
    async <T,>(
      asyncFn: () => Promise<T>,
      fallback?: T
    ): Promise<T | undefined> => {
      try {
        return await asyncFn()
      } catch (error) {
        handleError(error)
        return fallback
      }
    },
    [handleError]
  )

  return {
    handleError,
    handleAsyncError,
    clearError
  }
}

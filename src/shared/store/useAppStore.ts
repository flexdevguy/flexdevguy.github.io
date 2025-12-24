import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AppState {
  isLoading: boolean
  error: Error | null
  setLoading: (loading: boolean) => void
  setError: (error: Error | null) => void
  clearError: () => void
}

/**
 * Global application state using Zustand
 * Follows Single Responsibility Principle
 */
export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      isLoading: false,
      error: null,
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (error: Error | null) => set({ error }),
      clearError: () => set({ error: null })
    }),
    { name: 'AppStore' }
  )
)

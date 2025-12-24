import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { NotFound } from './pages/NotFound'
import { initializeGoogleAnalytics } from './shared/hooks/useGoogleAnalytics'

// Initialize Google Analytics
const gaTrackingId = (import.meta.env.VITE_GA_TRACKING_ID as string | undefined)
if (gaTrackingId) {
  initializeGoogleAnalytics(gaTrackingId)
}

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

/**
 * Router Component
 * Provides routing functionality using TanStack Router
 */
export const AppRouter = (): JSX.Element => <RouterProvider router={router} />

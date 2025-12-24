import { lazy, Suspense } from 'react'
import { Button } from '@shared/components/Button'
import { ShimmerLoader } from '@shared/components/ShimmerLoader'

// Lazy load button for better performance
const LazyButton = lazy(async () =>
  await import('@shared/components/Button').then((module) => ({
    default: module.Button
  }))
)

/**
 * 404 Not Found Page
 * Displays when route is not found
 * Optimized with lazy loading
 */
export const NotFound = (): JSX.Element => (
  <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
    <div className='max-w-md w-full text-center'>
      <h1 className='text-9xl font-bold text-gray-900 mb-4'>404</h1>
      <h2 className='text-3xl font-bold text-gray-900 mb-4'>Page Not Found</h2>
      <p className='text-lg text-gray-600 mb-8'>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Suspense
        fallback={
          <ShimmerLoader className='h-12 w-64 mx-auto rounded-lg' />
        }
      >
        <LazyButton
          href='/'
          label='Go to Home'
          variant='primary'
          external={false}
        />
      </Suspense>
    </div>
  </div>
)

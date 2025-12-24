/**
 * Page-level Shimmer Loader
 * Optimized for full page loading states
 */
export const PageShimmer = (): JSX.Element => (
  <div className='min-h-screen bg-white'>
    {/* Hero Section Shimmer */}
    <div className='min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white'>
      <div className='max-w-4xl mx-auto text-center w-full'>
        <div className='h-16 shimmer rounded-lg mb-6 w-full' />
        <div className='h-8 shimmer rounded-lg mb-8 max-w-3xl mx-auto' />
        <div className='h-12 shimmer rounded-lg w-64 mx-auto' />
      </div>
    </div>

    {/* Section Shimmer */}
    {[1, 2, 3].map((i) => (
      <div key={i} className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-4xl mx-auto'>
          <div className='h-10 shimmer rounded-lg mb-6 w-1/3' />
          <div className='space-y-4'>
            {[1, 2, 3].map((j) => (
              <div key={j} className='h-6 shimmer rounded w-full' />
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
)

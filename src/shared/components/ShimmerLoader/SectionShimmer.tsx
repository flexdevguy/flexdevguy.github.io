/**
 * Section-level Shimmer Loader
 * Optimized for section loading states
 */
export const SectionShimmer = (): JSX.Element => (
  <div className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
    <div className='max-w-4xl mx-auto'>
      <div className='h-10 shimmer rounded-lg mb-6 w-1/3' />
      <div className='h-6 shimmer rounded-lg mb-8 w-2/3' />
      <div className='space-y-4'>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className='h-6 shimmer rounded w-full' />
        ))}
      </div>
    </div>
  </div>
)

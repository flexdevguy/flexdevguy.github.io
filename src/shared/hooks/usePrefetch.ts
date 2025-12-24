import { useQueryClient } from '@tanstack/react-query'

/**
 * Custom hook for prefetching data
 * Optimizes data loading for better UX
 */
export const usePrefetch = () => {
  const queryClient = useQueryClient()

  const prefetchQuery = async <T,>(
    queryKey: string[],
    queryFn: () => Promise<T>
  ): Promise<void> => {
    await queryClient.prefetchQuery({
      queryKey,
      queryFn,
      staleTime: 1000 * 60 * 5 // 5 minutes
    })
  }

  return { prefetchQuery }
}

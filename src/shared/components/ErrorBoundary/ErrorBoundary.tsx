import { Component, type ReactNode } from 'react'
import { Button } from '../Button'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * Error Boundary Component
 * Catches React errors and displays fallback UI
 * Follows Error Boundary pattern from React
 */
export class ErrorBoundary extends Component<
ErrorBoundaryProps,
ErrorBoundaryState
> {
  constructor (props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError (error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch (error: Error, errorInfo: React.ErrorInfo): void {
    // Log error to error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null })
  }

  render (): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
          <div className='max-w-md w-full text-center'>
            <h1 className='text-4xl font-bold text-gray-900 mb-4'>
              Something went wrong
            </h1>
            <p className='text-lg text-gray-600 mb-6'>
              We're sorry, but something unexpected happened. Please try again.
            </p>
            {(this.state.error != null) && (
              <details className='mb-6 text-left'>
                <summary className='cursor-pointer text-sm text-gray-500 mb-2'>
                  Error details
                </summary>
                <pre className='text-xs bg-gray-100 p-4 rounded overflow-auto'>
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <div className='flex gap-4 justify-center'>
              <Button
                href='/'
                label='Go to Home'
                variant='primary'
                external={false}
              />
              <button
                onClick={this.handleReset}
                className='px-6 py-3 bg-white text-gray-900 border-2 border-gray-900 rounded-lg hover:bg-gray-50 transition-colors'
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

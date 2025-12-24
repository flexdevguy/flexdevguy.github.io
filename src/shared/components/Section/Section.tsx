
import type { SectionProps } from '../../types'

interface SectionComponentProps extends SectionProps {
  background?: 'white' | 'gray' | 'slate'
  padding?: 'normal' | 'large'
}

/**
 * Reusable Section component following Single Responsibility Principle
 * Encapsulates common section styling and structure
 */
export const Section = ({
  children,
  className = '',
  background = 'white',
  padding = 'normal'
}: SectionComponentProps): JSX.Element => {
  // Alternating background tones: white (default) → gray → slate
  const backgroundClass = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    slate: 'bg-slate-50'
  }[background]

  const paddingClass = padding === 'large' ? 'py-24' : 'py-20'

  return (
    <section className={`${paddingClass} px-4 sm:px-6 lg:px-8 ${backgroundClass} ${className}`}>
      <div className='max-w-4xl mx-auto'>{children}</div>
    </section>
  )
}

import type { ButtonProps } from '../../types'
import { trackGAEvent } from '../../hooks/useGoogleAnalytics'

/**
 * Reusable Button component following Single Responsibility Principle
 * Handles external links with proper security attributes
 * Tracks CTA clicks to Google Analytics
 *
 * Features:
 * - Smooth hover lift with box-shadow elevation
 * - Primary, secondary & topmate variants
 * - Respects prefers-reduced-motion
 * - GA event tracking for CTA interactions
 */
export const Button = ({
  href,
  label,
  variant = 'primary',
  className = '',
  external = true
}: ButtonProps): JSX.Element => {
  const baseClasses =
    'inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg btn-hover'
  const variantClasses =
    variant === 'primary'
      ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
      : variant === 'topmate'
        ? 'bg-[rgb(213,83,77)] text-white hover:bg-[rgb(193,63,57)] shadow-lg hover:shadow-xl'
        : 'bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-50 shadow-md hover:shadow-lg'

  const linkProps = external
    ? {
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    : {}

  const handleClick = (): void => {
    // Track CTA button clicks to Google Analytics
    trackGAEvent('engagement', 'cta_button_click', label, 1)
  }

  return (
    <a
      href={href}
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={handleClick}
      {...linkProps}
    >
      {label}
    </a>
  )
}

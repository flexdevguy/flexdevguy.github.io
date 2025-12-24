import { SOCIAL_LINKS } from '@/domains/about/data/socialLinksData'
import { Button } from '@/shared/components/Button'
import { CALENDLY_URL } from '@/shared/constants/calendly'

/**
 * Footer Component
 * Follows Single Responsibility Principle - only handles footer presentation
 */
export const Footer = (): JSX.Element => {
  const currentYear = new Date().getFullYear()

  const getSocialIcon = (platform: string): string => {
    switch (platform) {
      case 'linkedin':
        return '🔗'
      case 'github':
        return '💻'
      case 'twitter':
        return '𝕏'
      case 'topmate':
        return '☕'
      default:
        return '🔗'
    }
  }

  return (
    <footer className='py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-gray-400'>
      <div className='max-w-4xl mx-auto'>
        {/* Clarity Call Button */}
        <div className='mb-8 flex justify-center'>
          <Button 
            href={CALENDLY_URL} 
            label='👉 Book a Free Clarity Call' 
            variant='primary'
          />
        </div>

        {/* Social Links */}
        <div className='mb-8'>
          <div className='flex justify-center gap-8 mb-8'>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target='_blank'
                rel='noopener noreferrer'
                className='flex flex-col items-center gap-2 hover:text-white transition-colors duration-200'
                aria-label={link.text}
              >
                <span className='text-2xl'>{getSocialIcon(link.platform)}</span>
                <span className='text-sm'>{link.text}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className='text-center border-t border-gray-800 pt-8'>
          <p className='text-sm'>
            © {currentYear} grwm.dev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

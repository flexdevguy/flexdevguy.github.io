import { SOCIAL_LINKS, SOCIAL_CONFIG } from '../data/socialLinksData'
import { AnimatedText } from '@shared/components/AnimatedText'
import { AnimatedList } from '@shared/components/AnimatedList'

/**
 * Social Links Component
 * Displays social proof with links to Gowtham's online presence
 */
export const SocialLinks = (): JSX.Element => {
  const getSocialIcon = (platform: string): string => {
    switch (platform) {
      case 'linkedin':
        return '🔗'
      case 'github':
        return '💻'
      case 'twitter':
        return '𝕏'
      default:
        return '🔗'
    }
  }

  const renderSocialLink = (link: (typeof SOCIAL_LINKS)[number]) => (
    <a
      href={link.url}
      target='_blank'
      rel='noopener noreferrer'
      className='flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors duration-200'
    >
      <span className='text-2xl'>{getSocialIcon(link.platform)}</span>
      <span className='text-lg font-medium'>{link.text}</span>
    </a>
  )

  return (
    <div className='mt-12 pt-8 border-t border-gray-300'>
      <AnimatedText
        as='h3'
        className='text-2xl sm:text-3xl font-bold text-gray-900 mb-6'
        delay={0.8}
      >
        {SOCIAL_CONFIG.heading}
      </AnimatedText>

      <AnimatedList
        items={SOCIAL_LINKS}
        renderItem={renderSocialLink}
        staggerDelay={0.1}
      />
    </div>
  )
}

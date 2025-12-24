import type { ListItem } from '@shared/types'

/**
 * Social links data
 * Provides social proof and direct connection to Gowtham's online presence
 */

export interface SocialLink extends ListItem {
  url: string
  platform: 'linkedin' | 'github' | 'twitter' | 'topmate'
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'social-linkedin',
    text: 'LinkedIn',
    url: 'https://www.linkedin.com/in/togowtham',
    platform: 'linkedin'
  },
  {
    id: 'social-github',
    text: 'GitHub',
    url: 'https://github.com/flexdevguy',
    platform: 'github'
  },
  {
    id: 'social-twitter',
    text: 'X (Twitter)',
    url: 'https://x.com/togowtham',
    platform: 'twitter'
  },
  {
    id: 'social-topmate',
    text: 'Topmate',
    url: 'https://topmate.io/togowtham/',
    platform: 'topmate'
  }
] as const

export const SOCIAL_CONFIG = {
  heading: 'Find me online'
} as const

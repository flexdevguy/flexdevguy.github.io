import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import { SocialLinks } from './SocialLinks'
import { SOCIAL_LINKS, SOCIAL_CONFIG } from '../data/socialLinksData'

describe('SocialLinks', () => {
  it('should render heading', () => {
    render(<SocialLinks />)
    expect(screen.getByText(SOCIAL_CONFIG.heading)).toBeInTheDocument()
  })

  it('should render all social links', () => {
    render(<SocialLinks />)
    SOCIAL_LINKS.forEach((link) => {
      expect(screen.getByText(link.text)).toBeInTheDocument()
    })
  })

  it('should have correct URLs', () => {
    render(<SocialLinks />)
    const linkedinLink = screen.getByText('LinkedIn').closest('a')
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/togowtham')

    const githubLink = screen.getByText('GitHub').closest('a')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/flexdevguy')

    const twitterLink = screen.getByText('X (Twitter)').closest('a')
    expect(twitterLink).toHaveAttribute('href', 'https://x.com/togowtham')
  })

  it('should open links in new tab', () => {
    render(<SocialLinks />)
    const links = screen.getAllByRole('link')
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
})

import { AnimatedText } from '@shared/components/AnimatedText'
import { AnimatedList } from '@shared/components/AnimatedList'
import { Section } from '@shared/components/Section'
import { AUDIENCE_CONTENT, AUDIENCE_ITEMS } from '../data/audienceData'

/**
 * Audience Section Component
 * Follows Single Responsibility Principle - only handles audience presentation
 */
export const AudienceSection = (): JSX.Element => {
  const renderListItem = (item: { id: string, text: string }) => (
    <div className='flex items-start gap-3 text-gray-700'>
      <span className='text-gray-900 font-semibold mt-1'>•</span>
      <span className='text-lg'>{item.text}</span>
    </div>
  )

  return (
    <Section background='white'>
      <AnimatedText as='h2' className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
        {AUDIENCE_CONTENT.title}
      </AnimatedText>

      <AnimatedText
        as='p'
        className='text-lg text-gray-700 mb-8'
        delay={0.1}
      >
        {AUDIENCE_CONTENT.intro}
      </AnimatedText>

      <AnimatedList
        items={AUDIENCE_ITEMS}
        renderItem={renderListItem}
        containerClassName='space-y-4'
      />

      <AnimatedText
        as='p'
        className='mt-8 text-lg text-gray-700 font-medium'
        delay={0.6}
      >
        {AUDIENCE_CONTENT.conclusion}
      </AnimatedText>
    </Section>
  )
}

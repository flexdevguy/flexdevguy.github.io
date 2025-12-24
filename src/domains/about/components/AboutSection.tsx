import { AnimatedText } from '@shared/components/AnimatedText'
import { AnimatedList } from '@shared/components/AnimatedList'
import { Section } from '@shared/components/Section'
import { ABOUT_CONTENT, ABOUT_POINTS } from '../data/aboutData'

/**
 * About Section Component
 * Follows Single Responsibility Principle - only handles about presentation
 */
export const AboutSection = (): JSX.Element => {
  const renderListItem = (item: { id: string, text: string }) => (
    <div className='flex items-start gap-3 text-gray-700'>
      <span className='text-gray-900 font-semibold mt-1'>•</span>
      <span className='text-lg'>{item.text}</span>
    </div>
  )

  return (
    <Section background='gray'>
      <AnimatedText as='h2' className='text-3xl sm:text-4xl font-bold text-gray-900 mb-6'>
        {ABOUT_CONTENT.title}
      </AnimatedText>

      <AnimatedText
        as='p'
        className='text-lg text-gray-700 mb-8'
        delay={0.1}
      >
        {ABOUT_CONTENT.introduction}
      </AnimatedText>

      <AnimatedText
        as='p'
        className='text-lg text-gray-700 mb-6'
        delay={0.2}
      >
        {ABOUT_CONTENT.listIntro}
      </AnimatedText>

      <AnimatedList
        items={ABOUT_POINTS}
        renderItem={renderListItem}
        containerClassName='space-y-3 mb-8'
      />

      <AnimatedText
        as='p'
        className='text-lg text-gray-700 mb-4'
        delay={0.6}
      >
        {ABOUT_CONTENT.focusIntro}
      </AnimatedText>

      <AnimatedText
        as='p'
        className='text-xl text-gray-900 font-semibold'
        delay={0.7}
      >
        {ABOUT_CONTENT.focusStatement}
      </AnimatedText>
    </Section>
  )
}

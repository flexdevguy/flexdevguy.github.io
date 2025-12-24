import { HeroSection } from '@domains/hero'
import { AudienceSection } from '@domains/audience'
import { ServicesSection } from '@domains/services'
import { ProcessSection } from '@domains/process'
import { AboutSection } from '@domains/about'
import { CTASection } from '@domains/cta'
import { Footer } from '@domains/layout'

/**
 * Main App Component
 * Follows Composition Pattern - composes domain components
 * Follows Dependency Inversion Principle - depends on abstractions (domain exports)
 */
const App = (): JSX.Element => (
  <div className='min-h-screen relative z-0'>
    {/* Global background is set in index.css and inherited */}
    <HeroSection />
    <AudienceSection />
    <ServicesSection />
    <ProcessSection />
    <AboutSection />
    <CTASection />
    <Footer />
  </div>
)

export default App

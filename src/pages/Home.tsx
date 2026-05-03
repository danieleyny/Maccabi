import { Hero } from '../components/hero/Hero'
import { ChallengeSection } from '../components/sections/ChallengeSection'
import { LifecyclePipeline } from '../components/sections/LifecyclePipeline'
import { WorkflowConsole } from '../components/sections/WorkflowConsole'
import { ModulesBento } from '../components/sections/ModulesBento'
import { WhyNovelution } from '../components/sections/WhyNovelution'
import { ComparisonSplit } from '../components/sections/ComparisonSplit'
import { Testimonials } from '../components/sections/Testimonials'

interface HomeProps {
  navigate: (href: string) => void
}

export function HomePage({ navigate }: HomeProps) {
  return (
    <main id="main">
      <Hero navigate={navigate} />
      <ChallengeSection />
      <LifecyclePipeline />
      <WorkflowConsole />
      <ModulesBento />
      <WhyNovelution />
      <ComparisonSplit />
      <Testimonials />
    </main>
  )
}

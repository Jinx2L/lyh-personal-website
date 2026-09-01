import { Hero } from './Hero/Hero'
import { About } from './About/About'
import { ExperienceTimeline } from './Experience/ExperienceTimeline'
import { SelectedWorks } from './Works/SelectedWorks'
import { Expertise } from './Expertise/Expertise'
import { Contact } from './Contact/Contact'
import { PageShell } from './PageShell'

export default function HomePage() {
  return <PageShell>
    <Hero />
    <About />
    <ExperienceTimeline />
    <SelectedWorks />
    <Expertise />
    <Contact />
  </PageShell>
}

import { About } from './components/About/About'
import { Contact } from './components/Contact/Contact'
import { ExperienceTimeline } from './components/Experience/ExperienceTimeline'
import { Expertise } from './components/Expertise/Expertise'
import { Hero } from './components/Hero/Hero'
import { SelectedWorks } from './components/Works/SelectedWorks'
import { useRef } from 'react'
import { usePortfolioMotion } from './motion/usePortfolioMotion'
import { AcademicCaseStudy } from './components/CaseStudy/AcademicCaseStudy'
import { ChongbaiCaseStudy } from './components/CaseStudy/ChongbaiCaseStudy'
import { MembershipCaseStudy } from './components/CaseStudy/MembershipCaseStudy'
import { AutoCaseStudy } from './components/CaseStudy/AutoCaseStudy'
import { CursorGlow } from './components/common/CursorGlow'

export default function App() {
  const root = useRef<HTMLElement>(null)
  usePortfolioMotion(root)
  const path = window.location.pathname.replace(/\/$/, '')
  const isAcademicCase = path === '/projects/academic'
  const isChongbaiCase = path === '/projects/chongbai'
  const isMembershipCase = path === '/projects/membership'
  const isAutoCase = path === '/projects/auto'
  return (
    <main ref={root}>
      <CursorGlow />
      {isAcademicCase ? <AcademicCaseStudy /> : isChongbaiCase ? <ChongbaiCaseStudy /> : isMembershipCase ? <MembershipCaseStudy /> : isAutoCase ? <AutoCaseStudy /> : <>
      <Hero />
      <About />
      <ExperienceTimeline />
      <SelectedWorks />
      <Expertise />
      <Contact />
      </>}
    </main>
  )
}

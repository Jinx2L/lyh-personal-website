import { lazy, Suspense, type ComponentType } from 'react'
import { CursorGlow } from './components/common/CursorGlow'
import { PageShell } from './components/PageShell'

const HomePage = lazy(() => import('./components/HomePage'))
const routed = (Page: ComponentType) => ({ default: () => <PageShell><Page /></PageShell> })
const AcademicCaseStudy = lazy(() => import('./components/CaseStudy/AcademicCaseStudy').then(module => routed(module.AcademicCaseStudy)))
const ChongbaiCaseStudy = lazy(() => import('./components/CaseStudy/ChongbaiCaseStudy').then(module => routed(module.ChongbaiCaseStudy)))
const MembershipCaseStudy = lazy(() => import('./components/CaseStudy/MembershipCaseStudy').then(module => routed(module.MembershipCaseStudy)))
const AutoCaseStudy = lazy(() => import('./components/CaseStudy/AutoCaseStudy').then(module => routed(module.AutoCaseStudy)))

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '')
  const isAcademicCase = path === '/projects/academic'
  const isChongbaiCase = path === '/projects/chongbai'
  const isMembershipCase = path === '/projects/membership'
  const isAutoCase = path === '/projects/auto'
  return (
    <Suspense fallback={<main className="route-loading" aria-hidden="true"><CursorGlow /></main>}>
        {isAcademicCase ? <AcademicCaseStudy /> : isChongbaiCase ? <ChongbaiCaseStudy /> : isMembershipCase ? <MembershipCaseStudy /> : isAutoCase ? <AutoCaseStudy /> : <HomePage />}
    </Suspense>
  )
}

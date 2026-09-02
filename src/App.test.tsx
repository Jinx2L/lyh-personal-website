import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import appSource from './App.tsx?raw'
import pageShellSource from './components/PageShell.tsx?raw'

const publicAssets = import.meta.glob('../public/assets/*', { eager: true, query: '?url', import: 'default' })
const caseStudyCss = import.meta.glob('./components/CaseStudy/*.css', { eager: true, query: '?raw', import: 'default' })

it('does not ship superseded case-study assets or styles', () => {
  expect(Object.keys(publicAssets)).not.toContain('../public/assets/auto-case-study.jpg')
  expect(Object.keys(publicAssets)).not.toContain('../public/assets/membership-hero-illustration-1.png')
  expect(Object.keys(publicAssets)).not.toContain('../public/assets/membership-hero-illustration-2.png')
  expect(Object.keys(publicAssets)).not.toContain('../public/assets/membership-hero-illustration-3.png')
  expect(Object.keys(publicAssets)).not.toContain('../public/assets/project-cloud.jpg')
  expect(Object.keys(publicAssets)).not.toContain('../public/assets/project-cloud.mp4')
  expect(Object.keys(publicAssets)).not.toContain('../public/assets/project-cloud-poster.jpg')
  expect(Object.keys(publicAssets)).not.toContain('../public/assets/project-membership.mp4')
  expect(Object.keys(publicAssets)).not.toContain('../public/assets/project-membership-poster.jpg')
  expect(Object.keys(publicAssets)).not.toContain('../public/assets/project-auto.mp4')
  expect(Object.keys(publicAssets)).not.toContain('../public/assets/project-auto-poster.jpg')
  expect(Object.keys(caseStudyCss)).not.toContain('./components/CaseStudy/ChongbaiCaseStudy.css')
})

it('loads the home and case-study page trees at route boundaries', () => {
  expect(appSource).toContain("lazy(() => import('./components/HomePage'))")
  expect(appSource.match(/lazy\(\(\) => import\('\.\/components\/CaseStudy\//g)).toHaveLength(4)
  expect(appSource).toContain('<Suspense')
  expect(appSource).not.toContain('usePortfolioMotion')
  expect(pageShellSource).toContain('usePortfolioMotion(root)')
})

describe('portfolio shell', () => {
  it('renders one global cursor glow on the portfolio and case-study routes', () => {
    const home = render(<App />)
    expect(home.container.querySelectorAll('.global-cursor-glow')).toHaveLength(1)
    expect(home.container.querySelector('.global-cursor-glow')).toHaveAttribute('aria-hidden', 'true')
    home.unmount()

    window.history.replaceState({}, '', '/projects/academic')
    const detail = render(<App />)
    expect(detail.container.querySelectorAll('.global-cursor-glow')).toHaveLength(1)
    detail.unmount()
    window.history.replaceState({}, '', '/')
  })

  it('shows the confirmed experience label and selected projects', async () => {
    const { container } = render(<App />)
    await waitFor(() => expect(container.querySelector('.route-loading')).not.toBeInTheDocument())
    expect(screen.getByText('PORTFOLIO')).toBeInTheDocument()
    expect(screen.getByText('9+')).toBeInTheDocument()
    expect(screen.getByText('Experience')).toBeInTheDocument()
    expect(screen.getByText('年经验')).toBeInTheDocument()
    expect(screen.getByText('Fidelity')).toBeInTheDocument()
    expect(screen.getByText('设计还原度')).toBeInTheDocument()
    expect(screen.getByText('PRODUCT')).toBeInTheDocument()
    expect(screen.getByText('产品构建')).toBeInTheDocument()
    expect(screen.getByText('CROSS-PLATFORM')).toBeInTheDocument()
    expect(screen.getByText('跨端设计')).toBeInTheDocument()
    ;['学科知识服务平台', '重百云购小程序', '重百会员管理中心', '企微汽贸小程序'].forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument()
    })
  })
})

import { render, screen } from '@testing-library/react'
import App from '../../App'
import { SelectedWorks } from '../Works/SelectedWorks'

afterEach(() => window.history.replaceState({}, '', '/'))

function expectUnifiedHeroTitle(title: string) {
  const heading = screen.getByRole('heading', { level: 1, name: title })
  expect(heading).toHaveAttribute('style', expect.stringContaining('font-size: clamp(64px, 7.5vw, 136px)'))
  expect(heading).toHaveAttribute('style', expect.stringContaining('line-height: 0.9'))
  expect(heading).toHaveAttribute('style', expect.stringContaining('letter-spacing: -0.05em'))
  expect(heading.querySelectorAll('.case-hero-title-mask')).toHaveLength(2)
  expect(heading.querySelectorAll('.case-hero-title-line')).toHaveLength(2)
  const hero = heading.closest('[data-case-section="hero"]')
  expect(hero).toHaveClass('case-hero--aurora', 'case-hero--full-bleed-aurora')
  expect(hero!.querySelector('.experience-aurora')).toHaveAttribute('aria-hidden', 'true')
  expect(hero!.querySelectorAll('.experience-aurora-band')).toHaveLength(3)
}

function expectModuleTitles(container: HTMLElement, count: number) {
  const titles = container.querySelectorAll(
    '[data-case-section="overview"] h2, [data-case-section="project-board"] h2, [data-case-section="value"] h2',
  )
  expect(titles).toHaveLength(count)
  titles.forEach(title => expect(title).toHaveClass('case-module-title'))
}

function expectUnifiedOverviewTitle(firstLine: string, secondLine: string) {
  const heading = document.querySelector('[data-case-section="overview"] h2')
  expect(heading).toHaveClass('case-overview-title')
  expect(Array.from(heading!.querySelectorAll('.case-overview-line')).map(line => line.textContent)).toEqual([
    firstLine,
    secondLine,
  ])
}

it('links all four projects to their independent detail pages', () => {
  render(<SelectedWorks />)
  expect(screen.getByRole('link', { name: '查看学科知识服务平台详情' })).toHaveAttribute('href', '/projects/academic')
  expect(screen.getByRole('link', { name: '查看重百云购小程序详情' })).toHaveAttribute('href', '/projects/chongbai')
  expect(screen.getByRole('link', { name: '查看重百会员管理中心详情' })).toHaveAttribute('href', '/projects/membership')
  expect(screen.getByRole('link', { name: '查看企微汽贸小程序详情' })).toHaveAttribute('href', '/projects/auto')
})

it('renders the condensed academic case study with the supplied project board', () => {
  window.history.replaceState({}, '', '/projects/academic')
  const { container } = render(<App />)
  expect(screen.getByRole('heading', { level: 1, name: '学科知识服务平台' })).toBeInTheDocument()
  expect(screen.getByText('2026.03-2026.06')).toBeInTheDocument()
  expectUnifiedHeroTitle('学科知识服务平台')
  expect(screen.getByText(/AI赋能科研类B端知识服务平台/)).toBeInTheDocument()
  expect(screen.queryByText(/极简专业、信息优先、AI轻量化、数据可视化/)).not.toBeInTheDocument()
  expect(screen.getByRole('img', { name: '学科知识服务平台完整项目设计展示' })).toHaveAttribute('src', '/assets/academic-case-study.jpg')
  expect(container.querySelectorAll('[data-case-section]')).toHaveLength(5)
  expectModuleTitles(container, 3)
  expectUnifiedOverviewTitle('智能检索重构，', '知识服务一站化。')
  expect(screen.queryByText('02 / DESIGN STRATEGY')).not.toBeInTheDocument()
  expect(screen.getByRole('link', { name: '查看学科知识服务平台项目原图' })).toHaveClass('site-container')
  expect(container.querySelectorAll('.case-placeholder')).toHaveLength(0)
  expect(container.querySelector('video')).not.toBeInTheDocument()
  expect(screen.getByRole('link', { name: '返回项目列表' })).toHaveAttribute('href', '/#works')
})

it('renders the Chongbai case study with the supplied full-length project board', () => {
  window.history.replaceState({}, '', '/projects/chongbai')
  const { container } = render(<App />)
  expect(screen.getByRole('heading', { level: 1, name: '重百云购小程序' })).toBeInTheDocument()
  expect(screen.getByText('2020.07-2025.07')).toBeInTheDocument()
  expect(screen.getByText(/CASE STUDY 02/)).toBeInTheDocument()
  expectUnifiedHeroTitle('重百云购小程序')
  expect(screen.getByText('35%')).toBeInTheDocument()
  expect(screen.getByText('用户活跃度提升')).toBeInTheDocument()
  expect(screen.getByText('从首页内容编排到商品转化与会员触达，构建可配置、可持续迭代的商城体验。')).toBeInTheDocument()
  expect(screen.queryByText(/图片保持原始比例与清晰度/)).not.toBeInTheDocument()
  expectUnifiedOverviewTitle('商城内容更灵活，', '运营转化更高效。')
  expect(screen.getByRole('img', { name: '重百云购小程序完整项目设计展示' })).toHaveAttribute('src', '/assets/chongbai-case-study.jpg')
  expect(screen.getByRole('link', { name: '查看重百云购小程序项目原图' })).toHaveClass('site-container')
  expect(container.querySelectorAll('[data-case-section]')).toHaveLength(4)
  expectModuleTitles(container, 2)
  expect(screen.getByRole('link', { name: '返回项目列表' })).toHaveAttribute('href', '/#works')
})

it.each([
  ['/projects/membership', '重百会员管理中心', '会员管理中心完整项目设计展示', '/assets/membership-case-study.jpg', '会员增长', '聚合会员数据，', '辅助运营决策。', '2023.11-2024.01'],
  ['/projects/auto', '企微汽贸小程序', '企微汽贸小程序完整项目设计展示', '/assets/auto-case-study.jpg', '客户管理', '围绕销售流程，', '降低操作成本。', '2022.01-2022.05'],
])('renders %s in the shared case-study framework', (path, title, alt, src, focus, overviewFirstLine, overviewSecondLine, period) => {
  window.history.replaceState({}, '', path)
  const { container } = render(<App />)
  expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument()
  expectUnifiedHeroTitle(title)
  expect(screen.getByText(period)).toBeInTheDocument()
  expect(screen.getByText(focus)).toBeInTheDocument()
  expect(screen.getByRole('img', { name: alt })).toHaveAttribute('src', src)
  expect(container.querySelectorAll('[data-case-section]')).toHaveLength(5)
  expectModuleTitles(container, 3)
  expectUnifiedOverviewTitle(overviewFirstLine, overviewSecondLine)
  expect(screen.queryByText('02 / DESIGN STRATEGY')).not.toBeInTheDocument()
  expect(screen.getByRole('link', { name: new RegExp(`查看${title}项目原图`) })).toHaveClass('site-container')
  expect(screen.getByRole('link', { name: '返回项目列表' })).toHaveAttribute('href', '/#works')
})

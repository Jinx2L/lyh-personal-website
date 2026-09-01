import { render, screen, waitFor } from '@testing-library/react'
import App from '../../App'
import { SelectedWorks } from '../Works/SelectedWorks'

afterEach(() => window.history.replaceState({}, '', '/'))

async function renderAppAt(path: string) {
  window.history.replaceState({}, '', path)
  const result = render(<App />)
  await waitFor(() => expect(result.container.querySelector('.route-loading')).not.toBeInTheDocument())
  return result
}

function expectUnifiedHeroTitle(title: string, lineHeight = '0.9') {
  const heading = screen.getByRole('heading', { level: 1, name: title })
  expect(heading).toHaveAttribute('style', expect.stringContaining('font-size: clamp(64px, 7.5vw, 136px)'))
  expect(heading).toHaveAttribute('style', expect.stringContaining(`line-height: ${lineHeight}`))
  expect(heading).toHaveAttribute('style', expect.stringContaining('letter-spacing: -0.05em'))
  expect(heading.querySelectorAll('.case-hero-title-mask')).toHaveLength(2)
  expect(heading.querySelectorAll('.case-hero-title-line')).toHaveLength(2)
  const hero = heading.closest('[data-case-section="hero"]')
  expect(hero).not.toHaveClass('case-hero--aurora', 'case-hero--full-bleed-aurora')
  expect(hero!.querySelector('.experience-aurora')).not.toBeInTheDocument()
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

it('renders the condensed academic case study with the supplied project board', async () => {
  const { container } = await renderAppAt('/projects/academic')
  const heading = screen.getByRole('heading', { level: 1, name: '让复杂学科知识，易被检索、理解与连接。' })
  const hero = heading.closest('[data-case-section="hero"]')!
  expect(hero).toHaveClass('academic-story-hero', 'academic-story-hero--site-background')
  expect(hero.querySelector('.academic-hero-meta')).toHaveClass('academic-hero-meta--spaced')
  expect(heading).toHaveStyle({ lineHeight: '1' })
  expect(heading.querySelectorAll('.case-hero-title-line')).toHaveLength(3)
  expect(Array.from(heading.querySelectorAll('.case-hero-title-line')).map(line => line.textContent)).toEqual([
    '让复杂学科知识，',
    '易被检索、',
    '理解与连接。',
  ])
  expect(heading.querySelector('.academic-hero-accent')).toHaveTextContent('理解与连接。')
  expect(screen.getByText('CASE STUDY 01 · AI KNOWLEDGE PLATFORM · 2026')).toBeInTheDocument()
  expect(screen.getByText('AI 不替代判断，而是缩短寻找答案的路径。')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: '查看项目全貌' })).toHaveAttribute('href', '#full-project-board')
  expect(screen.getByRole('link', { name: '了解设计思路' })).toHaveAttribute('href', '#case-overview')
  const heroIllustrations = screen.getAllByRole('img', { name: /学科知识首屏插图/ })
  expect(heroIllustrations).toHaveLength(3)
  expect(heroIllustrations.map(image => image.getAttribute('src'))).toEqual([
    '/assets/academic-hero-illustration-1.jpg',
    '/assets/academic-hero-illustration-2.jpg',
    '/assets/academic-hero-illustration-3.jpg',
  ])
  expect(hero.querySelector('.academic-hero-illustrations')).toHaveClass('academic-hero-illustrations--shifted')
  expect(hero.querySelectorAll('.academic-reference-float')).toHaveLength(3)
  hero.querySelectorAll('.academic-placeholder-card').forEach(card => expect(card).toHaveClass('academic-placeholder-card--plain'))
  expect(hero.querySelector('.academic-placeholder-bar')).not.toBeInTheDocument()
  expect(screen.getByText('2026.03-2026.06')).toBeInTheDocument()
  expect(screen.getByText(/AI赋能科研类B端知识服务平台/)).toBeInTheDocument()
  expect(screen.queryByText(/极简专业、信息优先、AI轻量化、数据可视化/)).not.toBeInTheDocument()
  expect(screen.getByRole('img', { name: '学科知识服务平台完整项目设计展示' })).toHaveAttribute('src', '/assets/academic-case-study.jpg')
  expect(container.querySelectorAll('[data-case-section]')).toHaveLength(5)
  expectModuleTitles(container, 3)
  expectUnifiedOverviewTitle('智能检索重构，', '知识服务一站化。')
  expect(screen.queryByText('02 / DESIGN STRATEGY')).not.toBeInTheDocument()
  expect(screen.getByRole('link', { name: '查看学科知识服务平台项目原图' })).toHaveClass('site-container')
  expect(container.querySelectorAll('.case-placeholder')).toHaveLength(0)
  const focusMarquee = container.querySelector('.academic-focus-marquee')!
  expect(focusMarquee).toBeInTheDocument()
  expect(focusMarquee).toHaveClass('academic-focus-marquee--fast', 'academic-focus-marquee--tall')
  expect(focusMarquee.querySelectorAll('.academic-focus-track')).toHaveLength(1)
  expect(focusMarquee.querySelectorAll('.academic-focus-group')).toHaveLength(2)
  expect(focusMarquee.querySelectorAll('.academic-focus-item')).toHaveLength(8)
  expect(focusMarquee.querySelectorAll('.academic-focus-separator')).toHaveLength(8)
  expect(focusMarquee.querySelector('article')).not.toBeInTheDocument()
  expect(focusMarquee).toHaveTextContent('多维智能检索 * 学科趋势可视化 * 学者与机构信息 * 专业术语解析 *')
  expect(container.querySelector('.board-case-focus')).not.toBeInTheDocument()
  expect(container.querySelector('video')).not.toBeInTheDocument()
  expect(screen.getByRole('link', { name: '返回项目列表' })).toHaveAttribute('href', '/#works')
})

it('renders the Chongbai case study with the supplied full-length project board', async () => {
  const { container } = await renderAppAt('/projects/chongbai')
  expect(screen.getByRole('heading', { level: 1, name: '重百云购小程序' })).toBeInTheDocument()
  expect(screen.getByText('2020.07-2025.07')).toBeInTheDocument()
  expect(screen.getAllByText(/CASE STUDY 02/).length).toBeGreaterThanOrEqual(1)
  expectUnifiedHeroTitle('重百云购小程序', '1')
  expect(screen.getAllByRole('img', { name: /重百云购首屏插图/ })).toHaveLength(2)
  expect(screen.getAllByRole('img', { name: /重百云购首屏插图/ }).map(image => image.getAttribute('src'))).toEqual([
    '/assets/chongbai-hero-illustration-1.jpg',
    '/assets/chongbai-hero-illustration-2.jpg',
  ])
  expect(screen.getByText('从首页内容编排到商品转化与会员触达，构建可配置、可持续迭代的商城体验。')).toBeInTheDocument()
  expect(screen.queryByText(/图片保持原始比例与清晰度/)).not.toBeInTheDocument()
  expectUnifiedOverviewTitle('商城内容更灵活，', '运营转化更高效。')
  expect(screen.getByRole('img', { name: '重百云购小程序完整项目设计展示' })).toHaveAttribute('src', '/assets/chongbai-case-study.jpg')
  expect(screen.getByRole('link', { name: '查看重百云购小程序项目原图' })).toHaveClass('site-container')
  expect(container.querySelectorAll('[data-case-section]')).toHaveLength(5)
  expectModuleTitles(container, 3)
  expect(screen.getByRole('link', { name: '返回项目列表' })).toHaveAttribute('href', '/#works')
})

it('uses the supplied hero illustration counts and latest auto project board', async () => {
  const membership = await renderAppAt('/projects/membership')
  const membershipImages = screen.getAllByRole('img', { name: /会员管理首屏插图/ })
  expect(membershipImages).toHaveLength(3)
  expect(membershipImages.map(image => image.getAttribute('src'))).toEqual([
    '/assets/membership-hero-illustration-1.webp',
    '/assets/membership-hero-illustration-2.webp',
    '/assets/membership-hero-illustration-3.webp',
  ])
  membership.unmount()

  await renderAppAt('/projects/auto')
  expect(screen.getAllByRole('img', { name: /企微汽贸首屏插图/ })).toHaveLength(2)
  expect(screen.getByRole('img', { name: '企微汽贸小程序完整项目设计展示' })).toHaveAttribute('src', '/assets/auto-case-study-ui-07.jpg')
})

it('uses the approved three-line membership story title', async () => {
  await renderAppAt('/projects/membership')
  const heading = screen.getByRole('heading', { level: 1, name: '小程序改版，CMS模块，驱动门店线上化。' })
  expect(heading).toHaveStyle({ lineHeight: '1' })
  expect(Array.from(heading.querySelectorAll('.case-hero-title-line')).map(line => line.textContent)).toEqual([
    '小程序改版，',
    'CMS模块，',
    '驱动门店线上化。',
  ])
})

it.each(['/projects/chongbai', '/projects/auto'])('compacts the hero meta spacing only on %s', async path => {
  const { container } = await renderAppAt(path)
  expect(container.querySelector('.academic-hero-meta')).toHaveClass('academic-hero-meta--tight')
  expect(screen.getByRole('heading', { level: 1 })).toHaveStyle({ lineHeight: '1' })
})

it.each([
  ['/projects/chongbai', ['CMS组件化', '分佣全链路', '90%+设计还原度', '35%用户活跃提升']],
  ['/projects/membership', ['会员增长', '消费转化', '积分权益', '多业态数据分析']],
  ['/projects/auto', ['客户管理', '营销任务', '素材中心', '客户线索跟进']],
])('uses four project-specific marquee points on %s at the shared speed', async (path, points) => {
  const { container } = await renderAppAt(path)
  const marquee = container.querySelector('.academic-focus-marquee')!
  expect(marquee).toHaveClass('academic-focus-marquee--fast', 'academic-focus-marquee--tall')
  expect(marquee.querySelectorAll('.academic-focus-item')).toHaveLength(8)
  points.forEach(point => expect(marquee).toHaveTextContent(point))
})

it.each([
  ['/projects/auto', '企微汽贸小程序', '企微汽贸小程序完整项目设计展示', '/assets/auto-case-study-ui-07.jpg', '客户管理', '围绕销售流程，', '降低操作成本。', '2022.01-2022.05'],
])('renders %s in the shared case-study framework', async (path, title, alt, src, focus, overviewFirstLine, overviewSecondLine, period) => {
  const { container } = await renderAppAt(path)
  expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument()
  expectUnifiedHeroTitle(title, path === '/projects/auto' ? '1' : '0.9')
  expect(screen.getByText(period)).toBeInTheDocument()
  expect(screen.getAllByText(focus).length).toBeGreaterThanOrEqual(1)
  expect(screen.getByRole('img', { name: alt })).toHaveAttribute('src', src)
  expect(container.querySelectorAll('[data-case-section]')).toHaveLength(5)
  expectModuleTitles(container, 3)
  expectUnifiedOverviewTitle(overviewFirstLine, overviewSecondLine)
  expect(screen.queryByText('02 / DESIGN STRATEGY')).not.toBeInTheDocument()
  expect(screen.getByRole('link', { name: new RegExp(`查看${title}项目原图`) })).toHaveClass('site-container')
  expect(screen.getByRole('link', { name: '返回项目列表' })).toHaveAttribute('href', '/#works')
})

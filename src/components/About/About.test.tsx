import { render, screen } from '@testing-library/react'
import { About } from './About'

describe('About', () => {
  it('uses the supplied portrait and confirmed metrics', () => {
    render(<About />)
    const portrait = screen.getByRole('img', { name: '李意慧个人形象' })
    expect(portrait).toHaveAttribute('src', '/assets/aboutme.jpg')
    expect(portrait).toHaveAttribute('loading', 'lazy')
    expect(portrait).toHaveAttribute('decoding', 'async')
    expect(portrait).toHaveClass('about-portrait-rounded')
    expect(screen.getByText('拥有9+年 UI 设计经验，深耕 B 端系统与 App、H5、小程序等移动端产品设计，兼具 0‑1 搭建与大型项目迭代能力。擅长梳理业务信息流，从业务、用户、技术视角出发，搭建清晰可扩展的交互界面与设计规范，善用 Vibe coding辅助设计提升落地交付效率。')).toBeInTheDocument()
    expect(screen.getByText('9+')).toBeInTheDocument()
    expect(screen.getByText('0→1')).toBeInTheDocument()
    expect(screen.getByText('90%+')).toBeInTheDocument()
    expect(screen.getByText('B+C')).toBeInTheDocument()
    expect(screen.getByText('产品构建')).toBeInTheDocument()
    expect(screen.getByText('跨端设计')).toBeInTheDocument()
  })
})


it('hides the card overlay while retaining the cursor caption', () => {
  const { container } = render(<About />)
  expect(container.querySelector('.tilted-card-overlay')).not.toBeInTheDocument()
  expect(container.querySelector('figcaption')).toHaveTextContent('2L.Designer - liyihui')
  expect(container.querySelector('.tilted-card-mobile-alert')).not.toBeInTheDocument()
})

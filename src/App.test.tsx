import { render, screen } from '@testing-library/react'
import App from './App'

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

  it('shows the confirmed experience label and selected projects', () => {
    render(<App />)
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

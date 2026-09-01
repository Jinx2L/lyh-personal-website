import { render, screen } from '@testing-library/react'
import { Contact } from './Contact'
import scrollVelocitySource from './ScrollVelocity.tsx?raw'

it('uses the window resize listener only as a ResizeObserver fallback', () => {
  expect(scrollVelocitySource).toContain("if (typeof ResizeObserver !== 'undefined')")
  expect(scrollVelocitySource).toContain("window.addEventListener('resize', update)")
  expect(scrollVelocitySource).toContain("return () => window.removeEventListener('resize', update)")
})

it('shows the two-line invitation next to the reused About portrait', () => {
  const { container } = render(<Contact />)
  const invitation = container.querySelector('.contact-invitation')!
  expect(invitation).not.toBeNull()
  expect(invitation.querySelector('p')).toHaveTextContent('期待一起探讨设计')
  expect(invitation.querySelector('br')).not.toBeNull()
  expect(screen.getByRole('img', { name: '李意慧个人形象' })).toHaveAttribute('src', '/assets/aboutme.jpg')
})

describe('Contact', () => {
  it('renders the confirmed contact statement and details', () => {
    render(<Contact />)
    expect(screen.getByText('重视业务价值、用户体验与细节落地，若觉得我的能力与岗位匹配，欢迎随时联系我')).toBeInTheDocument()
    expect(screen.getByText('845991323@qq.com')).toBeInTheDocument()
    expect(screen.getByText('17711059534')).toBeInTheDocument()
    expect(screen.getByLabelText('返回顶部')).toHaveAttribute('href', '#top')
  })
})

it('keeps the two title lines in separate looping tracks', () => {
  const { container } = render(<Contact />)
  expect(screen.getByRole('heading', { level: 2, name: "LET'S CREATE SOMETHING CLEAR." })).toBeInTheDocument()
  const rows = container.querySelectorAll('.contact-velocity-row')
  expect(rows).toHaveLength(2)
  expect([...rows].map(row => row.querySelector('.contact-velocity-copy')?.textContent?.trim())).toEqual(["LET'S CREATE", 'SOMETHING CLEAR.'])
  expect(container.querySelectorAll('.contact-velocity-copy')).toHaveLength(12)
})

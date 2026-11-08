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
  expect(container.querySelector('figcaption')).toHaveTextContent('Designer-Liyihui')
  expect(container.querySelector('.tilted-card-mobile-alert')).not.toBeInTheDocument()
})

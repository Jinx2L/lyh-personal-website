import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'

it('loops the compressed uploaded video beneath the existing ambient layers', () => {
  const { container } = render(<Hero />)
  const ambient = container.querySelector('.ambient')!
  const video = ambient.querySelector('video')!
  expect(video).not.toBeNull()
  expect(video).toHaveAttribute('src', '/assets/hero-background.mp4')
  expect(video).toHaveAttribute('poster', '/assets/hero-background-poster.jpg')
  expect(video).toHaveAttribute('autoplay')
  expect(video).toHaveProperty('muted', true)
  expect(video).toHaveAttribute('loop')
  expect(video).toHaveAttribute('playsinline')
  expect(ambient.querySelector('img')).toBeNull()
  expect(ambient.firstElementChild).toBe(video)
  expect(ambient.querySelectorAll('.orb')).toHaveLength(3)
  expect(ambient.querySelector('.ambient-grid')).not.toBeNull()
  expect(ambient.querySelector('.noise')).not.toBeNull()
})

describe('Hero', () => {
  it('renders positioning copy and all navigation targets', () => {
    render(<Hero />)
    expect(screen.getByText('Visual Designer / UI Designer')).toBeInTheDocument()
    expect(screen.getByText(/把复杂业务转化为清晰/)).toBeInTheDocument()
    ;['关于我','工作经历','项目展示','个人优势','联系我'].forEach((label) => expect(screen.getByText(label)).toBeInTheDocument())
  })
})

import { render, screen } from '@testing-library/react'
// @ts-expect-error Vitest runs this test in Node; the app intentionally omits Node types.
import { readFileSync } from 'node:fs'
import { Hero } from './Hero'

declare const process: { cwd: () => string }

const heroBackgroundCss = readFileSync(`${process.cwd()}/src/components/Hero/HeroBackground.css`, 'utf8')
const siteCss = readFileSync(`${process.cwd()}/src/index.css`, 'utf8')

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

it('uses a restrained warm grade for the cool-toned hero video', () => {
  expect(heroBackgroundCss).toContain('brightness(0.94) contrast(1.04) saturate(0.82) sepia(0.08) hue-rotate(-5deg)')
  expect(siteCss).not.toContain('.ambient::after')
  expect(siteCss).toContain('.orb { position: absolute; border-radius: 999px; filter: blur(70px); opacity: .62; }')
  expect(siteCss).toContain('.ambient-horizon { position: absolute; inset: 45% -10% -30%; background: radial-gradient(ellipse at center, rgba(231,228,214,.1), transparent 55%); transform: rotate(-6deg); opacity: .7; }')
})

describe('Hero', () => {
  it('renders positioning copy and all navigation targets', () => {
    render(<Hero />)
    expect(screen.getByText('Visual Designer / UI Designer')).toBeInTheDocument()
    expect(screen.getByText(/把复杂业务转化为清晰/)).toBeInTheDocument()
    ;['关于我','工作经历','项目展示','个人优势','联系我'].forEach((label) => expect(screen.getByText(label)).toBeInTheDocument())
  })
})

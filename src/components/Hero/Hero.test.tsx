import { render, screen } from '@testing-library/react'
// @ts-expect-error Vitest runs this test in Node; the app intentionally omits Node types.
import { readFileSync } from 'node:fs'
import { Hero } from './Hero'

declare const process: { cwd: () => string }

const heroBackgroundCss: string = readFileSync(`${process.cwd()}/src/components/Hero/HeroBackground.css`, 'utf8')
const siteCss = readFileSync(`${process.cwd()}/src/index.css`, 'utf8')

it('loops the video beneath the remaining ambient layers', () => {
  const { container } = render(<Hero />)
  const ambient = container.querySelector('.ambient')!
  const video = ambient.querySelector('video')!
  expect(video).not.toBeNull()
  expect(video).toHaveAttribute('src', '/assets/hero-background-1109-v2.mp4')
  expect(video).toHaveAttribute('poster', '/assets/hero-background-1109-v2-poster.jpg')
  expect(video).toHaveAttribute('autoplay')
  expect(video).toHaveProperty('muted', true)
  expect(video).toHaveAttribute('loop')
  expect(video).toHaveAttribute('playsinline')
  expect(ambient.querySelector('img')).toBeNull()
  expect(ambient.firstElementChild).toBe(video)
  expect(ambient.querySelector('.orb')).toBeNull()
  expect(ambient.querySelector('.ambient-grid')).not.toBeNull()
  expect(ambient.querySelector('.noise')).not.toBeNull()
})

it('adjusts only video brightness and contrast without a darkening overlay', () => {
  const videoFilters = Array.from(heroBackgroundCss.matchAll(/\bfilter:\s*([^;]+);/g), match => match[1])
  expect(videoFilters).toEqual(['brightness(0.94) contrast(1.04)'])
  expect(siteCss).not.toContain('.ambient::after')
  expect(siteCss).not.toContain('background: rgba(0,0,0,.4)')
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

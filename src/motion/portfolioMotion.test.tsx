import { render } from '@testing-library/react'
import { gsap } from 'gsap'
import { Hero } from '../components/Hero/Hero'
import { createCaseOpening, createOpening, mountPortfolioMotion } from './portfolioMotion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import App from '../App'

it('reveals the title before supporting copy and restores its resting geometry', () => {
  const { container } = render(<Hero />)
  const title = container.querySelector<HTMLElement>('.hero-title')!
  const copy = container.querySelector<HTMLElement>('.hero-statement')!
  const media = container.querySelector<HTMLElement>('.hero-background-media')!
  const video = container.querySelector<HTMLVideoElement>('.hero-background-image')!
  const animation = createOpening(container, false).pause()
  animation.seek(0.1)
  expect(Number(gsap.getProperty(media, 'scale'))).toBeGreaterThan(1)
  expect(video.style.transform).toBe('')
  expect(Number(gsap.getProperty(title, 'yPercent'))).toBeGreaterThan(50)
  expect(Number(gsap.getProperty(copy, 'opacity'))).toBeLessThan(0.1)
  animation.progress(1)
  expect(title.style.transform).toBe('')
  expect(copy.style.opacity).toBe('')
  animation.revert()
})

it('leaves content readable without animation when reduced motion is enabled', () => {
  const { container } = render(<Hero />)
  const cleanup = mountPortfolioMotion(container, { reduced: true, compact: false })
  expect(container.querySelector<HTMLElement>('.hero-title')!.style.transform).toBe('')
  expect(container.querySelector<HTMLElement>('.hero-title')!.style.clipPath).toBe('')
  cleanup()
})

it('opens case-study title lines through a mask and restores their resting geometry', () => {
  window.history.replaceState({}, '', '/projects/academic')
  const { container } = render(<App />)
  const line = container.querySelector<HTMLElement>('.case-hero-title-line')!
  const supporting = container.querySelector<HTMLElement>('.academic-hero-support')!
  const animation = createCaseOpening(container, false).pause()
  animation.seek(0.1)
  expect(Number(gsap.getProperty(line, 'yPercent'))).toBeGreaterThan(50)
  expect(Number(gsap.getProperty(supporting, 'opacity'))).toBeLessThan(0.1)
  animation.progress(1)
  expect(line.style.transform).toBe('')
  expect(supporting.style.opacity).toBe('')
  animation.revert()
  window.history.replaceState({}, '', '/')
})

it('animates case-study sections without applying motion to the long project image', () => {
  window.history.replaceState({}, '', '/projects/academic')
  const { container } = render(<App />)
  const geometry = vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
    x: 0, y: 2000, top: 2000, bottom: 2600, left: 0, right: 1000, width: 1000, height: 600,
    toJSON: () => ({}),
  })
  const before = ScrollTrigger.getAll().length
  const cleanup = mountPortfolioMotion(container, { reduced: false, compact: false })
  const triggers = ScrollTrigger.getAll().slice(before)
  expect(triggers.length).toBeGreaterThan(4)
  expect(triggers.some(trigger => trigger.vars.scrub === 1.4)).toBe(false)
  const boardLink = container.querySelector<HTMLElement>('.board-case-stage a')!
  const boardImage = boardLink.querySelector<HTMLElement>('img')!
  expect(boardLink.style.clipPath).toBe('')
  expect(boardImage.style.transform).toBe('')
  cleanup()
  expect(ScrollTrigger.getAll()).toHaveLength(before)
  geometry.mockRestore()
  window.history.replaceState({}, '', '/')
})

it('restores inline styles on teardown so StrictMode can safely mount again', () => {
  const { container } = render(<Hero />)
  const cleanup = mountPortfolioMotion(container, { reduced: false, compact: true })
  cleanup()
  expect(container.querySelector<HTMLElement>('.hero-title')!.style.transform).toBe('')
  expect(container.querySelector<HTMLElement>('.hero-background-media')!.style.transform).toBe('')
})

it('reveals section content and removes its scroll controllers on teardown', () => {
  const { container } = render(<App />)
  // jsdom has no layout. Supply below-fold geometry so once-only triggers do not immediately complete.
  const geometry = vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
    x: 0, y: 2000, top: 2000, bottom: 2400, left: 0, right: 1000, width: 1000, height: 400,
    toJSON: () => ({}),
  })
  const before = ScrollTrigger.getAll().length
  const cleanup = mountPortfolioMotion(container, { reduced: false, compact: false })
  const triggers = ScrollTrigger.getAll().slice(before)
  expect(triggers.length).toBeGreaterThan(5)
  const groupedItems = new Set(container.querySelectorAll('.metric-item, .timeline-row, .expertise-card'))
  const groups = new Set(container.querySelectorAll('.metric-grid, .timeline, .expertise-grid'))
  expect(triggers.filter(trigger => groupedItems.has(trigger.vars.trigger as Element)).length).toBe(0)
  expect(triggers.filter(trigger => groups.has(trigger.vars.trigger as Element)).length).toBe(3)
  const projectVisual = container.querySelector<HTMLElement>('.project-visual')!
  expect(projectVisual.style.clipPath).toBe('')
  expect(triggers.some(trigger => trigger.vars.scrub === 1.2)).toBe(false)
  triggers.forEach(trigger => trigger.animation?.progress(1))
  for (const element of container.querySelectorAll<HTMLElement>('.motion-line, .expertise-card, .project-visual')) {
    expect(element.style.opacity).toBe('')
    expect(element.style.transform).toBe('')
    expect(element.style.clipPath).toBe('')
  }
  cleanup()
  expect(ScrollTrigger.getAll()).toHaveLength(before)
  geometry.mockRestore()
})

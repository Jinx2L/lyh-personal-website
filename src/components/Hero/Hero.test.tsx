import { act, render, screen } from '@testing-library/react'
import { Hero } from './Hero'

beforeEach(() => {
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined)
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {})
})

afterEach(() => vi.restoreAllMocks())

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

it('pauses the hero video while off screen or hidden and resumes it when visible', () => {
  const OriginalObserver = globalThis.IntersectionObserver
  let deliver: ((isIntersecting: boolean) => void) | undefined
  const disconnect = vi.fn()
  class ControlledObserver {
    constructor(callback: IntersectionObserverCallback) {
      deliver = isIntersecting => callback([{ isIntersecting } as IntersectionObserverEntry], this as unknown as IntersectionObserver)
    }
    observe() {}
    unobserve() {}
    disconnect = disconnect
    takeRecords() { return [] }
    root = null
    rootMargin = '100px'
    scrollMargin = '0px'
    thresholds = [0]
  }
  globalThis.IntersectionObserver = ControlledObserver as unknown as typeof IntersectionObserver
  const play = vi.mocked(HTMLMediaElement.prototype.play)
  const pause = vi.mocked(HTMLMediaElement.prototype.pause)
  const visibility = vi.spyOn(document, 'visibilityState', 'get').mockReturnValue('visible')
  try {
    const view = render(<Hero />)
    act(() => deliver?.(false))
    expect(pause).toHaveBeenCalled()
    act(() => deliver?.(true))
    expect(play).toHaveBeenCalled()
    const pausesBeforeHide = pause.mock.calls.length
    visibility.mockReturnValue('hidden')
    act(() => document.dispatchEvent(new Event('visibilitychange')))
    expect(pause.mock.calls.length).toBeGreaterThan(pausesBeforeHide)
    view.unmount()
    expect(disconnect).toHaveBeenCalledOnce()
  } finally {
    globalThis.IntersectionObserver = OriginalObserver
  }
})

describe('Hero', () => {
  it('renders positioning copy and all navigation targets', () => {
    render(<Hero />)
    expect(screen.getByText('Visual Designer / UI Designer')).toBeInTheDocument()
    expect(screen.getByText(/把复杂业务转化为清晰/)).toBeInTheDocument()
    ;['关于我','工作经历','项目展示','个人优势','联系我'].forEach((label) => expect(screen.getByText(label)).toBeInTheDocument())
  })
})

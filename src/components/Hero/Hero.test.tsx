import { act, fireEvent, render, screen } from '@testing-library/react'
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
  expect(video).toHaveAttribute('autoplay')
  expect(video).toHaveProperty('muted', true)
  expect(video).toHaveAttribute('loop')
  expect(video).toHaveAttribute('playsinline')
  const poster = ambient.querySelector('.hero-background-poster')
  expect(poster).toHaveAttribute('src', '/assets/hero-background-1109-v2-poster.jpg')
  expect(video.parentElement).toBe(poster?.parentElement)
  expect(video.parentElement).toBe(ambient.firstElementChild)
  expect(ambient.querySelector('.orb')).toBeNull()
  expect(ambient.querySelector('.ambient-grid')).not.toBeNull()
  expect(ambient.querySelector('.noise')).not.toBeNull()
})

it('keeps the first-frame image over the video until a frame is submitted', () => {
  const prototype = HTMLVideoElement.prototype
  const request = vi.fn<(callback: VideoFrameRequestCallback) => number>().mockReturnValue(7)
  const cancel = vi.fn()
  const oldRequest = Object.getOwnPropertyDescriptor(prototype, 'requestVideoFrameCallback')
  const oldCancel = Object.getOwnPropertyDescriptor(prototype, 'cancelVideoFrameCallback')
  Object.defineProperties(prototype, {
    requestVideoFrameCallback: { configurable: true, value: request },
    cancelVideoFrameCallback: { configurable: true, value: cancel },
  })
  const { container, unmount } = render(<Hero />)
  try {
    const video = container.querySelector('video')!
    const media = video.parentElement!
    expect(media).toHaveAttribute('data-video-ready', 'false')
    fireEvent.playing(video)
    expect(media).toHaveAttribute('data-video-ready', 'false')
    const frameSubmitted = request.mock.calls[0][0]
    act(() => frameSubmitted(0, {} as VideoFrameCallbackMetadata))
    expect(media).toHaveAttribute('data-video-ready', 'true')
  } finally {
    unmount()
    if (oldRequest) Object.defineProperty(prototype, 'requestVideoFrameCallback', oldRequest)
    else Reflect.deleteProperty(prototype, 'requestVideoFrameCallback')
    if (oldCancel) Object.defineProperty(prototype, 'cancelVideoFrameCallback', oldCancel)
    else Reflect.deleteProperty(prototype, 'cancelVideoFrameCallback')
  }
})

it('keeps the image as a fallback until playback starts in older browsers', () => {
  const { container } = render(<Hero />)
  const video = container.querySelector('video')!
  const media = video.parentElement!
  expect(media).toHaveAttribute('data-video-ready', 'false')
  fireEvent.loadedData(video)
  expect(media).toHaveAttribute('data-video-ready', 'false')
  fireEvent.playing(video)
  expect(media).toHaveAttribute('data-video-ready', 'true')
})

it('pauses offscreen and resumes at the same position when the Hero returns', () => {
  let reportEntry: (entry: IntersectionObserverEntry) => void
  let observed: Element | undefined
  const disconnect = vi.fn()

  class ViewportObserver extends IntersectionObserver {
    constructor(callback: IntersectionObserverCallback) {
      super(callback)
      reportEntry = entry => callback([entry], this)
    }
    observe(target: Element) { observed = target }
    disconnect() { disconnect() }
  }

  vi.stubGlobal('IntersectionObserver', ViewportObserver)
  const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {})
  const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined)
  const { container, unmount } = render(<Hero />)
  try {
    const video = container.querySelector('video')!
    expect(observed).toBe(video)
    video.currentTime = 2
    const reportIntersection = (isIntersecting: boolean) => {
      const bounds = video.getBoundingClientRect()
      act(() => reportEntry({
        target: video,
        isIntersecting,
        intersectionRatio: isIntersecting ? 1 : 0,
        boundingClientRect: bounds,
        intersectionRect: bounds,
        rootBounds: null,
        time: performance.now(),
      }))
    }

    reportIntersection(false)
    expect(pause).toHaveBeenCalledOnce()
    expect(play).not.toHaveBeenCalled()

    reportIntersection(true)
    expect(play).toHaveBeenCalledOnce()
    expect(video.currentTime).toBe(2)

    unmount()
    expect(disconnect).toHaveBeenCalledOnce()
  } finally {
    unmount()
    vi.unstubAllGlobals()
    pause.mockRestore()
    play.mockRestore()
  }
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

import { fireEvent, render, waitFor } from '@testing-library/react'
import { SelectedWorks } from './SelectedWorks'
import '../../index.css'

describe('SelectedWorks', () => {
  it('renders the four projects in confirmed order with the supplied preview videos', () => {
    const { container } = render(<SelectedWorks />)
    const names = [...container.querySelectorAll('.project-meta h3')].map((node) => node.textContent)
    expect(names).toEqual(['学科知识服务平台','重百云购小程序','重百会员管理中心','企微汽贸小程序'])
    expect([...container.querySelectorAll('.project-side > span')].map((node) => node.textContent)).toEqual([
      '2026.03-2026.06',
      '2020.07-2025.07',
      '2023.11-2024.01',
      '2022.01-2022.05',
    ])
    expect(container.querySelector('.project-ui-shell img')).not.toBeInTheDocument()
    expect([...container.querySelectorAll('video')].map(video => video.getAttribute('src'))).toEqual([
      '/assets/project-academic.mp4',
      '/assets/project-cloud-v2.mp4',
      '/assets/project-membership-v2.mp4',
      '/assets/project-auto-v2.mp4',
    ])
    expect([...container.querySelectorAll('video')].map(video => video.getAttribute('poster'))).toEqual([
      '/assets/project-academic-poster.jpg',
      '/assets/project-cloud-v2-poster.jpg',
      '/assets/project-membership-v2-poster.jpg',
      '/assets/project-auto-v2-poster.jpg',
    ])
    expect(container.querySelector('.ui-topbar')).not.toBeInTheDocument()
    expect(container.querySelectorAll('.project-ui-shell')).toHaveLength(4)
  })

  it('shows every complete 4:3 video inside the tilted shell', () => {
    const { container } = render(<SelectedWorks />)
    const shells = [...container.querySelectorAll<HTMLElement>('.project-ui-shell')]
    const videos = [...container.querySelectorAll<HTMLVideoElement>('.project-shot')]
    expect(shells).toHaveLength(4)
    expect(videos).toHaveLength(4)
    shells.forEach(shell => expect(getComputedStyle(shell).aspectRatio).toBe('4 / 3'))
    videos.forEach(video => expect(getComputedStyle(video).objectFit).toBe('contain'))
  })
})

it.each([1, 2, 3, 4])('loops card %i on hover and holds its final frame on leave', async (index) => {
  const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined)
  const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {})
  try {
    const { container } = render(<SelectedWorks />)
    const card = container.querySelector(`.project-card-${index}`)!
    const video = card.querySelector('video')!
    Object.defineProperty(video, 'duration', { configurable: true, value: 10 })
    expect(video).not.toBeNull()
    expect(video.loop).toBe(true)
    expect(video.muted).toBe(true)
    expect(video.autoplay).toBe(false)
    expect(video).toHaveAttribute('preload', 'none')
    fireEvent.pointerEnter(card, { pointerType: 'mouse' })
    // jsdom pointer events do not preserve pointerType in every version.
    fireEvent.mouseEnter(card)
    await waitFor(() => expect(play).toHaveBeenCalled())
    video.currentTime = 2
    fireEvent.mouseLeave(card)
    expect(pause).toHaveBeenCalled()
    expect(video.currentTime).toBeCloseTo(10 - 1 / 60)
  } finally { vi.restoreAllMocks() }
})

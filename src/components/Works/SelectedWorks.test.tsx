import { fireEvent, render, waitFor } from '@testing-library/react'
import { SelectedWorks } from './SelectedWorks'

describe('SelectedWorks', () => {
  it('renders the four projects in confirmed order with supplied images inside the tilted shells', () => {
    const { container } = render(<SelectedWorks />)
    const names = [...container.querySelectorAll('.project-meta h3')].map((node) => node.textContent)
    expect(names).toEqual(['学科知识服务平台','重百云购小程序','重百会员管理中心','企微汽贸小程序'])
    expect([...container.querySelectorAll('.project-side > span')].map((node) => node.textContent)).toEqual([
      '2026.03-2026.06',
      '2020.07-2025.07',
      '2023.11-2024.01',
      '2022.01-2022.05',
    ])
    expect([...container.querySelectorAll('.project-ui-shell img')].map((image) => image.getAttribute('src'))).toEqual(['/assets/project-cloud.jpg'])
    expect([...container.querySelectorAll('video')].map(video => video.getAttribute('src'))).toEqual(['/assets/project-academic.mp4', '/assets/project-membership.mp4', '/assets/project-auto.mp4'])
    expect(container.querySelector('video')).toHaveAttribute('poster', '/assets/project-academic-poster.jpg')
    expect(container.querySelector('.ui-topbar')).not.toBeInTheDocument()
    expect(container.querySelectorAll('.project-ui-shell')).toHaveLength(4)
  })
})

it.each([1, 3, 4])('plays card %i on mouse hover and restores the first frame on leave', async (index) => {
  const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined)
  const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {})
  try {
    const { container } = render(<SelectedWorks />)
    const card = container.querySelector(`.project-card-${index}`)!
    const video = card.querySelector('video')!
    expect(video).not.toBeNull()
    expect(video.loop).toBe(true)
    expect(video.muted).toBe(true)
    expect(video.autoplay).toBe(false)
    fireEvent.pointerEnter(card, { pointerType: 'mouse' })
    // jsdom pointer events do not preserve pointerType in every version.
    fireEvent.mouseEnter(card)
    await waitFor(() => expect(play).toHaveBeenCalled())
    video.currentTime = 2
    fireEvent.mouseLeave(card)
    expect(pause).toHaveBeenCalled()
    expect(video.currentTime).toBe(0)
  } finally { vi.restoreAllMocks() }
})

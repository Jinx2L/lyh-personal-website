import { fireEvent, render } from '@testing-library/react'
import { SelectedWorks } from './SelectedWorks'

const previews = [
  [1, '学科知识服务平台', '2026.03-2026.06', '/assets/project-academic-poster.jpg', '/assets/project-academic.mp4'],
  [2, '重百云购小程序', '2020.07-2025.07', '/assets/project-cloud.jpg', '/assets/project-chongbai.mp4'],
  [3, '重百会员管理中心', '2023.11-2024.01', '/assets/project-membership-poster.jpg', '/assets/project-membership-hover.mp4'],
  [4, '企微汽贸小程序', '2022.01-2022.05', '/assets/project-auto-poster.jpg', '/assets/project-auto-hover.mp4'],
] as const

it('renders the four projects in order with their original covers and no video requests', () => {
  const { container } = render(<SelectedWorks />)
  expect([...container.querySelectorAll('.project-meta h3')].map(node => node.textContent)).toEqual(previews.map(([, name]) => name))
  expect([...container.querySelectorAll('.project-side > span')].map(node => node.textContent)).toEqual(previews.map(([, , period]) => period))
  expect([...container.querySelectorAll('.project-ui-shell img')].map(image => image.getAttribute('src'))).toEqual(previews.map(([, , , cover]) => cover))
  expect(container.querySelectorAll('video')).toHaveLength(0)
  expect(container.querySelector('.ui-topbar')).not.toBeInTheDocument()
  expect(container.querySelectorAll('.project-ui-shell')).toHaveLength(4)
})

it.each(previews)('loads project %i (%s) on hover and returns to the original cover on leave', (index, name, _period, cover, source) => {
  const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {})
  try {
    const { container } = render(<SelectedWorks />)
    const card = container.querySelector(`.project-card-${index}`)!
    expect(card.querySelector('img')).toHaveAttribute('src', cover)
    expect(card.querySelector('video')).toBeNull()

    fireEvent.mouseEnter(card)
    const video = card.querySelector('video')!
    expect(video).toHaveAttribute('src', source)
    expect(video).toHaveAttribute('poster', cover)
    expect(video).toHaveAttribute('aria-label', `${name}项目展示`)
    expect(video).toHaveAttribute('playsinline')
    expect(video).toHaveProperty('autoplay', true)
    expect(video).toHaveProperty('muted', true)
    expect(video).toHaveProperty('loop', true)

    fireEvent.mouseLeave(card)
    expect(pause).toHaveBeenCalledOnce()
    expect(card.querySelector('video')).toBeNull()
    expect(card.querySelector('img')).toHaveAttribute('src', cover)

    fireEvent.mouseEnter(card)
    expect(card.querySelector('video')).toHaveAttribute('src', source)
  } finally {
    pause.mockRestore()
  }
})

it('keeps the original cover on devices without hover', () => {
  const defaultMatchMedia = window.matchMedia.bind(window)
  const matchMedia = vi.spyOn(window, 'matchMedia').mockImplementation(query => ({
    ...defaultMatchMedia(query),
    matches: query === '(hover: none)',
  }))
  try {
    const { container } = render(<SelectedWorks />)
    const card = container.querySelector('.project-card-2')!
    fireEvent.mouseEnter(card)
    expect(card.querySelector('video')).toBeNull()
    expect(card.querySelector('img')).toHaveAttribute('src', '/assets/project-cloud.jpg')
  } finally {
    matchMedia.mockRestore()
  }
})

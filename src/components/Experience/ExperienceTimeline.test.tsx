import { render, screen } from '@testing-library/react'
import { ExperienceTimeline } from './ExperienceTimeline'

describe('ExperienceTimeline', () => {
  it('renders only the three company roles after removing independent designer experience', () => {
    render(<ExperienceTimeline />)
    expect(screen.queryByText('独立 UI 设计师')).not.toBeInTheDocument()
    expect(screen.getAllByText('UI 设计师').length).toBeGreaterThanOrEqual(1)
    expect(screen.queryByText('承接全链路 UI 设计项目')).not.toBeInTheDocument()
    expect(screen.queryByText('独立负责客户需求对接到开发落地跟进')).not.toBeInTheDocument()
    expect(screen.queryByText('2025.09–至今')).not.toBeInTheDocument()
    expect(screen.getByText('九章开物（重庆）科技有限公司')).toBeInTheDocument()
    expect(screen.getByText('2020.07–2025.08')).toBeInTheDocument()
    expect(screen.getByText('2016.11–2020.07')).toBeInTheDocument()
    expect(screen.getByText('2015.11–2016.11')).toBeInTheDocument()
  })
})

it('renders the v5 three-band background and preserves the timeline', () => {
  const { container } = render(<ExperienceTimeline />)
  expect(container.querySelector('.experience-aurora')).toHaveAttribute('aria-hidden', 'true')
  expect(container.querySelectorAll('.experience-aurora-band')).toHaveLength(3)
  expect(container.querySelector('.aurora-container')).not.toBeInTheDocument()
  expect(container.querySelectorAll('.timeline-row')).toHaveLength(3)
  expect(container.querySelector('.timeline')).toHaveClass('timeline--aligned-columns')
  expect(container.querySelector('.timeline-index')).toHaveTextContent('01')
})

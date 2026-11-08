import { render, screen } from '@testing-library/react'
import { ExperienceTimeline } from './ExperienceTimeline'

describe('ExperienceTimeline', () => {
  it('presents the concise resume-focused experience copy', () => {
    render(<ExperienceTimeline />)
    expect(screen.getByText('独立 UI 设计师')).toBeInTheDocument()
    expect(screen.getAllByText('UI 设计师').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/为 10\+ B 端及移动端客户提供 UI 设计服务/)).toBeInTheDocument()
    expect(screen.getByText(/AI 辅助设计与 Vibe Coding/)).toBeInTheDocument()
    expect(screen.getByText('2025.09–至今')).toBeInTheDocument()
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
  expect(container.querySelectorAll('.timeline-row')).toHaveLength(4)
  expect(container.querySelector('.timeline')).toHaveClass('timeline--aligned-columns')
    expect(screen.getByText('具备电商营销活动及运营页面设计经验，参与 618、双11 等营销场景的页面设计与迭代。熟悉活动组件化设计及 CMS 页面搭建逻辑，能够兼顾视觉表现、营销信息传达与运营配置效率。')).toBeInTheDocument()
    expect(screen.getByText('参与安逸花 App 内嵌商城及相关业务系统的设计迭代，熟悉分期购物、金融信息展示及交易流程等业务场景。能够兼顾业务需求、用户体验与金融信息展示要求，优化关键操作路径及界面易用性。')).toBeInTheDocument()
})

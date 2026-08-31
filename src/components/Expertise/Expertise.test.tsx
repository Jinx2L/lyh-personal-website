import { fireEvent, render, screen } from '@testing-library/react'
import { Expertise } from './Expertise'

it('places three Aurora bands behind the unchanged expertise cards', () => {
  const { container } = render(<Expertise />)
  const section = container.querySelector('#expertise')!
  expect(section.querySelector('.experience-aurora')).toHaveAttribute('aria-hidden', 'true')
  expect(section.querySelectorAll('.experience-aurora-band')).toHaveLength(3)
  expect(section.querySelectorAll('.experience-content .expertise-card')).toHaveLength(4)
})

it('does not run decorative border sweeps before the cards enter the viewport', () => {
  const { container } = render(<Expertise />)
  expect(container.querySelectorAll('.border-glow-card.sweep-active')).toHaveLength(0)
})

describe('Expertise', () => {
  it('renders four capability categories', () => {
    render(<Expertise />)
    ;['复杂 B 端系统','数据可视化','移动与电商体验','设计系统与落地'].forEach((label) => expect(screen.getByText(label)).toBeInTheDocument())
  })
})

it('tracks the pointer near the card edge and resets on leave', () => {
  const { container } = render(<Expertise />)
  const cards = container.querySelectorAll<HTMLElement>('.border-glow-card')
  expect(cards).toHaveLength(4)
  const card = cards[0]
  card.getBoundingClientRect = () => ({ x: 0, y: 0, left: 0, top: 0, right: 300, bottom: 400, width: 300, height: 400, toJSON() {} })
  fireEvent(card, new MouseEvent('pointermove', { bubbles: true, clientX: 300, clientY: 200 }))
  expect(card.style.getPropertyValue('--edge-proximity')).toBe('100.000')
  expect(card.style.getPropertyValue('--cursor-angle')).toBe('90.000deg')
  fireEvent.pointerLeave(card)
  expect(card.style.getPropertyValue('--edge-proximity')).toBe('0')
})

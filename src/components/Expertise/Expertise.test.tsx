import { fireEvent, render, screen } from '@testing-library/react'
import { Expertise } from './Expertise'
import systemsIcon from '../../../public/assets/expertise-systems.svg?raw'
import dataIcon from '../../../public/assets/expertise-data.svg?raw'
import mobileIcon from '../../../public/assets/expertise-mobile.svg?raw'
import designIcon from '../../../public/assets/expertise-design.svg?raw'

it('renders expertise cards without an Aurora background', () => {
  const { container } = render(<Expertise />)
  const section = container.querySelector('#expertise')!
  expect(section.querySelector('.experience-aurora')).not.toBeInTheDocument()
  expect(section.querySelectorAll('.experience-content .expertise-card')).toHaveLength(4)
})

it('adds a distinct generated icon to every expertise card', () => {
  const { container } = render(<Expertise />)
  const icons = Array.from(container.querySelectorAll<HTMLImageElement>('.expertise-icon'))
  expect(icons).toHaveLength(4)
  expect(new Set(icons.map(icon => icon.getAttribute('src')))).toHaveProperty('size', 4)
  icons.forEach(icon => {
    expect(icon.getAttribute('src')).toMatch(/\.svg$/)
    expect(icon).toHaveAttribute('alt', '')
    expect(icon).toHaveAttribute('width', '48')
    expect(icon).toHaveAttribute('height', '48')
  })
})

it('uses the site warm-white color for every expertise icon stroke', () => {
  ;[systemsIcon, dataIcon, mobileIcon, designIcon].forEach(svg => {
    expect(svg).toContain('stroke="#E7E4D6"')
    expect(svg).not.toContain('stroke="#B6C88F"')
    expect(svg).toContain('fill="#23221F"')
    expect(svg).toContain('stroke-width="1.4"')
    expect(svg).not.toContain('stroke-width="1.6"')
    expect(svg).not.toContain('stroke-width="2"')
  })
})

it('raises expertise icon opacity from sixty percent to full on card hover', () => {
  const { container } = render(<Expertise />)
  container.querySelectorAll('.expertise-icon').forEach(icon => {
    expect(icon).toHaveAttribute('data-default-opacity', '0.6')
    expect(icon).toHaveAttribute('data-hover-opacity', '1')
  })
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

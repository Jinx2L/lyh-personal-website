import { render, waitFor } from '@testing-library/react'
// @ts-expect-error Vitest provides Node built-ins; the app intentionally has no Node runtime dependency.
import { readFileSync } from 'node:fs'
import App from './App'

const projectRoot = (globalThis as unknown as { process: { cwd: () => string } }).process.cwd()
const globalStyles = readFileSync(`${projectRoot}/src/index.css`, 'utf8')
const tiltedCardStyles = readFileSync(`${projectRoot}/src/components/About/TiltedCard.css`, 'utf8')

describe('page structure', () => {
  it('contains unique expected section anchors', async () => {
    const { container } = render(<App />)
    await waitFor(() => expect(container.querySelector('.route-loading')).not.toBeInTheDocument())
    ;['top','about','experience','works','expertise','contact'].forEach((id) => {
      expect(container.querySelectorAll(`#${id}`)).toHaveLength(1)
    })
    expect(container.querySelectorAll('main')).toHaveLength(1)
  })
})

describe('cross-device layout contract', () => {
  it('uses a bundled-free system font stack with stable typography metrics', () => {
    expect(globalStyles).not.toMatch(/font-family:\s*Inter/)
    expect(globalStyles).toContain('font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;')
    expect(globalStyles).toContain('font-size-adjust: 0.52;')
  })

  it('sizes the desktop canvas and work media from their containers', () => {
    expect(globalStyles).toContain('width: min(92%, 1700px);')
    expect(globalStyles).toContain('aspect-ratio: 1 / 1;')
    expect(globalStyles).toMatch(/\.project-ui-shell\s*\{[^}]*width:\s*80%;/s)
    expect(globalStyles).not.toMatch(/\.project-ui-shell\s*\{[^}]*width:\s*76%;/s)
    expect(globalStyles).not.toMatch(/\.project-card-2 \.project-visual, \.project-card-3 \.project-visual\s*\{[^}]*aspect-ratio:\s*9 \/ 10;/s)
    expect(globalStyles).not.toMatch(/\.project-visual\s*\{[^}]*\bheight:\s*clamp\([^}]*vw/s)
  })

  it('keeps the about portrait at its native ratio without fixed desktop heights', () => {
    expect(globalStyles).toContain('aspect-ratio: 3 / 4;')
    expect(tiltedCardStyles).toContain('--portrait-height: 100%;')
    expect(tiltedCardStyles).not.toContain('--portrait-height: 560px;')
    expect(tiltedCardStyles).not.toContain('--portrait-height: 460px;')
  })
})

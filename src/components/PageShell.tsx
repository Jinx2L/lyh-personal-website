import { useRef, type ReactNode } from 'react'
import { usePortfolioMotion } from '../motion/usePortfolioMotion'
import { CursorGlow } from './common/CursorGlow'

export function PageShell({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null)
  usePortfolioMotion(root)
  return <main ref={root}>
    <CursorGlow />
    {children}
  </main>
}

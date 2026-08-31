import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from 'gsap'
import { mountPortfolioMotion } from './portfolioMotion'
import './portfolioMotion.css'

export function usePortfolioMotion(ref: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    if (!ref.current) return
    const root = ref.current
    const media = gsap.matchMedia()
    media.add({ reduced: '(prefers-reduced-motion: reduce)', compact: '(max-width: 900px)',
      desktop: '(min-width: 901px)' }, context => {
      return mountPortfolioMotion(root, {
        reduced: Boolean(context.conditions?.reduced), compact: Boolean(context.conditions?.compact),
      })
    })
    return () => media.revert()
  }, [ref])
}

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './CursorGlow.css'

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!glow || !finePointer || reducedMotion) return

    const moveX = gsap.quickTo(glow, 'x', { duration: .6, ease: 'power2.out' })
    const moveY = gsap.quickTo(glow, 'y', { duration: .6, ease: 'power2.out' })
    const fade = gsap.quickTo(glow, 'opacity', { duration: .6, ease: 'power2.out' })

    const handleMove = (event: MouseEvent) => {
      moveX(event.clientX)
      moveY(event.clientY)
      fade(1)
    }
    const handleLeave = () => fade(0)

    window.addEventListener('mousemove', handleMove, { passive: true })
    document.addEventListener('mouseleave', handleLeave)
    window.addEventListener('blur', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      window.removeEventListener('blur', handleLeave)
      gsap.killTweensOf(glow)
    }
  }, [])

  return <div ref={glowRef} className="global-cursor-glow" aria-hidden="true" />
}

import { useRef, useLayoutEffect, useState } from 'react'
import type { ReactNode, RefObject, CSSProperties } from 'react'
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame, useReducedMotion, useInView } from 'motion/react'
import './ScrollVelocity.css'

type Props = {
  texts?: ReactNode[]
  scrollContainerRef?: RefObject<HTMLElement | null>
  velocity?: number
  className?: string
  damping?: number
  stiffness?: number
  numCopies?: number
  velocityMapping?: { input: number[]; output: number[] }
  parallaxClassName?: string
  scrollerClassName?: string
  parallaxStyle?: CSSProperties
  scrollerStyle?: CSSProperties
}

function useElementWidth(ref: RefObject<HTMLSpanElement | null>) {
  const [width, setWidth] = useState(0)
  useLayoutEffect(() => {
    const update = () => setWidth(ref.current?.offsetWidth ?? 0)
    update()
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update)
    if (ref.current) observer?.observe(ref.current)
    window.addEventListener('resize', update)
    return () => { observer?.disconnect(); window.removeEventListener('resize', update) }
  }, [ref])
  return width
}

function VelocityText({ children, baseVelocity, scrollContainerRef, className, damping = 50, stiffness = 400, numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] }, parallaxClassName, scrollerClassName, parallaxStyle, scrollerStyle
}: Omit<Props, 'texts' | 'velocity'> & { children: ReactNode; baseVelocity: number }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll(scrollContainerRef ? { container: scrollContainerRef } : {})
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping, stiffness })
  const velocityFactor = useTransform(smoothVelocity, velocityMapping.input, velocityMapping.output, { clamp: false })
  const copyRef = useRef<HTMLSpanElement>(null)
  const rowRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(rowRef, { margin: '100px' })
  const copyWidth = useElementWidth(copyRef)
  const reducedMotion = useReducedMotion()
  const x = useTransform(baseX, value => {
    if (!copyWidth || reducedMotion) return '0px'
    return `${(((value + copyWidth) % copyWidth) + copyWidth) % copyWidth - copyWidth}px`
  })
  const direction = useRef(1)
  useAnimationFrame((_time, delta) => {
    if (reducedMotion || !copyWidth || !inView || document.hidden) return
    let moveBy = direction.current * baseVelocity * (delta / 1000)
    const factor = velocityFactor.get()
    if (factor < 0) direction.current = -1
    else if (factor > 0) direction.current = 1
    moveBy += direction.current * moveBy * factor
    baseX.set(baseX.get() + moveBy)
  })
  return <span ref={rowRef} className={parallaxClassName} style={parallaxStyle}>
    <motion.span className={scrollerClassName} style={{ x, ...scrollerStyle }}>
      {Array.from({ length: reducedMotion ? 1 : numCopies }, (_, i) =>
        <span className={className} key={i} ref={i === 0 ? copyRef : null}>{children}&nbsp;</span>)}
    </motion.span>
  </span>
}

export default function ScrollVelocity({ texts = [], velocity = 100, className = 'contact-velocity-copy',
  parallaxClassName = 'contact-velocity-row', scrollerClassName = 'contact-velocity-track', ...props }: Props) {
  return <span className="contact-velocity" aria-hidden="true">
    {texts.map((text, index) => <VelocityText key={index} {...props} className={className}
      parallaxClassName={parallaxClassName} scrollerClassName={scrollerClassName}
      baseVelocity={index % 2 ? -velocity : velocity}>{text}</VelocityText>)}
  </span>
}

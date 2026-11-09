import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function createOpening(root: HTMLElement, compact: boolean) {
  const find = (selector: string) => root.querySelectorAll(selector)
  const opening = gsap.timeline({ defaults: { ease: 'power4.out' } })
  opening.fromTo(find('.hero-background-media'), { scale: compact ? 1.05 : 1.12 },
    { scale: 1, duration: 2.4, clearProps: 'transform' }, 0)
  opening.fromTo(find('.hero-title'),
    { yPercent: 115, scaleY: 0.65, transformOrigin: '50% 100%', clipPath: 'inset(0 0 100% 0)' },
    { yPercent: 0, scaleY: 1, clipPath: 'inset(-20% -2% -20% -2%)', duration: 1.65,
      clearProps: 'transform,transformOrigin,clipPath' }, 0.18)
  opening.fromTo(find('.brand-mark, .hero-nav a, .contact-pill'),
    { y: -22, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.85,
      clearProps: 'transform,opacity' }, 0.95)
  opening.fromTo(find('.hero-kicker, .hero-role, .hero-statement'),
    { y: compact ? 28 : 58, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
    { y: 0, opacity: 1, clipPath: 'inset(-10% -2% -10% -2%)', stagger: 0.12, duration: 1.05,
      clearProps: 'transform,opacity,clipPath' }, 1.1)
  return opening
}

export function createCaseOpening(root: HTMLElement, compact: boolean) {
  const find = (selector: string) => Array.from(root.querySelectorAll(selector))
  const opening = gsap.timeline({ defaults: { ease: 'power4.out' } })
  opening.fromTo(find('.case-hero-title-line'),
    { yPercent: 118, scaleY: .58, transformOrigin: '50% 100%' },
    { yPercent: 0, scaleY: 1, duration: 1.7, stagger: .16,
      clearProps: 'transform,transformOrigin' }, .14)
  opening.fromTo(find('.case-nav > *, .case-kicker'),
    { y: compact ? -18 : -30, opacity: 0 },
    { y: 0, opacity: 1, duration: .95, stagger: .08, clearProps: 'transform,opacity' }, .88)
  opening.fromTo(find('.case-hero-bottom, .case-scroll, .academic-hero-support, .academic-placeholder-card, .academic-hero-meta'),
    { y: compact ? 32 : 64, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
    { y: 0, opacity: 1, clipPath: 'inset(-10% -2% -10% -2%)', duration: 1.2,
      stagger: .14, clearProps: 'transform,opacity,clipPath' }, 1.12)
  return opening
}

function mountCaseStudyMotion(root: HTMLElement, compact: boolean) {
  if (window.scrollY < 80 && !window.location.hash) createCaseOpening(root, compact)

  const reveal = (targets: Element[], trigger: Element, vars: gsap.TweenVars = {}) => {
    if (!targets.length) return
    gsap.fromTo(targets,
      { y: compact ? 44 : 90, opacity: 0, clipPath: 'inset(0 0 100% 0)', scaleY: .84 },
      { y: 0, opacity: 1, clipPath: 'inset(-16% -3% -16% -3%)', scaleY: 1,
        duration: 1.35, stagger: .14, ease: 'power4.out', clearProps: 'transform,opacity,clipPath',
        ...vars, scrollTrigger: { trigger, start: 'top 88%', once: true } })
  }

  root.querySelectorAll<HTMLElement>('.case-study [data-case-section]:not([data-case-section="hero"])').forEach(section => {
    const label = section.querySelector<HTMLElement>('.case-label, :scope.case-value > span')
    if (label) gsap.fromTo(label,
      { y: compact ? 42 : 105, scale: compact ? 1.08 : 1.32, opacity: 0, transformOrigin: '0 100%' },
      { y: 0, scale: 1, opacity: 1, duration: 1.35, ease: 'power4.out', clearProps: 'transform,opacity',
        scrollTrigger: { trigger: section, start: 'top 88%', once: true } })

    const heading = section.querySelector<HTMLElement>('h2')
    if (heading) reveal([heading], heading, { delay: .12, duration: 1.55 })

    const cards = Array.from(section.querySelectorAll(
      '.board-case-focus article, .chongbai-metrics article'))
    if (cards.length) reveal(cards, cards[0], { delay: .28, stagger: .16 })

    const copy = Array.from(section.querySelectorAll<HTMLElement>('.case-intro > p, .case-value > div'))
    if (copy.length) reveal(copy, copy[0], { delay: .32, duration: 1.15, stagger: .12 })
  })

}

export function mountPortfolioMotion(root: HTMLElement, { reduced, compact }: { reduced: boolean; compact: boolean }) {
  if (reduced) return () => {}
  const context = gsap.context(() => {
    const caseStudy = root.querySelector('.case-study')
    if (caseStudy) {
      mountCaseStudyMotion(root, compact)
      return
    }
    if (window.scrollY < 80 && !window.location.hash) createOpening(root, compact)
    const reveal = (targets: Element[], trigger: Element, delay = 0, heading = false) => {
      if (!targets.length) return
      gsap.fromTo(targets,
        { y: compact ? 38 : heading ? 110 : 70, opacity: heading ? 1 : 0,
          clipPath: 'inset(0 0 100% 0)', ...(heading ? { scaleY: 0.82 } : {}) },
        { y: 0, opacity: 1, scaleY: 1, clipPath: 'inset(-20% -3% -20% -3%)',
          duration: heading ? 1.45 : 1.15, stagger: 0.15, delay, ease: 'power4.out',
          clearProps: 'transform,opacity,clipPath',
          scrollTrigger: { trigger, start: 'top 91%', once: true } })
    }
    root.querySelectorAll<HTMLElement>('section:not(#top)').forEach(section => {
      const headings = Array.from(section.querySelectorAll('h2')).filter(h => !h.querySelector('.contact-velocity'))
      const titleTargets = [...headings.flatMap(h => h.querySelector('.motion-line') ? Array.from(h.querySelectorAll('.motion-line')) : [h]), ...section.querySelectorAll('.contact-velocity-row')]
      reveal(titleTargets, headings[0] ?? titleTargets[0] ?? section, 0, true)
      section.querySelectorAll('.about-body, .contact-cn, .contact-invitation').forEach(el => reveal([el], el, 0.25))
      section.querySelectorAll('.metric-grid, .timeline, .expertise-grid').forEach(group => {
        const items = Array.from(group.querySelectorAll('.metric-item, .timeline-row, .expertise-card'))
        reveal(items, group, 0.25)
      })
      // Keep even-card offsets and hover transforms on their original shells.
      section.querySelectorAll('.project-card').forEach((card, index) => {
        reveal(Array.from(card.querySelectorAll('.project-visual, .project-meta, .project-description')), card, index % 2 * 0.15)
        const media = card.querySelector('.project-shot')
        if (media && !compact) gsap.fromTo(media, { yPercent: -3, scale: 1.08 },
          { yPercent: 3, scale: 1.08, ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1.2 } })
      })
      const portrait = section.querySelector('.about-visual')
      if (portrait) reveal([portrait], portrait, 0.25)
    })
  }, root)
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.setAttribute('data-motion-visible', String(entry.isIntersecting)))
  }, { rootMargin: '100px' })
  const ambientSections = root.querySelectorAll('#top, #experience, .academic-hero-illustrations, .academic-focus-marquee')
  ambientSections.forEach(section => observer.observe(section))
  const academicMarquee = root.querySelector<HTMLElement>('.academic-focus-marquee')
  const setMarqueeRate = (rate: number) => {
    academicMarquee?.querySelector<HTMLElement>('.academic-focus-track')?.getAnimations().forEach(animation => {
      animation.updatePlaybackRate(rate)
    })
  }
  const slowMarquee = () => setMarqueeRate(.38)
  const resumeMarquee = () => setMarqueeRate(1)
  academicMarquee?.addEventListener('mouseenter', slowMarquee)
  academicMarquee?.addEventListener('mouseleave', resumeMarquee)
  let disposed = false
  void document.fonts?.ready.then(() => { if (!disposed) ScrollTrigger.refresh() })
  return () => {
    disposed = true
    observer.disconnect()
    academicMarquee?.removeEventListener('mouseenter', slowMarquee)
    academicMarquee?.removeEventListener('mouseleave', resumeMarquee)
    ambientSections.forEach(section => section.removeAttribute('data-motion-visible'))
    context.revert()
  }
}

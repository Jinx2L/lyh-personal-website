import { ArrowDownRight } from 'lucide-react'
import { HeaderNav } from '../HeaderNav'
import { AmbientBackground } from './AmbientBackground'

export function Hero() {

  return (
    <section className="hero-section" id="top">
      <div className="hero-frame">
        <AmbientBackground />
        <HeaderNav />
        <div className="hero-content site-container">
          <div className="hero-kicker">SELECTED WORKS · 2015—2026</div>
          <h1
            className="hero-title"
          >
            PORTFOLIO
          </h1>
          <div className="hero-bottom">
            <div
              className="hero-role"
            >
              <p>Visual Designer / UI Designer</p>
              <p className="muted">9+ years of design experience</p>
            </div>
            <div
              className="hero-statement"
            >
              <p>把复杂业务转化为清晰、</p>
              <p>有价值的数字体验。</p>
              <a href="#about" className="hero-scroll-link">
                Scroll to explore <ArrowDownRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

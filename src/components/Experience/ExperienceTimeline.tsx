import { experiences } from '../../data/portfolio'
import { SectionLabel } from '../common/SectionLabel'
import { RevealText } from '../common/RevealText'
import { AuroraBackground } from './AuroraBackground'

export function ExperienceTimeline() {
  return (
    <section className="section experience-section" id="experience">
      <AuroraBackground />
      <div className="site-container experience-content">
        <SectionLabel index="02" title="EXPERIENCE" />
        <div className="experience-intro">
          <RevealText as="h2" className="section-heading">把设计放进真实业务里，<br/><span className="heading-dim">持续解决复杂问题。</span></RevealText>
        </div>
        <div className="timeline timeline--aligned-columns">
          {experiences.map((item, index) => (
            <article className="timeline-row" key={item.company}>
              <div className="timeline-index">0{index + 1}</div>
              <div className="timeline-company">
                <h3>{item.company}</h3>
                <p>{item.role}</p>
              </div>
              <div className="timeline-focus">
                {item.focus.map((focus) => <span key={focus}>{focus}</span>)}
              </div>
              <div className="timeline-period">{item.period}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

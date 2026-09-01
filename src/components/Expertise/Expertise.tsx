import { expertise } from '../../data/portfolio'
import { SectionLabel } from '../common/SectionLabel'
import { ExpertiseCard } from './ExpertiseCard'
import { RevealText } from '../common/RevealText'

export function Expertise() {
  return (
    <section className="section experience-section" id="expertise">
      <div className="site-container experience-content">
      <SectionLabel index="04" title="EXPERTISE" />
      <div className="expertise-layout">
        <RevealText as="h2" className="section-heading">Design with structure.<br/><span className="heading-dim">Deliver with clarity.</span></RevealText>
        <div className="expertise-grid">
          {expertise.map((item) => <ExpertiseCard key={item.id} item={item} />)}
        </div>
      </div>
      </div>
    </section>
  )
}

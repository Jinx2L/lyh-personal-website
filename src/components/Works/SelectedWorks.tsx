import { projects } from '../../data/portfolio'
import { SectionLabel } from '../common/SectionLabel'
import { ProjectCard } from './ProjectCard'
import { RevealText } from '../common/RevealText'

export function SelectedWorks() {
  return (
    <section className="section site-container works-section" id="works">
      <SectionLabel index="03" title="SELECTED WORKS" />
      <div className="works-heading-row">
        <RevealText as="h2" className="section-heading">Selected projects,<br/><span className="heading-dim">built around real business.</span></RevealText>
      </div>
      <div className="works-grid">
        {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
      </div>
    </section>
  )
}

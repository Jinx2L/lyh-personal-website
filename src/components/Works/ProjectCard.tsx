import { ArrowUpRight } from 'lucide-react'
import { useRef, useState } from 'react'
import type { Project } from '../../types/portfolio'

const projectDetailPaths: Partial<Record<string, string>> = {
  '01': '/projects/academic',
  '02': '/projects/chongbai',
  '03': '/projects/membership',
  '04': '/projects/auto',
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showHoverVideo, setShowHoverVideo] = useState(false)

  function stopPreview() {
    videoRef.current?.pause()
    setShowHoverVideo(false)
  }

  function startPreview() {
    if (!project.videoSrc || window.matchMedia('(hover: none)').matches) return
    setShowHoverVideo(true)
  }

  const visual = <div className={`project-visual visual-${project.visualKey}`}>
    <div className="project-ui-shell">
      {project.videoSrc && showHoverVideo ? (
        <video ref={videoRef} className="project-shot" src={project.videoSrc} poster={project.imageSrc}
          aria-label={`${project.name}项目展示`} autoPlay muted loop playsInline preload="auto" />
      ) : (
        <img className="project-shot" src={project.imageSrc} alt={`${project.name}项目展示`} loading="lazy" decoding="async" />
      )}
    </div>
    <div className="project-visual-number">{project.id}</div>
  </div>

  const detailPath = projectDetailPaths[project.id]

  return (
    <article className={`project-card project-card-${index + 1}`} onMouseEnter={startPreview} onMouseLeave={stopPreview}>
      {detailPath ? <a className="project-detail-link" href={detailPath} aria-label={`查看${project.name}详情`}>{visual}</a> : visual}
      <div className="project-meta">
        <div>
          <div className="project-id">{project.id}</div>
          <h3>{project.name}</h3>
          <div className="project-tags">{project.tags.join(' · ')}</div>
        </div>
        <div className="project-side">
          {project.year && <span>{project.year}</span>}
          <ArrowUpRight size={22} strokeWidth={1.35} />
        </div>
      </div>
      <div className="project-description">
        <p>{project.summary}</p>
        {project.metric && <span className="project-metric">{project.metric}</span>}
      </div>
    </article>
  )
}

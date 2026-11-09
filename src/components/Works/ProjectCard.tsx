import { ArrowUpRight } from 'lucide-react'
import { useRef, useState } from 'react'
import type { Project } from '../../types/portfolio'

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

  const details: Record<string, { href: string; label: string }> = {
    '01': { href: '/projects/academic', label: '查看学科知识服务平台详情' },
    '02': { href: '/projects/chongbai', label: '查看重百云购小程序详情' },
    '03': { href: '/projects/membership', label: '查看重百会员管理中心详情' },
    '04': { href: '/projects/auto', label: '查看企微汽贸小程序详情' },
  }
  const detail = details[project.id]

  return (
    <article className={`project-card project-card-${index + 1}`} onMouseEnter={startPreview} onMouseLeave={stopPreview}>
      {detail ? <a className="project-detail-link" href={detail.href} aria-label={detail.label}>{visual}</a> : visual}
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

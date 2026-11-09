import { useEffect, useRef, useState } from 'react'
import './HeroBackground.css'

export function AmbientBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const revealVideo = () => setVideoReady(true)
    if (typeof video.requestVideoFrameCallback === 'function') {
      const frame = video.requestVideoFrameCallback(revealVideo)
      return () => video.cancelVideoFrameCallback(frame)
    }

    if (!video.paused && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      revealVideo()
      return
    }

    video.addEventListener('playing', revealVideo, { once: true })
    return () => video.removeEventListener('playing', revealVideo)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(entries => {
      const entry = entries[entries.length - 1]
      if (entry.isIntersecting) {
        if (video.paused) void video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="ambient" aria-hidden="true">
      <div className="hero-background-media" data-video-ready={videoReady}>
        <video ref={videoRef} className="hero-background-image" src="/assets/hero-background-1109-v2.mp4"
          autoPlay muted loop playsInline preload="auto" />
        <img className="hero-background-poster" src="/assets/hero-background-1109-v2-poster.jpg"
          alt="" fetchPriority="high" />
      </div>
      <div className="ambient-grid" />
      <div className="ambient-horizon" />
      <div className="noise" />
    </div>
  )
}

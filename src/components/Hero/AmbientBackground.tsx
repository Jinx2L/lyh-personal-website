import { useEffect, useRef } from 'react'
import './HeroBackground.css'

export function AmbientBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    let intersecting = true
    const syncPlayback = () => {
      if (intersecting && document.visibilityState !== 'hidden') {
        const playback = video.play()
        void playback?.catch(() => { /* The poster remains if autoplay is blocked. */ })
      } else {
        video.pause()
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      intersecting = entry.isIntersecting
      syncPlayback()
    }, { rootMargin: '100px' })
    observer.observe(video)
    document.addEventListener('visibilitychange', syncPlayback)
    if (document.visibilityState === 'hidden') video.pause()
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', syncPlayback)
    }
  }, [])

  return (
    <div className="ambient" aria-hidden="true">
      <video ref={videoRef} className="hero-background-image" src="/assets/hero-background.mp4"
        poster="/assets/hero-background-poster.jpg" autoPlay muted loop playsInline preload="auto" />
      <div className="ambient-grid" />
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />
      <div className="ambient-horizon" />
      <div className="noise" />
    </div>
  )
}

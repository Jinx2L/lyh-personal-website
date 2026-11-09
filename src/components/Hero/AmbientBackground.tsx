import './HeroBackground.css'

export function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <video className="hero-background-image" src="/assets/hero-background-1109-v2.mp4"
        poster="/assets/hero-background-1109-v2-poster.jpg" autoPlay muted loop playsInline preload="auto" />
      <div className="ambient-grid" />
      <div className="ambient-horizon" />
      <div className="noise" />
    </div>
  )
}

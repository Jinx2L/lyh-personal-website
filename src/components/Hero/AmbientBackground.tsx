import './HeroBackground.css'

export function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <video className="hero-background-image" src="/assets/hero-background.mp4"
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

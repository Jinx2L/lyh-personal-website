import BorderGlow from './BorderGlow'
import { ArrowUpRight } from 'lucide-react'
import type { ExpertiseItem } from '../../types/portfolio'

export function ExpertiseCard({ item }: { item: ExpertiseItem }) {
  return (
    <BorderGlow edgeSensitivity={30} glowColor="40 80 80" backgroundColor="var(--expertise-card-bg, var(--panel))"
      borderRadius={28} glowRadius={40} glowIntensity={0.7} coneSpread={25}
      animated colors={['#88966a', '#0a0a09', '#213d82']}>
    <article className="expertise-card">
      <div className="expertise-top"><span>{item.id}</span><ArrowUpRight size={18} strokeWidth={1.3} /></div>
      <div>
        <p className="expertise-en">{item.title}</p>
        <h3>{item.zh}</h3>
      </div>
      <p className="expertise-description">{item.description}</p>
      <div className="expertise-bullets">
        {item.bullets.map((bullet) => <span key={bullet}>{bullet}</span>)}
      </div>
    </article>
    </BorderGlow>
  )
}

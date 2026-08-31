import { ArrowUpRight } from 'lucide-react'

const items = [
  ['关于我', '#about'],
  ['工作经历', '#experience'],
  ['项目展示', '#works'],
  ['个人优势', '#expertise'],
]

export function HeaderNav() {
  return (
    <header className="hero-nav-shell">
      <a className="brand-mark" href="#top" aria-label="返回顶部">
        <span>LYH.</span>
      </a>
      <nav className="hero-nav" aria-label="主要导航">
        {items.map(([label, href]) => (
          <a key={href} href={href}>{label}</a>
        ))}
      </nav>
      <a className="contact-pill" href="#contact">
        联系我 <ArrowUpRight size={16} strokeWidth={1.8} />
      </a>
    </header>
  )
}

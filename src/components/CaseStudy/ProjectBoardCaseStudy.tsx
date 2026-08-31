import { ArrowDownRight, ArrowLeft } from 'lucide-react'
import { AuroraBackground } from '../Experience/AuroraBackground'
import './AcademicCaseStudy.css'
import './ProjectBoardCaseStudy.css'

type CaseConfig = {
  number: string; kicker: string; title: [string, string]; summary: string; period: string; scope: string
  overviewTitle: [string, string]; overview: string; focus: string[]
  boardImage: string; boardAlt: string; boardCopy: string; valueTitle: [string, string]; valueCopy: string
}

export function ProjectBoardCaseStudy({ config }: { config: CaseConfig }) {
  return <article className="case-study board-case-study">
    <header className="case-nav site-container">
      <a href="/#works" aria-label="返回作品首页项目列表"><ArrowLeft size={18}/> 返回作品</a>
      <span>2L. / CASE STUDY {config.number}</span>
    </header>
    <section className="case-hero case-hero--aurora case-hero--full-bleed-aurora site-container" data-case-section="hero">
      <AuroraBackground />
      <p className="case-kicker">{config.kicker}</p>
      <h1 style={{ fontSize: 'clamp(64px, 7.5vw, 136px)', lineHeight: .9, letterSpacing: '-0.05em' }}><span className="case-hero-title-mask"><span className="case-hero-title-line">{config.title[0]}</span></span><span className="case-hero-title-mask"><span className="case-hero-title-line case-hero-title-line--dim">{config.title[1]}</span></span></h1>
      <div className="case-hero-bottom"><p>{config.summary}</p><dl>
        <div><dt>ROLE</dt><dd>UI 设计师</dd></div><div><dt>PERIOD</dt><dd>{config.period}</dd></div><div><dt>SCOPE</dt><dd>{config.scope}</dd></div>
      </dl></div>
      <a className="case-scroll" href="#case-overview">EXPLORE CASE <ArrowDownRight size={17}/></a>
    </section>
    <section className="case-block site-container" id="case-overview" data-case-section="overview">
      <div className="case-label">01 / PROJECT OVERVIEW</div>
      <div className="case-intro"><h2 className="case-module-title case-overview-title"><span className="case-overview-line">{config.overviewTitle[0]}</span><span className="case-overview-line">{config.overviewTitle[1]}</span></h2><p>{config.overview}</p></div>
      <div className="board-case-focus">{config.focus.map((item, index) => <article key={item}><span>0{index + 1}</span><strong>{item}</strong></article>)}</div>
    </section>
    <section className="board-case-project" data-case-section="project-board">
      <div className="site-container board-case-project-heading"><div className="case-label">02 / FULL PROJECT BOARD</div><div className="case-intro"><h2 className="case-module-title">完整项目，<br/><span>完整呈现。</span></h2><p>{config.boardCopy}</p></div></div>
      <div className="board-case-stage"><a className="site-container" href={config.boardImage} target="_blank" rel="noreferrer" aria-label={`查看${config.title.join('')}项目原图`}><img src={config.boardImage} alt={config.boardAlt} loading="lazy" decoding="async"/></a></div>
    </section>
    <section className="case-value site-container" data-case-section="value"><span>03 / PROJECT VALUE</span><h2 className="case-module-title">{config.valueTitle[0]}<br/>{config.valueTitle[1]}</h2><div><p>{config.valueCopy}</p></div></section>
    <footer className="case-footer site-container" data-case-section="navigation"><a href="/#works" aria-label="返回项目列表"><ArrowLeft size={20}/> 返回项目列表</a><a href="/#contact">LET'S WORK TOGETHER <ArrowDownRight size={20}/></a></footer>
  </article>
}

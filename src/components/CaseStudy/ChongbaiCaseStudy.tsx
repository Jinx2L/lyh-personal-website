import { ArrowDownRight, ArrowLeft } from 'lucide-react'
import { AuroraBackground } from '../Experience/AuroraBackground'
import './AcademicCaseStudy.css'
import './ChongbaiCaseStudy.css'

export function ChongbaiCaseStudy() {
  return <article className="case-study chongbai-case">
    <header className="case-nav site-container">
      <a href="/#works" aria-label="返回作品首页项目列表"><ArrowLeft size={18}/> 返回作品</a>
      <span>2L. / CASE STUDY 02</span>
    </header>

    <section className="case-hero case-hero--aurora case-hero--full-bleed-aurora site-container" data-case-section="hero">
      <AuroraBackground />
      <p className="case-kicker">E-COMMERCE · MINI PROGRAM · CMS</p>
      <h1 style={{ fontSize: 'clamp(64px, 7.5vw, 136px)', lineHeight: .9, letterSpacing: '-0.05em' }}><span className="case-hero-title-mask"><span className="case-hero-title-line">重百云购</span></span><span className="case-hero-title-mask"><span className="case-hero-title-line case-hero-title-line--dim">小程序</span></span></h1>
      <div className="case-hero-bottom">
        <p>以组件化商城体验连接内容运营、商品转化与会员服务，持续推动小程序体验迭代与设计落地。</p>
        <dl>
          <div><dt>ROLE</dt><dd>UI 设计师</dd></div>
          <div><dt>PERIOD</dt><dd>2020.07-2025.07</dd></div>
          <div><dt>SCOPE</dt><dd>小程序 UI / CMS / 设计走查</dd></div>
        </dl>
      </div>
      <a className="case-scroll" href="#chongbai-overview">EXPLORE CASE <ArrowDownRight size={17}/></a>
    </section>

    <section className="case-block site-container" id="chongbai-overview" data-case-section="overview">
      <div className="case-label">01 / PROJECT OVERVIEW</div>
      <div className="case-intro">
        <h2 className="case-module-title case-overview-title"><span className="case-overview-line">商城内容更灵活，</span><span className="case-overview-line">运营转化更高效。</span></h2>
        <p>主导商城首页 CMS 组件化改版，设计 6 大类可配置组件与分佣全链路，持续完成小程序功能迭代与 UI 走查，保障开发还原度达 90% 以上。</p>
      </div>
      <div className="chongbai-metrics">
        <article><span>01</span><strong>6</strong><p>大类可配置 CMS 组件</p></article>
        <article><span>02</span><strong>90%+</strong><p>开发设计还原度</p></article>
        <article><span>03</span><strong>35%</strong><p>用户活跃度提升</p></article>
      </div>
    </section>

    <section className="chongbai-board-section" data-case-section="project-board">
      <div className="site-container chongbai-board-heading">
        <div className="case-label">02 / FULL PROJECT BOARD</div>
        <div className="case-intro">
          <h2 className="case-module-title">从策略梳理，<br/><span>到完整界面呈现。</span></h2>
          <p>从首页内容编排到商品转化与会员触达，构建可配置、可持续迭代的商城体验。</p>
        </div>
      </div>
      <div className="chongbai-board-stage">
        <a className="site-container" href="/assets/chongbai-case-study.jpg" target="_blank" rel="noreferrer" aria-label="查看重百云购小程序项目原图">
          <img src="/assets/chongbai-case-study.jpg" alt="重百云购小程序完整项目设计展示" loading="lazy" decoding="async"/>
        </a>
      </div>
    </section>

    <footer className="case-footer site-container" data-case-section="navigation">
      <a href="/#works" aria-label="返回项目列表"><ArrowLeft size={20}/> 返回项目列表</a>
      <a href="/#contact">LET'S WORK TOGETHER <ArrowDownRight size={20}/></a>
    </footer>
  </article>
}

import { SectionLabel } from '../common/SectionLabel'
import { RevealText } from '../common/RevealText'
import { MetricGrid } from './MetricGrid'
import TiltedCard from './TiltedCard'

export function About() {
  return (
    <section className="section site-container" id="about">
      <SectionLabel index="01" title="ABOUT ME" />
      <div className="about-grid">
        <div className="about-copy">
          <RevealText as="h2" className="display-heading">
            从复杂业务出发，<br />把信息、交互与视觉组织成<br /><span className="heading-dim">清晰的产品体验。</span>
          </RevealText>
          <RevealText as="p" className="body-copy about-body">
            拥有9+年 UI 设计经验，深耕 B 端系统与 App、H5、小程序等移动端产品设计，兼具 0‑1 搭建与大型项目迭代能力。擅长梳理业务信息流，从业务、用户、技术视角出发，搭建清晰可扩展的交互界面与设计规范，善用 Vibe coding辅助设计提升落地交付效率。
          </RevealText>
        </div>
        <div className="about-visual">
          <TiltedCard
            imageSrc="/assets/aboutme.jpg"
            altText="李意慧个人形象"
            captionText="2L.Designer - liyihui"
            containerHeight="var(--portrait-height)"
            containerWidth="100%"
            imageHeight="100%"
            imageWidth="100%"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={false}
          />
        </div>
      </div>
      <MetricGrid />
    </section>
  )
}

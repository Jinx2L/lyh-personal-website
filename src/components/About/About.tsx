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
            拥有 9+ 年 UI / 视觉设计经验，长期参与 B 端复杂系统、移动产品、电商与数据可视化设计。
            我习惯从业务、用户与技术三个维度理解问题，再通过信息架构、交互与视觉系统，让复杂内容变得可理解、可操作、可持续迭代。
          </RevealText>
        </div>
        <div className="about-visual">
          <TiltedCard
            imageSrc="/assets/aboutme.jpg"
            altText="李意慧个人形象"
            captionText="Designer-Liyihui"
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

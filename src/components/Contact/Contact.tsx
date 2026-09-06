import ScrollVelocity from './ScrollVelocity'
import './ContactInvitation.css'
import { ArrowUpRight, ArrowUp } from 'lucide-react'
import { contact } from '../../data/portfolio'
import { SectionLabel } from '../common/SectionLabel'

export function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="site-container contact-inner">
        <SectionLabel index="05" title="CONTACT" className="contact-label" />
        <div className="contact-invitation">
          <p>期待<br />一起探讨设计</p>
          <img src="/assets/aboutme.jpg" alt="李意慧个人形象" width={80} height={80} loading="lazy" decoding="async" />
        </div>
        <div className="contact-main">
          <p className="contact-kicker">AVAILABLE FOR SELECTED OPPORTUNITIES</p>
          <h2 aria-label="LET'S CREATE SOMETHING CLEAR.">
            <ScrollVelocity texts={["LET'S CREATE", 'SOMETHING CLEAR.']} velocity={100} />
          </h2>
          <p className="contact-cn contact-cn--wide-right" data-font-size="14px" data-alignment="right" data-wrapping="natural">重视业务价值、用户体验与细节落地，若觉得我的能力与岗位匹配，欢迎随时联系我</p>
        </div>
        <div className="contact-footer">
          <a href={`mailto:${contact.email}`}><span>Email</span><strong>{contact.email}</strong><ArrowUpRight size={18}/></a>
          <a href={`tel:${contact.phone}`}><span>Phone</span><strong>{contact.phone}</strong><ArrowUpRight size={18}/></a>
          <div><span>Location</span><strong>{contact.location}</strong></div>
          <a className="back-top" href="#top" aria-label="返回顶部"><ArrowUp size={18}/><span>Back to top</span></a>
        </div>
      </div>
    </section>
  )
}

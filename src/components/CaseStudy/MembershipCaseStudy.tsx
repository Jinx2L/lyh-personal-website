import { ProjectBoardCaseStudy } from './ProjectBoardCaseStudy'

export function MembershipCaseStudy() {
  return <ProjectBoardCaseStudy config={{
    number: '03', kicker: 'B2B · DATA PLATFORM · DESIGN SYSTEM', title: ['重百会员', '管理中心'],
    storyHero: {
      eyebrow: 'CASE STUDY 03 · MEMBERSHIP DATA PLATFORM · 2024',
      lines: ['小程序改版，', 'CMS模块，', '驱动门店线上化。'],
      titleLineHeight: 1,
      note: '让复杂数据转化为可读、可用的运营视角。',
      images: [1, 2, 3].map(index => ({ src: `/assets/membership-hero-illustration-${index}.webp`, alt: `会员管理首屏插图 ${index}` })),
    },
    summary: '围绕商超多业态会员运营，整合会员增长、消费转化与积分权益数据，构建清晰一致的数据运营后台。', period: '2023.11-2024.01', scope: 'B端后台 UI / 数据可视化 / 设计规范',
    overviewTitle: ['聚合会员数据，', '辅助运营决策。'], overview: '深度对齐零售业务统计口径，以信息分层和合理图表选型呈现核心指标，辅助运营人员快速研判业务数据与运营态势。',
    focus: ['会员增长', '消费转化', '积分权益', '多业态数据分析'],
    boardImage: '/assets/membership-case-study.jpg', boardAlt: '会员管理中心完整项目设计展示', boardCopy: '从数据看板到业务组件，呈现会员运营后台的完整设计体系。',
    valueTitle: ['把复杂数据，', '转化为清晰运营视角。'], valueCopy: '通过数据可视化和后台组件规范，提升业务研判效率，并保障多模块设计与开发落地的一致性。',
  }} />
}

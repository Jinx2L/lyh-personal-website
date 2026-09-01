import { ProjectBoardCaseStudy } from './ProjectBoardCaseStudy'

export function AutoCaseStudy() {
  return <ProjectBoardCaseStudy config={{
    number: '04', kicker: 'ENTERPRISE WECHAT · MINI PROGRAM', title: ['企微汽贸', '小程序'],
    storyHero: {
      eyebrow: 'CASE STUDY 04 · ENTERPRISE WECHAT · 2022',
      lines: ['企微汽贸', '小程序'],
      note: '缩短高频操作路径，让销售更专注于客户沟通。',
      tightMeta: true,
      titleLineHeight: 1,
      images: [1, 2].map(index => ({ src: `/assets/auto-hero-illustration-${index}.jpg`, alt: `企微汽贸首屏插图 ${index}` })),
    },
    summary: '面向汽车销售顾问，整合客户管理、营销任务与素材内容管理，赋能门店销售持续开展客户运营。', period: '2022.01-2022.05', scope: '小程序 UI / 交互 / 组件规范',
    overviewTitle: ['围绕销售流程，', '降低操作成本。'], overview: '结合真实业务场景梳理销售流程，优化客户线索跟进、任务处理和营销内容检索路径，让高频工作更直接高效。',
    focus: ['客户管理', '营销任务', '素材中心', '客户线索跟进'],
    boardImage: '/assets/auto-case-study-ui-07.jpg', boardAlt: '企微汽贸小程序完整项目设计展示', boardCopy: '从客户线索到营销素材，完整呈现销售顾问企微工作场景。',
    valueTitle: ['缩短操作路径，', '提升销售运营效率。'], valueCopy: '通过客户全链路与素材中心体验设计，帮助销售更高效地维护线索、执行任务并开展营销沟通。',
  }} />
}

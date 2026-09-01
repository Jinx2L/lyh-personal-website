import { ProjectBoardCaseStudy } from './ProjectBoardCaseStudy'

export function ChongbaiCaseStudy() {
  return <ProjectBoardCaseStudy config={{
    number: '02', kicker: 'E-COMMERCE · MINI PROGRAM · CMS', title: ['重百云购', '小程序'],
    storyHero: {
      eyebrow: 'CASE STUDY 02 · E-COMMERCE MINI PROGRAM · 2025',
      lines: ['重百云购', '小程序'],
      note: '以组件化体验连接内容运营、商品转化与会员服务。',
      tightMeta: true,
      titleLineHeight: 1,
      images: [1, 2].map(index => ({ src: `/assets/chongbai-hero-illustration-${index}.jpg`, alt: `重百云购首屏插图 ${index}` })),
    },
    summary: '以组件化商城体验连接内容运营、商品转化与会员服务，持续推动小程序体验迭代与设计落地。',
    period: '2020.07-2025.07', scope: '小程序 UI / CMS / 设计走查',
    overviewTitle: ['商城内容更灵活，', '运营转化更高效。'],
    overview: '主导商城首页 CMS 组件化改版，设计 6 大类可配置组件与分佣全链路，持续完成小程序功能迭代与 UI 走查，保障开发还原度达 90% 以上。',
    focus: ['CMS组件化', '分佣全链路', '90%+设计还原度', '35%用户活跃提升'],
    boardImage: '/assets/chongbai-case-study.jpg', boardAlt: '重百云购小程序完整项目设计展示',
    boardCopy: '从首页内容编排到商品转化与会员触达，构建可配置、可持续迭代的商城体验。',
    valueTitle: ['连接内容与商品，', '持续提升运营转化。'],
    valueCopy: '通过 CMS 组件化与完整分佣链路设计，提升运营配置效率，并保障长期迭代中的体验一致性。',
  }} />
}

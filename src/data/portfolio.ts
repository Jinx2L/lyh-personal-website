import type { ContactInfo, Experience, ExpertiseItem, Metric, Project } from '../types/portfolio'

export const experiences: Experience[] = [
  {
    company: '独立 UI 设计师',
    role: 'UI 设计师',
    period: '2025.09–至今',
    focus: [
      '为 10+ B 端及移动端客户提供 UI 设计服务，独立推进需求沟通、交互优化、视觉设计与开发落地',
      '参与产品从 0 到 1 设计，并将 AI 辅助设计与 Vibe Coding 融入原型验证和设计交付',
    ],
  },
  {
    company: '九章开物（重庆）科技有限公司',
    role: 'UI 设计师',
    period: '2020.07–2025.08',
    focus: [
      '具备电商营销活动及运营页面设计经验，参与 618、双11 等营销场景的页面设计与迭代。熟悉活动组件化设计及 CMS 页面搭建逻辑，能够兼顾视觉表现、营销信息传达与运营配置效率。',
    ],
  },
  {
    company: '马上消费金融股份有限公司',
    role: 'UI 设计师',
    period: '2016.11–2020.07',
    focus: [
      '参与安逸花 App 内嵌商城及相关业务系统的设计迭代，熟悉分期购物、金融信息展示及交易流程等业务场景。能够兼顾业务需求、用户体验与金融信息展示要求，优化关键操作路径及界面易用性。',
    ],
  },
  {
    company: '比邻优科技有限公司',
    role: 'UI 设计师',
    period: '2015.11–2016.11',
    focus: [
      '参与电商产品从 0 到 1 的 UI 设计，覆盖商品浏览、订单确认、支付及物流查询等核心场景',
      '优化页面信息层级与交易操作路径，提升购物体验与关键操作效率',
    ],
  },
]

export const metrics: Metric[] = [
  { value: '9+', label: 'Experience', note: '年经验' },
  { value: '90%+', label: 'Fidelity', note: '设计还原度' },
  { value: '0→1', label: 'PRODUCT', note: '产品构建' },
  { value: 'B+C', label: 'CROSS-PLATFORM', note: '跨端设计' },
]

export const projects: Project[] = [
  {
    id: '01',
    name: '学科知识服务平台',
    tags: ['AI', 'Knowledge Platform', 'Data Visualization'],
    year: '2026.03-2026.06',
    summary: '面向科研人员打造一站式学科知识服务平台，整合大模型检索、学者机构信息与学科趋势可视化，完成整套平台 UI 设计与视觉交互规范。',
    imageSrc: '/assets/project-academic-poster.jpg',
    videoSrc: '/assets/project-academic.mp4',
    visualKey: 'membership',
  },
  {
    id: '02',
    name: '重百云购小程序',
    tags: ['E-commerce', 'Mini Program', 'CMS'],
    year: '2020.07-2025.07',
    summary: '主导商城首页 CMS 组件化改版，设计 6 大类可配置组件与分佣全链路，持续完成小程序功能迭代与 UI 走查，保障开发还原度达 90% 以上。',
    metric: '35% 用户活跃度提升',
    imageSrc: '/assets/project-cloud.jpg',
    videoSrc: '/assets/project-chongbai.mp4',
    visualKey: 'cloud',
  },
  {
    id: '03',
    name: '重百会员管理中心',
    tags: ['B2B', 'Data Platform', 'Design System'],
    year: '2023.11-2024.01',
    summary: '围绕商超多业态会员运营，整合会员增长、消费转化与积分权益数据，构建数据可视化运营体系及后台设计规范，协同产品与研发完成落地验收。',
    imageSrc: '/assets/project-membership-poster.jpg',
    videoSrc: '/assets/project-membership-hover.mp4',
    visualKey: 'marketing',
  },
  {
    id: '04',
    name: '企微汽贸小程序',
    tags: ['Enterprise WeChat', 'Mini Program'],
    year: '2022.01-2022.05',
    summary: '面向汽车销售顾问，完成客户管理、营销任务与素材中心的 UI 及交互设计，优化线索跟进和内容检索流程，输出组件规范并跟进前端还原。',
    imageSrc: '/assets/project-auto-poster.jpg',
    videoSrc: '/assets/project-auto-hover.mp4',
    visualKey: 'auto',
  },
]

export const expertise: ExpertiseItem[] = [
  {
    id: '01',
    iconSrc: '/assets/expertise-systems.svg',
    title: 'Finance & Commerce',
    zh: '金融与电商产品',
    description: '熟悉分期购物、交易流程与电商运营场景，在业务转化、信息披露与用户体验之间取得平衡。',
    bullets: ['金融分期', '电商交易', '运营视觉'],
  },
  {
    id: '02',
    iconSrc: '/assets/expertise-data.svg',
    title: 'Multi-platform UX',
    zh: '多端体验设计',
    description: '覆盖 App、H5、小程序与 PC 管理平台，能够从信息架构到关键路径持续优化产品体验。',
    bullets: ['App / H5', '小程序', 'PC 管理平台'],
  },
  {
    id: '03',
    iconSrc: '/assets/expertise-mobile.svg',
    title: 'Modular Design System',
    zh: '组件化与设计系统',
    description: '通过运营组件、CMS 搭建逻辑与可复用规范，兼顾页面表现、配置效率和长期一致性。',
    bullets: ['CMS 组件', '设计规范', '响应式思维'],
  },
  {
    id: '04',
    iconSrc: '/assets/expertise-design.svg',
    title: 'AI-assisted Delivery',
    zh: 'AI 辅助与协作落地',
    description: '将 AI 辅助设计与 Vibe Coding 融入原型验证、方案推进和开发走查，提升交付效率。',
    bullets: ['AI 辅助设计', 'Vibe Coding', '开发走查'],
  },
]

export const contact: ContactInfo = {
  email: '845991323@qq.com',
  phone: '17711059534',
  location: '成都',
}

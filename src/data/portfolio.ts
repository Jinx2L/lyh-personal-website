import type { ContactInfo, Experience, ExpertiseItem, Metric, Project } from '../types/portfolio'

export const experiences: Experience[] = [
  {
    company: '独立 UI 设计师',
    role: 'UI 设计师',
    period: '2025.08–至今',
    focus: ['承接全链路 UI 设计项目', '独立负责客户需求对接到开发落地跟进'],
  },
  {
    company: '九章开物（重庆）科技有限公司',
    role: 'UI 设计师',
    period: '2020.07–2025.08',
    focus: ['B 端数据与营销平台', '从 0 到 1 / 设计系统 / 数据可视化'],
  },
  {
    company: '马上消费金融股份有限公司',
    role: 'UI 设计师',
    period: '2016.11–2020.07',
    focus: ['移动产品与电商体验', '后台系统 / 设计规范 / 双周迭代'],
  },
  {
    company: '比邻优科技有限公司',
    role: 'UI 设计师',
    period: '2015.11–2016.11',
    focus: ['移动端产品设计', '电商应用 / 全链路 UI 设计'],
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
    visualKey: 'cloud',
  },
  {
    id: '03',
    name: '重百会员管理中心',
    tags: ['B2B', 'Data Platform', 'Design System'],
    year: '2023.11-2024.01',
    summary: '围绕商超多业态会员运营，整合会员增长、消费转化与积分权益数据，构建数据可视化运营体系及后台设计规范，协同产品与研发完成落地验收。',
    imageSrc: '/assets/project-membership-poster.jpg',
    videoSrc: '/assets/project-membership.mp4',
    visualKey: 'marketing',
  },
  {
    id: '04',
    name: '企微汽贸小程序',
    tags: ['Enterprise WeChat', 'Mini Program'],
    year: '2022.01-2022.05',
    summary: '面向汽车销售顾问，完成客户管理、营销任务与素材中心的 UI 及交互设计，优化线索跟进和内容检索流程，输出组件规范并跟进前端还原。',
    imageSrc: '/assets/project-auto-poster.jpg',
    videoSrc: '/assets/project-auto.mp4',
    visualKey: 'auto',
  },
]

export const expertise: ExpertiseItem[] = [
  {
    id: '01',
    iconSrc: '/assets/expertise-systems.svg',
    title: 'Complex B2B Systems',
    zh: '复杂 B 端系统',
    description: '把高密度业务信息重新组织成可理解、可扩展、可持续迭代的产品结构。',
    bullets: ['信息架构', '多角色流程', '复杂业务界面'],
  },
  {
    id: '02',
    iconSrc: '/assets/expertise-data.svg',
    title: 'Data Visualization',
    zh: '数据可视化',
    description: '建立指标层级和图表语言，让数据从“看见”进一步走向“判断与行动”。',
    bullets: ['Dashboard', '指标层级', '数据钻取'],
  },
  {
    id: '03',
    iconSrc: '/assets/expertise-mobile.svg',
    title: 'Mobile & Commerce',
    zh: '移动与电商体验',
    description: '熟悉 App / H5 / 小程序设计规范，关注关键路径、转化效率与体验连续性。',
    bullets: ['App / H5', '小程序', '电商链路'],
  },
  {
    id: '04',
    iconSrc: '/assets/expertise-design.svg',
    title: 'Design System & Delivery',
    zh: '设计系统与落地',
    description: '通过组件体系、规范与 UI 走查，提升设计一致性和跨团队交付效率。',
    bullets: ['组件体系', '规范建设', '研发协作'],
  },
]

export const contact: ContactInfo = {
  email: '845991323@qq.com',
  phone: '17711059534',
  location: '成都',
}

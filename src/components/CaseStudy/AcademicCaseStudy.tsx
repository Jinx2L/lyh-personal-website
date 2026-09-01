import { ProjectBoardCaseStudy } from './ProjectBoardCaseStudy'

export function AcademicCaseStudy() {
  return <ProjectBoardCaseStudy config={{
    number: '01', kicker: 'AI赋能科研类B端知识服务平台', title: ['学科知识', '服务平台'],
    storyHero: {
      eyebrow: 'CASE STUDY 01 · AI KNOWLEDGE PLATFORM · 2026',
      lines: ['让复杂学科知识，', '易被检索、', '理解与连接。'],
      titleLineHeight: 1,
      note: 'AI 不替代判断，而是缩短寻找答案的路径。',
      images: [1, 2, 3].map(index => ({ src: `/assets/academic-hero-illustration-${index}.jpg`, alt: `学科知识首屏插图 ${index}` })),
    },
    summary: '依托大模型能力，整合文献检索、热点识别、术语解析、学者机构、虚拟专刊与智能投稿排版，构建一站式科研知识服务。',
    period: '2026.03-2026.06', scope: '全链路 UI / 视觉 / 交互规范',
    overviewTitle: ['智能检索重构，', '知识服务一站化。'],
    overview: '面向科研人员的高密度信息场景，重新梳理检索、研判与学术资源浏览链路，让复杂数据保持清晰、专业且易于持续使用。',
    focus: ['多维智能检索', '学科趋势可视化', '学者与机构信息', '专业术语解析'],
    boardImage: '/assets/academic-case-study.jpg', boardAlt: '学科知识服务平台完整项目设计展示',
    boardCopy: '从检索体验、学术资源到趋势分析，完整呈现科研知识服务平台的设计体系。',
    valueTitle: ['让科研信息', '更清晰、更可查、更可分析。'],
    valueCopy: '项目沉淀了高密度信息架构、AI 交互设计、数据可视化与跨团队落地能力。',
  }} />
}

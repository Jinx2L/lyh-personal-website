export type Experience = {
  company: string
  role: string
  period: string
  focus: string[]
}

export type Project = {
  id: string
  name: string
  tags: string[]
  year?: string
  summary: string
  metric?: string
  imageSrc: string
  videoSrc?: string
  visualKey: 'membership' | 'cloud' | 'marketing' | 'auto'
}

export type ExpertiseItem = {
  id: string
  title: string
  zh: string
  description: string
  bullets: string[]
}

export type ContactInfo = {
  email: string
  phone: string
  location: string
}

export type Metric = {
  value: string
  label: string
  note?: string
}

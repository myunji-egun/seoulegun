export interface FAQ {
  question: string
  answer: string
}

export interface TreatmentContent {
  boardCategory: string
  treatmentType: string
  title: string
  subtitle: string
  description: string
  richContent?: string   // 마크다운 형식 본문 (###, >, ---, - 지원)
  highlights?: { icon: string; label: string; desc: string }[]
  steps?: { title: string; desc?: string; icon?: string }[]
  indications?: string[]
  benefits: { tag: string; description: string; icon?: string }[]
  benefitsTitle?: string
  comparison?: {
    leftLabel: string
    rightLabel: string
    rows: { label: string; icon?: string; leftText: string; rightText: string }[]
  }
  bottomCta?: string
  faq: FAQ[]
  image?: string
  beforeImage?: string
  afterImage?: string
  beforeScale?: number
  videoUrl?: string
  bottomImage?: string
  sideImage?: string
  bottomVideoUrl?: string
}

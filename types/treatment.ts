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
  benefits: { tag: string; description: string }[]
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

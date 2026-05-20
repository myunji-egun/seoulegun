import type { Metadata } from 'next'
import TreatmentPage from '@/components/board/TreatmentPage'
import { orthodonticsTreatments } from '@/data/treatments'

export const metadata: Metadata = {
  title: '수원 인비절라인 투명교정 | 서울이건치과',
  description:
    '수원치과 서울이건치과 인비절라인 - 투명한 교정 장치로 눈에 띄지 않게 치아를 가지런히 교정합니다. 3D 디지털 시뮬레이션으로 치료 결과를 미리 확인하세요.',
  alternates: {
    canonical: 'https://egundc.com/invisalign',
  },
}

const invisalignTreatments = orthodonticsTreatments.filter(
  (t) => t.treatmentType === 'invisalign',
)

export default function InvisalignPage() {
  return (
    <TreatmentPage
      title="인비절라인 투명교정"
      subtitle="눈에 띄지 않게, 편안하게"
      treatments={invisalignTreatments}
      hideCases
      heroImage="/images/board/invisalign.jpg"
    />
  )
}

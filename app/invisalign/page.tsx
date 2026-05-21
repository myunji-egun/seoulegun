import type { Metadata } from 'next'
import TreatmentPage from '@/components/board/TreatmentPage'
import { orthodonticsTreatments } from '@/data/treatments'

export const metadata: Metadata = {
  title: '수원 인비절라인｜투명교정 상담 안내',
  description:
    '인비절라인 등 투명교정은 치아 배열, 교합 상태, 착용 시간에 따라 적합 여부가 달라질 수 있습니다. 상담을 통해 확인이 필요합니다.',
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
      title="수원 인비절라인 상담 안내"
      subtitle="치아 배열과 교합 상태를 먼저 확인합니다"
      treatments={invisalignTreatments}
      hideCases
      heroImage="/images/board/invisalign.jpg"
    />
  )
}

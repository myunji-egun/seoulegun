import type { Metadata } from 'next'
import TreatmentPage from '@/components/board/TreatmentPage'
import OrthodonticsIdentity from '@/components/board/OrthodonticsIdentity'
import { orthodonticsTreatments } from '@/data/treatments'

export const metadata: Metadata = {
  title: '영통 교정치과｜치아 배열과 교합 상담',
  description:
    '교정치료는 치아 배열뿐 아니라 교합, 얼굴형, 구강 상태를 함께 확인한 뒤 계획하는 것이 중요합니다.',
  alternates: {
    canonical: 'https://egundc.com/orthodontic',
  },
}

export default function OrthodonticPage() {
  return (
    <TreatmentPage
      title="영통 교정치료 상담 안내"
      subtitle="치아 배열과 교합을 함께 확인합니다"
      treatments={orthodonticsTreatments}
      hideCases
      heroImage="/images/board/ortho-doctor.jpg"
      extraSection={<OrthodonticsIdentity />}
    />
  )
}

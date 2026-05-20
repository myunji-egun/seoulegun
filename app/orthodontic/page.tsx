import type { Metadata } from 'next'
import TreatmentPage from '@/components/board/TreatmentPage'
import OrthodonticsIdentity from '@/components/board/OrthodonticsIdentity'
import { orthodonticsTreatments } from '@/data/treatments'

export const metadata: Metadata = {
  title: '수원 교정치료 인비절라인 | 서울이건치과',
  description:
    '수원치과 서울이건치과 교정 - 인비절라인 투명교정, 소아성장기교정 등 가지런한 치아를 위한 교정치료를 안내합니다.',
  alternates: {
    canonical: 'https://egundc.com/orthodontic',
  },
}

export default function OrthodonticPage() {
  return (
    <TreatmentPage
      title="서울이건 교정치료"
      subtitle="가지런한 치아, 건강한 교합"
      treatments={orthodonticsTreatments}
      hideCases
      heroImage="/images/board/ortho-doctor.jpg"
      extraSection={<OrthodonticsIdentity />}
    />
  )
}

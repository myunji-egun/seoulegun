// @TASK Board - 소아치과 페이지
import type { Metadata } from 'next'
import TreatmentPage from '@/components/board/TreatmentPage'
import PediatricIdentity from '@/components/board/PediatricIdentity'
import { pediatricTreatments } from '@/data/treatments'

export const metadata: Metadata = {
  title: '수원 소아치과 | 서울이건치과',
  description:
    '수원치과 서울이건치과 소아치과 - 소아 충치치료, 불소도포, 실란트, 성장기 교정 상담 등 아이의 첫 치과를 편안하게 안내합니다.',
  alternates: {
    canonical: 'https://egundc.com/pediatric',
  },
}

export default function PediatricPage() {
  return (
    <TreatmentPage
      title="소아치과 치료"
      subtitle="아이의 첫 치과, 편안하게"
      treatments={pediatricTreatments}
      hideCases
      extraSection={<PediatricIdentity />}
    />
  )
}

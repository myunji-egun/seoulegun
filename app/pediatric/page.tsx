// @TASK Board - 소아치과 페이지
import type { Metadata } from 'next'
import TreatmentPage from '@/components/board/TreatmentPage'
import PediatricIdentity from '@/components/board/PediatricIdentity'
import { pediatricTreatments } from '@/data/treatments'

export const metadata: Metadata = {
  title: '수원 소아치과｜아이 치아 관리와 진료 안내',
  description:
    '아이의 치아 성장, 충치 예방, 치열 발달 상태를 확인하고 연령에 맞는 진료 방향을 안내합니다.',
  alternates: {
    canonical: 'https://egundc.com/pediatric',
  },
}

export default function PediatricPage() {
  return (
    <TreatmentPage
      title="수원 소아치과 진료 안내"
      subtitle="아이의 치아 성장과 구강 관리를 함께 살펴봅니다"
      treatments={pediatricTreatments}
      hideCases
      heroImage="/images/treatments/childortho.jpg"
      extraSection={<PediatricIdentity />}
    />
  )
}

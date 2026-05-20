// @TASK Board - 임플란트 페이지
import type { Metadata } from 'next'
import TreatmentPage from '@/components/board/TreatmentPage'
import ImplantIdentity from '@/components/board/ImplantIdentity'
import { implantTreatments } from '@/data/treatments'

export const metadata: Metadata = {
  title: '수원 임플란트 | 서울이건치과',
  description:
    '수원치과 서울이건치과 임플란트 - 올온, 즉시로딩, 네비게이션, 상악동 거상술, 당뇨 환자 임플란트를 안내합니다.',
  alternates: {
    canonical: 'https://egundc.com/implant',
  },
}

export default function ImplantPage() {
  return (
    <TreatmentPage
      title="임플란트"
      subtitle="상실된 치아의 완벽한 복원 솔루션"
      treatments={implantTreatments}
      videoId="RkhAehLEia4"
      extraSection={<ImplantIdentity />}
    />
  )
}

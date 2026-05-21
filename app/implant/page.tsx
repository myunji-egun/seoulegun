// @TASK Board - 임플란트 페이지
import type { Metadata } from 'next'
import TreatmentPage from '@/components/board/TreatmentPage'
import ImplantIdentity from '@/components/board/ImplantIdentity'
import { implantTreatments } from '@/data/treatments'

export const metadata: Metadata = {
  title: '수원 임플란트｜치료 전 확인해야 할 사항',
  description:
    '임플란트 치료는 잇몸뼈, 교합, 전신질환 여부에 따라 계획이 달라질 수 있습니다. 정확한 진단은 치과 상담을 통해 확인이 필요합니다.',
  alternates: {
    canonical: 'https://egundc.com/implant',
  },
}

export default function ImplantPage() {
  return (
    <TreatmentPage
      title="수원 임플란트 치료 안내"
      subtitle="상실된 치아를 회복하는 방법"
      treatments={implantTreatments}
      videoId="RkhAehLEia4"
      extraSection={<ImplantIdentity />}
    />
  )
}

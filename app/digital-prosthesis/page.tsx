import type { Metadata } from 'next'
import TreatmentPage from '@/components/board/TreatmentPage'
import CosmeticIdentity from '@/components/board/CosmeticIdentity'
import { cosmeticTreatments } from '@/data/treatments'

export const metadata: Metadata = {
  title: '수원 심미보철 라미네이트 | 서울이건치과',
  description:
    '수원치과 서울이건치과 심미보철 - 라미네이트, 올세라믹 크라운, 잇몸미백 등 자연스러운 아름다움을 되찾는 치료를 안내합니다.',
  alternates: {
    canonical: 'https://egundc.com/digital-prosthesis',
  },
}

export default function DigitalProsthesisPage() {
  return (
    <TreatmentPage
      title="심미보철"
      subtitle="자연스러운 아름다움을 되찾습니다"
      treatments={cosmeticTreatments}
      heroImage="/images/board/esthetic-2.jpg"
      extraSection={<CosmeticIdentity />}
    />
  )
}

// @TASK Board - 자연치아 살리기 페이지
import type { Metadata } from 'next'
import TreatmentPage from '@/components/board/TreatmentPage'
import NaturalToothIdentity from '@/components/board/NaturalToothIdentity'
import { naturalToothTreatments } from '@/data/treatments'

export const metadata: Metadata = {
  title: '수원 충치치료 · 자연치아 살리기 | 서울이건치과',
  description:
    '수원치과 서울이건치과 - 충치치료, VPT 신경보존술, 근관치료, 잇몸치료 등 자연치아를 최대한 보존하는 치료를 안내합니다.',
}

export default function NaturalToothPage() {
  return (
    <TreatmentPage
      title="자연치아 살리기"
      subtitle="치과 치료의 기본입니다"
      treatments={naturalToothTreatments}
      videoId="pYzA7tc55lo"
      extraSection={<NaturalToothIdentity />}
    />
  )
}

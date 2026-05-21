import type { Metadata } from 'next'
import AccessSection from '@/components/about/AccessSection'

export const metadata: Metadata = {
  title: '서울이건치과 오시는 길｜수원 영통 매탄동 치과',
  description:
    '서울이건치과 위치, 진료시간, 본관·별관 안내, 주차 정보를 확인하실 수 있습니다.',
  alternates: {
    canonical: 'https://egundc.com/location',
  },
}

export default function LocationPage() {
  return (
    <main className="pt-20 sm:pt-24">
      <h1 className="sr-only">서울이건치과 오시는 길</h1>
      <AccessSection />
    </main>
  )
}

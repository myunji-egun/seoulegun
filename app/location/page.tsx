import type { Metadata } from 'next'
import AccessSection from '@/components/about/AccessSection'

export const metadata: Metadata = {
  title: '수원 서울이건치과 오시는 길 | 위치·교통·주차 안내',
  description:
    '수원 서울이건치과 오시는 길 - 영통구 위브하늘채 후문 위치, 버스·주차 안내. 파리바게트 건물 2층 본관, GS마트·뜰커피 건물 3층 별관.',
  alternates: {
    canonical: 'https://egundc.com/location',
  },
}

export default function LocationPage() {
  return (
    <main className="pt-20 sm:pt-24">
      <h1 className="sr-only">수원 서울이건치과 오시는 길 - 위치 및 교통 안내</h1>
      <AccessSection />
    </main>
  )
}

import type { Metadata } from 'next'
import AnchorNav from '@/components/about/AnchorNav'
import PhilosophySection from '@/components/about/PhilosophySection'
import DoctorProfileSection from '@/components/about/DoctorProfileSection'
import ScheduleSection from '@/components/about/ScheduleSection'
import InteriorSection from '@/components/about/InteriorSection'
import LabSection from '@/components/about/LabSection'
import AccessSection from '@/components/about/AccessSection'

export const metadata: Metadata = {
  title: '서울이건치과 소개｜수원 영통 치과',
  description:
    '서울이건치과의 진료 철학, 의료진, 진료 공간, 본관·별관 운영 안내를 확인하실 수 있습니다.',
  alternates: {
    canonical: 'https://egundc.com/about',
  },
}

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* SEO h1 */}
      <h1 className="sr-only">서울이건치과 소개</h1>

      {/* 페이지 히어로 - 영상 배경 */}
      <div className="relative h-[72vh] min-h-[520px] overflow-hidden bg-black">
        <iframe
          src="https://www.youtube.com/embed/-Bahgt23YHo?autoplay=1&mute=1&loop=1&playlist=-Bahgt23YHo&controls=0&showinfo=0&modestbranding=1&playsinline=1"
          className="absolute left-1/2 top-[44%] h-[120vh] min-h-full w-[213.33vh] min-w-[112vw] -translate-x-1/2 -translate-y-1/2"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="서울이건치과 소개 영상"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 앵커 내비게이션 (sticky) */}
      <AnchorNav />

      {/* 섹션들 */}
      <PhilosophySection />
      <DoctorProfileSection />
      <ScheduleSection />
      <InteriorSection />
      <LabSection />
      <AccessSection />
    </div>
  )
}

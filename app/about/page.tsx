import type { Metadata } from 'next'
import AnchorNav from '@/components/about/AnchorNav'
import PhilosophySection from '@/components/about/PhilosophySection'
import DoctorProfileSection from '@/components/about/DoctorProfileSection'
import ScheduleSection from '@/components/about/ScheduleSection'
import InteriorSection from '@/components/about/InteriorSection'
import LabSection from '@/components/about/LabSection'
import AccessSection from '@/components/about/AccessSection'

export const metadata: Metadata = {
  title: '수원치과 이건치과소개 | 서울이건치과',
  description:
    '수원치과 서울이건치과 - 서울대 출신 원장 2인의 진료 철학, 의료진 소개, 진료일정, 내부전경, 디지털 기공소, 오시는길을 안내합니다.',
}

export default function AboutPage() {
  return (
    <>
      {/* SEO h1 */}
      <h1 className="sr-only">수원치과 서울이건치과 소개 - 서울대 출신 원장 2인 책임진료</h1>

      {/* 페이지 히어로 - 영상 배경 */}
      <div className="relative aspect-video sm:aspect-auto sm:h-[70vh] overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/-Bahgt23YHo?autoplay=1&mute=1&loop=1&playlist=-Bahgt23YHo&controls=0&showinfo=0&modestbranding=1&playsinline=1"
          className="absolute inset-0 w-full h-full"
          style={{ transform: 'scale(1.2)' }}
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
    </>
  )
}

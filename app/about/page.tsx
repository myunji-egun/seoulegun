import type { Metadata } from 'next'
import AnchorNav from '@/components/about/AnchorNav'
import AboutScrollSnap from '@/components/about/AboutScrollSnap'
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

      <AboutScrollSnap />

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

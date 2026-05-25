'use client'

import { useRef } from 'react'
import HeroSlider from '@/components/main/HeroSlider'
import DoctorGroup from '@/components/main/DoctorGroup'
import PreserveTreatSection from '@/components/main/PreserveTreatSection'
import ImplantSection from '@/components/main/ImplantSection'
import ImplantTypeSection from '@/components/main/ImplantTypeSection'
import ImplantFaqSection from '@/components/main/ImplantFaqSection'
import SedationSection from '@/components/main/SedationSection'
import CleanSection from '@/components/main/CleanSection'
import MediaSection from '@/components/main/MediaSection'
import MapSection from '@/components/main/MapSection'
import Footer from '@/components/layout/Footer'
// TreatmentCarousel 비활성 (파일은 유지)
// import TreatmentCarousel from '@/components/main/TreatmentCarousel'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <h1 className="sr-only">수원 영통 서울이건치과</h1>
      {/* Desktop: scroll-snap fullpage */}
      <div
        ref={containerRef}
        className="home-page hidden md:block h-screen overflow-y-scroll"
        style={{
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
        }}
      >
        {(
          [
            HeroSlider,
            DoctorGroup,
            ImplantSection,
            ImplantTypeSection,
            ImplantFaqSection,
            PreserveTreatSection,
            SedationSection,
            CleanSection,
            MediaSection,
            MapSection,
          ] as React.ComponentType[]
        ).map((Section, i) => (
          <div
            key={i}
            style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
          >
            <Section />
          </div>
        ))}
        <div style={{ scrollSnapAlign: 'start' }}>
          <Footer />
        </div>
      </div>

      {/* Mobile: 히어로+의료진은 snap, 나머지는 일반 스크롤 */}
      <div className="home-page md:hidden">
        {/* Snap container — 첫 두 섹션만 */}
        <div
          className="overflow-y-auto"
          style={{
            height: '100dvh',
            scrollSnapType: 'y mandatory',
          } as React.CSSProperties}
        >
          <div style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always', minHeight: '100dvh' }}>
            <HeroSlider />
          </div>
          <div style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always', minHeight: '100dvh' }}>
            <DoctorGroup />
          </div>
        </div>

        {/* 이후 섹션: 일반 스크롤 */}
        <ImplantSection />
        <ImplantTypeSection />
        <ImplantFaqSection />
        <SedationSection />
        <CleanSection />
        <MediaSection />
        <MapSection />
        <Footer />
      </div>
    </>
  )
}

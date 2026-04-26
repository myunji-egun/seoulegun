'use client'

import { useRef } from 'react'
import HeroSlider from '@/components/main/HeroSlider'
import DoctorGroup from '@/components/main/DoctorGroup'
import NaturalSolution from '@/components/main/NaturalSolution'
import PreserveTreatSection from '@/components/main/PreserveTreatSection'
import ImplantSection from '@/components/main/ImplantSection'
import SedationSection from '@/components/main/SedationSection'
import CleanSection from '@/components/main/CleanSection'
import MediaSection from '@/components/main/MediaSection'
import MapSection from '@/components/main/MapSection'
// TreatmentCarousel 비활성 (파일은 유지)
// import TreatmentCarousel from '@/components/main/TreatmentCarousel'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {/* Desktop: scroll-snap fullpage */}
      <div
        ref={containerRef}
        className="hidden md:block h-screen overflow-y-scroll"
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
            NaturalSolution,
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
      </div>

      {/* Mobile: scroll-snap fullpage */}
      <div
        className="md:hidden h-screen overflow-y-scroll"
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
      </div>
    </>
  )
}

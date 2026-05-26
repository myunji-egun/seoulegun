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
import HomeScrollSnap from '@/components/main/HomeScrollSnap'

const SECTIONS = [
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

export default function Home() {
  return (
    <>
      <h1 className="sr-only">수원 영통 서울이건치과</h1>
      <HomeScrollSnap />

      {/* 데스크탑: h-screen 스크롤 컨테이너 (CSS snap 제거, JS snap 적용) */}
      <div
        id="home-desktop"
        className="home-page hidden md:block h-screen overflow-y-scroll"
      >
        {SECTIONS.map((Section, i) => (
          <div key={i}>
            <Section />
          </div>
        ))}
        <div>
          <Footer />
        </div>
      </div>

      {/* 모바일: 모든 섹션 일반 문서 흐름, JS snap 적용 */}
      <div id="home-mobile" className="home-page md:hidden">
        <HeroSlider />
        <DoctorGroup />
        <ImplantSection />
        <ImplantTypeSection />
        <ImplantFaqSection />
        <PreserveTreatSection />
        <SedationSection />
        <CleanSection />
        <MediaSection />
        <MapSection />
        <Footer />
      </div>
    </>
  )
}

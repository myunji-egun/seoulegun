'use client'

import { GraduationCap, UsersRound } from 'lucide-react'
import { doctors } from '@/data/doctors'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import DoctorTeamSection from '@/components/about/DoctorTeamSection'

const DOCTOR_ORDER = ['lee-jaesung', 'jung-chaeyun', 'yoo-suhyun', 'baek-seola', 'park-jiwon']

function DoctorCard({
  doctor,
  index,
}: {
  doctor: (typeof doctors)[0]
  index: number
}) {
  const isReverse = index % 2 === 1
  const { ref, isVisible } = useScrollReveal(0.08)
  const mergedRef = (node: HTMLElement | null) => {
    (ref as React.MutableRefObject<HTMLElement | null>).current = node
  }

  return (
    <article
      ref={mergedRef}
      id={doctor.id}
      className={`w-full scroll-mt-24 ${isReverse ? 'bg-[#F8F8F8]' : 'bg-white'}`}
    >
      <div
        className={`flex flex-col lg:flex-row lg:items-stretch w-full max-w-[1400px] mx-auto ${isVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
        style={isVisible ? { animationDelay: '0.05s' } : undefined}
      >
        {/* 사진 — 카드 전체 높이 채움 */}
        <div className="flex-shrink-0 w-full lg:w-[440px] lg:self-stretch">
          <img
            src={doctor.image}
            alt={`${doctor.name} ${doctor.role}`}
            className="w-full h-[340px] lg:h-full object-cover object-top block"
          />
        </div>

        {/* 텍스트 영역 */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-12 lg:py-16">

          {/* 이름 */}
          <h2 className="text-[26px] lg:text-[38px] font-bold leading-[1.3] tracking-[-0.02em] text-[#2E2E2E]">
            {doctor.name} {doctor.role}
          </h2>

          {/* 구분선 */}
          <div className="w-full h-px bg-gray-300 mt-4 mb-4 lg:mt-5 lg:mb-5" />

          {/* 전문과 — 구분선 아래 */}
          <span className="block text-[15px] lg:text-[24px] font-normal leading-[1.4] tracking-[-0.015em] text-[#1D458F] mb-4 lg:mb-6">
            {doctor.specialtyDetail ?? doctor.specialty}
          </span>

          {/* 약력 — 경력(좌) + 학회(우) 2컬럼 */}
          <div className="flex flex-col sm:flex-row gap-x-12">
            <ul>
              {doctor.careers.map((c, i) => (
                <li
                  key={i}
                  className={`text-[13px] lg:text-[17px] leading-[28px] tracking-[-0.01em] ${
                    i === 0
                      ? 'font-bold text-[#2E2E2E]'
                      : 'font-normal text-[#5C5C5C]'
                  }`}
                >
                  • {c}
                </li>
              ))}
            </ul>
            {doctor.memberships && doctor.memberships.length > 0 && (
              <ul className="mt-2 sm:mt-0">
                {doctor.memberships.map((m, i) => (
                  <li key={i} className="text-[13px] lg:text-[17px] font-normal leading-[28px] tracking-[-0.01em] text-[#5C5C5C]">
                    • {m}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 한 마디 */}
          {doctor.letter && (
            <p className="mt-8 lg:mt-10 text-[14px] lg:text-[20px] font-bold leading-[1.8] tracking-[-0.01em] text-[#2E2E2E] whitespace-pre-line">
              {doctor.letter}
            </p>
          )}
        </div>

        {/* 자격증 이미지 (documents 있을 때만) */}
        {doctor.documents && doctor.documents.length > 0 && (
          <div className="flex flex-row gap-4 px-6 py-12 lg:px-8 lg:py-16 flex-shrink-0 items-center">
            {doctor.documents.map((doc, i) => (
              <img
                key={i}
                src={doc}
                alt={`${doctor.name} 자격증 ${i + 1}`}
                className="h-[160px] lg:h-[260px] w-auto object-cover block"
              />
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default function DoctorProfileSection() {
  const { ref, isVisible } = useScrollReveal(0.15)
  const displayDoctors = [...doctors].sort(
    (a, b) => DOCTOR_ORDER.indexOf(a.id) - DOCTOR_ORDER.indexOf(b.id)
  )

  return (
    <section
      id="doctor-profile"
      className="bg-stone-50 scroll-mt-36"
      aria-labelledby="doctors-heading"
    >
      {/* 섹션 헤더 — 풀페이지 */}
      <div
        id="doctor-intro"
        className="relative min-h-screen flex items-center overflow-hidden scroll-mt-36 bg-white lg:bg-transparent"
      >
        {/* 배경 이미지 */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            backgroundImage: "url('/images/clinic/egun-outerior.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 70%',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="absolute inset-0 hidden lg:block" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 100%)' }} />

        {/* 모바일 헤더 */}
        <div className="relative z-10 w-full px-5 py-10 lg:hidden">
          <div className="mx-auto max-w-[390px] rounded-[28px] bg-white">
            <p className="mb-8 text-center text-[16px] font-semibold text-gray-700">
              의료진 소개
            </p>
            <h2 className="text-center text-[24px] font-bold leading-snug text-gray-900">
              <span className="text-[#0080C8]">서울대학교 출신 대표원장 2인</span>
              <br />
              전문의료진으로 구성된
              <br />
              서울이건치과
            </h2>
            <div className="mt-7 overflow-hidden rounded-[18px] bg-stone-50 shadow-[0_12px_34px_rgba(43,45,66,0.08)]">
              <img
                src="/images/doctors/doctors-mobile-v2-crop.png"
                alt="서울이건치과 의료진"
                className="w-full h-auto"
              />
            </div>
            <p className="mt-7 text-center text-[16px] font-medium leading-relaxed text-gray-600">
              풍부한 경험과 전문성을 갖춘 의료진이
              <br />
              처음부터 끝까지 책임진료합니다.
            </p>
            <div className="mt-8 grid grid-cols-2 rounded-[18px] bg-[#0057B8] px-5 py-6 text-white shadow-[0_12px_26px_rgba(0,87,184,0.28)]">
              <div className="flex flex-col items-center justify-center gap-3 border-r border-white/30 px-2 text-center">
                <GraduationCap className="h-9 w-9 text-white" strokeWidth={1.6} />
                <p className="text-[15px] font-semibold leading-relaxed">
                  서울대학교 출신
                  <br />
                  대표원장 2인
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 px-2 text-center">
                <UsersRound className="h-9 w-9 text-white" strokeWidth={1.6} />
                <p className="text-[15px] font-semibold leading-relaxed">
                  분야별 전문의
                  <br />
                  협진 진료
                </p>
              </div>
            </div>
            <p className="mt-7 text-center text-[15px] font-medium leading-relaxed text-gray-500">
              꾸준한 연구와 학술활동으로 더 나은 진료를 약속드립니다.
            </p>
          </div>
        </div>

        {/* 데스크탑 헤더 */}
        <div ref={ref} className="relative z-10 hidden max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 lg:block">
          <p
            className={`text-[20px] font-semibold tracking-[0.25em] uppercase text-[#0080c8] mb-4 ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.95), 0 0 15px rgba(0,128,200,0.5)' }}
          >
            Our Doctors
          </p>
          <h2
            id="doctors-heading"
            className={`text-[32px] sm:text-[38px] lg:text-[46px] font-normal text-white leading-tight ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            style={isVisible ? { animationDelay: '0.1s' } : undefined}
          >
            한자리에서<br />
            <span style={{ color: '#ffffff', textShadow: '0 0 20px rgba(0,128,200,0.9), 0 2px 12px rgba(0,0,0,0.95)' }}>변하지 않는 마음</span>
          </h2>
          <p
            className={`mt-6 text-[26px] sm:text-[28px] text-white/75 max-w-2xl leading-relaxed ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            style={isVisible ? { animationDelay: '0.2s' } : undefined}
          >
            각자의 전문 분야에서 최선을 다하며<br />
            언제나 같은 자리에서 기다리고 있습니다.
          </p>
        </div>
      </div>

      {/* 이건진료진 카드 그리드 */}
      <DoctorTeamSection />

      {/* 원장님 카드 — 각각 */}
      {displayDoctors.map((doctor, index) => (
        <DoctorCard key={doctor.id} doctor={doctor} index={index} />
      ))}
    </section>
  )
}

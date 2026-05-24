'use client'

import { GraduationCap, Award, UsersRound } from 'lucide-react'
import { doctors } from '@/data/doctors'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import DoctorTeamSection from '@/components/about/DoctorTeamSection'

const DOCTOR_ORDER = ['lee-jaesung', 'jung-chaeyun', 'yoo-suhyun', 'baek-seola', 'park-jiwon']

function DoctorCard({
  doctor,
}: {
  doctor: (typeof doctors)[0]
}) {
  const { ref, isVisible } = useScrollReveal(0.08)
  const mergedRef = (node: HTMLElement | null) => {
    (ref as React.MutableRefObject<HTMLElement | null>).current = node
  }

  return (
    <article ref={mergedRef} id={doctor.id} className="relative overflow-hidden bg-white py-24 scroll-mt-36 sm:py-28">
      <div className="pointer-events-none absolute right-[-80px] top-1/2 h-[720px] w-[720px] -translate-y-1/2 rounded-full bg-[#0080C8]/[0.035]" />
      <div className="pointer-events-none absolute right-10 top-24 text-[260px] font-black leading-none text-gray-900/[0.025]">G</div>
      <div className="relative z-10 max-w-[1680px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* 섹션 레이블 */}
        <div className={`hidden items-center gap-2 mb-4 ${isVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}>
          <GraduationCap size={18} className="text-[#0080C8]" />
          <p className="text-base font-semibold text-gray-700">의료진 소개</p>
          <div className="mt-1 w-8 h-0.5 bg-[#0080C8]" />
        </div>

        {/* 메인 카드 — 3컬럼 */}
        <div className={`grid grid-cols-1 items-end gap-12 lg:grid-cols-[0.82fr_0.92fr_1fr] lg:gap-16 ${isVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
          style={isVisible ? { animationDelay: '0.05s' } : undefined}>

          {/* 1열: 사진 */}
          <div className="relative flex min-h-[560px] items-end justify-center lg:min-h-[720px]">
            <img
              src={doctor.image}
              alt={`${doctor.name} ${doctor.role}`}
              className="relative z-10 h-[560px] w-auto max-w-full object-contain object-bottom lg:h-[720px]"
            />
          </div>

          {/* 2열: 이름 + 편지 */}
          <div className="flex flex-col justify-between pb-8 lg:pb-20">
            <div>
              <p className="mb-3 text-[18px] font-semibold tracking-wide text-gray-500">
                {doctor.specialtyDetail ?? doctor.specialty}
              </p>
              <h3 className="text-[42px] font-black text-gray-900 mb-1 leading-tight">
                {doctor.name}{' '}
                <span className="font-bold">{doctor.role}</span>
              </h3>
              {doctor.subRole && (
                <p className="mt-3 text-[20px] font-medium text-gray-600">{doctor.subRole}</p>
              )}
              <div className="w-16 h-1 rounded-full bg-[#0080C8] mt-7 mb-10" />
            </div>

            {doctor.letter && (
              <div className="relative">
                <span className="text-5xl text-[#0080C8]/20 font-serif select-none leading-none block mb-2">❝</span>
                <p className="text-[20px] text-gray-700 leading-[2] italic whitespace-pre-line"
                  style={{ fontFamily: "'Georgia', 'Nanum Myeongjo', serif" }}>
                  {doctor.letter}
                </p>
                <p className="mt-5 text-[18px] font-semibold" style={{ color: '#0080C8' }}>
                  — {doctor.name} {doctor.role}
                </p>
              </div>
            )}

            {/* 자격증 이미지 */}
            {doctor.documents && doctor.documents.length > 0 && (
              <div className="flex gap-5 mt-8">
                {doctor.documents.map((doc, i) => (
                  <img
                    key={i}
                    src={doc}
                    alt={`${doctor.name} 자격증 ${i + 1}`}
                    className="h-56 w-40 object-cover shadow-[0_18px_45px_rgba(43,45,66,0.12)] ring-1 ring-gray-200 sm:h-64 sm:w-44"
                  />
                ))}
              </div>
            )}
          </div>

          {/* 3열: 학력·경력 + 학회 */}
          <div className="flex flex-col gap-12 pb-8 lg:pb-20">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <GraduationCap size={20} className="text-[#0080C8]" />
                <h4 className="font-bold text-gray-900 text-[20px]">학력 · 경력</h4>
              </div>
              <ul className="space-y-5">
                {doctor.careers.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 text-[18px] text-gray-700 leading-relaxed">
                    <span className="text-[#0080C8] shrink-0 mt-1">•</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {doctor.memberships && doctor.memberships.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <Award size={20} className="text-[#0080C8]" />
                  <h4 className="font-bold text-gray-900 text-[20px]">학회 활동 및 수료</h4>
                </div>
                <ul className="space-y-5">
                  {doctor.memberships.map((m, i) => (
                    <li key={i} className="flex items-start gap-3 text-[18px] text-gray-700 leading-relaxed">
                      <span className="text-[#0080C8] shrink-0 mt-1">•</span>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

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

        <div ref={ref} className="relative z-10 hidden max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 lg:block">
        <p className={`text-[20px] font-semibold tracking-[0.25em] uppercase text-[#0080c8] mb-4 ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.95), 0 0 15px rgba(0,128,200,0.5)' }}>
  Our Doctors
          </p>
          <h2 id="doctors-heading"
            className={`text-[32px] sm:text-[38px] lg:text-[46px] font-normal text-white leading-tight ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            style={isVisible ? { animationDelay: '0.1s' } : undefined}>
            한자리에서<br />
            <span style={{ color: '#ffffff', textShadow: '0 0 20px rgba(0,128,200,0.9), 0 2px 12px rgba(0,0,0,0.95), 0 4px 25deg rgba(0,0,0,0.8)' }}>변하지 않는 마음</span>
          </h2>
          <p className={`mt-6 text-[26px] sm:text-[28px] text-white/75 max-w-2xl leading-relaxed ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            style={isVisible ? { animationDelay: '0.2s' } : undefined}>
            각자의 전문 분야에서 최선을 다하며<br />
            언제나 같은 자리에서 기다리고 있습니다.
          </p>
        </div>
      </div>

      {/* 이건진료진 카드 그리드 */}
      <DoctorTeamSection />

      {/* 원장님 카드 — 각각 */}
      {displayDoctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </section>
  )
}

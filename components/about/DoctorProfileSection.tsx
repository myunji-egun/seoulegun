'use client'

import { GraduationCap, Award, UsersRound } from 'lucide-react'
import { doctors } from '@/data/doctors'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import DoctorTeamSection from '@/components/about/DoctorTeamSection'

function DoctorCard({
  doctor,
}: {
  doctor: (typeof doctors)[0]
}) {
  const { ref, isVisible } = useScrollReveal(0.1)
  const mergedRef = (node: HTMLElement | null) => {
    (ref as React.MutableRefObject<HTMLElement | null>).current = node
  }

  return (
    <article ref={mergedRef} id={doctor.id} className="py-16 sm:py-20 scroll-mt-36">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 섹션 레이블 */}
        <div className={`flex items-center gap-2 mb-6 ${isVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}>
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">의료진 소개</p>
        </div>

        {/* 메인 카드 */}
        <div className={`rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 bg-[#EEF4FA] ${isVisible ? 'scroll-reveal-scale' : 'scroll-hidden'}`}
          style={isVisible ? { animationDelay: '0.05s' } : undefined}>

          {/* 왼쪽: 사진 */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px] overflow-hidden">
            <img
              src={doctor.image}
              alt={`${doctor.name} ${doctor.role}`}
              className="w-full h-full object-cover object-top"
            />
            {doctor.documents && doctor.documents.length > 0 && (
              <div className="absolute bottom-4 left-4 flex gap-2">
                {doctor.documents.map((doc, i) => (
                  <img
                    key={i}
                    src={doc}
                    alt={`${doctor.name} 자격증 ${i + 1}`}
                    className="w-32 h-40 object-cover rounded-lg shadow-xl border-2 border-white"
                  />
                ))}
              </div>
            )}
          </div>

          {/* 오른쪽: 정보 + 학력·경력 */}
          <div className="p-8 lg:p-10 flex flex-col gap-6">
            {/* 전문 분야 태그 + 이름 */}
            <div>
              <p className="text-[17px] text-gray-500 mb-3 tracking-wide">
                {doctor.specialtyDetail ?? doctor.specialty}
              </p>
              <h3 className="text-4xl sm:text-5xl font-black text-gray-900 mb-1 leading-tight">
                {doctor.name}{' '}
                <span className="font-bold">{doctor.role}</span>
              </h3>
              {doctor.subRole && (
                <p className="text-base text-gray-600 mt-1">{doctor.subRole}</p>
              )}
              <div className="w-8 h-0.5 bg-[#0080C8] mt-3" />
            </div>

            {/* 학력·경력 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap size={15} className="text-[#0080C8]" />
                <h4 className="font-semibold text-gray-700 text-[15px]">학력 · 경력</h4>
              </div>
              <ul className="space-y-2">
                {doctor.careers.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-[15px] text-gray-700 leading-relaxed">
                    <span className="text-[#0080C8] shrink-0 mt-0.5">•</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* 학회 활동 및 수료 */}
            {doctor.memberships && doctor.memberships.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Award size={15} className="text-[#0080C8]" />
                  <h4 className="font-semibold text-gray-700 text-[15px]">학회 활동 및 수료</h4>
                </div>
                <ul className="space-y-2">
                  {doctor.memberships.map((m, i) => (
                    <li key={i} className="flex items-start gap-2 text-[15px] text-gray-700 leading-relaxed">
                      <span className="text-[#0080C8] shrink-0 mt-0.5">•</span>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* 편지 — 풀너비 하단, 필기체 */}
        {doctor.letter && (
          <div className={`mt-5 rounded-3xl bg-[#EEF4FA] px-10 py-8 relative ${isVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
            style={isVisible ? { animationDelay: '0.2s' } : undefined}>
            <span className="absolute top-5 left-8 text-6xl text-[#0080C8]/15 font-serif select-none leading-none">❝</span>
            <p className="text-xl sm:text-2xl text-gray-700 leading-[2] italic whitespace-pre-line pl-10" style={{ fontFamily: "'Georgia', 'Nanum Myeongjo', serif" }}>
              {doctor.letter}
            </p>
            <p className="mt-4 pl-10 text-base font-semibold" style={{ color: '#0080C8' }}>
              — {doctor.name} {doctor.role}
            </p>
          </div>
        )}

      </div>
    </article>
  )
}

export default function DoctorProfileSection() {
  const { ref, isVisible } = useScrollReveal(0.15)

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
        {/* 배경 이미지 — 세로 기준 중하방 노출 */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            backgroundImage: "url('/images/clinic/egun-outerior.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 70%',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* 어두운 오버레이 */}
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
          <p className={`text-[14px] font-semibold tracking-[0.25em] uppercase text-[#92DCE5] mb-4 ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}>
            Our Doctors
          </p>
          <h2 id="doctors-heading"
            className={`text-[22px] sm:text-[28px] lg:text-[36px] font-normal text-white leading-tight ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            style={isVisible ? { animationDelay: '0.1s' } : undefined}>
            한자리에서<br />
            <span style={{ color: '#92DCE5' }}>변하지 않는 마음</span>
          </h2>
          <p className={`mt-6 text-[16px] sm:text-[18px] text-white/75 max-w-2xl leading-relaxed ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            style={isVisible ? { animationDelay: '0.2s' } : undefined}>
            각자의 전문 분야에서 최선을 다하며<br />
            언제나 같은 자리에서 기다리고 있습니다.
          </p>
        </div>
      </div>

      {/* 이건진료진 카드 그리드 */}
      <DoctorTeamSection />

      {/* 원장님 카드 — 각각 */}
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </section>
  )
}

'use client'

import { useRef } from 'react'
import { GraduationCap, UsersRound } from 'lucide-react'
import { doctors } from '@/data/doctors'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import DoctorTeamSection from '@/components/about/DoctorTeamSection'

function DoctorCard({
  doctor,
  index,
}: {
  doctor: (typeof doctors)[0]
  index: number
}) {
  const { ref, isVisible } = useScrollReveal(0.15)

  const mergedRef = (node: HTMLElement | null) => {
    (ref as React.MutableRefObject<HTMLElement | null>).current = node
  }

  return (
    <article
      ref={mergedRef}
      id={doctor.id}
      className="min-h-screen lg:h-screen flex items-center py-12 lg:py-0"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-10 items-stretch">

          {/* 왼쪽: 이름 + 학력·경력 (위 정렬) */}
          <div className="flex flex-col justify-start space-y-4 lg:order-1">
            <div>
              <p className={`text-[20px] font-semibold tracking-[0.2em] uppercase text-[#0080C8] mb-1 ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
                style={isVisible ? { animationDelay: '0.3s' } : undefined}>
                {doctor.specialtyDetail ?? doctor.specialty}
              </p>
              <h3 className={`text-[24px] sm:text-[26px] font-bold text-gray-900 mb-0.5 ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
                style={isVisible ? { animationDelay: '0.4s' } : undefined}>
                {doctor.name} {doctor.role}
              </h3>
              <div className={`w-8 h-0.5 bg-[#0080C8] mt-2 ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
                style={isVisible ? { animationDelay: '0.5s' } : undefined} />
            </div>

            {doctor.careers && doctor.careers.length > 0 && (
              <div>
                <h4 className={`text-[16px] font-semibold text-gray-500 uppercase tracking-wider mb-2 ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
                  style={isVisible ? { animationDelay: '0.6s' } : undefined}>
                  학력 · 경력
                </h4>
                <ul className="space-y-1.5">
                  {doctor.careers.map((career, i) => (
                    <li key={i} className={`flex items-start gap-2 ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
                      style={isVisible ? { animationDelay: `${0.7 + i * 0.1}s` } : undefined}>
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[#0080C8] shrink-0" />
                      <span className="text-[18px] text-gray-700 leading-relaxed">{career}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 중앙: 사진 */}
          <div className="lg:order-2 flex items-center justify-center">
            <div className={`relative overflow-hidden rounded-2xl aspect-[3/4] w-[290px] sm:w-[340px] lg:w-[400px] bg-stone-100 shadow-md mx-auto ${isVisible ? 'scroll-reveal-scale' : 'scroll-hidden'}`}>
              <img
                src={doctor.image}
                alt={`${doctor.name} ${doctor.role}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#0080C8] text-white text-[14px] font-semibold px-2.5 py-0.5 rounded-full">
                {doctor.role}
              </div>
            </div>
          </div>

          {/* 오른쪽: 졸업장 + 편지 (아래 정렬) */}
          <div className="flex flex-col justify-end gap-4 lg:order-3">
            {/* 졸업장 이미지 2열 */}
            {doctor.documents && doctor.documents.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {doctor.documents.map((src, i) => (
                  <div
                    key={i}
                    className={`aspect-[3/4] rounded-xl overflow-hidden border-2 border-stone-200 bg-stone-100 shadow-sm ${isVisible ? 'scroll-reveal-right' : 'scroll-hidden'}`}
                    style={isVisible ? { animationDelay: `${0.4 + i * 0.15}s` } : undefined}
                  >
                    <img
                      src={src}
                      alt={`${doctor.name} ${doctor.role} 자격증 ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {doctor.letter && (
              <div className={`bg-stone-50 border border-stone-200 rounded-xl p-4 relative ${isVisible ? 'scroll-reveal-right' : 'scroll-hidden'}`}
                style={isVisible ? { animationDelay: `${0.7 + (doctor.careers?.length ?? 0) * 0.1 + 0.2}s` } : undefined}>
                <span className="absolute top-3 right-4 text-[26px] text-[#0080C8]/20 font-serif leading-none select-none">&ldquo;</span>
                <p className="text-[18px] sm:text-[20px] text-gray-700 leading-relaxed pr-6 italic whitespace-pre-line text-right">
                  {doctor.letter}
                </p>
                <p className="text-right text-[16px] text-[#0080C8] font-semibold mt-2">
                  — {doctor.name} {doctor.role}
                </p>
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
            className={`text-[32px] sm:text-[42px] lg:text-[54px] font-bold text-white leading-tight ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
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

      {/* 원장님 카드 — 각각 풀페이지 */}
      {doctors.map((doctor, index) => (
        <DoctorCard key={doctor.id} doctor={doctor} index={index} />
      ))}
    </section>
  )
}

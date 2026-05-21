'use client'

import { GraduationCap, Award, UsersRound } from 'lucide-react'
import { doctors, Doctor } from '@/data/doctors'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import DoctorTeamSection from '@/components/about/DoctorTeamSection'

// 페이지별 그룹: [이재성·정채윤], [유수현·박지원], [백설아]
const doctorGroups: Doctor[][] = [
  [doctors[0], doctors[1]],
  [doctors[2], doctors[3]],
  [doctors[4]],
]

function DoctorPageCard({ doctor }: { doctor: Doctor }) {
  return (
    <div id={doctor.id} className="rounded-2xl overflow-hidden bg-[#EEF4FA] flex h-full scroll-mt-36">
      {/* 왼쪽: 사진 — 얼굴부터 상체 기준, 전체 카드 높이에 맞춤 */}
      <div className="w-[40%] flex-shrink-0 overflow-hidden relative">
        <img
          src={doctor.image}
          alt={`${doctor.name} ${doctor.role}`}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      </div>

      {/* 오른쪽: 약력 → 학회 → 편지 */}
      <div className="flex-1 p-4 flex flex-col gap-2 overflow-hidden">
        {/* 이름 */}
        <div>
          <p className="text-xs text-gray-500 mb-1 tracking-wide">
            {doctor.specialtyDetail ?? doctor.specialty}
          </p>
          <h3 className="text-xl font-black text-gray-900 leading-tight">
            {doctor.name} <span className="font-bold">{doctor.role}</span>
          </h3>
          {doctor.subRole && (
            <p className="text-xs text-gray-500 mt-0.5">{doctor.subRole}</p>
          )}
          <div className="w-6 h-0.5 bg-[#0080C8] mt-1.5" />
        </div>

        {/* 학력·경력 */}
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <GraduationCap size={12} className="text-[#0080C8]" />
            <h4 className="font-semibold text-gray-700 text-xs">학력 · 경력</h4>
          </div>
          <ul className="space-y-0.5">
            {doctor.careers.map((c, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-gray-700 leading-relaxed">
                <span className="text-[#0080C8] shrink-0">•</span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* 학회 활동 및 수료 */}
        {doctor.memberships && doctor.memberships.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Award size={12} className="text-[#0080C8]" />
              <h4 className="font-semibold text-gray-700 text-xs">학회 활동 및 수료</h4>
            </div>
            <ul className="space-y-0.5">
              {doctor.memberships.map((m, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-gray-700 leading-relaxed">
                  <span className="text-[#0080C8] shrink-0">•</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 자격증 이미지 — 학회 아래, 편지 위 */}
        {doctor.documents && doctor.documents.length > 0 && (
          <div className="flex gap-2">
            {doctor.documents.map((doc, i) => (
              <img
                key={i}
                src={doc}
                alt={`${doctor.name} 자격증 ${i + 1}`}
                className="w-32 h-44 object-cover rounded-md shadow-md border border-gray-200"
              />
            ))}
          </div>
        )}

        {/* 편지 — 약력 아래, 우측 컬럼 하단 */}
        {doctor.letter && (
          <div className="mt-auto rounded-xl bg-[#E5EFF8] px-4 py-3 relative">
            <span className="absolute top-2 left-3 text-2xl text-[#0080C8]/15 font-serif select-none leading-none">❝</span>
            <p
              className="text-xs text-gray-700 leading-relaxed italic whitespace-pre-line pl-5"
              style={{ fontFamily: "'Georgia', 'Nanum Myeongjo', serif" }}
            >
              {doctor.letter}
            </p>
            <p className="mt-1.5 pl-5 text-xs font-semibold" style={{ color: '#0080C8' }}>
              — {doctor.name} {doctor.role}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function DoctorGroupSection({ group }: { group: Doctor[] }) {
  const { ref, isVisible } = useScrollReveal(0.05)

  return (
    <div ref={ref} className="h-screen flex flex-col py-5 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col flex-1 min-h-0">
        <div className={`flex items-center gap-2 mb-3 flex-shrink-0 ${isVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}>
          <p className="text-2xl font-bold text-gray-900">의료진 소개</p>
        </div>
        <div
          className={`flex-1 min-h-0 grid gap-4 ${group.length === 2 ? 'grid-cols-2' : 'grid-cols-1 max-w-2xl mx-auto w-full'} ${isVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
          style={isVisible ? { animationDelay: '0.05s' } : undefined}
        >
          {group.map((doctor) => (
            <DoctorPageCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
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
          <p className={`text-[24px] font-semibold tracking-[0.25em] uppercase text-[#92DCE5] mb-4 ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}>
            Our Doctors
          </p>
          <h2
            id="doctors-heading"
            className={`text-[32px] sm:text-[38px] lg:text-[46px] font-normal text-white leading-tight ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            style={isVisible ? { animationDelay: '0.1s' } : undefined}
          >
            한자리에서<br />
            <span style={{ color: '#92DCE5' }}>변하지 않는 마음</span>
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

      {/* 원장님 그룹 — 페이지별 */}
      {doctorGroups.map((group, i) => (
        <DoctorGroupSection key={i} group={group} />
      ))}
    </section>
  )
}

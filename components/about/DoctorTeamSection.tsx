'use client'

import { useState } from 'react'
import { doctors } from '@/data/doctors'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const HOVER_SPECIALTY: Record<string, string> = {
  'lee-jaesung':  '임플란트, 고난도진료',
  'jung-chaeyun': '임플란트, 고난도진료',
  'yoo-suhyun':   '교정진료',
  'park-jiwon':   '보존진료, 일반진료',
  'baek-seola':   '소아진료',
}

export default function DoctorTeamSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const { ref, isVisible } = useScrollReveal(0.15)

  const handleClick = (doctorId: string) => {
    const el = document.getElementById(doctorId)
    if (!el) return
    const OFFSET = 144
    const top = el.getBoundingClientRect().top + window.scrollY - OFFSET
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section ref={ref} id="doctors" className="py-16 sm:py-24 bg-[#F8F7F9] border-b border-gray-100 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 타이틀 */}
        <div className={`mb-10 sm:mb-14 ${isVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}>
          <p className="text-xs tracking-[0.35em] uppercase text-[#0080C8] mb-2">Medical Team</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">이건진료진</h2>
          <div className="mt-3 w-10 h-0.5 bg-[#0080C8]" />
        </div>

        {/* 원장님 카드 그리드 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {doctors.map((doctor, i) => {
            const isHovered = hoveredId === doctor.id
            return (
              <div
                key={doctor.id}
                className={`flex flex-col ${isVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
                style={isVisible ? { animationDelay: `${i * 0.1}s` } : undefined}
                onMouseEnter={() => setHoveredId(doctor.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* 카드 위 진료과목 라벨 (항상 공간 차지, 호버 시 표시) */}
                <div className="h-7 flex items-center mb-2">
                  <p
                    className="transition-opacity duration-300"
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#0080C8',
                      opacity: isHovered ? 1 : 0,
                    }}
                  >
                    {HOVER_SPECIALTY[doctor.id]}
                  </p>
                </div>

                {/* 카드 버튼 */}
                <button
                  className="relative rounded-2xl overflow-hidden cursor-pointer text-left group focus:outline-none"
                  style={{ aspectRatio: '3/4' }}
                  onClick={() => handleClick(doctor.id)}
                  aria-label={`${doctor.name} ${doctor.role} 소개 보기`}
                >
                  {/* 사진 */}
                  <img
                    src={doctor.image}
                    alt={`${doctor.name} ${doctor.role}`}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* 기본 하단 그라디언트 + 이름 */}
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-4"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
                    }}
                  >
                    <p className="text-[11px] tracking-[0.2em] uppercase text-[#92DCE5] font-medium mb-0.5">
                      {doctor.specialty}
                    </p>
                    <p className="text-white font-bold text-base leading-tight">
                      {doctor.name}
                    </p>
                    <p className="text-white/70 text-[12px]">{doctor.role}</p>
                  </div>

                  {/* 호버 오버레이: 약력 */}
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-4 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,64,128,0.92) 0%, rgba(0,64,128,0.6) 50%, rgba(0,0,0,0.1) 100%)',
                      opacity: isHovered ? 1 : 0,
                    }}
                  >
                    <p className="text-[11px] tracking-[0.2em] uppercase text-[#92DCE5] font-medium mb-1">
                      {doctor.specialty}
                    </p>
                    <p className="text-white font-bold text-base mb-2 leading-tight">
                      {doctor.name} {doctor.role}
                    </p>
                    <ul className="space-y-1">
                      {doctor.careers.slice(0, 3).map((career, j) => (
                        <li key={j} className="text-white/85 text-[11px] leading-snug flex items-start gap-1">
                          <span className="text-[#92DCE5] mt-0.5 shrink-0">·</span>
                          {career}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-[11px] text-[#92DCE5] font-medium tracking-wide">
                      자세히 보기 →
                    </p>
                  </div>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

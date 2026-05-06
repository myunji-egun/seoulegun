'use client'

import { clinicInfo } from '@/data/clinic-info'
import { Clock } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const SCHEDULE = [
  { day: '월', hours: '09:30 - 18:30' },
  { day: '화', hours: '09:30 - 20:30', note: '야간' },
  { day: '수', hours: '09:30 - 18:30' },
  { day: '목', hours: '09:30 - 20:30', note: '교정야간' },
  { day: '금', hours: '09:30 - 20:30', note: '야간' },
  { day: '토', hours: '09:30 - 13:30' },
]

export default function MapSection() {
  const { ref, isVisible } = useScrollReveal(0.2)

  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden">
      {/* 지도 이미지 배경 */}
      <img
        src="/images/clinic/map.png"
        alt="서울이건치과 위치 지도"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 카드 컨테이너 - 세로 중앙 정렬 */}
      <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-4 md:pl-10">
        <div className="flex flex-col gap-3 max-w-[340px] w-[calc(100vw-2rem)] md:w-auto">
          {/* 치과 정보 카드 */}
          <div className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-5 md:p-6 ${isVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}>
            <img
              src="/images/logo/egun-logo%20(1).svg?v=2"
              alt="서울이건치과"
              className="h-10 mb-3"
            />
            <div className="w-8 h-0.5 bg-[var(--e-primary)] mb-3" />
            <a
              href={`tel:${clinicInfo.phone}`}
              className="block text-xl md:text-2xl font-bold text-gray-900 tracking-wide mb-2 hover:text-[var(--e-primary)] transition-colors"
            >
              {clinicInfo.phone}
            </a>
            <p className="text-xs text-gray-600 leading-relaxed mb-3">
              경기도 수원시 영통구<br />
              인계로220번길 6-3 미산빌딩 2층
            </p>
            <a
              href={`https://map.kakao.com/link/to/서울이건치과 수원점,${clinicInfo.latitude},${clinicInfo.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#FEE500] hover:bg-[#F5DC00] text-[#3C1E1E] font-semibold text-xs py-2.5 rounded-lg transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2C6.48 2 2 5.58 2 10c0 2.8 1.8 5.27 4.55 6.72L12 22l5.45-5.28C20.2 15.27 22 12.8 22 10c0-4.42-4.48-8-10-8z" fill="#3C1E1E"/>
                <circle cx="12" cy="10" r="3" fill="#FEE500"/>
              </svg>
              카카오맵 길찾기
            </a>
          </div>

          {/* 진료시간 카드 */}
          <div className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden ${isVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
            style={isVisible ? { animationDelay: '0.15s' } : undefined}>
            {/* 헤더 */}
            <div className="bg-[var(--e-primary)] px-4 py-2.5 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-white" aria-hidden="true" />
              <span className="text-white font-semibold text-xs">진료시간</span>
            </div>

            {/* 시간표 */}
            <div className="divide-y divide-gray-100">
              {SCHEDULE.map((item) => (
                <div key={item.day} className="flex items-center px-4 py-2.5">
                  <span className="w-8 text-xs font-medium text-gray-700 shrink-0">
                    {item.day}
                  </span>
                  <span className="text-xs text-gray-800 tabular-nums">
                    {item.hours}
                  </span>
                  {item.note && (
                    <span className="ml-2 text-[10px] font-medium text-[var(--e-primary)] bg-[var(--e-primary)]/10 px-2 py-0.5 rounded-full">
                      {item.note}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* 하단 안내 */}
            <div className="px-4 py-2.5 bg-gray-50/80 text-[10px] text-gray-400">
              점심 {clinicInfo.lunchTime} · 일요일/공휴일 휴진
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

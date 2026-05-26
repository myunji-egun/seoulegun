'use client'

import { clinicInfo } from '@/data/clinic-info'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const KAKAO_HREF = `https://map.kakao.com/link/to/서울이건치과 수원점,${clinicInfo.latitude},${clinicInfo.longitude}`

const KakaoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2C6.48 2 2 5.58 2 10c0 2.8 1.8 5.27 4.55 6.72L12 22l5.45-5.28C20.2 15.27 22 12.8 22 10c0-4.42-4.48-8-10-8z" fill="#3C1E1E"/>
    <circle cx="12" cy="10" r="3" fill="#FEE500"/>
  </svg>
)

export default function MapSection() {
  const { ref, isVisible } = useScrollReveal(0.2)

  return (
    <section ref={ref} className="relative w-full">
      {/* 지도 이미지 — 모바일 고정 높이 / 데스크탑 fullscreen */}
      <div className="relative w-full h-[220px] md:h-screen">
        <img
          src="/images/clinic/map.png"
          alt="서울이건치과 위치 지도"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 데스크탑: 왼쪽 정보 카드 */}
        <div className="hidden md:flex absolute inset-y-0 left-0 z-10 items-center pl-10">
          <div className="scale-[0.8] origin-top-left">
            <div className={`w-[240px] bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 md:p-5 ${isVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}>
              <img
                src="/images/logo/egun-logo%20(1).svg?v=2"
                alt="서울이건치과"
                className="h-12 mb-3"
              />
              <div className="w-8 h-0.5 bg-[var(--e-primary)] mb-3" />
              <a
                href={`tel:${clinicInfo.phone}`}
                className="block text-lg md:text-xl font-bold text-gray-900 tracking-wide mb-2 hover:text-[var(--e-primary)] transition-colors"
              >
                {clinicInfo.phone}
              </a>
              <p className="text-[11px] text-gray-600 leading-relaxed mb-3">
                경기도 수원시 영통구<br />
                인계로220번길 6-3 미산빌딩 2층
              </p>
              <a
                href={KAKAO_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#FEE500] hover:bg-[#F5DC00] text-[#3C1E1E] font-semibold text-[11px] py-2 rounded-lg transition-colors"
              >
                <KakaoIcon />
                카카오맵 길찾기
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* 모바일 전용: 지도 아래 카드 영역 */}
      <div className="md:hidden bg-white px-4 pt-5 pb-6 flex flex-col gap-4">

        {/* 정보 카드 */}
        <div className="bg-white rounded-xl shadow border border-gray-100 p-4">
          <img
            src="/images/logo/egun-logo%20(1).svg?v=2"
            alt="서울이건치과"
            className="h-9 mb-3"
          />
          <div className="w-8 h-0.5 bg-[var(--e-primary)] mb-3" />
          <a
            href={`tel:${clinicInfo.phone}`}
            className="flex items-center text-lg font-bold text-gray-900 tracking-wide mb-2 hover:text-[var(--e-primary)] transition-colors min-h-[44px]"
          >
            {clinicInfo.phone}
          </a>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            경기도 수원시 영통구<br />
            인계로220번길 6-3 미산빌딩 2층
          </p>
          <a
            href={KAKAO_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#FEE500] hover:bg-[#F5DC00] text-[#3C1E1E] font-semibold text-sm rounded-lg transition-colors min-h-[44px]"
          >
            <KakaoIcon />
            카카오맵 길찾기
          </a>
        </div>


      </div>
    </section>
  )
}

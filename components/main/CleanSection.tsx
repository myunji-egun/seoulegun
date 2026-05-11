'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function CleanSection() {
  const { ref, isVisible } = useScrollReveal(0.15)

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: '#F8F7F9' }}
    >
      {/* ── 모바일: 배경 풀스크린 이미지 ─────────────────────── */}
      <div className="md:hidden absolute inset-0">
        <img
          src="/images/clinic/clean.jpg"
          alt="멸균 소독 과정"
          className="w-full h-full object-cover"
        />
        {/* 텍스트 가독성 오버레이 */}
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* ── 데스크탑: 2-column 레이아웃 ──────────────────────── */}
      <div className="relative z-10 h-full max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-24">

        {/* 텍스트 영역 */}
        <div>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 md:text-[#2B2D42] text-white ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
          >
            감염관리도
            <br />
            하나의 진료입니다
          </h2>

          <p
            className={`text-base md:text-lg leading-relaxed mb-8 md:text-[#2B2D42] text-white/90 ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            style={isVisible ? { animationDelay: '0.15s' } : undefined}
          >
            <span style={{ color: '#92DCE5', fontWeight: 600 }}>서울이건치과</span>는 치료 결과만큼이나
            <br />
            그 과정의 안전함을 중요하게 생각합니다.
            <br className="hidden md:block" />
            모든 진료 기구는 개인별로 구분 사용 후{' '}
            <span className="whitespace-nowrap">
              <span style={{ color: '#92DCE5', fontWeight: 600 }}>철저한 멸균 과정</span>을 거치며,
            </span>
            <br className="hidden md:block" />
            진료실과 장비 역시 매일{' '}
            <span style={{ color: '#92DCE5', fontWeight: 600 }}>위생 점검</span>과{' '}
            <span style={{ color: '#92DCE5', fontWeight: 600 }}>소독</span>을 진행합니다.
          </p>

          <a
            href="https://fromel.biz/business/system/"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block px-6 py-3 rounded-2xl text-white text-base font-medium transition-opacity hover:opacity-80 ${isVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
            style={{ backgroundColor: '#0080C8', ...(isVisible ? { animationDelay: '0.3s' } : {}) }}
          >
            믿을 수 있는 위생 시스템
          </a>
        </div>

        {/* 이미지 영역 — 데스크탑만 표시 */}
        <div
          className={`hidden md:block w-full h-[400px] lg:h-[480px] rounded-2xl overflow-hidden shadow-xl ${isVisible ? 'scroll-reveal-right' : 'scroll-hidden'}`}
          style={isVisible ? { animationDelay: '0.1s' } : undefined}
        >
          <img
            src="/images/clinic/clean.jpg"
            alt="개별 멸균 포장된 진료 기구"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Bottom Accent — 데스크탑만 */}
      <div
        className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 h-1 w-32 rounded-full"
        style={{ backgroundColor: '#0080C8' }}
      />
    </section>
  )
}

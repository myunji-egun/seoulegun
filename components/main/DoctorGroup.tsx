'use client'

import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function DoctorGroup() {
  const { ref, isVisible } = useScrollReveal(0.3)

  return (
    <section className="h-screen w-full relative overflow-hidden">
      {/* 배경 이미지 - 모바일/PC 동일 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/doctors/doctors_1.jpg)' }}
      />

      {/* 텍스트 오버레이 */}
      {/* 하단 그라데이션 오버레이 */}
      <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(43,45,66,0.45) 0%, transparent 100%)' }} />

      <div ref={ref} className="relative z-10 h-full flex flex-col items-center justify-center px-4 pb-32 -mt-[118px]">
        <h2 className={`text-[32px] sm:text-[38px] md:text-[46px] lg:text-[52px] font-bold text-gray-900 text-center leading-[1.2] tracking-tight mb-5 ${isVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}>
          한자리에서 <span style={{ color: 'var(--e-primary)' }}>변하지 않는 마음</span>
        </h2>

        <p className={`text-[30px] sm:text-[34px] md:text-[38px] text-gray-700 text-center tracking-wide mb-10 ${isVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}
          style={isVisible ? { animationDelay: '0.2s' } : undefined}>
          <span style={{ color: 'var(--e-primary)', fontWeight: 700 }}>서울대학교</span> 출신 2인 대표원장
        </p>

        <Link
          href="/about#doctors"
          className={`text-sm font-medium transition-all duration-200 px-5 py-2 rounded-full ${isVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
          style={{
            color: 'var(--e-primary)',
            border: '1.5px solid var(--e-primary)',
            ...(isVisible ? { animationDelay: '0.4s' } : {}),
          }}
        >
          자세히보기 →
        </Link>
      </div>
    </section>
  )
}

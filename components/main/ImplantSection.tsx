'use client'

import Link from 'next/link'
import { ChevronDown, Plus } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function ImplantSection() {
  const { ref, isVisible } = useScrollReveal(0.2)

  return (
    <section
      ref={ref}
      className="h-screen w-full relative overflow-hidden flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: '#000' }}
    >
      {/* ── 모바일: cover 풀스크린 슬라이딩 배경 ── */}
      <div
        className="md:hidden absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/images/allon/all-on-slide.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          animation: 'bg-pan-slide 16s ease-in-out infinite alternate',
        }}
      />
      {/* ── 데스크탑: 300% 와이드 슬라이딩 배경 ── */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/images/allon/all-on-slide.jpg)',
          backgroundSize: '300% auto',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          animation: 'bg-pan-slide 16s ease-in-out infinite alternate',
        }}
      />
      {/* 다크 오버레이 — 텍스트 가독성 */}
      <div className="absolute inset-0 bg-black/70 pointer-events-none" />

      {/* ── 콘텐츠 ───────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <p className={`tracking-[0.4em] uppercase text-stone-500 mb-4 ${isVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`} style={{ fontSize: '14px' }}>
          Implant Solution
        </p>
        <h2
          className={`text-xl md:text-2xl lg:text-3xl text-stone-300 font-light text-center mb-1 leading-tight ${isVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}
          style={isVisible ? { animationDelay: '0.12s' } : undefined}
        >
          상실된 치아, 완벽한 복원
        </h2>
        <p
          className={`text-sm text-stone-500 mb-6 ${isVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}
          style={isVisible ? { animationDelay: '0.2s' } : undefined}
        >
          디지털 정밀 진단 기반 임플란트
        </p>

        {/* All on 4 대형 타이틀 */}
        <div
          className={`mb-8 md:mb-10 ${isVisible ? 'scroll-reveal-scale' : 'scroll-hidden'}`}
          style={isVisible ? { animationDelay: '0.3s' } : undefined}
        >
          <span
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight select-none"
            style={{
              background: 'linear-gradient(135deg, var(--e-primary) 0%, var(--e-accent) 50%, var(--e-primary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            All on 4
          </span>
          <p className="text-stone-500 tracking-widest mt-1 uppercase" style={{ fontSize: '14px' }}>Full-Arch Rehabilitation</p>
        </div>

        {/* 특징 */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8 text-center">
          {[
            { label: '당일 임시치아', desc: '수술 당일 식사 가능' },
            { label: '디지털 가이드', desc: '오차 ±0.1mm 정밀 식립' },
            { label: '의식하 진정', desc: '공포 없는 수술 환경' },
          ].map((feat, i) => (
            <div
              key={feat.label}
              className={`flex flex-col items-center ${isVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
              style={isVisible ? { animationDelay: `${0.45 + i * 0.1}s` } : undefined}
            >
              <p className="font-bold mb-0.5" style={{ fontSize: '18px', color: 'var(--e-accent)' }}>{feat.label}</p>
              <p style={{ fontSize: '16px', color: 'rgb(214 211 209)' }}>{feat.desc}</p>
            </div>
          ))}
        </div>

        <Link
          href="/implant"
          className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-stone-300 rounded-full border border-stone-600 hover:border-stone-400 hover:text-white transition-all duration-300 group ${isVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
          style={isVisible ? { animationDelay: '0.8s' } : undefined}
        >
          자세히 보기
          <Plus size={14} className="group-hover:rotate-90 transition-transform duration-300" aria-hidden="true" />
        </Link>
      </div>

      {/* Scroll Down */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-stone-600 tracking-widest" style={{ fontSize: '14px' }}>
        <span>SCROLL DOWN</span>
        <ChevronDown size={16} className="animate-bounce" aria-hidden="true" />
      </div>
    </section>
  )
}

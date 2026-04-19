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
      {/* ── 배경 이미지 2장 — 하단에 크게 깔림 ─────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/images/allon/all-on%20(1).jpg"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-[55%] h-[68%] object-cover opacity-60"
          style={{ maskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 55%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 55%, transparent 100%)' }}
        />
        <img
          src="/images/allon/all-on%20(2).jpg"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 right-0 w-[55%] h-[68%] object-cover opacity-60"
          style={{ maskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 55%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 55%, transparent 100%)' }}
        />
        {/* 중앙 이미지 겹침 블렌드 */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, transparent 0%, #000 70%)' }} />
      </div>

      {/* ── 글씨 뒷면 블러 레이어 ─────────────────────────────── */}
      <div
        className="absolute inset-x-0 top-0 bottom-[32%] pointer-events-none"
        style={{
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 70%, transparent 100%)',
        }}
      />

      {/* ── 콘텐츠 ───────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <p className={`text-xs tracking-[0.4em] uppercase text-stone-500 mb-4 ${isVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}>
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
          <p className="text-stone-500 text-xs tracking-widest mt-1 uppercase">Full-Arch Rehabilitation</p>
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
              <p className="text-xs font-bold mb-0.5" style={{ color: 'var(--e-accent)' }}>{feat.label}</p>
              <p className="text-xs text-stone-300">{feat.desc}</p>
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

      {/* ── 마퀴 이미지 스트립 ──────────────────────────────── */}
      <div className="absolute bottom-16 left-0 right-0 overflow-hidden pointer-events-none"
        style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}>
        <div className="flex animate-marquee" style={{ width: 'max-content' }}>
          <img src="/images/allon/all-on-side.jpg" alt="" aria-hidden="true" className="h-20 w-auto object-cover shrink-0" />
          <img src="/images/allon/all-on-side.jpg" alt="" aria-hidden="true" className="h-20 w-auto object-cover shrink-0" />
        </div>
      </div>

      {/* Scroll Down */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-stone-600 text-xs tracking-widest">
        <span>SCROLL DOWN</span>
        <ChevronDown size={16} className="animate-bounce" aria-hidden="true" />
      </div>
    </section>
  )
}

'use client'

import Link from 'next/link'
import { ChevronDown, Plus } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function ImplantSection() {
  const { ref, isVisible } = useScrollReveal(0.2)

  return (
    <section ref={ref}
      className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-4"
      style={{ backgroundColor: 'var(--e-dark)' }}>
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: 'radial-gradient(ellipse at 20% 40%, var(--e-primary) 0%, transparent 60%), radial-gradient(ellipse at 80% 60%, var(--e-accent) 0%, transparent 60%)' }} />

      <p className={`text-xs tracking-[0.4em] uppercase text-stone-500 mb-4 ${isVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}>
        Implant Solution
      </p>
      <h2 className={`text-xl md:text-2xl lg:text-3xl text-stone-300 font-light text-center mb-1 leading-tight ${isVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}
        style={isVisible ? { animationDelay: '0.12s' } : undefined}>
        상실된 치아, 완벽한 복원
      </h2>
      <p className={`text-sm text-stone-500 mb-2 ${isVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}
        style={isVisible ? { animationDelay: '0.2s' } : undefined}>
        디지털 정밀 진단 기반 임플란트
      </p>

      <div className={`relative my-6 md:my-8 flex flex-col items-center ${isVisible ? 'scroll-reveal-scale' : 'scroll-hidden'}`}
        style={isVisible ? { animationDelay: '0.3s' } : undefined}>
        <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight select-none"
          style={{ background: 'linear-gradient(135deg, var(--e-primary) 0%, var(--e-accent) 50%, var(--e-primary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          All on 4
        </span>
        <p className="text-stone-500 text-xs tracking-widest mt-1 uppercase">Full-Arch Rehabilitation</p>
      </div>

      <div className="flex gap-4 md:gap-6 mb-8 md:mb-10 items-center">
        <div className={`w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-2xl overflow-hidden ${isVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
          style={{ border: '1px solid #2a2a2a', ...(isVisible ? { animationDelay: '0.4s' } : {}) }}>
          <img src="/images/allon/all-on%20(1).jpg" alt="올온포 어버트먼트 보철" className="w-full h-full object-cover" />
        </div>
        <div className="flex items-center"><div className="w-px h-16 bg-stone-700" /></div>
        <div className={`w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-2xl overflow-hidden ${isVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
          style={{ border: '1px solid #2a2a2a', ...(isVisible ? { animationDelay: '0.5s' } : {}) }}>
          <img src="/images/allon/all-on%20(2).jpg" alt="올온포 전악 보철 완성" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8 text-center">
        {[
          { label: '당일 임시치아', desc: '수술 당일 식사 가능' },
          { label: '디지털 가이드', desc: '오차 ±0.1mm 정밀 식립' },
          { label: '의식하 진정', desc: '공포 없는 수술 환경' },
        ].map((feat, i) => (
          <div key={feat.label} className={`flex flex-col items-center ${isVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
            style={isVisible ? { animationDelay: `${0.55 + i * 0.1}s` } : undefined}>
            <p className="text-xs font-bold mb-0.5" style={{ color: 'var(--e-accent)' }}>{feat.label}</p>
            <p className="text-xs text-stone-300">{feat.desc}</p>
          </div>
        ))}
      </div>

      <Link href="/implant"
        className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-stone-300 rounded-full border border-stone-600 hover:border-stone-400 hover:text-white transition-all duration-300 group ${isVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
        style={isVisible ? { animationDelay: '0.8s' } : undefined}>
        자세히 보기
        <Plus size={14} className="group-hover:rotate-90 transition-transform duration-300" aria-hidden="true" />
      </Link>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-stone-600 text-xs tracking-widest">
        <span>SCROLL DOWN</span>
        <ChevronDown size={16} className="animate-bounce" aria-hidden="true" />
      </div>
    </section>
  )
}

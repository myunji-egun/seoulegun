'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import WebGLHero from '@/components/ui/WebGLHero'

const SLIDES = [
  {
    id: 0,
    headline: '수원치과 서울대 출신 원장',
    sub: '책임진료 서울이건치과',
    image: '/images/slides/slide-2.png',
    accent: 'var(--e-primary)',
  },
  {
    id: 1,
    headline: '자연치아를 지키는',
    sub: '최소삭제 보존치료',
    image: '/images/slides/slide-3.webp',
    accent: 'var(--e-primary)',
  },
  {
    id: 2,
    headline: '디지털 정밀 진단',
    sub: '네비게이션 임플란트',
    image: '/images/slides/slide-4.jpg',
    accent: 'var(--e-primary)',
  },
  {
    id: 3,
    headline: '가지런한 치아',
    sub: '건강한 교합',
    image: '/images/slides/slide-5.png',
    accent: 'var(--e-primary)',
  },
  {
    id: 4,
    headline: '안전하고 편안한',
    sub: '수면 임플란트치료',
    image: '/images/slides/slide-6.jpg',
    accent: 'var(--e-primary)',
  },
]

const INTERVAL        = 4000
const TRANSITION_DUR  = 900   // ms — WebGL crossfade duration
const RADIUS          = 18
const CIRCUMFERENCE   = 2 * Math.PI * RADIUS

export default function HeroSlider() {
  const [current,  setCurrent]  = useState(0)
  const [prevIdx,  setPrevIdx]  = useState(0)
  const [tProg,    setTProg]    = useState(1)    // 1 = transition complete
  const [progress, setProgress] = useState(0)   // auto-play circle

  const startTimeRef  = useRef<number>(Date.now())
  const rafRef        = useRef<number | null>(null)
  const isPausedRef   = useRef(false)
  const currentRef    = useRef(0)
  const transStartRef = useRef<number | null>(null)

  const goTo = (index: number) => {
    setPrevIdx(currentRef.current)
    setTProg(0)
    transStartRef.current = Date.now()
    setCurrent(index)
    currentRef.current = index
    setProgress(0)
    startTimeRef.current = Date.now()
  }

  useEffect(() => {
    const tick = () => {
      // auto-play timer
      if (!isPausedRef.current) {
        const elapsed = Date.now() - startTimeRef.current
        const p = Math.min(elapsed / INTERVAL, 1)
        setProgress(p)

        if (p >= 1) {
          const next = (currentRef.current + 1) % SLIDES.length
          setPrevIdx(currentRef.current)
          setTProg(0)
          transStartRef.current = Date.now()
          setCurrent(next)
          currentRef.current = next
          setProgress(0)
          startTimeRef.current = Date.now()
        }
      }

      // transition progress 0 → 1
      if (transStartRef.current !== null) {
        const te = Date.now() - transStartRef.current
        const tp = Math.min(te / TRANSITION_DUR, 1)
        setTProg(tp)
        if (tp >= 1) transStartRef.current = null
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current) }
  }, [])

  const slide     = SLIDES[current]
  const imageUrls = SLIDES.map((s) => s.image)

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => { isPausedRef.current = true }}
      onMouseLeave={() => { isPausedRef.current = false }}
    >
      {/* ── WebGL 배경 (displacement + slide crossfade) ─────────── */}
      <WebGLHero
        images={imageUrls}
        fromIndex={prevIdx}
        toIndex={current}
        transitionProgress={tProg}
      />

      {/* ── 반투명 그라데이션 오버레이 ──────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.15) 100%)',
        }}
      />

      {/* ── 하단 페이드 오버레이 ─────────────────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)',
        }}
      />

      {/* ── 텍스트 오버레이 ──────────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center px-6 md:justify-start md:pl-20 lg:pl-32">
        <div className="text-white text-center md:text-left">
          <p
            className="text-[15px] md:text-[17px] tracking-[0.3em] uppercase mb-3 opacity-80"
            style={{ color: slide.accent }}
          >
            서울이건치과 <span className="text-[13px] md:text-[15px] opacity-60">수원</span>
          </p>
          <h1
            key={`headline-${current}`}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-1 animate-fade-in"
          >
            {slide.headline}
          </h1>
          <h2
            key={`sub-${current}`}
            className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-light leading-tight animate-fade-in"
            style={{ animationDelay: '0.15s' }}
          >
            {slide.sub}
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <a
              href="tel:031-896-5512"
              className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold text-white border border-white/40 rounded-full hover:bg-white hover:text-stone-900 transition-all duration-300"
            >
              031-896-5512
            </a>
            <a
              href="http://pf.kakao.com/_xmDDNxb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold rounded-full transition-all duration-300"
              style={{ backgroundColor: slide.accent, color: '#fff' }}
            >
              카카오 상담 신청
            </a>
          </div>
        </div>
      </div>

      {/* ── 왼쪽 인디케이터 (세로) ───────────────────────────────── */}
      <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-10">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            aria-label={`슬라이드 ${i + 1}로 이동`}
            className="relative flex items-center justify-center w-10 h-10"
          >
            {i === current ? (
              <>
                <svg width="40" height="40" viewBox="0 0 40 40" className="-rotate-90">
                  <circle
                    cx="20" cy="20" r={RADIUS}
                    fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"
                  />
                  <circle
                    cx="20" cy="20" r={RADIUS}
                    fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
                    style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                  />
                </svg>
                <span className="absolute w-2 h-2 rounded-full bg-white" />
              </>
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 hover:bg-white/70 transition-colors" />
            )}
          </button>
        ))}
      </div>

      {/* ── 슬라이드 카운터 ──────────────────────────────────────── */}
      <div className="absolute bottom-20 right-6 md:right-10 text-white/50 text-xs tracking-widest font-mono">
        {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
      </div>

      {/* ── Scroll Down ──────────────────────────────────────────── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60 text-xs tracking-widest">
        <span>SCROLL DOWN</span>
        <ChevronDown size={16} className="animate-bounce" aria-hidden="true" />
      </div>
    </section>
  )
}

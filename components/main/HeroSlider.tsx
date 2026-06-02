'use client'

import { useEffect, useRef, useState } from 'react'
import WebGLHero from '@/components/ui/WebGLHero'

type Slide = {
  id: number
  headline: string
  sub: string
  image: string
  isVideo?: boolean
  accent: string
}

const SLIDES: Slide[] = [
  {
    id: 3,
    headline: '수원교정',
    sub: '인비절라인',
    image: '/images/slides/slide-4.mp4',
    isVideo: true,
    accent: 'var(--e-primary)',
  },
  {
    id: 0,
    headline: '서울대 출신 대표원장',
    sub: '서울이건치과 수원',
    image: '/images/slides/slide-1.webp',
    accent: 'var(--e-primary)',
  },
  {
    id: 1,
    headline: '자연치아를 지키는',
    sub: '최소삭제 보존치료',
    image: '/images/slides/slide-2.jpg',
    accent: 'var(--e-primary)',
  },
  {
    id: 2,
    headline: '디지털 정밀 진단',
    sub: '네비게이션 임플란트',
    image: '/images/slides/slide-3.png',
    accent: 'var(--e-primary)',
  },
  {
    id: 5,
    headline: '서울이건치과',
    sub: '수원 영통',
    image: '/images/slides/slide-6.jpg',
    accent: 'var(--e-primary)',
  },
]

const INTERVAL       = 6700
// index 0=video(full duration), 1=3000, 2=4700, 3=4700, 4=6700
const SLIDE_INTERVALS = [0, 3000, 4700, 4700, 6700]
const TRANSITION_DUR = 2500

const RADIUS        = 18
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function HeroSlider() {
  const [current,  setCurrent]  = useState(0)
  const [prevIdx,  setPrevIdx]  = useState(0)
  const [tProg,    setTProg]    = useState(1)
  const [progress, setProgress] = useState(0)

  const startTimeRef     = useRef<number>(Date.now())
  const rafRef           = useRef<number | null>(null)
  const isPausedRef      = useRef(false)
  const currentRef       = useRef(0)
  const transStartRef    = useRef<number | null>(null)
  const videoRef         = useRef<HTMLVideoElement | null>(null)
  const videoAdvancedRef = useRef(false)

  const advanceFrom = (from: number) => {
    const next = (from + 1) % SLIDES.length
    setPrevIdx(from)
    setTProg(0)
    transStartRef.current = Date.now()
    setCurrent(next)
    currentRef.current = next
    setProgress(0)
    startTimeRef.current = Date.now()
    videoAdvancedRef.current = false
  }

  const goTo = (index: number) => {
    setPrevIdx(currentRef.current)
    setTProg(0)
    transStartRef.current = Date.now()
    setCurrent(index)
    currentRef.current = index
    setProgress(0)
    startTimeRef.current = Date.now()
    videoAdvancedRef.current = false
    if (index === 0 && videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.playbackRate = 0.7
      videoRef.current.play().catch(() => {})
    }
  }

  const handleVideoEnded = () => {
    if (videoAdvancedRef.current) return
    videoAdvancedRef.current = true
    advanceFrom(0)
  }

  useEffect(() => {
    const resetHero = () => goTo(0)
    window.addEventListener('egun:hero-reset', resetHero)
    return () => window.removeEventListener('egun:hero-reset', resetHero)
  }, [])

  useEffect(() => {
    const tick = () => {
      if (!isPausedRef.current) {
        if (currentRef.current === 0) {
          const vid = videoRef.current
          if (vid && vid.duration > 0) {
            setProgress(vid.currentTime / vid.duration)
          }
        } else {
          const slideInterval = SLIDE_INTERVALS[currentRef.current] ?? INTERVAL
          const elapsed = Date.now() - startTimeRef.current
          const p = Math.min(elapsed / slideInterval, 1)
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
      }

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
  const imageUrls = SLIDES.map((s) => s.isVideo ? '/images/slides/slide-1.webp' : s.image)

  return (
    <section
      id="main-hero"
      className={`relative h-dvh md:h-screen w-full overflow-hidden ${slide.isVideo ? 'bg-black' : 'bg-white'}`}
      onMouseEnter={() => { isPausedRef.current = true }}
      onMouseLeave={() => { isPausedRef.current = false }}
    >
      {/* ── WebGL 배경 (desktop only) ─────────── */}
      <div
        className="hidden md:block absolute inset-0"
        style={{ opacity: slide.isVideo ? 0 : 1, transition: 'opacity 0.8s ease' }}
      >
        <WebGLHero
          images={imageUrls}
          fromIndex={prevIdx}
          toIndex={current}
          transitionProgress={tProg}
        />
      </div>

      {/* ── 동영상 레이어 (데스크탑) ── */}
      {slide.isVideo && (
        <video
          key="hero-video"
          className="hidden md:block absolute inset-0 w-full h-full object-contain"
          src="/images/slides/slide-4.mp4"
          autoPlay
          muted
          playsInline
          onCanPlay={(e) => { (e.target as HTMLVideoElement).playbackRate = 0.7 }}
          onEnded={handleVideoEnded}
        />
      )}

      {/* ── 모바일 이미지/동영상 레이어 ─────────────────────────── */}
      <div className="md:hidden absolute inset-0">
        {slide.isVideo ? (
          <video
            ref={videoRef}
            key="hero-video-m"
            className="absolute inset-0 w-full h-full object-cover"
            src="/images/slides/slide-4.mp4"
            autoPlay
            muted
            playsInline
            onCanPlay={(e) => { (e.target as HTMLVideoElement).playbackRate = 0.7 }}
            onEnded={handleVideoEnded}
          />
        ) : (
          <img
            key={current}
            src={slide.image}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover mobile-pan-${current}`}
          />
        )}
      </div>

      {/* ── 반투명 그라데이션 오버레이 (데스크탑) ── */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.15) 100%)',
        }}
      />

      {/* ── 하단 페이드 오버레이 (데스크탑) ─────────────────────── */}
      <div
        className="hidden md:block absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)',
        }}
      />

      {/* ── 하단 페이드 오버레이 (모바일) ────────────────────────── */}
      <div
        className="md:hidden absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: 'calc(var(--mobile-bottom-bar-height) + 160px)',
          background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)',
        }}
      />

      {/* ── 모바일 슬라이드 인디케이터 (하단 도트) ── */}
      <div className="md:hidden absolute bottom-10 inset-x-0 flex justify-center items-center gap-2.5 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`슬라이드 ${i + 1}로 이동`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current
                ? 'bg-white scale-125'
                : 'bg-white/45 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* ── 왼쪽 인디케이터 (데스크탑 세로) ───────────────────────────────── */}
      <div className="hidden md:flex absolute left-6 md:left-10 top-1/2 -translate-y-1/2 flex-col items-center gap-4 z-10">
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

      {/* ── 슬라이드 카운터 (데스크탑) ──────────────────────────────────────── */}
      <div className="hidden md:block absolute bottom-20 right-6 md:right-10 text-white/50 text-xs tracking-widest font-mono">
        {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
      </div>

    </section>
  )
}

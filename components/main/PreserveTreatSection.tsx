'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const CARDS = [
  { img: '/images/treatments/resin-buildup.jpg',        spine: 'ONE·DAY', tag: '#레진',   title: '원데이 레진 빌드업', desc: '하루에 자연스럽게 복원, 치아 삭제 최소화' },
  { img: '/images/treatments/vpt.jpg',                  spine: 'VPT',     tag: '#신경보존', title: 'VPT 신경보존술',    desc: '신경치료 대신 내 신경을 살리는 치료' },
  { img: '/images/treatments/preserve_treat.jpg',        spine: 'ONLAY',   tag: '#최소삭제', title: '최소삭제 온레이',   desc: '크라운 대신, 건강한 치아는 최대한 보존' },
  { img: '/images/treatments/endo-1.jpg',               spine: 'ROOT',    tag: '#근관치료', title: '신경치료·근관치료', desc: '염증을 제거하고 치아 기능을 회복합니다' },
  { img: '/images/treatments/sc-rp.jpg',                spine: 'GUM',     tag: '#잇몸',   title: '잇몸치료',          desc: '염증 없는 잇몸으로 치아 수명을 연장합니다' },
]

const CARD_W = 360
const CARD_H = 202 // 16:9

const OPEN_POS = [
  { x: 640, z:  40 },
  { x: 480, z:  20 },
  { x: 320, z:   0 },
  { x: 160, z: -20 },
  { x:   0, z: -40 },
]

export default function PreserveTreatSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [hoverIdx, setHoverIdx]   = useState<number | null>(null)
  const { ref, isVisible } = useScrollReveal(0.2)

  // 섹션이 보이면 자동으로 서랍 열기
  useEffect(() => {
    if (!isVisible) return
    const t = setTimeout(() => setIsOpen(true), 500)
    return () => clearTimeout(t)
  }, [isVisible])

  // ESC 키로 active 닫기
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (activeIdx !== null) { setActiveIdx(null); return }
      if (isOpen) { setIsOpen(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIdx, isOpen])

  const handleToggle = () => {
    if (isOpen) { setIsOpen(false); setActiveIdx(null) }
    else         { setIsOpen(true) }
  }

  const handleCardClick = (i: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isOpen) { setIsOpen(true); return }
    setActiveIdx(prev => prev === i ? null : i)
  }

  const getTransform = (i: number): string => {
    if (!isOpen)
      return 'translate3d(200px, 0, -800px) rotateY(-90deg) scale(0.9)'
    if (activeIdx !== null)
      return `translate3d(${OPEN_POS[i].x}px, 0, ${OPEN_POS[i].z - 400}px) rotateY(-55deg) scale(0.85)`
    if (hoverIdx === i)
      return `translate3d(${OPEN_POS[i].x}px, -6px, ${OPEN_POS[i].z + 20}px) rotateY(-22deg)`
    return `translate3d(${OPEN_POS[i].x}px, 0, ${OPEN_POS[i].z}px) rotateY(-40deg)`
  }

  const getFilter = (i: number): string => {
    if (activeIdx !== null && activeIdx !== i) return 'brightness(0.3) blur(1.2px)'
    if (hoverIdx === i && activeIdx === null)   return 'brightness(1.15)'
    return 'none'
  }

  const getShadow = (i: number): string => {
    if (activeIdx === i)
      return '0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(79,195,247,0.5), 0 0 60px rgba(79,195,247,0.4)'
    if (hoverIdx === i && activeIdx === null)
      return '0 30px 60px rgba(0,0,0,0.65), 0 0 0 1px rgba(79,195,247,0.4), 0 0 40px rgba(79,195,247,0.3)'
    return '0 20px 50px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.08)'
  }

  const getZ = (i: number): number => {
    if (activeIdx === i) return 30
    if (hoverIdx === i && activeIdx === null) return 20
    return 5 - i
  }

  const counterNum = hoverIdx ?? (activeIdx ?? 0)

  return (
    <section
      ref={ref}
      className="h-screen w-full relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #1a1f3a 0%, #0f142b 100%)',
      }}
      onClick={() => { if (activeIdx !== null) setActiveIdx(null) }}
    >
      {/* 라디알 그라디언트 오버레이 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(55% 50% at 75% 30%, rgba(79,195,247,0.15), transparent 70%),
            radial-gradient(50% 60% at 20% 90%, rgba(25,35,80,0.8), transparent 70%)
          `,
        }}
      />

      {/* ── 우측 상단: 메인 카피 ── */}
      <div
        className="absolute flex flex-col"
        style={{
          top: '12vh', left: '12vw',
          maxWidth: '560px',
          zIndex: 5,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
        }}
      >
        <p style={{ color: '#4fc3f7', letterSpacing: '6px', fontSize: '14px', fontWeight: 500, marginBottom: '14px' }}>
          NATURAL TOOTH SOLUTION
        </p>
        <h2 style={{ fontSize: 'clamp(30px, 3.2vw, 46px)', fontWeight: 700, letterSpacing: '-0.5px', lineHeight: 1.3, color: '#fff' }}>
          내 치아를 <span style={{ color: '#4fc3f7' }}>최대한 남기는</span>
          <br />
          <span style={{ color: '#fff' }}>가장 좋은 임플란트는</span>
          <br />
          <span style={{ color: '#4fc3f7', fontWeight: 900 }}>내가 가진 치아</span>
          <span style={{ color: '#fff' }}>입니다.</span>
        </h2>
        <p style={{ color: '#b8c0d9', marginTop: '18px', fontSize: '15px', lineHeight: 1.75 }}>
          치아는 한 번 삭제하면 <strong style={{ color: '#fff' }}>되돌릴 수 없기에</strong>,
          처음 치료 방향이 가장 중요합니다. 저희는 충치를 없애는 것을 넘어{' '}
          <strong style={{ color: '#fff' }}>"어디까지 살릴 수 있는지"</strong>를 먼저 고민합니다.
        </p>
        <div className="flex gap-2.5 flex-wrap mt-7">
          <Link
            href="/natural-tooth"
            style={{
              padding: '12px 22px', borderRadius: '999px',
              fontSize: '14px', fontWeight: 700, letterSpacing: '0.5px',
              background: '#4fc3f7', color: '#0b1228',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px',
              transition: 'background 0.2s, transform 0.2s',
            }}
            className="hover:brightness-110 hover:-translate-y-0.5"
          >
            자연치아살리기 게시판 →
          </Link>
          <a
            href="tel:031-896-5512"
            style={{
              padding: '12px 22px', borderRadius: '999px',
              fontSize: '14px', fontWeight: 700, letterSpacing: '0.5px',
              background: 'transparent', color: '#fff',
              border: '1px solid rgba(255,255,255,0.25)',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px',
              transition: 'background 0.2s',
            }}
            className="hover:bg-white/10"
          >
            빠른 상담
          </a>
        </div>
      </div>

      {/* ── 우측 하단: 서랍 블록 ── */}
      <div
        className="absolute"
        style={{
          left: '30vw', bottom: '5vh',
          width: 'min(1050px, 72vw)', height: '360px',
          zIndex: 4,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.5s ease 0.3s',
        }}
      >
        {/* TREATMENT ARCHIVE 레이블 */}
        <div
          className="absolute left-1 flex items-center gap-2.5"
          style={{ top: '-28px', fontSize: '13px', letterSpacing: '3px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}
        >
          <span style={{ width: '30px', height: '1px', background: 'rgba(255,255,255,0.3)', display: 'block' }} />
          TREATMENT ARCHIVE
        </div>

        {/* 3D Perspective 컨테이너 */}
        <div
          className="relative w-full h-full"
          style={{ perspective: '2200px', perspectiveOrigin: '80% 50%' }}
        >
          {/* 바닥 글로우 */}
          <div
            className="absolute left-0 bottom-0 pointer-events-none"
            style={{
              transformOrigin: '0 50%',
              transform: 'rotateX(80deg)',
              width: '780px', height: '140px',
              background: 'radial-gradient(closest-side at 30% 50%, rgba(79,195,247,0.18), transparent 70%)',
            }}
          />

          {/* 카드 레일 */}
          <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
            {CARDS.map((card, i) => (
              <div
                key={i}
                className="absolute rounded-[14px] overflow-hidden cursor-pointer"
                style={{
                  top: '50%',
                  left: 0,
                  width: `${CARD_W}px`,
                  height: `${CARD_H}px`,
                  marginTop: `${-CARD_H / 2}px`,
                  background: '#0f142b',
                  boxShadow: getShadow(i),
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  transform: getTransform(i),
                  filter: getFilter(i),
                  opacity: isOpen ? (activeIdx === i ? 0 : 1) : 0,
                  pointerEvents: isOpen ? 'auto' : 'none',
                  transition: `transform 0.9s cubic-bezier(.2,.85,.2,1) ${isOpen ? i * 0.08 : 0}s, box-shadow 0.4s ease, filter 0.4s ease, opacity 0.5s ease`,
                  zIndex: getZ(i),
                }}
                onClick={(e) => handleCardClick(i, e)}
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx(null)}
              >
                {/* 배경 이미지 */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${card.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: activeIdx === i ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.7s ease',
                  }}
                />
                {/* 그라디언트 스크림 */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, rgba(10,14,30,0) 30%, rgba(10,14,30,0.92) 100%)' }}
                />
                {/* 책등 라벨 */}
                <span
                  className="absolute"
                  style={{
                    top: '14px', right: '14px',
                    fontSize: '12px', letterSpacing: '3px', color: '#4fc3f7',
                    fontWeight: 700, writingMode: 'vertical-rl', textOrientation: 'mixed',
                    background: 'rgba(15,20,43,0.85)', padding: '8px 5px',
                    borderRadius: '6px', border: '1px solid rgba(79,195,247,0.35)',
                    opacity: activeIdx !== null ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  {card.spine}
                </span>
                {/* 태그 */}
                <span
                  className="absolute"
                  style={{
                    top: '14px', left: '14px',
                    padding: '4px 10px', borderRadius: '999px',
                    background: 'rgba(79,195,247,0.22)', color: '#fff',
                    fontSize: '12px', letterSpacing: '1px',
                    border: '1px solid rgba(79,195,247,0.4)',
                    opacity: activeIdx === i ? 1 : 0,
                    transition: 'opacity 0.35s ease',
                  }}
                >
                  {card.tag}
                </span>
                {/* 타이틀/설명 */}
                <div className="absolute left-0 right-0 bottom-0 p-4 text-right">
                  <h3 style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '-0.3px', color: '#fff' }}>
                    {card.title}
                  </h3>
                  <p
                    style={{
                      color: '#b8c0d9', fontSize: '14px', marginTop: '4px', lineHeight: 1.5,
                      opacity: activeIdx === i ? 1 : 0,
                      transform: activeIdx === i ? 'translateY(0)' : 'translateY(4px)',
                      transition: 'opacity 0.35s ease 0.1s, transform 0.35s ease 0.1s',
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 컨트롤 */}
        <div className="absolute left-1 flex items-center gap-2" style={{ bottom: '-46px' }}>
          <button
            onClick={(e) => { e.stopPropagation(); handleToggle() }}
            className="hover:-translate-y-0.5 transition-transform duration-200"
            style={{
              padding: '10px 18px', borderRadius: '999px',
              background: '#4fc3f7', color: '#0b1228',
              fontSize: '14px', fontWeight: 700, letterSpacing: '1px',
              border: 'none', cursor: 'pointer',
            }}
          >
            {isOpen ? '서랍 닫기' : '서랍 열기'}
          </button>
          <span style={{ fontSize: '13px', letterSpacing: '2px', color: 'rgba(255,255,255,0.5)', paddingLeft: '6px' }}>
            <b style={{ color: '#4fc3f7' }}>
              {String(counterNum + 1).padStart(2, '0')}
            </b>{' '}/ {String(CARDS.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* ── 풀스크린 카드 오버레이 ── */}
      {activeIdx !== null && (
        <div
          className="absolute inset-0 z-[200] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(5, 8, 20, 0.92)', backdropFilter: 'blur(6px)' }}
          onClick={() => setActiveIdx(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative rounded-2xl overflow-hidden"
            style={{
              width: '82vw',
              maxWidth: '1100px',
              aspectRatio: '16 / 9',
              boxShadow: '0 50px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(79,195,247,0.25)',
              animation: 'card-fly-in 0.42s cubic-bezier(0.15, 0.85, 0.2, 1) both',
            }}
          >
            {/* 배경 이미지 */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${CARDS[activeIdx].img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            {/* 하단 그라디언트 */}
            <div
              className="absolute inset-0 flex flex-col justify-end"
              style={{
                background: 'linear-gradient(to top, rgba(8,12,28,0.95) 0%, rgba(8,12,28,0.3) 55%, transparent 100%)',
                padding: '40px 44px',
              }}
            >
              <span style={{ color: '#4fc3f7', fontSize: '13px', letterSpacing: '4px', marginBottom: '12px', display: 'block' }}>
                {CARDS[activeIdx].tag}
              </span>
              <h3 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1.2 }}>
                {CARDS[activeIdx].title}
              </h3>
              <p style={{ color: '#b8c0d9', fontSize: 'clamp(16px, 1.8vw, 22px)', marginTop: '12px', lineHeight: 1.65 }}>
                {CARDS[activeIdx].desc}
              </p>
            </div>
            {/* 닫기 버튼 */}
            <button
              onClick={(e) => { e.stopPropagation(); setActiveIdx(null) }}
              className="absolute top-4 right-4 flex items-center justify-center rounded-full"
              style={{
                width: '42px', height: '42px',
                background: 'rgba(0,0,0,0.55)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#fff', fontSize: '20px', cursor: 'pointer',
                lineHeight: 1,
              }}
            >
              ✕
            </button>
            {/* ESC 힌트 */}
            <span
              className="absolute bottom-4 right-5"
              style={{ fontSize: '12px', letterSpacing: '3px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}
            >
              ESC · click to close
            </span>
          </div>
        </div>
      )}
    </section>
  )
}

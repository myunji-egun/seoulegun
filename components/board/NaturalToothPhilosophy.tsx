'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

// ── 카드 데이터 ──────────────────────────────────────────────────────────────
const CARDS = [
  {
    id: 'resin',
    title: '레진 빌드업',
    subtitle: '초기 단계',
    desc: '치아 삭제를 최소화하여 충치만 제거 후\n치아색 레진으로 당일 복원합니다.',
    image: '/images/treatments/resin-buildup-treat.jpg',
    href: '/natural-tooth#cavity',
  },
  {
    id: 'onlay',
    title: '인레이·온레이',
    subtitle: '진행된 경우',
    desc: '필요한 부분만 정밀 보강하는 세라믹 수복.\n크라운 없이 치질을 최대한 보존합니다.',
    image: '/images/treatments/onlay-treat.jpg',
    href: '/natural-tooth#cavity',
  },
  {
    id: 'crown',
    title: '크라운',
    subtitle: '손상이 큰 경우',
    desc: '불필요한 삭제를 최대한 줄이며\n치아 보호를 위해 신중하게 결정합니다.',
    image: '/images/treatments/zir-crown.jpg',
    href: '/natural-tooth#cavity',
  },
]

// ── 기본 스택 포지션 (뒤→앞 순) ───────────────────────────────────────────
const STACK = [
  { rotate: -12, x: -52, y: 18, scale: 0.84, z: 10 },
  { rotate:  -6, x: -26, y:  9, scale: 0.92, z: 20 },
  { rotate:   0, x:   0, y:  0, scale: 1.00, z: 30 },
]

function getCardStyle(
  i: number,
  hoveredIdx: number | null,
  tappedIdx: number | null,
): React.CSSProperties {
  const base = STACK[i]
  const isActive = hoveredIdx === i || tappedIdx === i
  const isOther  = (hoveredIdx !== null || tappedIdx !== null) && !isActive

  if (isActive) {
    return {
      transform: 'rotate(0deg) translateX(0px) translateY(-8px) scale(1.1)',
      zIndex: 50,
      boxShadow: '0 0 48px 10px rgba(0,128,200,0.4), 0 24px 48px rgba(0,0,0,0.35)',
      transition: 'all 0.42s cubic-bezier(0.34, 1.56, 0.64, 1)',
    }
  }
  if (isOther) {
    return {
      transform: `rotate(${base.rotate * 1.4}deg) translateX(${base.x * 1.5}px) translateY(${base.y + 10}px) scale(${base.scale * 0.88})`,
      zIndex: base.z,
      filter: 'brightness(0.45)',
      boxShadow: 'none',
      transition: 'all 0.38s ease',
    }
  }
  return {
    transform: `rotate(${base.rotate}deg) translateX(${base.x}px) translateY(${base.y}px) scale(${base.scale})`,
    zIndex: base.z,
    filter: 'brightness(1)',
    boxShadow: i === 2 ? '0 8px 32px rgba(0,0,0,0.2)' : 'none',
    transition: 'all 0.38s ease',
  }
}

// ── 컴포넌트 ─────────────────────────────────────────────────────────────────
export default function NaturalToothPhilosophy() {
  const { ref, isVisible } = useScrollReveal(0.15)
  const router = useRouter()

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [tappedIdx,  setTappedIdx]  = useState<number | null>(null)

  const handleCardClick = useCallback(
    (idx: number, href: string) => {
      // 데스크톱: hover 상태이면 바로 이동
      if (hoveredIdx !== null) {
        router.push(href)
        return
      }
      // 모바일 터치: 첫 탭 = 펼치기, 두 번째 탭 = 이동
      if (tappedIdx === idx) {
        router.push(href)
        setTappedIdx(null)
      } else {
        setTappedIdx(idx)
      }
    },
    [hoveredIdx, tappedIdx, router],
  )

  return (
    <section ref={ref} className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:pl-8 lg:pr-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── 왼쪽: 콘텐츠 박스 ──────────────────────────────────────── */}
          <div className={isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.2] mb-8">
              가장 좋은 임플란트는
              <br />
              <span style={{ color: 'var(--e-primary)' }}>내 몸이 가진</span>
              <br />
              자연치아입니다.
            </h2>

            <div className="space-y-5 text-[15px] sm:text-base text-gray-600 leading-[1.85]">
              <p>
                치아는 한 번 삭제하면{' '}
                <strong className="text-gray-900">되돌릴 수 없기에</strong>, 처음 치료 방향이 가장
                중요합니다. 저희는 충치를 없애는 것을 넘어,{' '}
                <strong className="text-gray-900">"어디까지 살릴 수 있는지"</strong>를 먼저 고민합니다.
              </p>

              <ul className="space-y-2 pl-1">
                {[
                  { stage: '초기 단계',    bold: '레진 빌드업',  desc: '(치아 삭제 최소화)' },
                  { stage: '진행된 경우',  bold: '인레이·온레이', desc: '(필요한 부분만 보강)' },
                  { stage: '손상이 큰 경우', bold: '크라운',      desc: '(불필요한 삭제는 최대한 줄여서)' },
                ].map((item) => (
                  <li key={item.bold} className="flex items-start gap-2">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                    <span>
                      {item.stage} →{' '}
                      <strong className="text-gray-900">{item.bold}</strong>{' '}
                      <span className="text-gray-500 text-sm">{item.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <p>
                중요한 건 치료 방법 자체가 아니라,{' '}
                <strong className="text-gray-900">환자분의 치아 상태에 맞는 적절한 선택</strong>입니다.{' '}
                <em>자연치아를 얼마나 오래, 건강하게 유지할 수 있는가</em> — 이 원칙으로 치료합니다.
              </p>
            </div>
          </div>

          {/* ── 오른쪽: 적층식 카드 스택 ─────────────────────────────── */}
          <div
            className={`relative flex items-center justify-center h-[380px] sm:h-[440px] ${isVisible ? 'scroll-reveal-right' : 'scroll-hidden'}`}
            style={isVisible ? { animationDelay: '0.3s' } : undefined}
            onMouseLeave={() => {
              setHoveredIdx(null)
              setTappedIdx(null)
            }}
          >
            {CARDS.map((card, i) => {
              const isActive = hoveredIdx === i || tappedIdx === i
              return (
                <div
                  key={card.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${card.subtitle} — ${card.title}`}
                  className="absolute w-[200px] sm:w-[236px] h-[280px] sm:h-[330px] rounded-2xl overflow-hidden cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-[#0080C8] focus-visible:ring-offset-2"
                  style={getCardStyle(i, hoveredIdx, tappedIdx)}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onClick={() => handleCardClick(i, card.href)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleCardClick(i, card.href)
                    }
                  }}
                >
                  {/* 이미지 */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                  />

                  {/* 기본 그라데이션 + 라벨 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-[10px] text-white/55 uppercase tracking-widest mb-0.5">
                      {card.subtitle}
                    </p>
                    <p className="text-sm font-bold text-white">{card.title}</p>
                  </div>

                  {/* 호버/탭 오버레이 */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-end p-5"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                  >
                    {/* 하늘색 글로우 오버레이 */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(0,128,200,0.55) 0%, rgba(0,128,200,0.18) 50%, transparent 100%)',
                      }}
                    />
                    <div className="relative z-10 text-center">
                      <p className="text-[10px] text-white/65 uppercase tracking-widest mb-1">
                        {card.subtitle}
                      </p>
                      <p className="text-base font-black text-white mb-2">{card.title}</p>
                      <p className="text-[11px] text-white/85 leading-relaxed whitespace-pre-line mb-3">
                        {card.desc}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#92DCE5] font-semibold">
                        자세히 보기 <ArrowRight size={11} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}

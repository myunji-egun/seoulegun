'use client'

import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const TYPES = [
  {
    num: '01',
    title: '올온 임플란트',
    subtitle: 'ALL-ON-4 / 6',
    quote: '최소한의 임플란트로 틀니 없이 내 치아처럼',
    features: ['4-6개의 임플란트로 전악 고정', '틀니의 불편함 해소', '수술 당일 임시 치아 장착'],
    img: '/images/treatments/all-on.jpg',
    href: '/implant#all-on',
  },
  {
    num: '02',
    title: '즉시로딩 임플란트',
    subtitle: 'IMMEDIATE LOADING',
    quote: '수술 직후 틀니 없이 식사가 가능한 치아 제작',
    features: ['당일 임시 보철', '저작 기능 즉시 회복', '최소 회복 기간'],
    img: '/images/treatments/immediate_2.webp',
    href: '/implant#immediate-loading',
  },
  {
    num: '03',
    title: '네비게이션 임플란트',
    subtitle: 'NAVIGATION IMPLANT',
    quote: '최소 절개·최소 침습·디지털 임플란트',
    features: ['3D CT 기반 시술 계획', '수술 가이드 제작', '정확한 식립 위치'],
    img: '/images/treatments/navigation.jpg',
    href: '/implant#navigation',
  },
]

export default function ImplantTypeSection() {
  const { ref, isVisible } = useScrollReveal(0.15)

  return (
    <section
      ref={ref}
      className="h-screen w-full flex flex-col justify-center"
      style={{ backgroundColor: '#1a2035' }}
    >
      <div className="w-full max-w-6xl mx-auto px-5 lg:px-8" style={{ paddingTop: '5vh', paddingBottom: '5vh' }}>
        <p
          className={`tracking-[0.3em] uppercase mb-5 lg:mb-8 ${isVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}
          style={{ fontSize: '12px', color: 'rgba(255,255,255,0.28)' }}
        >
          IMPLANT SOLUTION TYPES
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-5">
          {TYPES.map((type, i) => (
            <Link
              key={i}
              href={type.href}
              className={`rounded-2xl flex flex-col overflow-hidden group cursor-pointer ${isVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
              style={{
                border: '1px solid rgba(255,255,255,0.09)',
                backgroundColor: 'rgba(255,255,255,0.03)',
                textDecoration: 'none',
                transition: 'border-color 0.25s ease, background-color 0.25s ease',
                ...(isVisible ? { animationDelay: `${i * 0.12}s` } : {}),
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(79,195,247,0.35)'; (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(79,195,247,0.04)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.09)'; (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.03)' }}
            >
              {/* 텍스트 영역 */}
              <div className="p-5 lg:p-7 flex flex-col">
                <p
                  className="tracking-[0.25em] mb-3 lg:mb-5"
                  style={{ fontSize: '11px', color: 'rgba(255,255,255,0.28)' }}
                >
                  TYPE / {type.num}
                </p>

                <h3
                  className="font-bold text-white leading-tight mb-1 lg:mb-2"
                  style={{ fontSize: 'clamp(22px, 2.4vw, 32px)' }}
                >
                  {type.title}
                </h3>

                <p
                  className="tracking-[0.18em] uppercase mb-2 lg:mb-3"
                  style={{ fontSize: '11px', color: 'rgba(255,255,255,0.32)' }}
                >
                  {type.subtitle}
                </p>

                <p
                  className="italic leading-relaxed mb-4 lg:mb-5"
                  style={{ fontSize: '15px', color: 'rgba(255,255,255,0.48)' }}
                >
                  &ldquo;{type.quote}&rdquo;
                </p>

                <div
                  className="mb-3 lg:mb-4"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.09)' }}
                />

                <ul className="space-y-1.5 lg:space-y-2">
                  {type.features.map((feat, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2"
                      style={{ fontSize: '15px', color: 'rgba(255,255,255,0.62)' }}
                    >
                      <span style={{ color: 'rgba(255,255,255,0.28)' }}>—</span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 이미지 영역 */}
              <div style={{ height: 'clamp(240px, 30vh, 380px)', flexShrink: 0, overflow: 'hidden' }}>
                <img
                  src={type.img}
                  alt={type.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

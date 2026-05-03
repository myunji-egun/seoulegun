'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const CARDS = [
  { img: '/images/treatments/resin-buildup.jpg', spine: 'ONE·DAY', title: '원데이 레진 빌드업', href: '/natural-tooth#resin-buildup' },
  { img: '/images/treatments/vpt.jpg',            spine: 'VPT',     title: 'VPT 신경보존술',    href: '/natural-tooth#vpt' },
  { img: '/images/treatments/preserve_treat.jpg', spine: 'ONLAY',  title: '최소삭제 온레이',    href: '/natural-tooth#onlay' },
  { img: '/images/treatments/endo-1.jpg',         spine: 'ROOT',    title: '신경치료·근관치료', href: '/natural-tooth#root-canal' },
  { img: '/images/treatments/sc-rp.jpg',          spine: 'GUM',     title: '잇몸치료',           href: '/natural-tooth#gum' },
]

export default function PreserveTreatSection() {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const { ref, isVisible } = useScrollReveal(0.2)

  return (
    <section
      ref={ref}
      className="h-screen w-full flex flex-col relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #1a1f3a 0%, #0f142b 100%)' }}
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

      {/* ── 상단: 텍스트 영역 ── */}
      <div className="flex-1 flex items-center px-8 sm:px-12 lg:px-20 pt-8 relative z-10">
        <div
          style={{
            maxWidth: '540px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
          }}
        >
          <p style={{ color: '#4fc3f7', letterSpacing: '6px', fontSize: '16px', fontWeight: 500, marginBottom: '14px' }}>
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
          <p style={{ color: '#b8c0d9', marginTop: '18px', fontSize: '17px', lineHeight: 1.75 }}>
            치아는 한 번 삭제하면 <strong style={{ color: '#fff' }}>되돌릴 수 없기에</strong>,
            처음 치료 방향이 가장 중요합니다. 저희는 충치를 없애는 것을 넘어{' '}
            <strong style={{ color: '#fff' }}>"어디까지 살릴 수 있는지"</strong>를 먼저 고민합니다.
          </p>
          <div className="flex gap-2.5 flex-wrap mt-7">
            <Link
              href="/natural-tooth"
              style={{
                padding: '12px 22px', borderRadius: '999px',
                fontSize: '16px', fontWeight: 700, letterSpacing: '0.5px',
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
                fontSize: '16px', fontWeight: 700, letterSpacing: '0.5px',
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
      </div>

      {/* ── 하단: Treatment Archive 카드 그리드 ── */}
      <div
        className="relative z-10 px-5 sm:px-8 lg:px-14 pb-5 lg:pb-8"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.6s ease 0.45s',
        }}
      >
        {/* 레이블 */}
        <div
          className="flex items-center gap-2.5 mb-3"
          style={{ fontSize: '13px', letterSpacing: '3px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}
        >
          <span style={{ width: '30px', height: '1px', background: 'rgba(255,255,255,0.3)', display: 'block' }} />
          TREATMENT ARCHIVE
        </div>

        {/* 5개 카드 — 항상 펼쳐서 한눈에 */}
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-3">
          {CARDS.map((card, i) => (
            <Link
              key={i}
              href={card.href}
              className="relative rounded-xl overflow-hidden block"
              style={{
                aspectRatio: '16/9',
                boxShadow: hoverIdx === i
                  ? '0 0 0 2.5px rgba(79,195,247,0.85), 0 16px 36px rgba(0,0,0,0.55), 0 0 24px rgba(79,195,247,0.25)'
                  : '0 4px 14px rgba(0,0,0,0.45)',
                transform: hoverIdx === i ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
                transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              }}
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
                  transform: hoverIdx === i ? 'scale(1.06)' : 'scale(1)',
                  transition: 'transform 0.5s ease',
                }}
              />
              {/* 그라디언트 스크림 */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, transparent 25%, rgba(8,12,30,0.90) 100%)' }}
              />
              {/* 책등 라벨 */}
              <span
                className="absolute"
                style={{
                  top: '8px', right: '8px',
                  fontSize: '10px', letterSpacing: '2px', color: '#4fc3f7',
                  fontWeight: 700, writingMode: 'vertical-rl',
                  background: 'rgba(15,20,43,0.85)', padding: '5px 4px',
                  borderRadius: '4px', border: '1px solid rgba(79,195,247,0.35)',
                }}
              >
                {card.spine}
              </span>
              {/* 타이틀 */}
              <div className="absolute bottom-0 left-0 right-0 p-2.5 lg:p-3">
                <h3 style={{ fontSize: 'clamp(12px, 1.35vw, 19px)', fontWeight: 700, color: '#fff', lineHeight: 1.25 }}>
                  {card.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

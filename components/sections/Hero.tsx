'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { SplitText } from '../shared/SplitText';
import { Counter } from '../shared/Counter';

const ParticleHero = dynamic(() => import('./ParticleHero').then(m => ({ default: m.ParticleHero })), { ssr: false });

export function Hero() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 720, background: 'var(--ink)', overflow: 'hidden', color: '#fff' }}>
      <ParticleHero />

      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(43,45,66,0.8) 100%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '120px 6vw 60px', pointerEvents: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="meta" style={{ color: 'rgba(255,255,255,0.5)' }}>EST. 2020 · SEOUL, GANGNAM</div>
          <div className="meta" style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'right' }}>N 37.50°<br />E 127.04°</div>
        </div>

        <div style={{ maxWidth: 1400 }}>
          <div style={{ marginBottom: 24, opacity: 0.6, fontSize: 13, letterSpacing: '0.3em', fontFamily: 'var(--font-en)' }}>
            <SplitText text="SEOUL · EGUN · DENTAL" />
          </div>
          <h1 style={{ fontSize: 'clamp(48px, 9vw, 148px)', fontWeight: 300, letterSpacing: '-0.045em', lineHeight: 0.95, color: '#fff' }}>
            <div><SplitText text="마음을 담아" delay={400} /></div>
            <div style={{ color: 'var(--sky)', fontStyle: 'italic', fontWeight: 200 }}>
              <SplitText text="정성을 다하여" delay={900} />
            </div>
          </h1>

          <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, maxWidth: 900, opacity: 0, animation: 'fadeIn 1.2s var(--ease) 2s forwards' }}>
            <div>
              <div className="meta" style={{ color: 'var(--sky)', marginBottom: 12 }}>진료철학</div>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.85)' }}>
                환자분 한 분 한 분의 눈높이에서 진심을 다합니다.<br />
                자연치아를 살리는 치료, 공부하는 원장, 맞춤형 상담과 계획.
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', pointerEvents: 'auto', opacity: 0, animation: 'fadeIn 1s var(--ease) 2.5s forwards' }}>
          <div style={{ display: 'flex', gap: 60 }}>
            {[
              { v: 2500, s: '+', l: '누적 치료' },
              { v: 4, s: '인', l: '전문의 구성' },
              { v: 98, s: '%', l: '재방문 의향' },
            ].map((s, i) => (
              <div key={i}>
                <div className="en" style={{ fontSize: 40, fontWeight: 300, letterSpacing: '-0.04em', color: '#fff' }}>
                  <Counter to={s.v} suffix={s.s} />
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4, letterSpacing: '0.05em' }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-ghost" style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}>
              전체 진료 안내 <span className="arrow">↓</span>
            </button>
            <button className="btn" style={{ background: 'var(--sky)', color: 'var(--ink)' }}>
              상담 예약 <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', opacity: scrolled ? 0 : 0.6, transition: 'opacity 0.4s', pointerEvents: 'none' }}>
        <div className="meta" style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>SCROLL</div>
        <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.3)', margin: '12px auto 0', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 15, background: 'var(--sky)', animation: 'scrollIndicator 2s ease-in-out infinite' }} />
        </div>
      </div>
    </section>
  );
}

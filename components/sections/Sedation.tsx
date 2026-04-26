'use client';
import { useMemo } from 'react';
import { Reveal } from '../shared/Reveal';

export function Sedation() {
  const bubbles = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      left: `${10 + Math.random() * 80}%`,
      top: `${20 + Math.random() * 70}%`,
      width: 20 + Math.random() * 60,
      height: 20 + Math.random() * 60,
      color: i % 2 === 0 ? 'rgba(0,128,200,0.15)' : 'rgba(146,220,229,0.5)',
      duration: `${6 + Math.random() * 6}s`,
      delay: `${Math.random() * 3}s`,
    })), []);

  return (
    <section className="section" id="sedation" style={{ background: '#fff' }}>
      <div className="section-inner">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'center' }}>
          <Reveal>
            <div style={{ position: 'relative', aspectRatio: '1/1.1', background: 'var(--sky-soft)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              {bubbles.map((b, i) => (
                <div key={i} style={{ position: 'absolute', left: b.left, top: b.top, width: b.width, height: b.height, borderRadius: '50%', background: b.color, animation: `float ${b.duration} ease-in-out ${b.delay} infinite` }} />
              ))}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '55%', aspectRatio: '1/1', borderRadius: '50%', background: 'radial-gradient(circle, var(--sky) 0%, rgba(146,220,229,0) 70%)', filter: 'blur(20px)' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <div className="en" style={{ fontSize: 11, letterSpacing: '0.3em', color: 'var(--blue)', marginBottom: 14 }}>N₂O · SAFE</div>
                <div style={{ fontSize: 128, fontWeight: 200, letterSpacing: '-0.05em', color: 'var(--ink)', lineHeight: 1 }}>
                  Z<span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>z</span>
                </div>
                <div style={{ fontSize: 16, color: 'var(--ink-soft)', marginTop: 8 }}>웃음가스 · 미다졸람</div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32 }}>
                <span className="meta" style={{ color: 'var(--blue)' }}>— 05 / 진정법</span>
                <span className="eyebrow">CONSCIOUS SEDATION</span>
              </div>
              <h2 className="section-title" style={{ marginBottom: 32 }}>
                편안한 수면치과치료를<br />
                <span className="accent">위한 솔루션</span>
              </h2>
              <p className="lead" style={{ marginBottom: 48 }}>
                치과 공포증이 있으신 분, 긴 시간의 수술이 필요한 분, 그리고 치료를 무서워하는 아이들을 위해. 안전이 검증된 의식하진정법으로 치료 과정을 편안하게 만듭니다.
              </p>
            </Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 48 }}>
              {[
                { t: '웃음가스 (N₂O)', d: '아산화질소를 산소와 함께 흡입. 의식은 유지하며 불안과 통증을 줄입니다.' },
                { t: '미다졸람 진정', d: '수면 유도 약물. 대부분의 치료 과정을 기억하지 않고 편안하게 마칩니다.' },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div style={{ padding: 28, background: 'var(--paper)', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)' }}>
                    <div style={{ fontSize: 17, fontWeight: 500, marginBottom: 10 }}>{item.t}</div>
                    <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-soft)' }}>{item.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-primary">진정법 상담 예약 <span className="arrow">→</span></button>
              <button className="btn btn-ghost">안전성 안내</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

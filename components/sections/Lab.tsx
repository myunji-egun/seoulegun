'use client';
import { Reveal } from '../shared/Reveal';
import { PH } from '../shared/PH';

export function Lab() {
  return (
    <section className="section" id="lab" style={{ background: 'var(--ink)', color: '#fff', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="section-inner">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'end', marginBottom: 60 }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32 }}>
              <span className="meta" style={{ color: 'var(--sky)' }}>— 07 / 기공소</span>
              <span className="eyebrow" style={{ color: 'var(--sky)' }}>DIGITAL LAB</span>
            </div>
            <h2 className="section-title" style={{ color: '#fff' }}>
              개인 맞춤 설계,<br />
              <span style={{ color: 'var(--sky)', fontStyle: 'italic' }}>원내 디지털 기공소</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="lead" style={{ color: 'rgba(255,255,255,0.7)' }}>
              원내에 디지털 기공소를 운영합니다. 당일 밀링, 당일 장착. 환자의 구강을 직접 본 진료팀과 기공사가 실시간으로 소통하며 보철물을 제작합니다.
            </p>
          </Reveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
          <Reveal>
            <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#000' }}>
              <PH label="디지털 기공소 영상 · 5-AXIS MILLING" dark style={{ height: '100%', borderRadius: 0 }} />
              <div
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 96, height: 96, borderRadius: '50%', background: 'var(--sky)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 60px rgba(146,220,229,0.4)', cursor: 'pointer', transition: 'transform 0.4s var(--ease)' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)')}
              >
                <div style={{ width: 0, height: 0, borderLeft: '18px solid var(--ink)', borderTop: '12px solid transparent', borderBottom: '12px solid transparent', marginLeft: 4 }} />
              </div>
              <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, display: 'flex', justifyContent: 'space-between', gap: 20, color: 'rgba(255,255,255,0.8)' }}>
                <div><div className="en meta" style={{ color: 'var(--sky)' }}>PRECISION</div><div style={{ fontSize: 20, fontWeight: 300 }} className="en">±10 μm</div></div>
                <div><div className="en meta" style={{ color: 'var(--sky)' }}>MILL TIME</div><div style={{ fontSize: 20, fontWeight: 300 }} className="en">~25 min</div></div>
                <div><div className="en meta" style={{ color: 'var(--sky)' }}>AXIS</div><div style={{ fontSize: 20, fontWeight: 300 }} className="en">5-AXIS CAD/CAM</div></div>
              </div>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 24 }}>
            {[
              { n: '01', t: '구강 스캐너', d: 'iTero · 정확한 디지털 인상' },
              { n: '02', t: 'CAD 설계', d: '환자별 치아 형태 맞춤 모델링' },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 120}>
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-md)', padding: 32, height: '100%' }}>
                  <div className="en" style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--sky)', marginBottom: 28 }}>STEP {s.n}</div>
                  <div style={{ fontSize: 28, fontWeight: 400, letterSpacing: '-0.03em', marginBottom: 8 }}>{s.t}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{s.d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

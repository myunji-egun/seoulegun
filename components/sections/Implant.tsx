'use client';
import { useState } from 'react';
import { Reveal } from '../shared/Reveal';
import { BeforeAfter } from '../shared/BeforeAfter';

const types = [
  { en: 'ALL-ON-4 / 6', ko: '올온 임플란트', tag: '최소한의 임플란트로 틀니 없이 내 치아처럼', items: ['4~6개의 임플란트로 전악 고정', '틀니의 불편함 해소', '수술 당일 임시 치아 장착'] },
  { en: 'IMMEDIATE LOADING', ko: '즉시로딩 임플란트', tag: '수술 직후 틀니 없이 식사가 가능한 치아 제작', items: ['당일 임시 보철', '저작 기능 즉시 회복', '최소 회복 기간'] },
  { en: 'NAVIGATION IMPLANT', ko: '네비게이션 임플란트', tag: '최소 절개 · 최소 침습 · 디지털 임플란트', items: ['3D CT 기반 시술 계획', '수술 가이드 제작', '정확한 식립 위치'] },
];

const faqs = [
  { q: '올온 임플란트는 어떤 분에게 적합한가요?', a: '전체 치아가 없거나 상태가 좋지 않아 전악 복원이 필요한 분, 기존 틀니의 불편함을 겪고 계신 분께 권장드립니다. 뼈 상태에 따라 4개 또는 6개의 임플란트로 고정합니다.' },
  { q: '수술 당일부터 음식을 먹을 수 있나요?', a: '즉시로딩 임플란트의 경우, 수술 당일 임시 보철물이 장착되어 부드러운 음식부터 식사가 가능합니다. 단단한 음식은 골유착이 완료된 후 가능합니다.' },
  { q: '임플란트 수명은 얼마나 되나요?', a: '구강 위생 관리와 정기 검진이 유지되면 평균 15년 이상, 평생 사용도 가능합니다. 서울이건치과는 평생 주치의로서 정기 유지관리를 함께 합니다.' },
  { q: '수술 후 통증이 심한가요?', a: '의식하진정법과 미세 절개 술식으로 통증을 최소화합니다. 대부분 수술 다음날부터 일상생활이 가능하며, 약물로 통증이 조절됩니다.' },
  { q: '네비게이션 임플란트의 장점은?', a: '3D CT와 구강 스캔 데이터를 기반으로 디지털 수술 가이드를 제작하여, 신경관과 혈관을 피해 정확한 위치에 식립합니다. 최소 절개가 가능해 회복이 빠릅니다.' },
];

function DarkAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <button onClick={() => setOpen(isOpen ? -1 : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '26px 0', textAlign: 'left', fontSize: 18, fontWeight: 400, color: isOpen ? 'var(--sky)' : '#fff', transition: 'color 0.3s' }}>
              <span style={{ display: 'flex', gap: 18, alignItems: 'baseline' }}>
                <span className="en" style={{ color: 'var(--sky)', fontSize: 12, letterSpacing: '0.1em' }}>Q.</span>
                {it.q}
              </span>
              <span style={{ width: 28, height: 28, border: `1px solid ${isOpen ? 'var(--sky)' : 'rgba(255,255,255,0.25)'}`, borderRadius: '50%', position: 'relative', transition: 'all 0.4s var(--ease)', transform: isOpen ? 'rotate(45deg)' : 'none', background: isOpen ? 'var(--sky)' : 'transparent', flexShrink: 0, display: 'inline-block' }}>
                <span style={{ position: 'absolute', top: '50%', left: '50%', width: 12, height: 1, background: isOpen ? 'var(--ink)' : '#fff', transform: 'translate(-50%, -50%)' }} />
                <span style={{ position: 'absolute', top: '50%', left: '50%', width: 1, height: 12, background: isOpen ? 'var(--ink)' : '#fff', transform: 'translate(-50%, -50%)' }} />
              </span>
            </button>
            <div style={{ maxHeight: isOpen ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.5s var(--ease)' }}>
              <div style={{ paddingBottom: 32, paddingRight: 60, display: 'flex', gap: 18, color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, fontSize: 15 }}>
                <span className="en" style={{ color: 'var(--sky)', fontSize: 12, letterSpacing: '0.1em' }}>A.</span>
                <span>{it.a}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Implant() {
  return (
    <section className="section" id="implant" style={{ background: 'var(--ink)', color: '#fff' }}>
      <div className="section-inner">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'end', marginBottom: 80 }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32 }}>
              <span className="meta" style={{ color: 'var(--sky)' }}>— 04 / 임플란트</span>
              <span className="eyebrow" style={{ color: 'var(--sky)' }}>FULL IMPLANT</span>
            </div>
            <h2 className="section-title" style={{ color: '#fff' }}>
              전체 임플란트<br />
              <span style={{ color: 'var(--sky)', fontStyle: 'italic' }}>이건치과 솔루션</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="lead" style={{ color: 'rgba(255,255,255,0.7)' }}>
              가장 적은 개수의 임플란트로 가장 편안한 저작을. 뼈가 부족해도, 전신 질환이 있으셔도 포기하지 않는 고난이도 증례를 집중적으로 다룹니다.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div style={{ marginBottom: 80 }}>
            <BeforeAfter height={520} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
              <span className="en">Drag to compare · 실제 치료 증례 · All-on-4 Case</span>
              <span className="en">CASE #042 · 2025</span>
            </div>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 100 }}>
          {types.map((t, i) => (
            <Reveal key={i} delay={i * 120}>
              <div
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-md)', padding: 40, height: '100%', transition: 'all 0.5s var(--ease)', cursor: 'pointer' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'var(--blue)'; el.style.borderColor = 'var(--blue)'; el.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'rgba(255,255,255,0.04)'; el.style.borderColor = 'rgba(255,255,255,0.08)'; el.style.transform = 'none'; }}
              >
                <div className="en" style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--sky)', marginBottom: 40 }}>TYPE / {String(i + 1).padStart(2, '0')}</div>
                <h4 style={{ fontSize: 32, fontWeight: 400, letterSpacing: '-0.03em', marginBottom: 12 }}>{t.ko}</h4>
                <div className="en" style={{ fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>{t.en}</div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', fontStyle: 'italic', marginBottom: 32 }}>&quot; {t.tag} &quot;</p>
                <ul style={{ listStyle: 'none', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  {t.items.map((it, j) => (
                    <li key={j} style={{ padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: 13, color: 'rgba(255,255,255,0.85)', display: 'flex', gap: 12 }}>
                      <span className="en" style={{ color: 'var(--sky)' }}>—</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80 }}>
          <Reveal>
            <div>
              <div className="meta" style={{ color: 'var(--sky)', marginBottom: 16 }}>FREQUENTLY ASKED</div>
              <h3 style={{ fontSize: 44, fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.15 }}>
                궁금한 점을<br />먼저 풀어드립니다.
              </h3>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <DarkAccordion items={faqs} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

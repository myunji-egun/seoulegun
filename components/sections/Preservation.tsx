'use client';
import { useState } from 'react';
import { SectionHeader } from '../shared/SectionHeader';
import { Reveal } from '../shared/Reveal';
import { PH } from '../shared/PH';

const treatments = [
  { title: '최소삭제 충치치료', tag: '꼭 필요한 치료만 하겠습니다', summary: '자연치아를 최대한 보존하며, 손상된 부분만 정밀하게 제거합니다. 마이크로스코프로 확대된 시야에서 밀리미터 단위의 삭제를 설계합니다.', options: ['레진빌드업', '최소삭제 인레이', '최소삭제 온레이', '최소삭제 크라운'], keywords: ['최소삭제', '마이크로스코프', '정밀 삭제'] },
  { title: 'VPT 신경보존술', tag: '통증은 줄이고 신경은 살리고', summary: '신경을 보존하여 치아의 생활력을 유지하는 술식. 깊은 충치에서도 신경치료 없이 마무리할 수 있는 가능성을 먼저 검토합니다.', options: ['직접치수복조', '부분치수절단술', '전치수절단술', 'MTA · Biodentine'], keywords: ['Vital Pulp Therapy', '신경보존', '살아있는 치아'] },
  { title: '근관치료 (신경치료)', tag: '손상된 신경의 치료 · 내 치아 살리기', summary: '불가피한 경우 신경치료로 치아 구조를 지킵니다. 마이크로스코프와 디지털 근관장측정기로 재발률을 최소화합니다.', options: ['마이크로 근관치료', '재근관치료', '근관치료 후 보철', '3D 가이드 시술'], keywords: ['마이크로스코프', '재발률 최소화'] },
  { title: '잇몸치료', tag: '시니어를 위한 최고의 치료', summary: '잇몸 건강은 평생 치아의 토대입니다. 정기적인 치석 제거부터 치주 수술까지 개개인의 잇몸 상태에 맞춰 진행합니다.', options: ['스케일링', '잇몸 소파술', '치주 수술', '유지 관리'], keywords: ['치주', '예방', '유지'] },
];

const steps = ['정밀 진단 · 구강 검사', '3D 시뮬레이션', '최소삭제 시술', '사후 관리 · 정기 점검'];

export function Preservation() {
  const [tab, setTab] = useState(0);
  const t = treatments[tab];

  return (
    <section className="section" id="preservation" style={{ background: 'var(--paper)', borderTop: '1px solid var(--line)' }}>
      <div className="section-inner">
        <SectionHeader
          number="— 03 / 자연치아"
          eyebrow="PRESERVATION"
          title='내 치아를 살리는<br/><span class="accent">이건치과 솔루션</span>'
          description="인공 치아는 자연 치아를 대체할 수 없습니다. 깎아내기 전에, 뽑기 전에, 살릴 수 있는지를 먼저 봅니다."
          align="split"
        />

        <div style={{ display: 'flex', gap: 0, marginBottom: 60, borderBottom: '1px solid var(--line)', overflowX: 'auto' }}>
          {treatments.map((tr, i) => (
            <button key={i} onClick={() => setTab(i)} style={{ padding: '20px 28px', fontSize: 16, fontWeight: 500, color: tab === i ? 'var(--blue)' : 'var(--ink-faint)', borderBottom: tab === i ? '2px solid var(--blue)' : '2px solid transparent', marginBottom: -1, transition: 'all 0.3s var(--ease)', whiteSpace: 'nowrap' }}>
              <span className="en" style={{ fontSize: 11, marginRight: 10, letterSpacing: '0.1em', opacity: 0.6 }}>0{i + 1}</span>
              {tr.title}
            </button>
          ))}
        </div>

        <div key={tab} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, animation: 'fadeInUp 0.6s var(--ease)' }}>
          <div>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 13, color: 'var(--blue)', letterSpacing: '0.1em', marginBottom: 16 }}>&quot; {t.tag} &quot;</div>
              <h3 style={{ fontSize: 56, fontWeight: 500, letterSpacing: '-0.035em', lineHeight: 1.1 }}>{t.title}</h3>
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: 40 }}>{t.summary}</p>
            <div style={{ marginBottom: 40 }}>
              <div className="meta" style={{ marginBottom: 16 }}>치료 방법</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {t.options.map((o, i) => (
                  <span key={i} style={{ padding: '10px 16px', background: '#fff', border: '1px solid var(--line)', borderRadius: 999, fontSize: 13, color: 'var(--ink)' }}>{o}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {t.keywords.map((k, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ color: 'var(--blue)', fontSize: 10, lineHeight: 1 }}>●</span>
                  <span style={{ fontSize: 14, color: 'var(--ink-soft)' }}>{k}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-primary" style={{ marginTop: 48 }}>상세 치료과정 보기 <span className="arrow">→</span></button>
          </div>

          <Reveal>
            <div style={{ position: 'sticky', top: 80 }}>
              <PH label="치료 과정 이미지" height={320} style={{ marginBottom: 32 }} />
              <div className="meta" style={{ marginBottom: 20 }}>Treatment Process</div>
              {steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 20, padding: '20px 0', borderBottom: i < 3 ? '1px solid var(--line)' : 'none', alignItems: 'center' }}>
                  <span className="en" style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--blue)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 500, flexShrink: 0 }}>0{i + 1}</span>
                  <span style={{ fontSize: 16, color: 'var(--ink)' }}>{step}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

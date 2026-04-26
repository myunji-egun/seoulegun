'use client';
import { useState } from 'react';
import { SectionHeader } from '../shared/SectionHeader';
import { Reveal } from '../shared/Reveal';
import { Counter } from '../shared/Counter';
import { BeforeAfter } from '../shared/BeforeAfter';

const tabs = {
  invisalign: {
    ko: '인비절라인 투명교정',
    tag: '가장 정확한 투명교정 인비절라인',
    summary: '3D 시뮬레이션으로 치아의 움직임을 예측합니다. 투명한 장치로 교정 사실이 드러나지 않으며, 식사와 양치가 자유롭습니다.',
    stats: [{ v: 95, u: '%', l: '환자 만족도' }, { v: 18, u: '개월', l: '평균 기간' }, { v: 22, u: 'h/일', l: '권장 착용' }],
  },
  growth: {
    ko: '소아 성장기 교정',
    tag: '성장기에만 할 수 있는 돌출입 · 무턱 교정',
    summary: '아이의 턱 성장을 활용하는 교정. 성인이 된 후에는 수술로만 가능한 변화를, 성장기에는 장치만으로 유도할 수 있습니다.',
    stats: [{ v: 7, u: '~10세', l: '최적 시기' }, { v: 12, u: '개월', l: '평균 기간' }, { v: 100, u: '%', l: '비수술 교정' }],
  },
};

export function Ortho() {
  const [tab, setTab] = useState<'invisalign' | 'growth'>('invisalign');
  const t = tabs[tab];

  return (
    <section className="section" id="ortho" style={{ background: 'var(--paper)' }}>
      <div className="section-inner">
        <SectionHeader
          number="— 06 / 교정"
          eyebrow="ORTHODONTICS & AESTHETIC"
          title='서울이건 <span class="accent">교정치료</span>'
          description="심미보철과 교정. 라미네이트부터 소아 성장기 교정까지 — 아름다움과 기능의 균형을 설계합니다."
          align="split"
        />

        <div style={{ display: 'inline-flex', background: '#fff', padding: 6, borderRadius: 999, marginBottom: 48, border: '1px solid var(--line)' }}>
          {(Object.entries(tabs) as [string, typeof tabs['invisalign']][]).map(([k, v]) => (
            <button key={k} onClick={() => setTab(k as 'invisalign' | 'growth')} style={{ padding: '12px 28px', borderRadius: 999, fontSize: 14, fontWeight: 500, background: tab === k ? 'var(--ink)' : 'transparent', color: tab === k ? '#fff' : 'var(--ink-soft)', transition: 'all 0.3s var(--ease)' }}>
              {v.ko}
            </button>
          ))}
        </div>

        <div key={tab} style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80, alignItems: 'start', animation: 'fadeInUp 0.5s var(--ease)' }}>
          <div>
            <div style={{ fontSize: 13, color: 'var(--blue)', letterSpacing: '0.05em', marginBottom: 16 }}>&quot; {t.tag} &quot;</div>
            <h3 style={{ fontSize: 56, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 1.1, marginBottom: 32 }}>{t.ko}</h3>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: 48 }}>{t.summary}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, background: 'var(--line)', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 40 }}>
              {t.stats.map((s, i) => (
                <div key={i} style={{ background: '#fff', padding: '32px 24px' }}>
                  <div className="en" style={{ fontSize: 44, fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 1 }}>
                    <Counter to={s.v} />
                    <span style={{ color: 'var(--blue)', fontSize: 18, marginLeft: 4 }}>{s.u}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-faint)', marginTop: 8 }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div className="meta" style={{ marginBottom: 16 }}>FURTHER · 심미보철</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {['최소삭제 라미네이트', '앞니 레진빌드업', '잇몸성형술'].map((k, i) => (
                <div key={i} style={{ padding: 18, background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 500 }}>{k}</div>
              ))}
            </div>
          </div>
          <Reveal>
            <BeforeAfter height={480} />
            <div style={{ marginTop: 16, fontSize: 12, color: 'var(--ink-faint)' }} className="en">DRAG · 실제 증례</div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

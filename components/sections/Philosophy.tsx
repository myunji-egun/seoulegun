'use client';
import { SectionHeader } from '../shared/SectionHeader';
import { Reveal } from '../shared/Reveal';

const values = [
  { num: '01', ko: '진심', en: 'SINCERITY', d: '환자분의 불편에 공감하며 소통합니다. 한 분 한 분의 눈높이에서 치료 계획을 설계합니다.' },
  { num: '02', ko: '보존', en: 'PRESERVATION', d: '최소삭제를 원칙으로, 꼭 필요한 치료만 합니다. 자연치아를 최우선으로 살립니다.' },
  { num: '03', ko: '공부', en: 'STUDY', d: '끊임없이 공부하는 원장. 최신 술식과 장비, 고난이도 증례에 대한 임상 연구를 지속합니다.' },
  { num: '04', ko: '정성', en: 'DEVOTION', d: '한 자리에서 변하지 않는 마음. 평생 주치의로서의 책임감을 지킵니다.' },
];

export function Philosophy() {
  return (
    <section className="section" id="philosophy" style={{ background: 'var(--paper)' }}>
      <div className="section-inner">
        <SectionHeader
          number="— 01 / 철학"
          eyebrow="OUR PHILOSOPHY"
          title='서울이건의 <span class="accent">네 가지</span><br/>변하지 않는 마음.'
          description="고난이도 진료, 서울대 출신 대표원장. 치료를 시작하기 전에 환자분의 이야기를 먼저 듣습니다. 치료를 마친 후에도 한 자리에서 계속 뵙습니다."
          align="split"
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, background: 'var(--line)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          {values.map((v, i) => (
            <Reveal key={i} delay={i * 120}>
              <div
                style={{ background: '#fff', padding: '48px 36px 56px', minHeight: 380, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', transition: 'all 0.5s var(--ease)', cursor: 'default' }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.background = 'var(--ink)';
                  el.querySelectorAll<HTMLElement>('.p-text').forEach(t => (t.style.color = '#fff'));
                  (el.querySelector<HTMLElement>('.p-num') as HTMLElement).style.color = 'var(--sky)';
                  (el.querySelector<HTMLElement>('.p-circle') as HTMLElement).style.transform = 'scale(1)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.background = '#fff';
                  el.querySelectorAll<HTMLElement>('.p-text').forEach(t => (t.style.color = ''));
                  (el.querySelector<HTMLElement>('.p-num') as HTMLElement).style.color = '';
                  (el.querySelector<HTMLElement>('.p-circle') as HTMLElement).style.transform = 'scale(0)';
                }}
              >
                <div className="p-circle" style={{ position: 'absolute', top: -80, right: -80, width: 260, height: 260, borderRadius: '50%', background: 'var(--blue)', opacity: 0.15, transform: 'scale(0)', transition: 'transform 0.7s var(--ease)' }} />
                <div style={{ position: 'relative' }}>
                  <div className="p-num en" style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 500, letterSpacing: '0.15em', marginBottom: 20, transition: 'color 0.4s' }}>{v.num}</div>
                  <div className="p-text" style={{ fontSize: 44, fontWeight: 500, letterSpacing: '-0.03em', color: 'var(--ink)', transition: 'color 0.4s' }}>{v.ko}</div>
                  <div className="p-text en" style={{ fontSize: 11, letterSpacing: '0.3em', color: 'var(--ink-faint)', marginTop: 6, transition: 'color 0.4s' }}>{v.en}</div>
                </div>
                <div className="p-text" style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-soft)', marginTop: 80, position: 'relative', transition: 'color 0.4s' }}>{v.d}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ marginTop: 100, borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '40px 0', overflow: 'hidden' }}>
          <div className="marquee">
            {[...Array(2)].map((_, k) => (
              <div key={k} style={{ display: 'flex', gap: 60, alignItems: 'center' }}>
                {['자연치아 보존', 'VPT 신경보존술', '최소삭제 충치치료', '올온임플란트', '인비절라인', '의식하진정법', '디지털 기공소', '소아 성장기 교정'].map((t, i) => (
                  <span key={i} style={{ display: 'contents' }}>
                    <span style={{ fontSize: 44, fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--ink)' }}>{t}</span>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--sky)', flexShrink: 0, display: 'inline-block' }} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

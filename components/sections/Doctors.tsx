'use client';
import { useState } from 'react';
import { SectionHeader } from '../shared/SectionHeader';
import { Reveal } from '../shared/Reveal';
import { PH } from '../shared/PH';

const doctors = [
  {
    name: '이재성', role: '대표원장', spec: '보존과 전문의 · 서울대학교',
    en: 'DR. LEE JAE-SEONG',
    detail: '자연치아 보존과 신경치료(VPT)의 임상 전문가. 마이크로스코프를 활용한 고난이도 근관치료와 최소삭제 인레이/온레이 증례를 집중 연구합니다.',
    career: ['서울대학교 치의학대학원 졸업', '서울대학교병원 치과보존과 수련', '대한치과보존학회 정회원', '現 서울이건치과 대표원장'],
    letter: '"환자분의 치아는 단 한 번뿐입니다. 그래서 더 공부하고, 더 고민합니다."',
  },
  {
    name: '유수현', role: '교정과 원장', spec: '교정과 전문의 · 인비절라인 다이아몬드',
    en: 'DR. YOU SOO-HYUN',
    detail: '인비절라인 투명교정과 성장기 소아 교정을 전문으로 하는 교정과 전문의. 개개인의 치아 움직임을 3D로 시뮬레이션하여 가장 정확한 교정 계획을 수립합니다.',
    career: ['서울대학교 치의학대학원 졸업', '교정과 전문의 자격 취득', 'Invisalign Diamond Provider', '대한치과교정학회 정회원'],
    letter: '"아이의 성장기는 다시 오지 않습니다. 때를 놓치지 않는 교정이 진짜 교정입니다."',
  },
  {
    name: '김지후', role: '소아치과 원장', spec: '소아치과 전문의',
    en: 'DR. KIM JI-HOO',
    detail: '아이들이 치과를 무서워하지 않도록. 웃음가스와 행동유도법을 활용한 트라우마 없는 소아 진료를 지향합니다.',
    career: ['서울대학교 치의학대학원 졸업', '소아치과 전문의 자격 취득', '대한소아치과학회 정회원', '웃음가스 진정요법 인증'],
    letter: '"아이의 눈높이에서, 아이의 속도로. 치과가 즐거운 기억이 되도록."',
  },
  {
    name: '박민우', role: '임플란트 원장', spec: '구강외과 · 네비게이션 임플란트',
    en: 'DR. PARK MIN-WOO',
    detail: '디지털 네비게이션을 활용한 최소침습 임플란트와 전체 임플란트(All-on-X) 증례 전문. 즉시로딩으로 수술 당일 저작 기능 회복을 구현합니다.',
    career: ['서울대학교 치의학대학원 졸업', '구강외과 수련', 'All-on-X 임플란트 국제 인증', '대한구강악안면임플란트학회 정회원'],
    letter: '"가장 적은 개수의 임플란트로, 가장 편안한 저작을. 그것이 저의 원칙입니다."',
  },
];

export function Doctors() {
  const [active, setActive] = useState(0);
  const a = doctors[active];

  return (
    <section className="section" id="doctors" style={{ background: '#fff', borderTop: '1px solid var(--line)' }}>
      <div className="section-inner">
        <SectionHeader
          number="— 02 / 의료진"
          eyebrow="OUR DOCTORS"
          title='한 자리에서 <span class="accent">변하지 않는</span><br/>마음.'
          description="전문의료진으로 구성된 서울이건치과. 각 분야 최고 수준의 전문의가 협진하여 한 분의 환자를 진료합니다."
          align="split"
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'start' }}>
          <Reveal>
            <div>
              <div style={{ position: 'relative', marginBottom: 24 }}>
                <PH label={a.en + ' — PORTRAIT'} height={520} />
                <div style={{ position: 'absolute', bottom: 20, left: 20, background: 'var(--ink)', color: '#fff', padding: '12px 18px', borderRadius: 'var(--radius-sm)', display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ width: 8, height: 8, background: 'var(--sky)', borderRadius: '50%' }} />
                  <span style={{ fontSize: 12, letterSpacing: '0.05em' }}>{a.spec}</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, background: 'var(--line)' }}>
                {doctors.map((d, i) => (
                  <button key={i} onClick={() => setActive(i)} style={{ background: active === i ? 'var(--ink)' : '#fff', color: active === i ? '#fff' : 'var(--ink)', padding: '16px 8px', textAlign: 'center', transition: 'all 0.3s var(--ease)' }}>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{d.name}</div>
                    <div style={{ fontSize: 10, opacity: 0.6, marginTop: 2, letterSpacing: '0.05em' }}>{d.role}</div>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div key={active} style={{ animation: 'fadeInUp 0.6s var(--ease)' }}>
            <div className="en" style={{ fontSize: 12, letterSpacing: '0.25em', color: 'var(--blue)', marginBottom: 24 }}>{a.en}</div>
            <h3 style={{ fontSize: 72, fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 16 }}>
              {a.name}<span style={{ color: 'var(--blue)', fontSize: 24, marginLeft: 16, verticalAlign: 'middle', fontWeight: 400 }}>{a.role}</span>
            </h3>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: 48 }}>{a.detail}</p>
            <div style={{ background: 'var(--sky-soft)', padding: '36px 40px', borderRadius: 'var(--radius-md)', marginBottom: 48, position: 'relative' }}>
              <div style={{ fontSize: 40, lineHeight: 0.3, color: 'var(--blue)', opacity: 0.4, marginBottom: 4 }}>&quot;</div>
              <p style={{ fontSize: 20, lineHeight: 1.65, color: 'var(--ink)', fontStyle: 'italic', fontWeight: 300, letterSpacing: '-0.02em' }}>{a.letter}</p>
              <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 1, background: 'var(--ink)' }} />
                <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{a.name} 원장 · 손글씨 편지에서</span>
              </div>
            </div>
            <div>
              <div className="meta" style={{ marginBottom: 20 }}>약력 · CAREER</div>
              <ul style={{ listStyle: 'none' }}>
                {a.career.map((c, i) => (
                  <li key={i} style={{ display: 'flex', gap: 20, padding: '14px 0', borderBottom: '1px solid var(--line)', fontSize: 15, color: 'var(--ink-soft)' }}>
                    <span className="en" style={{ color: 'var(--blue)', fontSize: 12, fontWeight: 500, flexShrink: 0, paddingTop: 4 }}>{String(i + 1).padStart(2, '0')}</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

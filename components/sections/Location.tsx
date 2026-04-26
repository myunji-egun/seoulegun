import { SectionHeader } from '../shared/SectionHeader';
import { Reveal } from '../shared/Reveal';

const info = [
  { l: '진료시간', lines: ['평일 10:00 — 19:30', '토요일 10:00 — 15:00', '일요일 · 공휴일 휴진'] },
  { l: '점심시간', lines: ['평일 13:00 — 14:00'] },
  { l: '연락처', lines: ['02-000-0000 · 본관', '02-000-0001 · 별관 (소아 · 교정)'] },
  { l: '대중교통', lines: ['2호선 강남역 ○번 출구 도보 5분', '신분당선 강남역 ○번 출구'] },
  { l: '주차', lines: ['지하 주차장 이용 가능', '진료 시 2시간 무료'] },
];

export function Location() {
  return (
    <section className="section" id="location" style={{ background: '#fff' }}>
      <div className="section-inner">
        <SectionHeader
          number="— 09 / 오시는길"
          eyebrow="VISIT US"
          title='서울이건치과에<br/><span class="accent">오시는 길</span>'
          description="본관과 별관을 함께 운영합니다. 일반 진료는 본관, 소아치과와 교정과는 별관에서 진행됩니다."
          align="split"
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 40 }}>
          <Reveal>
            <div style={{ position: 'relative', height: 540, borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--paper)', border: '1px solid var(--line)' }}>
              <svg width="100%" height="100%" viewBox="0 0 600 500" preserveAspectRatio="xMidYMid slice" style={{ background: '#F0F4F7' }}>
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(43,45,66,0.04)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="600" height="500" fill="url(#grid)" />
                <path d="M 0 200 Q 150 180 300 220 T 600 260" stroke="rgba(146,220,229,0.5)" strokeWidth="32" fill="none" />
                <path d="M 300 0 Q 320 150 280 280 T 340 500" stroke="rgba(146,220,229,0.3)" strokeWidth="20" fill="none" />
                <path d="M 100 350 L 500 380" stroke="rgba(146,220,229,0.2)" strokeWidth="14" fill="none" />
                {([[50,100],[180,260],[420,120],[480,340],[200,420]] as [number,number][]).map(([x,y],i) => (
                  <rect key={i} x={x} y={y} width="70" height="50" fill="#fff" stroke="rgba(43,45,66,0.08)" rx="3" />
                ))}
                <g transform="translate(300, 220)">
                  <circle r="60" fill="rgba(0,128,200,0.1)">
                    <animate attributeName="r" values="40;80;40" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle r="16" fill="var(--blue)" />
                  <circle r="6" fill="#fff" />
                </g>
              </svg>
              <div style={{ position: 'absolute', top: 24, left: 24, background: '#fff', padding: 24, borderRadius: 'var(--radius-sm)', maxWidth: 260, boxShadow: '0 20px 50px -20px rgba(0,0,0,0.15)' }}>
                <div className="meta" style={{ color: 'var(--blue)', marginBottom: 8 }}>서울이건치과 · 본관</div>
                <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink)' }}>
                  서울 강남구 테헤란로 ○○길 ○○<br />○○빌딩 3F, 4F
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div>
              {info.map((item, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 24, padding: '22px 0', borderBottom: '1px solid var(--line)' }}>
                  <div className="meta" style={{ color: 'var(--blue)', paddingTop: 4 }}>{item.l}</div>
                  <div style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink)' }}>
                    {item.lines.map((l, k) => <div key={k}>{l}</div>)}
                  </div>
                </div>
              ))}
              <button className="btn btn-primary" style={{ marginTop: 32 }}>
                네이버 지도에서 보기 <span className="arrow">→</span>
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

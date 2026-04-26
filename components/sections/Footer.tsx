'use client';

const footerCols = [
  { t: 'TREATMENTS', items: ['자연치아 보존', '임플란트', '심미보철', '교정', '소아치과'] },
  { t: 'INFO', items: ['병원 소개', '의료진', '내부 전경', '디지털 기공소', '오시는길'] },
  { t: 'MEDIA', items: ['이건 TV', '원장 칼럼', '치료 후기', '공지사항'] },
];

export function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: '#fff', padding: '100px 6vw 40px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 60, marginBottom: 80 }}>
          <div>
            <div style={{ fontSize: 32, fontWeight: 300, letterSpacing: '-0.03em', marginBottom: 16 }}>
              서울이건<span style={{ color: 'var(--sky)' }}>.</span>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 360 }}>
              마음을 담아 정성을 다하여. 자연치아를 살리는 치료, 한 자리에서 변하지 않는 마음으로.
            </p>
          </div>
          {footerCols.map((col, i) => (
            <div key={i}>
              <div className="meta" style={{ color: 'var(--sky)', marginBottom: 20 }}>{col.t}</div>
              <ul style={{ listStyle: 'none' }}>
                {col.items.map((item, j) => (
                  <li key={j}
                    style={{ padding: '8px 0', fontSize: 14, color: 'rgba(255,255,255,0.75)', cursor: 'pointer', transition: 'color 0.3s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--sky)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                  >{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 32, display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.4)' }} className="en">
          <div>© 2026 SEOUL EGUN DENTAL CLINIC · ALL RIGHTS RESERVED</div>
          <div>DESIGN · IN-HOUSE</div>
        </div>
      </div>
    </footer>
  );
}

'use client';
import { SectionHeader } from '../shared/SectionHeader';
import { Reveal } from '../shared/Reveal';

const reviews = [
  { name: '김*영', age: '50대 여성', treatment: '올온 임플란트', text: '뼈가 부족해서 다른 병원에서는 어렵다고 했는데, 서울이건에서 포기하지 않고 수술해주셨어요. 수술 당일부터 임시 치아를 해주셔서 식사도 가능했습니다.', stars: 5 },
  { name: '박*준', age: '30대 남성', treatment: 'VPT 신경보존술', text: '다른 치과에서는 모두 신경치료라고 했는데, 여기서는 신경을 살려주셨어요. 통증 없이 내 치아로 그대로 쓰고 있습니다.', stars: 5 },
  { name: '이*아', age: '20대 여성', treatment: '인비절라인', text: '교정 중인지 모를 정도로 티가 안 나서 좋아요. 매번 3D로 치아가 어떻게 움직일지 보여주셔서 안심됐습니다.', stars: 5 },
  { name: '최*희', age: '40대 여성', treatment: '아이 성장기 교정', text: '아이가 치과를 무서워했는데, 소아과 원장님이 눈높이에서 설명해주셔서 스스로 가고 싶어해요. 무턱 교정도 잘 진행 중입니다.', stars: 5 },
];

const columns = [
  { t: '자연치아는 왜 살려야 하는가', date: 'APR 18, 2026', read: '6 min' },
  { t: 'VPT, 신경치료의 새로운 관점', date: 'APR 02, 2026', read: '8 min' },
  { t: '올온-X, 뼈가 부족해도 가능한 이유', date: 'MAR 21, 2026', read: '12 min' },
];

export function Media() {
  return (
    <section className="section" id="media" style={{ background: 'var(--paper)' }}>
      <div className="section-inner">
        <SectionHeader
          number="— 08 / 미디어"
          eyebrow="EGUN MEDIA"
          title='환자분의 이야기와<br/><span class="accent">원장의 기록.</span>'
          description="네이버 플레이스 실제 리뷰, 이재성 원장의 칼럼, 이건TV. 진료실 밖에서도 환자분과 소통합니다."
          align="split"
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginBottom: 100 }}>
          {reviews.map((r, i) => (
            <Reveal key={i} delay={(i % 2) * 80}>
              <div className="card" style={{ padding: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--sky-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)', fontWeight: 500 }}>{r.name[0]}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{r.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--ink-faint)' }}>{r.age} · {r.treatment}</div>
                    </div>
                  </div>
                  <div style={{ color: 'var(--blue)', fontSize: 14, letterSpacing: '0.1em' }}>{'★'.repeat(r.stars)}</div>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-soft)' }}>&quot;{r.text}&quot;</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 60 }}>
          <div>
            <div className="meta" style={{ marginBottom: 24 }}>이재성 원장 · 칼럼</div>
            {columns.map((c, i) => (
              <Reveal key={i} delay={i * 80}>
                <a
                  href="#"
                  style={{ display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: 30, padding: '30px 0', borderTop: i === 0 ? '1px solid var(--line)' : 'none', borderBottom: '1px solid var(--line)', alignItems: 'center', transition: 'all 0.4s var(--ease)' }}
                  onMouseEnter={e => { e.currentTarget.style.paddingLeft = '20px'; (e.currentTarget.querySelector('.arr') as HTMLElement).style.transform = 'translateX(8px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.paddingLeft = '0'; (e.currentTarget.querySelector('.arr') as HTMLElement).style.transform = 'none'; }}
                >
                  <span className="en meta" style={{ color: 'var(--blue)' }}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 6 }}>{c.t}</div>
                    <div className="en" style={{ fontSize: 11, letterSpacing: '0.15em', color: 'var(--ink-faint)' }}>{c.date} · {c.read}</div>
                  </div>
                  <span className="arr en" style={{ color: 'var(--blue)', fontSize: 20, transition: 'transform 0.4s var(--ease)' }}>→</span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <div style={{ background: 'var(--ink)', color: '#fff', padding: 40, borderRadius: 'var(--radius-md)', position: 'relative', overflow: 'hidden', aspectRatio: '1/1.2', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="meta" style={{ color: 'var(--sky)', marginBottom: 16 }}>이건 TV · YOUTUBE</div>
                <h4 style={{ fontSize: 36, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 1.1, color: '#fff' }}>영상으로 만나는 서울이건.</h4>
              </div>
              <div style={{ aspectRatio: '16/9', background: 'rgba(146,220,229,0.1)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--sky)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 0, height: 0, borderLeft: '14px solid var(--ink)', borderTop: '10px solid transparent', borderBottom: '10px solid transparent', marginLeft: 4 }} />
                </div>
              </div>
              <button className="btn" style={{ background: 'var(--sky)', color: 'var(--ink)', alignSelf: 'flex-start' }}>이건TV 구독 <span className="arrow">→</span></button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

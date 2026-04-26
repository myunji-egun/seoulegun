'use client';
import { useEffect, useState } from 'react';

const menuItems = [
  { id: 'philosophy', l: '치과 소개' },
  { id: 'preservation', l: '자연치아 보존' },
  { id: 'implant', l: '임플란트' },
  { id: 'ortho', l: '교정 · 심미' },
  { id: 'sedation', l: '진정법' },
  { id: 'media', l: '미디어' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      padding: '20px 6vw',
      background: scrolled ? 'rgba(248,247,249,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      transition: 'all 0.4s var(--ease)',
      color: scrolled ? 'var(--ink)' : '#fff',
    }}>
      <div style={{ maxWidth: 1600, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#" style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em' }}>
          서울이건<span style={{ color: 'var(--sky)' }}>.</span>
        </a>
        <div style={{ display: 'flex', gap: 36 }}>
          {menuItems.map(m => (
            <a key={m.id} href={`#${m.id}`} style={{ fontSize: 14, fontWeight: 500, letterSpacing: '-0.01em', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue)')}
              onMouseLeave={e => (e.currentTarget.style.color = '')}>
              {m.l}
            </a>
          ))}
        </div>
        <button style={{
          padding: '10px 20px',
          background: scrolled ? 'var(--ink)' : 'rgba(255,255,255,0.15)',
          color: '#fff',
          border: scrolled ? 'none' : '1px solid rgba(255,255,255,0.25)',
          borderRadius: 999, fontSize: 13, fontWeight: 500,
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s var(--ease)',
        }}>
          상담 예약 →
        </button>
      </div>
    </nav>
  );
}

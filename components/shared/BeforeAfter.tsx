'use client';
import { useRef, useEffect, useState } from 'react';
import { PH } from './PH';

export function BeforeAfter({ beforeLabel = 'BEFORE', afterLabel = 'AFTER', height = 420 }: {
  beforeLabel?: string;
  afterLabel?: string;
  height?: number;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      handleMove(x);
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ position: 'relative', height, borderRadius: 'var(--radius-md)', overflow: 'hidden', cursor: 'ew-resize', userSelect: 'none' }}
      onMouseDown={(e) => { dragging.current = true; handleMove(e.clientX); }}
      onTouchStart={(e) => { dragging.current = true; handleMove(e.touches[0].clientX); }}
    >
      <div style={{ position: 'absolute', inset: 0 }}>
        <PH label={afterLabel + ' — 치료 후'} style={{ height: '100%', borderRadius: 0 }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)` }}>
        <div className="ph dark" style={{ height: '100%', borderRadius: 0 }}>
          <span>{beforeLabel} — 치료 전</span>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${pos}%`, width: 2, background: '#fff', transform: 'translateX(-1px)', boxShadow: '0 0 30px rgba(0,0,0,0.3)' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 48, height: 48, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.25)' }}>
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path d="M7 5 L3 10 L7 15 M13 5 L17 10 L13 15" stroke="var(--ink)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 20, left: 20, background: 'rgba(43,45,66,0.85)', color: '#fff', padding: '6px 12px', borderRadius: 4, fontSize: 11, letterSpacing: '0.15em', fontFamily: 'var(--font-en)' }}>{beforeLabel}</div>
      <div style={{ position: 'absolute', top: 20, right: 20, background: 'var(--blue)', color: '#fff', padding: '6px 12px', borderRadius: 4, fontSize: 11, letterSpacing: '0.15em', fontFamily: 'var(--font-en)' }}>{afterLabel}</div>
    </div>
  );
}

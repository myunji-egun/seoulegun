'use client';
import { useRef, useState } from 'react';

export function AccordionItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <div style={{ borderBottom: '1px solid var(--line)' }}>
      <button
        onClick={onToggle}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '28px 0', textAlign: 'left', fontSize: 18, fontWeight: 500, color: isOpen ? 'var(--blue)' : 'var(--ink)', transition: 'color 0.3s var(--ease)' }}
      >
        <span style={{ display: 'flex', gap: 18, alignItems: 'baseline' }}>
          <span className="en" style={{ color: 'var(--blue)', fontSize: 13, fontWeight: 500, letterSpacing: '0.1em' }}>Q.</span>
          {q}
        </span>
        <span style={{ display: 'inline-block', width: 28, height: 28, border: '1px solid var(--line)', borderRadius: '50%', position: 'relative', transition: 'transform 0.4s var(--ease), background 0.3s var(--ease)', transform: isOpen ? 'rotate(45deg)' : 'none', background: isOpen ? 'var(--blue)' : 'transparent', borderColor: isOpen ? 'var(--blue)' : 'var(--line)', flexShrink: 0 }}>
          <span style={{ position: 'absolute', top: '50%', left: '50%', width: 12, height: 1, background: isOpen ? '#fff' : 'var(--ink)', transform: 'translate(-50%, -50%)' }} />
          <span style={{ position: 'absolute', top: '50%', left: '50%', width: 1, height: 12, background: isOpen ? '#fff' : 'var(--ink)', transform: 'translate(-50%, -50%)' }} />
        </span>
      </button>
      <div ref={contentRef} style={{ maxHeight: isOpen ? (contentRef.current?.scrollHeight ?? 0) + 50 : 0, overflow: 'hidden', transition: 'max-height 0.5s var(--ease)' }}>
        <div style={{ paddingBottom: 32, paddingRight: 60, display: 'flex', gap: 18, color: 'var(--ink-soft)', lineHeight: 1.75, fontSize: 15 }}>
          <span className="en" style={{ color: 'var(--sky)', fontSize: 13, fontWeight: 500, letterSpacing: '0.1em' }}>A.</span>
          <span>{a}</span>
        </div>
      </div>
    </div>
  );
}

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div>
      {items.map((it, i) => (
        <AccordionItem key={i} q={it.q} a={it.a} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
      ))}
    </div>
  );
}

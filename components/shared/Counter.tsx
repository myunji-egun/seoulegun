'use client';
import { useRef, useEffect, useState } from 'react';
import { useInView } from './Reveal';

export function Counter({ to, duration = 2000, suffix = '' }: { to: number; duration?: number; suffix?: string }) {
  const [ref, inView] = useInView({ threshold: 0.4 } as any);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  const display = to >= 100 ? Math.round(val) : val.toFixed(to < 10 ? 1 : 0);
  return <span ref={ref as any}>{display}{suffix}</span>;
}

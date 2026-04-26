'use client';
import { useInView } from './Reveal';

export function SplitText({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const [ref, inView] = useInView({ threshold: 0.3 } as any);
  return (
    <span ref={ref as any} className={className} style={{ display: 'inline-block' }}>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(0.5em)',
            transition: `opacity 0.6s var(--ease) ${delay + i * 22}ms, transform 0.6s var(--ease) ${delay + i * 22}ms`,
            whiteSpace: ch === ' ' ? 'pre' : 'normal',
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

import { Reveal } from './Reveal';

export function SectionHeader({ number, eyebrow, title, description, align = 'left' }: {
  number?: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'split';
}) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: align === 'split' ? '1fr 1fr' : '1fr',
      gap: 60,
      alignItems: 'end',
      marginBottom: 80,
    }}>
      <div>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32 }}>
            {number && <span className="meta" style={{ color: 'var(--blue)' }}>{number}</span>}
            <span className="eyebrow">{eyebrow}</span>
          </div>
          <h2 className="section-title" style={{ maxWidth: '18ch' }} dangerouslySetInnerHTML={{ __html: title }} />
        </Reveal>
      </div>
      {description && (
        <Reveal delay={120}>
          <p className="lead">{description}</p>
        </Reveal>
      )}
    </div>
  );
}

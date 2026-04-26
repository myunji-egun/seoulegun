import { CSSProperties } from 'react';

export function PH({ label, height, dark = false, aspect, style = {} }: {
  label: string;
  height?: number | string;
  dark?: boolean;
  aspect?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`ph ${dark ? 'dark' : ''}`}
      style={{ height, aspectRatio: aspect, ...style }}
    >
      <span>{label}</span>
    </div>
  );
}

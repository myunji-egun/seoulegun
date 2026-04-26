import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--inter' });

export const metadata: Metadata = {
  title: '서울이건치과 — 마음을 담아 정성을 다하여',
  description: '자연치아를 살리는 치료, 공부하는 원장, 맞춤형 상담과 계획. 서울 강남 서울이건치과.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className={inter.variable}>{children}</body>
    </html>
  );
}

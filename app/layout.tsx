import type { Metadata } from 'next'
import './globals.css'

import SiteShell from '@/components/layout/SiteShell'
import { LocalBusinessJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: '서울이건치과｜수원 영통 치과',
  description:
    '수원 영통 지역에서 자연치아 보존, 임플란트, 교정, 소아치과 진료를 안내합니다. 개인별 구강 상태에 따라 치료 계획은 달라질 수 있습니다.',
  metadataBase: new URL('https://egundc.com'),
  alternates: {
    canonical: 'https://egundc.com',
  },
  openGraph: {
    title: '서울이건치과｜수원 영통 치과',
    description:
      '수원 영통 지역에서 자연치아 보존, 임플란트, 교정, 소아치과 진료를 안내합니다.',
    url: 'https://egundc.com',
    siteName: '서울이건치과',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/images/logo/egun-logo%20(1).png',
        width: 800,
        height: 600,
        alt: '서울이건치과',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '서울이건치과｜수원 영통 치과',
    description:
      '수원 영통 지역에서 자연치아 보존, 임플란트, 교정, 소아치과 진료를 안내합니다.',
    images: ['/images/logo/egun-logo%20(1).png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <LocalBusinessJsonLd />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}

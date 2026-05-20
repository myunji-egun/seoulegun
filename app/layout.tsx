import type { Metadata } from 'next'
import './globals.css'

import SiteShell from '@/components/layout/SiteShell'
import { LocalBusinessJsonLd } from '@/components/seo/JsonLd'
import ThemeSwitcher from '@/components/ui/ThemeSwitcher'

export const metadata: Metadata = {
  title: '수원 서울이건치과 | 서울대 출신 원장 2인 책임진료',
  description:
    '수원치과 서울이건치과 - 서울대 출신 대표 원장 2인이 처음 상담부터 치료 마무리까지 책임지고 진료합니다. 수원 임플란트, 교정, 충치치료, 심미보철, 소아치과.',
  metadataBase: new URL('https://egundc.com'),
  alternates: {
    canonical: 'https://egundc.com',
  },
  openGraph: {
    title: '수원 서울이건치과 | 서울대 출신 원장 2인 책임진료',
    description:
      '수원치과 서울이건치과 - 서울대 출신 대표 원장 2인이 책임진료합니다. 수원 임플란트, 교정, 충치치료.',
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
    title: '수원 서울이건치과 | 서울대 출신 원장 2인 책임진료',
    description:
      '수원치과 서울이건치과 - 서울대 출신 대표 원장 2인이 책임진료합니다. 수원 임플란트, 교정, 충치치료.',
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
        <ThemeSwitcher />
      </body>
    </html>
  )
}

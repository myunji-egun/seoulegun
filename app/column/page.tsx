import type { Metadata } from 'next'
import ColumnBoard from '@/components/column/ColumnBoard'

export const metadata: Metadata = {
  title: '원장칼럼 | 서울이건치과',
  description: '서울이건치과 대표원장이 직접 전하는 치과 건강 정보와 치료 이야기.',
  alternates: { canonical: 'https://egundc.com/column' },
}

export default function ColumnPage() {
  return (
    <main className="bg-white min-h-screen pt-20">
      <ColumnBoard />
    </main>
  )
}

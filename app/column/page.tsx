import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '원장칼럼 | 서울이건치과',
  description: '서울이건치과 원장이 직접 전하는 치과 건강 정보와 치료 이야기.',
  alternates: { canonical: 'https://egundc.com/column' },
}

export default function ColumnPage() {
  return (
    <main className="pt-24 pb-20 bg-[#F8F7F9] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#0080C8] mb-2">
            Doctor's Column
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">원장칼럼</h1>
          <p className="text-sm text-gray-500">
            대표원장이 직접 전하는 치과 건강 정보와 치료 이야기입니다.
          </p>
        </div>

        {/* 콘텐츠 준비 중 */}
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 bg-[#EAF4FC] rounded-full flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-[#0080C8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium mb-1">칼럼을 준비 중입니다</p>
          <p className="text-sm text-gray-400">곧 대표원장의 건강 정보와 치료 이야기를 만나보실 수 있습니다.</p>
        </div>
      </div>
    </main>
  )
}

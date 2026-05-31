'use client'

import { useState, useEffect } from 'react'
import { Search, Lock } from 'lucide-react'
import SignupGateModal from '@/components/cases/SignupGateModal'

interface CaseItem {
  id: string
  title: string
  description: string | null
  board_category: string
  treatment_type: string | null
  before_image_url: string | null
  after_image_url: string | null
  created_at: string
}

const CATEGORIES = [
  { key: 'all', label: '전체' },
  { key: '임플란트', label: '임플란트' },
  { key: '자연치아', label: '자연치아' },
  { key: '심미보철', label: '심미보철' },
  { key: '교정치료', label: '교정치료' },
  { key: '소아치과', label: '소아치과' },
]

function formatDate(iso: string) {
  const d = new Date(iso)
  return `${d.getFullYear()}. ${String(d.getMonth() + 1).padStart(2, '0')}. ${String(d.getDate()).padStart(2, '0')}`
}

export default function CasesPage() {
  const [cases, setCases] = useState<CaseItem[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setLoading(true)
    const url = activeCategory === 'all'
      ? '/api/cases'
      : `/api/cases?board_category=${encodeURIComponent(activeCategory)}`
    fetch(url)
      .then(r => r.json())
      .then(data => { setCases(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [activeCategory])

  const filtered = cases.filter(c =>
    !search || c.title.includes(search) || (c.description ?? '').includes(search)
  )

  return (
    <main className="pt-24 pb-20 bg-[#F8F7F9] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* 헤더 */}
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#0080C8] mb-2">Patient Cases</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">환자사례</h1>
          <p className="text-sm text-gray-500">실제 치료 전후 사례입니다. 치료 후 사진은 회원 가입 후 확인하실 수 있습니다.</p>
        </div>

        {/* 카테고리 필터 */}
        <div className="flex flex-wrap gap-2 mb-5">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                activeCategory === cat.key
                  ? 'bg-[#0080C8] text-white border-[#0080C8]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#0080C8] hover:text-[#0080C8]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 검색 */}
        <div className="relative mb-8 max-w-xs ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#0080C8]"
          />
        </div>

        {/* 케이스 그리드 */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white rounded-2xl h-64 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg mb-1">등록된 사례가 없습니다</p>
            <p className="text-sm">관리자에서 사례를 추가해 주세요.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filtered.map(item => (
              <article key={item.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                {/* Before / After 이미지 */}
                <div className="grid grid-cols-2 gap-0.5">
                  {/* Before — 원본 */}
                  <div className="relative">
                    <div className="aspect-[4/3] bg-gray-100">
                      {item.before_image_url ? (
                        <img src={item.before_image_url} alt="치료 전" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">사진 준비 중</div>
                      )}
                    </div>
                    <span className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                      {formatDate(item.created_at)}
                    </span>
                    <span className="absolute top-2 left-2 bg-white/90 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Before
                    </span>
                  </div>

                  {/* After — 블러 (비로그인 시) */}
                  <div
                    className="relative cursor-pointer group"
                    onClick={() => { if (!isLoggedIn) setShowModal(true) }}
                    role={isLoggedIn ? undefined : 'button'}
                    aria-label={isLoggedIn ? undefined : '회원가입 후 확인'}
                  >
                    <div className="aspect-[4/3] bg-gray-100">
                      {item.after_image_url ? (
                        <img
                          src={item.after_image_url}
                          alt="치료 후"
                          className={`w-full h-full object-cover transition-all duration-300 ${isLoggedIn ? '' : 'blur-md scale-105'}`}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">사진 준비 중</div>
                      )}
                    </div>
                    {!isLoggedIn && item.after_image_url && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/25 group-hover:bg-black/35 transition-colors">
                        <div className="bg-white/90 rounded-full p-2 mb-1.5">
                          <Lock className="w-4 h-4 text-[#0080C8]" />
                        </div>
                        <span className="text-[11px] font-semibold text-white text-center px-3 leading-tight">
                          로그인 후 확인해 보세요.
                        </span>
                      </div>
                    )}
                    <span className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                      {formatDate(item.created_at)}
                    </span>
                    <span className="absolute top-2 left-2 bg-[#0080C8]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      After
                    </span>
                  </div>
                </div>

                {/* 카드 하단 */}
                <div className="px-4 py-3">
                  <p className="text-[11px] text-[#0080C8] font-medium mb-0.5">
                    {item.board_category}{item.treatment_type ? ` › ${item.treatment_type}` : ''}
                  </p>
                  <p className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">{item.title}</p>
                  {item.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{item.description}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* 비로그인 하단 배너 */}
        {!isLoggedIn && filtered.length > 0 && (
          <div
            className="mt-10 flex flex-col items-center gap-3 py-8 rounded-2xl bg-[#F0F7FD] border border-[#D0E8F5] cursor-pointer hover:bg-[#E6F2FB] transition-colors"
            onClick={() => setShowModal(true)}
          >
            <Lock className="w-5 h-5 text-[#0080C8]" />
            <p className="text-sm font-semibold text-gray-800">치료 후 사진은 회원 전용입니다</p>
            <button className="bg-[#0080C8] text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-[#006BA8] transition-colors">
              무료 회원가입
            </button>
          </div>
        )}

        <p className="mt-10 text-[11px] text-gray-400 text-center leading-relaxed">
          본 사례는 해당 환자의 동의를 받아 게시된 자료이며, 치료 결과는 개인의 구강 상태에 따라 달라질 수 있습니다.
        </p>
      </div>

      {showModal && (
        <SignupGateModal
          onClose={() => setShowModal(false)}
          onSuccess={() => { setShowModal(false); setIsLoggedIn(true) }}
        />
      )}
    </main>
  )
}

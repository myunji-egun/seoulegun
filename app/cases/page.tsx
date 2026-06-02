'use client'

import { useState, useEffect, useRef } from 'react'
import { Lock, ChevronRight } from 'lucide-react'
import SignupGateModal, { checkMemberSession } from '@/components/cases/SignupGateModal'

/* ── 타입 ───────────────────────────────────────────────── */
interface CaseItem {
  id: string
  title: string
  description: string | null
  board_category: string
  treatment_type: string | null
  before_image_url: string | null
  after_image_url: string | null
  treatment_period: string | null
  patient_info: string | null
  created_at: string
}

/* ── 카테고리 데이터 ─────────────────────────────────────── */
const MAIN_CATEGORIES = [
  {
    key: '자연치아살리기',
    label: '자연치아살리기',
    subs: ['전체', 'VPT', '레진빌드업', '신경치료', '최소삭제 온레이', '잇몸치료'],
  },
  {
    key: '임플란트',
    label: '임플란트',
    subs: ['전체', '즉시로딩 임플란트', '전체 임플란트', '앞니 임플란트'],
  },
  {
    key: '심미보철',
    label: '심미보철',
    subs: ['전체', '라미네이트', '앞니레진(diastema)', '치아미백'],
  },
  {
    key: '치아교정',
    label: '치아교정',
    subs: ['전체', '인비절라인', '소아교정'],
  },
]

/* ── 유틸 ───────────────────────────────────────────────── */
function formatDate(iso: string) {
  const d = new Date(iso)
  return `${d.getFullYear()}. ${String(d.getMonth() + 1).padStart(2, '0')}. ${String(d.getDate()).padStart(2, '0')}`
}

/* ── 스켈레톤 ────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
      <div className="grid grid-cols-2">
        <div className="aspect-[3/4] bg-gray-100" />
        <div className="aspect-[3/4] bg-gray-100" />
      </div>
      <div className="p-4 space-y-2">
        <div className="h-3 bg-gray-100 rounded w-1/3" />
        <div className="h-4 bg-gray-100 rounded w-2/3" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
      </div>
    </div>
  )
}

/* ── 메인 페이지 ─────────────────────────────────────────── */
export default function CasesPage() {
  const [cases, setCases] = useState<CaseItem[]>([])
  const [mainCat, setMainCat] = useState(MAIN_CATEGORIES[0].key)
  const [subCat, setSubCat] = useState('전체')
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [memberName, setMemberName] = useState('')
  const [showModal, setShowModal] = useState(false)
  const subScrollRef = useRef<HTMLDivElement>(null)

  const activeCatData = MAIN_CATEGORIES.find(c => c.key === mainCat)!

  // 세션 복원
  useEffect(() => {
    const name = checkMemberSession()
    if (name) { setIsLoggedIn(true); setMemberName(name) }
  }, [])

  // 대분류 변경 시 소분류 초기화
  useEffect(() => {
    setSubCat('전체')
    subScrollRef.current?.scrollTo({ left: 0, behavior: 'smooth' })
  }, [mainCat])

  // 케이스 데이터 fetch
  useEffect(() => {
    setLoading(true)
    fetch(`/api/patient-cases?board_category=${encodeURIComponent(mainCat)}`)
      .then(r => r.json())
      .then(data => { setCases(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => { setCases([]); setLoading(false) })
  }, [mainCat])

  // 소분류 필터 (클라이언트)
  const filtered = cases.filter(c => {
    if (subCat === '전체') return true
    return c.treatment_type === subCat
  })

  return (
    <main className="pt-20 pb-24 bg-[#F8F7F9] min-h-screen">

      {/* ── 페이지 헤더 ── */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#0080C8] mb-2">
              Patient Cases
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#2B2D42] mb-2">환자사례</h1>
            <p className="text-sm text-gray-500 max-w-md leading-relaxed">
              실제 내원 환자분의 치료 전·후 사례입니다.<br className="hidden sm:block" />
              치료 결과는 개인의 구강 상태에 따라 달라질 수 있습니다.
            </p>
          </div>
          {isLoggedIn ? (
            <div className="shrink-0 text-right pb-1">
              <p className="text-[11px] text-gray-400 mb-0.5">로그인 중</p>
              <p className="text-sm font-semibold text-[#0080C8]">{memberName} 님</p>
            </div>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="shrink-0 text-sm font-semibold text-[#0080C8] border border-[#0080C8] rounded-lg px-5 py-2.5 hover:bg-[#EAF4FC] transition-colors"
            >
              로그인 / 가입
            </button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── 대분류 탭 ── */}
        <div className="flex border-b border-gray-200 bg-white -mx-4 sm:-mx-6 px-4 sm:px-6 mb-0">
          {MAIN_CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setMainCat(cat.key)}
              className={`relative py-4 px-3 sm:px-5 text-sm sm:text-[15px] font-semibold whitespace-nowrap transition-colors ${
                mainCat === cat.key
                  ? 'text-[#0080C8]'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {cat.label}
              {mainCat === cat.key && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0080C8] rounded-t" />
              )}
            </button>
          ))}
        </div>

        {/* ── 소분류 가로 스크롤 ── */}
        <div
          ref={subScrollRef}
          className="flex gap-2 overflow-x-auto py-4 -mx-4 sm:-mx-6 px-4 sm:px-6 bg-white border-b border-gray-100"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {activeCatData.subs.map(sub => (
            <button
              key={sub}
              onClick={() => setSubCat(sub)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                subCat === sub
                  ? 'bg-[#2B2D42] text-white border-[#2B2D42]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#2B2D42] hover:text-[#2B2D42]'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* ── 카드 수 표시 ── */}
        {!loading && (
          <div className="flex items-center justify-between py-4">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-800">{filtered.length}</span>개의 사례
            </p>
            {!isLoggedIn && (
              <p className="text-xs text-gray-400">
                <Lock className="w-3 h-3 inline mr-1" />
                치료 후 사진은 로그인 후 확인 가능합니다
              </p>
            )}
          </div>
        )}

        {/* ── 카드 그리드 ── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium mb-1">등록된 사례가 없습니다</p>
            <p className="text-sm text-gray-400">해당 카테고리의 사례를 준비 중입니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(item => (
              <CaseCard
                key={item.id}
                item={item}
                isLoggedIn={isLoggedIn}
                onLockClick={() => setShowModal(true)}
              />
            ))}
          </div>
        )}

        {/* ── 비로그인 하단 배너 ── */}
        {!isLoggedIn && filtered.length > 0 && (
          <div
            className="mt-12 rounded-2xl border border-[#D0E8F5] bg-white px-6 py-8 text-center cursor-pointer hover:bg-[#F0F7FD] transition-colors"
            onClick={() => setShowModal(true)}
          >
            <div className="w-12 h-12 bg-[#EAF4FC] rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-5 h-5 text-[#0080C8]" />
            </div>
            <p className="font-semibold text-gray-800 mb-1">치료 후 사진은 회원 전용입니다</p>
            <p className="text-sm text-gray-500 mb-5">간단한 가입 후 모든 치료 전·후 사례를 확인하실 수 있습니다.</p>
            <button className="bg-[#0080C8] text-white font-semibold text-sm px-8 py-3 rounded-lg hover:bg-[#006BA8] transition-colors">
              무료 회원가입
            </button>
          </div>
        )}

        {/* ── 면책 고지 ── */}
        <p className="mt-12 text-[11px] text-gray-400 text-center leading-relaxed">
          본 사례는 해당 환자분의 동의를 받아 게시된 자료입니다.<br />
          치료 방법과 결과는 개인의 구강 상태에 따라 달라질 수 있으며, 정확한 진단은 내원 후 결정됩니다.
        </p>
      </div>

      {showModal && (
        <SignupGateModal
          onClose={() => setShowModal(false)}
          onSuccess={(name) => { setShowModal(false); setIsLoggedIn(true); setMemberName(name) }}
        />
      )}
    </main>
  )
}

/* ── 케이스 카드 컴포넌트 ─────────────────────────────────── */
function CaseCard({
  item,
  isLoggedIn,
  onLockClick,
}: {
  item: CaseItem
  isLoggedIn: boolean
  onLockClick: () => void
}) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group">

      {/* Before / After 이미지 */}
      <div className="grid grid-cols-2 gap-px bg-gray-100">
        {/* Before — 비로그인 시 블러 */}
        <div
          className="relative aspect-[3/4] bg-gray-50 overflow-hidden cursor-pointer"
          onClick={() => { if (!isLoggedIn) onLockClick() }}
        >
          {item.before_image_url ? (
            <img
              src={item.before_image_url}
              alt="치료 전"
              className={`w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ${
                isLoggedIn ? '' : 'blur-xl scale-110'
              }`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-xs text-gray-300">준비 중</span>
            </div>
          )}
          <span className="absolute top-2.5 left-2.5 bg-black/50 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide">
            BEFORE
          </span>
          {!isLoggedIn && item.before_image_url && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#2B2D42]/40 hover:bg-[#2B2D42]/50 transition-colors">
              <div className="bg-white rounded-full p-2.5 mb-2 shadow-md">
                <Lock className="w-4 h-4 text-[#0080C8]" />
              </div>
              <p className="text-white text-[11px] font-semibold text-center px-4 leading-snug">
                로그인 후<br />확인해 보세요.
              </p>
            </div>
          )}
        </div>

        {/* After — 원본 공개 */}
        <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
          {item.after_image_url ? (
            <img
              src={item.after_image_url}
              alt="치료 후"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-xs text-gray-300">준비 중</span>
            </div>
          )}
          <span className="absolute top-2.5 left-2.5 bg-[#0080C8]/80 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide">
            AFTER
          </span>
        </div>
      </div>

      {/* 카드 정보 */}
      <div className="px-4 pt-3.5 pb-4">
        {/* 대분류 > 소분류 */}
        <div className="flex items-center gap-1 mb-2">
          <span className="text-[11px] font-semibold text-[#0080C8]">
            {item.board_category}
          </span>
          {item.treatment_type && (
            <>
              <ChevronRight className="w-3 h-3 text-gray-300 shrink-0" />
              <span className="text-[11px] text-gray-500 font-medium">
                {item.treatment_type}
              </span>
            </>
          )}
        </div>

        {/* 치료명 */}
        <p className="text-[15px] font-bold text-[#2B2D42] leading-snug mb-2.5 line-clamp-2">
          {item.title}
        </p>

        {/* 치료기간 + 환자정보 */}
        <div className="flex items-center gap-3 text-[11px] text-gray-400">
          {item.treatment_period && (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {item.treatment_period}
            </span>
          )}
          {item.patient_info && (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {item.patient_info}
            </span>
          )}
          {!item.treatment_period && !item.patient_info && (
            <span className="text-gray-300">{formatDate(item.created_at)}</span>
          )}
        </div>

        {/* 설명 */}
        {item.description && (
          <p className="text-[12px] text-gray-500 mt-2.5 leading-relaxed line-clamp-2 border-t border-gray-50 pt-2.5">
            {item.description}
          </p>
        )}
      </div>
    </article>
  )
}

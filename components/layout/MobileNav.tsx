'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import { useEffect } from 'react'

interface NavItem {
  label: string
  href: string
}

const NAV_ITEMS: NavItem[] = [
  { label: '이건치과소개', href: '/about' },
  { label: '자연치아살리기', href: '/natural-tooth' },
  { label: '임플란트', href: '/implant' },
  { label: '심미보철', href: '/cosmetic' },
  { label: '서울이건 교정치료', href: '/orthodontics' },
]

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname()

  // 메뉴 열릴 때 body 스크롤 잠금
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <>
      {/* 오버레이 */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 슬라이드 패널 */}
      <nav
        role="dialog"
        aria-modal="true"
        aria-label="메인 메뉴"
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <span className="text-sm font-semibold text-gray-500 tracking-widest uppercase">
            Menu
          </span>
          <button
            onClick={onClose}
            aria-label="메뉴 닫기"
            className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* 메뉴 링크 */}
        <ul className="flex-1 overflow-y-auto py-4">
          {NAV_ITEMS.map((item, index) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-6 py-4 text-base font-medium transition-colors ${
                    isActive
                      ? 'text-[#0080C8] bg-[#0080C8]/5 border-r-2 border-[#0080C8]'
                      : 'text-gray-700 hover:text-[#0080C8] hover:bg-gray-50'
                  }`}
                >
                  {/* 번호 */}
                  <span className="w-5 text-xs text-gray-400 font-normal tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* 하단 연락처 */}
        <div className="px-6 py-5 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500 mb-1">대표전화</p>
          <a
            href="tel:031-896-5512"
            className="text-lg font-bold text-[#0080C8] tracking-wide"
          >
            031-896-5512
          </a>
        </div>
      </nav>
    </>
  )
}

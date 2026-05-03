'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MobileNav from './MobileNav'

const NAV_ITEMS = [
  { label: '이건치과소개', href: '/about' },
  { label: '자연치아살리기', href: '/natural-tooth' },
  { label: '임플란트', href: '/implant' },
  { label: '심미보철', href: '/cosmetic' },
  { label: '교정치료', href: '/orthodontics' },
]

const PHONE = '031-896-5512'

export default function Header() {
  const [navOpen, setNavOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: '#2B2D42' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 sm:h-20 gap-6 lg:gap-10">

            {/* 로고 */}
            <Link
              href="/"
              className="flex items-center shrink-0"
              aria-label="서울이건치과 홈으로 이동"
            >
              <img
                src="/images/logo/egun-logo-white%20(1).gif"
                alt="서울이건치과"
                className="h-20 sm:h-28 w-auto"
              />
            </Link>

            {/* 데스크톱 네비게이션 (lg 이상) */}
            <nav
              className="hidden lg:flex flex-1 justify-center items-center gap-3 xl:gap-5"
              aria-label="주 메뉴"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-5 xl:px-6 py-2 text-[17px] font-medium transition-colors duration-200 group ${
                      isActive ? 'text-[#92DCE5]' : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-0 left-5 xl:left-6 right-5 xl:right-6 h-0.5 rounded-full transition-transform duration-200 origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                      style={{ backgroundColor: '#92DCE5' }}
                    />
                  </Link>
                )
              })}
            </nav>

            {/* 상담하기 버튼 (데스크탑) */}
            <a
              href={`tel:${PHONE}`}
              className="hidden lg:flex ml-auto items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
              style={{ backgroundColor: '#92DCE5', color: '#2B2D42' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.59.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.02l-2.2 2.19z"/>
              </svg>
              상담하기
            </a>

            {/* 햄버거 메뉴 버튼 (lg 미만) */}
            <div className="lg:hidden ml-auto flex items-center gap-3">
              <a
                href={`tel:${PHONE}`}
                className="flex items-center justify-center w-9 h-9 rounded-full"
                style={{ backgroundColor: '#92DCE5', color: '#2B2D42' }}
                aria-label="전화 상담"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.59.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.02l-2.2 2.19z"/>
                </svg>
              </a>
              <button
                onClick={() => setNavOpen(true)}
                aria-label="메뉴 열기"
                aria-expanded={navOpen}
                aria-controls="mobile-nav"
                className="w-11 h-11 flex flex-col items-center justify-center gap-[5px] rounded-lg hover:bg-white/10 transition-colors"
              >
                <span className="block w-6 h-0.5 rounded-full bg-white" />
                <span className="block w-6 h-0.5 rounded-full bg-white" />
                <span className="block w-4 h-0.5 rounded-full self-start ml-[5px] bg-white" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* 모바일 내비게이션 */}
      <MobileNav isOpen={navOpen} onClose={() => setNavOpen(false)} />
    </>
  )
}

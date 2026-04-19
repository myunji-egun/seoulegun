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

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* 로고 */}
            <Link
              href="/"
              className="flex items-center shrink-0"
              aria-label="서울이건치과 홈으로 이동"
            >
              <img
                src={scrolled
                  ? '/images/logo/egun-logo%20(1).svg?v=2'
                  : '/images/logo/egun-logo-white%20(1).gif'}
                alt="서울이건치과"
                className="h-20 sm:h-28 w-auto transition-opacity duration-300"
              />
            </Link>

            {/* 데스크톱 네비게이션 (lg 이상) */}
            <nav
              className="hidden lg:flex items-center gap-1 xl:gap-2"
              aria-label="주 메뉴"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-3 xl:px-4 py-2 text-sm font-medium transition-colors duration-200 group ${
                      scrolled
                        ? isActive
                          ? 'text-[#0080C8]'
                          : 'text-gray-700 hover:text-[#0080C8]'
                        : isActive
                          ? 'text-white'
                          : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {/* 호버/활성 밑줄 */}
                    <span
                      className={`absolute bottom-0 left-3 xl:left-4 right-3 xl:right-4 h-0.5 rounded-full transition-transform duration-200 origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                      style={{ backgroundColor: '#0080C8' }}
                    />
                  </Link>
                )
              })}
            </nav>

            {/* 햄버거 메뉴 버튼 (lg 미만) */}
            <button
              onClick={() => setNavOpen(true)}
              aria-label="메뉴 열기"
              aria-expanded={navOpen}
              aria-controls="mobile-nav"
              className={`lg:hidden w-11 h-11 flex flex-col items-center justify-center gap-[5px] rounded-lg transition-colors ${
                scrolled
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <span
                className={`block w-6 h-0.5 rounded-full transition-colors ${
                  scrolled ? 'bg-gray-700' : 'bg-white'
                }`}
              />
              <span
                className={`block w-6 h-0.5 rounded-full transition-colors ${
                  scrolled ? 'bg-gray-700' : 'bg-white'
                }`}
              />
              <span
                className={`block w-4 h-0.5 rounded-full self-start ml-[5px] transition-colors ${
                  scrolled ? 'bg-gray-700' : 'bg-white'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 내비게이션 */}
      <MobileNav isOpen={navOpen} onClose={() => setNavOpen(false)} />
    </>
  )
}

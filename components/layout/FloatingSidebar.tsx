'use client'

import Link from 'next/link'
import {
  Calendar,
  MessageCircle,
  Play,
  MapPin,
  Phone,
  ChevronUp,
} from 'lucide-react'
import { clinicInfo } from '@/data/clinic-info'

interface SidebarItem {
  label: string
  icon: React.ReactNode
  href: string
  external?: boolean
  tel?: boolean
}

// 네이버 블로그 "N" 커스텀 아이콘 (Lucide에 없으므로 SVG)
function NaverBlogIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16 3H8C5.24 3 3 5.24 3 8v8c0 2.76 2.24 5 5 5h8c2.76 0 5-2.24 5-5V8c0-2.76-2.24-5-5-5zm-1.5 12.5L10 11.25V15.5H8.5v-7h1.5l4.5 4.25V8.5H16v7h-1.5z" />
    </svg>
  )
}

function scrollToTop() {
  // 풀페이지 스크롤 컨테이너 또는 window
  const container = document.querySelector('[style*="scroll-snap-type"]') as HTMLElement | null
  if (container) {
    container.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

export default function FloatingSidebar() {
  const items: SidebarItem[] = [
    {
      label: '휴무일정',
      icon: <Calendar size={18} />,
      href: '/notice',
    },
    {
      label: '카톡상담',
      icon: <MessageCircle size={18} />,
      href: clinicInfo.socialLinks.kakao,
      external: true,
    },
    {
      label: '유튜브',
      icon: <Play size={18} />,
      href: clinicInfo.socialLinks.youtube,
      external: true,
    },
    {
      label: '블로그',
      icon: <NaverBlogIcon size={18} />,
      href: clinicInfo.socialLinks.blog,
      external: true,
    },
    {
      label: '플레이스',
      icon: <MapPin size={18} />,
      href: clinicInfo.socialLinks.naverPlace,
      external: true,
    },
    {
      label: '전화가기',
      icon: <Phone size={18} />,
      href: `tel:${clinicInfo.phone}`,
      tel: true,
    },
  ]

  return (
    <>
    <aside
      className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-50 flex-col rounded-2xl overflow-hidden bg-gray-900/90 backdrop-blur-md border border-white/10 shadow-2xl"
      aria-label="빠른 링크"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        const commonClass = `
          group relative w-12 h-12 flex flex-col items-center justify-center
          text-white/60 hover:text-[#D4C4A8] hover:bg-white/10
          transition-all duration-200
          ${!isLast ? 'border-b border-white/10' : ''}
          ${item.tel ? 'text-[#D4C4A8]/80' : ''}
        `

        const content = (
          <>
            {/* 아이콘 */}
            <span className="group-hover:scale-110 transition-transform duration-200">
              {item.icon}
            </span>

            {/* 호버 시 라벨 툴팁 */}
            <span
              className="
                absolute right-full mr-2 px-2 py-1
                bg-gray-900 text-white text-xs font-medium whitespace-nowrap rounded
                opacity-0 group-hover:opacity-100
                translate-x-1 group-hover:translate-x-0
                transition-all duration-200 pointer-events-none
                border border-white/10 shadow-lg
              "
              aria-hidden="true"
            >
              {item.label}
            </span>
          </>
        )

        if (item.tel || item.external) {
          return (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              aria-label={item.label}
              className={commonClass}
            >
              {content}
            </a>
          )
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            aria-label={item.label}
            className={commonClass}
          >
            {content}
          </Link>
        )
      })}
    </aside>

    {/* TOP 버튼 - 사이드바 아래 */}
    <button
      onClick={scrollToTop}
      className="hidden lg:flex fixed right-5 bottom-24 z-50 flex-col items-center justify-center w-12 h-14 rounded-2xl bg-gray-900/90 backdrop-blur-md border border-white/10 shadow-2xl text-white/60 hover:text-[#92DCE5] hover:bg-white/10 transition-all duration-200"
      aria-label="맨 위로"
    >
      <ChevronUp size={18} />
      <span className="text-[9px] font-bold mt-0.5">TOP</span>
    </button>
    </>
  )
}

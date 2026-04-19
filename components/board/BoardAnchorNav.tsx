'use client'

// @TASK Board - 게시판 앵커 내비게이션 (sticky, 스크롤 하이라이트)
import { useState, useEffect, useCallback } from 'react'

interface NavItem {
  id: string
  label: string
}

interface BoardAnchorNavProps {
  items: NavItem[]
}

export default function BoardAnchorNav({ items }: BoardAnchorNavProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '')

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault()
      const el = document.getElementById(id)
      if (!el) return
      // 헤더(80px) + 앵커바(48px) 높이 오프셋
      const offset = 136
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
      setActiveId(id)
    },
    [],
  )

  useEffect(() => {
    const sectionEls = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          // 가장 위에 있는 섹션을 active로
          const topEntry = visible.reduce((prev, curr) =>
            prev.boundingClientRect.top < curr.boundingClientRect.top
              ? prev
              : curr,
          )
          setActiveId((topEntry.target as HTMLElement).id)
        }
      },
      {
        rootMargin: '-136px 0px -50% 0px',
        threshold: 0,
      },
    )

    sectionEls.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  return (
    <nav
      className="sticky top-16 sm:top-20 z-40 bg-white border-b border-gray-100 shadow-sm"
      aria-label="치료 섹션 이동"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex overflow-x-auto scrollbar-none gap-0" role="list">
          {items.map((item) => {
            const isActive = activeId === item.id
            return (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`inline-block px-4 sm:px-5 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 ${
                    isActive
                      ? 'text-[#0080C8] border-[#0080C8]'
                      : 'text-gray-500 border-transparent hover:text-[#0080C8] hover:border-[#0080C8]/40'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

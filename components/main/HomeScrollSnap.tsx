'use client'

import { useEffect, useRef } from 'react'

const THRESHOLD = 0.6   // 60% 지나면 다음 챕터로 스냅
const DEBOUNCE_MS = 150 // 스크롤 멈춘 후 판단 대기
const COOLDOWN_MS = 700 // 스냅 중 재진입 방지

export default function HomeScrollSnap() {
  const snappingRef = useRef(false)

  useEffect(() => {
    let desktopTimer: ReturnType<typeof setTimeout> | null = null
    let mobileTimer:  ReturnType<typeof setTimeout> | null = null

    const snap = (
      target: HTMLElement | Window,
      y: number,
    ) => {
      snappingRef.current = true
      if (target instanceof Window) {
        target.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
      } else {
        target.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
      }
      setTimeout(() => { snappingRef.current = false }, COOLDOWN_MS)
    }

    /* ── 데스크탑: #home-desktop 컨테이너 내부 스크롤 ──────── */
    const handleDesktopScroll = () => {
      if (snappingRef.current) return
      if (desktopTimer) clearTimeout(desktopTimer)
      desktopTimer = setTimeout(() => {
        const container = document.getElementById('home-desktop')
        if (!container) return

        const scrollTop  = container.scrollTop
        const cRect      = container.getBoundingClientRect()
        const children   = Array.from(container.children) as HTMLElement[]

        for (let i = 0; i < children.length; i++) {
          const child     = children[i]
          const childRect = child.getBoundingClientRect()
          // 컨테이너 스크롤 기준 child 상단 위치
          const childTop  = childRect.top - cRect.top + scrollTop
          const height    = childRect.height
          if (height === 0) continue

          if (scrollTop >= childTop - 2 && scrollTop < childTop + height) {
            const progress = (scrollTop - childTop) / height
            if (progress >= THRESHOLD && i < children.length - 1) {
              const nextRect = children[i + 1].getBoundingClientRect()
              const nextTop  = nextRect.top - cRect.top + scrollTop
              snap(container, nextTop)
            }
            break
          }
        }
      }, DEBOUNCE_MS)
    }

    /* ── 모바일: window 스크롤, #home-mobile 자식 기준 ─────── */
    const handleMobileScroll = () => {
      if (snappingRef.current || window.innerWidth >= 768) return
      if (mobileTimer) clearTimeout(mobileTimer)
      mobileTimer = setTimeout(() => {
        const container = document.getElementById('home-mobile')
        if (!container) return

        const scrollY  = window.scrollY
        const children = Array.from(container.children) as HTMLElement[]

        for (let i = 0; i < children.length; i++) {
          const child    = children[i]
          const childTop = child.getBoundingClientRect().top + window.scrollY
          const height   = child.getBoundingClientRect().height
          if (height === 0) continue

          if (scrollY >= childTop - 2 && scrollY < childTop + height) {
            const progress = (scrollY - childTop) / height
            if (progress >= THRESHOLD && i < children.length - 1) {
              const nextTop = children[i + 1].getBoundingClientRect().top + window.scrollY
              snap(window, nextTop)
            }
            break
          }
        }
      }, DEBOUNCE_MS)
    }

    const desktopEl = document.getElementById('home-desktop')
    const pauseSnapForHeroReset = () => {
      snappingRef.current = true
      setTimeout(() => { snappingRef.current = false }, COOLDOWN_MS)
    }

    desktopEl?.addEventListener('scroll', handleDesktopScroll, { passive: true })
    window.addEventListener('scroll', handleMobileScroll, { passive: true })
    window.addEventListener('egun:hero-reset', pauseSnapForHeroReset)

    return () => {
      desktopEl?.removeEventListener('scroll', handleDesktopScroll)
      window.removeEventListener('scroll', handleMobileScroll)
      window.removeEventListener('egun:hero-reset', pauseSnapForHeroReset)
      if (desktopTimer) clearTimeout(desktopTimer)
      if (mobileTimer)  clearTimeout(mobileTimer)
    }
  }, [])

  return null
}

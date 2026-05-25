'use client'

import { useRef } from 'react'

export function useScrollReveal(_threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  return { ref, isVisible: true }
}

'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

interface Pillar {
  title: string
  description: string
}

interface BoardIdentityLayoutProps {
  label: string
  title: React.ReactNode
  description: React.ReactNode
  pillars: Pillar[]
}

export default function BoardIdentityLayout({ label, title, description, pillars }: BoardIdentityLayoutProps) {
  const { ref, isVisible } = useScrollReveal(0.15)

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-gray-100">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <p className={`text-sm font-semibold tracking-[0.25em] uppercase text-[#0080C8] mb-4 ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}>
          {label}
        </p>

        <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4 ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
          style={isVisible ? { animationDelay: '0.1s' } : undefined}>
          {title}
        </h2>

        <p className={`text-base sm:text-[18px] text-gray-600 leading-relaxed max-w-2xl mb-12 sm:mb-16 ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
          style={isVisible ? { animationDelay: '0.2s' } : undefined}>
          {description}
        </p>

        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6`}>
          {pillars.map((pillar, i) => (
            <div key={pillar.title}
              className={`group ${isVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
              style={isVisible ? { animationDelay: `${0.3 + i * 0.1}s` } : undefined}
            >
              <div className="flex items-start gap-3">
                <div className="w-1 h-full min-h-12 bg-[#0080C8]/30 rounded-full group-hover:bg-[#0080C8] transition-colors mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1.5 text-[19px] sm:text-[21px]">
                    {pillar.title}
                  </h3>
                  <p className="text-[17px] sm:text-[19px] text-gray-600 leading-relaxed whitespace-pre-line">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

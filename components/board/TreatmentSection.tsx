'use client'

import type { TreatmentContent } from '@/types/treatment'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider'

interface TreatmentSectionProps {
  treatment: TreatmentContent
  index: number
}

/** 설명 텍스트: **볼드** 마크업을 민트색 강조로 변환, 마침표 뒤 줄넘김 */
function HighlightedDescription({ text }: { text: string }) {
  // 마침표 뒤 줄넘김으로 문단 분리
  const paragraphs = text.split(/(?<=\.)\s+/)

  return (
    <p className="text-gray-600 leading-[1.9] text-base">
      {paragraphs.map((para, i) => {
        // **볼드** 마크업을 민트색 강조 span으로 변환
        const parts = para.split(/(\*\*[^*]+\*\*)/)

        return (
          <span key={i}>
            {parts.map((part, j) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return (
                  <span key={j} className="text-[#5BB5A2] font-semibold text-[18px]">
                    {part.slice(2, -2)}
                  </span>
                )
              }
              return <span key={j}>{part}</span>
            })}
            {i < paragraphs.length - 1 && <><br /><br /></>}
          </span>
        )
      })}
    </p>
  )
}

export default function TreatmentSection({
  treatment,
}: TreatmentSectionProps) {
  const { ref: textRef, isVisible: textVisible } = useScrollReveal(0.15)
  const { ref: cardRef, isVisible: cardVisible } = useScrollReveal(0.1)

  return (
    <div className="space-y-12">
      {/* 상단: 로고 + 제목 + 설명 + 이미지 */}
      <div ref={textRef} className={`${treatment.bottomImage ? '' : 'grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12'} items-start`}>
        {/* 텍스트 영역 — 왼쪽에서 슬라이드인 */}
        <div className="space-y-4">
          <img
            src="/images/logo/egun-logo%20(1).svg?v=2"
            alt="수원치과 서울이건치과"
            className={`h-4 mb-2 ${textVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
          />
          <h2 className={`text-2xl sm:text-3xl font-bold text-gray-900 leading-tight ${textVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            style={textVisible ? { animationDelay: '0.1s' } : undefined}>
            {treatment.title}
          </h2>
          <p className={`text-lg text-[#0080C8] font-medium ${textVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            style={textVisible ? { animationDelay: '0.2s' } : undefined}>
            {treatment.subtitle}
          </p>
          <p className={`text-[11px] text-gray-300 ${textVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            style={textVisible ? { animationDelay: '0.25s' } : undefined}>
            수원치과 서울이건치과
          </p>
          <div className={`${textVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}
            style={textVisible ? { animationDelay: '0.3s' } : undefined}>
            <HighlightedDescription text={treatment.description} />
          </div>
        </div>

        {/* 이미지 영역 — 오른쪽에서 슬라이드인 (bottomImage 사용 시 숨김) */}
        {!treatment.bottomImage && <div className={`order-first md:order-last md:mt-10 ${textVisible ? 'scroll-reveal-right' : 'scroll-hidden'}`}
          style={textVisible ? { animationDelay: '0.15s' } : undefined}>
          <div className={`${treatment.beforeImage && treatment.afterImage || treatment.videoUrl ? '' : 'bg-gray-100 max-w-[70%] mx-auto'} rounded-2xl flex items-center justify-center overflow-hidden`}>
            {treatment.videoUrl ? (
              <div className="w-full aspect-video rounded-2xl overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${treatment.videoUrl.split('/').pop()?.split('?')[0]}?rel=0&modestbranding=1`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`${treatment.title} 영상`}
                />
              </div>
            ) : treatment.beforeImage && treatment.afterImage ? (
              <BeforeAfterSlider
                beforeSrc={treatment.beforeImage}
                afterSrc={treatment.afterImage}
                beforeAlt={`${treatment.title} 시술 전`}
                afterAlt={`${treatment.title} 시술 후`}
                beforeScale={treatment.beforeScale}
              />
            ) : treatment.image ? (
              <img
                src={treatment.image}
                alt={treatment.title}
                className="w-full h-auto rounded-2xl"
              />
            ) : (
              <div className="w-full aspect-[4/3] flex items-center justify-center">
                <span className="text-gray-400 text-sm">치료 이미지 준비 중</span>
              </div>
            )}
          </div>
        </div>}
      </div>

      {/* bottomImage: 글귀 아래 전폭 이미지 */}
      {treatment.bottomImage && (
        <div className={`${textVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
          style={textVisible ? { animationDelay: '0.4s' } : undefined}>
          <img
            src={treatment.bottomImage}
            alt={treatment.title}
            className="w-full h-auto rounded-2xl"
          />
        </div>
      )}

      {/* 중단: 해시태그 카드 그리드 — 좌측은 왼쪽에서, 우측은 오른쪽에서 */}
      <div ref={cardRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {treatment.benefits.map((benefit, i) => {
          const isLeft = i % 2 === 0
          const anim = isLeft ? 'scroll-reveal-left' : 'scroll-reveal-right'

          return (
            <div key={i}
              className={`space-y-2 ${cardVisible ? anim : 'scroll-hidden'}`}
              style={cardVisible ? { animationDelay: `${0.1 + i * 0.08}s` } : undefined}>
              <h3 className="text-[#0080C8] font-bold text-base">
                #{benefit.split('.')[0].replace(/^[✓\s]+/, '').slice(0, 15)}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {benefit.replace(/^[✓\s]+/, '')}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

'use client'

import type { TreatmentContent } from '@/types/treatment'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider'

interface TreatmentSectionProps {
  treatment: TreatmentContent
  index: number
}

/** **볼드** → 민트 강조 인라인 파서 */
function inlineParse(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <span key={i} className="font-semibold" style={{ color: '#92DCE5' }}>{part.slice(2, -2)}</span>
    }
    return <span key={i}>{part}</span>
  })
}

/** 단순 **볼드** 강조만 처리하는 기본 description 렌더러 */
function HighlightedDescription({ text }: { text: string }) {
  return (
    <p className="text-gray-600 leading-[1.9] text-[17px]">
      {inlineParse(text)}
    </p>
  )
}

/** richContent 마크다운 렌더러 (###, >, ---, - 지원) */
function RichDescription({ content }: { content: string }) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let listItems: string[] = []
  let key = 0

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key++} className="space-y-1.5 pl-1 my-2">
          {listItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-600 text-[17px] leading-relaxed">
              <span className="shrink-0">{item.replace(/^-\s*/, '').split(' ')[0]}</span>
              <span>{inlineParse(item.replace(/^-\s*[\S]*\s*/, ''))}</span>
            </li>
          ))}
        </ul>
      )
      listItems = []
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // ### heading
    if (line.startsWith('### ')) {
      flushList()
      elements.push(
        <h3 key={key++} className="text-base font-bold text-gray-900 mt-6 mb-2 flex items-center gap-1.5">
          {inlineParse(line.replace(/^### /, ''))}
        </h3>
      )
      continue
    }

    // --- divider
    if (line.trim() === '---') {
      flushList()
      elements.push(<hr key={key++} className="border-gray-100 my-4" />)
      continue
    }

    // > blockquote
    if (line.startsWith('> ')) {
      flushList()
      const quoteText = line.replace(/^> /, '')
      elements.push(
        <blockquote key={key++} className="border-l-2 pl-4 py-1 my-3 text-[16px] text-gray-500 italic leading-relaxed" style={{ borderColor: '#92DCE5' }}>
          {inlineParse(quoteText)}
        </blockquote>
      )
      continue
    }

    // - list item
    if (line.startsWith('- ')) {
      listItems.push(line)
      continue
    }

    // empty line
    if (line.trim() === '') {
      flushList()
      continue
    }

    // plain text
    flushList()
    elements.push(
      <p key={key++} className="text-gray-600 text-[17px] leading-[1.85] my-1">
        {inlineParse(line)}
      </p>
    )
  }

  flushList()
  return <div className="space-y-0.5">{elements}</div>
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
            className={`h-8 mb-2 ${textVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
          />
          <h2 className={`text-2xl sm:text-3xl font-bold text-gray-900 leading-tight ${textVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            style={textVisible ? { animationDelay: '0.1s' } : undefined}>
            {treatment.title}
          </h2>
          <p className={`text-xl text-[#0080C8] font-bold ${textVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            style={textVisible ? { animationDelay: '0.2s' } : undefined}>
            {treatment.subtitle}
          </p>
          <p className={`text-[11px] text-gray-300 ${textVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            style={textVisible ? { animationDelay: '0.25s' } : undefined}>
            수원치과 서울이건치과
          </p>
          <div className={`${textVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}
            style={textVisible ? { animationDelay: '0.3s' } : undefined}>
            {treatment.richContent
              ? <RichDescription content={treatment.richContent} />
              : <HighlightedDescription text={treatment.description} />
            }
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
            ) : treatment.image && treatment.sideImage ? (
              <div className="space-y-3">
                <img src={treatment.image} alt={treatment.title} className="w-full h-auto rounded-2xl" />
                <img src={treatment.sideImage} alt={`${treatment.title} 사례`} className="w-full h-auto rounded-2xl" />
              </div>
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

      {/* bottomImage: 글귀 아래 이미지 (sideImage가 있으면 나란히) */}
      {treatment.bottomImage && (
        <div className={`${treatment.sideImage ? 'grid grid-cols-2 gap-4' : ''} ${textVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
          style={textVisible ? { animationDelay: '0.4s' } : undefined}>
          <img
            src={treatment.bottomImage}
            alt={treatment.title}
            className="w-full h-auto rounded-2xl"
          />
          {treatment.sideImage && (
            <img
              src={treatment.sideImage}
              alt={`${treatment.title} 사례`}
              className="w-full h-auto rounded-2xl"
            />
          )}
        </div>
      )}

      {/* 중단: 해시태그 카드 그리드 — 좌측은 왼쪽에서, 우측은 오른쪽에서 */}
      <div ref={cardRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {treatment.benefits.map((benefit, i) => (
            <div key={i}
              className={`space-y-2 ${cardVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
              style={cardVisible ? { animationDelay: `${0.1 + i * 0.08}s` } : undefined}>
              <h3 className="text-[#0080C8] font-bold text-[18px]">
                #{benefit.split('.')[0].replace(/^[✓\s]+/, '').slice(0, 15)}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {benefit.replace(/^[✓\s]+/, '')}
              </p>
            </div>
        ))}
      </div>
    </div>
  )
}

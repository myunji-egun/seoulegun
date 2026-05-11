'use client'

import type { TreatmentContent } from '@/types/treatment'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider'
import * as LucideIcons from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { ChevronRight } from 'lucide-react'

function LucideIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>)[name]
  if (!Icon) return null
  return <Icon {...props} />
}

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
  const isTriPanel = !!(treatment.richContent && treatment.indications && treatment.steps)
  const isRootCanal = treatment.treatmentType === 'root-canal'
  const imageTopMargin = isRootCanal ? 'md:mt-10' : 'md:mt-10'
  const singleImageFrameClass = isRootCanal ? 'max-w-[105%] mx-auto' : 'bg-gray-100 max-w-[70%] mx-auto'

  return (
    <div className="space-y-12">
      {/* 상단: 로고 + 제목 + 설명 + 이미지 */}
      <div ref={textRef} className={`${treatment.bottomImage ? '' : 'grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12'} items-start`}>
        {/* 텍스트 영역 — 왼쪽에서 슬라이드인 */}
        <div className="space-y-4">
          <img
            src="/images/logo/egun-logo%20(1).svg?v=2"
            alt="수원치과 서울이건치과"
            className={`${treatment.boardCategory === 'natural-tooth' ? 'h-16' : 'h-12'} mb-2 ${textVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
          />
          <h2 className={`text-2xl sm:text-3xl font-bold text-gray-900 leading-tight ${textVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            style={textVisible ? { animationDelay: '0.1s' } : undefined}>
            {treatment.title}
          </h2>
          <p className={`text-xl text-[#0080C8] font-bold ${textVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            style={textVisible ? { animationDelay: '0.2s' } : undefined}>
            {treatment.subtitle}
          </p>
          <p className={`text-[12px] text-gray-400 font-medium ${textVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            style={textVisible ? { animationDelay: '0.25s' } : undefined}>
            수원치과 서울이건치과
          </p>
          <div className={`${textVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}
            style={textVisible ? { animationDelay: '0.3s' } : undefined}>
            {/* richContent + highlights 동시에 있으면 → 아래 사이드패널로, 여기선 description만 */}
            {(treatment.richContent && treatment.highlights) || isTriPanel
              ? <HighlightedDescription text={treatment.description} />
              : treatment.richContent
                ? <RichDescription content={treatment.richContent} />
                : <HighlightedDescription text={treatment.description} />
            }
          </div>

          {/* isTriPanel: 치료 순서 리스트 (히어로 왼쪽) */}
          {isTriPanel && treatment.steps && (
            <div className={`mt-2 space-y-4 ${textVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}
              style={textVisible ? { animationDelay: '0.4s' } : undefined}>
              <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">치료 순서</p>
              {treatment.steps.map((step, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="w-8 h-8 rounded-full bg-[#0080C8] flex items-center justify-center text-white text-sm font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-[16px] text-gray-900 leading-tight">{step.title}</p>
                    {step.desc && <p className="text-[14px] text-gray-600 leading-relaxed mt-1">{step.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 하이라이트 카드 — richContent 없을 때만 좌측 컬럼에 */}
          {treatment.highlights && !treatment.richContent && (
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 rounded-2xl p-4 mt-2 ${textVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}
              style={textVisible ? { animationDelay: '0.4s' } : undefined}>
              {treatment.highlights.map((h, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-1.5 py-2">
                  <LucideIcon name={h.icon} size={26} className="text-[#0080C8]" />
                  <p className="font-bold text-sm text-gray-900 leading-tight">{h.label}</p>
                  <p className="text-[13px] text-gray-600 font-medium leading-relaxed">{h.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* 히어로 좌측 비교표 — comparison 있고 richContent가 사이드패널로 빠진 경우 */}
          {treatment.comparison && treatment.richContent && treatment.highlights && (
            <div className={`mt-2 ${textVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}
              style={textVisible ? { animationDelay: '0.4s' } : undefined}>
              <p className="text-[13px] font-bold text-gray-800 mb-3 tracking-tight">
                {treatment.comparison.leftLabel}와의 차이점
              </p>
              {/* 헤더 */}
              <div className="grid grid-cols-2 gap-1 mb-1">
                <div className="text-center text-[12px] font-semibold text-gray-500 bg-gray-100 rounded-lg py-1.5">
                  {treatment.comparison.leftLabel}
                </div>
                <div className="text-center text-[12px] font-semibold text-white rounded-lg py-1.5" style={{ backgroundColor: '#0080C8' }}>
                  {treatment.comparison.rightLabel}
                </div>
              </div>
              {/* 행 */}
              <div className="space-y-1">
                {treatment.comparison.rows.map((row, i) => (
                  <div key={i} className="grid grid-cols-2 gap-1">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-gray-600 font-medium leading-snug">
                      {row.leftText}
                    </div>
                    <div className="rounded-lg px-3 py-2.5 text-[13px] font-semibold leading-snug" style={{ backgroundColor: '#EBF5FF', color: '#0060A0' }}>
                      {row.rightText}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 이미지 영역 — 오른쪽에서 슬라이드인 (bottomImage 사용 시 숨김) */}
        {!treatment.bottomImage && <div className={`order-first md:order-last ${imageTopMargin} ${textVisible ? 'scroll-reveal-right' : 'scroll-hidden'}`}
          style={textVisible ? { animationDelay: '0.15s' } : undefined}>
          <div className={`${treatment.beforeImage && treatment.afterImage || treatment.videoUrl ? '' : singleImageFrameClass} rounded-2xl flex items-center justify-center overflow-hidden`}>
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

      {/* richContent + highlights 동시 존재 → 사이드패널 (좌: 질문박스, 우: 아이콘 카드 2×2) */}
      {treatment.richContent && treatment.highlights && !isTriPanel && (
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 rounded-2xl p-6 ${textVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}
          style={textVisible ? { animationDelay: '0.35s' } : undefined}>
          <div>
            <RichDescription content={treatment.richContent} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {treatment.highlights.map((h, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2 py-3">
                <LucideIcon name={h.icon} size={36} className="text-gray-300" />
                <p className="font-bold text-[14px] text-gray-900 leading-tight">{h.label}</p>
                <p className="text-[13px] text-gray-600 font-medium leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2열 패널: richContent(질문박스) + indications (isTriPanel 시) */}
      {isTriPanel && (
        <div className={`grid grid-cols-1 sm:grid-cols-2 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 ${textVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}
          style={textVisible ? { animationDelay: '0.35s' } : undefined}>
          {/* Left: 질문 박스 */}
          <div className="p-8 border-b sm:border-b-0 sm:border-r border-gray-200">
            <RichDescription content={treatment.richContent!} />
          </div>
          {/* Right: 이런 분께 필요합니다 */}
          <div className="p-8">
            <div className="flex items-center gap-2 mb-5">
              <LucideIcon name="AlertTriangle" size={20} className="text-[#0080C8] shrink-0" />
              <p className="text-[17px] font-bold text-gray-900">이런 분께 특히 필요합니다</p>
            </div>
            <ul className="space-y-4">
              {treatment.indications!.map((ind, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#0080C8] flex items-center justify-center shrink-0 mt-0.5">
                    <LucideIcon name="Check" size={13} className="text-white" strokeWidth={3} />
                  </span>
                  <span className="text-[16px] text-gray-700 font-medium leading-relaxed">{ind}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

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

      {/* 치료 과정 스텝 카드 */}
      {treatment.steps && !isTriPanel && (
        <div ref={cardRef} className={`${cardVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{treatment.title} 치료 과정</h2>
          <div className="flex items-stretch w-full overflow-x-auto pb-2">
            {treatment.steps.map((step, i) => (
              <div key={i} className="flex items-center flex-1 min-w-[130px]">
                <div className="flex-1 h-full bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center text-center gap-3 shadow-sm">
                  <span className="w-9 h-9 rounded-full bg-[#0080C8] flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-bold text-[15px] text-gray-900 leading-tight">{step.title}</p>
                  {step.icon && (
                    <LucideIcon name={step.icon} size={30} className="text-gray-300" />
                  )}
                  <p className="text-[13px] text-gray-600 font-medium leading-relaxed">{step.desc}</p>
                </div>
                {i < treatment.steps!.length - 1 && (
                  <ChevronRight size={18} className="text-gray-300 mx-2 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 치료가 필요한 경우 카드 */}
      {treatment.indications && !isTriPanel && (
        <div className={`${cardVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
          style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{treatment.title}가 필요한 경우</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {treatment.indications.map((ind, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-5 flex flex-col items-center gap-3 text-center">
                <span className="w-8 h-8 rounded-full bg-[#0080C8] flex items-center justify-center shrink-0">
                  <LucideIcon name="Check" size={16} className="text-white" strokeWidth={3} />
                </span>
                <p className="text-[14px] text-gray-700 font-medium leading-relaxed whitespace-pre-line">{ind}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* bottomVideoUrl: 해시태그 카드 위 영상 */}
      {treatment.bottomVideoUrl && (
        <div className={`w-full max-w-[50%] mx-auto ${cardVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}>
          <div className="w-full aspect-video rounded-2xl overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${treatment.bottomVideoUrl.split('youtu.be/')[1]?.split('?')[0]}?rel=0&modestbranding=1`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`${treatment.title} 영상`}
            />
          </div>
        </div>
      )}

      {/* benefits 섹션 타이틀 */}
      {treatment.benefitsTitle && (
        <h2 className={`text-2xl font-bold text-gray-900 text-center ${cardVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}>
          {treatment.benefitsTitle}
        </h2>
      )}

      {/* 해시태그 카드 그리드 */}
      <div ref={cardRef} className={`grid gap-6 ${treatment.benefitsTitle ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5' : 'grid-cols-1 sm:grid-cols-2'}`}>
        {treatment.benefits.map((benefit, i) => (
          <div key={i}
            className={`space-y-2 ${cardVisible ? 'scroll-reveal-up' : 'scroll-hidden'} ${treatment.benefitsTitle ? 'flex flex-col items-center text-center' : ''}`}
            style={cardVisible ? { animationDelay: `${0.1 + i * 0.08}s` } : undefined}>
            {benefit.icon && (
              <LucideIcon name={benefit.icon} size={36} className="text-[#0080C8] mb-1" />
            )}
            <h3 className="text-[#0080C8] font-bold text-[16px] leading-snug">
              #{benefit.tag}
            </h3>
            <p className="text-gray-600 text-[14px] leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>

      {/* 비교표 */}
      {treatment.comparison && (
        <div className={`${cardVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`} style={{ animationDelay: '0.15s' }}>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
            {treatment.comparison.leftLabel}와의 차이점
          </h2>
          <div className="rounded-2xl overflow-hidden border border-gray-100">
            {/* 헤더 행 */}
            <div className="grid grid-cols-[1fr_auto_1fr]">
              <div className="bg-gray-100 text-center py-3 text-[15px] font-bold text-gray-500">
                {treatment.comparison.leftLabel}
              </div>
              <div className="bg-gray-100 w-28 sm:w-36" />
              <div className="py-3 text-center text-[15px] font-bold text-white" style={{ backgroundColor: '#0080C8' }}>
                {treatment.comparison.rightLabel}
              </div>
            </div>
            {/* 데이터 행 */}
            {treatment.comparison.rows.map((row, i) => (
              <div key={i} className={`grid grid-cols-[1fr_auto_1fr] ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <div className="flex items-center justify-center px-4 py-4 text-[14px] text-gray-500 text-center leading-snug border-r border-gray-100">
                  {row.leftText}
                </div>
                <div className="flex flex-col items-center justify-center gap-1 w-28 sm:w-36 px-2 py-4 border-r border-gray-100">
                  {row.icon && <LucideIcon name={row.icon} size={18} className="text-[#0080C8]" />}
                  <span className="text-[12px] font-semibold text-gray-700">{row.label}</span>
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-[14px] font-semibold text-center leading-snug" style={{ color: '#0080C8' }}>
                  {row.rightText}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 하단 CTA 배너 */}
      {treatment.bottomCta && (
        <div className={`flex items-center gap-4 border border-gray-200 rounded-2xl px-6 py-5 bg-gray-50 ${cardVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
          style={{ animationDelay: '0.2s' }}>
          <LucideIcon name="Smile" size={28} className="text-[#0080C8] shrink-0" />
          <p className="text-[15px] text-gray-700 font-medium leading-relaxed">{treatment.bottomCta}</p>
        </div>
      )}
    </div>
  )
}

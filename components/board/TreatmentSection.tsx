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

const allOnSummaryCards = [
  {
    icon: 'Lightbulb',
    title: '한 줄 요약',
    body: '“4~6개의 임플란트로 위 또는 아래 전체 치아를 한 번에 완성하는 치료”',
  },
  {
    icon: 'CircleHelp',
    title: '틀니 대신 올온임플란트?',
    body: '틀니는 매일 빼고 끼워야 하고, 씹는 힘도 자연치아의 30%에 불과합니다. 올온임플란트는 적은 수의 임플란트로 전체 치아를 고정식으로 완성해 틀니 없이 자연치아처럼 드실 수 있습니다.',
  },
]

const immediateSummaryCards = [
  {
    icon: 'Zap',
    title: '한 줄 요약',
    body: '“임플란트를 심는 당일 임시치아를 연결해, 치아 없는 기간을 최소화하는 치료”',
  },
  {
    icon: 'Clock3',
    title: '왜 빠른가요?',
    body: '일반 임플란트는 뼈와 결합하는 시간을 기다린 뒤 치아를 올립니다. 즉시로딩은 뼈 밀도와 초기 고정력이 충분한 경우, 식립 당일 임시치아까지 연결해 일상 공백을 줄입니다.',
  },
]

/** **볼드** → 브랜드 블루 강조 인라인 파서 */
function inlineParse(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <span key={i} className="font-semibold" style={{ color: '#0080C8' }}>{part.slice(2, -2)}</span>
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
function AllOnImageMarquee() {
  return (
    <div className="relative left-1/2 -mt-4 mb-2 w-screen -translate-x-1/2 overflow-hidden py-4 sm:-mt-6 sm:mb-4 sm:py-5">
      <div className="all-on-marquee-track flex w-max items-center">
        {[0, 1].map((item) => (
          <img
            key={item}
            src="/images/allon/allonslide.jpg"
            alt=""
            aria-hidden="true"
            className="h-[54px] w-auto max-w-none shrink-0 object-contain sm:h-[72px] lg:h-[92px]"
          />
        ))}
      </div>
    </div>
  )
}

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
        <blockquote key={key++} className="border-l-2 pl-4 py-1 my-3 text-[16px] text-gray-500 italic leading-relaxed" style={{ borderColor: '#0080C8' }}>
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

function AllOnImplantChapter({ treatment }: { treatment: TreatmentContent }) {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.12)
  const { ref: cardRef, isVisible: cardVisible } = useScrollReveal(0.1)

  return (
    <div className="space-y-12">
      <div
        ref={heroRef}
        className="grid grid-cols-1 lg:grid-cols-[0.94fr_1.06fr] gap-8 lg:gap-12 items-center"
      >
        <div className="space-y-6">
          <div className={`inline-flex items-center gap-2 text-[#0080C8] font-semibold text-[15px] ${heroVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}>
            <LucideIcon name="MapPin" size={18} />
            <span>수원치과 서울이건치과</span>
          </div>
          <div className="space-y-4">
            <h2
              className={`text-[46px] sm:text-[64px] lg:text-[76px] font-black leading-[0.98] tracking-normal text-gray-950 ${heroVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
              style={heroVisible ? { animationDelay: '0.08s' } : undefined}
            >
              올온 <span className="text-[#0080C8]">임플란트</span>
            </h2>
            <p
              className={`text-[22px] sm:text-[28px] leading-relaxed text-gray-900 font-medium ${heroVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
              style={heroVisible ? { animationDelay: '0.16s' } : undefined}
            >
              여러 치아를 잃은 경우,<br className="hidden sm:block" />
              전체 기능 회복을 함께 고민합니다
            </p>
          </div>
        </div>

        <div
          className={`relative min-h-[320px] sm:min-h-[420px] lg:min-h-[500px] ${heroVisible ? 'scroll-reveal-right' : 'scroll-hidden'}`}
          style={heroVisible ? { animationDelay: '0.12s' } : undefined}
        >
          <div className="absolute inset-4 rounded-full bg-[#EAF6FD]" />
          <div className="absolute inset-x-4 top-0 rounded-full h-40 bg-white/65 blur-2xl" />
          <img
            src={treatment.image}
            alt="올온 임플란트 보철"
            className="absolute right-0 top-0 w-[82%] max-w-[560px] rounded-[28px] object-cover shadow-[0_24px_70px_rgba(15,71,110,0.14)]"
          />
          {treatment.sideImage && (
            <img
              src={treatment.sideImage}
              alt="올온 임플란트 보철 제작 사례"
              className="absolute left-0 bottom-2 w-[92%] rounded-[22px] object-cover border border-white/80 shadow-[0_26px_80px_rgba(15,71,110,0.16)]"
            />
          )}
        </div>
      </div>

      <AllOnImageMarquee />

      <div
        ref={cardRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {allOnSummaryCards.map((card, i) => (
          <div
            key={card.title}
            className={`rounded-2xl border border-[#D9E7F1] bg-white p-7 shadow-[0_16px_50px_rgba(16,55,91,0.07)] ${cardVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
            style={cardVisible ? { animationDelay: `${0.06 * i}s` } : undefined}
          >
            <div className="flex items-center gap-4 mb-5">
              <span className="w-12 h-12 rounded-full bg-[#E8F6FE] flex items-center justify-center">
                <LucideIcon name={card.icon} size={25} className="text-[#0080C8]" />
              </span>
              <h3 className="text-[20px] font-bold text-gray-950">{card.title}</h3>
            </div>
            <p className="text-[17px] leading-[1.85] text-gray-700 whitespace-pre-line">{card.body}</p>
          </div>
        ))}

        <div
          className={`rounded-2xl border border-[#D9E7F1] bg-white p-7 shadow-[0_16px_50px_rgba(16,55,91,0.07)] ${cardVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
          style={cardVisible ? { animationDelay: '0.12s' } : undefined}
        >
          <div className="flex items-center gap-4 mb-5">
            <span className="w-12 h-12 rounded-full bg-[#E8F6FE] flex items-center justify-center">
              <LucideIcon name="TriangleAlert" size={25} className="text-[#0080C8]" />
            </span>
            <h3 className="text-[20px] font-bold text-gray-950">이런 분께 특히 필요합니다</h3>
          </div>
          <ul className="space-y-4">
            {treatment.indications?.slice(0, 3).map((item) => (
              <li key={item} className="flex items-start gap-3 text-[17px] leading-relaxed text-gray-700">
                <span className="mt-1 w-5 h-5 rounded-full bg-[#0080C8] flex items-center justify-center shrink-0">
                  <LucideIcon name="Check" size={12} className="text-white" strokeWidth={3} />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {treatment.benefitsTitle && (
        <div className="flex items-center gap-6">
          <div className="h-px bg-gray-200 flex-1" />
          <h3 className="text-[26px] sm:text-[30px] font-black text-gray-950 text-center">
            {treatment.benefitsTitle}
          </h3>
          <div className="h-px bg-gray-200 flex-1" />
        </div>
      )}

      <div className="rounded-[28px] bg-white border border-[#E1EAF2] shadow-[0_18px_60px_rgba(16,55,91,0.08)] overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[#E3ECF4]">
          {treatment.benefits.map((benefit, i) => (
            <div
              key={benefit.tag}
              className={`p-7 text-center flex flex-col items-center ${cardVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
              style={cardVisible ? { animationDelay: `${0.08 + i * 0.05}s` } : undefined}
            >
              {benefit.icon && <LucideIcon name={benefit.icon} size={48} className="text-[#0080C8] mb-5" strokeWidth={1.8} />}
              <h4 className="text-[#0080C8] text-[17px] font-black leading-snug mb-4">
                #{benefit.tag}
              </h4>
              <p className="text-[15px] leading-[1.85] text-gray-700">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {treatment.comparison && (
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="h-px bg-gray-200 flex-1" />
            <h3 className="text-[26px] sm:text-[30px] font-black text-gray-950 text-center">
              틀니와 올온임플란트 비교
            </h3>
            <div className="h-px bg-gray-200 flex-1" />
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#DCE8F2] bg-white shadow-[0_16px_50px_rgba(16,55,91,0.07)]">
            <div className="grid grid-cols-[1fr_120px_1fr] sm:grid-cols-[1fr_180px_1fr]">
              <div className="bg-[#AEB8C8] text-white text-center py-3 text-[18px] font-bold">
                {treatment.comparison.leftLabel}
              </div>
              <div className="bg-white border-x border-[#E4EDF5]" />
              <div className="bg-[#0080C8] text-white text-center py-3 text-[18px] font-bold">
                {treatment.comparison.rightLabel}
              </div>
            </div>
            {treatment.comparison.rows.map((row) => (
              <div key={row.label} className="grid grid-cols-[1fr_120px_1fr] sm:grid-cols-[1fr_180px_1fr] border-t border-[#E4EDF5] min-h-16">
                <div className="flex items-center justify-center px-3 py-4 text-center text-[15px] sm:text-[16px] text-gray-600 leading-snug">
                  {row.leftText}
                </div>
                <div className="flex items-center justify-center gap-2 px-3 py-4 border-x border-[#E4EDF5] text-gray-900 font-bold text-[15px] sm:text-[16px]">
                  {row.icon && <LucideIcon name={row.icon} size={22} className="text-[#0080C8] shrink-0" />}
                  <span>{row.label}</span>
                </div>
                <div className="flex items-center justify-center px-3 py-4 text-center text-[15px] sm:text-[16px] font-bold text-[#0080C8] leading-snug">
                  {row.rightText}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {treatment.bottomCta && (
        <div className="flex items-center justify-center gap-4 rounded-2xl border border-[#DCE8F2] bg-white px-6 py-5 shadow-[0_12px_40px_rgba(16,55,91,0.06)]">
          <LucideIcon name="Tooth" size={34} className="text-[#0080C8] shrink-0" />
          <p className="text-[20px] sm:text-[22px] font-bold text-[#0080C8] text-center leading-relaxed">
            {treatment.bottomCta}
          </p>
        </div>
      )}
    </div>
  )
}

function ImmediateLoadingChapter({ treatment }: { treatment: TreatmentContent }) {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.12)
  const { ref: cardRef, isVisible: cardVisible } = useScrollReveal(0.1)

  return (
    <div className="space-y-12">
      <div
        ref={heroRef}
        className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-center"
      >
        <div className="space-y-6">
          <div className={`inline-flex items-center gap-2 text-[#0080C8] font-semibold text-[15px] ${heroVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}>
            <LucideIcon name="CalendarCheck" size={18} />
            <span>당일 임시치아 연결을 고려하는 임플란트</span>
          </div>
          <div className="space-y-4">
            <h2
              className={`text-[42px] sm:text-[60px] lg:text-[72px] font-black leading-[1.02] tracking-normal text-gray-950 ${heroVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
              style={heroVisible ? { animationDelay: '0.08s' } : undefined}
            >
              <span className="block">즉시로딩</span>
              <span className="block text-[#0080C8]">임플란트</span>
            </h2>
            <p
              className={`text-[22px] sm:text-[27px] leading-relaxed text-gray-900 font-medium ${heroVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
              style={heroVisible ? { animationDelay: '0.16s' } : undefined}
            >
              임플란트 식립 당일,<br className="hidden sm:block" />
              임시치아까지 연결해 일상 공백을 줄입니다
            </p>
          </div>

          <div
            className={`grid grid-cols-3 gap-3 max-w-xl ${heroVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}
            style={heroVisible ? { animationDelay: '0.24s' } : undefined}
          >
            {[
              ['DAY 0', '식립 당일'],
              ['TEMP', '임시치아'],
              ['CHECK', '적합성 평가'],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-[#D9E7F1] bg-white px-4 py-4 text-center shadow-[0_10px_30px_rgba(16,55,91,0.06)]">
                <p className="text-[#0080C8] text-[18px] font-black leading-none">{k}</p>
                <p className="mt-2 text-[14px] font-semibold text-gray-600">{v}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`relative min-h-[360px] sm:min-h-[480px] lg:min-h-[540px] ${heroVisible ? 'scroll-reveal-right' : 'scroll-hidden'}`}
          style={heroVisible ? { animationDelay: '0.12s' } : undefined}
        >
          <div className="absolute inset-4 rounded-[38px] bg-[#EAF6FD]" />
          <div className="absolute -left-2 top-12 w-44 h-44 rounded-full bg-white/70 blur-2xl" />
          <div className="absolute right-4 bottom-10 w-56 h-56 rounded-full bg-[#D8EFFB] blur-2xl" />
          {treatment.beforeImage && (
            <div className="absolute left-0 top-0 w-[72%] rounded-[26px] overflow-hidden border border-white/80 shadow-[0_24px_70px_rgba(15,71,110,0.16)] bg-white">
              <img src={treatment.beforeImage} alt="즉시로딩 임플란트 치료 전" className="w-full aspect-[16/9] object-cover" />
              <div className="absolute left-4 top-4 rounded-full bg-gray-900/70 px-3 py-1 text-[13px] font-bold text-white">Before</div>
            </div>
          )}
          {treatment.afterImage && (
            <div className="absolute right-0 bottom-0 w-[82%] rounded-[28px] overflow-hidden border border-white/90 shadow-[0_30px_90px_rgba(15,71,110,0.2)] bg-white">
              <img src={treatment.afterImage} alt="즉시로딩 임플란트 치료 후" className="w-full aspect-[16/9] object-cover" />
              <div className="absolute left-4 top-4 rounded-full bg-[#0080C8] px-3 py-1 text-[13px] font-bold text-white">After</div>
            </div>
          )}
          <div className="absolute left-7 bottom-20 rounded-2xl bg-white/92 backdrop-blur px-5 py-4 border border-[#DCE8F2] shadow-[0_18px_50px_rgba(16,55,91,0.12)]">
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-full bg-[#E8F6FE] flex items-center justify-center">
                <LucideIcon name="ArrowRight" size={23} className="text-[#0080C8]" />
              </span>
              <div>
                <p className="text-[13px] font-bold text-gray-500">치아 없는 기간</p>
                <p className="text-[18px] font-black text-gray-950">최소화 목표</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={cardRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {immediateSummaryCards.map((card, i) => (
          <div
            key={card.title}
            className={`rounded-2xl border border-[#D9E7F1] bg-white p-7 shadow-[0_16px_50px_rgba(16,55,91,0.07)] ${cardVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
            style={cardVisible ? { animationDelay: `${0.06 * i}s` } : undefined}
          >
            <div className="flex items-center gap-4 mb-5">
              <span className="w-12 h-12 rounded-full bg-[#E8F6FE] flex items-center justify-center">
                <LucideIcon name={card.icon} size={25} className="text-[#0080C8]" />
              </span>
              <h3 className="text-[20px] font-bold text-gray-950">{card.title}</h3>
            </div>
            <p className="text-[17px] leading-[1.85] text-gray-700 whitespace-pre-line">{card.body}</p>
          </div>
        ))}

        <div
          className={`rounded-2xl border border-[#D9E7F1] bg-white p-7 shadow-[0_16px_50px_rgba(16,55,91,0.07)] ${cardVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
          style={cardVisible ? { animationDelay: '0.12s' } : undefined}
        >
          <div className="flex items-center gap-4 mb-5">
            <span className="w-12 h-12 rounded-full bg-[#E8F6FE] flex items-center justify-center">
              <LucideIcon name="TriangleAlert" size={25} className="text-[#0080C8]" />
            </span>
            <h3 className="text-[20px] font-bold text-gray-950">이런 분께 특히 필요합니다</h3>
          </div>
          <ul className="space-y-4">
            {treatment.indications?.slice(0, 3).map((item) => (
              <li key={item} className="flex items-start gap-3 text-[17px] leading-relaxed text-gray-700">
                <span className="mt-1 w-5 h-5 rounded-full bg-[#0080C8] flex items-center justify-center shrink-0">
                  <LucideIcon name="Check" size={12} className="text-white" strokeWidth={3} />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {treatment.steps && (
        <div className="rounded-[28px] bg-[#F7FBFE] border border-[#DCE8F2] p-6 sm:p-8">
          <div className="flex items-center gap-6 mb-7">
            <div className="h-px bg-gray-200 flex-1" />
            <h3 className="text-[26px] sm:text-[30px] font-black text-gray-950 text-center">
              즉시로딩 진행 흐름
            </h3>
            <div className="h-px bg-gray-200 flex-1" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {treatment.steps.map((step, i) => (
              <div
                key={step.title}
                className={`relative rounded-2xl bg-white border border-[#E1EAF2] p-5 text-center shadow-[0_10px_30px_rgba(16,55,91,0.05)] ${cardVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
                style={cardVisible ? { animationDelay: `${0.08 + i * 0.05}s` } : undefined}
              >
                <span className="mx-auto mb-4 w-10 h-10 rounded-full bg-[#0080C8] text-white flex items-center justify-center text-[14px] font-black">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {step.icon && <LucideIcon name={step.icon} size={30} className="text-[#0080C8] mx-auto mb-3" strokeWidth={1.8} />}
                <h4 className="text-[17px] font-black text-gray-950 leading-snug">{step.title}</h4>
                {step.desc && <p className="mt-3 text-[14px] text-gray-600 leading-[1.75]">{step.desc}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {treatment.benefitsTitle && (
        <div className="flex items-center gap-6">
          <div className="h-px bg-gray-200 flex-1" />
          <h3 className="text-[26px] sm:text-[30px] font-black text-gray-950 text-center">
            {treatment.benefitsTitle}
          </h3>
          <div className="h-px bg-gray-200 flex-1" />
        </div>
      )}

      <div className="rounded-[28px] bg-white border border-[#E1EAF2] shadow-[0_18px_60px_rgba(16,55,91,0.08)] overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[#E3ECF4]">
          {treatment.benefits.map((benefit, i) => (
            <div
              key={benefit.tag}
              className={`p-7 text-center flex flex-col items-center ${cardVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
              style={cardVisible ? { animationDelay: `${0.08 + i * 0.05}s` } : undefined}
            >
              {benefit.icon && <LucideIcon name={benefit.icon} size={48} className="text-[#0080C8] mb-5" strokeWidth={1.8} />}
              <h4 className="text-[#0080C8] text-[17px] font-black leading-snug mb-4">
                #{benefit.tag}
              </h4>
              <p className="text-[15px] leading-[1.85] text-gray-700">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {treatment.comparison && (
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="h-px bg-gray-200 flex-1" />
            <h3 className="text-[26px] sm:text-[30px] font-black text-gray-950 text-center">
              일반 임플란트와 즉시로딩 비교
            </h3>
            <div className="h-px bg-gray-200 flex-1" />
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#DCE8F2] bg-white shadow-[0_16px_50px_rgba(16,55,91,0.07)]">
            <div className="grid grid-cols-[1fr_120px_1fr] sm:grid-cols-[1fr_180px_1fr]">
              <div className="bg-[#AEB8C8] text-white text-center py-3 text-[18px] font-bold">
                {treatment.comparison.leftLabel}
              </div>
              <div className="bg-white border-x border-[#E4EDF5]" />
              <div className="bg-[#0080C8] text-white text-center py-3 text-[18px] font-bold">
                {treatment.comparison.rightLabel}
              </div>
            </div>
            {treatment.comparison.rows.map((row) => (
              <div key={row.label} className="grid grid-cols-[1fr_120px_1fr] sm:grid-cols-[1fr_180px_1fr] border-t border-[#E4EDF5] min-h-16">
                <div className="flex items-center justify-center px-3 py-4 text-center text-[15px] sm:text-[16px] text-gray-600 leading-snug">
                  {row.leftText}
                </div>
                <div className="flex items-center justify-center gap-2 px-3 py-4 border-x border-[#E4EDF5] text-gray-900 font-bold text-[15px] sm:text-[16px]">
                  {row.icon && <LucideIcon name={row.icon} size={22} className="text-[#0080C8] shrink-0" />}
                  <span>{row.label}</span>
                </div>
                <div className="flex items-center justify-center px-3 py-4 text-center text-[15px] sm:text-[16px] font-bold text-[#0080C8] leading-snug">
                  {row.rightText}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {treatment.bottomCta && (
        <div className="flex items-center justify-center gap-4 rounded-2xl border border-[#DCE8F2] bg-white px-6 py-5 shadow-[0_12px_40px_rgba(16,55,91,0.06)]">
          <LucideIcon name="CalendarCheck" size={34} className="text-[#0080C8] shrink-0" />
          <p className="text-[20px] sm:text-[22px] font-bold text-[#0080C8] text-center leading-relaxed">
            {treatment.bottomCta}
          </p>
        </div>
      )}
    </div>
  )
}

function DiastemaResinChapter({ treatment }: { treatment: TreatmentContent }) {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.12)
  const { ref: cardRef, isVisible: cardVisible } = useScrollReveal(0.1)

  const summaryCards = [
    {
      icon: 'Sparkles',
      title: '한 줄 요약',
      body: '앞니 사이 벌어진 틈을 치아를 깎지 않고 레진으로 메워 당일 자연스럽게 정리하는 치료',
    },
    {
      icon: 'Gem',
      title: '라미네이트와 다른 점',
      body: '세라믹을 제작해 붙이는 방식이 아니라 치아색 레진을 직접 채워 완성합니다. 작은 틈이라면 더 보존적인 선택이 될 수 있습니다.',
    },
    {
      icon: 'CalendarCheck',
      title: '이런 분께 적합합니다',
      body: '앞니 사이 틈이 신경 쓰이지만 치아 삭제나 여러 번의 내원이 부담스러운 분께 먼저 고려할 수 있습니다.',
    },
  ]

  return (
    <div className="space-y-12">
      <div
        ref={heroRef}
        className="grid grid-cols-1 lg:grid-cols-[0.88fr_1.12fr] gap-8 lg:gap-12 items-center"
      >
        <div className="space-y-6">
          <div className={`inline-flex items-center gap-2 text-[#0080C8] font-semibold text-[15px] ${heroVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}>
            <LucideIcon name="SmilePlus" size={18} />
            <span>치아 삭제를 줄이는 앞니 심미 수복</span>
          </div>

          <div className="space-y-4">
            <h2
              className={`text-[42px] sm:text-[58px] lg:text-[66px] font-black leading-[1.06] tracking-normal text-gray-950 ${heroVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
              style={heroVisible ? { animationDelay: '0.08s' } : undefined}
            >
              <span className="block">앞니</span>
              <span className="block text-[#0080C8]">레진치료</span>
              <span className="block text-[22px] sm:text-[28px] lg:text-[32px] mt-3 font-black text-gray-400">
                Diastema
              </span>
            </h2>
            <p
              className={`text-[21px] sm:text-[25px] leading-relaxed text-gray-900 font-medium ${heroVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
              style={heroVisible ? { animationDelay: '0.16s' } : undefined}
            >
              치아 사이 벌어진 틈,<br className="hidden sm:block" />
              깎지 않고 당일 메워드립니다
            </p>
          </div>

          <div
            className={`rounded-2xl border border-[#D9E7F1] bg-white p-6 shadow-[0_14px_45px_rgba(16,55,91,0.06)] ${heroVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}
            style={heroVisible ? { animationDelay: '0.24s' } : undefined}
          >
            <p className="text-[17px] sm:text-[18px] leading-[1.9] text-gray-700">
              앞니 사이의 벌어진 공간을 치아색 레진으로 직접 채워,
              세라믹 보철 없이도 자연스러운 형태와 색상으로 당일 완성을 기대할 수 있습니다.
            </p>
          </div>
        </div>

        <div
          className={`relative ${heroVisible ? 'scroll-reveal-right' : 'scroll-hidden'}`}
          style={heroVisible ? { animationDelay: '0.12s' } : undefined}
        >
          <div className="absolute inset-4 rounded-[34px] bg-[#EAF6FD]" />
          <div className="relative rounded-[28px] overflow-hidden bg-white border border-white shadow-[0_28px_90px_rgba(15,71,110,0.16)]">
            {treatment.beforeImage && treatment.afterImage ? (
              <BeforeAfterSlider
                beforeSrc={treatment.beforeImage}
                afterSrc={treatment.afterImage}
                beforeAlt={`${treatment.title} 시술 전`}
                afterAlt={`${treatment.title} 시술 후`}
                beforeScale={treatment.beforeScale}
              />
            ) : (
              <div className="w-full aspect-[4/3] flex items-center justify-center text-gray-400 text-sm">
                치료 이미지 준비 중
              </div>
            )}
          </div>
        </div>
      </div>

      <div ref={cardRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {summaryCards.map((card, i) => (
          <div
            key={card.title}
            className={`rounded-2xl border border-[#D9E7F1] bg-white p-7 shadow-[0_16px_50px_rgba(16,55,91,0.07)] ${cardVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
            style={cardVisible ? { animationDelay: `${0.06 * i}s` } : undefined}
          >
            <div className="flex items-center gap-4 mb-5">
              <span className="w-12 h-12 rounded-full bg-[#E8F6FE] flex items-center justify-center">
                <LucideIcon name={card.icon} size={25} className="text-[#0080C8]" />
              </span>
              <h3 className="text-[20px] font-bold text-gray-950">{card.title}</h3>
            </div>
            <p className="text-[16px] leading-[1.85] text-gray-700">{card.body}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <div className="h-px bg-gray-200 flex-1" />
        <h3 className="text-[26px] sm:text-[30px] font-black text-gray-950 text-center">
          앞니 레진치료의 장점
        </h3>
        <div className="h-px bg-gray-200 flex-1" />
      </div>

      <div className="rounded-[28px] bg-white border border-[#E1EAF2] shadow-[0_18px_60px_rgba(16,55,91,0.08)] overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[#E3ECF4]">
          {treatment.benefits.map((benefit, i) => (
            <div
              key={benefit.tag}
              className={`p-7 text-center flex flex-col items-center ${cardVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
              style={cardVisible ? { animationDelay: `${0.08 + i * 0.05}s` } : undefined}
            >
              <LucideIcon
                name={['ShieldCheck', 'CalendarCheck', 'Sparkles', 'ArrowRightLeft', 'SmilePlus'][i] ?? 'CheckCircle'}
                size={46}
                className="text-[#0080C8] mb-5"
                strokeWidth={1.8}
              />
              <h4 className="text-[#0080C8] text-[16px] font-black leading-snug mb-4">
                #{benefit.tag}
              </h4>
              <p className="text-[15px] leading-[1.85] text-gray-700">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 rounded-2xl border border-[#DCE8F2] bg-white px-6 py-5 shadow-[0_12px_40px_rgba(16,55,91,0.06)]">
        <LucideIcon name="Tooth" size={34} className="text-[#0080C8] shrink-0" />
        <p className="text-[19px] sm:text-[21px] font-bold text-[#0080C8] text-center leading-relaxed">
          깎지 않고, 하루 만에. 작은 틈 하나가 바꾸는 미소의 차이를 경험해 보세요.
        </p>
      </div>
    </div>
  )
}

function ResinBuildupChapter({ treatment }: { treatment: TreatmentContent }) {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.12)
  const { ref: cardRef, isVisible: cardVisible } = useScrollReveal(0.1)

  return (
    <div className="space-y-12">
      <div
        ref={heroRef}
        className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-center"
      >
        <div className="space-y-6">
          <div className={`inline-flex items-center gap-2 text-[#0080C8] font-semibold text-[15px] ${heroVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}>
            <LucideIcon name="ShieldCheck" size={18} />
            <span>필요한 부분만 정교하게 회복하는 보존 치료</span>
          </div>
          <div className="space-y-4">
            <h2
              className={`text-[42px] sm:text-[58px] lg:text-[66px] font-black leading-[1.04] tracking-normal text-gray-950 ${heroVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
              style={heroVisible ? { animationDelay: '0.08s' } : undefined}
            >
              <span className="block">1DAY</span>
              <span className="block text-[#0080C8]">레진빌드업</span>
            </h2>
            <p
              className={`text-[21px] sm:text-[26px] leading-relaxed text-gray-900 font-medium ${heroVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
              style={heroVisible ? { animationDelay: '0.16s' } : undefined}
            >
              가능한 한 보존적으로,<br className="hidden sm:block" />
              필요한 부분을 정교하게 회복합니다
            </p>
          </div>

          <div
            className={`grid grid-cols-3 gap-3 max-w-xl ${heroVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}
            style={heroVisible ? { animationDelay: '0.24s' } : undefined}
          >
            {[
              ['SAVE', '삭제 최소화'],
              ['ONE DAY', '당일 회복'],
              ['NATURAL', '자연 연결'],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-[#D9E7F1] bg-white px-4 py-4 text-center shadow-[0_10px_30px_rgba(16,55,91,0.06)]">
                <p className="text-[#0080C8] text-[16px] font-black leading-none">{k}</p>
                <p className="mt-2 text-[14px] font-semibold text-gray-600">{v}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`relative ${heroVisible ? 'scroll-reveal-right' : 'scroll-hidden'}`}
          style={heroVisible ? { animationDelay: '0.12s' } : undefined}
        >
          <div className="absolute inset-4 rounded-[34px] bg-[#EAF6FD]" />
          <div className="relative rounded-[28px] overflow-hidden bg-white border border-white shadow-[0_28px_90px_rgba(15,71,110,0.16)]">
            {treatment.beforeImage && treatment.afterImage ? (
              <BeforeAfterSlider
                beforeSrc={treatment.beforeImage}
                afterSrc={treatment.afterImage}
                beforeAlt={`${treatment.title} 시술 전`}
                afterAlt={`${treatment.title} 시술 후`}
                beforeScale={treatment.beforeScale}
              />
            ) : treatment.image ? (
              <img src={treatment.image} alt={treatment.title} className="w-full h-auto" />
            ) : (
              <div className="w-full aspect-[4/3] flex items-center justify-center text-gray-400 text-sm">
                치료 이미지 준비 중
              </div>
            )}
          </div>
        </div>
      </div>

      <div ref={cardRef}>
        <div
          className={`rounded-2xl border border-[#D9E7F1] bg-white p-7 shadow-[0_16px_50px_rgba(16,55,91,0.07)] ${cardVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
        >
          <div className="flex items-center gap-4 mb-5">
            <span className="w-12 h-12 rounded-full bg-[#E8F6FE] flex items-center justify-center">
              <LucideIcon name="TriangleAlert" size={25} className="text-[#0080C8]" />
            </span>
            <h3 className="text-[20px] font-bold text-gray-950">이런 분께 특히 필요합니다</h3>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {treatment.indications?.slice(0, 3).map((item) => (
              <li key={item} className="flex items-start gap-3 text-[17px] leading-relaxed text-gray-700">
                <span className="mt-1 w-5 h-5 rounded-full bg-[#0080C8] flex items-center justify-center shrink-0">
                  <LucideIcon name="Check" size={12} className="text-white" strokeWidth={3} />
                </span>
                <span>{item.replace(/\n/g, ' ')}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {treatment.steps && (
        <div className="rounded-[28px] bg-[#F7FBFE] border border-[#DCE8F2] p-6 sm:p-8">
          <div className="flex items-center gap-6 mb-7">
            <div className="h-px bg-gray-200 flex-1" />
            <h3 className="text-[26px] sm:text-[30px] font-black text-gray-950 text-center">
              레진 빌드업 진행 흐름
            </h3>
            <div className="h-px bg-gray-200 flex-1" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {treatment.steps.map((step, i) => (
              <div
                key={step.title}
                className={`relative rounded-2xl bg-white border border-[#E1EAF2] p-5 text-center shadow-[0_10px_30px_rgba(16,55,91,0.05)] ${cardVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
                style={cardVisible ? { animationDelay: `${0.08 + i * 0.05}s` } : undefined}
              >
                <span className="mx-auto mb-4 w-10 h-10 rounded-full bg-[#0080C8] text-white flex items-center justify-center text-[14px] font-black">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {step.icon && <LucideIcon name={step.icon} size={30} className="text-[#0080C8] mx-auto mb-3" strokeWidth={1.8} />}
                <h4 className="text-[17px] font-black text-gray-950 leading-snug">{step.title}</h4>
                {step.desc && <p className="mt-3 text-[14px] text-gray-600 leading-[1.75]">{step.desc}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-6">
        <div className="h-px bg-gray-200 flex-1" />
        <h3 className="text-[26px] sm:text-[30px] font-black text-gray-950 text-center">
          원데이 레진 빌드업의 장점
        </h3>
        <div className="h-px bg-gray-200 flex-1" />
      </div>

      <div className="rounded-[28px] bg-white border border-[#E1EAF2] shadow-[0_18px_60px_rgba(16,55,91,0.08)] overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[#E3ECF4]">
          {treatment.benefits.map((benefit, i) => (
            <div
              key={benefit.tag}
              className={`p-7 text-center flex flex-col items-center ${cardVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}
              style={cardVisible ? { animationDelay: `${0.08 + i * 0.05}s` } : undefined}
            >
              <LucideIcon
                name={['ShieldCheck', 'CalendarCheck', 'Sparkles', 'BadgeCheck', 'ArrowRightLeft'][i] ?? 'CheckCircle'}
                size={46}
                className="text-[#0080C8] mb-5"
                strokeWidth={1.8}
              />
              <h4 className="text-[#0080C8] text-[16px] font-black leading-snug mb-4">
                #{benefit.tag}
              </h4>
              <p className="text-[15px] leading-[1.85] text-gray-700">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {treatment.bottomCta && (
        <div className="flex items-center justify-center gap-4 rounded-2xl border border-[#DCE8F2] bg-white px-6 py-5 shadow-[0_12px_40px_rgba(16,55,91,0.06)]">
          <LucideIcon name="ShieldCheck" size={34} className="text-[#0080C8] shrink-0" />
          <p className="text-[19px] sm:text-[21px] font-bold text-[#0080C8] text-center leading-relaxed">
            {treatment.bottomCta}
          </p>
        </div>
      )}
    </div>
  )
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

  if (treatment.treatmentType === 'all-on') {
    return <AllOnImplantChapter treatment={treatment} />
  }

  if (treatment.treatmentType === 'immediate-loading') {
    return <ImmediateLoadingChapter treatment={treatment} />
  }

  if (treatment.treatmentType === 'diastema') {
    return <DiastemaResinChapter treatment={treatment} />
  }

  if (treatment.treatmentType === 'resin-buildup') {
    return <ResinBuildupChapter treatment={treatment} />
  }

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
          {treatment.heroTitle ? (
            <>
              <div className={`flex items-center gap-1.5 text-[#0080C8] text-[13px] font-semibold ${textVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
                style={textVisible ? { animationDelay: '0.08s' } : undefined}>
                <LucideIcon name="ShieldCheck" size={13} />
                <span>{treatment.subtitle}</span>
              </div>
              <h2 className={`leading-none ${textVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
                style={textVisible ? { animationDelay: '0.1s' } : undefined}>
                {treatment.heroTitle.line1 && (
                  <span className="block text-[52px] sm:text-[64px] font-black text-gray-900 leading-[1.05]">
                    {treatment.heroTitle.line1}
                  </span>
                )}
                <span className="block text-[52px] sm:text-[64px] font-black leading-[1.05]" style={{ color: '#0080C8' }}>
                  {treatment.heroTitle.line2}
                </span>
              </h2>
            </>
          ) : (
            <>
              <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 leading-tight ${textVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
                style={textVisible ? { animationDelay: '0.1s' } : undefined}>
                {treatment.title}
              </h2>
              <p className={`text-[22px] sm:text-[24px] text-[#0080C8] font-bold leading-snug ${textVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
                style={textVisible ? { animationDelay: '0.2s' } : undefined}>
                {treatment.subtitle}
              </p>
            </>
          )}
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
                    <p className="font-bold text-[17px] text-gray-900 leading-tight">{step.title}</p>
                    {step.desc && <p className="text-[16px] text-gray-600 leading-relaxed mt-1">{step.desc}</p>}
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
                  <p className="font-bold text-[17px] text-gray-900 leading-tight">{h.label}</p>
                  <p className="text-[12px] text-gray-600 font-medium leading-relaxed whitespace-pre-line">{h.desc}</p>
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
          {treatment.photoGrid ? (
            <div className="grid grid-cols-2 gap-2">
              {treatment.photoGrid.map((item, i) => (
                <div key={i} className="rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                  <div className="relative">
                    <img src={item.src} alt={item.caption} className="w-full aspect-[4/3] object-cover block" />
                    <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-[#0080C8] flex items-center justify-center shadow">
                      <span className="text-white text-[13px] font-bold leading-none">{i + 1}</span>
                    </div>
                  </div>
                  <p className="text-center text-[15px] text-gray-700 font-semibold py-2 px-2 leading-tight">{item.caption}</p>
                </div>
              ))}
            </div>
          ) : (
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
          )}
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
                <p className="font-bold text-[18px] text-gray-900 leading-tight">{h.label}</p>
                <p className="text-[15px] text-gray-600 font-medium leading-relaxed whitespace-pre-line">{h.desc}</p>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{treatment.title} 치료 과정</h2>
          <div className="flex items-stretch w-full overflow-x-auto pb-2">
            {treatment.steps.map((step, i) => (
              <div key={i} className="flex items-center flex-1 min-w-[130px]">
                <div className="flex-1 h-full bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center text-center gap-3 shadow-sm">
                  <span className="w-9 h-9 rounded-full bg-[#0080C8] flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-bold text-[17px] text-gray-900 leading-tight">{step.title}</p>
                  {step.icon && (
                    <LucideIcon name={step.icon} size={30} className="text-gray-300" />
                  )}
                  <p className="text-[16px] text-gray-600 font-medium leading-relaxed whitespace-pre-line">{step.desc}</p>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{treatment.title}가 필요한 경우</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {treatment.indications.map((ind, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-5 flex flex-col items-center gap-3 text-center">
                <span className="w-8 h-8 rounded-full bg-[#0080C8] flex items-center justify-center shrink-0">
                  <LucideIcon name="Check" size={16} className="text-white" strokeWidth={3} />
                </span>
                <p className="text-[16px] text-gray-700 font-medium leading-relaxed whitespace-pre-line">{ind}</p>
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
        <h2 className={`text-3xl font-bold text-gray-900 text-center ${cardVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`}>
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
            <h3 className="text-[#0080C8] font-bold text-[18px] leading-snug">
              #{benefit.tag}
            </h3>
            <p className="text-gray-600 text-[16px] leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>

      {/* 비교표 */}
      {treatment.comparison && (
        <div className={`${cardVisible ? 'scroll-reveal-up' : 'scroll-hidden'}`} style={{ animationDelay: '0.15s' }}>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
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
                <div className="flex items-center justify-center px-4 py-4 text-[16px] text-gray-500 text-center leading-snug border-r border-gray-100">
                  {row.leftText}
                </div>
                <div className="flex flex-col items-center justify-center gap-1 w-28 sm:w-36 px-2 py-4 border-r border-gray-100">
                  {row.icon && <LucideIcon name={row.icon} size={18} className="text-[#0080C8]" />}
                  <span className="text-[14px] font-semibold text-gray-700">{row.label}</span>
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-[16px] font-semibold text-center leading-snug" style={{ color: '#0080C8' }}>
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
          <p className="text-[17px] text-gray-700 font-medium leading-relaxed">{treatment.bottomCta}</p>
        </div>
      )}
    </div>
  )
}

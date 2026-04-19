// @TASK Board - 치료 게시판 공통 레이아웃 템플릿
import type { TreatmentContent } from '@/types/treatment'
import BoardHero from './BoardHero'
import BoardAnchorNav from './BoardAnchorNav'
import TreatmentSection from './TreatmentSection'
import BenefitList from './BenefitList'
import CaseGallery from './CaseGallery'
import FaqAccordion from './FaqAccordion'
import BlogLinkCard from './BlogLinkCard'
import CtaSection from './CtaSection'
import { FaqJsonLd } from '@/components/seo/JsonLd'

interface TreatmentPageProps {
  title: string
  subtitle: string
  treatments: TreatmentContent[]
  hideCases?: boolean
  videoId?: string
  heroImage?: string
  heroFull?: boolean
  extraSection?: React.ReactNode
  treatImage?: string
}

export default function TreatmentPage({
  title,
  subtitle,
  treatments,
  hideCases,
  videoId,
  heroImage,
  heroFull,
  extraSection,
  treatImage,
}: TreatmentPageProps) {
  const navItems = treatments.map((t) => ({
    id: t.treatmentType,
    label: t.title,
  }))

  const allFaqs = treatments.flatMap((t) => t.faq)

  return (
    <>
      <FaqJsonLd faqs={allFaqs} />
      <BoardHero title={title} subtitle={subtitle} videoId={videoId} heroImage={heroImage} heroFull={heroFull} />
      {extraSection}
      <BoardAnchorNav items={navItems} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:pl-8 lg:pr-24">
        {treatments.map((treatment, index) => (
          <section
            key={treatment.treatmentType}
            id={treatment.treatmentType}
            className="py-16 sm:py-20 border-b border-gray-100 last:border-b-0 space-y-10"
            aria-labelledby={`heading-${treatment.treatmentType}`}
          >
            {/* id를 heading에도 심어 두면 ARIA 연결이 자연스러워지지만,
                TreatmentSection 내부 h2가 이 역할을 겸하므로 별도 숨김 heading 불필요 */}
            <TreatmentSection treatment={treatment} index={index} />
            {!hideCases && (
              <CaseGallery
                boardCategory={treatment.boardCategory}
                treatmentType={treatment.treatmentType}
              />
            )}
            <FaqAccordion faq={treatment.faq} />
            {!hideCases && (
              <BlogLinkCard boardCategory={treatment.boardCategory} />
            )}
            {treatImage && (
              <div className="md:hidden mt-6">
                <img src={treatImage} alt="치료 안내" className="w-full h-auto rounded-2xl" />
              </div>
            )}
          </section>
        ))}

        <div className="py-16 sm:py-20">
          <CtaSection />
        </div>
      </div>
    </>
  )
}

'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function NaturalToothPhilosophy() {
  const { ref, isVisible } = useScrollReveal(0.15)

  return (
    <section
      ref={ref}
      className="py-20 sm:py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* 좌측: 메인 카피 */}
          <div className="flex flex-col justify-center">
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.3] ${isVisible ? 'scroll-reveal-left' : 'scroll-hidden'}`}
            >
              가장 좋은 임플란트는
              <br />
              <span style={{ color: 'var(--e-primary)' }}>내 몸이 가진</span>
              <br />
              자연치아입니다.
            </h2>
          </div>

          {/* 우측: 상세 본문 */}
          <div className="space-y-6">
            <p
              className={`text-sm sm:text-base text-gray-600 leading-[1.8] ${isVisible ? 'scroll-reveal-right' : 'scroll-hidden'}`}
              style={isVisible ? { animationDelay: '0.5s' } : undefined}
            >
              치아는 한 번 많이 삭제되면 되돌릴 수 없기 때문에, 처음 치료 방향이 굉장히 중요합니다.
              그래서 저희는 단순히 충치를 제거하는 것을 넘어, "어디까지 살릴 수 있는지"를 먼저 고민합니다.
              초기 단계라면 치아 삭제를 최소화한 레진 빌드업으로 진행할 수 있고, 조금 더 진행된 경우에는
              인레이나 온레이를 통해 필요한 부분만 보강하는 치료를 선택하게 됩니다.
            </p>

            <p
              className={`text-sm sm:text-base text-gray-600 leading-[1.8] ${isVisible ? 'scroll-reveal-right' : 'scroll-hidden'}`}
              style={isVisible ? { animationDelay: '0.7s' } : undefined}
            >
              손상이 큰 경우에는{' '}
              <strong style={{ color: 'var(--e-primary)', fontWeight: 700 }}>치아 보호</strong>를 위해
              크라운 치료가 필요할 수 있지만, 이 역시도{' '}
              <strong style={{ color: 'var(--e-primary)', fontWeight: 700 }}>불필요한 삭제</strong>를
              줄이는 방향으로 신중하게 결정합니다.
              결국 중요한 것은 치료 방법 자체가 아니라, 환자분의 치아 상태에 맞는 적절한 선택입니다.{' '}
              <strong style={{ color: 'var(--e-primary)', fontWeight: 700 }}>자연치아</strong>를
              얼마나 오래, 건강하게 유지할 수 있는가 — 이 원칙을 바탕으로 기능과 형태를 함께 회복하는 치료를 진행합니다.
            </p>

            <div
              className={`border-l-2 pl-4 ${isVisible ? 'scroll-reveal-drop' : 'scroll-hidden'}`}
              style={{
                borderColor: 'var(--e-primary)',
                ...(isVisible ? { animationDelay: '0.9s' } : {}),
              }}
            >
              <p className="text-sm sm:text-base text-gray-800 font-semibold leading-[1.8]">
                '뽑기 전 마지막으로 들르는 곳'
                <br />
                그 책임감이 우리의 진료 철학이며,
                <br />
                타협하지 않는 정석 진료의 핵심입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import type { Metadata } from 'next'
import { Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: '수원 수면진료 | 서울이건치과 무통·편안한 치료',
  description:
    '치과 공포가 있으신 분도 서울이건치과 수면진료로 편안하게 치료받으세요. 의식하 진정(수면마취)을 통한 안전하고 편안한 무통치료를 제공합니다.',
  alternates: {
    canonical: 'https://egundc.com/sedation',
  },
}

const FEATURES = [
  {
    title: '치과 공포증 환자',
    desc: '치과에 대한 극도의 불안·공포감이 있는 분도 편안하게 치료받으실 수 있습니다.',
  },
  {
    title: '복잡한 복합 시술',
    desc: '임플란트, 발치 등 여러 부위를 한 번에 진행해야 하는 경우에 적합합니다.',
  },
  {
    title: '구역반사가 심한 경우',
    desc: '구역질이 심하거나 입을 오래 벌리기 힘드신 분께 도움이 됩니다.',
  },
]

export default function SedationPage() {
  return (
    <main className="pt-20 sm:pt-24">
      <h1 className="sr-only">수원 수면진료 - 서울이건치과 편안한 무통치료</h1>

      {/* 히어로 */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-[#EEF4FA] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#0080C8] mb-4">
            Sedation Dentistry
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            수면진료
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            치과 치료에 대한 두려움 없이<br />
            편안하게 치료받으실 수 있습니다.
          </p>
        </div>
      </section>

      {/* 수면진료 대상 */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 text-center">
            이런 분께 권장합니다
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="rounded-2xl bg-[#EEF4FA] p-6">
                <div className="w-8 h-8 rounded-full bg-[#0080C8]/20 flex items-center justify-center mb-4">
                  <span className="text-xs font-bold text-[#0080C8]">0{i + 1}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-[15px]">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 상담 CTA */}
      <section className="py-16 bg-[#0080C8]">
        <div className="max-w-xl mx-auto px-4 text-center">
          <p className="text-white/80 text-sm mb-3">수면진료 상담·예약</p>
          <p className="text-white text-xl font-semibold mb-6">
            자세한 사항은 전화 또는 카카오톡으로<br />편하게 문의해 주세요.
          </p>
          <a
            href="tel:031-896-5512"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-[#0080C8] font-bold text-lg hover:opacity-90 transition-opacity"
          >
            <Phone className="w-5 h-5" />
            031-896-5512
          </a>
        </div>
      </section>
    </main>
  )
}

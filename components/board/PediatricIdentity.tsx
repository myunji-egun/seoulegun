import BoardIdentityLayout from './BoardIdentityLayout'

const pillars = [
  {
    title: '편안한 진료 환경',
    description: '아이가 무서움 없이 치료받을 수 있도록\n공간과 소통 방식 모두 아이 눈높이에 맞췄습니다.\n첫 경험이 평생 치과 습관을 결정합니다.',
  },
  {
    title: '예방 중심',
    description: '충치가 생기기 전에 막는 것이 최선입니다.\n실란트, 불소도포, 조기 발견으로\n건강한 영구치가 자랄 수 있게 돕습니다.',
  },
  {
    title: '성장기 맞춤',
    description: '아이의 성장 단계에 맞는 치료 계획을 수립합니다.\n골격 발달과 치열 변화를 지속적으로 관찰하며\n적절한 시기에 필요한 치료를 안내합니다.',
  },
]

export function PediatricCredentialSection() {
  return (
    <section className="py-16 sm:py-20 overflow-hidden" style={{ background: 'linear-gradient(160deg, #E8F5FF 0%, #F0FAFF 50%, #EAF6FD 100%)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-14 items-center">

          {/* 왼쪽: 의사 사진 */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* 배경 원형 장식 */}
              <div className="absolute -bottom-6 -left-6 w-64 h-64 rounded-full bg-[#0080C8]/8" />
              <div className="absolute -top-4 -right-4 w-40 h-40 rounded-full bg-[#B8E0FF]/40" />
              <img
                src="/images/doctors/doctor-paek.png"
                alt="백설아 원장 소아치과 전문의"
                className="relative w-[260px] sm:w-[320px] lg:w-[360px] h-auto object-contain drop-shadow-xl"
              />
            </div>
          </div>

          {/* 오른쪽: 헤드라인 + 자격증 */}
          <div className="space-y-7">
            {/* 인증 뱃지 */}
            <div className="inline-flex items-center gap-2 bg-[#0080C8] text-white text-[13px] font-bold px-4 py-2 rounded-full shadow-md">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              보건복지부 인증
            </div>

            {/* 메인 헤드라인 */}
            <div>
              <h2 className="text-[36px] sm:text-[44px] lg:text-[50px] font-black leading-[1.12]">
                <span className="block text-gray-800">소아치과 전문의</span>
                <span className="block" style={{ color: '#0080C8' }}>직접 진료</span>
              </h2>
              <p className="mt-4 text-[17px] sm:text-[18px] text-gray-700 leading-[1.85] font-medium">
                우리 아이의 건강한 구강과 바른 치열 성장을 위해<br className="hidden sm:block" />
                소아치과 전문의가 1:1로 직접 진료합니다.
              </p>
              <p className="mt-2 text-[15px] text-gray-500 leading-relaxed">
                아이들의 눈높이에 맞춘 진료를 위해 노력합니다.<br />
                치과를 즐겁게 방문할 수 있도록 함께하겠습니다.
              </p>
            </div>

            {/* 의사 이름 카드 */}
            <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-5 py-3 shadow-sm border border-[#D0E8F5]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0080C8] shrink-0" />
              <span className="font-black text-[17px] text-gray-900">백설아 원장</span>
              <span className="text-[#0080C8] text-[14px] font-bold border-l border-[#D0E8F5] pl-3">소아치과전문의</span>
            </div>

            {/* 자격증 2장 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl overflow-hidden border-2 border-[#B8D8EE] shadow-[0_8px_30px_rgba(0,128,200,0.12)] bg-white">
                <div className="bg-[#0080C8] py-2 text-center">
                  <span className="text-white text-[11px] font-bold tracking-widest">소아치과전문의 자격증명서</span>
                </div>
                <img
                  src="/images/doctors/baek-docu1.png"
                  alt="소아치과전문의 자격 증명서"
                  className="w-full h-auto"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border-2 border-[#B8D8EE] shadow-[0_8px_30px_rgba(0,128,200,0.12)] bg-white">
                <div className="bg-[#2B2D42] py-2 text-center">
                  <span className="text-white text-[11px] font-bold tracking-widest">치과의사 면허 증명서</span>
                </div>
                <img
                  src="/images/doctors/baek-docu2.png"
                  alt="치과의사 면허 증명서"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function PediatricIdentity() {
  return (
    <BoardIdentityLayout
      label="PEDIATRIC DENTISTRY"
      title={<>아이의 첫 치과,<br /><span className="text-[#0080C8]">평생 구강 건강의 시작</span></>}
      description={<>아이가 치과를 무서워하지 않도록 하는 것이 먼저입니다.<br />편안한 첫 경험이 평생의 구강 건강 습관을 만들고,<br />소아 전문의가 성장 단계마다 함께합니다.</>}
      pillars={pillars}
    />
  )
}

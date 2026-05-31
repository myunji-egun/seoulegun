import Link from 'next/link'

export default function DoctorGroup() {
  return (
    <section className="relative h-dvh w-full overflow-hidden bg-black">

      {/* ── 모바일 이미지 (블러/오버레이 없음 → 인물 완전 노출) ── */}
      <div className="md:hidden absolute inset-0">
        <img
          src="/images/doctors/doctor-m.png"
          alt="서울이건치과 의료진"
          className="w-full h-full object-cover object-top"
        />
        {/* 상단 텍스트 영역만 살짝 어둡게 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 35%)',
          }}
        />
      </div>

      {/* ── 데스크탑 이미지 ── */}
      <img
        src="/images/doctors/doctors_2.png"
        alt="서울이건치과 의료진"
        className="hidden md:block absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* ── 모바일 텍스트 + 버튼 (상단 가운데 정렬) ── */}
      <div
        className="md:hidden absolute inset-x-0 z-10 flex flex-col items-center text-center px-7"
        style={{ top: 'calc(var(--mobile-header-height) + 50px)' }}
      >
        {/* 헤드라인 */}
        <h2 className="text-white text-[28px] font-bold leading-tight tracking-tight">
          한자리에서<br />변하지 않는 마음
        </h2>

        {/* 구분선 */}
        <div className="w-10 h-[1.5px] bg-white/50 my-4" />

        {/* 서브카피 */}
        <p className="text-white/75 text-[17px] font-light leading-snug mb-6">
          마음을 담아 정성을 다하여
        </p>

        {/* 버튼 */}
        <Link
          href="/about#doctor-intro"
          className="inline-flex items-center justify-center gap-2
            h-[48px] px-7 rounded-full
            bg-[#0080C8] text-white text-[15px] font-semibold
            shadow-[0_4px_20px_rgba(0,128,200,0.4)]
            transition-all duration-200 active:bg-[#006EAA]"
        >
          이건진료진 소개
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* ── 데스크탑 버튼 (기존 위치 유지) ── */}
      <Link
        href="/about#doctor-intro"
        className="hidden md:inline-flex absolute
          left-[6.4%] top-[55.5%]
          items-center justify-center gap-2
          h-[32px] px-4 w-[145px]
          rounded-none bg-white/10 text-gray-800
          border border-gray-700/70 backdrop-blur-[2px]
          text-[13px] font-semibold
          transition-all duration-200
          hover:bg-white/35 hover:border-[#0080C8] hover:text-[#0080C8]"
      >
        자세히보기
      </Link>
    </section>
  )
}

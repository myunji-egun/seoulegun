import Link from 'next/link'

export default function DoctorGroup() {
  return (
    <section className="relative h-dvh w-full overflow-hidden bg-white">

      {/* 모바일: 헤더~하단바 사이 영역에 이미지 표시 (잘림 없이 contain) */}
      <div
        className="md:hidden absolute inset-x-0"
        style={{
          top: 'var(--mobile-header-height)',
          bottom: 'var(--mobile-bottom-bar-height)',
        }}
      >
        <img
          src="/images/doctors/doctors_mobile.png"
          alt="Seoul Egun dental clinic doctors"
          className="w-full h-full object-contain object-center"
        />
      </div>

      {/* 데스크톱: full cover */}
      <img
        src="/images/doctors/doctors_2.png"
        alt="Seoul Egun dental clinic doctors"
        className="hidden md:block absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* 버튼
          모바일: 하단 고정바(60px) 바로 위 12px 여백
          데스크톱: 기존 좌측 55.5% 위치
      */}
      <Link
        href="/about#doctors"
        className="absolute
          left-1/2 -translate-x-1/2 bottom-[72px]
          md:left-[6.4%] md:translate-x-0 md:top-[55.5%] md:bottom-auto
          inline-flex items-center justify-center gap-2
          h-[52px] px-7
          rounded-full bg-[#0080C8] text-white
          text-[17px] font-semibold
          shadow-[0_4px_20px_rgba(0,128,200,0.35)]
          transition-all duration-200
          hover:bg-[#006EAA] hover:shadow-[0_6px_24px_rgba(0,128,200,0.5)]
          md:rounded-none md:bg-white/10 md:text-gray-800
          md:h-[64px] md:px-0 md:w-[290px]
          md:border md:border-gray-700/70 md:shadow-none md:backdrop-blur-[2px]
          md:hover:bg-white/35 md:hover:border-[#0080C8] md:hover:text-[#0080C8]"
      >
        자세히보기
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 md:hidden"
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
    </section>
  )
}

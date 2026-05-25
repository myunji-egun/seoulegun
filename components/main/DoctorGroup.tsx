import Link from 'next/link'

export default function DoctorGroup() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-white">
      <img
        src="/images/doctors/doctors_2.png"
        alt="Seoul Egun dental clinic doctors"
        className="h-full w-full object-cover object-center"
      />

      <Link
        href="/about#doctors"
        className="absolute left-[6.4%] top-[55.5%] inline-flex h-[64px] w-[290px] items-center justify-center border border-gray-700/70 bg-white/10 text-[22px] font-semibold text-gray-800 backdrop-blur-[2px] transition-all duration-200 hover:bg-white/35 hover:border-[#0080C8] hover:text-[#0080C8]"
      >
        자세히보기
      </Link>
    </section>
  )
}

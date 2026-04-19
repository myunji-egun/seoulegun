import Link from 'next/link'
import { clinicInfo } from '@/data/clinic-info'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">

          {/* 로고 + 기본 정보 */}
          <div className="space-y-5">
            {/* 로고 */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full bg-[#0080C8] flex items-center justify-center shrink-0"
                aria-hidden="true"
              >
                <span className="text-white text-xs font-bold">SNU</span>
              </div>
              <div>
                <p className="text-sm font-bold tracking-[0.12em] uppercase text-white">
                  Seoul Egun Dental
                </p>
                <p className="text-xs text-white/60 tracking-wide">서울이건치과</p>
              </div>
            </div>

            {/* 치과 정보 */}
            <ul className="space-y-2 text-sm text-white/70 leading-relaxed">
              <li>
                <span className="text-white/40 text-xs mr-1">대표</span>
                {clinicInfo.representative}
              </li>
              <li>
                <span className="text-white/40 text-xs mr-1">주소</span>
                {clinicInfo.address}
              </li>
              <li>
                <span className="text-white/40 text-xs mr-1">전화</span>
                <a
                  href={`tel:${clinicInfo.phone}`}
                  className="hover:text-[#D4C4A8] transition-colors"
                >
                  {clinicInfo.phone}
                </a>
              </li>
              <li>
                <span className="text-white/40 text-xs mr-1">팩스</span>
                {clinicInfo.fax}
              </li>
              <li>
                <span className="text-white/40 text-xs mr-1">사업자</span>
                {clinicInfo.businessNumber}
              </li>
            </ul>

            {/* 소셜 링크 */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={clinicInfo.socialLinks.kakao}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/70 hover:bg-[#0080C8] hover:text-white transition-colors"
                aria-label="카카오 채널"
              >
                K
              </a>
              <a
                href={clinicInfo.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/70 hover:bg-[#0080C8] hover:text-white transition-colors"
                aria-label="유튜브 채널"
              >
                Y
              </a>
              <a
                href={clinicInfo.socialLinks.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/70 hover:bg-[#0080C8] hover:text-white transition-colors"
                aria-label="네이버 블로그"
              >
                N
              </a>
              <a
                href={clinicInfo.socialLinks.naverPlace}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/70 hover:bg-[#0080C8] hover:text-white transition-colors"
                aria-label="네이버 플레이스"
              >
                P
              </a>
            </div>
          </div>

          {/* 진료시간표 */}
          <div>
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-5">
              진료시간
            </h3>
            <table className="w-full text-sm" aria-label="진료시간표">
              <thead className="sr-only">
                <tr>
                  <th>요일</th>
                  <th>시간</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {clinicInfo.businessHours.map((item) => (
                  <tr key={item.day} className="group">
                    <td className="py-2 pr-4 w-10 font-medium text-white/60 group-hover:text-white/80 transition-colors">
                      {item.day}
                    </td>
                    <td
                      className={`py-2 tabular-nums tracking-wide ${
                        item.isClosed
                          ? 'text-white/30'
                          : 'text-white/80 group-hover:text-white transition-colors'
                      }`}
                    >
                      {item.hours}
                      {item.note && (
                        <span className="ml-1 text-xs text-[#D4C4A8]/70">({item.note})</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-xs text-white/40 leading-relaxed">
              점심시간: 12:30 - 14:00
              <br />
              공휴일 휴진
            </p>
          </div>

          {/* 바로가기 링크 */}
          <div>
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-5">
              빠른 메뉴
            </h3>
            <nav aria-label="푸터 메뉴">
              <ul className="space-y-3">
                {[
                  { label: '이건치과소개', href: '/about' },
                  { label: '자연치아살리기', href: '/natural-tooth' },
                  { label: '임플란트', href: '/implant' },
                  { label: '심미보철', href: '/cosmetic' },
                  { label: '서울이건 교정치료', href: '/orthodontics' },
                  { label: '이건 미디어', href: '/media' },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/60 hover:text-[#D4C4A8] transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-[#D4C4A8] transition-colors shrink-0" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* 구분선 */}
        <div className="mt-12 pt-6 border-t border-white/10 space-y-3">
          {/* 면책 문구 */}
          <p className="text-xs text-white/30 leading-relaxed max-w-3xl">
            본 페이지의 내용은 의료법에 따라 참고용 정보이며, 정확한 진단과 치료는 내원 상담을 통해 결정됩니다.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-xs text-white/25">
              &copy; {currentYear} {clinicInfo.name}. All rights reserved.
            </p>
            <Link
              href="/notice"
              className="text-xs text-white/30 hover:text-white/60 transition-colors w-fit"
            >
              휴무일정 보기
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

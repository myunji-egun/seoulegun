import { clinicInfo } from '@/data/clinic-info'
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react'

const TRANSIT_INFO = [
  {
    type: '위치 안내',
    icon: '📍',
    lines: [
      {
        name: '저희 서울이건치과는 위브하늘채 후문에 위치하고 있습니다.',
        stop: '',
      },
    ],
  },
  {
    type: '도보',
    icon: '🚶',
    lines: [
      {
        name: '피자스쿨 매탄점에서 왼쪽 방향으로 이동',
        stop: '두산부동산공인중개사 사무소에서 오른쪽으로 돌면 파리바게트 빌딩 2층 서울이건치과 입구가 있습니다.',
      },
    ],
  },
  {
    type: '버스',
    icon: '🚌',
    lines: [
      {
        name: '매탄위브하늘채, 매탄삼성1차아파트 정류장 하차',
        stop: '도보 안내 참고',
      },
    ],
  },
]

const PARKING_INFO = [
  '건물 전용 주차장 이용 가능',
  '인근 인계동 공영주차장 이용 가능 (10분 무료)',
  '진료 시간에 따라 주차 도움 안내 가능',
]

export default function AccessSection() {
  const weekdayHours = clinicInfo.businessHours.filter(
    (h) => !['토', '일'].includes(h.day)
  )
  const weekendHours = clinicInfo.businessHours.filter((h) =>
    ['토', '일'].includes(h.day)
  )

  return (
    <section
      id="access"
      className="py-20 sm:py-28 bg-white scroll-mt-36"
      aria-labelledby="access-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#0080C8] mb-4">
          Location
        </p>
        <h2
          id="access-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-12"
        >
          오시는길
        </h2>

        {/* 지도 + 정보 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* 지도 영역 (3/5) */}
          <div className="lg:col-span-3">
            <div className="w-full aspect-[4/3] sm:aspect-video lg:aspect-auto lg:h-[calc(100%-56px)] min-h-64 rounded-2xl overflow-hidden border border-gray-200">
              <img
                src="/images/clinic/map.png"
                alt="서울이건치과 위치 지도"
                className="w-full h-full object-cover"
              />
            </div>
            <a
              href={`https://map.kakao.com/link/to/서울이건치과 수원점,${clinicInfo.latitude},${clinicInfo.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#FEE500] hover:bg-[#F5DC00] text-[#3C1E1E] font-semibold text-sm py-3.5 rounded-xl transition-colors mt-3"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2C6.48 2 2 5.58 2 10c0 2.8 1.8 5.27 4.55 6.72L12 22l5.45-5.28C20.2 15.27 22 12.8 22 10c0-4.42-4.48-8-10-8z" fill="#3C1E1E"/>
                <circle cx="12" cy="10" r="3" fill="#FEE500"/>
              </svg>
              카카오맵으로 길찾기
            </a>
          </div>

          {/* 정보 영역 (2/5) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* 주소 · 전화 */}
            <div className="rounded-2xl border border-gray-100 p-6 space-y-4 shadow-sm">
              <div className="flex items-start gap-3">
                <MapPin
                  className="w-5 h-5 text-[#0080C8] mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    주소
                  </p>
                  <address className="not-italic text-sm text-gray-800 leading-relaxed">
                    {clinicInfo.address}
                  </address>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              <div className="flex items-center gap-3">
                <Phone
                  className="w-5 h-5 text-[#0080C8] shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    전화
                  </p>
                  <a
                    href={`tel:${clinicInfo.phone.replace(/-/g, '')}`}
                    className="text-sm text-gray-800 hover:text-[#0080C8] transition-colors font-medium"
                  >
                    {clinicInfo.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* 진료시간 */}
            <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-[#0080C8]" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-gray-700">
                  진료시간
                </h3>
              </div>

              <div className="space-y-1.5">
                {clinicInfo.businessHours.map((h) => (
                  <div
                    key={h.day}
                    className="flex items-center text-sm"
                  >
                    <span className="text-gray-600 w-8 shrink-0">{h.day}</span>
                    <span
                      className={`w-28 shrink-0 tabular-nums ${
                        h.isClosed ? 'text-gray-400' : 'text-gray-800'
                      }`}
                    >
                      {h.hours}
                    </span>
                    {h.note && (
                      <span className="text-xs text-[#0080C8] font-medium">
                        {h.note}
                      </span>
                    )}
                  </div>
                ))}
                <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
                  * 점심시간 12:30 - 14:00 (토요일 없음)
                </p>
              </div>
            </div>

            {/* 네이버 플레이스 버튼 (모바일) */}
            <a
              href={clinicInfo.socialLinks.naverPlace}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#03C75A] text-white font-semibold py-3.5 rounded-xl hover:bg-[#02b34d] transition-colors text-sm lg:hidden"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              네이버 플레이스 바로가기
            </a>
          </div>
        </div>

        {/* 하단: 주차 + 대중교통 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
          {/* 주차 안내 */}
          <div className="rounded-2xl bg-stone-50 border border-stone-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">🅿️</span>
              주차 안내
            </h3>
            <ul className="space-y-2 mb-4">
              {PARKING_INFO.map((info, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-[#0080C8] mt-0.5">·</span>
                  {info}
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-3">
              <img src="/images/clinic/parking%20(1).jpg" alt="주차장 안내 1" className="w-full h-auto rounded-xl" />
              <img src="/images/clinic/parking%20(2).jpg" alt="주차장 안내 2" className="w-full h-auto rounded-xl" />
            </div>
          </div>

          {/* 대중교통 안내 */}
          <div className="rounded-2xl bg-stone-50 border border-stone-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">🚌</span>
              버스 · 주차 안내
            </h3>
            <img
              src="/images/clinic/map-guide.png"
              alt="서울이건치과 주차 및 버스 정류장 안내 지도"
              className="w-full h-auto rounded-xl mb-4"
            />
            <div className="space-y-4">
              {TRANSIT_INFO.map((transit) => (
                <div key={transit.type}>
                  <p className="text-xs font-semibold text-[#0080C8] uppercase tracking-wider mb-1.5">
                    {transit.icon} {transit.type}
                  </p>
                  <ul className="space-y-1">
                    {transit.lines.map((line, i) => (
                      <li key={i} className="text-sm text-gray-700 leading-relaxed">
                        {line.name && <span className="font-medium">{line.name}</span>}
                        {line.stop && (
                          <>
                            {line.name && <br />}
                            <span className="text-gray-500 text-xs">{line.stop}</span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

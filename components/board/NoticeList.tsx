'use client'

import { useState } from 'react'

interface Notice {
  id: string
  title: string
  content: string | null
  image_url: string | null
  notice_date: string
}

export default function NoticeList({ notices }: { notices: Notice[] }) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 bg-gray-50 px-5 py-4 sm:px-6">
        <h2 className="text-lg font-semibold text-gray-900">공지 목록</h2>
      </div>
      <ol className="divide-y divide-gray-200">
        {notices.map((notice, index) => (
          <li key={notice.id}>
            <button
              type="button"
              className="w-full flex gap-3 px-5 py-4 text-left transition-colors hover:bg-gray-50 sm:px-6"
              onClick={() => setOpenId(openId === notice.id ? null : notice.id)}
            >
              <span className="w-10 flex-shrink-0 text-base font-semibold text-[#0080C8] tabular-nums">
                {String(index + 1).padStart(2, '0')}.
              </span>
              <span className="min-w-0 text-base sm:text-lg font-semibold text-gray-900">
                {notice.title}
              </span>
            </button>

            {/* 이미지 펼침 */}
            {openId === notice.id && notice.image_url && (
              <div className="bg-gray-50 px-4 pb-4 pt-2 sm:px-6 sm:pb-6">
                <img
                  src={notice.image_url}
                  alt={notice.title}
                  className="mx-auto h-auto max-w-full rounded-md border border-gray-100 bg-white"
                />
              </div>
            )}

            {/* 이미지 없고 내용만 있는 경우 */}
            {openId === notice.id && !notice.image_url && notice.content && (
              <div className="bg-gray-50 px-5 pb-4 pt-2 sm:px-6 sm:pb-5">
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {notice.content}
                </p>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

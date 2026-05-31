'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface Props {
  onClose: () => void
  onSuccess: () => void
}

interface Form {
  name: string
  phone: string
  birthday: string
  userId: string
  password: string
}

export default function SignupGateModal({ onClose, onSuccess }: Props) {
  const [form, setForm] = useState<Form>({ name: '', phone: '', birthday: '', userId: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  // ESC 키 닫기
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  function set(field: keyof Form, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    if (digits.length <= 3) return digits
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!form.name.trim()) return setError('이름을 입력해 주세요.')
    if (form.phone.replace(/\D/g, '').length < 10) return setError('올바른 전화번호를 입력해 주세요.')
    if (!form.birthday) return setError('생년월일을 입력해 주세요.')
    if (form.userId.trim().length < 4) return setError('아이디는 4자 이상 입력해 주세요.')
    if (form.password.length < 8) return setError('비밀번호는 8자 이상 입력해 주세요.')

    setLoading(true)
    try {
      const res = await fetch('/api/auth/member-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.replace(/\D/g, ''),
          birthday: form.birthday,
          userId: form.userId.trim(),
          password: form.password,
        }),
      })
      const data = await res.json()
      if (!res.ok) return setError(data.error || '회원가입에 실패했습니다.')
      setDone(true)
      setTimeout(() => onSuccess(), 1500)
    } catch {
      setError('요청을 처리할 수 없습니다. 잠시 후 다시 시도해 주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="회원가입"
    >
      {/* 딤 배경 */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* 모달 */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="닫기"
        >
          <X size={20} />
        </button>

        {done ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-[#0080C8]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-[#0080C8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-bold text-gray-900 mb-1">가입 완료!</p>
            <p className="text-sm text-gray-500">치료 사례를 확인하실 수 있습니다.</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#0080C8]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <h2 className="text-lg font-bold text-gray-900">치료 사례 전체 보기</h2>
              </div>
              <p className="text-[13px] text-gray-500 pl-7">
                회원가입 후 모든 치료 전후 사진을 확인하실 수 있습니다.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  이름 <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  placeholder="홍길동"
                  autoComplete="name"
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#0080C8] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  전화번호 <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => set('phone', formatPhone(e.target.value))}
                  placeholder="010-0000-0000"
                  autoComplete="tel"
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#0080C8] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  생년월일 <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  value={form.birthday}
                  onChange={e => set('birthday', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#0080C8] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  아이디 <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.userId}
                  onChange={e => set('userId', e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                  placeholder="영문·숫자 4자 이상"
                  autoComplete="username"
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#0080C8] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  비밀번호 <span className="text-red-400">*</span>
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => set('password', e.target.value)}
                  placeholder="8자 이상"
                  autoComplete="new-password"
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#0080C8] transition-colors"
                />
              </div>

              {error && (
                <p className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>
              )}

              <p className="text-[11px] text-gray-400 leading-relaxed">
                가입 시{' '}
                <a href="/privacy" target="_blank" className="underline hover:text-[#0080C8]">개인정보처리방침</a>에
                동의하는 것으로 간주합니다.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0080C8] text-white font-semibold text-sm py-3 rounded-lg hover:bg-[#006BA8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-1"
              >
                {loading ? '처리 중...' : '가입하고 사진 보기'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

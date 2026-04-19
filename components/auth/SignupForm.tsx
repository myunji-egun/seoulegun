'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FormData {
  name: string
  phone: string
  email: string
  password: string
  passwordConfirm: string
  smsAgreed: boolean
  emailAgreed: boolean
  termsAgreed: boolean
  privacyAgreed: boolean
}

export default function SignupForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    password: '',
    passwordConfirm: '',
    smsAgreed: true,
    emailAgreed: true,
    termsAgreed: false,
    privacyAgreed: false,
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const allAgreed = form.termsAgreed && form.privacyAgreed

  function handleAllAgree(checked: boolean) {
    setForm(prev => ({
      ...prev,
      termsAgreed: checked,
      privacyAgreed: checked,
    }))
  }

  function handleChange(field: keyof FormData, value: string | boolean) {
    setForm(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!form.name.trim() || form.name.trim().length < 2) {
      setError('이름을 2자 이상 입력해 주세요.')
      return
    }
    if (!form.phone.trim() || !/^01[016789]-?\d{3,4}-?\d{4}$/.test(form.phone.trim())) {
      setError('올바른 휴대전화 번호를 입력해 주세요.')
      return
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError('올바른 이메일 주소를 입력해 주세요.')
      return
    }
    if (form.password.length < 8) {
      setError('비밀번호는 8자 이상 입력해 주세요.')
      return
    }
    if (form.password !== form.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }
    if (!form.termsAgreed || !form.privacyAgreed) {
      setError('필수 약관에 동의해 주세요.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          password: form.password,
          sms_agreed: form.smsAgreed,
          email_agreed: form.emailAgreed,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || '회원가입에 실패했습니다.')
        return
      }
      setSuccess(true)
    } catch {
      setError('요청을 처리할 수 없습니다. 잠시 후 다시 시도해 주세요.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="w-12 h-12 bg-[#0080C8]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-[#0080C8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">회원가입 완료</h2>
        <p className="text-sm text-gray-500 mb-6">서울이건치과 회원이 되신 것을 환영합니다.</p>
        <Link href="/" className="inline-block bg-[#0080C8] text-white font-semibold text-sm py-3 px-8 rounded-lg hover:bg-[#A08968] transition-colors">
          홈으로 이동
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-6">
      {/* 비밀번호 */}
      <fieldset className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            비밀번호 <span className="text-red-400">*</span>
          </label>
          <input
            type="password"
            value={form.password}
            onChange={e => handleChange('password', e.target.value)}
            placeholder="8자 이상 입력해 주세요"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0080C8] transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            비밀번호 확인 <span className="text-red-400">*</span>
          </label>
          <input
            type="password"
            value={form.passwordConfirm}
            onChange={e => handleChange('passwordConfirm', e.target.value)}
            placeholder="비밀번호를 한 번 더 입력해 주세요."
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0080C8] transition-colors"
          />
        </div>
      </fieldset>

      <hr className="border-gray-100" />

      {/* 이름 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          이름 <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={form.name}
          onChange={e => handleChange('name', e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0080C8] transition-colors"
        />
      </div>

      {/* 휴대전화 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          휴대전화 <span className="text-red-400">*</span>
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={e => handleChange('phone', e.target.value)}
          placeholder="ex)010-1234-5678"
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0080C8] transition-colors"
        />
      </div>

      {/* SMS 수신 동의 */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">
          SMS 수신 동의 <span className="text-red-400">*</span>
        </p>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="smsAgreed"
              checked={form.smsAgreed}
              onChange={() => handleChange('smsAgreed', true)}
              className="accent-[#0080C8]"
            />
            <span className="text-sm text-gray-700">Y</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="smsAgreed"
              checked={!form.smsAgreed}
              onChange={() => handleChange('smsAgreed', false)}
              className="accent-[#0080C8]"
            />
            <span className="text-sm text-gray-700">N</span>
          </label>
        </div>
        <p className="text-xs text-gray-400 mt-1.5">
          서울이건치과에서 제공하는 유익한 이벤트 소식을 SMS로 받으실 수 있습니다.
        </p>
      </div>

      {/* 이메일 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          이메일 <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          value={form.email}
          onChange={e => handleChange('email', e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0080C8] transition-colors"
        />
      </div>

      {/* 이메일 수신 동의 */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">
          이메일 수신 동의 <span className="text-red-400">*</span>
        </p>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="emailAgreed"
              checked={form.emailAgreed}
              onChange={() => handleChange('emailAgreed', true)}
              className="accent-[#0080C8]"
            />
            <span className="text-sm text-gray-700">수신함</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="emailAgreed"
              checked={!form.emailAgreed}
              onChange={() => handleChange('emailAgreed', false)}
              className="accent-[#0080C8]"
            />
            <span className="text-sm text-gray-700">수신안함</span>
          </label>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* 약관 동의 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <span className="text-sm font-medium text-gray-700">필수 · 선택 항목 전체 동의</span>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={allAgreed}
              onChange={e => handleAllAgree(e.target.checked)}
              className="w-4 h-4 accent-[#0080C8] rounded"
            />
            <span className="text-sm text-[#0080C8] font-medium">동의함</span>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            [필수] 이용약관 동의{' '}
            <button type="button" className="text-[#0080C8] underline text-xs">약관 보기</button>
          </span>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.termsAgreed}
              onChange={e => handleChange('termsAgreed', e.target.checked)}
              className="w-4 h-4 accent-[#0080C8] rounded"
            />
            <span className="text-sm text-gray-500">동의함</span>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            [필수] 개인정보 수집 및 이용에 동의하십니까?{' '}
            <button type="button" className="text-[#0080C8] underline text-xs">약관 보기</button>
          </span>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.privacyAgreed}
              onChange={e => handleChange('privacyAgreed', e.target.checked)}
              className="w-4 h-4 accent-[#0080C8] rounded"
            />
            <span className="text-sm text-gray-500">동의함</span>
          </label>
        </div>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <p className="text-sm text-red-500 bg-red-50 rounded-lg px-4 py-2.5">{error}</p>
      )}

      {/* 가입 버튼 */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gray-900 text-white font-semibold text-sm py-3.5 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? '처리 중...' : '가입하기'}
      </button>
    </form>
  )
}

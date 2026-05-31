'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Plus, Pencil, Trash2, X, Upload } from 'lucide-react'

interface Column {
  id: string
  title: string
  content: string | null
  image_url: string | null
  column_date: string
  category: string | null
  tags: string[] | null
  is_active: boolean
  created_at: string
}

interface FormData {
  title: string
  content: string
  column_date: string
  category: string
  tags: string
  is_active: boolean
  image_url: string
}

interface UploadedImage {
  url: string
  name: string
}

const CATEGORIES = ['자연치아살리기', '임플란트', '심미보철', '교정치료', '소아치과']

const emptyForm: FormData = {
  title: '',
  content: '',
  column_date: new Date().toISOString().split('T')[0],
  category: '',
  tags: '',
  is_active: true,
  image_url: '',
}

export default function ColumnsPage() {
  const [items, setItems] = useState<Column[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const fileRef = useRef<HTMLInputElement>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/columns?all=1')
      if (res.ok) setItems(await res.json())
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const openAddModal = () => {
    setEditingId(null)
    setForm(emptyForm)
    setUploadedImages([])
    setModalOpen(true)
  }

  const openEditModal = (item: Column) => {
    setEditingId(item.id)
    setForm({
      title: item.title,
      content: item.content || '',
      column_date: item.column_date,
      category: item.category || '',
      tags: item.tags?.join(', ') || '',
      is_active: item.is_active,
      image_url: item.image_url || '',
    })
    setUploadedImages([])
    setModalOpen(true)
  }

  const uploadImages = async (files: File[]) => {
    const imageFiles = files.filter((f) => f.type.startsWith('image/'))
    if (!imageFiles.length) return
    setUploading(true)
    try {
      const uploaded: UploadedImage[] = []
      for (const file of imageFiles) {
        const fd = new FormData()
        fd.append('file', file)
        fd.append('folder', 'columns')
        const res = await fetch('/api/upload', { method: 'POST', body: fd })
        if (res.ok) {
          const data = await res.json()
          uploaded.push({ url: data.url, name: file.name })
        }
      }
      setUploadedImages((prev) => [...prev, ...uploaded])
      if (uploaded[0]) setForm((p) => ({ ...p, image_url: p.image_url || uploaded[0].url }))
    } catch {
      // ignore
    } finally {
      setUploading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await uploadImages(Array.from(e.target.files || []))
    e.target.value = ''
  }

  const handleDrop = async (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setDragActive(false)
    await uploadImages(Array.from(e.dataTransfer.files || []))
  }

  const removeUploadedImage = (url: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.url !== url))
    setForm((prev) => ({
      ...prev,
      image_url: prev.image_url === url
        ? uploadedImages.find((img) => img.url !== url)?.url || ''
        : prev.image_url,
    }))
  }

  const parseTags = (raw: string): string[] =>
    raw.split(',').map((t) => t.trim()).filter(Boolean)

  const handleSave = async () => {
    if (!form.title.trim()) return
    setSaving(true)
    try {
      const payload = {
        ...form,
        tags: parseTags(form.tags),
        image_url: uploadedImages[0]?.url || form.image_url || null,
      }
      const url = editingId ? `/api/columns/${editingId}` : '/api/columns'
      const method = editingId ? 'PATCH' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setModalOpen(false)
        setUploadedImages([])
        fetchData()
      }
    } catch {
      // ignore
    } finally {
      setSaving(false)
    }
  }

  const toggleActive = async (id: string, current: boolean) => {
    const res = await fetch(`/api/columns/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !current }),
    })
    if (res.ok) setItems((prev) => prev.map((c) => c.id === id ? { ...c, is_active: !current } : c))
  }

  const handleDelete = async () => {
    if (!deleteId) return
    const res = await fetch(`/api/columns/${deleteId}`, { method: 'DELETE' })
    if (res.ok) {
      setItems((prev) => prev.filter((c) => c.id !== deleteId))
      setDeleteId(null)
    }
  }

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">원장칼럼</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-[#0080C8] text-white text-sm font-medium rounded-lg hover:bg-[#006aaa] transition-colors"
        >
          <Plus size={16} />
          칼럼 추가
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">불러오는 중...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-gray-400">등록된 칼럼이 없습니다.</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">이미지</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">제목</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">카테고리</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">날짜</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase">활성</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3">
                    {item.image_url ? (
                      <img src={item.image_url} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-300 text-xs">-</div>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{item.title}</p>
                    {item.tags && item.tags.length > 0 && (
                      <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[200px]">
                        {item.tags.map((t) => `#${t}`).join(' ')}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-3 hidden md:table-cell">
                    <span className="text-sm text-gray-500">{item.category || '–'}</span>
                  </td>
                  <td className="px-6 py-3 hidden md:table-cell">
                    <span className="text-sm text-gray-500">{formatDate(item.column_date)}</span>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => toggleActive(item.id, item.is_active)}
                      className={`inline-block w-8 h-4 rounded-full transition-colors relative ${item.is_active ? 'bg-green-400' : 'bg-gray-300'}`}
                    >
                      <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${item.is_active ? 'left-4' : 'left-0.5'}`} />
                    </button>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => openEditModal(item)} className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600" title="수정">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => setDeleteId(item.id)} className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500" title="삭제">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 추가/수정 모달 */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId ? '칼럼 수정' : '칼럼 추가'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* 제목 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">제목 *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0080C8]"
                  placeholder="칼럼 제목"
                />
              </div>

              {/* 카테고리 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0080C8] bg-white"
                >
                  <option value="">선택 안 함</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* 태그 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">태그</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))}
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0080C8]"
                  placeholder="앞니임플란트, 신경치료, 크라운 (쉼표로 구분)"
                />
              </div>

              {/* 내용 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                  rows={5}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0080C8] resize-none"
                  placeholder="칼럼 내용을 입력하세요"
                />
              </div>

              {/* 이미지 업로드 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">대표 이미지</label>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  onDragEnter={(e) => { e.preventDefault(); setDragActive(true) }}
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
                  onDragLeave={(e) => { e.preventDefault(); setDragActive(false) }}
                  onDrop={handleDrop}
                  disabled={uploading}
                  className={[
                    'w-full min-h-28 rounded-lg border-2 border-dashed px-4 py-5 text-center transition-colors flex flex-col items-center justify-center',
                    dragActive ? 'border-[#0080C8] bg-[#0080C8]/5 text-[#0080C8]' : 'border-gray-300 text-gray-400 hover:border-[#0080C8] hover:text-[#0080C8]',
                    uploading ? 'cursor-wait opacity-70' : '',
                  ].join(' ')}
                >
                  <Upload size={22} />
                  <span className="mt-2 text-sm font-medium">
                    {uploading ? '업로드 중...' : '이미지를 끌어다 놓거나 클릭해서 선택'}
                  </span>
                </button>

                {uploadedImages.length > 0 ? (
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {uploadedImages.map((img, i) => (
                      <div key={img.url} className="relative overflow-hidden rounded-lg border border-gray-200">
                        <img src={img.url} alt={`이미지 ${i + 1}`} className="h-28 w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeUploadedImage(img.url)}
                          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : form.image_url ? (
                  <div className="relative mt-3 h-40 w-full overflow-hidden rounded-lg bg-gray-100">
                    <img src={form.image_url} alt="미리보기" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, image_url: '' }))}
                      className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : null}

                <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </div>

              {/* 날짜 + 활성화 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">작성 날짜</label>
                  <input
                    type="date"
                    value={form.column_date}
                    onChange={(e) => setForm((p) => ({ ...p, column_date: e.target.value }))}
                    className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0080C8]"
                  />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_active}
                      onChange={(e) => setForm((p) => ({ ...p, is_active: e.target.checked }))}
                      className="w-4 h-4 accent-[#0080C8]"
                    />
                    <span className="text-sm text-gray-700">활성화</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end p-6 border-t border-gray-200">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                취소
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.title.trim()}
                className="px-4 py-2 text-sm bg-[#0080C8] text-white rounded-lg hover:bg-[#006aaa] disabled:opacity-60 transition-colors"
              >
                {saving ? '저장 중...' : editingId ? '수정' : '추가'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 삭제 확인 */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">칼럼 삭제</h3>
            <p className="text-sm text-gray-500 mb-6">이 칼럼을 삭제하시겠습니까? 삭제된 데이터는 복구할 수 없습니다.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">취소</button>
              <button onClick={handleDelete} className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600">삭제</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Plus, Pencil, Trash2, X, Upload } from 'lucide-react'

const HTML_TEMPLATE = `<h1 style="font-size:26px; font-weight:700; color:#1a2b3c; border-bottom:2px solid #1a2b3c; padding-bottom:15px; margin-bottom:30px; line-height:1.4;">
  [메인 제목]<br>
  <span style="font-size:0.7em; font-weight:400; color:#555;">[부제목]</span>
</h1>

<p>안녕하세요. 서울이건치과 원장입니다.</p>

<p>
  [환자분들이 자주 하시는 말씀이 있습니다.]<br>
  <strong>"[환자가 자주 묻는 질문 또는 흔한 오해]"</strong>
</p>

<p>
  [도입 연결 문장],
  <span style="font-weight:700; color:#d35400; background:rgba(211,84,0,0.1); padding:0 4px;">[핵심 결론 문장]</span>
  [이유 보충 설명.]
</p>

<h2 style="font-size:22px; font-weight:700; color:#2c3e50; border-left:5px solid #d35400; padding-left:15px; margin-top:50px; margin-bottom:15px;">
  1. [소단원 제목]
</h2>

<p>[소단원 도입 설명.]</p>

<div style="background:#eeeeee; border-radius:8px; text-align:center; margin-bottom:20px; overflow:hidden;">
  <img src="[이미지URL]" style="max-width:100%; display:block; margin:0 auto;" alt="[이미지 설명]">
</div>
<p style="font-size:14px; color:#666; text-align:center; margin-top:-15px;">▲ [이미지 캡션]</p>

<p>[본문 설명 문장.]</p>

<h2 style="font-size:22px; font-weight:700; color:#2c3e50; border-left:5px solid #d35400; padding-left:15px; margin-top:50px; margin-bottom:15px;">
  2. [소단원 제목]
</h2>

<p>[소단원 도입 설명.]</p>

<div style="background:#f4f7fa; border:1px solid #e1e8ed; border-radius:10px; padding:20px; margin-bottom:20px;">
  <strong>✅ [박스 소제목]</strong><br><br>
  1. [포인트 1]<br>
  2. [포인트 2]<br>
  3. [포인트 3]
</div>

<div style="padding:30px 0 0;">
  <p style="font-size:18px; font-weight:700; color:#1a2b3c; margin-bottom:15px;">
    [마무리 핵심 메시지]
  </p>
  <p>
    [마무리 문장. <strong>[행동 강조]</strong> 하는 것이 원칙입니다.]<br>
    [자연 치아를 보호하기 위해 미루지 말고 검진받아보시길 권해드립니다.]
  </p>
</div>`

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

const CATEGORIES = ['자연치아살리기', '임플란트', '심미보철', '교정치료', '소아치과', '일반진료']

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
  const [editorTab, setEditorTab] = useState<'edit' | 'preview'>('edit')
  const [insertingImg, setInsertingImg] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const contentImgRef = useRef<HTMLInputElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)

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

  // 모달 열릴 때 에디터에 기존 내용 세팅
  useEffect(() => {
    if (modalOpen && editorRef.current) {
      editorRef.current.innerHTML = form.content
    }
  }, [modalOpen])

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

  const insertImageAtPos = async (file: File, x?: number, y?: number) => {
    if (!file.type.startsWith('image/')) return
    setInsertingImg(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', 'columns')
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      if (!res.ok) return
      const { url } = await res.json()

      // img-box + caption 요소 생성
      const wrapper = document.createElement('div')
      wrapper.className = 'img-box'
      const img = document.createElement('img')
      img.src = url
      img.alt = ''
      wrapper.appendChild(img)
      const caption = document.createElement('p')
      caption.className = 'img-caption'
      caption.textContent = '▲ 캡션을 입력하세요'

      const editor = editorRef.current
      if (!editor) return

      // 드롭 위치에 삽입
      if (x !== undefined && y !== undefined) {
        const range = (document as any).caretRangeFromPoint?.(x, y)
          ?? (document as any).caretPositionFromPoint?.(x, y)
        if (range) {
          const sel = window.getSelection()
          sel?.removeAllRanges()
          sel?.addRange(range)
          range.collapse(true)
          range.insertNode(caption)
          range.insertNode(wrapper)
        } else {
          editor.appendChild(wrapper)
          editor.appendChild(caption)
        }
      } else {
        editor.appendChild(wrapper)
        editor.appendChild(caption)
      }
      editor.focus()
    } finally {
      setInsertingImg(false)
    }
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
    // 에디터의 최신 HTML 읽기
    const latestContent = editorRef.current?.innerHTML ?? form.content
    try {
      const payload = {
        ...form,
        content: latestContent,
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
                    <a href={`/column/${item.id}`} target="_blank" rel="noopener noreferrer"
                      className="text-sm font-medium text-gray-900 truncate max-w-[200px] hover:text-[#0080C8] transition-colors block">
                      {item.title}
                    </a>
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

      {/* 추가/수정 모달 — 전체화면 */}
      {modalOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId ? '칼럼 수정' : '칼럼 추가'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 max-w-4xl mx-auto w-full space-y-4">
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
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">내용</label>
                  <div className="flex items-center gap-2">
                    <div className="flex rounded-lg border border-gray-200 overflow-hidden text-xs">
                      <button
                        type="button"
                        onClick={() => setEditorTab('edit')}
                        className={`px-3 py-1 transition-colors ${editorTab === 'edit' ? 'bg-[#0080C8] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                      >편집</button>
                      <button
                        type="button"
                        onClick={() => {
                          if (editorRef.current) {
                            setForm(p => ({ ...p, content: editorRef.current!.innerHTML }))
                          }
                          setEditorTab('preview')
                        }}
                        className={`px-3 py-1 transition-colors ${editorTab === 'preview' ? 'bg-[#0080C8] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                      >미리보기</button>
                    </div>
                  </div>
                </div>
                {editorTab === 'edit' ? (
                  <div>
                    <div
                      ref={editorRef}
                      contentEditable
                      suppressContentEditableWarning
                      className="post-wrap w-full min-h-[400px] px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0080C8] overflow-auto bg-white cursor-text"
                      style={{ whiteSpace: 'pre-wrap' }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={async (e) => {
                        e.preventDefault()
                        const file = e.dataTransfer.files?.[0]
                        if (file?.type.startsWith('image/')) {
                          await insertImageAtPos(file, e.clientX, e.clientY)
                        }
                        // 텍스트 드래그는 브라우저가 자동 처리
                      }}
                    />
                    <div className="flex items-center gap-2 mt-1.5">
                      <button
                        type="button"
                        onClick={() => contentImgRef.current?.click()}
                        disabled={insertingImg}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:border-[#0080C8] hover:text-[#0080C8] transition-colors disabled:opacity-50"
                      >
                        <Upload size={12} />
                        {insertingImg ? '업로드 중...' : '이미지 버튼으로 삽입'}
                      </button>
                      <span className="text-xs text-gray-400">이미지를 에디터 안에 드래그하거나 붙여넣기(Ctrl+V) 가능</span>
                    </div>
                    <input
                      ref={contentImgRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (file) await insertImageAtPos(file)
                        e.target.value = ''
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className="w-full min-h-[300px] px-4 py-3 rounded-lg border border-gray-300 overflow-auto bg-white post-wrap"
                    dangerouslySetInnerHTML={{ __html: form.content || '<p class="text-gray-400">내용이 없습니다.</p>' }}
                  />
                )}
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

          </div>

          {/* 하단 버튼 바 — 전체화면 고정 */}
          <div className="flex gap-3 justify-end px-6 py-4 border-t border-gray-200 bg-white shrink-0">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
              취소
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !form.title.trim()}
              className="px-6 py-2 text-sm bg-[#0080C8] text-white rounded-lg hover:bg-[#006aaa] disabled:opacity-60 transition-colors font-semibold"
            >
              {saving ? '저장 중...' : editingId ? '수정' : '추가'}
            </button>
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

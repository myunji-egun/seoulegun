import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { hasSupabaseConfig } from '@/lib/supabase/config'

// GET: 활성 공지 목록 (공개)
export async function GET() {
  try {
    if (!hasSupabaseConfig()) {
      return NextResponse.json([])
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from('notices')
      .select('*')
      .eq('is_active', true)
      .order('notice_date', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: '요청을 처리할 수 없습니다.' },
      { status: 500 },
    )
  }
}

// POST: 공지 추가 (인증 필요)
export async function POST(request: NextRequest) {
  try {
    if (!hasSupabaseConfig()) {
      return NextResponse.json(
        { error: 'Supabase 환경변수가 설정되지 않았습니다.' },
        { status: 503 },
      )
    }

    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const supabase = await createClient()
    const body = await request.json()
    const { title, content, image_url, notice_date, is_active } = body

    if (!title || typeof title !== 'string' || !title.trim()) {
      return NextResponse.json({ error: '제목을 입력해주세요.' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('notices')
      .insert({
        title: title.trim(),
        content: content?.trim() || null,
        image_url: image_url || null,
        notice_date: notice_date || new Date().toISOString().split('T')[0],
        is_active: is_active !== undefined ? is_active : true,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: '요청을 처리할 수 없습니다.' },
      { status: 500 },
    )
  }
}

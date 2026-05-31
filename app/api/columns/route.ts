import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { hasSupabaseConfig } from '@/lib/supabase/config'
import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'

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

const localPath = path.join(process.cwd(), 'data', 'local-columns.json')

async function readLocal(): Promise<Column[]> {
  try {
    return JSON.parse(await readFile(localPath, 'utf8')) as Column[]
  } catch {
    return []
  }
}

async function writeLocal(columns: Column[]) {
  await mkdir(path.dirname(localPath), { recursive: true })
  await writeFile(localPath, JSON.stringify(columns, null, 2), 'utf8')
}

export async function GET(request: NextRequest) {
  try {
    const includeAll = request.nextUrl.searchParams.get('all') === '1'

    if (!hasSupabaseConfig()) {
      const local = await readLocal()
      return NextResponse.json(includeAll ? local : local.filter((c) => c.is_active))
    }

    const supabase = await createClient()
    const query = supabase
      .from('columns')
      .select('*')
      .order('column_date', { ascending: false })

    if (!includeAll) {
      query.eq('is_active', true)
    }

    const { data, error } = await query
    if (error) {
      return NextResponse.json({ error: '처리 중 오류가 발생했습니다.' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: '요청을 처리할 수 없습니다.' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const body = await request.json()
    const { title, content, image_url, column_date, category, tags, is_active } = body

    if (!title || typeof title !== 'string' || !title.trim()) {
      return NextResponse.json({ error: '제목을 입력해주세요.' }, { status: 400 })
    }

    if (!hasSupabaseConfig()) {
      const columns = await readLocal()
      const now = new Date().toISOString()
      const column: Column = {
        id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        title: title.trim(),
        content: content?.trim() || null,
        image_url: image_url || null,
        column_date: column_date || now.split('T')[0],
        category: category || null,
        tags: tags || null,
        is_active: is_active !== undefined ? is_active : true,
        created_at: now,
      }
      const next = [column, ...columns].sort((a, b) => b.column_date.localeCompare(a.column_date))
      await writeLocal(next)
      return NextResponse.json(column, { status: 201 })
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('columns')
      .insert({
        title: title.trim(),
        content: content?.trim() || null,
        image_url: image_url || null,
        column_date: column_date || new Date().toISOString().split('T')[0],
        category: category || null,
        tags: tags || null,
        is_active: is_active !== undefined ? is_active : true,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: '처리 중 오류가 발생했습니다.' }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch {
    return NextResponse.json({ error: '요청을 처리할 수 없습니다.' }, { status: 500 })
  }
}

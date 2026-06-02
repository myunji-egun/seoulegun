import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/server'
import Link from 'next/link'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ColumnDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = createAdminClient()

  const { data: post } = await supabase
    .from('columns')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (!post) notFound()

  const formattedDate = new Date(post.column_date).toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <main className="min-h-screen bg-white pt-20 sm:pt-24">
      {/* 상단 네비 */}
      <div className="max-w-[860px] mx-auto px-5 pt-4 pb-4">
        <Link href="/column" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#0080C8] transition-colors">
          ← 원장칼럼 목록
        </Link>
      </div>

      {/* 대표 이미지 */}
      {post.image_url && (
        <div className="max-w-[860px] mx-auto px-5 mb-6">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full rounded-xl object-cover max-h-[420px]"
          />
        </div>
      )}

      {/* 메타 정보 */}
      <div className="max-w-[860px] mx-auto px-5 mb-2">
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
          {post.category && (
            <span className="bg-[#0080C8]/10 text-[#0080C8] text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {post.category}
            </span>
          )}
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* 본문 HTML 렌더링 */}
      <article className="max-w-[860px] mx-auto px-5 pb-20">
        {post.content ? (
          <div
            className="post-wrap"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <p className="text-gray-400 py-12 text-center">내용이 없습니다.</p>
        )}

        {/* 태그 */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-500">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </main>
  )
}

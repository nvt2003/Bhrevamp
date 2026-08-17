import Link from 'next/link'
import Image from 'next/image'
import { formatRelativeTime } from '@/utilities/formatTime'

export default function HiburanSection({ data }: { data: any }) {
  if (!data) return null

  const { title = 'Hiburan', featuredPosts = [], subPosts = [] } = data

  return (
    <section className="my-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-4">
        <h2 className="text-2xl font-bold border-b-2 border-red-600 -mb-2 pb-2 inline-block">
          {title}
        </h2>
        <Link href="/hiburan" className="text-sm font-semibold flex items-center hover:underline">
          Lagi Hiburan <span className="ml-1 text-red-600 font-bold">&gt;</span>
        </Link>
      </div>

      {/* Hàng Trên: 2 Bài Nổi Bật Chính */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {featuredPosts.map((post: any) => {
          if (typeof post !== 'object') return null
          return (
            <div key={post.id} className="flex flex-col">
              <Link href={`/posts/${post.slug}`} className="group block">
                <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden mb-3">
                  {post.featuredImage?.url && (
                    <Image
                      src={post.featuredImage.url}
                      alt={post.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 639px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="text-xs text-red-600 font-bold uppercase mb-1 flex items-center gap-2">
                  {post.category?.title || 'NASIONAL'}
                  <span className="text-gray-400 font-normal lowercase">
                    {formatRelativeTime(post.publishedAt)}
                  </span>
                </div>
                <h3 className="text-lg font-bold line-clamp-2 group-hover:text-red-600 leading-snug">
                  {post.title}
                </h3>
              </Link>
            </div>
          )
        })}
      </div>

      {/* Hàng Dưới: 4 Bài Nhỏ Grid 2x2 */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {subPosts.map((post: any) => {
          if (typeof post !== 'object') return null
          return (
            <div key={post.id} className="border-b border-gray-100 dark:border-gray-800 pb-3">
              <Link
                href={`/posts/${post.slug}`}
                className="group flex gap-3 items-start justify-between"
              >
                <div className="flex-1">
                  <h4 className="text-sm font-bold line-clamp-3 group-hover:text-red-600 leading-snug mb-1">
                    {post.title}
                  </h4>
                  <span className="text-xs text-gray-400">
                    {formatRelativeTime(post.publishedAt)}
                  </span>
                </div>
                <div className="relative w-28 aspect-[16/10] shrink-0 bg-slate-100 overflow-hidden">
                  {post.featuredImage?.url && (
                    <Image
                      src={post.featuredImage.url}
                      alt={post.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 639px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}

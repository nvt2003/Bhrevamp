import Link from 'next/link'
import Image from 'next/image'
import { formatRelativeTime } from '@/utilities/formatTime'
import { getPostUrl } from '@/lib/routing/getPostUrl'

export default function GayaHidupSection({ data }: { data: any }) {
  if (!data) return null

  const { title = 'Gaya Hidup', featuredPost, subPosts = [] } = data

  return (
    <section className="my-8 max-w-md mx-auto lg:max-w-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-4">
        <h2 className="text-2xl font-bold border-b-2 border-red-600 -mb-2 pb-2 inline-block">
          {title}
        </h2>
        <Link
          href="/gaya-hidup"
          className="text-sm font-semibold text-gray-900 dark:text-white hover:text-red-600 flex items-center transition-colors"
        >
          Lagi Gaya Hidup <span className="ml-1 text-red-600 font-bold">&gt;</span>
        </Link>
      </div>

      {/* Bài Nổi Bật Phía Trên (Ảnh Lớn) */}
      {featuredPost && typeof featuredPost === 'object' && (
        <div className="mb-6">
          <Link href={getPostUrl(featuredPost)} className="group block">
            <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden mb-3">
              {featuredPost.featuredImage?.url && (
                <Image
                  src={featuredPost.featuredImage.url}
                  alt={featuredPost.title}
                  fill
                  loading="lazy"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>
            <div className="text-xs text-red-600 font-bold uppercase mb-1 flex items-center gap-2">
              {featuredPost.category?.title || 'RIAS'}
              <span className="text-gray-400 font-normal lowercase">
                {formatRelativeTime(featuredPost.publishedAt)}
              </span>
            </div>
            <h3 className="text-lg font-bold line-clamp-2 group-hover:text-red-600 leading-snug">
              {featuredPost.title}
            </h3>
          </Link>
        </div>
      )}

      {/* 4 Bài Nhỏ Phía Dưới (Danh sách xếp dọc) */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-2 flex flex-col divide-y divide-gray-200">
        {subPosts.map((post: any) => {
          if (typeof post !== 'object') return null
          return (
            <div key={post.id} className="py-3 dark:border-t dark:border-gray-800">
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
                <div className="relative w-24 aspect-[16/10] shrink-0 bg-slate-100 overflow-hidden">
                  {post.featuredImage?.url && (
                    <Image
                      src={post.featuredImage.url}
                      alt={post.title}
                      fill
                      loading="lazy"
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

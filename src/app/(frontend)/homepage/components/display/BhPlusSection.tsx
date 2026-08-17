import Link from 'next/link'
import Image from 'next/image'
import { formatRelativeTime } from '@/utilities/formatTime'

export default function BhPlusSection({ data }: { data: any }) {
  if (!data) return null

  const { title = 'BH Plus', featuredPosts = [], subPosts = [] } = data

  return (
    <section className="my-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-4">
        <h2 className="text-2xl font-bold border-b-2 border-red-600 -mb-2 pb-2 inline-block">
          {title}
        </h2>
        <Link href="/bh-plus" className="text-sm font-semibold flex items-center hover:underline">
          BH Plus <span className="ml-1 text-red-600 font-bold">&gt;</span>
        </Link>
      </div>
      {/* ================= MOBILE ================= */}
      <div className="md:hidden">
        {[0, 1].map((featuredIndex) => {
          const featuredPost = featuredPosts[featuredIndex]
          const startSubIndex = featuredIndex * 2
          const currentSubPosts = subPosts.slice(startSubIndex, startSubIndex + 2)

          if (typeof featuredPost !== 'object') return null

          return (
            <div key={featuredPost.id} className="mb-8">
              {/* Bài nổi bật */}
              <Link href={`/posts/${featuredPost.slug}`} className="group block">
                <div className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden mb-3">
                  {featuredPost.featuredImage?.url && (
                    <Image
                      src={featuredPost.featuredImage.url}
                      alt={featuredPost.title}
                      fill
                      loading="lazy"
                      sizes="100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>

                <div className="text-xs text-red-600 font-bold uppercase mb-1 flex items-center gap-2">
                  {featuredPost.category?.title || 'NASIONAL'}

                  <span className="text-gray-400 font-normal lowercase">
                    {formatRelativeTime(featuredPost.publishedAt)}
                  </span>
                </div>

                <h3 className="text-lg font-bold line-clamp-2 group-hover:text-red-600 leading-snug">
                  {featuredPost.title}
                </h3>
              </Link>

              {/* 2 bài nhỏ đi cùng bài nổi bật */}
              <div className="mt-4 border-t border-gray-200 dark:border-gray-800">
                {currentSubPosts.map((post: any) => {
                  if (typeof post !== 'object') return null

                  return (
                    <div
                      key={post.id}
                      className="border-b border-gray-100 dark:border-gray-800 py-3"
                    >
                      <Link href={`/posts/${post.slug}`} className="group flex gap-3 items-start">
                        <div className="flex-1 min-w-0">
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
                              sizes="112px"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          )}
                        </div>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block">
        {/* Hàng Trên: 2 Bài Nổi Bật Chính */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
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
                        sizes="(max-width: 639px) 50vw, 25vw"
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
              <div key={post.id} className="border-b border-gray-100  dark:border-gray-800 pb-3">
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
                        sizes="(max-width: 639px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

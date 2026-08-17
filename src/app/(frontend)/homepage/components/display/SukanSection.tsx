import Link from 'next/link'
import Image from 'next/image'
import { formatRelativeTime } from '@/utilities/formatTime'

export default function SukanSection({ data }: { data: any }) {
  if (!data) return null

  const { title = 'Sukan', featuredPosts = [], sidePosts = [] } = data

  return (
    <section className="my-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-4">
        <h2 className="text-2xl font-bold border-b-2 border-red-600 -mb-2 pb-2 inline-block">
          {title}
        </h2>
        <Link href="/sukan" className="text-sm font-semibold flex items-center hover:underline">
          Lagi Sukan <span className="ml-1 text-red-600 font-bold">&gt;</span>
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cột Trái & Giữa: 2 Bài Ảnh Lớn (8/12 cột) */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        className=" object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="text-xs text-red-600 font-bold uppercase mb-1 flex items-center gap-2">
                    {post.category?.title || 'SUKAN'}
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

        {/* Cột Phải: 4 Bài Dọc thumbnail nhỏ (4/12 cột) */}
        <div className="lg:col-span-4 flex flex-col divide-y divide-gray-200">
          {sidePosts.map((post: any, idx: number) => {
            if (typeof post !== 'object') return null
            return (
              <div
                key={post.id}
                className={`dark:border-t border-gray-200 dark:border-gray-800 py-3 ${idx === 0 ? 'pt-0' : ''}`}
              >
                <Link href={`/posts/${post.slug}`} className="group flex gap-3 items-start">
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
      </div>
    </section>
  )
}

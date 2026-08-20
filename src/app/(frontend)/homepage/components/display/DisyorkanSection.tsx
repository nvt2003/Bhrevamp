import Link from 'next/link'
import Image from 'next/image'
import { formatRelativeTime } from '@/utilities/formatTime'
import { getPostUrl } from '@/lib/routing/getPostUrl'

export default function DisyorkanSection({ data }: { data: any }) {
  if (!data) return null

  const { title = 'Disyorkan', mainPost, subPosts = [] } = data

  return (
    <section className="my-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-4">
        <h2 className="text-2xl font-bold -mb-2 pb-2 inline-block">
          {title}

          <div className="w-10 h-1 bg-rose-600 mt-1 rounded"></div>
        </h2>
        <Link href="/disyorkan" className="text-sm font-semibold flex items-center hover:underline">
          Lagi Disyorkan <span className="ml-1 text-red-600 font-bold">&gt;</span>
        </Link>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
        {/* Bên trái: 1 Bài chính to */}
        {mainPost && typeof mainPost === 'object' && (
          <div className="lg:col-span-5 flex flex-col">
            <Link href={getPostUrl(mainPost)} className="group block flex-1">
              <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden mb-3">
                {mainPost.featuredImage?.url && (
                  <Image
                    src={mainPost.featuredImage.url}
                    alt={mainPost.title}
                    fill
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <h3 className="text-xl font-bold line-clamp-2 group-hover:text-red-600 leading-snug">
                {mainPost.title}
              </h3>
            </Link>
          </div>
        )}

        {/* Bên phải: Grid 2 hàng 3 cột (6 bài nhỏ) */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8">
          {subPosts.map((post: any) => {
            if (typeof post !== 'object') return null
            return (
              <div key={post.id} className="flex flex-col">
                <Link href={getPostUrl(post)} className="group block">
                  <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden mb-2">
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
                  <div className="text-xs text-red-600 font-semibold mb-1">
                    {post.category?.title || 'Kes'}{' '}
                    <span className="text-gray-400 font-normal">
                      {formatRelativeTime(post.publishedAt)}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold line-clamp-3 group-hover:text-red-600 leading-snug">
                    {post.title}
                  </h4>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

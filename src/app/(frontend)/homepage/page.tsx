import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  // 1. Lấy bài viết nổi bật chính (Featured Main)
  const featuredPosts = await payload.find({
    collection: 'posts',
    where: {
      isFeatured: { equals: true },
    },
    limit: 1,
  })
  const mainFeatured = featuredPosts.docs[0]

  // 2. Lấy danh sách tin mới nhất (bỏ qua bài nổi bật chính nếu cần)
  const latestPosts = await payload.find({
    collection: 'posts',
    sort: '-publishedAt', // Sắp xếp mới nhất lên đầu
    limit: 6,
  })

  // 3. Lấy danh sách chuyên mục
  const categories = await payload.find({
    collection: 'categories',
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* HEADER BÁO CHÍ */}
      <header className="border-b-2 border-black pb-4 mb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold uppercase tracking-wider">
          Tin Tức Hằng Ngày
        </h1>
        <p className="text-sm text-gray-500 mt-2 font-mono">
          {new Date().toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </header>

      {/* BỐ CỤC BÁO CHÍ (NEWS GRID) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* CỘT TRÁI + GIỮA: Bài Viết Nổi Bật Chính (8 Cột) */}
        <section className="lg:col-span-8 border-r-0 lg:border-r border-gray-200 lg:pr-8">
          {mainFeatured ? (
            <article className="group cursor-pointer">
              {/* Ảnh đại diện */}
              {typeof mainFeatured.featuredImage === 'object' &&
                mainFeatured.featuredImage?.url && (
                  <div className="aspect-video w-full overflow-hidden bg-gray-100 mb-4">
                    <img
                      src={mainFeatured.featuredImage.url}
                      alt={mainFeatured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                )}

              <span className="inline-block bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase tracking-wider mb-2">
                Nổi Bật
              </span>

              <Link href={`/posts/${mainFeatured.slug}`}>
                <h2 className="text-2xl md:text-4xl font-serif font-bold text-gray-900 group-hover:text-red-600 leading-tight mb-3">
                  {mainFeatured.title}
                </h2>
              </Link>

              <p className="text-gray-600 text-base leading-relaxed line-clamp-3 mb-4">
                {mainFeatured.excerpt}
              </p>
            </article>
          ) : (
            <p className="text-gray-500 italic">Chưa có bài viết nổi bật nào.</p>
          )}

          {/* Dòng kẻ phân cách */}
          <hr className="my-8 border-gray-200" />

          {/* Lưới 2 Cột Dưới Bài Nổi Bật */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestPosts.docs.slice(1, 5).map((post) => (
              <article key={post.id} className="border-b pb-4 md:border-b-0">
                <span className="text-xs font-bold text-red-600 uppercase">
                  {typeof post.category === 'object' ? post.category.name : ''}
                </span>
                <Link href={`/posts/${post.slug}`}>
                  <h3 className="text-lg font-serif font-bold mt-1 hover:text-red-600 line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </section>

        {/* CỘT PHẢI: Tin Mới / Tin Nhanh (4 Cột) */}
        <aside className="lg:col-span-4">
          <h2 className="text-xl font-serif font-bold border-b-2 border-red-600 pb-1 mb-4 uppercase">
            Tin Mới Nhất
          </h2>

          <div className="divide-y divide-gray-200">
            {latestPosts.docs.map((post) => (
              <article key={post.id} className="py-3 first:pt-0">
                <Link href={`/posts/${post.slug}`} className="group">
                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-red-600 leading-snug">
                    {post.title}
                  </h3>
                  <span className="text-xs text-gray-400 mt-1 block">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleTimeString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'Mới'}
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}

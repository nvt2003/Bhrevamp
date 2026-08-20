'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatRelativeTime } from '@/utilities/formatTime'
import { getPostUrl } from '@/lib/routing/getPostUrl'

export default function SihatSection({ data }: { data: any }) {
  if (!data) return null

  const {
    title = 'Sihat',
    moreLink = '/sihat',
    moreText = 'Lagi Sihat',
    featuredPost,
    subPosts = [],
  } = data

  const featuredImgUrl =
    typeof featuredPost?.featuredImage === 'object' ? featuredPost?.featuredImage?.url : null

  return (
    <section className="my-8 max-w-md mx-auto lg:max-w-none">
      {/* 1. Header */}
      <div className="flex items-center justify-between pb-2 mb-4">
        <h2 className="text-2xl font-bold border-b-2 border-red-600 -mb-2 pb-2 inline-block text-gray-900  dark:text-white">
          {title}
        </h2>
        <Link
          href={moreLink}
          className="text-sm font-semibold text-gray-900 dark:text-white hover:text-red-600 flex items-center transition-colors"
        >
          {moreText} <span className="ml-1 text-red-600 font-bold">&gt;</span>
        </Link>
      </div>

      {/* 2. Bài viết chính (Featured Post) */}
      {featuredPost && (
        <div className="mb-6">
          <Link href={getPostUrl(featuredPost)} className="block">
            {/* Ảnh lớn bài chính */}
            <div className="relative w-full aspect-[16/10] rounded overflow-hidden bg-slate-900 mb-2.5">
              {featuredImgUrl && (
                <Image
                  src={featuredImgUrl}
                  alt={featuredPost.title || title}
                  fill
                  sizes="(max-width: 639px) 50vw, 33vw"
                  loading="lazy"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>

            {/* Tag Danh mục & Thời gian */}
            <div className="flex items-center gap-2 text-xs mb-1">
              {featuredPost.category && (
                <span className="text-red-600 font-semibold">{featuredPost.category.title}</span>
              )}
              {featuredPost.publishedAt && (
                <span className="text-gray-400 font-normal">
                  {formatRelativeTime(featuredPost.publishedAt)}
                </span>
              )}
            </div>

            {/* Tiêu đề bài chính */}
            <h3 className="text-lg font-bold text-gray-900  dark:text-white leading-snug group-hover:underline line-clamp-2">
              {featuredPost.title}
            </h3>
          </Link>
        </div>
      )}

      {/* 3. Danh sách các bài phụ nằm ngang phía dưới (Sub-posts) */}
      <div className="divide-y divide-gray-200 border-t border-gray-200 dark:border-gray-800">
        {subPosts.map((post: any, index: number) => {
          if (typeof post !== 'object') return null
          const imgUrl = typeof post.featuredImage === 'object' ? post.featuredImage?.url : null

          return (
            <article key={post.id || index} className="py-3 group">
              <Link href={getPostUrl(post)} className="flex items-start justify-between gap-3">
                {/* Thông tin bài viết bên trái */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-gray-900 leading-snug group-hover:underline line-clamp-2 mb-1.5">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-400 font-normal">{post.publishedAt}</p>
                </div>

                {/* Thumbnail nhỏ bên phải */}
                {imgUrl && (
                  <div className="relative w-24 h-16 flex-shrink-0 rounded overflow-hidden bg-slate-900">
                    <Image
                      src={imgUrl}
                      alt={post.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 639px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
              </Link>
            </article>
          )
        })}
      </div>
    </section>
  )
}

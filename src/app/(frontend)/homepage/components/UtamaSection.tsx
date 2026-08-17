'use client'
import React from 'react'
import { formatRelativeTime } from '@/utilities/formatTime'
import AdSlot from '../../components/AdSlot'
export default function UtamaSection({ data, adsData }: { data: any; adsData?: any }) {
  if (!data) return null
  const { featuredMain, featuredSide, featuredBullet, gridPosts, title } = data

  return (
    <section className="max-w-6xl mx-auto p-4 font-sans text-gray-900">
      {/* Header */}
      <div className="mb-6">
        <div className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {title || 'Utama'}
        </div>
        <div className="w-10 h-1 bg-rose-600 mt-1"></div>
      </div>

      {/* =========================================================
      MOBILE
  ========================================================= */}
      <div className="block md:hidden">
        {/* Featured Main */}
        {featuredMain && (
          <div className="relative">
            <div className="mb-4 aspect-[16/9] overflow-hidden rounded shadow-sm">
              <img
                src={featuredMain.featuredImage?.url}
                alt={featuredMain.featuredImage?.alt || featuredMain.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-16">
              <div className="mb-2 flex items-center gap-2 text-sm">
                <span className="font-bold text-[#D81B50]">{featuredMain.category?.name}</span>

                <span className="text-xs text-gray-200">
                  {formatRelativeTime(featuredMain.publishedAt)}
                </span>
              </div>

              <h1 className="mb-2 text-xl font-bold leading-tight text-white">
                {featuredMain.title}
              </h1>

              <p className="line-clamp-2 text-sm text-gray-200">{featuredMain.summary}</p>
            </div>
          </div>
        )}
        <AdSlot mobileAd={adsData} />
        {gridPosts && gridPosts.length > 0 && (
          <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-800">
            <div className="grid grid-cols-1 gap-x-4 gap-y-6">
              {gridPosts.slice(0, 5).map((item: any) => (
                <div key={item.id} className="min-w-0">
                  <img
                    src={item.featuredImage?.url}
                    alt={item.featuredImage?.alt || item.title}
                    className="aspect-[5/3] w-full object-cover"
                    loading="lazy"
                  />

                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <div className="font-bold uppercase tracking-wide text-[#D81B50]">
                      {item.category?.name}
                    </div>

                    <div className="text-gray-400">{formatRelativeTime(item.publishedAt)}</div>
                  </div>

                  <p className="mt-1 text-sm font-semibold leading-snug text-gray-800 dark:text-white">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* =========================================================
      DESKTOP
  ========================================================= */}

      <div className="hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column: Side News Grid (4 items) */}
          <div className="md:col-span-4 grid grid-cols-1 gap-4">
            {featuredSide?.map((item: any) => (
              <div
                key={item.id}
                className="relative group overflow-hidden rounded shadow-sm aspect-[16/9]"
              >
                <img
                  src={item.featuredImage?.url}
                  alt={item.featuredImage?.alt || item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 flex flex-col justify-end">
                  <div className="flex items-center gap-2 text-xs mb-1">
                    <span className="text-[#D81B50] font-bold uppercase tracking-wide">
                      {item.category?.name}
                    </span>
                    <span className="text-gray-300">{formatRelativeTime(item.publishedAt)}</span>
                  </div>
                  <h3 className="text-white text-sm font-semibold leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Main Feature & Bullets */}
          <div className="md:col-span-8 flex flex-col gap-4">
            {/* Main Featured Item */}
            {featuredMain && (
              <div>
                <div className="overflow-hidden rounded shadow-sm aspect-[16/9] mb-4">
                  <img
                    src={featuredMain.featuredImage?.url}
                    alt={featuredMain.featuredImage?.alt || featuredMain.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center gap-2 text-sm mb-2">
                  <span className="text-[#D81B50] font-bold">{featuredMain.category?.name}</span>
                  <span className="text-gray-500 text-xs">
                    {formatRelativeTime(featuredMain.publishedAt)}
                  </span>
                </div>

                <h1 className="text-xl md:text-2xl font-bold  dark:text-white leading-tight mb-2 hover:text-[#D81B50] cursor-pointer">
                  {featuredMain.title}
                </h1>

                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{featuredMain.summary}</p>
              </div>
            )}

            {/* Bullet List */}
            <div className="border-t border-gray-200 dark:border-gray-800 divide-y divide-gray-100">
              {featuredBullet?.map((bullet: any) => (
                <div
                  key={bullet.id}
                  className="dark:border-t border-gray-200 dark:border-gray-800 py-3 flex items-start gap-3 group cursor-pointer"
                >
                  <span className="w-2.5 h-2.5 bg-[#D81B50] mt-1.5 shrink-0 inline-block"></span>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white group-hover:text-[#D81B50] transition-colors leading-snug">
                    {bullet.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Grid Posts Section - Có Fallback xử lý lỗi ảnh */}
          {gridPosts && gridPosts.length > 0 && (
            <div className="w-full md:col-span-12 mt-10 pt-6 border-t border-gray-200 dark:border-black">
              <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
                {gridPosts.map((item: any) => (
                  <div key={item.id} className="w-full">
                    <img
                      src={item.featuredImage?.url}
                      alt={item.featuredImage?.alt || item.title}
                      className="w-full aspect-[5/3] object-cover"
                      loading="lazy"
                    />

                    <div className="flex gap-2 text-xs">
                      <div className="text-[#D81B50] font-bold uppercase tracking-wide">
                        {item.category?.name}
                      </div>
                      <div className="text-gray-300">{formatRelativeTime(item.publishedAt)}</div>
                    </div>
                    <p className=" font-semibold text-gray-800  dark:text-white group-hover:text-[#D81B50] transition-colors leading-snug">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

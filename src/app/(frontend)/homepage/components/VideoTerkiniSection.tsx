'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function VideoTerkiniSection({ data }: { data: any }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  if (!data) return null

  const { title = 'Video Terkini', channelLogo, videos = [] } = data
  const logoUrl = typeof channelLogo === 'object' ? channelLogo?.url : null

  // Điều khiển cuộn Carousel ngang
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollAmount = clientWidth * 0.75
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="my-8 relative group/section">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-2 mb-4">
        <h2 className="text-2xl font-bold border-b-2 border-red-600 -mb-2 pb-2 inline-block">
          {title}
        </h2>
        <Link href="/video" className="text-sm font-semibold flex items-center hover:underline">
          Lagi Video <span className="ml-1 text-red-600 font-bold">&gt;</span>
        </Link>
      </div>

      {/* Container Carousel */}
      <div className="relative">
        {/* Nút Prev / Next Carousel */}
        <button
          onClick={() => scroll('left')}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-red-600 hover:bg-gray-50 transition-all opacity-90"
          aria-label="Previous"
        >
          &#10094;
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-red-600 hover:bg-gray-50 transition-all opacity-90"
          aria-label="Next"
        >
          &#10095;
        </button>

        {/* Danh sách Video (Scroll ngang / Grid Responsive) */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-none scroll-smooth pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {videos.map((post: any, index: number) => {
            if (typeof post !== 'object') return null

            return (
              <div key={post.id || index} className="w-[180px] sm:w-[210px] shrink-0 flex flex-col">
                <Link
                  href={`/posts/${post.slug}`}
                  className="group relative aspect-[9/16] w-full rounded-lg overflow-hidden bg-slate-900 block"
                >
                  {/* Thumbnail Video Dọc */}
                  {post.featuredImage?.url && (
                    <Image
                      src={post.featuredImage.url}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}

                  {/* LOGO BH TV Góc trên bên phải */}
                  <div className="absolute top-2.5 right-2.5 z-20">
                    {logoUrl ? (
                      <div className="relative w-8 h-8 border border-white rounded overflow-hidden bg-white shadow-md">
                        <Image src={logoUrl} alt="BH TV Logo" fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 border border-white rounded-xs bg-yellow-400 flex flex-col items-center justify-center leading-none text-black font-extrabold shadow-md">
                        <span className="text-[10px] tracking-tighter">BH</span>
                        <span className="text-[8px] bg-red-600 text-white px-0.5 mt-0.5 rounded-xs">
                          TV
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Gradient Overlay từ dưới lên để đọc text rõ hơn */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />

                  {/* Thông tin bài viết đè lên phần dưới ảnh */}
                  <div className="absolute inset-x-0 bottom-0 p-3 z-20 flex flex-col justify-end">
                    {/* Tiêu đề Video */}
                    <h3 className="text-white text-xs font-semibold line-clamp-3 leading-snug mb-2 underline-offset-2 group-hover:underline">
                      {post.title}
                    </h3>

                    {/* Icon Play + Thời lượng Video */}
                    <div className="flex items-center gap-1.5 text-white text-xs font-medium">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span className="text-[11px]">1:10</span>
                    </div>
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

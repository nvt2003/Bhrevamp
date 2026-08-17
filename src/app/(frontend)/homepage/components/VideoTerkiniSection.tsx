'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Import Swiper React components & styles
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

export default function VideoTerkiniSection({ data }: { data: any }) {
  if (!data) return null

  const { title = 'Video Terkini', channelLogo, videos = [] } = data
  const logoUrl = typeof channelLogo === 'object' ? channelLogo?.url : null

  return (
    <section className="my-8 relative w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-4">
        <h2 className="text-2xl font-bold border-b-2 border-red-600 -mb-2 pb-2 inline-block">
          {title}
        </h2>
        <Link href="/video" className="text-sm font-semibold flex items-center hover:underline">
          Lagi Video <span className="ml-1 text-red-600 font-bold">&gt;</span>
        </Link>
      </div>

      {/* Container Carousel */}
      <div className="relative w-full min-w-0 px-2">
        {/* Nút Prev Custom - Dùng class cố định 'btn-video-prev' */}
        <button
          className="btn-video-prev absolute left-0 top-1/2 -translate-y-1/2 z-40 w-9 h-9 rounded-full bg-white/85 shadow-lg border border-gray-200 flex items-center justify-center text-red-600 hover:bg-gray-100 transition-all cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed select-none"
          aria-label="Previous"
        >
          &#10094;
        </button>

        {/* Nút Next Custom - Dùng class cố định 'btn-video-next' */}
        <button
          className="btn-video-next absolute right-0 top-1/2 -translate-y-1/2 z-40 w-9 h-9 rounded-full bg-white/85 shadow-lg border border-gray-200 flex items-center justify-center text-red-600 hover:bg-gray-100 transition-all cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed select-none"
          aria-label="Next"
        >
          &#10095;
        </button>

        <Swiper
          modules={[Navigation]}
          // Định danh selector class cho nút bấm
          navigation={{
            prevEl: '.btn-video-prev',
            nextEl: '.btn-video-next',
          }}
          // Ép Swiper theo dõi DOM thay đổi để re-init navigation
          observer={true}
          observeParents={true}

          spaceBetween={12}
          slidesPerView={2}
          breakpoints={{
            480: { slidesPerView: 1.4, spaceBetween: 12 },
            640: { slidesPerView: 3.4, spaceBetween: 12 },
            1024: { slidesPerView: 4.4, spaceBetween: 14 },
          }}
          className="w-full min-w-0 max-w-full !px-4"
        >
          {videos.map((post: any, index: number) => {
            if (typeof post !== 'object') return null

            return (
              <SwiperSlide key={post.id || index} className="!h-auto">
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
                      loading="lazy"
                      sizes="(max-width: 639px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}

                  {/* LOGO BH TV Góc trên bên phải */}
                  <div className="absolute top-2.5 right-2.5 z-20">
                    {logoUrl ? (
                      <div className="relative w-8 h-8 border border-white rounded overflow-hidden bg-white shadow-md">
                        <Image
                          src={logoUrl}
                          alt="BH TV Logo"
                          loading="lazy"
                          fill
                          sizes="(max-width: 50px) 5vw, 3vw"
                          className="object-cover"
                        />
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

                  {/* Gradient Overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />

                  {/* Thông tin bài viết */}
                  <div className="absolute inset-x-0 bottom-0 p-3 z-20 flex flex-col justify-end">
                    <h3 className="text-white text-xs font-semibold line-clamp-3 leading-snug mb-2 underline-offset-2 group-hover:underline">
                      {post.title}
                    </h3>

                    {/* Icon Play + Thời lượng Video */}
                    <div className="flex items-center gap-1.5 text-white text-xs font-medium">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span className="text-[11px]">{post.publishedAt}</span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </section>
  )
}
